/*******************************************************************************
 *   (c) 2023 dataswap
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/

import { DatasetMetadata } from "../../../src/module/dataset/metadata/types"
import { DatasetRequirements } from "../../../src/shared/types/datasetType"
import { DataType } from "../../../src/shared/types/dataType"
import { BidSelectionRule } from "../../../src/module/matching/metadata/types"

export interface IGenerator {
    /**
     * Generates dataset metadata with optional access method.
     * @param accessMethod - Optional access method for the dataset.
     * @returns The generated dataset metadata.
     */
    generateDatasetMetadata(accessMethod?: string): DatasetMetadata

    /**
     * Generates dataset requirements based on provided parameters.
     * @param replicasCount - Number of replicas for the dataset.
     * @param elementCountInReplica - Element count in each replica.
     * @param duplicateElementIndex - Index for a duplicate element (optional).
     * @param duplicateCount - Count of duplicates (optional).
     * @returns The generated dataset requirements.
     */
    generateDatasetRequirements(
        replicasCount: number,
        elementCountInReplica: number,
        duplicateElementIndex?: number,
        duplicateCount?: number
    ): DatasetRequirements

    /**
     * Generates dataset proof information.
     * @param leavesCount - Number of leaves in the dataset.
     * @param dataType - Type of dataset (DataType enum).
     * @param fakedata Whether the specified generate fake data (optional).
     * @returns An array containing root, leaf hashes, leaf sizes, and mapping files access method.
     */
    generateDatasetProof(
        leavesCount: number,
        dataType: DataType,
        fakedata?: boolean
    ): [
        root: string,
        leafHashes: string[],
        leafSizes: number[],
        mappingFilesAccessMethod: string,
    ]

    /**
     * Retrieves dataset proof information based on the provided root.
     * @param root - The root to retrieve proof information.
     * @param dataType - The data type for the dataset.
     * @param fakedata Whether the specified get fake data (optional).
     * @returns An array containing leaf hashes and leaf sizes.
     */
    getDatasetProof(
        root: string,
        dataType: DataType,
        fakedata?: boolean
    ): [leafHashes: string[], leafSizes: number[]]

    /**
     * Generates dataset challenge proof based on the provided root.
     * @param root - The root to generate challenge proof.
     * @returns An array containing random seed, leaves, siblings, and paths.
     */
    generateDatasetChallengeProof(
        root: string
    ): [
        randomSeed: number,
        leaves: string[],
        siblings: string[][],
        paths: number[],
    ]

    /**
     * Generates a new address.
     * @returns A promise resolving to the generated address.
     */
    generatorAddress(): Promise<string>

    /**
     * Generates a new Ethereum account.
     * @returns A promise resolving to an array containing address and private key.
     */
    generatorEthAccount(): Promise<[string, string]>

    /**
     * Retrieves matching information for a specific dataset ID and index.
     * @param datasetId - The ID of the dataset.
     * @param index - Index of the dataset.
     * @returns An array containing bid selection rule, delay block counts, storage completion blocks, threshold, and additional information.
     */
    generatorMatchingInfo(
        datasetId: number,
        index: number
    ): [
        bidSelectionRule: BidSelectionRule,
        biddingDelayBlockCount: number,
        biddingPeriodBlockCount: number,
        storageCompletionPeriodBlocks: number,
        biddingThreshold: bigint,
        additionalInfo: string,
    ]

    /**
     * Retrieves the next replica index for a dataset.
     * @param datasetId - The ID of the dataset.
     * @param max - Maximum limit for the index.
     * @returns The next replica index for the dataset.
     */
    datasetNextReplicaIndex(datasetId: number, max: number): number

    /**
     * Retrieves the proof root for a dataset ID and data type.
     * @param id - The ID of the dataset.
     * @param dataType - Type of dataset (DataType enum).
     * @returns The proof root if available, otherwise undefined.
     */
    getProofRoot(id: number, dataType: DataType): string | undefined

    /**
     * Sets the proof root for a dataset ID and data type.
     * @param id - The ID of the dataset.
     * @param dataType - Type of dataset (DataType enum).
     * @param root - The root to set for proof.
     */
    setProofRoot(id: number, dataType: DataType, root: string): void
}
