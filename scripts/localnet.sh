#/bin/sh

NETWORK_NAME="localnet"
CORE_PATH=".${NETWORK_NAME}"
ENV_FILE=".environment"
SYSTEM_ENV_PATH=".env"
DEPLOYER_PATH="./deployments/${NETWORK_NAME}"

if [ ! -e ${SYSTEM_ENV_PATH} ]; then
    echo "Error: Need to import private key information from .env"
    exit 1
fi
PRIVATE_KEY=$(grep "PRIVATE_KEY=" ${SYSTEM_ENV_PATH} | awk -F "=" '{print $2}')
DEPLOYER_ADDRESS=$(grep "DEPLOYER_ADDRESS=" ${SYSTEM_ENV_PATH} | awk -F "=" '{print $2}')
PRIVATE_KEY_BIDDER=$(grep "PRIVATE_KEY_BIDDER=" ${SYSTEM_ENV_PATH} | awk -F "=" '{print $2}')
PRIVATE_KEY_DATASETAUDITOR=$(grep "PRIVATE_KEY_DATASETAUDITOR=" ${SYSTEM_ENV_PATH} | awk -F "=" '{print $2}')
PRIVATE_KEY_PROOFSUBMITTER=$(grep "PRIVATE_KEY_PROOFSUBMITTER=" ${SYSTEM_ENV_PATH} | awk -F "=" '{print $2}')
PRIVATE_KEY_METADATASUBMITTER=$(grep "PRIVATE_KEY_METADATASUBMITTER=" ${SYSTEM_ENV_PATH} | awk -F "=" '{print $2}')

function setup() {
    echo "\r\n================================= setup start =========================================\r\n"

    export PRIVATE_KEY=${PRIVATE_KEY}
    export DEPLOYER_ADDRESS=${DEPLOYER_ADDRESS}
    docker run -d -p 1234:1234 --name ${NETWORK_NAME} dataswap/lotus-devnet:0.3.0
    sleep 90
    docker exec ${NETWORK_NAME} /usr/local/bin/lotus wallet list

    npm install --save-dev hardhat
    npm install --save-dev ts-node
    mkdir -p ${CORE_PATH}
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

    echo "Please execute the command to export localnet: \r\n"
    echo "\r\n source .localnet/.environment \r\n"
    echo "\r\n================================= setup completed =========================================\r\n"

}

function _loopSet() {
    rm -rf ${ENV_FILE} && touch ${ENV_FILE}

    echo "export PRIVATE_KEY=${PRIVATE_KEY}" >>${ENV_FILE}
    echo "export DEPLOYER_ADDRESS=${DEPLOYER_ADDRESS}" >>${ENV_FILE}
    echo "export NETWORK_RPC_URL=http://127.0.0.1:1234/rpc/v1" >>${ENV_FILE}
    echo "export PRIVATE_KEY_BIDDER=${PRIVATE_KEY_BIDDER}" >>${ENV_FILE}
    echo "export PRIVATE_KEY_DATASETAUDITOR=${PRIVATE_KEY_DATASETAUDITOR}" >>${ENV_FILE}
    echo "export PRIVATE_KEY_PROOFSUBMITTER=${PRIVATE_KEY_PROOFSUBMITTER}" >>${ENV_FILE}
    echo "export PRIVATE_KEY_METADATASUBMITTER=${PRIVATE_KEY_METADATASUBMITTER}" >>${ENV_FILE}

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
