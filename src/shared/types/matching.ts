export interface MatchingOverviewType {
    id: number
    datasetId: string
    replicaId: string
    size: string
    createdTime: string
    submitter: string
    auctionPeriod: Array<string>
    initialPrice: string
    storageCompletePeriod: number
    storageLifecycle: number
    dataTransferType: string
    datalocation: string
    dpBandwidthSpeed: string
    spLocation: string
    spBandwidthSpeed: string
    state: string
    operate: string
    bids?: any
    winner?: any
}

export interface MatchingBidType {
    bidder: string
    bid: string
    bidTime: string
}
