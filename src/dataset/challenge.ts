import { Operate } from "../basic/operate/types"

export interface DatasetChallenge extends Operate, DatasetChallengeCreateInfo {}

export type DatasetChallengesMap = {
    [da: string]: DatasetChallenge
}

export interface DatasetChallengesInfo {
    ChallengeCount: number
    challenges?: DatasetChallengesMap
}

export interface DatasetChallengeCreateInfo {
    mockDa?: string
    estimatedDaFee?: number
    challenge: string
}
