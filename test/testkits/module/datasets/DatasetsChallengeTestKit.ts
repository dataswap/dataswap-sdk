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

import { DatasetsTestBase } from "./abstract/DatasetsTestBase"
import { DatasetState } from "../../../../src/shared/types/datasetType"
import { IContractsManager } from "../../../interfaces/setup/IContractsManater"
import { IDatasetsHelper } from "../../../interfaces/helper/module/IDatasetshelper"
import { IGenerator } from "../../../interfaces/setup/IGenerator"
import { IDatasetsAssertion } from "../../../interfaces/assertions/module/IDatasetsAssertion"
import { DataType } from "../../../../src/shared/types/dataType"
import { EscrowType, FIL } from "../../../../src/shared/types/financeType"
import { handleEvmError } from "../../../../src/shared/errors"
/**
 * Represents a test kit for submitting dataset challenge.
 * Extends from DatasetsTestBase.
 */
export class SubmitDatasetChallengeTestKit extends DatasetsTestBase {
    /**
     * Constructor for SubmitDatasetChallengeTestKit.
     * @param _assertion - The assertion instance.
     * @param _generator - The generator instance.
     * @param _contractsManager - The contracts manager instance.
     * @param _datasetHelper - The datasets helper instance.
     */
    constructor(
        _assertion: IDatasetsAssertion,
        _generator: IGenerator,
        _contractsManager: IContractsManager,
        _datasetHelper?: IDatasetsHelper
    ) {
        super(_assertion, _generator, _contractsManager, _datasetHelper)
    }

    /**
     * Optional function executed before the action.
     * @returns Promise resolving to a number.
     */
    async optionalBefore(): Promise<number> {
        try {
            const datasetId = this.datasetsHelper.getWorkflowTargetId(
                DatasetState.ProofSubmitted
            )
            if (datasetId != 0) {
                return datasetId
            }
            return await this.datasetsHelper.proofSubmittedDatasetWorkflow()
        } catch (error) {
            throw error
        }
    }

    /**
     * Action function to execute the approval of dataset.
     * @param datasetId - The ID of the dataset.
     * @returns Promise resolving to a number.
     */
    async action(datasetId: number): Promise<number> {
        try {
            const auditCollateralRequirement = await this.contractsManager
                .FinanceEvm()
                .getEscrowRequirement(
                    datasetId,
                    0,
                    process.env.DATASWAP_DATASETAUDITOR as string,
                    FIL,
                    EscrowType.EscrowChallengeAuditCollateral
                )

            await this.assertion.nominateAsDatasetAuditorCandidateAssersion(
                process.env.DATASWAP_DATASETAUDITOR as string,
                datasetId,
                auditCollateralRequirement.data!
            )
            this.contractsManager
                .FilplusEvm()
                .getWallet()
                .setDefault(process.env.DATASWAP_GOVERNANCE as string)

            await handleEvmError(
                this.contractsManager.FilplusEvm().setAuditorsElectionTime(5)
            )
            const proofCompleteHeight = await this.contractsManager
                .DatasetProofEvm()
                .getDatasetProofCompleteHeight(datasetId)

            this.contractsManager
                .DatasetChallengeEvm()
                .waitForBlockHeight(
                    Number(proofCompleteHeight) + 5 + 2,
                    Number(process.env.BLOCK_PERIOD)
                )

            // Getting the root hash and generating challenge proof
            const rootHash = this.generator.getProofRoot(
                datasetId,
                DataType.Source
            )
            const [randomSeed, leaves, siblings, paths] =
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
            await this.assertion.getDatasetStateAssertion(
                datasetId,
                DatasetState.Approved
            )
            this.datasetsHelper.updateWorkflowTargetState(
                datasetId,
                Number(DatasetState.Approved)
            )
            return datasetId
        } catch (error) {
            throw error
        }
    }
}
