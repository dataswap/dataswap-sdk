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

import { IMatchingsHelper } from "../../interfaces/helper/module/IMatchingsHelper"
import { BasicHelper } from "./basicHelper"
import { MatchingState } from "../../../src/shared/types/matchingType"
import { expect } from "chai"
import { handleEvmError } from "../../shared/error"
import { IGenerator } from "../../interfaces/setup/IGenerator"
import { IContractsManager } from "../../interfaces/setup/IContractsManater"
import { IDatasetsHelper } from "../../interfaces/helper/module/IDatasetshelper"
import { DataType } from "../../../src/shared/types/dataType"
import * as utils from "../../shared/utils"

/**
 * Helper class for managing matchings in the system.
 */
export class MatchingsHelper extends BasicHelper implements IMatchingsHelper {
    private generator: IGenerator
    private contractsManager: IContractsManager
    private datasetHelper: IDatasetsHelper
    private associatedMappingFilesMatchingIds: Map<number, number>
    private matchingDatasetIdMap: Map<number, number>

    /**
     * Initializes MatchingsHelper class with necessary dependencies.
     * @param _generator - Instance of the IGenerator interface.
     * @param _contractsManager - Instance of the IContractsManager interface.
     * @param _datasetHelper - Instance of the IDatasetsHelper interface.
     */
    constructor(
        _generator: IGenerator,
        _contractsManager: IContractsManager,
        _datasetHelper: IDatasetsHelper
    ) {
        super()
        this.generator = _generator
        this.contractsManager = _contractsManager
        this.datasetHelper = _datasetHelper
        this.associatedMappingFilesMatchingIds = new Map<number, number>()
        this.matchingDatasetIdMap = new Map<number, number>()
    }

    /**
     * Helper function to retrieve the dataset ID associated with a matching.
     * @param matchingId - The ID of the matching.
     * @returns The dataset ID linked with the matching ID if available, otherwise undefined.
     */
    private _getTargetDatasetId(matchingId: number): number | undefined {
        return this.matchingDatasetIdMap.get(matchingId)
    }

    /**
     * Sets the dataset ID associated with a matching.
     * @param matchingId - The ID of the matching.
     * @param datasetId - The ID of the dataset to associate with the matching.
     */
    private _setTargetDatasetId(matchingId: number, datasetId: number): void {
        this.matchingDatasetIdMap.set(matchingId, datasetId)
    }

    /**
     * Retrieves the associated mapping files' matching ID for a given matching.
     * @param matchingId - The ID of the matching.
     * @returns The associated mapping files' matching ID if available, otherwise undefined.
     */
    getAssociatedMappingFilesMatchingId(
        matchingId: number
    ): number | undefined {
        return this.associatedMappingFilesMatchingIds.get(matchingId)
    }

    /**
     * Sets the associated mapping files' matching ID for a given matching.
     * @param matchingId - The ID of the matching.
     * @param associatedMatchingId - The associated mapping files' matching ID to set.
     */
    setAssociatedMappingFilesMatchingId(
        matchingId: number,
        associatedMatchingId: any
    ): void {
        this.associatedMappingFilesMatchingIds.set(
            matchingId,
            associatedMatchingId
        )
    }

