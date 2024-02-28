/*******************************************************************************
 *   (c) 2023 unipackage
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
import assert from "assert"
import { expect } from "chai"
import { createExpectMessage, createTargetMessage } from "../../shared/utils"
import { getContractsManager } from "../../fixtures"
import { FinanceEvm } from "../../../src/core/finance/repo/evm"

/**
 * Test suite for the Escrow contract message decoder functionality.
 */
describe("FinanceContractMessageDecoder", () => {
    let finance: FinanceEvm
    /**
     * Setup before running the test suite.
     */
    before(function () {
        finance = getContractsManager().FinanceEvm()
    })

    /**
     * Test suite for the Escrow decoder functionality.
     */
    describe("#decoder", () => {
        /**
         * Test case for deposit decode functionality.
         */
        it("deposit Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "deposit",
                params: {
                    datasetId: 1,
                    matchingId: 1,
                    owner: "0x09C6DEE9DB5e7dF2b18283c0CFCf714fEDB692d7",
                    token: "0x0000000000000000000000000000000000000000",
                },
                returns: "0x",
                datasetId: 1,
                matchingId: 1,
            })
            const message = createTargetMessage({
                params: "WIRpYx4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAnG3unbXn3ysYKDwM/PcU/ttpLXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
                returns: "QA==",
            })

            const contractMessage = finance.decodeMessage(message)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })

        /**
         * Test case for withdraw decode functionality.
         */
        it("withdraw Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "withdraw",
                params: {
                    datasetId: 1,
                    matchingId: 1,
                    owner: "0x09C6DEE9DB5e7dF2b18283c0CFCf714fEDB692d7",
                    token: "0x0000000000000000000000000000000000000000",
                    amount: BigInt(100),
                },
                returns: "0x",
                datasetId: 1,
                matchingId: 1,
            })
            const message = createTargetMessage({
                params: "WKR2HhgaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAnG3unbXn3ysYKDwM/PcU/ttpLXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZA==",
                returns: "QA==",
            })
            const contractMessage = finance.decodeMessage(message)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)
            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })
    })
})
