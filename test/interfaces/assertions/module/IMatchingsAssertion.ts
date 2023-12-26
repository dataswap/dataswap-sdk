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

import { MatchingMetadata, MatchingState, BidSelectionRule } from "../../../../src/module/matching/metadata/types"
import { MatchingTarget } from "../../../../src/module/matching/target/types"
import { DataType } from "../../../../src/shared/types/dataType"
import { MatchingBids } from "../../../../src/module/matching/bids/types"

export interface IMatchingsAssertion {
    // Matchings
    /**
     * Retrieves the initiator for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectInitiator - The expected initiator address.
     * @returns A Promise resolving if the assertion is successful.
     */
    getMatchingInitiatorAssertion(matchingId: number, expectInitiator: string): Promise<void>

    /**
     * Retrieves the state for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectState - The expected state for the matching.
     * @returns A Promise resolving if the assertion is successful.
     */
    getMatchingStateAssertion(matchingId: number, expectState: MatchingState): Promise<void>

    /**
     * Retrieves the metadata for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectMatchingMetadata - The expected matching metadata.
     * @returns A Promise resolving if the assertion is successful.
     */
    getMatchingMetadataAssertion(matchingId: number, expectMatchingMetadata: MatchingMetadata): Promise<void>

    /**
     * Creates a matching and asserts the expectations.
     * @param caller - The caller of contract
     * @param datasetId - The dataset ID.
     * @param replicaIndex - The replica index of dataset.
     * @param expectMatchingMetadata - The expected matching metadata.
     * @returns A Promise resolving to the created matching's ID.
     */
    createMatchingAssertion(
        caller: string,
        datasetId: number,
        replicaIndex: number,
        expectMatchingMetadata: MatchingMetadata
    ): Promise<number>

    /**
     * Pauses a matching and asserts the expectations.
     * @param caller - The caller of contract
     * @param matchingId - The ID of the matching to be paused.
     * @param expectState - The expected state for the matching after pausing.
     * @returns A Promise resolving if the assertion is successful.
     */
    pauseMatchingAssertion(
        caller: string,
        matchingId: number,
        expectState: MatchingState
    ): Promise<void>

    /**
     * Resumes a matching and asserts the expectations.
     * @param caller - The caller of contract
     * @param matchingId - The ID of the matching to be resumed.
     * @param expectState - The expected state for the matching after resuming.
     * @returns A Promise resolving if the assertion is successful.
     */
    resumeMatchingAssertion(
        caller: string,
        matchingId: number,
        expectState: MatchingState
    ): Promise<void>

    // MatchingsTarget

    /**
     * Asserts the target matchings against the expected target address.
     * @param expectMatchingsTargetAddress - The expected matchings target address.
     * @returns A Promise resolving if the assertion is successful.
     */
    targetMatchingsAssertion(expectMatchingsTargetAddress: string): Promise<void>

    /**
     * Asserts the target matchings bids against the expected bids address.
     * @param expectMatchingsBidsAddress - The expected matchings bids address.
     * @returns A Promise resolving if the assertion is successful.
     */
    targetMatchingsBidsAssertion(expectMatchingsBidsAddress: string): Promise<void>

    /**
     * Retrieves the matching target and asserts it against the expected target.
     * @param matchingId - The ID of the matching.
     * @param expectMatchingTarget - The expected matching target.
     * @returns A Promise resolving if the assertion is successful.
     */
    getMatchingTargetAssertion(matchingId: number, expectMatchingTarget: MatchingTarget): Promise<void>

    /**
     * Checks if a matching contains a car identified by its hash and asserts the result.
     * @param matchingId - The ID of the matching.
     * @param id - The id of the car.
     * @param expectRet - The expected boolean result.
     * @returns A Promise resolving if the assertion is successful.
     */
    isMatchingContainsCarAssertion(
        matchingId: number,
        id: number,
        expectRet: boolean
    ): Promise<void>

    /**
     * Checks if a matching contains cars identified by their hashes and asserts the result.
     * @param matchingId - The ID of the matching.
     * @param ids - The ids of the cars.
     * @param expectRet - The expected boolean result.
     * @returns A Promise resolving if the assertion is successful.
     */
    isMatchingContainsCarsAssertion(
        matchingId: number,
        ids: number[],
        expectRet: boolean
    ): Promise<void>

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
    isMatchingTargetValidAssertion(
        datasetId: number,
        cars: number[],
        size: number,
        dataType: DataType,
        associatedMappingFilesMatchingId: number,
        expectRet: boolean
    ): Promise<void>

    /**
     * Checks if a matching target meets specific FIL Plus requirements.
     * @param matchingId - The ID of the matching.
     * @param candidate - The candidate address.
     * @param expectRet - The expected boolean result.
     * @returns A Promise resolving if the assertion is successful.
     */
    isMatchingTargetMeetsFilPlusRequirementsAssertion(
        matchingId: number,
        candidate: string,
        expectRet: boolean
    ): Promise<void>

