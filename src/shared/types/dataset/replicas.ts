import { State } from "../state"
import { Operate } from "../operate"

export interface Replica extends State, Operate {
    country: string
    dp?: string
}

export type ReplicasMap = {
    [id: string]: Replica
}

export interface DatasetReplicasInfo {
    replicasCount: number
    replicas?: ReplicasMap
}
