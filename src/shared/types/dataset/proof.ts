export type DatasetLeafHash = {
    cid: string
    size: number
}

export type DatasetLeafHashesMap = {
    [hash: string]: DatasetLeafHash
}

export interface DatasetProofCreateInfo {
    rootHash?: string
    leafHashesCount?: number
    allProofsSubmitted?: boolean
}

export interface DatasetProofInfo extends DatasetProofCreateInfo {
    leafHashes?: DatasetLeafHashesMap
}
