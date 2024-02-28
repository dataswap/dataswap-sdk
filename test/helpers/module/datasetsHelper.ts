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

import { IDatasetsHelper } from "../../interfaces/helper/module/IDatasetshelper"
import { BasicHelper } from "./basicHelper"
import { DatasetState } from "../../../src/shared/types/datasetType"
import { DataType } from "../../../src/shared/types/dataType"
import { expect } from "chai"
import { handleEvmError } from "../../shared/error"
import { IGenerator } from "../../interfaces/setup/IGenerator"
import { IContractsManager } from "../../interfaces/setup/IContractsManater"
import { DatasetsAssertion } from "../../assertions/module/datasetsAssertion"
import { IDatasetsAssertion } from "../../interfaces/assertions/module/IDatasetsAssertion"

/**
 * Helper class providing dataset test-related functionalities.
 */
export class DatasetsHelper extends BasicHelper implements IDatasetsHelper {
    private generator: IGenerator
    private contractsManager: IContractsManager
    private assertion: IDatasetsAssertion

    /**
     * Constructs a DatasetsHelper.
     * @param _generator - The generator instance used for dataset operations.
     * @param _contractsManager - The contracts manager instance used for dataset operations.
     */
    constructor(_generator: IGenerator, _contractsManager: IContractsManager) {
        super()
        this.generator = _generator
        this.contractsManager = _contractsManager
        this.assertion = new DatasetsAssertion(_contractsManager)
    }
    /**
     * Workflow for submitting dataset metadata.
     * @returns A Promise that resolves with the dataset ID.
     */
    async metadataSubmittedDatasetWorkflow(): Promise<number> {
        try {
            const datasetMetadata = this.generator.generateDatasetMetadata()
            const clientId = 101

            const datasetId =
                await this.assertion.submitDatasetMetadataAssertion(
                    process.env.DATASWAP_METADATASUBMITTER as string,
                    clientId,
                    datasetMetadata
                )

            await this.assertion.getDatasetStateAssertion(
                datasetId,
                DatasetState.MetadataSubmitted
            )

            // Update workflow target state and return dataset ID
            this.updateWorkflowTargetState(
                datasetId,
                Number(DatasetState.MetadataSubmitted)
            )
            return datasetId
        } catch (error) {
            throw error
        }
    }

    /**
     * Workflow for submitting dataset requirements.
     * @param replicasCount The number of replicas for the dataset.
     * @param elementCountInReplica The element count in each replica.
     * @param duplicateIndex The duplicate index (optional).
     * @param duplicateCount The duplicate count (optional).
     * @returns A Promise that resolves with the dataset ID.
     */
    async requirementsSubmittedDatasetWorkflow(
        replicasCount: number,
        elementCountInReplica: number,
        duplicateIndex?: number,
        duplicateCount?: number
    ): Promise<number> {
        try {
            // Completes the workflow for MetadataApproved state
            let datasetId = await this.completeDependentWorkflow(
                DatasetState.RequirementSubmitted,
                async (): Promise<number> => {
                    return await this.metadataSubmittedDatasetWorkflow()
                }
            )

            // Generate dataset requirements
            let requirments = this.generator.generateDatasetRequirements(
                replicasCount,
                elementCountInReplica,
                duplicateIndex,
                duplicateCount
            )

            // Submit dataset replica requirements transaction
            await this.assertion.submitDatasetReplicaRequirementsAssertion(
                process.env.DATASWAP_METADATASUBMITTER as string,
                datasetId,
                requirments,
                BigInt(0)
            )

            await this.assertion.getDatasetStateAssertion(
                datasetId,
                DatasetState.RequirementSubmitted
            )

            // Update workflow target state and return dataset ID
            this.updateWorkflowTargetState(
                datasetId,
                Number(DatasetState.RequirementSubmitted)
            )
            return datasetId
        } catch (error) {
            throw error
        }
    }

