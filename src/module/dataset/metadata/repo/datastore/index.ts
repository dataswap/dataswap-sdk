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
import { DatasetMetadata } from "../../types"
import { DatasetMetadataDocument, DatasetMetadataSchema } from "./model"
import { MongooseDataStore, DatabaseConnection } from "@unipackage/datastore"
import { DatasetMetadataEvm } from "../evm"
import { DatasetChallengeEvm } from "../../../challenge/repo/evm"
import { FinanceEvm } from "../../../../../core/finance/repo/evm"
import { EscrowType } from "../../../../../shared/types/financeType"
import { DatasetState } from "../../../../../shared/types/datasetType"

/**
 * Class representing a MongoDB datastore for DatasetMetadata entities.
 * Extends the DataStore class with DatasetMetadata and DatasetMetadataDocument.
 * @class
 */
export class DatasetMetadataMongoDatastore extends DataStore<
    ValueFields<DatasetMetadata>,
    DatasetMetadataDocument
> {
    /**
     * Creates an instance of DatasetMetadataMongoDatastore.
     * @param {string} uri - The MongoDB connection URI.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<DatasetMetadata>,
                DatasetMetadataDocument
            >("DatasetMetadata", DatasetMetadataSchema, connection)
        )
    }

    /**
     * Asynchronously stores dataset metadata.
     * @param options The options object containing DatasetMetadataEvm, DatasetMetadata, and datasetId.
     * @returns A promise that resolves with the result of the operation.
     */
    async storeDatasetMetadata(options: {
        datasetMetadataEvm: DatasetMetadataEvm
        datasetMetadata: DatasetMetadata
        datasetId: number
    }): Promise<Result<any>> {
        try {
            const associatedDatasetId =
                await options.datasetMetadataEvm.getAssociatedDatasetId(
                    options.datasetId
                )
            if (!associatedDatasetId.ok) {
                return { ok: false, error: associatedDatasetId.error }
            }
            const datasetTimeoutParameters =
                await options.datasetMetadataEvm.getDatasetTimeoutParameters(
                    options.datasetId
                )
            if (!datasetTimeoutParameters.ok) {
                return { ok: false, error: datasetTimeoutParameters.error }
            }

            options.datasetMetadata.associatedDatasetId =
                associatedDatasetId.data
            options.datasetMetadata.proofBlockCount =
                datasetTimeoutParameters.data?.proofBlockCount
            options.datasetMetadata.auditBlockCount =
                datasetTimeoutParameters.data?.auditBlockCount
            return await super.CreateOrupdateByUniqueIndexes(
                options.datasetMetadata
            )
        } catch (error) {
            throw error
        }
    }
    /**
     * Asynchronously updates dataset timeout parameters.
     * @param options The options object containing DatasetMetadataEvm and datasetId.
     * @returns A promise that resolves with the result of the operation.
     */
    async updateDatasetTimeoutParameters(options: {
        datasetMetadataEvm: DatasetMetadataEvm
        datasetId: number
    }): Promise<Result<any>> {
        try {
            const timeoutParameters =
                await options.datasetMetadataEvm.getDatasetTimeoutParameters(
                    options.datasetId
                )
            if (!timeoutParameters.ok) {
                return { ok: false, error: timeoutParameters.error }
            }
            return await this.update(
                { conditions: [{ datasetId: options.datasetId }] },
                {
                    proofBlockCount: timeoutParameters.data?.proofBlockCount,
                    auditBlockCount: timeoutParameters.data?.auditBlockCount,
                }
            )
        } catch (error) {
            throw error
        }
    }
    /**
     * Asynchronously updates dataset metadata using the provided options.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `datasetMetadataEvm`: The Ethereum Virtual Machine instance for dataset metadata.
     *   - `datasetId`: The unique identifier of the dataset for which metadata is to be updated.
     * @returns A promise representing the completion of the dataset metadata update operation.
     */
    async updateDatasetMetadataState(options: {
        datasetMetadataEvm: DatasetMetadataEvm
        datasetId: number
    }): Promise<Result<any>> {
        try {
            const state = await options.datasetMetadataEvm.getDatasetState(
                options.datasetId
            )
            if (!state.ok) {
                return { ok: false, error: state.error }
            }
            return await this.update(
                { conditions: [{ datasetId: options.datasetId }] },
                { status: Number(state.data) }
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Asynchronously updates the dataset challenge commission price based on the provided options.
     * @param options An object containing the necessary parameters:
     *                - financeEvm: The finance Ethereum virtual machine.
     *                - datasetMetadataEvm: The dataset metadata Ethereum virtual machine.
     *                - datasetChallengeEvm: The dataset challenge Ethereum virtual machine.
     *                - datasetId: The ID of the dataset.
     *                - token: The token associated with the dataset.
     *                - height: The height of the dataset.
     * @returns A promise that resolves to a Result object.
     */
    async updateDatasetChallengeCommissionPrice(options: {
        financeEvm: FinanceEvm
        datasetMetadataEvm: DatasetMetadataEvm
        datasetChallengeEvm: DatasetChallengeEvm
        datasetId: number
        token: string
        height: bigint
    }): Promise<Result<any>> {
        try {
            const state = await options.datasetMetadataEvm.getDatasetState(
                options.datasetId
            )
            if (!state.ok) {
                return { ok: false, error: state.error }
            }

            if (state.data != DatasetState.Approved) {
                return { ok: true }
            }

            const submitter =
                await options.datasetMetadataEvm.getDatasetMetadataSubmitter(
                    options.datasetId
                )
            if (!submitter.ok) {
                return { ok: false, error: submitter.error }
            }

            const accountEscrow = await options.financeEvm.getAccountEscrow(
                options.datasetId,
                0,
                submitter.data!,
                options.token,
                EscrowType.EscrowChallengeCommission
            )
            if (!accountEscrow.ok) {
                return { ok: false, error: accountEscrow.error }
            }

            const challengeCount =
                await options.datasetChallengeEvm.getChallengeSubmissionCount(
                    options.datasetId
                )
            if (!challengeCount.ok) {
                return { ok: false, error: challengeCount.error }
            }

            return await this.update(
                { conditions: [{ datasetId: options.datasetId }] },
                {
                    completedHeight: options.height,
                    challengeCommissionPrice:
                        BigInt(accountEscrow.data!.total) /
                        BigInt(challengeCount.data!),
                }
            )
        } catch (error) {
            throw error
        }
    }
}