    /**
     * Creates a workflow for a new matching based on the given data type and optional target dataset ID.
     * @param dataType - The type of data for the matching workflow.
     * @param targetDatasetId - (Optional) The target dataset ID for the matching workflow.
     * @returns The ID of the created matching.
     */
    async createdMatchingWorkflow(
        dataType: DataType,
        targetDatasetId?: number
    ): Promise<number> {
        try {
            let datasetId = 0
            if (!targetDatasetId) {
                datasetId = await this.datasetHelper.approvedDatasetWorkflow()
            } else {
                datasetId = targetDatasetId
            }

            let replicasCount = await handleEvmError(
                this.contractsManager
                    .DatasetRequirementEvm()
                    .getDatasetReplicasCount(datasetId)
            )
            let replicaIndex = this.generator.datasetNextReplicaIndex(
                datasetId,
                replicasCount.data
            )
            let [
                bidSelectionRule,
                biddingDelayBlockCount,
                biddingPeriodBlockCount,
                storageCompletionPeriodBlocks,
                biddingThreshold,
                additionalInfo,
            ] = this.generator.generatorMatchingInfo(datasetId, replicaIndex)

            // Setting the default wallet for the MatchingMetadataEvm contract
            this.contractsManager
                .MatchingMetadataEvm()
                .getWallet()
                .setDefault(process.env.DATASWAP_PROOFSUBMITTER as string)

            // Creating a new matching
            let tx = await handleEvmError(
                this.contractsManager
                    .MatchingMetadataEvm()
                    .createMatching(
                        datasetId,
                        bidSelectionRule,
                        biddingDelayBlockCount,
                        biddingPeriodBlockCount,
                        storageCompletionPeriodBlocks,
                        biddingThreshold,
                        replicaIndex,
                        additionalInfo,
                        {
                            value: this.contractsManager
                                .MatchingMetadataEvm()
                                .generateWei("1000000000", "wei"),
                        }
                    )
            )
            // Retrieving transaction receipt and event arguments
            const receipt = await this.contractsManager
                .MatchingMetadataEvm()
                .getTransactionReceipt(tx.data.hash)

            let ret = this.contractsManager
                .DatasetMetadataEvm()
                .getEvmEventArgs(receipt!, "MatchingCreated")
            let matchingId = Number(ret.data.matchingId)

            let associatedMatchingId: number = 0
            if (dataType === DataType.Source) {
                let associatedMappingFilesMatchingId =
                    this.getAssociatedMappingFilesMatchingId(matchingId)
                if (!associatedMappingFilesMatchingId) {
                    // Completing dependent workflow for mapping files if missing
                    associatedMatchingId = await this.completeDependentWorkflow(
                        MatchingState.Completed,
                        async (): Promise<number> => {
                            return await this.completedMatchingWorkflow(
                                DataType.MappingFiles,
                                datasetId
                            )
                        }
                    )
                    this.setAssociatedMappingFilesMatchingId(
                        matchingId,
                        associatedMatchingId
                    )
                    throw new Error(
                        "associatedMappingFilesMatchingId must not be nil when data type is source"
                    )
                } else {
                    associatedMatchingId = associatedMappingFilesMatchingId
                }
            }

            // Creating target for the matching
            await handleEvmError(
                this.contractsManager
                    .MatchingTargetEvm()
                    .createTarget(
                        matchingId,
                        datasetId,
                        dataType,
                        associatedMatchingId,
                        replicaIndex
                    )
            )

            // Checking and updating the state of the created matching
            let matchingState = await handleEvmError(
                this.contractsManager
                    .MatchingMetadataEvm()
                    .getMatchingState(matchingId)
            )
            expect(BigInt(MatchingState.None)).to.equal(matchingState.data)
            this.updateWorkflowTargetState(
                matchingId,
                Number(MatchingState.None)
            )
            return matchingId
        } catch (error) {
            throw error
        }
    }

    /**
     * Initiates a workflow for an in-progress matching based on the given data type and optional target dataset ID.
     * @param dataType - The type of data for the in-progress matching workflow.
     * @param targetDatasetId - (Optional) The target dataset ID for the in-progress matching workflow.
     * @returns The ID of the matching in progress.
     */
    async inProgressMatchingWorkflow(
        dataType: DataType,
        targetDatasetId?: number
    ): Promise<number> {
        try {
            // Completes dependent workflow to create a new matching
            let matchingId = await this.completeDependentWorkflow(
                Number(MatchingState.None),
                async (): Promise<number> => {
                    return await this.createdMatchingWorkflow(
                        dataType,
                        targetDatasetId
                    )
                }
            )

            // Retrieves the dataset ID associated with the matching
            let datasetId = this._getTargetDatasetId(matchingId)

            // Fetches the count of proofs for the dataset and data type
            let matchingCount = await handleEvmError(
                this.contractsManager
                    .DatasetProofEvm()
                    .getDatasetProofCount(datasetId!, dataType)
            )

            // Retrieves proof data for the dataset and data type
            let cars = await handleEvmError(
                this.contractsManager
                    .DatasetProofEvm()
                    .getDatasetProof(
                        datasetId!,
                        dataType,
                        0,
                        matchingCount.data
                    )
            )

            // Extracts data from car IDs
            let carsIds = await handleEvmError(
                this.contractsManager.CarstoreEvm().getCarsIds(cars.data)
            )
            let { starts, ends } = utils.splitNumbers(carsIds)

            // Configures wallet for MatchingTargetEvm
            this.contractsManager
                .MatchingTargetEvm()
                .getWallet()
                .setDefault(process.env.DATASWAP_PROOFSUBMITTER as string)

            // Publishes the in-progress matching
            await handleEvmError(
                this.contractsManager
                    .MatchingTargetEvm()
                    .publishMatching(matchingId, datasetId!, starts, ends, true)
            )

            // Checks and updates the state of the matching to in-progress
            let matchingState = await handleEvmError(
                this.contractsManager
                    .MatchingMetadataEvm()
                    .getMatchingState(matchingId)
            )
            expect(BigInt(MatchingState.InProgress)).to.equal(
                matchingState.data
            )
            this.updateWorkflowTargetState(
                matchingId,
                Number(MatchingState.InProgress)
            )
            return matchingId
        } catch (error) {
            throw error
        }
    }

