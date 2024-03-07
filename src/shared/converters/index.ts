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

import { base32 } from "rfc4648"
import { CoinType, newDelegatedEthAddress } from "@glif/filecoin-address"

import { CarstoreEvm } from "../../core/carstore/repo/evm"
import { DatasetRequirementEvm } from "../../module/dataset/requirement/repo/evm"
import { CarReplica, Car, ReplicaInfo } from "../../core/carstore/types"
import { MatchingTarget } from "../../module/matching/target/types"
import { ValueFields } from "@unipackage/utils"
import { CarReplicaState } from "../types/carstoreType"
import {
    DatasetProofs,
    DatasetProofsWithhCarIds,
} from "../../module/dataset/proof/types"
import {
    DatasetRequirements,
    DatasetRequirement,
} from "../../module/dataset/requirement/types"
import { MatchingBids, MatchingBid } from "../../module/matching/bids/types"
import { MatchingTargetEvm } from "../../module/matching/target/repo/evm"
import { convertToNumberArray } from "../arrayUtils"

/**
 * Converts the provided data to an array of CarReplica objects using the specified options.
 *
 * @param options - An object containing the necessary parameters for conversion.
 * @returns A Promise resolving to an array of CarReplica objects.
 */
export function convertToCarReplicasArray(
    target: MatchingTarget
): CarReplica[] {
    let ret: CarReplica[] = []

    for (let index = 0; index < target.cars.length; index++) {
        ret.push(
            new CarReplica({
                matchingId: target.matchingId,
                carId: BigInt(target.cars[index]),
                state: CarReplicaState.None,
                filecoinClaimId: BigInt(0),
                replicaIndex: target.replicaIndex,
            } as ValueFields<CarReplica>)
        )
    }
    return ret
}

/**
 * Converts the provided data to an array of Car objects using the specified options.
 *
 * @param options - An object containing the necessary parameters for conversion.
 * @returns A Promise resolving to an array of Car objects.
 */
export async function convertToCarArray(options: {
    carstoreEvm: CarstoreEvm
    requirementEvm: DatasetRequirementEvm
    proofs: DatasetProofs
}): Promise<Car[]> {
    if (options.proofs.leafHashes.length !== options.proofs.leafSizes.length) {
        throw new Error("invalid dataset proofs")
    }

    let ret: Car[] = []

    for (let index = 0; index < options.proofs.leafHashes.length; index++) {
        const carId = await options.carstoreEvm.getCarId(
            options.proofs.leafHashes[index]
        )
        if (!carId.ok || !carId.data) {
            throw carId.error
        }
        const replicaCount =
            await options.requirementEvm.getDatasetReplicasCount(
                options.proofs.datasetId
            )
        if (!replicaCount.ok || !replicaCount.data) {
            throw replicaCount.error
        }

        ret.push(
            new Car({
                hash: options.proofs.leafHashes[index],
                cid: await dataCommitmentV1ToCID(
                    options.proofs.leafHashes[index]
                ),
                dataType: options.proofs.dataType,
                datasetId: options.proofs.datasetId,
                size: options.proofs.leafSizes[index],
                carId: carId.data,
                replicasCount: BigInt(replicaCount.data),
                matchingIds: Array.from(
                    { length: Number(replicaCount.data) },
                    () => 0
                ),
                replicaInfos: Array.from(
                    { length: Number(replicaCount.data) },
                    () =>
                        new ReplicaInfo({
                            matchingId: 0,
                            state: CarReplicaState.None,
                        })
                ),
            } as ValueFields<Car>)
        )
    }
    return ret
}
/**
 * Converts the provided data to an array of Car objects using the specified options.
 *
 * @param options - An object containing the necessary parameters for conversion.
 * @returns A Promise resolving to an array of Car objects.
 */
export async function convertToCarArrayWithCarIds(options: {
    carstoreEvm: CarstoreEvm
    requirementEvm: DatasetRequirementEvm
    proofs: DatasetProofsWithhCarIds
}): Promise<Car[]> {
    let ret: Car[] = []

    for (let index = 0; index < options.proofs.leaves.length; index++) {
        const carId = options.proofs.leaves[index]
        const replicaCount =
            await options.requirementEvm.getDatasetReplicasCount(
                options.proofs.datasetId
            )
        if (!replicaCount.ok || !replicaCount.data) {
            throw replicaCount.error
        }
        const hash = await options.carstoreEvm.getCarHash(carId)
        if (!hash.ok || !hash.data) {
            throw hash.error
        }
        const carSize = await options.carstoreEvm.getCarSize(carId)
        if (!carSize.ok || !carSize.data) {
            throw carSize.error
        }
        ret.push(
            new Car({
                hash: hash.data,
                cid: await dataCommitmentV1ToCID(hash.data),
                dataType: options.proofs.dataType,
                datasetId: options.proofs.datasetId,
                size: carSize.data,
                carId: carId,
                replicasCount: BigInt(replicaCount.data),
                matchingIds: Array.from(
                    { length: Number(replicaCount.data) },
                    () => 0
                ),
                replicaInfos: Array.from(
                    { length: Number(replicaCount.data) },
                    () =>
                        new ReplicaInfo({
                            matchingId: 0,
                            state: CarReplicaState.None,
                        })
                ),
            } as ValueFields<Car>)
        )
    }
    return ret
}
/**
 * Converts a DatasetRequirements object to an array of DatasetRequirement objects.
 *
 * @param datasetRequirements - The DatasetRequirements object to convert.
 * @returns An array of DatasetRequirement objects.
 */
