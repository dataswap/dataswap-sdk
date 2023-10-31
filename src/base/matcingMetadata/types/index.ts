import { Cid } from "@unipackage/filecoin"

export interface MatchingMetadata {
    id: number
    bidSelectionRule?: string
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
    createdTime: string
    submitter: string
    msgCid: Cid
    matchingId?: number
}
