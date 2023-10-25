import { DataType } from "../../../shared/types/dataType"

export interface MatchingTarget {
    id: number
    datasetId: number
    datasetReplicaId: number
    carIds: string
    size: number
    dataType: DataType
    associatedMappingFilesMatchingID: number
    matchingId?: number
}
