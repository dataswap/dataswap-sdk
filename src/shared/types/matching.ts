export interface MatchingCreateInfo {
    mockSubmitter?: string
    auctionPeriod: Array<string>
    initialPrice: number
    storageCompletePeriod: number
    storageLifecycle: number
    dataTransferType: string
    datalocation: string
    dpBandwidthSpeed: string
    spLocation: string
    spBandwidthSpeed: string
}

export interface MatchingOverviewType extends MatchingCreateInfo {
    id: number
    datasetId: string
    replicaId: string
    size: string
    createdTime: string
    submitter: string
    state: string
    operate: string
    bids?: any
    winner?: any
}

export interface MatchingBidCreateInfo {
    bidder: string
    bid: number
}
export interface MatchingBidType extends MatchingBidCreateInfo {
    bidTime: string
}
