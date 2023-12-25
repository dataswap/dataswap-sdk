import { describe } from "mocha"

import * as utils from "../../../shared/utils"
import { Accounts } from "../../../testkits/setup/accounts"
import { EscrowType } from "../../../../src/shared/types/escrowType"
import { EscrowAssertion } from "../../../assertions/core/escrowAssertion"
import { getAccounts, getContractsManager, getGenerator } from "../../../fixtures"
describe("escrow", () => {
    let escrowAssertion: EscrowAssertion

    before(function () {
        this.sharedData = {}
        this.sharedData.generator = getGenerator()
        this.sharedData.accounts = getAccounts()
        this.sharedData.contractsManager = getContractsManager()
        let escrow = this.sharedData.contractsManager.EscrowEvm()
        escrowAssertion = new EscrowAssertion(escrow, this.sharedData.accounts)
    })

    it("collateral", async function () {
        await escrowAssertion.collateralAssertion(EscrowType.DatacapCollateral, await this.sharedData.generator.generatorAddress(), 1, BigInt(100))
    })

    it("payment", async function () {
        await escrowAssertion.paymentAssertion(EscrowType.DatasetAuditFee, await this.sharedData.generator.generatorAddress(), 1, BigInt(100))
    })

    //it("paymentSingleBeneficiary", async function () {
    //    await escrowAssertion.paymentSingleBeneficiaryAssertion(EscrowType.DatasetAuditFee, await this.sharedData.generator.generatorAddress(), 1, await this.sharedData.generator.generatorAddress(), BigInt(100))
    //})

    it("paymentTransfer", async function () {
        let [governance,] = this.sharedData.accounts.getGovernance()
        await escrowAssertion.paymentTransferAssertion(EscrowType.TotalDataPrepareFeeByClient, governance, 1)
    })
})