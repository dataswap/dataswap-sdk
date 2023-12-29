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
import { DataType } from "../../../../src/shared/types/dataType"
import { IDatasetsHelper } from "./IDatasetshelper"

/**
 * Represents a helper interface for matchings.
 * Extends the base helper interface.
 */
export interface IMatchingsHelper extends IHelper {
    /**
     * Retrieves the associated mapping files' matching ID based on a given matching ID.
     * @param matchingId - The matching ID.
     * @returns The associated mapping files' matching ID, if found; otherwise, undefined.
     */
    getAssociatedMappingFilesMatchingId(matchingId: number): number | undefined

    /**
     * Sets the associated mapping files' matching ID for a given matching.
     * @param matchingId - The matching ID.
     * @param associatedMatchingId - The associated mapping files' matching ID to be set.
     */
    setAssociatedMappingFilesMatchingId(
        matchingId: number,
        associatedMatchingId: number
    ): void

    /**
     * Initiates a workflow for a created matching of a specific data type.
     * @param dataType - The type of data for the matching.
     * @param targetDatasetId - (Optional) The target dataset ID for the matching.
     * @returns The ID of the created matching.
     */
    createdMatchingWorkflow(
        dataType: DataType,
        targetDatasetId?: number
    ): Promise<number>

    /**
     * Initiates a workflow for an in-progress matching of a specific data type.
     * @param dataType - The type of data for the matching.
     * @param targetDatasetId - (Optional) The target dataset ID for the matching.
     * @returns The ID of the in-progress matching.
     */
    inProgressMatchingWorkflow(
        dataType: DataType,
        targetDatasetId?: number
    ): Promise<number>

    /**
     * Initiates a workflow for a paused matching of a specific data type.
     * @param dataType - The type of data for the matching.
     * @param targetDatasetId - (Optional) The target dataset ID for the matching.
     * @returns The ID of the paused matching.
     */
    pausedMatchingWorkflow(
        dataType: DataType,
        targetDatasetId?: number
    ): Promise<number>

    /**
     * Initiates a workflow for a completed matching of a specific data type.
     * @param dataType - The type of data for the matching.
     * @param targetDatasetId - (Optional) The target dataset ID for the matching.
     * @returns The ID of the completed matching.
     */
    completedMatchingWorkflow(
        dataType: DataType,
        targetDatasetId?: number
    ): Promise<number>

    /**
     * Retrieves the datasets helper instance.
     * @returns {IDatasetsHelper} The datasets helper instance.
     */
    getDatasetsHelper(): IDatasetsHelper
}
