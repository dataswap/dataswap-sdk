import { Entity } from "@unipackage/ddd"

export interface DatasetMetadata {
    title: string
    industry: string
    name: string
    description: string
    source: string
    accessMethod: string
    submitter: string
    createdBlockNumber: number
    sizeInBytes: number
    isPublic: boolean
    version: number
    datasetId?: number
    status?: string
}

export class DatasetMetadata extends Entity<DatasetMetadata> { }
