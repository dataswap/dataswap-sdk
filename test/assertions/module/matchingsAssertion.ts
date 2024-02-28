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

import { expect } from "chai"
import { IContractsManager } from "../../interfaces/setup/IContractsManater"
import { IMatchingsAssertion } from "../../interfaces/assertions/module/IMatchingsAssertion"
import { MatchingState } from "../../../src/module/matching/metadata/types"
import { MatchingMetadata } from "../../../src/module/matching/metadata/types"
import { MatchingTarget } from "../../../src/module/matching/target/types"
import { MatchingBids } from "../../../src/module/matching/bids/types"
import { DataType } from "../../../src/shared/types/dataType"
import { handleEvmError } from "../../shared/error"
import { equal } from "@unipackage/utils"
import {
    mergeBigIntRangesToCompleteArray,
    convertToNumberArray,
} from "../../../src/shared/arrayUtils"

export class MatchingsAssertion implements IMatchingsAssertion {
    private contractsManager: IContractsManager
    constructor(_contractsManager: IContractsManager) {
        this.contractsManager = _contractsManager
    }

    // Matchings
    /**
     * Retrieves the initiator for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectInitiator - The expected initiator address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getMatchingInitiatorAssertion(
        matchingId: number,
        expectInitiator: string
    ): Promise<void> {
        let initiator = await handleEvmError(
            this.contractsManager
                .MatchingMetadataEvm()
                .getMatchingInitiator(matchingId)
        )
        expect(expectInitiator).to.equal(initiator.data)
    }

    /**
     * Retrieves the state for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectState - The expected state for the matching.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getMatchingStateAssertion(
        matchingId: number,
        expectState: MatchingState
    ): Promise<void> {
        let state = await handleEvmError(
            this.contractsManager
                .MatchingMetadataEvm()
                .getMatchingState(matchingId)
        )
        expect(Number(expectState)).to.equal(Number(state.data))
    }

    /**
     * Retrieves the metadata for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectMatchingMetadata - The expected matching metadata.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getMatchingMetadataAssertion(
        matchingId: number,
        expectMatchingMetadata: MatchingMetadata
    ): Promise<void> {
        let metadata = await handleEvmError(
            this.contractsManager
                .MatchingMetadataEvm()
                .getMatchingMetadata(matchingId)
        )
        expect(expectMatchingMetadata.bidSelectionRule).to.be.equal(
            metadata.data.bidSelectionRule
        )
        expect(expectMatchingMetadata.biddingDelayBlockCount).to.be.equal(
            metadata.data.biddingDelayBlockCount
        )
        expect(expectMatchingMetadata.biddingPeriodBlockCount).to.be.equal(
            metadata.data.biddingPeriodBlockCount
        )
        expect(
            expectMatchingMetadata.storageCompletionPeriodBlocks
        ).to.be.equal(metadata.data.storageCompletionPeriodBlocks)
        expect(expectMatchingMetadata.biddingThreshold).to.be.equal(
            metadata.data.biddingThreshold
        )
        expect(expectMatchingMetadata.additionalInfo).to.be.equal(
            metadata.data.additionalInfo
        )
        expect(expectMatchingMetadata.initiator).to.be.equal(
            metadata.data.initiator
        )
        expect(expectMatchingMetadata.pausedBlockCount).to.be.equal(
            metadata.data.pausedBlockCount
        )
        expect(expectMatchingMetadata.matchingId).to.be.equal(
            metadata.data.matchingId
        )
    }

    /**
     * Creates a matching and asserts the expectations.
     * @param caller - The caller of contract
     * @param datasetId - The dataset ID.
     * @param replicaIndex - The replica index of dataset.
     * @param expectMatchingMetadata - The expected matching metadata.
     * @returns A Promise resolving to the created matching's ID.
     */
    async createMatchingAssertion(
        caller: string,
        datasetId: number,
        replicaIndex: bigint,
        expectMatchingMetadata: MatchingMetadata
    ): Promise<number> {
        expectMatchingMetadata.initiator = process.env
            .DATASWAP_PROOFSUBMITTER as string

        this.contractsManager
            .MatchingMetadataEvm()
            .getWallet()
            .setDefault(caller)
        let tx = await handleEvmError(
            this.contractsManager
                .MatchingMetadataEvm()
                .createMatching(
                    datasetId,
                    expectMatchingMetadata.bidSelectionRule,
                    expectMatchingMetadata.biddingDelayBlockCount,
                    expectMatchingMetadata.biddingPeriodBlockCount,
                    expectMatchingMetadata.storageCompletionPeriodBlocks,
                    expectMatchingMetadata.biddingThreshold,
                    replicaIndex,
                    expectMatchingMetadata.additionalInfo
                )
        )

        // Get transaction receipt and event arguments
        const receipt = await this.contractsManager
            .MatchingMetadataEvm()
            .getTransactionReceipt(tx.data.hash)

        let ret = this.contractsManager
            .MatchingMetadataEvm()
            .getEvmEventArgs(receipt!, "MatchingCreated")

        let matchingId = Number(ret.data.matchingId)
        expectMatchingMetadata.matchingId = matchingId

        await this.getMatchingMetadataAssertion(
            matchingId,
            expectMatchingMetadata
        )
        await this.getMatchingInitiatorAssertion(matchingId, caller)
        await this.getMatchingStateAssertion(matchingId, MatchingState.None)
        return matchingId
    }

