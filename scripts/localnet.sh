#/bin/sh

DOCKER_NAME="localnet"
ENV_FILE=".env"

function setup() {
    echo "\r\n================================= setup start =========================================\r\n"

    docker run -d -p 1234:1234 --name ${DOCKER_NAME} dataswap/lotus-devnet:0.1.2
    docker exec ${DOCKER_NAME} /usr/local/bin/lotus wallet list
    docker exec ${DOCKER_NAME} cat /root/env >  ${ENV_FILE}
    docker exec ${DOCKER_NAME} cat /root/contract >> ${ENV_FILE}
    echo "export NETWORK_RPC_URL=http://127.0.0.1:1234/rpc/v1" >>${ENV_FILE}

    echo "Please execute the command to export localnet: \r\n"
    echo "\r\n source .env \r\n"
    echo "\r\n================================= setup completed =========================================\r\n"

}

function clear() {
    stop
    docker rm ${DOCKER_NAME}
}

function stop() {
    docker stop ${DOCKER_NAME}
}

function start() {
    docker start ${DOCKER_NAME}
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
