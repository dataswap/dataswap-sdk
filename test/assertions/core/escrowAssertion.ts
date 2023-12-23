import { assert } from "chai"
import { isEqual } from 'lodash';
import { equal } from "@unipackage/utils"
import { EscrowType } from "../../../src/shared/types/escrowType"
import { EscrowEvm } from "../../../src/core/escrow/repo/evm"
import { Fund } from "../../../src/core/escrow/types"
import { handleEvmError } from "../../shared/error"
import { Accounts } from "../../testkits/setup/accounts"
import { IAccounts } from "../../interfaces/setup/IAccounts"


export class EscrowAssertion {
    private escrow: EscrowEvm
    private accounts: IAccounts

    constructor(escrow: EscrowEvm, accounts: IAccounts) {
        this.escrow = escrow
        this.accounts = accounts
    }

    async getOwnerFundAssertion(type: EscrowType, owner: string, id: number, expectFund: Fund) {
        let fund = await handleEvmError(this.escrow.getOwnerFund(type, owner, id))
        expectFund.createdBlockNumber = fund.data.createdBlockNumber // skip createdBlockNumber
        assert.isTrue(equal(expectFund, fund.data), "Owner fund should be expect fund")
    }

    async getBeneficiariesListAssertion(type: EscrowType, owner: string, id: number, expectBeneficiaries: string[]) {
        let beneficiaries = await handleEvmError(this.escrow.getBeneficiariesList(type, owner, id))
        assert.isTrue(equal(beneficiaries.data.slice().sort(), expectBeneficiaries.slice().sort()), "Beneficiaries List should be expect beneficiaries list")
    }

    async getBeneficiaryFundAssertion(type: EscrowType, owner: string, id: number, beneficiary: string, expectFund: Fund) {
        let fund = await handleEvmError(this.escrow.getBeneficiaryFund(type, owner, id, beneficiary))
        expectFund.createdBlockNumber = fund.data.createdBlockNumber // skip createdBlockNumber 
        assert.isTrue(equal(expectFund, fund.data), "Beneficiary fund should be expect fund")
    }

    async collateralAssertion(type: EscrowType, owner: string, id: number, amount: bigint) {
        let expectFund = new Fund()
        let fund = await handleEvmError(this.escrow.getOwnerFund(type, owner, id))
        expectFund.total += fund.data.total
        expectFund.collateraled += fund.data.collateraled

        let [governance, governanceKey] = this.accounts.getGovernance()

        await handleEvmError(this.escrow.collateral(type, owner, id, amount, {
            from: governance,
            privateKey: governanceKey,
            value: amount
        }))

        expectFund.total += amount
        expectFund.collateraled += amount
        await this.getOwnerFundAssertion(type, owner, id, expectFund)
    }

    async paymentAssertion(type: EscrowType, owner: string, id: number, amount: bigint) {
        let expectFund = new Fund()
        let fund = await handleEvmError(this.escrow.getOwnerFund(type, owner, id))
        expectFund.total += fund.data.total
        expectFund.locked += fund.data.locked

        let [governance, governanceKey] = this.accounts.getGovernance()
        await handleEvmError(this.escrow.payment(type, owner, id, amount, {
            from: governance,
            privateKey: governanceKey,
            value: amount
        }))

        expectFund.total += amount
        expectFund.locked += amount
        await this.getOwnerFundAssertion(type, owner, id, expectFund)
    }

    async paymentSingleBeneficiaryAssertion(type: EscrowType, owner: string, id: number, beneficiary: string, amount: bigint) {
        let expectFund = new Fund()
        let expectBeneficiaryFund = new Fund()

        let fund = await handleEvmError(this.escrow.getOwnerFund(type, owner, id))
        expectFund.total += fund.data.total
        expectFund.locked += fund.data.locked

        let beneficiaryFund = await handleEvmError(this.escrow.getBeneficiaryFund(type, owner, id, beneficiary))
        expectBeneficiaryFund.total += beneficiaryFund.data.total
        expectBeneficiaryFund.locked += beneficiaryFund.data.locked


        let [governance, governanceKey] = this.accounts.getGovernance()
        await handleEvmError(this.escrow.paymentSingleBeneficiary(type, owner, id, beneficiary, amount, {
            from: governance,
            privateKey: governanceKey,
            value: amount
        }))
        expectFund.total += amount
        expectFund.locked += amount
        expectBeneficiaryFund.total += amount
        expectBeneficiaryFund.locked += amount

        // For test getBeneficiariesList multiple beneficiaries
        await handleEvmError(this.escrow.paymentSingleBeneficiary(type, owner, id, governance, amount, {
            from: governance,
            privateKey: governanceKey,
            value: amount
        }))
        expectFund.total += amount
        expectFund.locked += amount

        await Promise.all(
            [
                this.getOwnerFundAssertion(type, owner, id, expectFund),
                this.getBeneficiaryFundAssertion(type, owner, id, beneficiary, expectBeneficiaryFund),
                this.getBeneficiariesListAssertion(type, owner, id, [governance, beneficiary])
            ]
        )
    }

    async paymentTransferAssertion(type: EscrowType, owner: string, id: number) {
        let amount: bigint = BigInt(100)

        await this.paymentAssertion(type, owner, id, amount)
        let [governance, governanceKey] = this.accounts.getGovernance()

        let fund = await handleEvmError(this.escrow.getOwnerFund(type, owner, id))
        fund.data.locked -= amount

        await handleEvmError(this.escrow.paymentTransfer(type, owner, id, amount, {
            from: governance,
            privateKey: governanceKey
        }))

        await this.getOwnerFundAssertion(type, owner, id, fund.data)
    }

    // TODO: The following interfaces require a test environment
    async withdrawAssertion() { }
    async paymentRefundAssertion() { }
    async paymentWithdrawAssertion() { }
    async collateralRedeemAssertion() { }
}