export interface DatasetOwnerInfo {
    ownerName: string
    ownerCountry: string
    ownerWebsite: string
}

export interface DatasetCreateInfo extends DatasetOwnerInfo {
    name: string
    description: string
    size: string
    industry: string
    source: string
    accessMethod: string
    version: string
    isPublic: boolean
    requiredReplicasCountries?: Array<string>
    dpFee: number
}

export interface DatasetMetaInfo extends DatasetCreateInfo {
    id: number
    createdHeight: string
    createdTime: string
    submitter: string
}
