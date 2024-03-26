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

import { DatasetState } from "../../../../src/shared/types/datasetType"
import { DatasetMetadata } from "../../../../src/module/dataset/metadata/types"
import { DataType } from "../../../../src/shared/types/dataType"
import {
    DatasetRequirement,
    DatasetRequirements,
} from "../../../../src/module/dataset/requirement/types"
import { DatasetChallenge } from "../../../../src/module/dataset/challenge/types"

export interface IDatasetsAssertion {
    // Datasets
    /**
     * Asynchronously asserts the count overview based on the expected total, success, ongoing, and failed counts.
     * @param expectTotal The expected total count.
     * @param expectSuccess The expected success count.
     * @param expectOngoing The expected ongoing count.
     * @param expectFailed The expected failed count.
     * @returns A promise that resolves when the assertion is completed.
     */
    getCountOverviewAssertion(
        expectTotal: bigint,
        expectSuccess: bigint,
        expectOngoing: bigint,
        expectFailed: bigint
    ): Promise<void>

    /**
     * Asynchronously asserts the size overview based on the expected total, success, ongoing, and failed counts.
     * @param expectTotal The expected total count.
     * @param expectSuccess The expected success count.
     * @param expectOngoing The expected ongoing count.
     * @param expectFailed The expected failed count.
     * @returns A promise that resolves when the assertion is completed.
     */
    getSizeOverviewAssertion(
        expectTotal: bigint,
        expectSuccess: bigint,
        expectOngoing: bigint,
        expectFailed: bigint
    ): Promise<void>

    /**
     * Retrieves the metadata for a specific dataset and asserts it against the expected data.
     * @param datasetId - The ID of the dataset.
     * @param expectData - The expected dataset metadata.
     * @returns A Promise resolving if the assertion is successful.
     */
    getDatasetMetadataAssertion(
        datasetId: number,
        expectData: DatasetMetadata
    ): Promise<void>

    /**
     * Retrieves the submitter for a specific dataset and asserts it against the expected submitter address.
     * @param datasetId - The ID of the dataset.
     * @param expectSubmitter - The expected submitter address.
     * @returns A Promise resolving if the assertion is successful.
     */
    getDatasetMetadataSubmitterAssertion(
        datasetId: number,
        expectSubmitter: string
    ): Promise<void>

    /**
     * Retrieves the client ID associated with the submitter for a specific dataset and asserts it.
     * @param datasetId - The ID of the dataset.
     * @param expectSubmitterClient - The expected submitter client ID.
     * @returns A Promise resolving if the assertion is successful.
     */
    getDatasetMetadataClientAssertion(
        datasetId: number,
        expectSubmitterClient: number
    ): Promise<void>

    /**
     * Asynchronously retrieves parameters for dataset timeout assertion.
     *
     * @param datasetId The ID of the dataset.
     * @param expectProofBlockCount The expected number of proof blocks.
     * @param expectAuditBlockCount The expected number of audit blocks.
     * @returns {Promise<void>} A Promise that resolves when the parameters are retrieved.
     */
    getDatasetTimeoutParametersAssersion(
        datasetId: number,
        expectProofBlockCount: bigint,
        expectAuditBlockCount: bigint
    ): Promise<void>

    /**
     * Checks for the existence of dataset metadata and asserts the access method against the expectation.
     * @param expectAccessMethod - The expected access method.
     * @returns A Promise resolving if the assertion is successful.
     */
    hasDatasetMetadataAssertion(expectAccessMethod: string): Promise<void>

    /**
     * Retrieves the state for a specific dataset and asserts it against the expected state.
     * @param datasetId - The ID of the dataset.
     * @param expectState - The expected dataset state.
     * @returns A Promise resolving if the assertion is successful.
     */
    getDatasetStateAssertion(
        datasetId: number,
        expectState: DatasetState
    ): Promise<void>