    /**
     * Pauses a matching and asserts the expectations.
     * @param caller - The caller of contract
     * @param matchingId - The ID of the matching to be paused.
     * @param expectState - The expected state for the matching after pausing.
     * @returns A Promise resolving if the assertion is successful.
     */
    async pauseMatchingAssertion(
        caller: string,
        matchingId: number,
        expectState: MatchingState
    ): Promise<void> {
        this.contractsManager
            .MatchingMetadataEvm()
            .getWallet()
            .setDefault(caller)
        await handleEvmError(
            this.contractsManager
                .MatchingMetadataEvm()
                .pauseMatching(matchingId)
        )
        await this.getMatchingStateAssertion(matchingId, expectState)
    }

    /**
     * Resumes a matching and asserts the expectations.
     * @param caller - The caller of contract
     * @param matchingId - The ID of the matching to be resumed.
     * @param expectState - The expected state for the matching after resuming.
     * @returns A Promise resolving if the assertion is successful.
     */
    async resumeMatchingAssertion(
        caller: string,
        matchingId: number,
        expectState: MatchingState
    ): Promise<void> {
        this.contractsManager
            .MatchingMetadataEvm()
            .getWallet()
            .setDefault(caller)
        await handleEvmError(
            this.contractsManager
                .MatchingMetadataEvm()
                .resumeMatching(matchingId)
        )
        await this.getMatchingStateAssertion(matchingId, expectState)
    }

    // MatchingsTarget

