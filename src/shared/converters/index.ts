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
import { CarReplica, Car } from "../../core/carstore/types"
import { MatchingTarget } from "../../module/matching/target/types"
import { ValueFields } from "@unipackage/utils"
import { CarReplicaState } from "../types/carstoreType"
import { DatasetProofs } from "../../module/dataset/proof/types"
import {
    DatasetRequirements,
    DatasetRequirement,
} from "../../module/dataset/requirement/types"

/**
 * Converts the provided data to an array of CarReplica objects using the specified options.
 *
 * @param options - An object containing the necessary parameters for conversion.
 * @returns A Promise resolving to an array of CarReplica objects.
 */
export async function convertToCarReplicasArray(options: {
    carstorEvm: CarstoreEvm
    target: MatchingTarget
}): Promise<CarReplica[]> {
    let ret: CarReplica[] = []

    for (let index = 0; index < options.target.cars.length; index++) {
        ret.push(
            new CarReplica({
                matchingId: options.target.matchingId,
                carId: options.target.cars[index],
                state: CarReplicaState.None,
                filecoinClaimId: BigInt(0),
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
    carstorEvm: CarstoreEvm
    requirementEvm: DatasetRequirementEvm
    proofs: DatasetProofs
}): Promise<Car[]> {
    if (options.proofs.leafHashes.length !== options.proofs.leafSizes.length) {
        throw new Error("invalid dataset proofs")
    }

    let ret: Car[] = []

    for (let index = 0; index < options.proofs.leafHashes.length; index++) {
        const carId = await options.carstorEvm.getCarId(
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
                datasetId: options.proofs.datasetId,
                size: options.proofs.leafSizes[index],
                carId: carId.data,
                replicasCount: BigInt(replicaCount.data),
                matchingIds: [],
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
        return {
            dataPreparers: datasetRequirments.dataPreparers[index],
            storageProviders: datasetRequirments.storageProviders[index],
            regionCode: datasetRequirments.regions[index],
            countryCode: datasetRequirments.countrys[index],
            cityCodes: datasetRequirments.citys[index],
            index: BigInt(index),
            datasetId: Number(datasetRequirments.datasetId),
        } as DatasetRequirement
    })
    return requirements
}
