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
    Evm,
    withCallMethod,
    withSendMethod,
    EvmOutput,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../../message/types"
import { DatasetMetadata } from "../../types"
import { EvmEx } from "../../../../../shared/types/evmEngineType"
import { DatasetState } from "../../../../../shared/types/datasetType"

interface DatasetMetadataCallEvm {
    datasetsProof(): Promise<EvmOutput<string>>
    /**
     * Get dataset usedSizeInBytes.
     * @param datasetId The ID of the dataset to get used size.
     * @returns The used size of dataset
     */
    getDatasetUsedSize(datasetId: number): Promise<EvmOutput<number>>
    /**
     * Get dataset metadata
     * @param datasetId The ID of the dataset to get metadata.
     * @returns The metadata of dataset.
     */
    getDatasetMetadata(datasetId: number): Promise<EvmOutput<DatasetMetadata>>
    /**
     * Get submitter of dataset's metadata
     * @param datasetId The ID of the dataset to get submitter of dataset'metadata.
     * @returns The address of submitter.
     */
    getDatasetMetadataSubmitter(datasetId: number): Promise<EvmOutput<string>>
    /**
     * Get client of dataset.
     * @param datasetId The ID of the dataset to get client of dataset'metadata.
     * @returns The actor id of client in filecoin network.
     */
    getDatasetMetadataClient(datasetId: number): Promise<EvmOutput<number>>
    /**
     *  Get dataset state
     * @param datasetId The ID of the dataset to get state of dataset.
     * @returns The state of dataset.
     */
    getDatasetState(datasetId: number): Promise<EvmOutput<DatasetState>>
    /**
     *  Get governance address
     * @return The address of governance
     */
    governanceAddress(): Promise<EvmOutput<string>>
    /**
     * Check if a dataset has metadata
     * @param accessMethod Method of accessing the dataset to check.
     * @returns When the access method exists in a dataset, return true; otherwise, return false.
     */
    hasDatasetMetadata(accessMethod: string): Promise<EvmOutput<boolean>>
    /**
     * Default getter functions for public variables
     * @returns The total number of datasets in the current datasets contract.
     */
    datasetsCount(): Promise<EvmOutput<number>>
}

interface DatasetMetadataSendEvm {
    initDependencies(
        datasetsProof: string,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
    /**
    /* This function changes the state of the dataset to DatasetApproved and emits the DatasetApproved event.
    /* @param datasetId The ID of the dataset to approve.
     * @param options The options of transaction.
    */
    approveDataset(
        datasetId: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * This function changes the state of the dataset to MetadataApproved and emits the MetadataApproved event.
     * @param datasetId The ID of the dataset for which to approve metadata.
     * @param options The options of transaction.
     */
    approveDatasetMetadata(
        datasetId: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * This function changes the state of the dataset to DatasetRejected and emits the DatasetRejected event.
     * @param datasetId The ID of the dataset to reject.
     * @param options The options of transaction.
     */
    rejectDataset(
        datasetId: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * This function changes the state of the dataset to MetadataRejected and emits the MetadataRejected event.
     * @param datasetId The ID of the dataset for which to reject metadata.
     * @param options The options of transaction.
     */
    rejectDatasetMetadata(
        datasetId: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Submit metadata for a dataset
     * @param client The client id of the dataset.
     * @param title The title of the dataset.
     * @param industry The industry of the dataset.
     * @param name The name of the dataset.
     * @param description The description of the dataset.
     * @param source The source of the dataset.
     * @param accessMethod The access method of the dataset.
     * @param sizeInBytes The size of the dataset in bytes.
     * @param isPublic A boolean indicating if the dataset is public.
     * @param version The version of the dataset.
     * @param options The options of transaction.
     */
    submitDatasetMetadata(
        client: number,
        title: string,
        industry: string,
        name: string,
        description: string,
        source: string,
        accessMethod: string,
        sizeInBytes: number,
        isPublic: boolean,
        version: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<any>>

    /**
     * Update dataset usedSizeInBytes. only called by matching contract. TODO: Need to add permission control
     * @param datasetId The ID of the dataset to add used size.
     * @param size The size to add.
     */
    addDatasetUsedSize(
        datasetId: number,
        size: number
    ): Promise<EvmOutput<void>>
}

/**
 * Combined interface for EVM calls and transactions related to Datasets contract.
 */
export interface DatasetMetadataOriginEvm
    extends DatasetMetadataCallEvm,
        DatasetMetadataSendEvm {}

/**
 * Implementation of DatasetMetadataOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "datasetsProof",
    "getDatasetUsedSize",
    "getDatasetMetadata",
    "getDatasetMetadataSubmitter",
    "getDatasetMetadataClient",
    "getDatasetState",
    "governanceAddress",
    "hasDatasetMetadata",
    "datasetsCount",
])
@withSendMethod([
    "initDependencies",
    "approveDataset",
    "approveDatasetMetadata",
    "rejectDataset",
    "rejectDatasetMetadata",
    "submitDatasetMetadata",
    "addDatasetUsedSize",
])
export class DatasetMetadataOriginEvm extends EvmEx {}

/**
 * Extended class for DatasetMetadataOriginEvm with additional message decoding.
 */
export class DatasetMetadataEvm extends DatasetMetadataOriginEvm {
    async getDatasetMetadata(
        datasetId: number
    ): Promise<EvmOutput<DatasetMetadata>> {
        const metaRes = await super.getDatasetMetadata(datasetId)
        if (metaRes.ok && metaRes.data) {
            return {
                ok: true,
                data: new DatasetMetadata({
                    ...metaRes.data,
                    datasetId: datasetId,
                }),
            }
        }
        return metaRes
    }

    decodeMessage(msg: Message): EvmOutput<DataswapMessage> {
        const decoder = new ContractMessageDecoder(this)
        const decodeRes = decoder.decode(msg)
        if (!decodeRes.ok && !decodeRes.data) {
            return { ok: false, error: decodeRes.error }
        }

        let result: DataswapMessage = decodeRes.data as DataswapMessage
        switch (decodeRes.data!.method) {
            case "submitDatasetMetadata":
                result.datasetId = Number(result.return)
                /*params match the DatasetMetadata struct*/
                result.params.submitter = result.from
                result.params.createdBlockNumber = result.height
                result.params.datasetId = result.datasetId
                break
            case "approveDataset" ||
                "approveDatasetMetadata" ||
                "rejectDataset" ||
                "rejectDatasetMetadata":
                result.datasetId = result.params.datasetId
                break
            default:
                return {
                    ok: false,
                    error: "Not support method!",
                }
        }

        return {
            ok: true,
            data: result,
        }
    }
}