    /**
     * Asserts the target matchings against the expected target address.
     * @param expectMatchingsTargetAddress - The expected matchings target address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async targetMatchingsAssertion(
        expectMatchingsTargetAddress: string
    ): Promise<void> {
        let matchingsAddress = await handleEvmError(
            this.contractsManager.MatchingTargetEvm().matchings()
        )
        expect(expectMatchingsTargetAddress).to.be.equal(matchingsAddress.data)
    }

    /**
     * Asserts the target matchings bids against the expected bids address.
     * @param expectMatchingsBidsAddress - The expected matchings bids address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async targetMatchingsBidsAssertion(
        expectMatchingsBidsAddress: string
    ): Promise<void> {
        let matchingsBidsAddress = await handleEvmError(
            this.contractsManager.MatchingTargetEvm().matchingsBids()
        )
        expect(expectMatchingsBidsAddress).to.be.equal(
            matchingsBidsAddress.data
        )
    }

    /**
     * Retrieves the matching target and asserts it against the expected target.
     * @param matchingId - The ID of the matching.
     * @param expectMatchingTarget - The expected matching target.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getMatchingTargetAssertion(
        matchingId: number,
        expectMatchingTarget: MatchingTarget
    ): Promise<void> {
        let matchingTarget = await handleEvmError(
            this.contractsManager
                .MatchingTargetEvm()
                .getMatchingTarget(matchingId)
        )
        expect(expectMatchingTarget.datasetID).to.be.equal(
            matchingTarget.data.datasetID
        )
        expect(expectMatchingTarget.size).to.be.equal(matchingTarget.data.size)
        expect(expectMatchingTarget.dataType).to.be.equal(
            matchingTarget.data.dataType
        )
        expect(
            expectMatchingTarget.associatedMappingFilesMatchingID
        ).to.be.equal(matchingTarget.data.associatedMappingFilesMatchingID)
        expect(expectMatchingTarget.subsidy).to.be.equal(
            matchingTarget.data.subsidy
        )
        expect(expectMatchingTarget.replicaIndex).to.be.equal(
            matchingTarget.data.replicaIndex
        )

        expect(equal(expectMatchingTarget.cars, matchingTarget.data.cars)).to.be
            .true

        expect(expectMatchingTarget.matchingId).to.be.equal(
            matchingTarget.data.matchingId
        )
    }

    /**
     * Checks if a matching contains a car identified by its hash and asserts the result.
     * @param matchingId - The ID of the matching.
     * @param id - The id of the car.
     * @param expectRet - The expected boolean result.
     * @returns A Promise resolving if the assertion is successful.
     */
    async isMatchingContainsCarAssertion(
        matchingId: number,
        id: bigint,
        expectRet: boolean
    ): Promise<void> {
        let ret = await handleEvmError(
            this.contractsManager
                .MatchingTargetEvm()
                .isMatchingContainsCar(matchingId, id)
        )
        expect(expectRet).to.be.equal(ret.data)
    }

    /**
     * Checks if a matching contains cars identified by their hashes and asserts the result.
     * @param matchingId - The ID of the matching.
     * @param ids - The ids of the cars.
     * @param expectRet - The expected boolean result.
     * @returns A Promise resolving if the assertion is successful.
     */
    async isMatchingContainsCarsAssertion(
        matchingId: number,
        ids: bigint[],
        expectRet: boolean
    ): Promise<void> {
        let ret = await handleEvmError(
            this.contractsManager
                .MatchingTargetEvm()
                .isMatchingContainsCars(matchingId, ids)
        )
        expect(expectRet).to.be.equal(ret.data)
    }

    /**
     * Checks if a matching target is valid and meets specific requirements.
     * @param datasetId - The dataset ID.
     * @param cars - The array of car IDs.
     * @param size - The size of the dataset.
     * @param dataType - The type of data.
     * @param associatedMappingFilesMatchingId - The associated mapping files matching ID.
     * @param expectRet - The expected boolean result.
     * @returns A Promise resolving if the assertion is successful.
     */
    async isMatchingTargetValidAssertion(
        datasetId: number,
        cars: bigint[],
        size: bigint,
        dataType: DataType,
        associatedMappingFilesMatchingId: number,
        expectRet: boolean
    ): Promise<void> {
        let ret = await handleEvmError(
            this.contractsManager
                .MatchingTargetEvm()
                .isMatchingTargetValid(
                    datasetId,
                    cars,
                    size,
                    dataType,
                    associatedMappingFilesMatchingId
                )
        )
        expect(expectRet).to.be.equal(ret.data)
    }

    /**
     * Checks if a matching target meets specific FIL Plus requirements.
     * @param matchingId - The ID of the matching.
     * @param candidate - The candidate address.
     * @param expectRet - The expected boolean result.
     * @returns A Promise resolving if the assertion is successful.
     */
    async isMatchingTargetMeetsFilPlusRequirementsAssertion(
        matchingId: number,
        candidate: string,
        expectRet: boolean
    ): Promise<void> {
        let ret = await handleEvmError(
            this.contractsManager
                .MatchingTargetEvm()
                .isMatchingTargetMeetsFilPlusRequirements(matchingId, candidate)
        )
        expect(expectRet).to.be.equal(ret.data)
    }

