import { Entity } from "@unipackage/ddd"
import { DataType } from "../../../../shared/types/dataType"
export interface MatchingTarget {
    datasetId: number,
    cars: number[],
    size: number,
    dataType: DataType,
    associatedMappingFilesMatchingID: number,
    replicaIndex: number,
    subsidy: bigint,
    matchingId?: number
}

export class MatchingTarget extends Entity<MatchingTarget> { }