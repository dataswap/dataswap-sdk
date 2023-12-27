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

import { IHelper } from "./IHelpler"

/**
 * Represents a helper interface for datasets.
 * Extends the IHelper interface.
 */
export interface IDatasetsHelper extends IHelper {
    /**
     * Executes the workflow for a submitted metadata dataset.
     * @param replicasCount - The count of replicas.
     * @param elementCountInReplica - The element count in each replica.
     * @param duplicateIndex - (Optional) The index for duplication.
     * @param duplicateCount - (Optional) The count for duplication.
     * @returns A promise resolving to the dataset ID.
     */
    metadataSubmittedDatasetWorkflow(
        replicasCount: number,
        elementCountInReplica: number,
        duplicateIndex?: number,
        duplicateCount?: number
    ): Promise<number>

    /**
     * Executes the workflow for an approved metadata dataset.
     * @returns A promise resolving to the dataset ID.
     */
    metadataApprovedDatasetWorkflow(): Promise<number>

    /**
     * Executes the workflow for a rejected metadata dataset.
     * @returns A promise resolving to the dataset ID.
     */
    metadataRejectedDatasetWorkflow(): Promise<number>

    /**
     * Executes the workflow for a dataset with insufficient funds.
     * @param fakedata Whether the specified workflow is submitted using fake data.
     * @returns A promise resolving to the dataset ID.
     */
    fundsNotEnoughDatasetWorkflow(fakedata: boolean): Promise<number>

    /**
     * Executes the workflow for a submitted proof dataset.
     * @param fakedata Whether the specified workflow is submitted using fake data.
     * @returns A promise resolving to the dataset ID.
     */
    proofSubmittedDatasetWorkflow(fakedata: boolean): Promise<number>

    /**
     * Executes the workflow for an approved dataset.
     * @returns A promise resolving to the dataset ID.
     */
    approvedDatasetWorkflow(): Promise<number>
}
