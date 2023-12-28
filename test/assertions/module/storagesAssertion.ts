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
import * as utils from "../../shared/utils"

export class StoragesAssertion implements IStoragesAssertion {
    private contractsManager: IContractsManager
    constructor(_contractsManager: IContractsManager) {
        this.contractsManager = _contractsManager
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
        expect(equal(expectCarIds, utils.convertToNumberArray(cars.data))).to.be
            .true
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
     * Retrieves the total stored size for a specific matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectSize - Expected total stored size.
     * @returns A Promise indicating the assertion result.
     */
    async getTotalStoredSizeAssertion(
        matchingId: number,
        expectSize: number
    ): Promise<void> {
        let storedSize = await handleEvmError(
            this.contractsManager.StoragesEvm().getTotalStoredSize(matchingId)
        )
        expect(expectSize).to.be.equal(Number(storedSize.data))
    }

    /**
     * Retrieves the stored size of a specific car for a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param id - Car ID.
     * @param expectSize - Expected size of the car.
     * @returns A Promise indicating the assertion result.
     */
    async getStoredCarSizeAssertion(
        matchingId: number,
        id: number,
        expectSize: number
    ): Promise<void> {
        let storedCarSize = await handleEvmError(
            this.contractsManager.StoragesEvm().getStoredCarSize(matchingId, id)
        )
        expect(expectSize).to.be.equal(Number(storedCarSize.data))
    }

    /**
     * Retrieves the lock payment for the provider in a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectLockPayment - Expected lock payment for the provider.
     * @returns A Promise indicating the assertion result.
     */
    async getProviderLockPaymentAssertion(
        matchingId: number,
        expectLockPayment: bigint
    ): Promise<void> {
        let lockPayment = await handleEvmError(
            this.contractsManager
                .StoragesEvm()
                .getProviderLockPayment(matchingId)
        )
        expect(expectLockPayment).to.be.equal(BigInt(lockPayment.data))
    }

    /**
     * Retrieves the lock payment for the client in a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param expectLockPayment - Expected lock payment for the client.
     * @returns A Promise indicating the assertion result.
     */
    async getClientLockPaymentAssertion(
        matchingId: number,
        expectLockPayment: bigint
    ): Promise<void> {
        let lockPayment = await handleEvmError(
            this.contractsManager.StoragesEvm().getClientLockPayment(matchingId)
        )
        expect(expectLockPayment).to.be.equal(BigInt(lockPayment.data))
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
        const totalSize = await handleEvmError(
            this.contractsManager.StoragesEvm().getTotalStoredSize(matchingId)
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

            // All cars have been stored and the locked amount will be 0.
            this.getProviderLockPaymentAssertion(matchingId, BigInt(0)),
            this.getClientLockPaymentAssertion(matchingId, BigInt(0)),

            this.getStoredCarCountAssertion(
                matchingId,
                Number(count.data) + ids.length
            ),
        ])

        const size = await handleEvmError(
            this.contractsManager
                .StoragesEvm()
                .getStoredCarSize(matchingId, ids[1])
        )
        await this.getStoredCarSizeAssertion(matchingId, 1, size.data)

        let inputCarsTotalSize = 0
        for (let i = 0; i < ids.length; i++) {
            const carSize = await handleEvmError(
                this.contractsManager
                    .StoragesEvm()
                    .getStoredCarSize(matchingId, ids[i])
            )
            inputCarsTotalSize += carSize.data
        }

        await this.getTotalStoredSizeAssertion(
            matchingId,
            Number(totalSize.data) + inputCarsTotalSize
        )
    }
}
