export interface DatasetCreateInfo {
    name: string
    description?: string
    size: string
    industry?: string
    source?: string
    accessMethod?: string
    version?: string
    ownername?: string
    ownercountry?: string
    ownerwebsite?: string
    isPublic?: string
    replicasRequiredNumber?: string
    replicasCountries?: Array<string>
}

export interface DatasetOverviewType extends DatasetCreateInfo {
    id: number
    createdHeight: string
    createdTime: string
    submitter: string
    state: string
    operate: string
    rootHash?: string
    completed?: string
    proofs?: any
    proofChallenge?: any
    disputes?: any
    replicasDetail?: any
}

export interface DatasetProofType {
    hash: string
    cid: string
    size: string
}

export interface DatasetChallengeProofType {
    da: string
    challenge: string
    operate: string
}

export interface DatasetDisputeType {
    submitter: string
    da: string
    challenge: string
    disputeProof: string
    result: string
}

export interface DatasetReplicasType {
    id: string
    country: string
    dp: string
    state: string
    operate: string
}
