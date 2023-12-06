import { DatasetMetadataEvm } from "../src/dataset/metadata/repo/evm"
import { expect } from "chai"
import DatasetsDeployment from "@dataswapcore/abi/v0.1/module/dataset/Datasets.json"
import { ethers } from 'ethers'

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

export function getDatasetsMetadataContract(): DatasetMetadataEvm {
    let datasetsAddress = getEnvVariable("DatasetsAddress");
    expect(datasetsAddress).to.not.equal(undefined)
    let url = getEnvVariable("NETWORK_RPC_URL");
    expect(url).to.not.equal(undefined)
    let contract = new DatasetMetadataEvm(
        DatasetsDeployment.abi,
        datasetsAddress as string,
        url
    )
    return contract
}

export function getAccountAddress(variableName: string): string {
    let key = getEnvVariable(variableName);
    expect(key).to.not.equal(undefined)
    let privateKey = key as string
    const wallet = new ethers.Wallet(privateKey)
    return wallet.address;
}

export function getAccountPrivateKey(variableName: string): string {
    let key = getEnvVariable(variableName);
    expect(key).to.not.equal(undefined)
    return key as string
}