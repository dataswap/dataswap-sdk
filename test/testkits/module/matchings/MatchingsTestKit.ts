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
import { MatchingsTestBase } from "./abstract/MatchingsTestBase"
import { IMatchingsAssertion } from "../../../interfaces/assertions/module/IMatchingsAssertion"
import { IMatchingsHelper } from "../../../interfaces/helper/module/IMatchingsHelper"
import { IContractsManager } from "../../../interfaces/setup/IContractsManater"
import { IGenerator } from "../../../interfaces/setup/IGenerator"
import { handleEvmError } from "../../../../src/shared/errors"
import { DataType } from "../../../../src/shared/types/dataType"
import { MatchingState } from "../../../../src/module/matching/metadata/types"
import { DatasetState } from "../../../../src/shared/types/datasetType"

/**
 * Represents a test kit for create matching metadata.
 * Extends from MatchingsTestBase.
 */
export class CreateMatchingsMetadataTestKit extends MatchingsTestBase {
    /**
     * Constructor for MatchingsTestBase.
     * @param _assertion - The assertion instance.
     * @param _generator - The generator instance.
     * @param _contractsManager - The contracts manager instance.
     * @param _matchingsHelper - The matchings helper instance.
     */
    constructor(
        _assertion: IMatchingsAssertion,
        _generator: IGenerator,
        _contractsManager: IContractsManager,
        _matchingsHelper: IMatchingsHelper
    ) {
        super(_assertion, _generator, _contractsManager, _matchingsHelper)
    }

    /**
     * Optional function executed before the action.
     * @returns Promise resolving to a number.
     */
    async optionalBefore(): Promise<number> {
        try {
            const datasetId = this.matchingsHelper
                .getDatasetsHelper()
                .getWorkflowTargetId(DatasetState.Approved)
            if (datasetId != 0) {
                return 0
            }
            await this.matchingsHelper
                .getDatasetsHelper()
                .approvedDatasetWorkflow()
            return 0
        } catch (error) {
            throw error
        }
    }

    /**
     * Action function to execute the create matching.
     * @returns Promise resolving to a number.
     */
    async action(_: number): Promise<number> {
        try {
            const datasetId = this.matchingsHelper
                .getDatasetsHelper()
                .getWorkflowTargetId(DatasetState.Approved)
            const datasetState = await handleEvmError(
                this.contractsManager
                    .DatasetMetadataEvm()
                    .getDatasetState(datasetId)
            )
            if (Number(datasetState) == Number(DatasetState.Approved)) {
                this.matchingsHelper
                    .getDatasetsHelper()
                    .updateWorkflowTargetState(datasetId, DatasetState.Approved)
            }

            const replicaIndex = BigInt(0)
            const matchingMetadata = this.generator.generatorMatchingInfo(
                datasetId,
                replicaIndex
            )
            // Creating a new matching
            const matchingId = await this.assertion.createMatchingAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                datasetId,
                replicaIndex,
                matchingMetadata
            )
            this.matchingsHelper.setTargetDatasetId(matchingId, datasetId)

            return matchingId
        } catch (error) {
            throw error
        }
    }
}

/**
 * Represents a test kit for pause matching.
 * Extends from MatchingsTestBase.
 */
export class PauseMatchingTestKit extends MatchingsTestBase {
    /**
     * Constructor for MatchingsTestBase.
     * @param _assertion - The assertion instance.
     * @param _generator - The generator instance.
     * @param _contractsManager - The contracts manager instance.
     * @param _matchingsHelper - The matchings helper instance.
     */
    constructor(
        _assertion: IMatchingsAssertion,
        _generator: IGenerator,
        _contractsManager: IContractsManager,
        _matchingsHelper: IMatchingsHelper
    ) {
        super(_assertion, _generator, _contractsManager, _matchingsHelper)
    }

    /**
     * Optional function executed before the action.
     * @returns Promise resolving to a number.
     */
    async optionalBefore(): Promise<number> {
        try {
            const matchingId = this.matchingsHelper.getWorkflowTargetId(
                MatchingState.InProgress
            )
            if (matchingId != 0) {
                return matchingId
            }

            const datasetId = this.matchingsHelper
                .getDatasetsHelper()
                .getWorkflowTargetId(DatasetState.Approved)
            return await this.matchingsHelper.inProgressMatchingWorkflow(
                DataType.MappingFiles,
                datasetId
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Action function to execute the create matching.
     * @param matchingId - The matchingId.
     * @returns Promise resolving to a number.
     */
    async action(matchingId: number): Promise<number> {
        try {
            await this.assertion.pauseMatchingAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                matchingId,
                MatchingState.Paused
            )

            this.matchingsHelper.updateWorkflowTargetState(
                matchingId,
                MatchingState.Paused
            )
            return matchingId
        } catch (error) {
            throw error
        }
    }
}

/**
 * Represents a test kit for resume matching.
 * Extends from MatchingsTestBase.
 */
export class ResumeMatchingTestKit extends MatchingsTestBase {
    private dependentTestKit: PauseMatchingTestKit
    /**
     * Constructor for MatchingsTestBase.
     * @param _assertion - The assertion instance.
     * @param _generator - The generator instance.
     * @param _contractsManager - The contracts manager instance.
     * @param _matchingsHelper - The matchings helper instance.
     */
    constructor(
        _assertion: IMatchingsAssertion,
        _generator: IGenerator,
        _contractsManager: IContractsManager,
        _matchingsHelper: IMatchingsHelper
    ) {
        super(_assertion, _generator, _contractsManager, _matchingsHelper)
        this.dependentTestKit = new PauseMatchingTestKit(
            _assertion,
            _generator,
            _contractsManager,
            _matchingsHelper
        )
    }

    /**
     * Optional function executed before the action.
     * @returns Promise resolving to a number.
     */
    async optionalBefore(): Promise<number> {
        try {
            const matchingId = this.matchingsHelper.getWorkflowTargetId(
                MatchingState.Paused
            )
            if (matchingId != 0) {
                return matchingId
            }
            return await this.dependentTestKit.run()
        } catch (error) {
            throw error
        }
    }

    /**
     * Action function to execute the create matching.
     * @param matchingId - The matchingId.
     * @returns Promise resolving to a number.
     */
    async action(matchingId: number): Promise<number> {
        try {
            await this.assertion.resumeMatchingAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                matchingId,
                MatchingState.InProgress
            )
            this.matchingsHelper.updateWorkflowTargetState(
                matchingId,
                MatchingState.InProgress
            )
            return matchingId
        } catch (error) {
            throw error
        }
    }
}
