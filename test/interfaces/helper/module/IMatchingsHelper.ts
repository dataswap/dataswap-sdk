import { IHelper } from "./IHelpler"
import { DataType } from "../../../../src/shared/types/datasetType"

export interface IMatchingsHelper extends IHelper {
    publishedMatchingWorkflow(dataType: DataType, mapingFilesMatchingId?: number): Promise<number>
    inProgressMatchingWorkflow(): Promise<number>
    pausedMatchingWorkflow(): Promise<number>
    completedMatchingWorkflow(): Promise<number>
}