    /**
     * Executes the workflow when there are insufficient funds for a dataset.
     * @param fakedata Whether the specified workflow is submitted using fake data.
     * @returns The dataset ID after completing the workflow.
     */
    async waitEscrowDatasetWorkflow(fakedata?: boolean): Promise<number> {
        try {
            // Completes the workflow for MetadataApproved state
            let datasetId = await this.completeDependentWorkflow(
                DatasetState.RequirementSubmitted,
                async (): Promise<number> => {
                    return await this.requirementsSubmittedDatasetWorkflow(5, 3)
                }
            )

            // Generating dataset proof for DataType.MappingFiles
            let dataType = DataType.MappingFiles
            let [
                rootHashMappings,
                leafHashesMappings,
                leafSizesMappings,
                mappingFilesAccessMethod,
            ] = this.generator.generateDatasetProof(1, dataType, fakedata)
            // Submits dataset proof root for DataType.MappingFiles
            await this.assertion.submitDatasetProofRootAssertion(
                datasetId,
                dataType,
                mappingFilesAccessMethod,
                rootHashMappings,
                process.env.DATASWAP_PROOFSUBMITTER as string
            )

            // Submits dataset proof for DataType.MappingFiles
            await this.assertion.submitDatasetProofAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                datasetId,
                dataType,
                leafHashesMappings,
                0,
                leafSizesMappings,
                true
            )

            this.generator.setProofRoot(
                datasetId,
                DataType.MappingFiles,
                rootHashMappings
            )

            // Updating dataType to DataType.Source
            dataType = DataType.Source

            // Generating dataset proof for DataType.Source
            let [rootHash, leafHashes, leafSizes] =
                this.generator.generateDatasetProof(20, dataType, fakedata)

            // Submits dataset proof root for DataType.Source
            await this.assertion.submitDatasetProofRootAssertion(
                datasetId,
                dataType,
                "",
                rootHash,
                process.env.DATASWAP_PROOFSUBMITTER as string
            )

            // Submits dataset proof for DataType.Source
            await this.assertion.submitDatasetProofAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                datasetId,
                dataType,
                leafHashes,
                0,
                leafSizes,
                true
            )

            // Completes the dataset proof submission
            await this.assertion.submitDatasetProofCompletedAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                datasetId,
                DatasetState.WaitEscrow
            )

            this.generator.setProofRoot(
                datasetId,
                DataType.Source,
                rootHashMappings
            )
            // Updates the dataset state to FundsNotEnough
            this.updateWorkflowTargetState(
                datasetId,
                Number(DatasetState.WaitEscrow)
            )
            return datasetId // Returns the dataset ID
        } catch (error) {
            throw error
        }
    }

    /**
     * Executes the workflow after the dataset proof has been submitted.
     * @param fakedata Whether the specified workflow is submitted using fake data.
     * @returns The dataset ID after completing the workflow.
     */
    async proofSubmittedDatasetWorkflow(fakedata?: boolean): Promise<number> {
        try {
            // Completes the workflow for FundsNotEnough state
            let datasetId = await this.completeDependentWorkflow(
                DatasetState.WaitEscrow,
                async (): Promise<number> => {
                    return await this.waitEscrowDatasetWorkflow(fakedata)
                }
            )

            // Setting wallet and submitting dataset proof as completed
            await this.assertion.submitDatasetProofCompletedAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                datasetId,
                DatasetState.ProofSubmitted
            )
            this.updateWorkflowTargetState(
                datasetId,
                Number(DatasetState.ProofSubmitted)
            )
            return datasetId // Returns the dataset ID
        } catch (error) {
            throw error
        }
    }

    /**
     * Executes the workflow after the dataset has been approved.
     * @returns The dataset ID after completing the workflow.
     */
    async approvedDatasetWorkflow(): Promise<number> {
        try {
            // Completes the workflow for DatasetProofSubmitted state
            let datasetId = await this.completeDependentWorkflow(
                DatasetState.ProofSubmitted,
                async (): Promise<number> => {
                    return await this.proofSubmittedDatasetWorkflow()
                }
            )

            // Getting the root hash and generating challenge proof
            let rootHash = this.generator.getProofRoot(
                datasetId,
                DataType.Source
            )
            let [randomSeed, leaves, siblings, paths] =
                this.generator.generateDatasetChallengeProof(rootHash!)

            // Submitting challenge proofs
            await this.assertion.submitDatasetChallengeProofsAssertion(
                process.env.DATASWAP_DATASETAUDITOR as string,
                datasetId,
                randomSeed,
                leaves,
                siblings,
                paths
            )

            this.updateWorkflowTargetState(
                datasetId,
                Number(DatasetState.Approved)
            )

            return datasetId // Returns the dataset ID
        } catch (error) {
            throw error
        }
    }
}
