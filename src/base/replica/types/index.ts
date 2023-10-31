import { Cid } from "@unipackage/filecoin"
import { State } from "../../../shared/state/types"

export interface Replica {
    id: number
    datasetId: number
    carId: number
    datasetInternalReplicaid: number
    validMatchingId?: number
    matchings?: {
        [matchingId: number]: {
            claimId: string
            msgCid: Cid
            state: State
        }
    }
    state: State
}
