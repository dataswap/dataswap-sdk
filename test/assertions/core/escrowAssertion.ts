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

import { assert } from "chai"
import { equal } from "@unipackage/utils"
import { EscrowType } from "../../../src/shared/types/escrowType"
import { EscrowEvm } from "../../../src/core/escrow/repo/evm"
import { Fund } from "../../../src/core/escrow/types"
import { handleEvmError } from "../../shared/error"
import { IEscrowAssertion } from "../../interfaces/assertions/core/IEscrowAssertion"

/**
 * Class representing assertions for an EscrowEvm instance.
 * @implements {IEscrowAssertion}
 */
export class EscrowAssertion implements IEscrowAssertion {
    private escrow: EscrowEvm

    /**
     * Creates an instance of EscrowAssertion.
     * @param {EscrowEvm} escrow - The EscrowEvm instance to perform assertions on.
     */
    constructor(escrow: EscrowEvm) {
        this.escrow = escrow
    }

    /**
     * Asserts the owner's fund on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @param {Fund} expectFund - The expected fund details.
     * @returns {Promise<void>}
     */
    async getOwnerFundAssertion(type: EscrowType, owner: string, id: number, expectFund: Fund) {
        let fund = await handleEvmError(this.escrow.getOwnerFund(type, owner, id))
        expectFund.createdBlockNumber = fund.data.createdBlockNumber // skip createdBlockNumber
        assert.isTrue(equal(expectFund, fund.data), "Owner fund should be expect fund")
    }

    /**
     * Asserts the list of beneficiaries on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @param {string[]} expectBeneficiaries - The expected list of beneficiaries.
     * @returns {Promise<void>}
     */
    async getBeneficiariesListAssertion(type: EscrowType, owner: string, id: number, expectBeneficiaries: string[]) {
        let beneficiaries = await handleEvmError(this.escrow.getBeneficiariesList(type, owner, id))
        assert.isTrue(equal(beneficiaries.data.slice().sort(), expectBeneficiaries.slice().sort()), "Beneficiaries List should be expect beneficiaries list")
    }

    /**
     * Asserts the beneficiary's fund on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @param {string} beneficiary - The beneficiary to check.
     * @param {Fund} expectFund - The expected fund details.
     * @returns {Promise<void>}
     */
    async getBeneficiaryFundAssertion(type: EscrowType, owner: string, id: number, beneficiary: string, expectFund: Fund) {
        let fund = await handleEvmError(this.escrow.getBeneficiaryFund(type, owner, id, beneficiary))
        expectFund.createdBlockNumber = fund.data.createdBlockNumber // skip createdBlockNumber 
        assert.isTrue(equal(expectFund, fund.data), "Beneficiary fund should be expect fund")
    }

    /**
     * Asserts the collateral operation on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @param {bigint} amount - The collateral amount.
     * @returns {Promise<void>}
     */
    async collateralAssertion(type: EscrowType, owner: string, id: number, amount: bigint) {
        let expectFund = new Fund()
        let fund = await handleEvmError(this.escrow.getOwnerFund(type, owner, id))
        expectFund.total += fund.data.total
        expectFund.collateraled += fund.data.collateraled


        this.escrow.getWallet().setDefault(process.env.DATASWAP_GOVERNANCE as string)
        await handleEvmError(this.escrow.collateral(type, owner, id, amount, {
            value: amount
        }))

        expectFund.total += amount
        expectFund.collateraled += amount
        await this.getOwnerFundAssertion(type, owner, id, expectFund)
    }

    /**
     * Asserts the payment operation on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @param {bigint} amount - The payment amount.
     * @returns {Promise<void>}
     */
    async paymentAssertion(type: EscrowType, owner: string, id: number, amount: bigint) {
        let expectFund = new Fund()
        let fund = await handleEvmError(this.escrow.getOwnerFund(type, owner, id))
        expectFund.total += fund.data.total
        expectFund.locked += fund.data.locked

        this.escrow.getWallet().setDefault(process.env.DATASWAP_GOVERNANCE as string)
        await handleEvmError(this.escrow.payment(type, owner, id, amount, {
            value: amount
        }))

        expectFund.total += amount
        expectFund.locked += amount
        await this.getOwnerFundAssertion(type, owner, id, expectFund)
    }

    /**
     * Asserts the payment to a single beneficiary operation on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @param {string} beneficiary - The beneficiary to receive the payment.
     * @param {bigint} amount - The payment amount.
     * @returns {Promise<void>}
     */
    async paymentSingleBeneficiaryAssertion(type: EscrowType, owner: string, id: number, beneficiary: string, amount: bigint) {
        let expectFund = new Fund()
        let expectBeneficiaryFund = new Fund()

        let fund = await handleEvmError(this.escrow.getOwnerFund(type, owner, id))
        expectFund.total += fund.data.total
        expectFund.locked += fund.data.locked

        let beneficiaryFund = await handleEvmError(this.escrow.getBeneficiaryFund(type, owner, id, beneficiary))
        expectBeneficiaryFund.total += beneficiaryFund.data.total
        expectBeneficiaryFund.locked += beneficiaryFund.data.locked


        this.escrow.getWallet().setDefault(process.env.DATASWAP_GOVERNANCE as string)
        await handleEvmError(this.escrow.paymentSingleBeneficiary(type, owner, id, beneficiary, amount, {
            value: amount
        }))
        expectFund.total += amount
        expectFund.locked += amount
        expectBeneficiaryFund.total += amount
        expectBeneficiaryFund.locked += amount

        // For test getBeneficiariesList multiple beneficiaries
        await handleEvmError(this.escrow.paymentSingleBeneficiary(type, owner, id, process.env.DATASWAP_GOVERNANCE as string, amount, {
            value: amount
        }))
        expectFund.total += amount
        expectFund.locked += amount

        await Promise.all(
            [
                this.getOwnerFundAssertion(type, owner, id, expectFund),
                this.getBeneficiaryFundAssertion(type, owner, id, beneficiary, expectBeneficiaryFund),
                this.getBeneficiariesListAssertion(type, owner, id, [process.env.DATASWAP_GOVERNANCE as string, beneficiary])
            ]
        )
    }

    /**
     * Asserts the payment transfer operation on the escrow.
     * @param {EscrowType} type - The type of the escrow.
     * @param {string} owner - The owner of the escrow.
     * @param {number} id - The ID of the escrow.
     * @returns {Promise<void>}
     */
    async paymentTransferAssertion(type: EscrowType, owner: string, id: number) {
        let amount: bigint = BigInt(100)

        await this.paymentAssertion(type, owner, id, amount)

        let fund = await handleEvmError(this.escrow.getOwnerFund(type, owner, id))
        fund.data.locked -= amount
        this.escrow.getWallet().setDefault(process.env.DATASWAP_GOVERNANCE as string)
        await handleEvmError(this.escrow.paymentTransfer(type, owner, id, amount))

        await this.getOwnerFundAssertion(type, owner, id, fund.data)
    }
}