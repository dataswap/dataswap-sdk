export interface DatasetChallenge {
    submitter: string
    challenge: string
    estimatedDaFee?: number
}

export interface DatasetChallenges {
    count: number
    [id: number]: DatasetChallenge
}
