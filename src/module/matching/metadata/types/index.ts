import { Entity } from "@unipackage/ddd"

/// Enum representing the rules for determining the winning bid.
export enum BidSelectionRule {
    HighestBid, // Note: Auction, Winner is determined by the highest bid
    LowestBid, // Note: Tender, Winner is determined by the lowest bid
    ImmediateAtLeast, // Note: Auction Immediate winning condition: Bid amount is at least the threshold
    ImmediateAtMost // Note: Render Immediate winning condition: Bid amount is at most the threshold
}

export interface MatchingMetadata {
    bidSelectionRule: BidSelectionRule;
    biddingDelayBlockCount: number;
    biddingPeriodBlockCount: number;
    storageCompletionPeriodBlocks: number;
    biddingThreshold: bigint;
    createdBlockNumber: number;
    additionalInfo: string;
    initiator: string;
    pausedBlockCount: number;
    matchingId?: number;
}

export class MatchingMetadata extends Entity<MatchingMetadata> { }

export enum MatchingState {
    None,
    Published, // Matching is published and open for bids
    InProgress, // Matching is currently in progress
    Paused, // Matching is paused
    Closed, // Matching is closed and no longer accepting bids
    Completed, // Matching is completed
    Cancelled, // Matching is cancelled
    Failed // Matching has failed
}