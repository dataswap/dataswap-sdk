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
 * Converts an array of numbers to an array of BigIntegers.
 * @param numbers - The array of numbers to convert.
 * @returns An array of BigIntegers.
 */
export function convertToBigIntArray(numbers: number[]): BigInt[] {
    return numbers.map((num) => BigInt(num));
}

/**
 * Converts an array of BigIntegers or numbers to an array of numbers.
 * @param bigIntegers - The array of BigIntegers or numbers to convert.
 * @returns An array of numbers.
 */
export function convertToNumberArray(bigIntegers: (bigint | number)[]): number[] {
    return bigIntegers.map(bigInt => Number(bigInt)) as number[];
}

/**
 * Splits an array of numbers into start and end ranges.
 * @param ids - The array of numbers to split.
 * @returns An object containing arrays of start and end ranges.
 */
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

/**
 * Merges start and end ranges to create a complete array.
 * @param starts - The array of start ranges.
 * @param ends - The array of end ranges.
 * @returns A complete array merged from start and end ranges.
 */
export function mergeRangesToCompleteArray(starts: number[], ends: number[]): number[] {
    if (starts.length !== ends.length) {
        throw new Error('Lengths of starts and ends arrays should be the same.');
    }

    const ids: number[] = [];
    for (let i = 0; i < starts.length; i++) {
        for (let j = starts[i]; j <= ends[i]; j++) {
            ids.push(j);
        }
    }
    return ids;
}

/**
 * Converts a number to its bytes32 representation.
 * @param num The number to convert to bytes32.
 * @returns The bytes32 representation of the number.
 */
export function numberToBytes32(num: number): string {
    // Convert the number to its hexadecimal representation
    let hexString = num.toString(16);

    // Pad the hexadecimal string to make it 32 bytes long
    const padding = 64 - hexString.length;
    if (padding > 0) {
        hexString = '0x' + '0'.repeat(padding) + hexString;
    }

    return hexString;
}