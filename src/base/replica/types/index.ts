import { State } from "../../../shared/state/types"

export interface Replica {
    datasetId: number
    carId: number
    id: number
    matchingId: number
    claimId: string
    state: State
}
