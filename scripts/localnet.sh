#/bin/sh

NETWORK_NAME="localnet"
CORE_PATH=".${NETWORK_NAME}"
ENV_FILE=".environment"
DEPLOYER_PATH="./deployments/${NETWORK_NAME}"
PRIVATE_KEY=0x0a3570f105ea5d06c355ea1a7a1fea441e90e44984896779b6c44c2ca5a8e16b
DEPLOYER_ADDRESS=0x09C6DEE9DB5e7dF2b18283c0CFCf714fEDB692d7

function setup() {
    echo "\r\n================================= setup start =========================================\r\n"

    export PRIVATE_KEY=${PRIVATE_KEY}
    export DEPLOYER_ADDRESS=${DEPLOYER_ADDRESS}
    docker run -d -p 1234:1234 --name ${NETWORK_NAME} siriusyim/lotus-devnet:0.3.0
    sleep 90
    docker exec ${NETWORK_NAME} /usr/local/bin/lotus wallet list

    npm install --save-dev hardhat
    npm install --save-dev ts-node
    mkdir -p .${NETWORK_NAME}
    git clone https://github.com/dataswap/core.git ${CORE_PATH}
    cd ${CORE_PATH}
    yarn install && yarn hardhat compile
    npx hardhat deploy --network ${NETWORK_NAME}

    RootAddress=$(docker exec ${NETWORK_NAME} lotus msig inspect f080 | grep t0100 | awk '{print $2}')
    FilecoinAddress=$(npx hardhat getProxyAddress --type ${NETWORK_NAME} --name Filecoin)
    FilecoinSrcAddress=$(docker exec ${NETWORK_NAME} lotus evm stat $FilecoinAddress | grep "ID address" | awk '{print $3}')

    docker exec ${NETWORK_NAME} lotus-shed verifreg add-verifier $RootAddress $FilecoinSrcAddress 10000000
    docker exec ${NETWORK_NAME} lotus filplus list-notaries

    _loopSet

    echo "Please execute the command to export localnet: \r\n source .localnet/.environment \r\n"
    echo "\r\n================================= setup completed =========================================\r\n"

}

function _loopSet() {
    rm -rf ${ENV_FILE} && touch ${ENV_FILE}

    echo "export PRIVATE_KEY=${PRIVATE_KEY}" >>${ENV_FILE}
    echo "export DEPLOYER_ADDRESS=${DEPLOYER_ADDRESS}" >>${ENV_FILE}
    echo "export NETWORK_RPC_URL=http://127.0.0.1:1234/rpc/v1" >>${ENV_FILE}
    echo "export PRIVATE_KEY_BIDDER=0xcc52fdd7a98313d783f01e5275ac4fc1c15b8efe26ecdfbab3a5cd9c932cc986" >>${ENV_FILE}
    echo "export PRIVATE_KEY_DATASETAUDITOR=0xce8f384ece258c311ce572ceb7205e952c58d72d4880fe64b88239c07ef3cde6" >>${ENV_FILE}
    echo "export PRIVATE_KEY_PROOFSUBMITTER=0xe624c69077cfea8e36bf4f1a1383ad4555f2f52f2d34abfe54c0918b8d843099" >>${ENV_FILE}
    echo "export PRIVATE_KEY_METADATASUBMITTER=0x0904cdc9c54d32fd7bef4ac225dabfd5d7aeafeaa118ba5e2da8f8b4f36012a1" >>${ENV_FILE}

    for file in $(ls ${DEPLOYER_PATH}); do
        if [ -d ${DEPLOYER_PATH}"/"${file} ] || [[ ${file} != *".json" ]]; then
            continue
        else
            contractName=$(echo ${file} | awk -F. '{print $1}')
            contractAddressName="${contractName}Address"
            contractAddress=$(npx hardhat getProxyAddress --type ${NETWORK_NAME} --name ${contractName})
            echo "export ${contractAddressName}=${contractAddress}" >>${ENV_FILE}
        fi
    done
}

function clear() {
    stop
    docker rm ${NETWORK_NAME}
    rm -rf ${CORE_PATH}
}

function stop() {
    docker stop ${NETWORK_NAME}
}

function start() {
    docker start ${NETWORK_NAME}
}

function executeFunction() {
    case $1 in
    'setup')
        setup
        ;;
    'start')
        start
        ;;
    'restart')
        stop
        start
        ;;
    'stop')
        stop
        ;;
    'clear')
        clear
        ;;
    *)
        echo 'Unknown option'
        ;;
    esac
}

executeFunction $1