    /**
     * Asserts the dependencies of the target.
     * @param caller - The caller of contract
     * @param expectMatchingsAddress - The expected matchings address.
     * @param expectMatchingsBidsAddress - The expected matchings bids address.
     * @returns A Promise resolving if the assertion is successful.
     */
    targetInitDependenciesAssertion(
        caller: string,
        expectMatchingsAddress: string,
        expectMatchingsBidsAddress: string,
    ): Promise<void>

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
    createTargetAssertion(
        caller: string,
        matchingId: number,
        expectDatasetId: number,
        expectDataType: DataType,
        expectAssociatedMappingFilesMatchingId: number,
        expectReplicaIndex: number,
    ): Promise<void>

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
    publishMatchingAssertion(
        caller: string,
        matchingId: number,
        datasetId: number,
        expectCarsStarts: number[],
        expectCarsEnds: number[],
        expectComplete: boolean,
    ): Promise<void>


    // MatchingsBids
    /**
     * Asserts the bids for matchings against the expected matchings address.
     * @param expectMatchingsAddress - The expected matchings address.
     * @returns A Promise resolving if the assertion is successful.
     */
    bidsMatchingsAssertion(expectMatchingsAddress: string): Promise<void>

    /**
     * Asserts the bids for matchings target against the expected matchings target address.
     * @param expectMatchingsTargetAddress - The expected matchings target address.
     * @returns A Promise resolving if the assertion is successful.
     */
    bidsMatchingsTargetAssertion(expectMatchingsTargetAddress: string): Promise<void>

    /**
     * Retrieves the matching bids and asserts them against the expected matching bids.
     * @param matchingId - The ID of the matching.
     * @param expectMachingBids - The expected matching bids.
     * @returns A Promise resolving if the assertion is successful.
     */
    getMatchingBidsAssertion(matchingId: number, expectMachingBids: MatchingBids): Promise<void>

    /**
     * Retrieves the bid amount for a specific bidder in a matching and asserts it.
     * @param matchingId - The ID of the matching.
     * @param bidder - The address of the bidder.
     * @param expectBidAmount - The expected bid amount.
     * @returns A Promise resolving if the assertion is successful.
     */
    getMatchingBidAmountAssertion(
        matchingId: number,
        bidder: string,
        expectBidAmount: bigint
    ): Promise<void>

    /**
     * Retrieves the count of bids for a specific matching and asserts it.
     * @param matchingId - The ID of the matching.
     * @param expectBidsCount - The expected number of bids.
     * @returns A Promise resolving if the assertion is successful.
     */
    getMatchingBidsCountAssertion(
        matchingId: number,
        expectBidsCount: number
    ): Promise<void>

    /**
     * Retrieves the winner for a specific matching identified by its ID and asserts against the expected winner.
     * @param matchingId - The ID of the matching.
     * @param expectWinner - The expected winner address.
     * @returns A Promise resolving if the assertion is successful.
     */
    getMatchingWinnerAssertion(
        matchingId: number,
        expectWinner: string
    ): Promise<void>

    /**
     * Retrieves the winners for multiple matchings identified by their IDs and asserts against the expected winners.
     * @param matchingIds - The array of matching IDs.
     * @param expectWinners - The expected array of winner addresses.
     * @returns A Promise resolving if the assertion is successful.
     */
    getMatchingWinnersAssertion(
        matchingIds: number[],
        expectWinners: string[]
    ): Promise<void>

    /**
     * Checks if a specific matching has a bid from a bidder and asserts the result.
     * @param matchingId - The ID of the matching.
     * @param bidder - The bidder address.
     * @param expectRet - The expected boolean result.
     * @returns A Promise resolving if the assertion is successful.
     */
    hasMatchingBidAssertion(
        matchingId: number,
        bidder: string,
        expectRet: boolean
    ): Promise<void>

    /**
     * Asserts the initialization dependencies for bids against the expected addresses.
     * @param caller - The caller of contract
     * @param expectMatchingsAddresss - The expected matchings address.
     * @param expectMatchingsTargetAddresss - The expected matchings target address.
     * @returns A Promise resolving if the assertion is successful.
     */
    bidsInitDependenciesAssertion(
        caller: string,
        expectMatchingsAddresss: string,
        expectMatchingsTargetAddresss: string,
    ): Promise<void>

    /**
     * Asserts the bidding amount against the expected amount for a specific matching.
     * @param caller - The caller of contract
     * @param matchingId - The ID of the matching.
     * @param expectAmount - The expected bidding amount.
     * @returns A Promise resolving if the assertion is successful.
     */
    biddingAssertion(
        caller: string,
        matchingId: number,
        expectAmount: bigint,
    ): Promise<void>

    /**
     * Cancels a matching and asserts the state after cancellation against the expected state.
     * @param caller - The caller of contract
     * @param matchingId - The ID of the matching to be canceled.
     * @param matchingState - The expected state after cancellation.
     * @returns A Promise resolving if the assertion is successful.
     */
    cancelMatchingAssertion(
        caller: string,
        matchingId: number,
        matchingState: MatchingState
    ): Promise<void>

    /**
     * Closes a matching and asserts the state after closure against the expected state.
     * @param caller - The caller of contract
     * @param matchingId - The ID of the matching to be closed.
     * @param matchingState - The expected state after closure.
     * @returns A Promise resolving if the assertion is successful.
     */
    closeMatchingAssertion(
        caller: string,
        matchingId: number,
        matchingState: MatchingState
    ): Promise<void>
}