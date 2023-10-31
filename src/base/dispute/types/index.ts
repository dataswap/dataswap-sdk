import { Address, Cid } from "@unipackage/filecoin"
export enum DisputeType {
    Proof,
    Challenge,
}

export interface DisputeResult {
    valid: boolean
    submitter: Address
    msgCid: Cid
}

export interface DisputeTarget {
    canAccess: {
        source: boolean
        mappingFiles: boolean
    }
    challengeId?: number //challenge
    randomSeed?: number // proof
}

export interface DatasetDispute {
    id: number
    datasetId: number
    proofId: number
    type: DisputeType
    target: DisputeTarget
    msgCid: Cid
    result?: DisputeResult
}
