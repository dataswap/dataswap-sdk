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
    getStoredCarsAssertion(matchingId: number, expectCarIds: number[]): Promise<void>

    /**
     * Retrieves the count of stored cars for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectCarCount - Expected count of stored cars.
     * @returns A Promise indicating the assertion result.
     */
    getStoredCarCountAssertion(matchingId: number, expectCarCount: number): Promise<void>

    /**
     * Retrieves the total stored size for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectSize - Expected total stored size.
     * @returns A Promise indicating the assertion result.
     */
    getTotalStoredSizeAssertion(matchingId: number, expectSize: number): Promise<void>

    /**
     * Retrieves the stored size of a specific car for a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param id - Car ID.
     * @param expectSize - Expected size of the car.
     * @returns A Promise indicating the assertion result.
     */
    getStoredCarSizeAssertion(matchingId: number, id: number, expectSize: number): Promise<void>

    /**
     * Retrieves the lock payment for the provider in a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectLockPayment - Expected lock payment for the provider.
     * @returns A Promise indicating the assertion result.
     */
    getProviderLockPaymentAssertion(matchingId: number, expectLockPayment: bigint): Promise<void>

    /**
     * Retrieves the lock payment for the client in a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectLockPayment - Expected lock payment for the client.
     * @returns A Promise indicating the assertion result.
     */
    getClientLockPaymentAssertion(matchingId: number, expectLockPayment: bigint): Promise<void>

    /**
     * Checks if all stored operations are completed for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectRet - Expected boolean indicating if all storage operations are done.
     * @returns A Promise indicating the assertion result.
     */
    isAllStoredDoneAssertion(matchingId: number, expectRet: boolean): Promise<void>

    /**
     * Checks if storage expiration is set for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectRet - Expected boolean indicating if storage expiration is set.
     * @returns A Promise indicating the assertion result.
     */
    isStorageExpirationAssertion(matchingId: number, expectRet: boolean): Promise<void>

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
}