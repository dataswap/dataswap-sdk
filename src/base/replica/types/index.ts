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
            state: State
        }
    }
}
