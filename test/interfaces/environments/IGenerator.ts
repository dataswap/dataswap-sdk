import { DatasetMetadata } from "../../../src/module/dataset/metadata/types"
import { DatasetRequirements } from "../../../src/shared/types/datasetType"
import { DataType } from "../../../src/shared/types/datasetType"

export interface IGenerator {
    generateDatasetMetadata(accessMethod?: string): DatasetMetadata
    generateDatasetRequirements(
        replicasCount: number,
        elementCountInReplica: number,
        duplicateElementIndex?: number,
        duplicateCount?: number
    ): DatasetRequirements
    generateDatasetProof(leavesCount: number, dataType: DataType): [root: string, leafHashes: string[], leafSizes: number[], mappingFilesAccessMethod: string]
    generateDatasetChallengeProof(root: string): [randomSeed: number, leaves: string[], siblings: string[][], paths: number[]]
    generatorAddress(): Promise<string>
    generatorEthAccount(): Promise<[string, string]>
}

