import { Evm } from "@unipackage/net"
import { ethers } from "ethers"
import { AbiFunctionFragment } from "web3"
import { EvmEngine } from "../../src/shared/types/evmEngineType"

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
