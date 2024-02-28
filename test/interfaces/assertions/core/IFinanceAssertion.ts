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

import { EscrowType } from "../../../../src/shared/types/financeType"
import {
    AccountOverview,
    AccountIncome,
    AccountEscrow,
} from "../../../../src/core/finance/types"

/**
 * Interface for asserting operations on an FinanceEvm instance.
 */
export interface IFinanceAssertion {
    /**
     * Asserts the account overview matches the expected values.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for the account overview (e.g., FIL, ERC-20).
     * @param expectAccountOverview The expected account overview.
     * @returns A Promise resolving to void.
     */
    getAccountOverviewAssertion(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        expectAccountOverview: AccountOverview
    ): Promise<void>

    /**
     * Asserts the account income matches the expected values.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for trading income details (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @param expectAccountIncome The expected account income.
     * @returns A Promise resolving to void.
     */
    getAccountIncomeAssertion(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        type: EscrowType,
        expectAccountIncome: AccountIncome
    ): Promise<void>

    /**
     * Asserts the account escrow details match the expected values.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for the escrowed amount (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @param expectAccountEscrow The expected account escrow details.
     * @returns A Promise resolving to void.
     */
    getAccountEscrowAssertion(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        type: EscrowType,
        expectAccountEscrow: AccountEscrow
    ): Promise<void>

    /**
     * Asserts the escrow requirement matches the expected amount.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for the escrow requirement (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @param expectAmount The expected escrow requirement amount as a bigint.
     * @returns A Promise resolving to void.
     */
    getEscrowRequirementAssertion(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        type: EscrowType,
        expectAmount: bigint
    ): Promise<void>

    /**
     * Asserts whether the escrowed funds are enough based on the expected value.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for escrow handling (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @param expectValue The expected boolean value indicating if escrowed funds are enough.
     * @returns A Promise resolving to void.
     */
    isEscrowEnoughAssertion(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        type: EscrowType,
        expectValue: boolean
    ): Promise<void>

    /**
     * Asserts the deposit operation.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for the deposit (e.g., FIL, ERC-20).
     * @param amount The deposit amount.
     * @returns A Promise resolving to void.
     */
    depositAssertion(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        amount: bigint
    ): Promise<void>

    /**
     * Asserts the withdraw operation.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for withdrawal (e.g., FIL, ERC-20).
     * @param amount The amount to be withdrawn as a bigint.
     * @returns A Promise resolving to void.
     */
    withdrawAssertion(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        amount: bigint
    ): Promise<void>

    /**
     * Asserts the escrow operation.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param token The type of token for escrow (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @returns A Promise resolving to void.
     */
    escrowAssertion(
        datasetId: number,
        matchingId: number,
        token: string,
        type: EscrowType
    ): Promise<void>

    /**
     * Asserts the claim escrow operation.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param token The type of token for escrow handling (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @returns A Promise resolving to void.
     */
    claimEscrowAssertion(
        datasetId: number,
        matchingId: number,
        token: string,
        type: EscrowType
    ): Promise<void>
}
