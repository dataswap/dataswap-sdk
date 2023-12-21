import { describe } from "mocha"

import * as utils from "../../shared/utils"
import { Accounts } from "../../shared/accounts"
import { Generator } from "../../shared/generator"
import { EscrowEvm } from "../../../src/core/escrow/repo/evm"
import { EscrowType } from "../../../src/shared/types/escrowType"
import { EscrowAssertion } from "../../assertions/escrowAssertion"
import EscrowAbi from "@dataswapcore/contracts/abi/v0.8/Escrow.json"

describe("escrow", () => {
    let escrowAssertion: EscrowAssertion
    let generator = new Generator

    before(function () {
        let escrow = new EscrowEvm(EscrowAbi, utils.getEnvVariable("EscrowAddress")!, utils.getEnvVariable("NETWORK_RPC_URL")!)
        escrowAssertion = new EscrowAssertion(escrow)
    })

    it("collateral", async function () {
        await escrowAssertion.collateralAssertion(EscrowType.DatacapCollateral, await generator.generatorAddress(), 1, BigInt(100))
    })

    it("payment", async function () {
        await escrowAssertion.paymentAssertion(EscrowType.DatasetAuditFee, await generator.generatorAddress(), 1, BigInt(100))
    })

    it("paymentSingleBeneficiary", async function () {
        await escrowAssertion.paymentSingleBeneficiaryAssertion(EscrowType.DatasetAuditFee, await generator.generatorAddress(), 1, await generator.generatorAddress(), BigInt(100))
    })

    it("paymentTransfer", async function () {
        let [governance,] = Accounts.Instance().getGovernance()
        await escrowAssertion.paymentTransferAssertion(EscrowType.TotalDataPrepareFeeByClient, governance, 1)
    })
})