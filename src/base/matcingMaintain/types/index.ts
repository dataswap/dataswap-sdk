import { Cid } from "@unipackage/filecoin"

export interface MatchingMaintain {
    id: number
    matchingId: number
    operate?: string
    operateTime: string
    msgCid: Cid
}
