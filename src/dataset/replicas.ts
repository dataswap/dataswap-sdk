import { State } from "../basic/state/types"
import { Operate } from "../basic/operate/types"

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
