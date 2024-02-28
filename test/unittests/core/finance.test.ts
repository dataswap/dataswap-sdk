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
import { FinanceAssertion } from "../../assertions/core/financeAssertion"
import { getContractsManager, getGenerator } from "../../fixtures"

/**
 * Test suite for the Finance functionality.
 * escrow, claimEscrow Depends on the business environment and puts it into business process testing.
 */
describe("finance", () => {
    let financeAssertion: FinanceAssertion

    /**
     * Setup before running the test suite.
     */
    before(function () {
        this.sharedData = {}
        this.sharedData.generator = getGenerator()
        this.sharedData.contractsManager = getContractsManager()
        let finance = this.sharedData.contractsManager.FinanceEvm()
        financeAssertion = new FinanceAssertion(finance)
    })

    /**
     * Test case for deposit functionality.
     */
    it("deposit", async function () {
        await financeAssertion.depositAssertion(
            1,
            1,
            process.env.DATASWAP_GOVERNANCE as string,
            "0x0000000000000000000000000000000000000000",
            BigInt(100)
        )
    })

    /**
     * Test case for withdraw functionality.
     */
    it("withdraw", async function () {
        await financeAssertion.withdrawAssertion(
            1,
            1,
            process.env.DATASWAP_GOVERNANCE as string,
            "0x0000000000000000000000000000000000000000",
            BigInt(100)
        )
    })
})
