import { State } from "../basic/state/types"
import { Operate } from "../basic/operate/types"

import { MatchingMetaInfo } from "./meta"
import { MatchingBidsMap } from "./bid"

export interface MatchingInfo extends State, Operate {
    metadata: MatchingMetaInfo
    pausedBlockCount?: number
    bids?: MatchingBidsMap
    winner?: string
}