    /**
     * Asserts the governance address against the expected governance address.
     * @param expectGovernance - The expected governance address.
     * @returns A Promise resolving if the assertion is successful.
     */
    governanceAddressAssertion(expectGovernance: string): Promise<void>

    /**
     * Submits dataset metadata and asserts the client ID against the expected client ID.
     * @param caller - The caller that to send msg
     * @param expectDatasetClient - The expected dataset client ID.
     * @param expectData - The expected dataset metadata.
     * @returns A Promise resolving to the ID of the submitted dataset.
     */
    submitDatasetMetadataAssertion(
        caller: string,
        expectDatasetClient: number,
        expectData: DatasetMetadata
    ): Promise<number>

    /**
     * Asynchronously updates parameters for dataset timeout assertion.
     * @param caller The caller responsible for the update.
     * @param datasetId The ID of the dataset.
     * @param expectProofBlockCount The expected number of proof blocks.
     * @param expectAuditBlockCount The expected number of audit blocks.
     * @returns {Promise<void>} A Promise that resolves when the parameters are updated.
     */
    updateDatasetTimeoutParametersAssertion(
        caller: string,
        datasetId: number,
        expectProofBlockCount: bigint,
        expectAuditBlockCount: bigint
    ): Promise<void>

    /**
     * Asserts the count of datasets against the expected datasets count.
     * @param expectDatasetsCount - The expected count of datasets.
     * @returns A Promise resolving if the assertion is successful.
     */
    datasetsCountAssertion(expectDatasetsCount: number): Promise<void>

    //DatasetsRequirement
    /**
     * Asserts the count of replicas for a dataset against the expected count.
     * @param datasetId - The ID of the dataset.
     * @param expectCount - The expected count of replicas.
     * @returns A Promise resolving if the assertion is successful.
     */
    getDatasetReplicasCountAssertion(
        datasetId: number,
        expectCount: number
    ): Promise<void>

    /**
     * Asserts the requirements of a specific replica for a dataset against the expected requirements.
     * @param datasetId - The ID of the dataset.
     * @param index - The index of the replica.
     * @param expectRequirement - The expected requirements of the replica.
     * @returns A Promise resolving if the assertion is successful.
     */
    getDatasetReplicaRequirementAssertion(
        datasetId: number,
        index: bigint,
        expectRequirement: DatasetRequirement
    ): Promise<void>

    /**
     * Submits replica requirements for a dataset and asserts the requirements and amount against the expected values.
     * @param caller - The caller that to send msg
     * @param datasetId - The ID of the dataset.
     * @param expectRequirements - The expected replica requirements.
     * @param expectAmount - The expected amount associated with the requirements.
     * @returns A Promise resolving if the assertion is successful.
     */
    submitDatasetReplicaRequirementsAssertion(
        caller: string,
        datasetId: number,
        expectRequirements: DatasetRequirements,
        expectAmount: bigint
    ): Promise<void>

    //DatasetsProof
    /**
     * Asserts the proof for a specific data type within a dataset against the expected proof.
     * @param datasetId - The ID of the dataset.
     * @param dataType - The type of data.
     * @param index - The index of the proof.
     * @param len - The length of the proof.
     * @param expectProof - The expected proof.
     * @returns A Promise resolving if the assertion is successful.
     */
    getDatasetProofAssertion(
        datasetId: number,
        dataType: DataType,
        index: number,
        len: number,
        expectProof: string[]
    ): Promise<void>

    /**
     * Asserts the count of proofs for a specific data type within a dataset against the expected count.
     * @param datasetId - The ID of the dataset.
     * @param dataType - The type of data.
     * @param expectProofCount - The expected count of proofs.
     * @returns A Promise resolving if the assertion is successful.
     */
    getDatasetProofCountAssertion(
        datasetId: number,
        dataType: DataType,
        expectProofCount: number
    ): Promise<void>

