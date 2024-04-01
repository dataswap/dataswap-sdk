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
import { dataCommitmentV1ToCID } from "../../../../shared/converters"
import { Car, CarReplica } from "../../types"
import { CarReplicaState } from "../../../../shared/types/carstoreType"
import { EvmEx } from "../../../../shared/types/evmEngineType"

/**
 * Interface for EVM calls related to Carstore.
 */
interface CarstoreCallEvm {
    /**
     * @notice Get the car information associated with a car.
     * @param carId Car ID to check.
     * @return The car information.
     */
    getCar(carId: bigint): Promise<EvmOutput<Car>>

    /**
     * @notice Get the dataset ID associated with a car.
     * @param carId Car ID to check.
     * @return The car size of the car.
     */
    getCarSize(carId: bigint): Promise<EvmOutput<bigint>>

    /**
     * @notice Get the total size of cars based on an array of car IDs.
     * @param carIds An array of car IDs for which to calculate the size.
     * @return The total size of cars.
     */
    getCarsSize(carIds: bigint[]): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the piece size for a given car ID.
     * @param carId The ID of the car.
     * @returns A promise that resolves to the piece size of the car.
     */
    getPieceSize(carId: bigint): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the total piece size for an array of car IDs.
     * @param carIds An array containing the IDs of cars.
     * @returns A promise that resolves to the total piece size of the cars.
     */

    getPiecesSize(carIds: bigint[]): Promise<EvmOutput<bigint>>
    /**
     * @notice Get the dataset ID associated with a car.
     * @param carId Car ID to check.
     * @return The dataset ID of the car.
     * NOTE: a car only belongs a datasets
     */
    getCarDatasetId(carId: bigint): Promise<EvmOutput<number>>

    /**
     * @notice Get the matching carIds of a replica associated with a car.
     * @param carId Car ID associated with the replica.
     * @return The matching carIds of the car's replica.
     */
    getCarMatchingIds(carId: bigint): Promise<EvmOutput<number[]>>

    /**
     * @notice Get the replica details associated with a car.
     * @param carId Car ID associated with the replica.
     * @param matchingId Matching ID of the replica.
     * @return The dataset ID, state, and Filecoin claim ID of the replica.
     */
    getCarReplica(
        carId: bigint,
        matchingId: number
    ): Promise<EvmOutput<CarReplica>>

    /**
     * @notice Get the count of replicas associated with a car.
     * @param carId Car ID for which to retrieve the replica count.
     * @return The count of replicas associated with the car.
     */
    getCarReplicasCount(carId: bigint): Promise<EvmOutput<bigint>>

    /**
     * @notice Get the Filecoin claim ID associated with a specific replica of a car.
     * @param carId Car ID associated with the replica.
     * @param matchingId Matching ID of the replica.
     * @return The Filecoin claim ID of the replica.
     */
    getCarReplicaFilecoinClaimId(
        carId: bigint,
        matchingId: number
    ): Promise<EvmOutput<bigint>>

    /**
     * @notice Get the state of a replica associated with a car.
     * @param carId Car ID associated with the replica.
     * @param matchingId Matching ID of the replica.
     * @return The state of the replica.
     */
    getCarReplicaState(
        carId: bigint,
        matchingId: number
    ): Promise<EvmOutput<CarReplicaState>>

    /**
     * @notice Get the hash of car based on the car carId.
     * @param carId Car ID which to get car hash.
     * @return The hash of the car.
     */
    getCarHash(carId: bigint): Promise<EvmOutput<string>>

    /**
     * @notice Get the hashs of cars based on an array of car IDs.
     * @param carIds An array of car IDs for which to get car hashs.
     * @return The hashs of cars.
     */
    getCarsHashs(carIds: bigint[]): Promise<EvmOutput<string[]>>

    /**
     * @notice Get the car's carId based on the car's hash.
     * @param hash The hash which to get car carId.
     * @return The carId of the car.
     */
    getCarId(hash: string): Promise<EvmOutput<bigint>>

    /**
     * @notice Get the carIds of cars based on an array of car hashs.
     * @param hashs An array of car hashs for which to cat car hashs.
     * @return The carIds of cars.
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
     * @param carId Car ID to check.
     * @return True if the car exists, false otherwise.
     */
    hasCar(carId: bigint): Promise<EvmOutput<boolean>>

    /**
     * @notice Check if a replica exists within a car based on its matching ID.
     * @param carId Car ID to check.
     * @param matchingId Matching ID of the replica to check.
     * @return True if the replica exists, false otherwise.
     */
    hasCarReplica(
        carId: bigint,
        matchingId: number
    ): Promise<EvmOutput<boolean>>

    /**
     * @notice Check if a car exists based on its Hashs.
     * @dev This function returns whether a car exists or not.
     * @param hashs  Array of car Hashs to check.
     * @return True if the car exists, false otherwise.
     */
    hasCarsHashs(hashs: string[]): Promise<EvmOutput<boolean>>

    /**
     * @notice Check if multiple cars exist based on their IDs.
     * @param carIds Array of car IDs to check.
     * @return True if all specified cars exist, false if any one does not exist.
     */
    hasCars(carIds: bigint[]): Promise<EvmOutput<boolean>>

    /**
     * @returns The cars count
     */
    carsCount(): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the roles associated with the current user.
     * @returns A promise that resolves with the roles of the current user.
     */
    roles(): Promise<EvmOutput<string>>
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
    "getPieceSize",
    "getPiecesSize",
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
    "roles",
])
export class CarstoreOriginEvm extends EvmEx {}

/**
 * Extended class for CarstoreOriginEvm with additional message decoding.
 */
export class CarstoreEvm extends CarstoreOriginEvm {
    /**
     * Get information about a specific car.
     * @param carId - The unique carIdentifier of the car.
     * @returns A Promise object containing car information.
     */
    async getCar(carId: bigint): Promise<EvmOutput<Car>> {
        const metaRes = await super.getCar(carId)
        if (metaRes.ok && metaRes.data) {
            return {
                ok: true,
                data: new Car({
                    ...metaRes.data,
                    carId: carId,
                    cid: await dataCommitmentV1ToCID(metaRes.data.hash),
                }),
            }
        }
        return metaRes
    }

    /**
     * Get information about a specific car replica.
     * @param carId - The unique carIdentifier of the car.
     * @param matchingId - Matching carIdentifier.
     * @returns A Promise object containing car replica information.
     */
    async getCarReplica(
        carId: bigint,
        matchingId: number
    ): Promise<EvmOutput<CarReplica>> {
        const metaRes = await super.getCarReplica(carId, matchingId)
        if (metaRes.ok && metaRes.data) {
            return {
                ok: true,
                data: new CarReplica({
                    matchingId: matchingId,
                    carId: carId,
                    state: Number(metaRes.data.state) as CarReplicaState,
                    filecoinClaimId: metaRes.data.filecoinClaimId,
                }),
            }
        }
        return metaRes
    }

    /**
     * Asynchronously retrieves the state of a car replica with the specified parameters.
     *
     * @param carId - The unique identifier of the car.
     * @param matchingId - The identifier of the matching associated with the car replica.
     * @returns A promise that resolves to the Ethereum Virtual Machine output containing the car replica state.
     */
    async getCarReplicaState(
        carId: bigint,
        matchingId: number
    ): Promise<EvmOutput<CarReplicaState>> {
        const metaRes = await super.getCarReplicaState(carId, matchingId)
        if (metaRes.ok && metaRes.data) {
            return {
                ok: true,
                data: Number(metaRes.data) as CarReplicaState,
            }
        }
        return metaRes
    }
}
