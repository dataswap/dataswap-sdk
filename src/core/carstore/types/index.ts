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
import { CarReplicaState } from "../../../shared/types/carstoreType";

export interface Car {
    hash: string; // car hash
    datasetId: number; // Index of approved dataset
    size: number; //car size
    replicasCount: number; // Replica count
    matchingIds: number[]; // Matching Ids.
    id: number; // The id associated with the car.
}

export interface CarReplica {
    state: CarReplicaState; // Current state of the replica
    filecoinClaimId: number; // ID of the Filecoin claim associated with the replica's storage
}

export class Car extends Entity<Car> {
    constructor(data?: ValueFields<Car>) {
        super({
            hash: data?.hash || "",
            id: data?.id || 0,
            datasetId: data?.datasetId || 0,
            size: data?.size || 0,
            replicasCount: data?.replicasCount || 0,
            matchingIds: data?.matchingIds || []
        })
    }
}

export class CarReplica extends Entity<CarReplica> {
    constructor(data?: ValueFields<CarReplica>) {
        super({
            filecoinClaimId: data?.filecoinClaimId || 0,
            state: data?.state || CarReplicaState.None
        })
    }
}