    /**
     * Creates a target and asserts the expectations.
     * @param caller - The caller of contract
     * @param matchingId - The ID of the matching.
     * @param expectDatasetId - The expected dataset ID.
     * @param expectDataType - The expected data type.
     * @param expectAssociatedMappingFilesMatchingId - The expected associated mapping files matching ID.
     * @param expectReplicaIndex - The expected replica index.
     * @returns A Promise resolving if the assertion is successful.
     */
    async createTargetAssertion(
        caller: string,
        matchingId: number,
        expectDatasetId: number,
        expectDataType: DataType,
        expectAssociatedMappingFilesMatchingId: number,
        expectReplicaIndex: bigint
    ): Promise<void> {
        this.contractsManager.MatchingTargetEvm().getWallet().setDefault(caller)
        await handleEvmError(
            this.contractsManager
                .MatchingTargetEvm()
                .createTarget(
                    matchingId,
                    expectDatasetId,
                    expectDataType,
                    expectAssociatedMappingFilesMatchingId,
                    expectReplicaIndex
                )
        )

        let expectData = new MatchingTarget({
            datasetID: expectDatasetId,
            cars: [],
            size: BigInt(0),
            dataType: expectDataType,
            associatedMappingFilesMatchingID:
                expectAssociatedMappingFilesMatchingId,
            replicaIndex: expectReplicaIndex,
            subsidy: BigInt(0),
            matchingId: matchingId,
        })

        await this.getMatchingTargetAssertion(matchingId, expectData)
        await this.getMatchingStateAssertion(matchingId, MatchingState.None)
    }

    /**
     * Publishes a matching and asserts the expectations.
     * @param caller - The caller of contract
     * @param matchingId - The ID of the matching.
     * @param datasetId - The dataset ID.
     * @param expectCarsStarts - The expected array of car starts.
     * @param expectCarsEnds - The expected array of car ends.
     * @param expectComplete - The expected completion status.
     * @returns A Promise resolving if the assertion is successful.
     */
    async publishMatchingAssertion(
        caller: string,
        matchingId: number,
        datasetId: number,
        expectCarsStarts: bigint[],
        expectCarsEnds: bigint[],
        expectComplete: boolean
    ): Promise<void> {
        const cars = mergeBigIntRangesToCompleteArray(
            expectCarsStarts,
            expectCarsEnds
        )
        const carsSize = await handleEvmError(
            this.contractsManager.CarstoreEvm().getCarsSize(cars)
        )
        const target = await handleEvmError(
            this.contractsManager
                .MatchingTargetEvm()
                .getMatchingTarget(matchingId)
        )

        await this.isMatchingTargetValidAssertion(
            datasetId,
            cars,
            carsSize.data,
            target.data.dataType,
            target.data.associatedMappingFilesMatchingID,
            true
        )
        this.contractsManager.MatchingTargetEvm().getWallet().setDefault(caller)
        await handleEvmError(
            this.contractsManager
                .MatchingTargetEvm()
                .publishMatching(
                    matchingId,
                    datasetId,
                    expectCarsStarts,
                    expectCarsEnds,
                    expectComplete
                )
        )

        this.isMatchingContainsCarAssertion(
            matchingId,
            expectCarsStarts[0],
            true
        )
        let expectIds = mergeBigIntRangesToCompleteArray(
            expectCarsStarts,
            expectCarsEnds
        )
        this.isMatchingContainsCarsAssertion(matchingId, expectIds, true)
        if (expectComplete) {
            await this.getMatchingStateAssertion(
                matchingId,
                MatchingState.InProgress
            )
        }
    }

