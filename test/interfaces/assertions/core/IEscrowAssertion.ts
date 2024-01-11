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

import { EscrowType } from "../../../../src/shared/types/escrowType"
import { Fund } from "../../../../src/core/escrow/types"

/**
 * Interface for asserting operations on an EscrowEvm instance.
 */
export interface IEscrowAssertion {
    /**
     * Asserts the owner's fund on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @param {Fund} expectFund - The expected fund details.
     * @returns {Promise<void>}
     */
    getOwnerFundAssertion(
        type: EscrowType,
        owner: string,
        id: number,
        expectFund: Fund
    ): Promise<void>

    /**
     * Asserts the list of beneficiaries on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @param {string[]} expectBeneficiaries - The expected list of beneficiaries.
     * @returns {Promise<void>}
     */
    getBeneficiariesListAssertion(
        type: EscrowType,
        owner: string,
        id: number,
        expectBeneficiaries: string[]
    ): Promise<void>

    /**
     * Asserts the beneficiary's fund on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @param {string} beneficiary - The beneficiary to check.
     * @param {Fund} expectFund - The expected fund details.
     * @returns {Promise<void>}
     */
    getBeneficiaryFundAssertion(
        type: EscrowType,
        owner: string,
        id: number,
        beneficiary: string,
        expectFund: Fund
    ): Promise<void>

    /**
     * Asserts the collateral operation on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @param {bigint} amount - The collateral amount.
     * @returns {Promise<void>}
     */
    collateralAssertion(
        type: EscrowType,
        owner: string,
        id: number,
        amount: bigint
    ): Promise<void>

    /**
     * Asserts the collateralRedeem operation on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @returns {Promise<void>}
     */
    collateralRedeemAssertion(
        type: EscrowType,
        owner: string,
        id: number
    ): Promise<void>

    /**
     * Asserts the withdraw operation on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @returns {Promise<void>}
     */
    withdrawAssertion(
        type: EscrowType,
        owner: string,
        id: number
    ): Promise<void>

    /**
     * Asserts the payment operation on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @param {bigint} amount - The payment amount.
     * @returns {Promise<void>}
     */
    paymentAssertion(
        type: EscrowType,
        owner: string,
        id: number,
        amount: bigint
    ): Promise<void>

    /**
     * Asserts the payment to a single beneficiary operation on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @param {string} beneficiary - The beneficiary to receive the payment.
     * @param {bigint} amount - The payment amount.
     * @returns {Promise<void>}
     */
    paymentSingleBeneficiaryAssertion(
        type: EscrowType,
        owner: string,
        id: number,
        beneficiary: string,
        amount: bigint
    ): Promise<void>

    /**
     * Asserts the payment transfer operation on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @returns {Promise<void>}
     */
    paymentTransferAssertion(
        type: EscrowType,
        owner: string,
        id: number
    ): Promise<void>
}
