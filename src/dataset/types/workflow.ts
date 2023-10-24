import { DatasetProof } from "../../base/proof/types"
import { DatasetChallenges } from "../../base/challenge/types"
import { DatasetDisputes } from "../../base/dispute/types"

export interface Workflow {
    Proof: DatasetProof
    challenges: DatasetChallenges
    disputes: DatasetDisputes
}

export interface Workflows {
    count: number
    [id: number]: Workflow
}
