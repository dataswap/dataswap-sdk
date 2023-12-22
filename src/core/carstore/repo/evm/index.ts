import {
    withCallMethod,
    EvmOutput
} from "@unipackage/net"
import { Car, CarReplica } from "../../types"
import { State } from "../../../../shared/types/carstoreType"
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
    getCar(
        id: number
    ): Promise<EvmOutput<Car>>

    /**
     * @notice Get the dataset ID associated with a car. 
     * @param id Car ID to check.
     * @return The car size of the car.
     */
    getCarSize(id: number): Promise<EvmOutput<number>>

    /**
     * @notice Get the total size of cars based on an array of car IDs.
     * @param ids An array of car IDs for which to calculate the size.
     * @return The total size of cars.
     */
    getCarsSize(ids: number[]): Promise<EvmOutput<number>>

    /**
     * @notice Get the dataset ID associated with a car.
     * @param id Car ID to check.
     * @return The dataset ID of the car.
     * NOTE: a car only belongs a datasets
    */
    getCarDatasetId(id: number): Promise<EvmOutput<number>>

    /**
     * @notice Get the matching ids of a replica associated with a car.
     * @param id Car ID associated with the replica.
     * @return The matching ids of the car's replica.
     */
    getCarMatchingIds(
        id: number
    ): Promise<EvmOutput<number[]>>

    /**
     * @notice Get the replica details associated with a car.
     * @param id Car ID associated with the replica.
     * @param matchingId Matching ID of the replica. 
     * @return The dataset ID, state, and Filecoin claim ID of the replica.
     */
    getCarReplica(
        id: number,
        matchingId: number
    ): Promise<EvmOutput<CarReplica>>

    /**
     * @notice Get the count of replicas associated with a car.
     * @param id Car ID for which to retrieve the replica count.
     * @return The count of replicas associated with the car.
     */
    getCarReplicasCount(id: number): Promise<EvmOutput<number>>

    /**
     * @notice Get the Filecoin claim ID associated with a specific replica of a car.
     * @param id Car ID associated with the replica.
     * @param matchingId Matching ID of the replica.
     * @return The Filecoin claim ID of the replica.
     */
    getCarReplicaFilecoinClaimId(
        id: number,
        matchingId: number
    ): Promise<EvmOutput<number>>

    /**
     * @notice Get the state of a replica associated with a car.
     * @param id Car ID associated with the replica.
     * @param matchingId Matching ID of the replica.
     * @return The state of the replica.
     */
    getCarReplicaState(
        id: number,
        matchingId: number
    ): Promise<EvmOutput<State>>

    /**
     * @notice Get the hash of car based on the car id.
     * @param id Car ID which to get car hash.
     * @return The hash of the car.
     */
    getCarHash(id: number): Promise<EvmOutput<string>>

    /**
     * @notice Get the hashs of cars based on an array of car IDs.
     * @param ids An array of car IDs for which to get car hashs.
     * @return The hashs of cars.
     */
    getCarsHashs(
        ids: number[]
    ): Promise<EvmOutput<string[]>>

    /**
     * @notice Get the car's id based on the car's hash.
     * @param hash The hash which to get car id.
     * @return The id of the car.
     */
    getCarId(hash: string): Promise<EvmOutput<number>>

    /**
     * @notice Get the ids of cars based on an array of car hashs.
     * @param hashs An array of car hashs for which to cat car hashs.
     * @return The ids of cars.
     */
    getCarsIds(
        hashs: string[]
    ): Promise<EvmOutput<number[]>>

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
    hasCar(id: number): Promise<EvmOutput<boolean>>

    /**
     * @notice Check if a replica exists within a car based on its matching ID.
     * @param id Car ID to check.
     * @param matchingId Matching ID of the replica to check.
     * @return True if the replica exists, false otherwise.
     */
    hasCarReplica(
        id: number,
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
     * @param ids Array of car IDs to check.
     * @return True if all specified cars exist, false if any one does not exist.
     */
    hasCars(ids: string[]): Promise<EvmOutput<boolean>>

    /**
     * @returns The cars count
     */
    carsCount(): Promise<EvmOutput<number>>
}

/**
 * Interface for EVM transactions related to Carstore.
 */
interface CarstoreSendEvm { }

/**
 * Combined interface for EVM calls and transactions related to Carstore.
 */
export interface CarstoreOriginEvm
    extends CarstoreCallEvm,
    CarstoreSendEvm { }

/**
 * Implementation of CarstoreOriginEvm with specific EVM methods.
 */
@withCallMethod(
    [
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
        "carsCount"
    ]
)
export class CarstoreOriginEvm extends EvmEx { }

/**
 * Extended class for CarstoreOriginEvm with additional message decoding.
 */
export class CarstoreEvm extends CarstoreOriginEvm { }