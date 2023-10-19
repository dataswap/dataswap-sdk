import { State } from "../../state/types"

export interface Replica {
    claimId: string
    state: State
    id: number
}

export type Replicas = {
    [matchingId: number]: Replica
}
