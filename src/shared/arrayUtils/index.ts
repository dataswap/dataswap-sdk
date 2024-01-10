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

/**
 * Converts an array of bigints to an array of strings.
 * @param bigints - The array of bigints to be converted.
 * @returns An array containing string representations of the provided bigints.
 */
export function convertToStringArray(bigints: bigint[]): string[] {
    return bigints.map((big) => big.toString())
}

/**
 * Converts an array of numbers to an array of BigIntegers.
 * @param numbers - The array of numbers to convert.
 * @returns An array of BigIntegers.
 */
export function convertToBigIntArray(numbers: number[]): BigInt[] {
    return numbers.map((num) => BigInt(num))
}

/**
 * Converts an array of BigIntegers or numbers to an array of numbers.
 * @param integers - The array of BigIntegers or numbers to convert.
 * @returns An array of numbers.
 */
export function convertToNumberArray(integers: (bigint | number)[]): number[] {
    return integers.map((num) => Number(num)) as number[]
}

/**
 * Splits an array of numbers into start and end ranges.
 * @param ids - The array of numbers to split.
 * @returns An object containing arrays of start and end ranges.
 */
export function splitNumbers(ids: number[]): {
    starts: number[]
    ends: number[]
} {
    if (ids.length === 0) {
        return { starts: [], ends: [] }
    }

    const result = {
        starts: [ids[0]],
        ends: [] as number[],
    }

    for (let i = 1; i < ids.length; i++) {
        if (ids[i] !== ids[i - 1] + 1) {
            result.ends.push(ids[i - 1])
            result.starts.push(ids[i])
        }
    }

    result.ends.push(ids[ids.length - 1])

    return result
}
/**
 * Splits an array of bigints into start and end ranges.
 * @param ids - The array of bigints to split.
 * @returns An object containing arrays of start and end ranges.
 */
export function splitBigInts(ids: bigint[]): {
    starts: bigint[]
    ends: bigint[]
} {
    if (ids.length === 0) {
        return { starts: [], ends: [] }
    }

    const result = {
        starts: [ids[0]],
        ends: [] as bigint[],
    }

    for (let i = 1; i < ids.length; i++) {
        if (ids[i] !== ids[i - 1] + BigInt(1)) {
            result.ends.push(ids[i - 1])
            result.starts.push(ids[i])
        }
    }

    result.ends.push(ids[ids.length - 1])

    return result
}
/**
 * Merges ranges defined by start and end values into a complete array for numbers.
 * Supports number[] inputs.
 *
 * @param starts - Array of start values for the ranges.
 * @param ends - Array of end values for the ranges.
 * @returns Merged array containing all values within the specified ranges.
 * @throws {Error} Throws an error if the lengths of starts and ends arrays are different
 *                 or if an invalid type is encountered in starts or ends arrays.
 */
export function mergeNumberRangesToCompleteArray(
    starts: number[],
    ends: number[]
): number[] {
    if (starts.length !== ends.length) {
        throw new Error("Lengths of starts and ends arrays should be the same.")
    }

    const ids: number[] = []
    for (let i = 0; i < starts.length; i++) {
        if (typeof starts[i] === "number" && typeof ends[i] === "number") {
            // Process the case for number type
            for (let j = starts[i]; j <= ends[i]; j++) {
                ids.push(j)
            }
        } else {
            throw new Error("Invalid type in starts or ends arrays.")
        }
    }
    return ids
}

/**
 * Merges ranges defined by start and end values into a complete array for bigints.
 * Supports bigint[] inputs.
 *
 * @param starts - Array of start values for the ranges.
 * @param ends - Array of end values for the ranges.
 * @returns Merged array containing all values within the specified ranges.
 * @throws {Error} Throws an error if the lengths of starts and ends arrays are different
 *                 or if an invalid type is encountered in starts or ends arrays.
 */
export function mergeBigIntRangesToCompleteArray(
    starts: bigint[],
    ends: bigint[]
): bigint[] {
    if (starts.length !== ends.length) {
        throw new Error("Lengths of starts and ends arrays should be the same.")
    }

    const ids: bigint[] = []
    for (let i = 0; i < starts.length; i++) {
        if (typeof starts[i] === "bigint" && typeof ends[i] === "bigint") {
            // Process the case for bigint type
            for (let j = starts[i]; j <= ends[i]; j++) {
                ids.push(j)
            }
        } else {
            throw new Error("Invalid type in starts or ends arrays.")
        }
    }
    return ids
}