    /**
     * Asserts the submitter of the dataset proof against the expected submitter address.
     * @param datasetId - The ID of the dataset.
     * @param expectProofSubmitter - The expected submitter address of the dataset proof.
     * @returns A Promise resolving if the assertion is successful.
     */
    getDatasetProofSubmitterAssertion(
        datasetId: number,
        expectProofSubmitter: string
    ): Promise<void>

    /**
     * Asserts the size of a specific data type within a dataset against the expected size.
     * @param datasetId - The ID of the dataset.
     * @param dataType - The type of data.
     * @param expectSize - The expected size of the data type within the dataset.
     * @returns A Promise resolving if the assertion is successful.
     */
    getDatasetSizeAssertion(
        datasetId: number,
        dataType: DataType,
        expectSize: number
    ): Promise<void>

    /**
     * Asserts if all proofs for a specific data type within a dataset are completed.
     * @param datasetId - The ID of the dataset.
     * @param dataType - The type of data.
     * @param expectRet - The expected boolean value indicating if all proofs are completed.
     * @returns A Promise resolving if the assertion is successful.
     */
    isDatasetProofallCompletedAssertion(
        datasetId: number,
        dataType: DataType,
        expectRet: boolean
    ): Promise<void>

    /**
     * Asserts if a specific car is contained within the dataset.
     * @param datasetId - The ID of the dataset.
     * @param id - The ID of the car.
     * @param expectRet - The expected boolean value indicating if the car is contained.
     * @returns A Promise resolving if the assertion is successful.
     */
    isDatasetContainsCarAssertion(
        datasetId: number,
        id: number,
        expectRet: boolean
    ): Promise<void>

    /**
     * Asserts if multiple cars are contained within the dataset.
     * @param datasetId - The ID of the dataset.
     * @param ids - The IDs of the cars.
     * @param expectRet - The expected boolean value indicating if all cars are contained.
     * @returns A Promise resolving if the assertion is successful.
     */
    isDatasetContainsCarsAssertion(
        datasetId: number,
        ids: number[],
        expectRet: boolean
    ): Promise<void>

    /**
     * Asserts the submitter of dataset proofs against the expected submitter address.
     * @param datasetId - The ID of the dataset.
     * @param submitter - The submitter address of the dataset proof.
     * @param expectRet - The expected boolean value indicating if the submitter matches.
     * @returns A Promise resolving if the assertion is successful.
     */
    isDatasetProofSubmitterAssertion(
        datasetId: number,
        submitter: string,
        expectRet: boolean
    ): Promise<void>

    /**
     * Asserts the submission of a dataset's proof root against the expected parameters.
     * @param datasetId - The ID of the dataset.
     * @param dataType - The type of data.
     * @param mappingFilesAccessMethod - The mapping files access method.
     * @param rootHash - The root hash of the proof.
     * @param expectSubmitter - The expected submitter address.
     * @returns A Promise resolving if the assertion is successful.
     */
    submitDatasetProofRootAssertion(
        datasetId: number,
        dataType: DataType,
        mappingFilesAccessMethod: string,
        rootHash: string,
        expectSubmitter: string
    ): Promise<void>

    /**
     * Asserts the submission of dataset proof details against the expected parameters.
     * @param caller - The caller that to send msg
     * @param datasetId - The ID of the dataset.
     * @param dataType - The type of data.
     * @param expectLeafHashes - The expected leaf hashes in the proof.
     * @param expectLeafIndex - The expected leaf index in the proof.
     * @param expectLeafSizes - The expected leaf sizes in the proof.
     * @param expectCompleted - The expected completion status of the proof.
     * @returns A Promise resolving if the assertion is successful.
     */
    submitDatasetProofAssertion(
        caller: string,
        datasetId: number,
        dataType: DataType,
        expectLeafHashes: string[],
        expectLeafIndex: number,
        expectLeafSizes: number[],
        expectCompleted: boolean
    ): Promise<void>

