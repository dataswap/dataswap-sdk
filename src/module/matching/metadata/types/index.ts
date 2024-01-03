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

import { Entity } from "@unipackage/ddd"

/// Enum representing the rules for determining the winning bid.
export enum BidSelectionRule {
    HighestBid, // Note: Auction, Winner is determined by the highest bid
    LowestBid, // Note: Tender, Winner is determined by the lowest bid
    ImmediateAtLeast, // Note: Auction Immediate winning condition: Bid amount is at least the threshold
    ImmediateAtMost, // Note: Render Immediate winning condition: Bid amount is at most the threshold
}

/**
 * Interface representing the data structure for matching metadata.
 * @interface
 */
export interface MatchingMetadata {
    bidSelectionRule: BidSelectionRule
    biddingDelayBlockCount: bigint
    biddingPeriodBlockCount: bigint
    storageCompletionPeriodBlocks: bigint
    biddingThreshold: bigint
    additionalInfo: string
    initiator?: string
    createdBlockNumber?: bigint
    pausedBlockCount?: bigint
    replicaIndex?: bigint
    matchingId?: number
    datasetId?: number
}

/**
 * Class representing the entity for matching metadata.
 * @class
 * @extends Entity
 */
export class MatchingMetadata extends Entity<MatchingMetadata> {}

/**
 * Enumeration representing the possible states of a matching.
 * @enum {number}
 */
export enum MatchingState {
    None,
    Published, // Matching is published and open for bids
    InProgress, // Matching is currently in progress
    Paused, // Matching is paused
    Closed, // Matching is closed and no longer accepting bids
    Completed, // Matching is completed
    Cancelled, // Matching is cancelled
    Failed, // Matching has failed
}
