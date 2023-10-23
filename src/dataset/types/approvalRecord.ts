import { DatasetProof } from "../../base/proof/types"
import { DatasetChallenges } from "../../base/challenge/types"
import { DatasetDisputes } from "../../base/dispute/types"

export interface ApprovalRecord {
    Proof: DatasetProof
    challenges: DatasetChallenges
    disputes: DatasetDisputes
}

export interface ApprovalRecords {
    count: number
    [id: number]: ApprovalRecord
}
