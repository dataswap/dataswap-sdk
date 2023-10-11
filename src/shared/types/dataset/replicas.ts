import { State } from "../state"
import { Operate } from "../operate"

export interface DatasetReplica extends State, Operate {
    country: string
    dp?: string
}

export type DatasetReplicasMap = {
    [id: string]: DatasetReplica
}

export interface DatasetReplicasInfo {
    replicasCount: number
    replicas?: DatasetReplicasMap
}
