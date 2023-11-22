import { Cid } from "@unipackage/filecoin"
import { Entity, EntityInterface } from "@unipackage/ddd"

export interface DatasetMetadataBasic {
    title: string
    name: string
    description: string
    sizeInBytes: number
    industry: string
    source: string
    accessMethod: string
    version: number
    isPublic: boolean
}

export interface DatasetMetadata extends DatasetMetadataBasic, EntityInterface {
    msgCid: Cid
    submitter: string
    createdBlockNumber: number
    datasetId: number
}

export class DatasetMetadataEntity extends Entity<DatasetMetadata> {}
