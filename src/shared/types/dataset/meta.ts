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
    isPublic: string
    requiredReplicasCountries?: Array<string>
    dpFee: string
}

export interface DatasetMetaInfo extends DatasetCreateInfo {
    id: number
    createdHeight: string
    createdTime: string
    submitter: string
}
