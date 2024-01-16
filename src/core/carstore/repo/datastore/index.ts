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
import { Car, CarReplica } from "../../types"
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
        carstoreEvm: CarstoreEvm
        carId: bigint
        matchingId: number
        replicaIndex: number
    }): Promise<Result<any>> {
        let car = await this.find({
            conditions: [{ carId: options.carId }],
        })
        if (!car.ok) {
            return { ok: false, error: car.error }
        }
        if (options.replicaIndex >= car.data![0].replicaInfos!.length) {
            return { ok: false, error: new Error("invalid index of replicas") }
        }

        const carReplica = await options.carstoreEvm.getCarReplica(
            options.carId,
            options.matchingId
        )

        if (!carReplica.ok) {
            return { ok: false, error: carReplica.error }
        }

        car.data![0].replicaInfos![options.replicaIndex] =
            carReplica.data! as CarReplica

        return await this.update(
            { conditions: [{ carId: options.carId }] },
            { replicaInfos: car.data![0].replicaInfos }
        )
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
     * @returns A Promise resolving to a Result indicating the success or failure of the operation.
     */
    async storeCarReplicas(options: {
        target: MatchingTarget
    }): Promise<Result<any>> {
        const carReplicas = convertToCarReplicasArray(options.target)
        for (let i = 0; i < carReplicas.length; i++) {
            const ret = await this.CreateOrupdateByUniqueIndexes(carReplicas[i])
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
            const state = await options.carstore.getCarReplicaState(
                options.carId,
                options.matchingId
            )
            if (!state.ok) {
                return { ok: false, error: state.error }
            }
            return await this.update(
                {
                    conditions: [
                        {
                            carId: options.carId,
                            matchingId: options.matchingId,
                        },
                    ],
                },
                { state: Number(state.data) }
            )
        } catch (error) {
            throw error
        }
    }
}
