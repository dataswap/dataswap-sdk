import { Entity, EntityInterface } from "@unipackage/ddd"

export interface DatasetMetadata extends EntityInterface {
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

export function newDatasetMetadata(): DatasetMetadata {
    return new DatasetMetadata({
        title: '',
        industry: '',
        name: '',
        description: '',
        source: '',
        accessMethod: '',
        submitter: '',
        createdBlockNumber: 0,
        sizeInBytes: 0,
        isPublic: false,
        version: 0,
        datasetId: 0,
        status: ''
    })
}
