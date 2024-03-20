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
import { CreateMatchingsMetadataTestKit } from "./MatchingsTestKit"
import { splitBigInts } from "../../../../src/shared/arrayUtils"
/**
 * Represents a test kit for create matching target.
 * Extends from MatchingsTestBase.
 */
export class CreateMatchingTargetTestKit extends MatchingsTestBase {
    private dependentTestKit: CreateMatchingsMetadataTestKit
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
        this.dependentTestKit = new CreateMatchingsMetadataTestKit(
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
            return await this.dependentTestKit.run()
        } catch (error) {
            throw error
        }
    }

    /**
     * Action function to execute the create matching target.
     * @param matchingId - The matchingId.
     * @returns Promise resolving to a number.
     */
    async action(matchingId: number): Promise<number> {
        try {
            let datasetId =
                await this.matchingsHelper.getTargetDatasetId(matchingId)

            if (datasetId === 0) {
                datasetId = this.matchingsHelper
                    .getDatasetsHelper()
                    .getWorkflowTargetId(DatasetState.Approved)
            }

            // Creating target for the matching
            await this.assertion.createTargetAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                matchingId,
                datasetId,
                DataType.MappingFiles,
                0,
                BigInt(0)
            )
            this.matchingsHelper.updateWorkflowTargetState(
                matchingId,
                MatchingState.None
            )

            return matchingId
        } catch (error) {
            throw error
        }
    }
}

/**
 * Represents a test kit for publish matching.
 * Extends from MatchingsTestBase.
 */
export class PublishMatchingTestKit extends MatchingsTestBase {
    private dependentTestKit: CreateMatchingTargetTestKit
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
        this.dependentTestKit = new CreateMatchingTargetTestKit(
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
                MatchingState.None
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
     * Action function to execute the create matching target.
     * @param matchingId - The matchingId.
     * @returns Promise resolving to a number.
     */
    async action(matchingId: number): Promise<number> {
        try {
            const datasetId =
                await this.matchingsHelper.getTargetDatasetId(matchingId)

            // Fetches the count of proofs for the dataset and data type
            const matchingCarsCount = await handleEvmError(
                this.contractsManager
                    .DatasetProofEvm()
                    .getDatasetProofCount(datasetId, DataType.MappingFiles)
            )

            // Retrieves proof data for the dataset and data type
            const cars = await handleEvmError(
                this.contractsManager
                    .DatasetProofEvm()
                    .getDatasetProof(
                        datasetId!,
                        DataType.MappingFiles,
                        0,
                        Number(matchingCarsCount)
                    )
            )
            // Extracts data from car IDs
            const carsIds = await handleEvmError(
                this.contractsManager.CarstoreEvm().getCarsIds(cars)
            )
            const { starts, ends } = splitBigInts(carsIds)

            // Publishes the in-progress matching
            await this.assertion.publishMatchingAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                matchingId,
                datasetId,
                starts,
                ends,
                true
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
