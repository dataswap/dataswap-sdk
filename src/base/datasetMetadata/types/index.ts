import { Cid } from "@unipackage/filecoin"

export interface DatasetOwner {
    ownerName: string
    ownerCountry: string
    ownerWebsite: string
}

export interface DatasetCreateInfo extends DatasetOwner {
    name: string
    description: string
    size: string
    industry: string
    source: string
    accessMethod: string
    version: string
    isPublic: boolean
    dpFee: number
    replicasCount: number
}

export interface DatasetMetaData extends DatasetCreateInfo {
    id: number
    createdHeight: string
    createdTime: string
    submitter: string
    msgCid: Cid
    datasetId?: number
}
