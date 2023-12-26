import { DatasetMetadata } from "../../../src/module/dataset/metadata/types"
import { DatasetRequirements } from "../../../src/shared/types/datasetType"
import { DataType } from "../../../src/shared/types/dataType"
import { BidSelectionRule } from "../../../src/module/matching/metadata/types"

export interface IGenerator {
    generateDatasetMetadata(accessMethod?: string): DatasetMetadata
    generateDatasetRequirements(
        replicasCount: number,
        elementCountInReplica: number,
        duplicateElementIndex?: number,
        duplicateCount?: number
    ): DatasetRequirements
    generateDatasetProof(leavesCount: number, dataType: DataType): [root: string, leafHashes: string[], leafSizes: number[], mappingFilesAccessMethod: string]
    getDatasetProof(root: string): [leafHashes: string[], leafSizes: number[]]
    generateDatasetChallengeProof(root: string): [randomSeed: number, leaves: string[], siblings: string[][], paths: number[]]
    generatorAddress(): Promise<string>
    generatorEthAccount(): Promise<[string, string]>
    generatorMatchingInfo(datasetId: number, index: number): [
        bidSelectionRule: BidSelectionRule,
        biddingDelayBlockCount: number,
        biddingPeriodBlockCount: number,
        storageCompletionPeriodBlocks: number,
        biddingThreshold: bigint,
        additionalInfo: string,
    ]
    datasetNextReplicaIndex(datasetId: number, max: number): number
    getProofRoot(id: number, dataType: DataType): string | undefined
    setProofRoot(id: number, dataType: DataType, root: string): void
}

