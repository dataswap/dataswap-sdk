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
    disputeChallengeId?: number //challenge
    randomSeed?: number // proof
}

export interface DatasetDispute {
    type: DisputeType
    target: DisputeTarget
    msgCid: Cid
    result?: DisputeResult
}

export interface DatasetDisputes {
    count: number
    [id: number]: DatasetDispute
}