    /**
     * Completes the escrow process for the dataset with the specified ID and expected state.
     * @param caller - The caller that to send msg
     * @param datasetId The ID of the dataset.
     * @param expectState The expected state of the dataset.
     * @returns A promise that resolves when the escrow process is completed.
     */
    completeEscrowAssersion(
        caller: string,
        datasetId: number,
        expectState: DatasetState
    ): Promise<void>

    /**
     * Asserts the completion status of a dataset's proof submission against the expected state.
     * @param caller - The caller that to send msg
     * @param datasetId - The ID of the dataset.
     * @param expectState - The expected state of the dataset.
     * @returns A Promise resolving if the assertion is successful.
     */
    submitDatasetProofCompletedAssertion(
        caller: string,
        datasetId: number,
        expectState: DatasetState
    ): Promise<void>

    //DatasetsChallenge

    /**
     * Asserts the dataset's challenge proofs against the expected parameters.
     * @param datasetId - The ID of the dataset.
     * @param auditor - The address of the auditor.
     * @param expects - The expected dataset challenge proofs.
     * @returns A Promise resolving if the assertion is successful.
     */
    getDatasetChallengeProofsAssertion(
        datasetId: number,
        auditor: string,
        expects: DatasetChallenge
    ): Promise<void>

    /**
     * Asserts the count of dataset challenge proofs against the expected count.
     * @param datasetId - The ID of the dataset.
     * @param expectCount - The expected count of challenge proofs.
     * @returns A Promise resolving if the assertion is successful.
     */
    getDatasetChallengeProofsCountAssertion(
        datasetId: number,
        expectCount: number
    ): Promise<void>

    /**
     * Asserts the count of challenge submissions against the expected count.
     * @param datasetId - The ID of the dataset.
     * @param expectCount - The expected count of challenge submissions.
     * @returns A Promise resolving if the assertion is successful.
     */
    getChallengeSubmissionCountAssertion(
        datasetId: number,
        expectCount: number
    ): Promise<void>

    /**
     * Asserts whether a dataset's challenge proof is duplicate based on the provided parameters.
     * @param datasetId - The ID of the dataset.
     * @param auditor - The address of the auditor.
     * @param randomSeed - The random seed.
     * @param expectRet - The expected return value.
     * @returns A Promise resolving if the assertion is successful.
     */
    isDatasetChallengeProofDuplicateAssertion(
        datasetId: number,
        auditor: string,
        randomSeed: bigint,
        expectRet: boolean
    ): Promise<void>

    /**
     * Asynchronously checks if an auditor is expected to be a winner for a dataset.
     * @param datasetId The ID of the dataset.
     * @param caller The address of the auditor to check.
     * @param expectRet The expected result indicating whether the auditor is a winner.
     * @returns A Promise that resolves to void.
     */
    isWinnerAssertion(
        caller: string,
        datasetId: number,
        expectRet: boolean
    ): Promise<void>

    /**
     * Asynchronously asserts auditor stake.
     *
     * @param caller The caller asserting the auditor stake.
     * @param datasetId The ID of the dataset.
     * @param expectAmount The amount of stake being asserted.
     * @returns {Promise<void>} A Promise that resolves when the assertion is completed.
     */
    nominateAsDatasetAuditorCandidateAssersion(
        caller: string,
        datasetId: number,
        expectAmount: bigint
    ): Promise<void>
    /**
     * Asserts the submission of dataset challenge proofs against the expected parameters.
     * @param caller - The caller that to send msg
     * @param datasetId - The ID of the dataset.
     * @param randomSeed - The random seed for the challenge proof.
     * @param leaves - The array of leaf hashes in the proof.
     * @param siblings - The array of sibling hashes in the proof.
     * @param paths - The array of paths in the proof.
     * @returns A Promise resolving if the assertion is successful.
     */
    submitDatasetChallengeProofsAssertion(
        caller: string,
        datasetId: number,
        randomSeed: bigint,
        leaves: string[],
        siblings: string[][],
        paths: bigint[]
    ): Promise<void>
}
