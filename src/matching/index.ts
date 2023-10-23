import { State } from "../shared/state/types"
import { Operate } from "../shared/operate/types"

import { MatchingMetaInfo } from "./meta"
import { MatchingBidsMap } from "./bid"

export interface MatchingInfo extends State, Operate {
    metadata: MatchingMetaInfo
    pausedBlockCount?: number
    bids?: MatchingBidsMap
    winner?: string
}
