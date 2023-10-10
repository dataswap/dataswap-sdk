export interface Dispute extends DatasetDisputeCreateInfo {
    da: string
    challenge: string
    result: string
}

export type DisputesMap = {
    [submitter: string]: Dispute[]
}

export interface DatasetDipputesInfo {
    disputeCount: number
    diputes?: DisputesMap
}

export interface DatasetDisputeCreateInfo {
    mockSubmitter?: string
    mockResult?: boolean
    disputeProof: string
}
