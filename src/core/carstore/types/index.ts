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

import { Entity } from "@unipackage/ddd"
import { ValueFields } from "@unipackage/utils"
import { CarReplicaState } from "../../../shared/types/carstoreType"

/**
 * Represents a Car entity.
 * @interface
 */
export interface Car {
    hash: string // car hash
    datasetId: number // Index of approved dataset
    size: bigint //car size
    replicasCount: bigint // Replica count
    carId: bigint // The id associated with the car.
    matchingIds?: number[] // Matching Ids.
    replicaInfos?: CarReplica[] // replica infos.
}

/**
 * Represents a Car Replica entity.
 * @interface
 */
export interface CarReplica {
    matchingId: number // The matchingId associated with the replica
    state: CarReplicaState // Current state of the replica
    filecoinClaimId: bigint // ID of the Filecoin claim associated with the replica's storage
    carId?: bigint // The id associated with the car.
}

/**
 * Represents a Car entity with default values.
 * @class
 */
export class Car extends Entity<Car> {
    constructor(data?: ValueFields<Car>) {
        super({
            hash: data?.hash || "0",
            carId: data?.carId || BigInt(0),
            datasetId: data?.datasetId || 0,
            size: data?.size || BigInt(0),
            replicasCount: data?.replicasCount || BigInt(0),
            matchingIds: data?.matchingIds || [],
            replicaInfos: data?.replicaInfos || [],
        })
    }
}

/**
 * Represents a Car Replica entity with default values.
 * @class
 */
export class CarReplica extends Entity<CarReplica> {
    constructor(data?: ValueFields<CarReplica>) {
        super({
            matchingId: data?.matchingId || 0,
            filecoinClaimId: data?.filecoinClaimId || BigInt(0),
            state: data?.state || CarReplicaState.None,
            carId: data?.carId || BigInt(0),
        })
    }
}
