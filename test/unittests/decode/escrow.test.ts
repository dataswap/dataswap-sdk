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
import { EscrowEvm } from "../../../src/core/escrow/repo/evm"

/**
 * Test suite for the Escrow contract message decoder functionality.
 */
describe("EscrowContractMessageDecoder", () => {
    let escrow: EscrowEvm
    /**
     * Setup before running the test suite.
     */
    before(function () {
        escrow = getContractsManager().EscrowEvm()
    })

    /**
     * Test suite for the Escrow decoder functionality.
     */
    describe("#decoder", () => {
        /**
         * Test case for collateral decode functionality.
         */
        it("collateral Decode", async function () {
            const expectCollateralMessage = createExpectMessage({
                method: "collateral",
                params: {
                    type: BigInt(0),
                    owner: "0x09C6DEE9DB5e7dF2b18283c0CFCf714fEDB692d7",
                    datasetId: 1,
                    amount: BigInt(100),
                },
                returns: "0x",
                datasetId: 1,
                value: "100",
            })
            const collateralMessage = createTargetMessage({
                params: "WITON73nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJxt7p21598rGCg8DPz3FP7baS1wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQ",
                returns: "QA==",
            })
            collateralMessage.Msg.Value = "100"

            const contractMessage = escrow.decodeMessage(collateralMessage)
            assert.deepStrictEqual(
                contractMessage.data,
                expectCollateralMessage.data
            )

            expect(contractMessage.data?.params).to.deep.include(
                expectCollateralMessage.data?.params
            )
        })

        /**
         * Test case for payment decode functionality.
         */
        it("payment Decode", async function () {
            const expectPaymentMessage = createExpectMessage({
                method: "payment",
                params: {
                    type: BigInt(4),
                    owner: "0x09C6DEE9DB5e7dF2b18283c0CFCf714fEDB692d7",
                    datasetId: 1,
                    amount: BigInt(100),
                },
                returns: "0x",
                datasetId: 1,
                value: "100",
            })
            const paymentMessage = createTargetMessage({
                params: "WITqEsdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAJxt7p21598rGCg8DPz3FP7baS1wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQ",
                returns: "QA==",
            })
            paymentMessage.Msg.Value = "100"
            const contractMessage = escrow.decodeMessage(paymentMessage)
            assert.deepStrictEqual(
                contractMessage.data,
                expectPaymentMessage.data
            )
            expect(contractMessage.data?.params).to.deep.include(
                expectPaymentMessage.data?.params
            )
        })

        /**
         * Test case for payment sigle beneficiary decode functionality.
         */
        it("paymentSingleBeneficiary Decode", async function () {
            const expectPaymentMessage = createExpectMessage({
                method: "paymentSingleBeneficiary",
                params: {
                    type: BigInt(4),
                    owner: "0xca942f0fd39185d971d1d58E151645e596FC7Eff",
                    datasetId: 1,
                    beneficiary: "0x09C6DEE9DB5e7dF2b18283c0CFCf714fEDB692d7",
                    amount: BigInt(100),
                },
                returns: "0x",
                datasetId: 1,
                value: "100",
            })
            const paymentMessage = createTargetMessage({
                params: "WKRy588YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAADKlC8P05GF2XHR1Y4VFkXllvx+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAACcbe6dteffKxgoPAz89xT+22ktcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZA==",
                returns: "QA==",
            })
            paymentMessage.Msg.Value = "100"
            const contractMessage = escrow.decodeMessage(paymentMessage)
            assert.deepStrictEqual(
                contractMessage.data,
                expectPaymentMessage.data
            )
            expect(contractMessage.data?.params).to.deep.include(
                expectPaymentMessage.data?.params
            )
        })

        /**
         * Test case for payment transfer decode functionality.
         */
        it("paymentTransfer Decode", async function () {
            const expectPaymentMessage = createExpectMessage({
                method: "paymentTransfer",
                params: {
                    type: BigInt(5),
                    owner: "0x09C6DEE9DB5e7dF2b18283c0CFCf714fEDB692d7",
                    datasetId: 1,
                    amount: BigInt(100),
                },
                returns: "0x",
                datasetId: 1,
            })
            const paymentMessage = createTargetMessage({
                params: "WIS6ZVXsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAJxt7p21598rGCg8DPz3FP7baS1wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQ=",
                returns: "QA==",
            })
            const contractMessage = escrow.decodeMessage(paymentMessage)
            assert.deepStrictEqual(
                contractMessage.data,
                expectPaymentMessage.data
            )
            expect(contractMessage.data?.params).to.deep.include(
                expectPaymentMessage.data?.params
            )
        })
    })
})
