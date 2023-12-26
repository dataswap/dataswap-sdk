import { expect } from "chai"
import { IContractsManager } from "../../interfaces/setup/IContractsManater"
import { IMatchingsAssertion } from "../../interfaces/assertions/module/IMatchingsAssertion";
import { MatchingState } from "../../../src/module/matching/metadata/types";
import { MatchingMetadata } from "../../../src/module/matching/metadata/types";
import { MatchingTarget } from "../../../src/module/matching/target/types";
import { MatchingBids } from "../../../src/module/matching/bids/types";
import { DataType } from "../../../src/shared/types/dataType";
import { handleEvmError } from "../../shared/error"
import { equal } from "@unipackage/utils";
import * as utils from "../../shared/utils"


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
    async getMatchingInitiatorAssertion(matchingId: number, expectInitiator: string): Promise<void> {
        let initiator = await handleEvmError(this.contractsManager.MatchingMetadataEvm().getMatchingInitiator(matchingId))
        expect(expectInitiator).to.equal(initiator.data)
    }

    /**
     * Retrieves the state for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectState - The expected state for the matching.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getMatchingStateAssertion(matchingId: number, expectState: MatchingState): Promise<void> {
        let state = await handleEvmError(this.contractsManager.MatchingMetadataEvm().getMatchingState(matchingId))
        expect(expectState).to.equal(state.data)
    }

    /**
     * Retrieves the metadata for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectMatchingMetadata - The expected matching metadata.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getMatchingMetadataAssertion(matchingId: number, expectMatchingMetadata: MatchingMetadata): Promise<void> {
        let metadata = await handleEvmError(this.contractsManager.MatchingMetadataEvm().getMatchingMetadata(matchingId))
        expect(equal(expectMatchingMetadata, metadata.data)).to.be.true
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
        replicaIndex: number,
        expectMatchingMetadata: MatchingMetadata
    ): Promise<number> {
        this.contractsManager.MatchingMetadataEvm().getWallet().setDefault(caller)
        let tx = await handleEvmError(this.contractsManager.MatchingMetadataEvm().createMatching(
            datasetId,
            expectMatchingMetadata.bidSelectionRule,
            expectMatchingMetadata.biddingDelayBlockCount,
            expectMatchingMetadata.biddingPeriodBlockCount,
            expectMatchingMetadata.storageCompletionPeriodBlocks,
            expectMatchingMetadata.biddingThreshold,
            replicaIndex,
            expectMatchingMetadata.additionalInfo
        ))

        // Get transaction receipt and event arguments
        const receipt = await this.contractsManager.MatchingMetadataEvm().getTransactionReceipt(
            tx.data.hash
        )

        let ret = this.contractsManager.MatchingMetadataEvm().getEvmEventArgs(receipt!, "MatchingCreated")

        let matchingId = Number(ret.data.matchingId)

        await this.getMatchingMetadataAssertion(matchingId, expectMatchingMetadata)
        await this.getMatchingInitiatorAssertion(matchingId, caller)

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
        this.contractsManager.MatchingMetadataEvm().getWallet().setDefault(caller)
        await handleEvmError(this.contractsManager.MatchingMetadataEvm().pauseMatching(matchingId))
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
        this.contractsManager.MatchingMetadataEvm().getWallet().setDefault(caller)
        await handleEvmError(this.contractsManager.MatchingMetadataEvm().resumeMatching(matchingId))
        await this.getMatchingStateAssertion(matchingId, expectState)
    }

    // MatchingsTarget

    /**
     * Asserts the target matchings against the expected target address.
     * @param expectMatchingsTargetAddress - The expected matchings target address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async targetMatchingsAssertion(expectMatchingsTargetAddress: string): Promise<void> {
        let matchingsAddress = await handleEvmError(this.contractsManager.MatchingTargetEvm().matchings())
        expect(expectMatchingsTargetAddress).to.be.equal(matchingsAddress.data)
    }

    /**
     * Asserts the target matchings bids against the expected bids address.
     * @param expectMatchingsBidsAddress - The expected matchings bids address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async targetMatchingsBidsAssertion(expectMatchingsBidsAddress: string): Promise<void> {
        let matchingsBidsAddress = await handleEvmError(this.contractsManager.MatchingTargetEvm().matchingsBids())
        expect(expectMatchingsBidsAddress).to.be.equal(matchingsBidsAddress.data)
    }

    /**
     * Retrieves the matching target and asserts it against the expected target.
     * @param matchingId - The ID of the matching.
     * @param expectMatchingTarget - The expected matching target.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getMatchingTargetAssertion(matchingId: number, expectMatchingTarget: MatchingTarget): Promise<void> {
        let matchingTarget = await handleEvmError(this.contractsManager.MatchingTargetEvm().getMatchingTarget(matchingId))
        expect(equal(expectMatchingTarget, matchingTarget.data))
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
        id: number,
        expectRet: boolean
    ): Promise<void> {
        let ret = await handleEvmError(this.contractsManager.MatchingTargetEvm().isMatchingContainsCar(matchingId, id))
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
        ids: number[],
        expectRet: boolean
    ): Promise<void> {
        let ret = await handleEvmError(this.contractsManager.MatchingTargetEvm().isMatchingContainsCars(matchingId, ids))
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
        cars: number[],
        size: number,
        dataType: DataType,
        associatedMappingFilesMatchingId: number,
        expectRet: boolean
    ): Promise<void> {
        let ret = await handleEvmError(this.contractsManager.MatchingTargetEvm().isMatchingTargetValid(
            datasetId,
            cars,
            size,
            dataType,
            associatedMappingFilesMatchingId
        ))
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
        let ret = await handleEvmError(this.contractsManager.MatchingTargetEvm().isMatchingTargetMeetsFilPlusRequirements(matchingId, candidate))
        expect(expectRet).to.be.equal(ret.data)
    }

    /**
     * Asserts the dependencies of the target.
     * @param caller - The caller of contract
     * @param expectMatchingsAddress - The expected matchings address.
     * @param expectMatchingsBidsAddress - The expected matchings bids address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async targetInitDependenciesAssertion(
        caller: string,
        expectMatchingsAddress: string,
        expectMatchingsBidsAddress: string,
    ): Promise<void> {
        this.contractsManager.MatchingTargetEvm().getWallet().setDefault(caller)
        await handleEvmError(this.contractsManager.MatchingTargetEvm().initDependencies(expectMatchingsAddress, expectMatchingsBidsAddress))
        this.targetMatchingsAssertion(expectMatchingsAddress)
        this.targetMatchingsBidsAssertion(expectMatchingsBidsAddress)
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
        expectReplicaIndex: number,
    ): Promise<void> {
        this.contractsManager.MatchingTargetEvm().getWallet().setDefault(caller)
        await handleEvmError(this.contractsManager.MatchingTargetEvm().createTarget(
            matchingId,
            expectDatasetId,
            expectDataType,
            expectAssociatedMappingFilesMatchingId,
            expectReplicaIndex
        ))

        let expectData = new MatchingTarget({
            datasetId: expectDatasetId,
            cars: [],
            size: 0,
            dataType: expectDataType,
            associatedMappingFilesMatchingID: expectAssociatedMappingFilesMatchingId,
            replicaIndex: expectReplicaIndex,
            subsidy: BigInt(0),
            matchingId: matchingId
        })

        this.getMatchingTargetAssertion(matchingId, expectData)
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
        expectCarsStarts: number[],
        expectCarsEnds: number[],
        expectComplete: boolean,
    ): Promise<void> {
        this.contractsManager.MatchingTargetEvm().getWallet().setDefault(caller)
        await handleEvmError(this.contractsManager.MatchingTargetEvm().publishMatching(
            matchingId,
            datasetId,
            expectCarsStarts,
            expectCarsEnds,
            expectComplete
        ))

        this.isMatchingContainsCarAssertion(matchingId, expectCarsStarts[0], true)
        let expectIds = utils.mergeRangesToCompleteArray(expectCarsStarts, expectCarsEnds)
        this.isMatchingContainsCarsAssertion(matchingId, expectIds, true)
    }


    // MatchingsBids
    /**
     * Asserts the bids for matchings against the expected matchings address.
     * @param expectMatchingsAddress - The expected matchings address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async bidsMatchingsAssertion(expectMatchingsAddress: string): Promise<void> {
        let matchingsAddress = await handleEvmError(this.contractsManager.MatchingBidsEvm().matchings())
        expect(expectMatchingsAddress).to.be.equal(matchingsAddress.data)
    }

    /**
     * Asserts the bids for matchings target against the expected matchings target address.
     * @param expectMatchingsTargetAddress - The expected matchings target address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async bidsMatchingsTargetAssertion(expectMatchingsTargetAddress: string): Promise<void> {
        let matchingsTargetAddress = await handleEvmError(this.contractsManager.MatchingBidsEvm().matchingsTarget())
        expect(expectMatchingsTargetAddress).to.be.equal(matchingsTargetAddress.data)
    }

    /**
     * Retrieves the matching bids and asserts them against the expected matching bids.
     * @param matchingId - The ID of the matching.
     * @param expectMachingBids - The expected matching bids.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getMatchingBidsAssertion(matchingId: number, expectMachingBids: MatchingBids): Promise<void> {
        let matchingBids = await handleEvmError(this.contractsManager.MatchingBidsEvm().getMatchingBids(matchingId))
        expect(equal(expectMachingBids.bidders, matchingBids.data.bidders)).to.be.true
        expect(equal(expectMachingBids.amounts, matchingBids.data.amounts)).to.be.true
        expect(equal(expectMachingBids.complyFilplusRules, matchingBids.data.complyFilplusRules)).to.be.true
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
        let amount = await handleEvmError(this.contractsManager.MatchingBidsEvm().getMatchingBidAmount(matchingId, bidder))
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
        let bidsCount = await handleEvmError(this.contractsManager.MatchingBidsEvm().getMatchingBidsCount(matchingId))
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
        let winner = await handleEvmError(this.contractsManager.MatchingBidsEvm().getMatchingWinner(matchingId))
        expect(expectWinner).to.be.equal(Number(winner.data))
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
        let winners = await handleEvmError(this.contractsManager.MatchingBidsEvm().getMatchingWinners(matchingIds))
        expect(expectWinners.length).to.be.equal(winners.data)
        for (let i = 0; i < expectWinners.length; i++) {
            await handleEvmError(this.getMatchingWinnerAssertion(matchingIds[i], winners[i]))
        }
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
        let ret = await handleEvmError(this.contractsManager.MatchingBidsEvm().hasMatchingBid(matchingId, bidder))
        expect(expectRet).to.be(ret.data)
    }

    /**
     * Asserts the initialization dependencies for bids against the expected addresses.
     * @param caller - The caller of contract
     * @param expectMatchingsAddresss - The expected matchings address.
     * @param expectMatchingsTargetAddresss - The expected matchings target address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async bidsInitDependenciesAssertion(
        caller: string,
        expectMatchingsAddresss: string,
        expectMatchingsTargetAddresss: string,
    ): Promise<void> {
        this.contractsManager.MatchingBidsEvm().getWallet().setDefault(caller)
        await handleEvmError(this.contractsManager.MatchingBidsEvm().initDependencies(
            expectMatchingsAddresss,
            expectMatchingsTargetAddresss
        ))
        await this.bidsMatchingsAssertion(expectMatchingsAddresss)
        await this.bidsMatchingsTargetAssertion(expectMatchingsTargetAddresss)
    }

    /**
     * Asserts the bidding amount against the expected amount for a specific matching.
     * @param caller - The caller of contract
     * @param matchingId - The ID of the matching.
     * @param expectAmount - The expected bidding amount.
     * @returns A Promise resolving if the assertion is successful.
     */
    async biddingAssertion(
        caller: string,
        matchingId: number,
        expectAmount: bigint,
    ): Promise<void> {
        this.contractsManager.MatchingBidsEvm().getWallet().setDefault(caller)
        await handleEvmError(this.contractsManager.MatchingBidsEvm().bidding(matchingId, expectAmount))
        await this.getMatchingBidAmountAssertion(matchingId, caller, expectAmount)
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
        await handleEvmError(this.contractsManager.MatchingBidsEvm().cancelMatching(matchingId))
        await this.getMatchingStateAssertion(matchingId, expectState)
    }

    /**
     * Closes a matching and asserts the state after closure against the expected state.
     * @param caller - The caller of contract
     * @param matchingId - The ID of the matching to be closed.
     * @param expectState  - The expected state after closure.
     * @returns A Promise resolving if the assertion is successful.
     */
    async closeMatchingAssertion(
        caller: string,
        matchingId: number,
        expectState: MatchingState
    ): Promise<void> {
        this.contractsManager.MatchingBidsEvm().getWallet().setDefault(caller)
        await handleEvmError(this.contractsManager.MatchingBidsEvm().closeMatching(matchingId))
        await this.getMatchingStateAssertion(matchingId, expectState)
    }
}