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
import { IMatchingsAssertion } from "../../interfaces/assertions/module/IMatchingsAssertion"
import { MatchingsAssertion } from "../../assertions/module/matchingsAssertion"
import { DatasetState } from "../../../src/shared/types/datasetType"

/**
 * Helper class for managing matchings in the system.
 */
export class MatchingsHelper extends BasicHelper implements IMatchingsHelper {
    private assertion: IMatchingsAssertion
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
        this.assertion = new MatchingsAssertion(_contractsManager)
    }

    /**
     * Helper function to retrieve the dataset ID associated with a matching.
     * @param matchingId - The ID of the matching.
     * @returns The dataset ID linked with the matching ID if available, otherwise undefined.
     */
    async getTargetDatasetId(matchingId: number): Promise<number> {
        const target = await handleEvmError(
            this.contractsManager
                .MatchingTargetEvm()
                .getMatchingTarget(matchingId)
        )

        let datasetId = Number(target.data.datasetID)

        if (datasetId === 0) {
            let ret = this.matchingDatasetIdMap.get(matchingId)
            if (ret) {
                datasetId = ret
            }
        }

        return datasetId
    }

    /**
     * Sets the target dataset ID for a particular matching ID.
     * @param matchingId - The ID of the matching.
     * @param datasetId - The ID of the dataset to be set as the target.
     */
    setTargetDatasetId(matchingId: number, datasetId: number): void {
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
            if (!targetDatasetId || targetDatasetId === 0) {
                datasetId = this.datasetHelper.getWorkflowTargetId(
                    DatasetState.DatasetApproved
                )
                if (datasetId === 0) {
                    datasetId =
                        await this.datasetHelper.approvedDatasetWorkflow()
                }
            } else {
                datasetId = targetDatasetId
            }

            const replicasCount = await handleEvmError(
                this.contractsManager
                    .DatasetRequirementEvm()
                    .getDatasetReplicasCount(datasetId)
            )

            const replicaIndex = 0
            const matchingMetadata = this.generator.generatorMatchingInfo(
                datasetId,
                replicaIndex
            )

            // Creating a new matching
            let matchingId = await this.assertion.createMatchingAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                datasetId,
                replicaIndex,
                matchingMetadata
            )

            let associatedMatchingId: number = 0
            if (dataType === DataType.Source) {
                const associatedMappingFilesMatchingId =
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
                } else {
                    associatedMatchingId = associatedMappingFilesMatchingId
                }
            }

            // Creating target for the matching
            await this.assertion.createTargetAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                matchingId,
                datasetId,
                dataType,
                associatedMatchingId,
                replicaIndex
            )
            this.updateWorkflowTargetState(matchingId, MatchingState.None)
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

            // Completes dependent workflow to create a new matching
            // Retrieves the dataset ID associated with the matching
            const datasetId = await this.getTargetDatasetId(matchingId)

            // Fetches the count of proofs for the dataset and data type
            let matchingCarsCount = await handleEvmError(
                this.contractsManager
                    .DatasetProofEvm()
                    .getDatasetProofCount(datasetId, dataType)
            )

            // Retrieves proof data for the dataset and data type
            const cars = await handleEvmError(
                this.contractsManager
                    .DatasetProofEvm()
                    .getDatasetProof(
                        datasetId!,
                        dataType,
                        0,
                        Number(matchingCarsCount.data)
                    )
            )
            // Extracts data from car IDs
            const carsIds = await handleEvmError(
                this.contractsManager.CarstoreEvm().getCarsIds(cars.data)
            )
            const { starts, ends } = utils.splitNumbers(
                utils.convertToNumberArray(carsIds.data)
            )

            // Publishes the in-progress matching
            await this.assertion.publishMatchingAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                matchingId,
                datasetId,
                starts,
                ends,
                true
            )

            this.updateWorkflowTargetState(matchingId, MatchingState.InProgress)

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

            // Pauses the matching in progress
            this.assertion.pauseMatchingAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                matchingId,
                MatchingState.Paused
            )

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
            const matchingId = await this.completeDependentWorkflow(
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
            const matchingState = await handleEvmError(
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

    /**
     * Retrieves the datasets helper instance.
     * @returns {IDatasetsHelper} The datasets helper instance.
     */
    getDatasetsHelper(): IDatasetsHelper {
        // Ensure datasetHelper is initialized before returning
        if (!this.datasetHelper) {
            throw new Error("datasetHelper not initialized")
        }
        return this.datasetHelper
    }
}
