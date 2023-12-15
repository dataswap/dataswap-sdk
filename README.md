# dataswap-sdk

The Dataswap SDK provides APIs for useing dataswap business functions. It consists of several TypeScript & JavaScript libraries.

## Setup

Please make sure to install the following before working with codebase:  

[npm](https://docs.npmjs.com/getting-started)

[Node.js (16+)](https://nodejs.org/en/download)

[TypeScript](https://www.typescriptlang.org/download)

## Usage

```shell
To be added
```

## Development

### Clone the repository

```shell
git clone https://github.com/dataswap/dataswapjs.git
```

### dependencies

```shell
npm install
```

### Build

```shell
npm run build
```

### Test

```shell
npm run test
```

## Network configure

### Localnet

Please make sure to install the following before working with localnet:  

[docker](https://www.docker.com/get-started/)

Configure test private key information to .env file. eg: .env.localnet.example

#### Localnet Setup

```shell
npm run localnet:setup
source .env
```

#### Localnet start

```shell
npm run localnet:start
```

#### Localnet restart

```shell
npm run localnet:restart
```

#### Localnet stop

```shell
npm run localnet:stop
```

#### Localnet clear

```shell
npm run localnet:clear
```

### Network

Configure test private key information, network rpc url and contract address to .env file. eg: .env.example

```shell
source .env
```
