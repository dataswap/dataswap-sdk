export interface DatasetDisputeCreateInfo {
    mockSubmitter?: string
    mockResult?: boolean
    disputeProof: string
}

export interface DatasetDispute extends DatasetDisputeCreateInfo {
    da: string
    challenge: string
    result: string
}

export type DatasetDisputesMap = {
    [submitter: string]: DatasetDispute[]
}

export interface DatasetDipputesInfo {
    disputeCount: number
    diputes?: DatasetDisputesMap
}
