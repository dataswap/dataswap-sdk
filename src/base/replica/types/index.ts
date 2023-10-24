import { State } from "../../../shared/state/types"

export interface Replica {
    datasetId: number
    carId: number
    id: number
    validMatchingId?: number
    matchings?: {
        [matchingId: number]: {
            claimId: string
            state: State
        }
    }
}
