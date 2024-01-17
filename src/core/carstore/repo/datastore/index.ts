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
import { DataStore } from "@unipackage/datastore"
import { ValueFields, Result } from "@unipackage/utils"
import { Car, CarReplica, ReplicaInfo } from "../../types"
import {
    CarDocument,
    CarSchema,
    CarReplicaDocument,
    CarReplicaSchema,
} from "./model"
import { MongooseDataStore, DatabaseConnection } from "@unipackage/datastore"
import { MatchingTarget } from "../../../../module/matching/target/types"
import {
    convertToCarArray,
    convertToCarReplicasArray,
} from "../../../../shared/converters"
import { CarstoreEvm } from "../evm"
import { DatasetRequirementEvm } from "../../../../module/dataset/requirement/repo/evm"
import { DatasetProofs } from "../../../../module/dataset/proof/types"
import { MatchingTargetEvm } from "../../../../module/matching/target/repo/evm"
import { CarReplicaState } from "../../../../shared/types/carstoreType"

/**
 * Class representing a MongoDB datastore for Car entities.
 * Extends the DataStore class with Car and CarDocument.
 * @class
 */
export class CarMongoDatastore extends DataStore<
    ValueFields<Car>,
    CarDocument
> {
    /**
     * Creates an instance of CarMongoDatastore.
     * @param {string} connection - The MongoDB connection.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<ValueFields<Car>, CarDocument>(
                "Car",
                CarSchema,
                connection
            )
        )
    }

    /**
     * Stores cars in the Carstore contract and updates the dataset requirement in the DatasetRequirement contract.
     * @param options - Object containing necessary parameters.
     * @param options.carstoreEvm - Instance of the CarstoreEvm contract.
     * @param options.requirementEvm - Instance of the DatasetRequirementEvm contract.
     * @param options.proofs - DatasetProofs containing proofs for car-related data.
     * @returns A Promise resolving to a Result indicating the success or failure of the operation.
     */
    async storeCars(options: {
        carstoreEvm: CarstoreEvm
        requirementEvm: DatasetRequirementEvm
        proofs: DatasetProofs
    }): Promise<Result<any>> {
        const cars = await convertToCarArray({
            carstoreEvm: options.carstoreEvm,
            requirementEvm: options.requirementEvm,
            proofs: options.proofs,
        })
        for (let i = 0; i < cars.length; i++) {
            const ret = await this.CreateOrupdateByUniqueIndexes(cars[i])
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
     * Asynchronously updates replica of car in the datastore with the specified options.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `carDatastore`: The car datastore instance for data operations.
     *   - `carId`: The unique identifier of the car to be updated.
     *   - `matchingId`: The matching identifier associated with the car.
     *   - `replicaIndex`: The replica index value for the update.
     * @returns A promise representing the completion of the update operation.
     */
    async updateReplica(options: {
        carstore: CarstoreEvm
        carId: bigint
        matchingId: number
        replicaIndex: bigint
    }): Promise<Result<any>> {
        try {
            let car = await this.find({
                conditions: [{ carId: options.carId }],
            })
            if (!car.ok) {
                return { ok: false, error: car.error }
            }
            if (options.replicaIndex >= car.data![0].replicaInfos!.length) {
                return {
                    ok: false,
                    error: new Error("invalid index of replicas"),
                }
            }

            const carReplica = await options.carstore.getCarReplica(
                options.carId,
                options.matchingId
            )

            let carReplicaState = CarReplicaState.None

            if (carReplica.ok) {
                carReplicaState = (carReplica.data! as CarReplica).state
            }

            car.data![0].replicaInfos![Number(options.replicaIndex)] =
                new ReplicaInfo({
                    matchingId:
                        car.data![0].replicaInfos![Number(options.replicaIndex)]
                            .matchingId,
                    state: carReplicaState,
                })

            return await this.update(
                { conditions: [{ carId: options.carId }] },
                { replicaInfos: car.data![0].replicaInfos }
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Asynchronously updates the state of all replicas of a matching using the specified parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `matchingTarget`: The Ethereum Virtual Machine instance for matching target.
     *   - `carstoreEvm`: The Ethereum Virtual Machine instance for carstore.
     *   - `matchingId`: The identifier of the matching.
     * @returns A promise that resolves to the result of the operation.
     */
    async updateAllReplicasStateOfMatching(options: {
        matchingTarget: MatchingTargetEvm
        carstore: CarstoreEvm
        matchingId: number
    }): Promise<Result<any>> {
        try {
            const target = await options.matchingTarget.getMatchingTarget(
                options.matchingId
            )
            if (!target.ok) {
                return { ok: false, error: target.error }
            }
            if (!target.data) {
                return {
                    ok: false,
                    error: new Error("get matching target failed"),
                }
            }
            const replicaIndex = target.data.replicaIndex

            let doStores: Promise<Result<any>>[] = []

            target.data.cars.map(async (car) => {
                doStores.push(
                    this.updateReplica({
                        carstore: options.carstore,
                        carId: BigInt(car),
                        matchingId: options.matchingId,
                        replicaIndex: replicaIndex,
                    })
                )
            })

            const results = await Promise.all(doStores)

            let ret: boolean = true

            const retError = results.forEach((res) => {
                if (!res.ok) {
                    ret = false
                    return new Error(
                        `updateAllReplicasStateOfMatching error:${res.error}`
                    )
                }
            })
            return { ok: ret, data: retError }
        } catch (error) {
            throw error
        }
    }
}

/**
 * Class representing a MongoDB datastore for CarReplica entities.
 * Extends the DataStore class with CarReplica and CarReplicaDocument.
 * @class
 */
export class CarReplicaMongoDatastore extends DataStore<
    ValueFields<CarReplica>,
    CarReplicaDocument
> {
    /**
     * Creates an instance of CarReplicaMongoDatastore.
     * @param {string} connection - The MongoDB connection.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<ValueFields<CarReplica>, CarReplicaDocument>(
                "CarReplica",
                CarReplicaSchema,
                connection
            )
        )
    }

    /**
     * Stores car replicas in the CarReplicaDatastore and updates the matching target.
     * @param options - Object containing necessary parameters.
     * @param options.target - MatchingTarget to be updated with the stored car replicas.
     * @param options.matchingTarget - The Ethereum Virtual Machine instance for matching target.
     * @returns A Promise resolving to a Result indicating the success or failure of the operation.
     */
    async storeCarReplicas(options: {
        matchingTarget: MatchingTargetEvm
        target: MatchingTarget
    }): Promise<Result<any>> {
        try {
            const target = await options.matchingTarget.getMatchingTarget(
                options.target.matchingId!
            )
            if (!target.ok) {
                return { ok: false, error: target.error }
            }
            if (!target.data) {
                return {
                    ok: false,
                    error: new Error("get matching target failed"),
                }
            }
            options.target.replicaIndex = target.data.replicaIndex

            const carReplicas = convertToCarReplicasArray(options.target)

            let doStores: Promise<Result<any>>[] = []

            carReplicas.map(async (carReplica) => {
                doStores.push(this.CreateOrupdateByUniqueIndexes(carReplica))
            })

            const results = await Promise.all(doStores)

            let ret: boolean = true
            const retError = results.forEach((res) => {
                if (!res.ok) {
                    ret = false
                    return new Error(
                        `updateAllReplicasStateOfMatching error:${res.error}`
                    )
                }
            })
            return { ok: ret, data: retError }
        } catch (error) {
            throw error
        }
    }

    /**
     * Asynchronously updates the state of a car with the specified parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `carstore`: The Ethereum Virtual Machine instance for carstore.
     *   - `carId`: The unique identifier of the car.
     *   - `matchingId`: The identifier of the matching associated with the car.
     */
    async updateState(options: {
        carstore: CarstoreEvm
        carId: bigint
        matchingId: number
    }): Promise<Result<any>> {
        try {
            let carReplicaState = CarReplicaState.StorageFailed
            const state = await options.carstore.getCarReplicaState(
                options.carId,
                options.matchingId
            )
            if (state.ok) {
                carReplicaState = Number(state.data) as CarReplicaState
            }
            return await this.update(
                {
                    conditions: [
                        {
                            carId: options.carId,
                        },
                        {
                            matchingId: options.matchingId,
                        },
                    ],
                },
                { state: Number(carReplicaState) }
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Asynchronously updates the states of all elements in the matching using the specified parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `matchingTarget`: The Ethereum Virtual Machine instance for matching target.
     *   - `carstore`: The Ethereum Virtual Machine instance for carstore.
     *   - `matchingId`: The identifier of the matching.
     * @returns A promise that resolves to the result of the operation.
     */
    async updateAllStatesOfMatching(options: {
        matchingTarget: MatchingTargetEvm
        carstore: CarstoreEvm
        matchingId: number
    }): Promise<Result<any>> {
        try {
            const target = await options.matchingTarget.getMatchingTarget(
                options.matchingId
            )
            if (!target.ok) {
                return { ok: false, error: target.error }
            }
            if (!target.data) {
                return {
                    ok: false,
                    error: new Error("get matching target failed"),
                }
            }
            let doStores: Promise<Result<any>>[] = []

            target.data.cars.map(async (car) => {
                doStores.push(
                    this.updateState({
                        carstore: options.carstore,
                        carId: BigInt(car),
                        matchingId: options.matchingId,
                    })
                )
            })

            const results = await Promise.all(doStores)

            let ret: boolean = true

            const retError = results.forEach((res) => {
                if (!res.ok) {
                    ret = false
                    return new Error(
                        `updateAllStatesOfMatching error:${res.error}`
                    )
                }
            })

            return { ok: ret, data: retError }
        } catch (error) {
            throw error
        }
    }
}
