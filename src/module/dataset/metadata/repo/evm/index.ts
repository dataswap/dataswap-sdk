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
import { DatasetMetadata } from "../../types"
import { EvmEx } from "../../../../../shared/types/evmEngineType"
import { DatasetState } from "../../../../../shared/types/datasetType"
import { BasicStatisticsInfo } from "../../../../../shared/types/statisticsType"

interface DatasetMetadataCallEvm {
    /**
     * Retrieves an overview of count statistics.
     * @returns A promise that resolves with the count overview.
     */
    getCountOverview(): Promise<EvmOutput<BasicStatisticsInfo>>

    /**
     * Retrieves an overview of size statistics.
     * @returns A promise that resolves with the size overview.
     */
    getSizeOverview(): Promise<EvmOutput<BasicStatisticsInfo>>

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
     * Retrieves the timeout parameters for a dataset.
     * @param datasetId The ID of the dataset for which to retrieve the timeout parameters.
     * @returns A promise that resolves with the proof and audit block count timeout parameters.
     */
    getDatasetTimeoutParameters(datasetId: number): Promise<EvmOutput<any>>

    /**
     *  Get dataset state
     * @param datasetId The ID of the dataset to get state of dataset.
     * @returns The state of dataset.
     */
    getDatasetState(datasetId: number): Promise<EvmOutput<DatasetState>>

    /**
     * Retrieves the associated dataset ID for a given dataset ID.
     * @param datasetId The dataset ID for which to retrieve the associated dataset ID.
     * @returns A promise that resolves with the associated dataset ID.
     */
    getAssociatedDatasetId(datasetId: number): Promise<EvmOutput<number>>

    /**
     * Retrieves the dataset ID associated with the specified access method.
     * @param accessMethod The method of accessing the dataset.
     * @returns A promise that resolves with the dataset ID corresponding to the access method.
     */
    getDatasetIdForAccessMethod(
        accessMethod: string
    ): Promise<EvmOutput<number>>

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

    /**
     * Retrieves the roles associated with the current user.
     * @returns A promise that resolves with the roles of the current user.
     */
    roles(): Promise<EvmOutput<string>>

    /**
     *  Get governance address
     * @return The address of governance
     */
    governanceAddress(): Promise<EvmOutput<string>>
}

interface DatasetMetadataSendEvm {
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
        sizeInBytes: bigint,
        isPublic: boolean,
        version: bigint,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<any>>

    /**
     * Reports a dataset workflow timeout.
     * @param datasetId The ID of the dataset for which to report the timeout.
     * @returns A promise that resolves with the result of reporting the dataset workflow timeout.
     */
    reportDatasetWorkflowTimeout(datasetId: number): Promise<EvmOutput<any>>

    /**
     * Updates the timeout parameters for a dataset.
     * @param datasetId The ID of the dataset for which to update the timeout parameters.
     * @param proofBlockCount The new proof block count timeout parameter.
     * @param auditBlockCount The new audit block count timeout parameter.
     * @returns A promise that resolves with the result of updating the dataset timeout parameters.
     */
    updateDatasetTimeoutParameters(
        datasetId: number,
        proofBlockCount: number,
        auditBlockCount: number
    ): Promise<EvmOutput<any>>
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
    "getCountOverview",
    "getSizeOverview",
    "getDatasetMetadata",
    "getDatasetMetadataSubmitter",
    "getDatasetMetadataClient",
    "getDatasetTimeoutParameters",
    "getDatasetState",
    "getAssociatedDatasetId",
    "getDatasetIdForAccessMethod",
    "hasDatasetMetadata",
    "datasetsCount",
    "roles",
    "governanceAddress",
])
@withSendMethod([
    "submitDatasetMetadata",
    "reportDatasetWorkflowTimeout",
    "updateDatasetTimeoutParameters",
])
export class DatasetMetadataOriginEvm extends EvmEx {}

/**
 * Extended class for DatasetMetadataOriginEvm with additional message decoding.
 */
export class DatasetMetadataEvm extends DatasetMetadataOriginEvm {
    /**
     * Retrieves an overview of count statistics.
     * @returns A promise that resolves with the count overview.
     */
    async getCountOverview(): Promise<EvmOutput<BasicStatisticsInfo>> {
        const res = await super.getCountOverview()
        if (res.ok && res.data) {
            return {
                ok: true,
                data: new BasicStatisticsInfo({
                    ...res.data,
                }),
            }
        }
        return res
    }
    /**
     * Retrieves an overview of size statistics.
     * @returns A promise that resolves with the size overview.
     */
    async getSizeOverview(): Promise<EvmOutput<BasicStatisticsInfo>> {
        const res = await super.getSizeOverview()
        if (res.ok && res.data) {
            return {
                ok: true,
                data: new BasicStatisticsInfo({
                    ...res.data,
                }),
            }
        }
        return res
    }

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

    async getDatasetTimeoutParameters(
        datasetId: number
    ): Promise<EvmOutput<[proofBlockCount: number, auditBlockCount: number]>> {
        const res = await super.getDatasetTimeoutParameters(datasetId)
        if (res.ok && res.data) {
            return {
                ok: true,
                data: [res.data.proofBlockCount, res.data.auditBlockCount],
            }
        }
        return res
    }

    async getDatasetState(datasetId: number): Promise<EvmOutput<DatasetState>> {
        const metaRes = await super.getDatasetState(datasetId)
        if (metaRes.ok && metaRes.data) {
            return {
                ok: true,
                data: Number(metaRes.data) as DatasetState,
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

        let result: DataswapMessage =
            decodeRes.data!.values() as DataswapMessage
        switch (decodeRes.data!.method) {
            case "submitDatasetMetadata":
                result.datasetId = Number(result.return)
                /*params match the DatasetMetadata struct*/
                result.params.submitter = result.from
                result.params.createdBlockNumber = result.height
                result.params.datasetId = result.datasetId
                result.params.status = DatasetState.None
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
