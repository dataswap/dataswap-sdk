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

import { Car } from "../../../../src/core/carstore/types"
import { CarReplica } from "../../../../src/core/carstore/types"
import { CarReplicaState } from "../../../../src/shared/types/carstoreType"

/**
 * Interface for asserting operations on a CarstoreEvm instance.
 */
export interface ICarstoreAssertion {

    /**
     * Asserts the details of a car with a specific ID.
     * @param {number} id - The ID of the car.
     * @param {Car} expectCar - The expected details of the car.
     * @returns {Promise<void>}
     */
    getCarAssertion(id: number, expectCar: Car): Promise<void>

    /**
     * Asserts the size of a car with a specific ID.
     * @param {number} id - The ID of the car.
     * @param {number} expectSize - The expected size of the car.
     * @returns {Promise<void>}
     */
    getCarSizeAssertion(id: number, expectSize: number): Promise<void>

    /**
     * Asserts the total size of multiple cars with specific IDs.
     * @param {number[]} ids - The IDs of the cars.
     * @param {number} expectSize - The expected total size of the cars.
     * @returns {Promise<void>}
     */
    getCarsSizeAssertion(ids: number[], expectSize: number): Promise<void>

    /**
      * Asserts the dataset ID of a car with a specific ID.
      * @param {number} id - The ID of the car.
      * @param {number} expectDatasetId - The expected dataset ID of the car.
      * @returns {Promise<void>}
      */
    getCarDatasetIdAssertion(id: number, expectDatasetId: number): Promise<void>

    /**
     * Asserts the matching IDs of a car with a specific ID.
     * @param {number} id - The ID of the car.
     * @param {number} expectMatchingIds - The expected matching IDs of the car.
     * @returns {Promise<void>}
     */
    getCarMatchingIdsAssertion(id: number, expectMatchingIds: number): Promise<void>

    /**
     * Asserts the details of a car replica with specific IDs.
     * @param {number} id - The ID of the car.
     * @param {number} matchingId - The ID of the matching car.
     * @param {CarReplica} expectCarReplica - The expected details of the car replica.
     * @returns {Promise<void>}
     */
    getCarReplicaAssertion(id: number, matchingId: number, expectCarReplica: CarReplica): Promise<void>

    /**
     * Asserts the count of replicas for a car with a specific ID.
     * @param {number} id - The ID of the car.
     * @param {number} expectCount - The expected count of replicas.
     * @returns {Promise<void>}
     */
    getCarReplicasCountAssertion(id: number, expectCount: number): Promise<void>

    /**
     * Asserts the Filecoin claim ID of a car replica with specific IDs.
     * @param {number} id - The ID of the car.
     * @param {number} matchingId - The ID of the matching car.
     * @param {number} expectClaimId - The expected Filecoin claim ID.
     * @returns {Promise<void>}
     */
    getCarReplicaFilecoinClaimIdAssertion(id: number, matchingId: number, expectClaimId: number): Promise<void>

    /**
      * Asserts the state of a car replica with specific IDs.
      * @param {number} id - The ID of the car.
      * @param {number} matchingId - The ID of the matching car.
      * @param {CarReplicaState} expectState - The expected state of the car replica.
      * @returns {Promise<void>}
      */
    getCarReplicaStateAssertion(id: number, matchingId: number, expectState: CarReplicaState): Promise<void>

    /**
     * Asserts the hash of a car with a specific ID.
     * @param {number} id - The ID of the car.
     * @param {string} expectHash - The expected hash of the car.
     * @returns {Promise<void>}
     */
    getCarHashAssertion(id: number, expectHash: string): Promise<void>

    /**
     * Asserts the hashes of cars with specific IDs.
     * @param {number[]} ids - The IDs of the cars to check.
     * @param {string[]} expectHashs - The expected hashes of the cars.
     * @returns {Promise<void>}
     */
    getCarsHashsAssertion(ids: number[], expectHashs: string[]): Promise<void>

    /**
     * Asserts the ID of a car with a specific hash.
     * @param {string} hash - The hash of the car.
     * @param {number} expectId - The expected ID of the car.
     * @returns {Promise<void>}
     */
    getCarIdAssertion(hash: string, expectId: number): Promise<void>

    /**
     * Asserts the IDs of cars with specific hashes.
     * @param {string[]} hashs - The hashes of the cars to check.
     * @param {number[]} expectIds - The expected IDs of the cars.
     * @returns {Promise<void>}
     */
    getCarsIdsAssertion(hashs: string[], expectIds: number[]): Promise<void>

    /**
     * Asserts the count of cars.
     * @param {number} expectCount - The expected count of cars.
     * @returns {Promise<void>}
     */
    carsCountAssertion(expectCount: number): Promise<void>

    /**
     * Asserts the existence of a car hash.
     * @param {string} hash - The hash of the car.
     * @param {boolean} expectHas - The expected existence status.
     * @returns {Promise<void>}
     */
    hasCarHashAssertion(hash: string, expectHas: boolean): Promise<void>

    /**
     * Asserts the existence of a car with a specific ID.
     * @param {number} id - The ID of the car.
     * @param {boolean} expectHas - The expected existence status.
     * @returns {Promise<void>}
     */
    hasCarAssertion(id: number, expectHas: boolean): Promise<void>

    /**
     * Asserts the existence of a car replica with specific IDs.
     * @param {number} id - The ID of the car.
     * @param {number} matchingId - The ID of the matching car.
     * @param {boolean} expectHas - The expected existence status.
     * @returns {Promise<void>}
     */
    hasCarReplicaAssertion(id: number, matchingId: number, expectHas: boolean): Promise<void>

    /**
     * Asserts the existence of car hashes.
     * @param {string[]} hashs - The hashes of the cars to check.
     * @param {boolean} expectHas - The expected existence status.
     * @returns {Promise<void>}
     */
    hasCarsHashsAssertion(hashs: string[], expectHas: boolean): Promise<void>

    /**
     * Asserts the existence of cars with specific IDs.
     * @param {string[]} ids - The IDs of the cars to check.
     * @param {boolean} expectHas - The expected existence status.
     * @returns {Promise<void>}
     */
    hasCarsAssertion(ids: string[], expectHas: boolean): Promise<void>
}
