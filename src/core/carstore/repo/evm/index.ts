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

import { withCallMethod, EvmOutput } from "@unipackage/net"
import { Car, CarReplica } from "../../types"
import { CarReplicaState } from "../../../../shared/types/carstoreType"
import { EvmEx } from "../../../../shared/types/evmEngineType"

/**
 * Interface for EVM calls related to Carstore.
 */
interface CarstoreCallEvm {
    /**
     * @notice Get the car information associated with a car.
     * @param id Car ID to check.
     * @return The car information.
     */
    getCar(id: bigint): Promise<EvmOutput<Car>>

    /**
     * @notice Get the dataset ID associated with a car.
     * @param id Car ID to check.
     * @return The car size of the car.
     */
    getCarSize(id: bigint): Promise<EvmOutput<bigint>>

    /**
     * @notice Get the total size of cars based on an array of car IDs.
     * @param ids An array of car IDs for which to calculate the size.
     * @return The total size of cars.
     */
    getCarsSize(ids: bigint[]): Promise<EvmOutput<bigint>>

    /**
     * @notice Get the dataset ID associated with a car.
     * @param id Car ID to check.
     * @return The dataset ID of the car.
     * NOTE: a car only belongs a datasets
     */
    getCarDatasetId(id: bigint): Promise<EvmOutput<number>>

    /**
     * @notice Get the matching ids of a replica associated with a car.
     * @param id Car ID associated with the replica.
     * @return The matching ids of the car's replica.
     */
    getCarMatchingIds(id: bigint): Promise<EvmOutput<number[]>>

    /**
     * @notice Get the replica details associated with a car.
     * @param id Car ID associated with the replica.
     * @param matchingId Matching ID of the replica.
     * @return The dataset ID, state, and Filecoin claim ID of the replica.
     */
    getCarReplica(
        id: bigint,
        matchingId: number
    ): Promise<EvmOutput<CarReplica>>

    /**
     * @notice Get the count of replicas associated with a car.
     * @param id Car ID for which to retrieve the replica count.
     * @return The count of replicas associated with the car.
     */
    getCarReplicasCount(id: bigint): Promise<EvmOutput<bigint>>

    /**
     * @notice Get the Filecoin claim ID associated with a specific replica of a car.
     * @param id Car ID associated with the replica.
     * @param matchingId Matching ID of the replica.
     * @return The Filecoin claim ID of the replica.
     */
    getCarReplicaFilecoinClaimId(
        id: bigint,
        matchingId: number
    ): Promise<EvmOutput<bigint>>

    /**
     * @notice Get the state of a replica associated with a car.
     * @param id Car ID associated with the replica.
     * @param matchingId Matching ID of the replica.
     * @return The state of the replica.
     */
    getCarReplicaState(
        id: bigint,
        matchingId: number
    ): Promise<EvmOutput<CarReplicaState>>

    /**
     * @notice Get the hash of car based on the car id.
     * @param id Car ID which to get car hash.
     * @return The hash of the car.
     */
    getCarHash(id: bigint): Promise<EvmOutput<string>>

    /**
     * @notice Get the hashs of cars based on an array of car IDs.
     * @param ids An array of car IDs for which to get car hashs.
     * @return The hashs of cars.
     */
    getCarsHashs(ids: bigint[]): Promise<EvmOutput<string[]>>

    /**
     * @notice Get the car's id based on the car's hash.
     * @param hash The hash which to get car id.
     * @return The id of the car.
     */
    getCarId(hash: string): Promise<EvmOutput<bigint>>

    /**
     * @notice Get the ids of cars based on an array of car hashs.
     * @param hashs An array of car hashs for which to cat car hashs.
     * @return The ids of cars.
     */
    getCarsIds(hashs: string[]): Promise<EvmOutput<bigint[]>>

    /**
     * @notice Check if a car exists based on its Hash.
     * @param hash Car Hash to check.
     * @return True if the car exists, false otherwise.
     */
    hasCarHash(hash: string): Promise<EvmOutput<boolean>>

    /**
     * @notice Check if a car exists based on its ID.
     * @param id Car ID to check.
     * @return True if the car exists, false otherwise.
     */
    hasCar(id: bigint): Promise<EvmOutput<boolean>>

    /**
     * @notice Check if a replica exists within a car based on its matching ID.
     * @param id Car ID to check.
     * @param matchingId Matching ID of the replica to check.
     * @return True if the replica exists, false otherwise.
     */
    hasCarReplica(id: bigint, matchingId: number): Promise<EvmOutput<boolean>>

    /**
     * @notice Check if a car exists based on its Hashs.
     * @dev This function returns whether a car exists or not.
     * @param hashs  Array of car Hashs to check.
     * @return True if the car exists, false otherwise.
     */
    hasCarsHashs(hashs: string[]): Promise<EvmOutput<boolean>>

    /**
     * @notice Check if multiple cars exist based on their IDs.
     * @param ids Array of car IDs to check.
     * @return True if all specified cars exist, false if any one does not exist.
     */
    hasCars(ids: bigint[]): Promise<EvmOutput<boolean>>

    /**
     * @returns The cars count
     */
    carsCount(): Promise<EvmOutput<bigint>>
}

/**
 * Interface for EVM transactions related to Carstore.
 */
interface CarstoreSendEvm {}

/**
 * Combined interface for EVM calls and transactions related to Carstore.
 */
export interface CarstoreOriginEvm extends CarstoreCallEvm, CarstoreSendEvm {}

/**
 * Implementation of CarstoreOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "getCar",
    "getCarSize",
    "getCarsSize",
    "getCarDatasetId",
    "getCarMatchingIds",
    "getCarReplica",
    "getCarReplicasCount",
    "getCarReplicaFilecoinClaimId",
    "getCarReplicaState",
    "getCarHash",
    "getCarsHashs",
    "getCarId",
    "getCarsIds",
    "hasCarHash",
    "hasCar",
    "hasCarReplica",
    "hasCarsHashs",
    "hasCars",
    "carsCount",
])
export class CarstoreOriginEvm extends EvmEx {}

/**
 * Extended class for CarstoreOriginEvm with additional message decoding.
 */
export class CarstoreEvm extends CarstoreOriginEvm {
    /**
     * Get information about a specific car.
     * @param id - The unique identifier of the car.
     * @returns A Promise object containing car information.
     */
    async getCar(id: bigint): Promise<EvmOutput<Car>> {
        const metaRes = await super.getCar(id)
        if (metaRes.ok && metaRes.data) {
            return {
                ok: true,
                data: new Car({
                    ...metaRes.data,
                    id: id,
                }),
            }
        }
        return metaRes
    }

    /**
     * Get information about a specific car replica.
     * @param id - The unique identifier of the car.
     * @param matchingId - Matching identifier.
     * @returns A Promise object containing car replica information.
     */
    async getCarReplica(
        id: bigint,
        matchingId: number
    ): Promise<EvmOutput<CarReplica>> {
        const metaRes = await super.getCarReplica(id, matchingId)
        if (metaRes.ok && metaRes.data) {
            return {
                ok: true,
                data: new CarReplica({
                    ...metaRes.data,
                    matchingId: matchingId,
                }),
            }
        }
        return metaRes
    }
}
