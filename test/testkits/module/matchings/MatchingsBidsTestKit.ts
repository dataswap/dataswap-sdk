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

/**
 * Represents a test kit for cancel matching.
 * Extends from MatchingsTestBase.
 */
export class CancelMatchingTestKit extends MatchingsTestBase {
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
            return await this.matchingsHelper.inProgressMatchingWorkflow(
                DataType.MappingFiles
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Action function to execute the cancel matching.
     * @param matchingId - The matchingId.
     * @returns Promise resolving to a number.
     */
    async action(matchingId: number): Promise<number> {
        try {
            await this.assertion.cancelMatchingAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                matchingId,
                MatchingState.Cancelled
            )
            this.matchingsHelper.updateWorkflowTargetState(
                matchingId,
                MatchingState.Cancelled
            )
            return matchingId
        } catch (error) {
            throw error
        }
    }
}

/**
 * Represents a test kit for bidding matching.
 * Extends from MatchingsTestBase.
 */
export class BiddingMatchingTestKit extends MatchingsTestBase {
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
            return await this.matchingsHelper.inProgressMatchingWorkflow(
                DataType.MappingFiles
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Action function to execute the bidding matching.
     * @param matchingId - The matchingId.
     * @returns Promise resolving to a number.
     */
    async action(matchingId: number): Promise<number> {
        try {
            const meta = await handleEvmError(
                this.contractsManager
                    .MatchingMetadataEvm()
                    .getMatchingMetadata(matchingId)
            )

            await this.contractsManager
                .MatchingBidsEvm()
                .waitForBlockHeight(
                    Number(
                        meta.createdBlockNumber +
                            meta.biddingDelayBlockCount +
                            meta.pausedBlockCount
                    ) + 5,
                    Number(process.env.BLOCK_PERIOD)
                )

            await this.assertion.biddingAssertion(
                process.env.DATASWAP_BIDDER as string,
                matchingId,
                BigInt(meta.biddingThreshold) + BigInt(10),
                MatchingState.InProgress
            )
            return matchingId
        } catch (error) {
            throw error
        }
    }
}

/**
 * Represents a test kit for close matching.
 * Extends from MatchingsTestBase.
 */
export class CloseMatchingTestKit extends MatchingsTestBase {
    private dependentTestKit: BiddingMatchingTestKit
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
        this.dependentTestKit = new BiddingMatchingTestKit(
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
                MatchingState.InProgress
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
     * Action function to execute the close matching.
     * @param matchingId - The matchingId.
     * @returns Promise resolving to a number.
     */
    async action(matchingId: number): Promise<number> {
        try {
            const meta = await handleEvmError(
                this.contractsManager
                    .MatchingMetadataEvm()
                    .getMatchingMetadata(matchingId)
            )

            await this.contractsManager
                .MatchingBidsEvm()
                .waitForBlockHeight(
                    Number(
                        meta.createdBlockNumber +
                            meta.biddingDelayBlockCount +
                            meta.pausedBlockCount +
                            meta.biddingPeriodBlockCount
                    ) + 5,
                    Number(process.env.BLOCK_PERIOD)
                )

            await this.assertion.closeMatchingAssertion(
                process.env.DATASWAP_BIDDER as string,
                matchingId,
                MatchingState.Completed,
                process.env.DATASWAP_BIDDER as string
            )
            this.matchingsHelper.updateWorkflowTargetState(
                matchingId,
                MatchingState.Completed
            )

            return matchingId
        } catch (error) {
            throw error
        }
    }
}
