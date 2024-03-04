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

import { IStoragesAssertion } from "../../interfaces/assertions/module/IStoragesAssertion"
import { IContractsManager } from "../../interfaces/setup/IContractsManater"
import { expect } from "chai"
import { handleEvmError } from "../../shared/error"
import { equal } from "@unipackage/utils"
import { convertToNumberArray } from "../../../src/shared/arrayUtils"

export class StoragesAssertion implements IStoragesAssertion {
    private contractsManager: IContractsManager
    constructor(_contractsManager: IContractsManager) {
        this.contractsManager = _contractsManager
    }

    /**
     * Asynchronously asserts the count overview based on the expected total, success, ongoing, and failed counts.
     * @param expectTotal The expected total count.
     * @param expectSuccess The expected success count.
     * @param expectOngoing The expected ongoing count.
     * @param expectFailed The expected failed count.
     * @returns A promise that resolves when the assertion is completed.
     */
    async getCountOverviewAssertion(
        expectTotal: bigint,
        expectSuccess: bigint,
        expectOngoing: bigint,
        expectFailed: bigint
    ): Promise<void> {
        const statistics = await handleEvmError(
            this.contractsManager.StoragesEvm().getCountOverview()
        )
        expect(expectTotal).to.be.equal(statistics.data.total)
        expect(expectSuccess).to.be.equal(statistics.data.success)
        expect(expectOngoing).to.be.equal(statistics.data.ongoing)
        expect(expectFailed).to.be.equal(statistics.data.failed)
    }

    /**
     * Asynchronously asserts the size overview based on the expected total, success, ongoing, and failed counts.
     * @param expectTotal The expected total count.
     * @param expectSuccess The expected success count.
     * @param expectOngoing The expected ongoing count.
     * @param expectFailed The expected failed count.
     * @returns A promise that resolves when the assertion is completed.
     */
    async getSizeOverviewAssertion(
        expectTotal: bigint,
        expectSuccess: bigint,
        expectOngoing: bigint,
        expectFailed: bigint
    ): Promise<void> {
        const statistics = await handleEvmError(
            this.contractsManager.StoragesEvm().getSizeOverview()
        )
        expect(expectTotal).to.be.equal(statistics.data.total)
        expect(expectSuccess).to.be.equal(statistics.data.success)
        expect(expectOngoing).to.be.equal(statistics.data.ongoing)
        expect(expectFailed).to.be.equal(statistics.data.failed)
    }

    /**
     * Retrieves the stored cars for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectCarIds - Array of expected car IDs.
     * @returns A Promise indicating the assertion result.
     */
    async getStoredCarsAssertion(
        matchingId: number,
        expectCarIds: number[]
    ): Promise<void> {
        let cars = await handleEvmError(
            this.contractsManager.StoragesEvm().getStoredCars(matchingId)
        )
        expect(equal(expectCarIds, convertToNumberArray(cars.data))).to.be.true
    }

    /**
     * Retrieves the count of stored cars for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectCarCount - Expected count of stored cars.
     * @returns A Promise indicating the assertion result.
     */
    async getStoredCarCountAssertion(
        matchingId: number,
        expectCarCount: number
    ): Promise<void> {
        let carCount = await handleEvmError(
            this.contractsManager.StoragesEvm().getStoredCarCount(matchingId)
        )
        expect(expectCarCount).to.be.equal(Number(carCount.data))
    }

    /**
     * Checks if all stored operations are completed for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectRet - Expected boolean indicating if all storage operations are done.
     * @returns A Promise indicating the assertion result.
     */
    async isAllStoredDoneAssertion(
        matchingId: number,
        expectRet: boolean
    ): Promise<void> {
        let ret = await handleEvmError(
            this.contractsManager.StoragesEvm().isAllStoredDone(matchingId)
        )
        expect(expectRet).to.be.equal(ret.data)
    }

    /**
     * Checks if storage expiration is set for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectRet - Expected boolean indicating if storage expiration is set.
     * @returns A Promise indicating the assertion result.
     */
    async isStorageExpirationAssertion(
        matchingId: number,
        expectRet: boolean
    ): Promise<void> {
        let ret = await handleEvmError(
            this.contractsManager.StoragesEvm().isStorageExpiration(matchingId)
        )
        expect(expectRet).to.be.equal(ret.data)
    }

    /**
     * Checks if the next datacap allocation is valid for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectRet - Expected boolean indicating if the next allocation is valid.
     * @returns A Promise indicating the assertion result.
     */
    async isNextDatacapAllocationValidAssertion(
        matchingId: number,
        expectRet: boolean
    ): Promise<void> {
        let ret = await handleEvmError(
            this.contractsManager
                .StoragesEvm()
                .isNextDatacapAllocationValid(matchingId)
        )
        expect(expectRet).to.be.equal(ret.data)
    }

    /**
     * Submits storage claim IDs for a matching identified by its ID.
     * @param caller - The address of the caller.
     * @param matchingId - The ID of the matching.
     * @param provider - Provider ID.
     * @param ids - Array of car IDs.
     * @param claimIds - Array of claim IDs.
     * @returns A Promise indicating the assertion result.
     */
    async submitStorageClaimIdsAssertion(
        caller: string,
        matchingId: number,
        provider: number,
        ids: number[],
        claimIds: number[]
    ): Promise<void> {
        this.contractsManager.StoragesEvm().getWallet().setDefault(caller)
        const count = await handleEvmError(
            this.contractsManager.StoragesEvm().getStoredCarCount(matchingId)
        )
        const matchingStorageStatistics = await handleEvmError(
            this.contractsManager
                .StoragesEvm()
                .getMatchingStorageOverview(matchingId)
        )

        await handleEvmError(
            this.contractsManager
                .StoragesEvm()
                .submitStorageClaimIds(matchingId, provider, ids, claimIds)
        )

        await Promise.all([
            this.getStoredCarsAssertion(matchingId, ids),
            this.isAllStoredDoneAssertion(matchingId, true),
            this.isStorageExpirationAssertion(matchingId, false),

            this.getStoredCarCountAssertion(
                matchingId,
                Number(count.data) + ids.length
            ),
        ])
    }

    /**
     * Requests datacap allocation for a specific matching identified by its ID.
     * @param caller - The address of the caller.
     * @param matchingId - The ID of the matching.
     * @returns A Promise indicating the assertion result.
     */
    async requestAllocateDatacapAssertion(
        caller: string,
        matchingId: number
    ): Promise<void> {
        //const oldMatchingStorageStatistics = await handleEvmError(
        //    this.contractsManager
        //        .StoragesEvm()
        //        .getMatchingStorageOverview(matchingId)
        //)

        await this.isNextDatacapAllocationValidAssertion(matchingId, true)

        this.contractsManager.StoragesEvm().getWallet().setDefault(caller)

        //TODO:add DatacapChunkCollateral

        const tx = await handleEvmError(
            this.contractsManager
                .StoragesEvm()
                .requestAllocateDatacap(matchingId)
        )
    }
}
