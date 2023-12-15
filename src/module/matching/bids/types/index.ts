import { Entity } from "@unipackage/ddd"

export interface MatchingBids {
    bidders: string[],
    amounts: bigint[],
    complyFilplusRules: boolean[],
    winner: string,
    matchingId?: number
}

export class MatchingBids extends Entity<MatchingBids> { }