    // MatchingsBids
    /**
     * Asserts the bids for matchings against the expected matchings address.
     * @param expectMatchingsAddress - The expected matchings address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async bidsMatchingsAssertion(
        expectMatchingsAddress: string
    ): Promise<void> {
        let matchingsAddress = await handleEvmError(
            this.contractsManager.MatchingBidsEvm().matchings()
        )
        expect(expectMatchingsAddress).to.be.equal(matchingsAddress.data)
    }

    /**
     * Asserts the bids for matchings target against the expected matchings target address.
     * @param expectMatchingsTargetAddress - The expected matchings target address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async bidsMatchingsTargetAssertion(
        expectMatchingsTargetAddress: string
    ): Promise<void> {
        let matchingsTargetAddress = await handleEvmError(
            this.contractsManager.MatchingBidsEvm().matchingsTarget()
        )
        expect(expectMatchingsTargetAddress).to.be.equal(
            matchingsTargetAddress.data
        )
    }

    /**
     * Retrieves the matching bids and asserts them against the expected matching bids.
     * @param matchingId - The ID of the matching.
     * @param expectMachingBids - The expected matching bids.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getMatchingBidsAssertion(
        matchingId: number,
        expectMachingBids: MatchingBids
    ): Promise<void> {
        let matchingBids = await handleEvmError(
            this.contractsManager.MatchingBidsEvm().getMatchingBids(matchingId)
        )
        expect(equal(expectMachingBids.bidders, matchingBids.data.bidders)).to
            .be.true
        expect(equal(expectMachingBids.amounts, matchingBids.data.amounts)).to
            .be.true
        expect(
            equal(
                expectMachingBids.complyFilplusRules,
                matchingBids.data.complyFilplusRules
            )
        ).to.be.true
        expect(expectMachingBids.winner).to.be.equal(matchingBids.data.winner)
    }

    /**
     * Retrieves the bid amount for a specific bidder in a matching and asserts it.
     * @param matchingId - The ID of the matching.
     * @param bidder - The address of the bidder.
     * @param expectBidAmount - The expected bid amount.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getMatchingBidAmountAssertion(
        matchingId: number,
        bidder: string,
        expectBidAmount: bigint
    ): Promise<void> {
        let amount = await handleEvmError(
            this.contractsManager
                .MatchingBidsEvm()
                .getMatchingBidAmount(matchingId, bidder)
        )
        expect(expectBidAmount).to.be.equal(amount.data)
    }

    /**
     * Retrieves the count of bids for a specific matching and asserts it.
     * @param matchingId - The ID of the matching.
     * @param expectBidsCount - The expected number of bids.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getMatchingBidsCountAssertion(
        matchingId: number,
        expectBidsCount: number
    ): Promise<void> {
        const bidsCount = await handleEvmError(
            this.contractsManager
                .MatchingBidsEvm()
                .getMatchingBidsCount(matchingId)
        )
        expect(expectBidsCount).to.be.equal(Number(bidsCount.data))
    }

    /**
     * Retrieves the winner for a specific matching identified by its ID and asserts against the expected winner.
     * @param matchingId - The ID of the matching.
     * @param expectWinner - The expected winner address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getMatchingWinnerAssertion(
        matchingId: number,
        expectWinner: string
    ): Promise<void> {
        let winner = await handleEvmError(
            this.contractsManager
                .MatchingBidsEvm()
                .getMatchingWinner(matchingId)
        )
        expect(expectWinner).to.be.equal(winner.data)
    }

    /**
     * Retrieves the winners for multiple matchings identified by their IDs and asserts against the expected winners.
     * @param matchingIds - The array of matching IDs.
     * @param expectWinners - The expected array of winner addresses.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getMatchingWinnersAssertion(
        matchingIds: number[],
        expectWinners: string[]
    ): Promise<void> {
        let winners = await handleEvmError(
            this.contractsManager
                .MatchingBidsEvm()
                .getMatchingWinners(matchingIds)
        )
        expect(expectWinners.length).to.be.equal(winners.data.length)
        expect(equal(expectWinners, winners.data)).to.be.true
    }

    /**
     * Checks if a specific matching has a bid from a bidder and asserts the result.
     * @param matchingId - The ID of the matching.
     * @param bidder - The bidder address.
     * @param expectRet - The expected boolean result.
     * @returns A Promise resolving if the assertion is successful.
     */
    async hasMatchingBidAssertion(
        matchingId: number,
        bidder: string,
        expectRet: boolean
    ): Promise<void> {
        const ret = await handleEvmError(
            this.contractsManager
                .MatchingBidsEvm()
                .hasMatchingBid(matchingId, bidder)
        )
        expect(expectRet).to.be.equal(ret.data)
    }