    /**
     * Initiates a workflow to pause a matching in progress based on the given data type and optional target dataset ID.
     * @param dataType - The type of data associated with the matching.
     * @param targetDatasetId - (Optional) The target dataset ID for the paused matching workflow.
     * @returns The ID of the paused matching.
     */
    async pausedMatchingWorkflow(
        dataType: DataType,
        targetDatasetId?: number
    ): Promise<number> {
        try {
            // Completes dependent workflow to initiate the matching as in progress
            let matchingId = await this.completeDependentWorkflow(
                Number(MatchingState.InProgress),
                async (): Promise<number> => {
                    return await this.inProgressMatchingWorkflow(
                        dataType,
                        targetDatasetId
                    )
                }
            )

            // Sets the wallet default for MatchingMetadataEvm
            this.contractsManager
                .MatchingMetadataEvm()
                .getWallet()
                .setDefault(process.env.DATASWAP_PROOFSUBMITTER as string)

            // Pauses the matching in progress
            await handleEvmError(
                this.contractsManager
                    .MatchingMetadataEvm()
                    .pauseMatching(matchingId)
            )

            // Retrieves and validates the state of the paused matching
            let matchingState = await handleEvmError(
                this.contractsManager
                    .MatchingMetadataEvm()
                    .getMatchingState(matchingId)
            )
            expect(BigInt(MatchingState.Paused)).to.equal(matchingState.data)

            // Updates the workflow target state to paused
            this.updateWorkflowTargetState(
                matchingId,
                Number(MatchingState.Paused)
            )
            return matchingId
        } catch (error) {
            throw error
        }
    }

    /**
     * Initiates a workflow to complete a matching in progress based on the given data type and optional target dataset ID.
     * @param dataType - The type of data associated with the matching.
     * @param targetDatasetId - (Optional) The target dataset ID for the completed matching workflow.
     * @returns The ID of the completed matching.
     */
    async completedMatchingWorkflow(
        dataType: DataType,
        targetDatasetId?: number
    ): Promise<number> {
        try {
            // Completes dependent workflow to initiate the matching as in progress
            let matchingId = await this.completeDependentWorkflow(
                Number(MatchingState.InProgress),
                async (): Promise<number> => {
                    return await this.inProgressMatchingWorkflow(
                        dataType,
                        targetDatasetId
                    )
                }
            )

            // Sets the wallet default for MatchingBidsEvm
            this.contractsManager
                .MatchingBidsEvm()
                .getWallet()
                .setDefault(process.env.DATASWAP_BIDDER as string)

            // Bids on the matching in progress
            await handleEvmError(
                this.contractsManager
                    .MatchingBidsEvm()
                    .bidding(matchingId, BigInt(10000000000), {
                        value: this.contractsManager
                            .MatchingBidsEvm()
                            .generateWei("1", "ether"),
                    })
            )

            // Closes the completed matching
            await handleEvmError(
                this.contractsManager
                    .MatchingBidsEvm()
                    .closeMatching(matchingId)
            )

            // Retrieves and validates the state of the completed matching
            let matchingState = await handleEvmError(
                this.contractsManager
                    .MatchingMetadataEvm()
                    .getMatchingState(matchingId)
            )
            expect(BigInt(MatchingState.Completed)).to.equal(matchingState.data)

            // Updates the workflow target state to completed
            this.updateWorkflowTargetState(
                matchingId,
                Number(MatchingState.Completed)
            )
            return matchingId
        } catch (error) {
            throw error
        }
    }
}
