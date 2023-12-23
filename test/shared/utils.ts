import { EvmOutput } from "@unipackage/net"
import { ethers } from "ethers"


export function getEnvVariable(variableName: string): string | undefined {
    if (typeof process !== "undefined" && process.env) {
        const envVariable = process.env[variableName]
        if (envVariable !== undefined) {
            return String(envVariable)
        }
    }
    return undefined
}

export function generateRandomString(length: number): string {
    return Math.random()
        .toString(36)
        .replace(/[^a-zA-Z0-9]+/g, "")
        .substr(0, length)
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getContractAddress(contractName: string): string {
    let contractAddress = getEnvVariable(contractName + "Address")
    if (contractAddress === undefined) {
        throw new Error(
            "get evn variable " + contractName + "Address" + " faild"
        )
    }
    return contractAddress
}

export function getNetworkRpcURL(): string {
    let url = getEnvVariable("NETWORK_RPC_URL")
    if (url === undefined) {
        throw new Error("get rpc url evn variable faild")
    }
    return url
}

export function getAccountAddress(variableName: string): string {
    let key = getEnvVariable(variableName)
    if (key === undefined) {
        throw new Error("get evn variable " + variableName + " faild")
    }
    let privateKey = key as string
    const wallet = new ethers.Wallet(privateKey)
    return wallet.address
}

export function getAccountPrivateKey(variableName: string): string {
    let key = getEnvVariable(variableName)
    if (key === undefined) {
        throw new Error("get evn variable " + variableName + " faild")
    }
    return key as string
}

export function convertToBigIntArray(numbers: number[]): BigInt[] {
    return numbers.map((num) => BigInt(num));
}

export function convertToNumberArray(bigIntegers: BigInt[] | number[]): number[] {
    return bigIntegers.map((bigInt) => Number(bigInt));
}


export function splitNumbers(ids: number[]): { starts: number[], ends: number[] } {
    if (ids.length === 0) {
        return { starts: [], ends: [] };
    }

    const result = {
        starts: [ids[0]],
        ends: [] as number[]
    };

    for (let i = 1; i < ids.length; i++) {
        if (ids[i] !== ids[i - 1] + 1) {
            result.ends.push(ids[i - 1]);
            result.starts.push(ids[i]);
        }
    }

    result.ends.push(ids[ids.length - 1]);

    return result;
}