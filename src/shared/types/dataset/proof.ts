export type leafHash = {
    cid: string
    size: number
}

export type LeafHashesMap = {
    [hash: string]: leafHash
}

export interface DatasetProofCreateInfo {
    rootHash?: string
    leafHashesCount?: number
    allProofsSubmitted?: string
}

export interface DatasetProofInfo extends DatasetProofCreateInfo {
    leafHashes?: LeafHashesMap
}
