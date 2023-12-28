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

import { describe } from "mocha"
import { EscrowType } from "../../../src/shared/types/escrowType"
import { EscrowAssertion } from "../../assertions/core/escrowAssertion"
import { getContractsManager, getGenerator } from "../../fixtures"

/**
 * Test suite for the Escrow functionality.
 */
describe("escrow", () => {
    let escrowAssertion: EscrowAssertion

    /**
     * Setup before running the test suite.
     */
    before(function () {
        this.sharedData = {}
        this.sharedData.generator = getGenerator()
        this.sharedData.contractsManager = getContractsManager()
        let escrow = this.sharedData.contractsManager.EscrowEvm()
        escrowAssertion = new EscrowAssertion(escrow)
    })

    /**
     * Test case for collateral functionality.
     */
    it("collateral", async function () {
        await escrowAssertion.collateralAssertion(
            EscrowType.DatacapCollateral,
            await this.sharedData.generator.generatorAddress(),
            1,
            BigInt(100)
        )
    })

    /**
     * Test case for payment functionality.
     */
    it("payment", async function () {
        await escrowAssertion.paymentAssertion(
            EscrowType.DatasetAuditFee,
            await this.sharedData.generator.generatorAddress(),
            1,
            BigInt(100)
        )
    })

    /**
     * Test case for payment with a single beneficiary.
     */
    it("paymentSingleBeneficiary", async function () {
        await escrowAssertion.paymentSingleBeneficiaryAssertion(
            EscrowType.DatasetAuditFee,
            await this.sharedData.generator.generatorAddress(),
            1,
            await this.sharedData.generator.generatorAddress(),
            BigInt(100)
        )
    })

    /**
     * Test case for payment transfer functionality.
     */
    it("paymentTransfer", async function () {
        await escrowAssertion.paymentTransferAssertion(
            EscrowType.TotalDataPrepareFeeByClient,
            process.env.DATASWAP_GOVERNANCE as string,
            1
        )
    })
})
