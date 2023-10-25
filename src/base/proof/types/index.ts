import { Hash } from "@unipackage/filecoin"

export interface Proof {
    rootHash?: Hash
    datasetSize: number
    leavesCount?: number
    carIds?: string //eg:[1-1000,4]
    allProofsSubmitted?: boolean
}

export interface DatasetProof {
    id: number
    datasetId: number
    submitter: string
    mappingFilesAccessMethod?: string

    sourceProof: Proof
    mappingFilesProof: Proof
}
