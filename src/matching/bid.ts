export interface MatchingBidCreateInfo {
    mockBidder?: string
    bid: number
}

export type MatchingBid = {
    bid: number
    bidTime: number
}

export type MatchingBidsMap = {
    [bidder: string]: MatchingBid
}
