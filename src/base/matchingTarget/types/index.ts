import { DataType } from "../../../shared/types/dataType"

export interface MatchingTarget {
    id: number
    datasetId: number
    datasetReplicaId: number
    matchingId: number
    carIds: string
    size: number
    dataType: DataType
    associatedMappingFilesMatchingID?: number
    completed: boolean
}
