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

export interface IStoragesAssertion {
    /**
     * Retrieves the stored cars for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectCarIds - Array of expected car IDs.
     * @returns A Promise indicating the assertion result.
     */
    getStoredCarsAssertion(
        matchingId: number,
        expectCarIds: number[]
    ): Promise<void>

    /**
     * Retrieves the count of stored cars for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectCarCount - Expected count of stored cars.
     * @returns A Promise indicating the assertion result.
     */
    getStoredCarCountAssertion(
        matchingId: number,
        expectCarCount: number
    ): Promise<void>

    /**
     * Checks if all stored operations are completed for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectRet - Expected boolean indicating if all storage operations are done.
     * @returns A Promise indicating the assertion result.
     */
    isAllStoredDoneAssertion(
        matchingId: number,
        expectRet: boolean
    ): Promise<void>

    /**
     * Checks if storage expiration is set for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectRet - Expected boolean indicating if storage expiration is set.
     * @returns A Promise indicating the assertion result.
     */
    isStorageExpirationAssertion(
        matchingId: number,
        expectRet: boolean
    ): Promise<void>

    /**
     * Checks if the next datacap allocation is valid for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectRet - Expected boolean indicating if the next allocation is valid.
     * @returns A Promise indicating the assertion result.
     */
    isNextDatacapAllocationValidAssertion(
        matchingId: number,
        expectRet: boolean
    ): Promise<void>

    /**
     * Submits storage claim IDs for a matching identified by its ID.
     * @param caller - The address of the caller.
     * @param matchingId - The ID of the matching.
     * @param provider - Provider ID.
     * @param ids - Array of car IDs.
     * @param claimIds - Array of claim IDs.
     * @returns A Promise indicating the assertion result.
     */
    submitStorageClaimIdsAssertion(
        caller: string,
        matchingId: number,
        provider: number,
        ids: number[],
        claimIds: number[]
    ): Promise<void>

    /**
     * Requests datacap allocation for a specific matching identified by its ID.
     * @param caller - The address of the caller.
     * @param matchingId - The ID of the matching.
     * @returns A Promise indicating the assertion result.
     */
    requestAllocateDatacapAssertion(
        caller: string,
        matchingId: number
    ): Promise<void>
}
