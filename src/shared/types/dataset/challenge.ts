import { Operate } from "../operate"

export interface Challenge extends Operate, DatasetChallengeCreateInfo {}

export type ChallengesMap = {
    [da: string]: Challenge
}

export interface DatasetChallengeInfo {
    ChallengeCount: number
    challenges?: ChallengesMap
}

export interface DatasetChallengeCreateInfo {
    mockDa?: string
    estimatedDaFee?: number
    challenge: string
}
