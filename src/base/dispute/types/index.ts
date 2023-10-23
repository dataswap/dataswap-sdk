export interface DatasetDispute {
    baseChallengeId: number
    submitter: string
    disputeChallenge: string
    estimatedDaFee?: number
    result: string
}

export interface DatasetDisputes {
    count: number
    [id: number]: DatasetDispute
}
