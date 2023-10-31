import { State } from "../../shared/state/types"
import { Operate } from "../../shared/operate/types"

export interface MatchingInfo extends State, Operate {
    id: number
    metadataId: number
    targetId: number
    maintainIds: string
    bidIds: string
    winnerBidId?: number
}
