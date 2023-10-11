import { State } from "../state"
import { Operate } from "../operate"
import { MatchingMetaInfo } from "./meta"
import { MatchingBidsMap } from "./bid"

export interface MatchingInfo extends State, Operate {
    metadata: MatchingMetaInfo
    pausedBlockCount?: number
    bids?: MatchingBidsMap
    winner?: string
}
