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

export interface IDatacapsAssertion {
    /**
     * Retrieves the chunk collateral funds for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectChunkCollateralFunds - Expected chunk collateral funds.
     * @returns A Promise indicating the assertion result.
     */
    getDatacapChunkCollateralFundsAssertion(matchingId: number, expectChunkCollateralFunds: bigint): Promise<void>

    /**
     * Retrieves the chunk burn funds for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectChunkBurnFunds - Expected chunk burn funds.
     * @returns A Promise indicating the assertion result.
     */
    getDatacapChunkBurnFundsAssertion(matchingId: number, expectChunkBurnFunds: bigint): Promise<void>

    /**
     * Retrieves the collateral requirement for datacaps.
     * @param expectCollateraRequirement - Expected collateral requirement.
     * @returns A Promise indicating the assertion result.
     */
    getCollateralRequirementAssertion(expectCollateraRequirement: bigint): Promise<void>

    /**
     * Retrieves the available datacaps for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectAvailableDatacaps - Expected available datacaps.
     * @returns A Promise indicating the assertion result.
     */
    getAvailableDatacapAssertion(matchingId: number, expectAvailableDatacaps: number): Promise<void>

    /**
     * Retrieves the allocated datacaps for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectAllocatedDatacaps - Expected allocated datacaps.
     * @returns A Promise indicating the assertion result.
     */
    getAllocatedDatacapAssertion(matchingId: number, expectAllocatedDatacaps: number): Promise<void>

    /**
     * Retrieves the total datacap allocation requirement for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectTotalDatacapRequirement - Expected total datacap allocation requirement.
     * @returns A Promise indicating the assertion result.
     */
    getTotalDatacapAllocationRequirementAssertion(matchingId: number, expectTotalDatacapRequirement: number): Promise<void>

    /**
     * Retrieves the remaining unallocated datacaps for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectRemainUnallocatedDatacaps - Expected remaining unallocated datacaps.
     * @returns A Promise indicating the assertion result.
     */
    getRemainingUnallocatedDatacapAssertion(matchingId: number, expectRemainUnallocatedDatacaps: number): Promise<void>

    /**
     * Checks if the next datacap allocation is valid for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectRet - Expected boolean indicating if the next allocation is valid.
     * @returns A Promise indicating the assertion result.
     */
    isNextDatacapAllocationValidAssertion(matchingId: number, expectRet: boolean): Promise<void>

    /**
     * Adds datacap chunk collateral for a matching identified by its ID.
     * @param caller - The address of the caller.
     * @param matchingId - The ID of the matching.
     * @param expectAddAmount - Expected amount to add as chunk collateral.
     * @returns A Promise indicating the assertion result.
     */
    addDatacapChunkCollateralAssertion(caller: string, matchingId: number, expectAddAmount: bigint): Promise<void>

    /**
     * Requests datacap allocation for a specific matching identified by its ID.
     * @param caller - The address of the caller.
     * @param matchingId - The ID of the matching.
     * @param expectAllocated - Expected amount to be allocated.
     * @returns A Promise indicating the assertion result.
     */
    requestAllocateDatacapAssertion(caller: string, matchingId: number, expectAllocated: number): Promise<void>
}