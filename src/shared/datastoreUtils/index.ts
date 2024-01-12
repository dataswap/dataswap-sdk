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

import { CarstoreEvm } from "../../core/carstore/repo/evm"
import { DatasetRequirementEvm } from "../../module/dataset/requirement/repo/evm"
import { MatchingTarget } from "../../module/matching/target/types"
import { DatasetProofs } from "../../module/dataset/proof/types"
import { MatchingTargetEvm } from "../../module/matching/target/repo/evm"
import { CarMongoDatastore } from "../../core/carstore/repo/datastore"
import { convertToCarArray, convertToCarReplicasArray } from "../converters"
import { Result } from "@unipackage/utils"
import { CarReplicaMongoDatastore } from "../../core/carstore/repo/datastore"
import { MatchingTargetMongoDatastore } from "../../module/matching/target/repo/datastore"
import { DatasetMetadataMongoDatastore } from "../../module/dataset/metadata/repo/datastore"
import { DatasetMetadataEvm } from "../../module/dataset/metadata/repo/evm"

/**
 * Stores cars in the Carstore contract and updates the dataset requirement in the DatasetRequirement contract.
 * @param options - Object containing necessary parameters.
 * @param options.carstoreEvm - Instance of the CarstoreEvm contract.
 * @param options.requirementEvm - Instance of the DatasetRequirementEvm contract.
 * @param options.carDatastore - MongoDB datastore for cars.
 * @param options.proofs - DatasetProofs containing proofs for car-related data.
 * @returns A Promise resolving to a Result indicating the success or failure of the operation.
 */
export async function storeCars(options: {
    carstoreEvm: CarstoreEvm
    requirementEvm: DatasetRequirementEvm
    carDatastore: CarMongoDatastore
    proofs: DatasetProofs
}): Promise<Result<any>> {
    const cars = await convertToCarArray({
        carstoreEvm: options.carstoreEvm,
        requirementEvm: options.requirementEvm,
        proofs: options.proofs,
    })
    for (let i = 0; i < cars.length; i++) {
        const ret = await options.carDatastore.CreateOrupdateByUniqueIndexes(
            cars[i]
        )
        if (!ret.ok) {
            return {
                ok: false,
                error: new Error(`storeCars error:${ret.error}`),
            }
        }
    }
    return { ok: true, data: cars }
}

/**
 * Stores car replicas in the CarReplicaDatastore and updates the matching target.
 * @param options - Object containing necessary parameters.
 * @param options.carReplicaDatastore - MongoDB datastore for car replicas.
 * @param options.target - MatchingTarget to be updated with the stored car replicas.
 * @returns A Promise resolving to a Result indicating the success or failure of the operation.
 */
export async function storeCarReplicas(options: {
    carReplicaDatastore: CarReplicaMongoDatastore
    target: MatchingTarget
}): Promise<Result<any>> {
    const carReplicas = convertToCarReplicasArray(options.target)
    for (let i = 0; i < carReplicas.length; i++) {
        const ret =
            await options.carReplicaDatastore.CreateOrupdateByUniqueIndexes(
                carReplicas[i]
            )
        if (!ret.ok) {
            return {
                ok: false,
                error: new Error(`storeCarReplicass error:${ret.error}`),
            }
        }
    }
    return { ok: true, data: carReplicas }
}

/**
 * Stores a matching target in the MatchingTargetDatastore.
 * @param options - Object containing necessary parameters.
 * @param options.matchingTargetEvm - EVM instance for interacting with the matching target contract.
 * @param options.matchingTargetDatastore - MongoDB datastore for matching targets.
 * @param options.target - MatchingTarget to be stored.
 * @returns A Promise resolving to a Result indicating the success or failure of the operation.
 */
export async function storeMatchingtarget(options: {
    matchingTargetEvm: MatchingTargetEvm
    matchingTargetDatastore: MatchingTargetMongoDatastore
    target: MatchingTarget
}): Promise<Result<any>> {
    if (!options.target.matchingId) {
        return {
            ok: false,
            error: new Error("storeMatchingtarget invalid target"),
        }
    }
    const target = await options.matchingTargetEvm.getMatchingTarget(
        options.target.matchingId
    )

    if (!target.ok) {
        return {
            ok: false,
            error: new Error(
                `storeMatchingtarget getMatchingTarget error:${target.error}`
            ),
        }
    }

    if (!target.data) {
        return {
            ok: false,
            error: new Error(
                "storeMatchingtarget getMatchingTarget from chain failed"
            ),
        }
    }

    const ret =
        await options.matchingTargetDatastore.CreateOrupdateByUniqueIndexes(
            target.data as MatchingTarget
        )

    if (!ret.ok) {
        return {
            ok: false,
            error: new Error(`storeMatchingtarget store failed:${ret.error}`),
        }
    }

    return { ok: true, data: ret.data }
}
