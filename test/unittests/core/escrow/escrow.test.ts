import { describe } from "mocha"
import { EscrowType } from "../../../../src/shared/types/escrowType"
import { EscrowAssertion } from "../../../assertions/core/escrowAssertion"
import { getContractsManager, getGenerator } from "../../../fixtures"

describe("escrow", () => {
    let escrowAssertion: EscrowAssertion

    before(function () {
        this.sharedData = {}
        this.sharedData.generator = getGenerator()
        this.sharedData.contractsManager = getContractsManager()
        let escrow = this.sharedData.contractsManager.EscrowEvm()
        escrowAssertion = new EscrowAssertion(escrow)
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
        await escrowAssertion.paymentTransferAssertion(EscrowType.TotalDataPrepareFeeByClient, process.env.DATASWAP_GOVERNANCE as string, 1)
    })
})