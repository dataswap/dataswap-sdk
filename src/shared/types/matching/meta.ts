export interface MatchingCreateInfo {
    mockSubmitter?: string
    targetDataType?: string
    associatedMappingFilesMatchingID?: number
    BidSelectionRule?: string
    biddingThreshold: number
    biddingDelayBlockCount?: number
    auctionPeriod: Array<any>
    storageCompletePeriod: number
    storageLifecycle: number
    dataTransferType: string
    datalocation: string
    dpBandwidthSpeed: string
    spLocation: string
    spBandwidthSpeed: string
}

export interface MatchingMetaInfo extends MatchingCreateInfo {
    id: number
    datasetId: string
    replicaId: string
    size: string
    createdTime: string
    submitter: string
}
