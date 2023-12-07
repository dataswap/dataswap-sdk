import { ethers } from 'ethers'
import { AbiFunctionFragment } from "web3";

export function getEnvVariable(variableName: string): string | undefined {
    // 确保你在 Node.js 环境中
    if (typeof process !== 'undefined' && process.env) {
        // 获取环境变量
        const envVariable = process.env[variableName];
        if (envVariable !== undefined) {
            return String(envVariable); // 将环境变量转换为字符串类型并返回
        }
    }
    return undefined; // 如果环境变量未定义或未找到，返回 undefined
}

export function generateRandomString(length: number): string {
    return Math.random()
        .toString(36)
        .replace(/[^a-zA-Z0-9]+/g, '')
        .substr(0, length);
}

export function getContract<T>(contractName: string, abi: AbiFunctionFragment[], init: new (contractABI: AbiFunctionFragment[], contractAddress: string, providerUrl?: string) => T): T {
    let contractAddress = getEnvVariable(contractName + 'Address');
    if (contractAddress === undefined) {
        throw new Error("get evn variable " + contractName + "Address" + " faild")
    }
    let url = getEnvVariable("NETWORK_RPC_URL");
    if (url === undefined) {
        throw new Error("get rpc url evn variable faild")
    }

    let contract = new init(
        abi,
        contractAddress as string,
        url
    )
    return contract
}

export function getAccountAddress(variableName: string): string {
    let key = getEnvVariable(variableName);
    if (key === undefined) {
        throw new Error("get evn variable " + variableName + " faild")
    }
    let privateKey = key as string
    const wallet = new ethers.Wallet(privateKey)
    return wallet.address;
}

export function getAccountPrivateKey(variableName: string): string {
    let key = getEnvVariable(variableName);
    if (key === undefined) {
        throw new Error("get evn variable " + variableName + " faild")
    }
    return key as string
}