export function convertToRequirementArray(
    datasetRequirments: DatasetRequirements
): DatasetRequirement[] {
    const requirements = datasetRequirments.citys.map((_, index) => {
        return new DatasetRequirement({
            dataPreparers: datasetRequirments.dataPreparers[index],
            storageProviders: datasetRequirments.storageProviders[index],
            regionCode: datasetRequirments.regions[index],
            countryCode: datasetRequirments.countrys[index],
            cityCodes: convertToNumberArray(datasetRequirments.citys[index]),
            index: BigInt(index),
            datasetId: Number(datasetRequirments.datasetId),
            matchings: [],
        })
    })
    return requirements
}

/**
 * Converts the provided MatchingBids data to an array of MatchingBid objects.
 *
 * @param matchingBids - The MatchingBids data to be converted.
 * @returns An array of MatchingBid objects.
 */
export function convertToMatchingBidArray(
    matchingBids: MatchingBids
): MatchingBid[] {
    return matchingBids.bidders.map((_, index) => {
        return {
            bidder: matchingBids.bidders[index],
            amount: matchingBids.amounts[index],
            complyFilplusRule: matchingBids.complyFilplusRules[index],
            matchingId: Number(matchingBids.matchingId),
        } as MatchingBid
    })
}

/**
 * Merges the provided MatchingTarget objects, ensuring the matchingIds are the same.
 *
 * @param options - An object containing the MatchingTargetEvm instance and the original
 * and new MatchingTarget objects to be merged.
 * @returns A Promise resolving to the merged MatchingTarget object.
 */
export async function mergeMatchingTarget(options: {
    matchingTargetEvm: MatchingTargetEvm
    originMatchingTarget: MatchingTarget
    newMatchingTarget: MatchingTarget
}): Promise<MatchingTarget> {
    if (
        options.originMatchingTarget.matchingId !==
        options.newMatchingTarget.matchingId
    ) {
        throw new Error("Cannot merge two targets with different matchingIds")
    }
    const target = await options.matchingTargetEvm.getMatchingTarget(
        options.originMatchingTarget.matchingId!
    )
    if (!target.ok) {
        throw target.error
    }
    if (!target.data) {
        throw new Error("get matchingTarget failed")
    }
    return target.data as MatchingTarget
}

/**
 * Converts a bytes32 hash to a Content ID (CID).
 * @param hash A bytes32 hash to be converted to a CID.
 * @returns The CID represented as bytes.
 */
export async function dataCommitmentV1ToCID(hash: string): Promise<string> {
    const hs = hexStringToUint8Array(hash)
    // Hardcoded values
    const filCommitmentUnsealed: number = 0xf101
    const sha256Trunc254Padded: number = 0x1012

    // Create the fBuf part
    const fBuf: Uint8Array = concatUint8Arrays(
        putUvarint(1),
        putUvarint(filCommitmentUnsealed)
    )

    // Create the result part
    let result: Uint8Array = concatUint8Arrays(
        putUvarint(sha256Trunc254Padded),
        putUvarint(hs.length),
        hs
    )

    // Concatenate fBuf and result
    return (
        "b" +
        base32
            .stringify(concatUint8Arrays(fBuf, result), { pad: false })
            .toLowerCase()
    )
}

/**
 * Encodes an unsigned integer as a variable-length byte slice (uvarint).
 * @param _x The unsigned integer to encode.
 * @returns Uint8Array representing the uvarint encoding of the input.
 */
function putUvarint(_x: number): Uint8Array {
    let i: number = 0
    const buffer: number[] = new Array(10) // Requires up to 10 bytes

    while (_x >= 0x80) {
        buffer[i] = (_x & 0x7f) | 0x80
        _x >>= 7
        i++
    }
    buffer[i] = _x

    const result: Uint8Array = new Uint8Array(i + 1)
    for (let j = 0; j <= i; j++) {
        result[j] = buffer[j]
    }

    return result
}

/**
 * Concatenates multiple Uint8Array arrays into a single Uint8Array.
 * @param arrays The Uint8Array arrays to be concatenated.
 * @returns A new Uint8Array containing the concatenated data.
 */
function concatUint8Arrays(...arrays: Uint8Array[]): Uint8Array {
    // Calculate the total length of the concatenated array
    const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0)

    // Create a new Uint8Array with the calculated total length
    const result = new Uint8Array(totalLength)

    // Copy each array into the result array
    let offset = 0
    arrays.forEach((arr) => {
        result.set(arr, offset)
        offset += arr.length
    })

    return result
}

/**
 * Converts a Uint8Array to a hex string.
 * @param uint8Array The Uint8Array to be converted to a hex string.
 * @returns The hex string.
 */
function uint8ArrayToHexString(uint8Array: Uint8Array): string {
    return Array.from(uint8Array)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("")
}

/**
 * Converts a hex string to a Uint8Array.
 * @param hexString The hex string to be converted to a Uint8Array.
 * @returns The Uint8Array.
 */
function hexStringToUint8Array(hexString: string): Uint8Array {
    // Remove '0x' prefix if present
    hexString = hexString.startsWith("0x") ? hexString.slice(2) : hexString

    const bytes = new Uint8Array(hexString.length / 2)

    for (let i = 0; i < hexString.length; i += 2) {
        bytes[i / 2] = parseInt(hexString.substr(i, 2), 16)
    }

    return bytes
}
