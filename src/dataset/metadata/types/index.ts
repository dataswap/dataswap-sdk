import { Entity, EntityInterface } from "@unipackage/ddd"

export interface DatasetMetadata extends EntityInterface {
    title: string
    name: string
    description: string
    sizeInBytes: number
    industry: string
    source: string
    accessMethod: string
    version: number
    isPublic: boolean
    submitter?: string
    createdBlockNumber?: number
    datasetId?: number
    status?: string
}

export class DatasetMetadata extends Entity<DatasetMetadata> {}
