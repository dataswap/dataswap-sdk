import { IHelper } from "./IHelpler"
import { DataType } from "../../../../src/shared/types/dataType"

export interface IDatasetsHelper extends IHelper {
    metadataSubmittedDatasetWorkflow(replicasCount: number, elementCountInReplica: number, duplicateIndex?: number, deplicateCount?: number): Promise<number>
    metadataApprovedDatasetWorkflow(): Promise<number>
    metadataRejectedDatasetWorkflow(): Promise<number>
    fundsNotEnoughDatasetWorkflow(): Promise<number>
    proofSubmittedDatasetWorkflow(dataType: number): Promise<number>
    aprovedDatasetWorkflow(): Promise<number>
}