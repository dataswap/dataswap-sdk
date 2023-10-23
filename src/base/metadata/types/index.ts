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
    createdHeight: string
    createdTime: string
    submitter: string
}
