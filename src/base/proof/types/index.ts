import { Hash } from "@unipackage/filecoin"

export interface DatasetProofOverview {
    rootHash?: Hash
    leavesCount?: number
    allProofsSubmitted?: boolean
}

export interface DatasetProof {
    submitter: string
    mappingFilesAccessMethod?: string

    sourceProof: DatasetProofOverview
    mappingFilesProof: DatasetProofOverview
}
