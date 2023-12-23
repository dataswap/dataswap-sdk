import { IHelper } from "./IHelpler"
import { DataType } from "../../../../src/shared/types/datasetType"

export interface IMatchingsHelper extends IHelper {
    getAssociatedMappingFilesMatchingId(matchingId: number): number | undefined
    setAssociatedMappingFilesMatchingId(matchingId: number, associatedMatchingId: number): void

    createdMatchingWorkflow(dataType: DataType, targetDatasetId?: number): Promise<number>
    inProgressMatchingWorkflow(dataType: DataType, targetDatasetId?: number): Promise<number>
    pausedMatchingWorkflow(dataType: DataType, targetDatasetId?: number): Promise<number>
    completedMatchingWorkflow(dataType: DataType, targetDatasetId?: number): Promise<number>
}