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

import {
    withCallMethod,
    withSendMethod,
    EvmOutput,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../../message/types"
import { DataType } from "../../../../../shared/types/dataType"
import { EvmEx } from "../../../../../shared/types/evmEngineType"
import { DatasetState } from "../../../../../shared/types/datasetType"
import { mergeBigIntRangesToCompleteArray } from "../../../../../shared/arrayUtils"
import { ethAddressFromDelegated } from "@glif/filecoin-address"

/**
 * Interface representing the Ethereum Virtual Machine (EVM) call structure for a dataset proof.
 * @interface
 */
interface DatasetProofCallEvm {
    /**
     *  Get dataset source Hashs
     * @param datasetId The ID of the dataset for which to get the proof.
     * @param dataType The data type of the proof.
     * @param index The index of the proof.
     * @param len The length of the proof.
     * @returns The Hashs of the dataset's proof.
     */
    getDatasetProof(
        datasetId: number,
        dataType: DataType,
        index: number,
        len: number
    ): Promise<EvmOutput<string[]>>

    /**
     * Get dataset proof count.
     * @param datasetId The ID of the dataset for which to get the count of the proof.
     * @param dataType The data type of the proof.
     * @returns The count of the hashs of the dataset's proof.
     */
    getDatasetProofCount(
        datasetId: number,
        dataType: DataType
    ): Promise<EvmOutput<number>>

    /**
     * Get dataset proof's submitter.
     * @param datasetId The ID of the dataset for which to get the submitter of the proof.
     * @returns The address of the submitter of the proof.
     */
    getDatasetProofSubmitter(datasetId: number): Promise<EvmOutput<string>>

    /**
     * Get dataset size.
     * @param datasetId The ID of the dataset for which to get the size of the dataset.
     * @param dataType The data type of the proof.
     * @returns The size of the dataset.
     */
    getDatasetSize(
        datasetId: number,
        dataType: DataType
    ): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the unpadded size of the dataset for a given dataset ID and data type.
     * @param datasetId The ID of the dataset.
     * @param dataType The data type for which to retrieve the unpadded size.
     * @returns A promise that resolves to the unpadded size of the dataset.
     */
    getDatasetUnpadSize(
        datasetId: number,
        dataType: DataType
    ): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the complete height of the dataset proof.
     * @param datasetId The ID of the dataset.
     * @returns A promise resolving to the complete height of the dataset proof.
     */
    getDatasetProofCompleteHeight(datasetId: number): Promise<EvmOutput<number>>

    /**
     * Retrieves the Merkle root hash of the dataset for the specified dataset ID and data type.
     * @param datasetId The ID of the dataset for which to retrieve the Merkle root hash.
     * @param dataType The type of data for which to retrieve the Merkle root hash.
     * @returns A Promise that resolves to an EvmOutput<string> containing the Merkle root hash.
     */
    getDatasetProofRootHash(
        datasetId: number,
        dataType: DataType
    ): Promise<EvmOutput<string>>

    /**
     * Checks if a specific car is present in a dataset identified by its ID.
     * @param datasetId - The ID of the dataset.
     * @param id - The ID of the car to check.
     * @returns True if the car is present; otherwise, false.
     */
    isDatasetProofallCompleted(
        datasetId: number,
        dataType: DataType
    ): Promise<EvmOutput<boolean>>

    /**
     * Checks if a specific car is present in a dataset identified by its ID.
     * @param datasetId - The ID of the dataset.
     * @param id - The ID of the car to check.
     * @returns True if the car is present; otherwise, false.
     */
    isDatasetContainsCar(
        datasetId: number,
        id: number
    ): Promise<EvmOutput<boolean>>

    /**
     * Checks if multiple cars are present in a dataset identified by its ID.
     * @param datasetId - The ID of the dataset.
     * @param ids - An array of car IDs to check.
     * @returns True if all specified cars are present; otherwise, false.
     */
    isDatasetContainsCars(
        datasetId: number,
        ids: number[]
    ): Promise<EvmOutput<boolean>>

    /**
     * Checks if a specific address is the proof submitter for a dataset identified by its ID.
     * @param datasetId - The ID of the dataset.
     * @param submitter - The address to check.
     * @returns True if the address is the proof submitter; otherwise, false.
     */
    isDatasetProofSubmitter(
        datasetId: number,
        submitter: string
    ): Promise<EvmOutput<boolean>>

    /**
     * Checks if the associated dataset with the specified ID contains the given car ID.
     * @param datasetId The ID of the associated dataset.
     * @param carId The ID of the car to check.
     * @returns A promise resolving to true if the associated dataset contains the car, otherwise false.
     */
    isAssociatedDatasetContainsCar(
        datasetId: number,
        carId: number
    ): Promise<EvmOutput<boolean>>

    /**
     * Checks if the proof submission for the dataset with the specified ID has timed out.
     * @param datasetId The ID of the dataset to check.
     * @returns A promise resolving to true if the proof submission has timed out, otherwise false.
     */
    isDatasetProofTimeout(datasetId: number): Promise<EvmOutput<boolean>>

    /**
     * Retrieves the roles associated with the current user.
     * @returns A promise that resolves with the roles of the current user.
     */
    roles(): Promise<EvmOutput<string>>
}

/**
 * Interface representing the Ethereum Virtual Machine (EVM) send structure for a dataset proof.
 * @interface
 */
interface DatasetProofSendEvm {
    /**
     * Submit proof root for a dataset
     * @param datasetId The ID of the dataset for which to submit proof.
     * @param dataType The data type of the proof.
     * @param mappingFilesAccessMethod The access method of the dataset.
     * @param rootHash The root hash of the proof.
     * @param options The options of transaction.
     */
    submitDatasetProofRoot(
        datasetId: number,
        dataType: DataType,
        mappingFilesAccessMethod: string,
        rootHash: string,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Submit proof for a dataset
     * @param datasetId The ID of the dataset for which to submit proof.
     * @param dataType The data type of the proof.
     * @param leafHashes The leaf hashes of the proof.
     * @param leafIndex The index of leaf hashes.
     * @param leafSizes The sizes of the leaf hashes.
     * @param completed A boolean indicating if the proof is completed.
     * @param options The options of transaction.
     */
    submitDatasetProof(
        datasetId: number,
        dataType: DataType,
        leafHashes: string[],
        leafIndex: number,
        leafSizes: number[],
        completed: boolean,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Submits dataset proof with associated car IDs.
     * @param datasetId The ID of the dataset.
     * @param dataType The type of data being submitted.
     * @param leavesStarts The start indices of the leaves.
     * @param leavesEnds The end indices of the leaves.
     * @param leafIndex The index of the leaf.
     * @param completed Indicates whether the submission is completed.
     * @returns A promise resolving to void.
     */
    submitDatasetProofWithCarIds(
        datasetId: number,
        dataType: DataType,
        leavesStarts: number[],
        leavesEnds: number[],
        leafIndex: number,
        completed: boolean
    ): Promise<EvmOutput<void>>

    /**
     *  Submit proof completed for a dataset.
     * @param datasetId The ID of the dataset for which to submit proof completed.
     * @param options The options of transaction.
     */
    submitDatasetProofCompleted(
        datasetId: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<DatasetState>>

    /**
     * Completes escrow for a dataset.
     * @param datasetId The ID of the dataset.
     * @returns A promise resolving to void.
     */
    completeEscrow(datasetId: number): Promise<EvmOutput<void>>
}
/**
 * Combined interface for EVM calls and transactions related to DatasetProof contract.
 */
export interface DatasetProofOriginEvm
    extends DatasetProofCallEvm,
        DatasetProofSendEvm {}
/**
 * Implementation of DatasetProofOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "getDatasetProof",
    "getDatasetProofCount",
    "getDatasetProofSubmitter",
    "getDatasetSize",
    "getDatasetUnpadSize",
    "getDatasetProofCompleteHeight",
    "getDatasetProofRootHash",
    "isDatasetProofallCompleted",
    "isDatasetContainsCar",
    "isDatasetContainsCars",
    "isDatasetProofSubmitter",
    "isAssociatedDatasetContainsCar",
    "isDatasetProofTimeout",
    "roles",
])
@withSendMethod([
    "submitDatasetProofRoot",
    "submitDatasetProof",
    "submitDatasetProofWithCarIds",
    "submitDatasetProofCompleted",
    "completeEscrow",
])
export class DatasetProofOriginEvm extends EvmEx {}

/**
 * Extended class for DatasetProofEvm with additional message decoding.
 */
export class DatasetProofEvm extends DatasetProofOriginEvm {
    decodeMessage(msg: Message): EvmOutput<DataswapMessage> {
        const decoder = new ContractMessageDecoder(this)
        const decodeRes = decoder.decode(msg)
        if (!decodeRes.ok && !decodeRes.data) {
            return { ok: false, error: decodeRes.error }
        }

        let result: DataswapMessage =
            decodeRes.data!.values() as DataswapMessage
        switch (decodeRes.data!.method) {
            case "submitDatasetProofRoot":
                result.params.valid = true
                result.params.datasetSize = BigInt(0)
                result.params.submitter = ethAddressFromDelegated(msg.Msg.From)
                result.params.dataType = Number(
                    result.params.dataType
                ) as DataType
                result.datasetId = Number(result.params.datasetId)
                result.params.datasetId = result.datasetId
                break
            case "submitDatasetProofWithCarIds":
                result.params.leaves = mergeBigIntRangesToCompleteArray(
                    result.params.leavesStarts,
                    result.params.leavesEnds
                )
                result.params.dataType = Number(
                    result.params.dataType
                ) as DataType
                result.datasetId = Number(result.params.datasetId)
                result.params.datasetId = result.datasetId
                break
            case "submitDatasetProof":
                result.params.dataType = Number(
                    result.params.dataType
                ) as DataType
                result.datasetId = Number(result.params.datasetId)
                result.params.datasetId = result.datasetId
                break
            case "completeEscrow":
            case "submitDatasetProofCompleted":
                result.datasetId = Number(result.params.datasetId)
                result.params.datasetId = result.datasetId

                break

            case "upgradeTo":
                break
            default:
                console.log("method:", decodeRes.data!.method)
                return {
                    ok: false,
                    error: "Not support method!%s",
                }
        }

        return {
            ok: true,
            data: result,
        }
    }
}
