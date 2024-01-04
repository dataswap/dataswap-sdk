/*******************************************************************************
 *   (c) 2023 dataswap
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/

import { ethers } from "ethers"
import { EvmOutput } from "@unipackage/net"
import { DataswapMessage } from "../../src/message/types"
import { Message } from "@unipackage/filecoin" // Replace with the actual path to your TypeScript file

/**
 * Retrieves the value of an environment variable by its name.
 * @param variableName - The name of the environment variable.
 * @returns The value of the environment variable if found, otherwise undefined.
 */
export function getEnvVariable(variableName: string): string | undefined {
    if (typeof process !== "undefined" && process.env) {
        const envVariable = process.env[variableName]
        if (envVariable !== undefined) {
            return String(envVariable)
        }
    }
    return undefined
}

/**
 * Generates a random string of a specified length.
 * @param length - The length of the random string to generate.
 * @returns The randomly generated string.
 */
export function generateRandomString(length: number): string {
    return Math.random()
        .toString(36)
        .replace(/[^a-zA-Z0-9]+/g, "")
        .substr(0, length)
}

/**
 * Generates a random integer within a specified range.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 * @returns A random integer between min (inclusive) and max (inclusive).
 */
export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Retrieves the address of a contract by its name.
 * @param contractName - The name of the contract.
 * @returns The address of the contract.
 */
export function getContractAddress(contractName: string): string {
    let contractAddress = getEnvVariable(contractName + "Address")
    if (contractAddress === undefined) {
        throw new Error(
            "get evn variable " + contractName + "Address" + " faild"
        )
    }
    return contractAddress
}

/**
 * Retrieves the RPC URL of the network.
 * @returns The RPC URL of the network.
 */
export function getNetworkRpcURL(): string {
    let url = getEnvVariable("NETWORK_RPC_URL")
    if (url === undefined) {
        throw new Error("get rpc url evn variable faild")
    }
    return url
}

/**
 * Retrieves the address associated with an account variable.
 * @param variableName - The name of the account variable.
 * @returns The address associated with the account variable.
 */
export function getAccountAddress(variableName: string): string {
    let key = getEnvVariable(variableName)
    if (key === undefined) {
        throw new Error("get evn variable " + variableName + " faild")
    }
    let privateKey = key as string
    const wallet = new ethers.Wallet(privateKey)
    return wallet.address
}

/**
 * Retrieves the private key associated with an account variable.
 * @param variableName - The name of the account variable.
 * @returns The private key associated with the account variable.
 */
export function getAccountPrivateKey(variableName: string): string {
    let key = getEnvVariable(variableName)
    if (key === undefined) {
        throw new Error("get evn variable " + variableName + " faild")
    }
    return key as string
}

/**
 * Converts a number to its bytes32 representation.
 * @param num The number to convert to bytes32.
 * @returns The bytes32 representation of the number.
 */
export function numberToBytes32(num: number): string {
    // Convert the number to its hexadecimal representation
    let hexString = num.toString(16)

    // Pad the hexadecimal string to make it 32 bytes long
    const padding = 64 - hexString.length
    if (padding > 0) {
        hexString = "0x" + "0".repeat(padding) + hexString
    }

    return hexString
}

/**
 * Create expect messgae.
 * @param method The message method.
 * @param params The message params.
 * @param returns The message returns.
 * @param datasetId The dataset id.
 * @param matchingId The matching id.
 * @returns The message object.
 */
export function createExpectMessage(
    method: string,
    params: object,
    returns: string,
    datasetId?: number,
    matchingId?: number
): EvmOutput<DataswapMessage> {
    return {
        ok: true,
        data: {
            cid: {
                "/": "bafy2bzacebnjyelld3l7nxbtzqxg7ljs7sjsbkalz3szorwmu3wkulaqph6mm",
            },
            height: 1213438,
            timestamp: "",
            from: "f410fcwzis33wz3sofrlh466gog5xahlthgzqezasapy",
            to: "f410fai7exftlsq6igc35jsxij7twcza3feadlmtrjla",
            method: method,
            params: params,
            status: 0,
            return: returns,
            ...(datasetId !== undefined && { datasetId }),
            ...(matchingId !== undefined && { matchingId }),
        },
    }
}

/**
 * Create target messgae.
 * @param params The message params.
 * @param returns The message returns.
 * @returns The message object.
 */
export function createTargetMessage(params: string, returns: string): Message {
    return new Message({
        Height: 1213438,
        Replayed: true,
        MsgCid: {
            "/": "bafy2bzacebnjyelld3l7nxbtzqxg7ljs7sjsbkalz3szorwmu3wkulaqph6mm",
        },
        Msg: {
            Version: 0,
            To: "f410fai7exftlsq6igc35jsxij7twcza3feadlmtrjla",
            From: "f410fcwzis33wz3sofrlh466gog5xahlthgzqezasapy",
            Nonce: 550,
            Value: "0",
            GasLimit: 35862045,
            GasFeeCap: "4128217110",
            GasPremium: "2057242745",
            Method: 3844450837,
            Params: params,
            CID: {
                "/": "bafy2bzacedwcmokyjjyju2a7s6tsdvakcjwzztgpmbvdabk7v7zdadsqndxec",
            },
        },
        MsgRct: {
            ExitCode: 0,
            Return: returns,
            GasUsed: 28697436,
            EventsRoot: {
                "/": "bafy2bzacebkqi5zhbxevtqfadttyoguh2parrfe3qkh7rlfgxfux3eyhihzq6",
            },
        },
        GasCost: {
            Message: {
                "/": "bafy2bzacedwcmokyjjyju2a7s6tsdvakcjwzztgpmbvdabk7v7zdadsqndxec",
            },
            GasUsed: "28697436",
            BaseFeeBurn: "2869743600",
            OverEstimationBurn: "107225700",
            MinerPenalty: "0",
            MinerTip: "73776931897113525",
            Refund: "74269372894507125",
            TotalCost: "73776934874082825",
        },
    })
}
