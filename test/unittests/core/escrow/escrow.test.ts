import { describe } from "mocha"

import * as utils from "../../../shared/utils"
import { Accounts } from "../../../shared/accounts"
import { Generator } from "../../../shared/generator"
import { EscrowEvm } from "../../../../src/core/escrow/repo/evm"
import { EscrowType } from "../../../../src/shared/types/escrowType"
import { EscrowAssertion } from "../../../assertions/escrowAssertion"
import EscrowAbi from "@dataswapcore/contracts/abi/v0.8/Escrow.json"
import { ContractsManager } from "../../../shared/contractsManager"

describe("escrow", () => {
    let escrowAssertion: EscrowAssertion

    before(function () {
        this.sharedData = {}
        this.sharedData.generator = new Generator()
        this.sharedData.accounts = new Accounts()
        this.sharedData.contractsManager = new ContractsManager(this.sharedData.accounts)
        let escrow = this.sharedData.contractsManager.EscrowEvm()
        escrowAssertion = new EscrowAssertion(escrow, this.sharedData.accounts)
    })

    it("collateral", async function () {
        await escrowAssertion.collateralAssertion(EscrowType.DatacapCollateral, await this.sharedData.generator.generatorAddress(), 1, BigInt(100))
    })

    it("payment", async function () {
        await escrowAssertion.paymentAssertion(EscrowType.DatasetAuditFee, await this.sharedData.generator.generatorAddress(), 1, BigInt(100))
    })

    it("paymentSingleBeneficiary", async function () {
        await escrowAssertion.paymentSingleBeneficiaryAssertion(EscrowType.DatasetAuditFee, await this.sharedData.generator.generatorAddress(), 1, await this.sharedData.generator.generatorAddress(), BigInt(100))
    })

    it("paymentTransfer", async function () {
        let [governance,] = this.sharedData.accounts.getGovernance()
        await escrowAssertion.paymentTransferAssertion(EscrowType.TotalDataPrepareFeeByClient, governance, 1)
    })
})