    /**
     * Asserts the bidding amount against the expected amount for a specific matching.
     * @param caller - The caller of contract
     * @param matchingId - The ID of the matching.
     * @param expectAmount - The expected bidding amount.
     * @param expectState - The expected state of matching.
     * @returns A Promise resolving if the assertion is successful.
     */
    async biddingAssertion(
        caller: string,
        matchingId: number,
        expectAmount: bigint,
        expectState: MatchingState
    ): Promise<void> {
        const hasBidder = await handleEvmError(
            this.contractsManager
                .MatchingBidsEvm()
                .hasMatchingBid(matchingId, caller)
        )
        const bidsCount = await handleEvmError(
            this.contractsManager
                .MatchingBidsEvm()
                .getMatchingBidsCount(matchingId)
        )

        this.contractsManager.MatchingBidsEvm().getWallet().setDefault(caller)
        await handleEvmError(
            this.contractsManager
                .MatchingBidsEvm()
                .bidding(matchingId, expectAmount, {
                    value: expectAmount,
                })
        )

        await this.getMatchingBidAmountAssertion(
            matchingId,
            caller,
            expectAmount
        )

        await this.hasMatchingBidAssertion(matchingId, caller, true)
        let expectBidsCount = Number(bidsCount.data)
        if (!hasBidder.data) {
            expectBidsCount += 1
        }
        await this.getMatchingBidsCountAssertion(matchingId, expectBidsCount)
        await this.getMatchingStateAssertion(matchingId, expectState)
        if (expectState == MatchingState.Completed) {
            await this.getMatchingWinnersAssertion([matchingId], [caller])
            await this.getMatchingWinnerAssertion(matchingId, caller)
        }
    }

    /**
     * Cancels a matching and asserts the state after cancellation against the expected state.
     * @param caller - The caller of contract
     * @param matchingId - The ID of the matching to be canceled.
     * @param matchingState - The expected state after cancellation.
     * @returns A Promise resolving if the assertion is successful.
     */
    async cancelMatchingAssertion(
        caller: string,
        matchingId: number,
        expectState: MatchingState
    ): Promise<void> {
        this.contractsManager.MatchingBidsEvm().getWallet().setDefault(caller)
        await handleEvmError(
            this.contractsManager.MatchingBidsEvm().cancelMatching(matchingId)
        )

        await this.getMatchingStateAssertion(matchingId, expectState)
    }

    /**
     * Closes a matching and asserts the state after closure against the expected state.
     * @param caller - The caller of contract
     * @param matchingId - The ID of the matching to be closed.
     * @param expectState  - The expected state after closure.
     * @param expectWinner  - The expected winner after closure.
     * @returns A Promise resolving if the assertion is successful.
     */
    async closeMatchingAssertion(
        caller: string,
        matchingId: number,
        expectState: MatchingState,
        expectWinner: string
    ): Promise<void> {
        const bidder = process.env.DATASWAP_BIDDER as string
        let matchingBids = await handleEvmError(
            this.contractsManager.MatchingBidsEvm().getMatchingBids(matchingId)
        )
        await this.isMatchingTargetMeetsFilPlusRequirementsAssertion(
            matchingId,
            expectWinner,
            true
        )
        this.contractsManager.MatchingBidsEvm().getWallet().setDefault(caller)
        await handleEvmError(
            this.contractsManager.MatchingBidsEvm().closeMatching(matchingId)
        )
        await this.getMatchingStateAssertion(matchingId, expectState)

        if (expectState == MatchingState.Completed) {
            await this.getMatchingWinnersAssertion([matchingId], [expectWinner])
            await this.getMatchingWinnerAssertion(matchingId, expectWinner)
            matchingBids.data.winner = expectWinner
            await this.getMatchingBidsAssertion(matchingId, matchingBids.data)
        }
    }
}
