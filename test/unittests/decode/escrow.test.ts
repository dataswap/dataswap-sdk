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
import { DatasetMetadata } from "../../../src/module/dataset/metadata/types"
import { ValueFields } from "@unipackage/utils"
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
            const expectCollateralMessage = createExpectMessage(
                "collateral",
                {
                    type: BigInt(0),
                    owner: "0x09C6DEE9DB5e7dF2b18283c0CFCf714fEDB692d7",
                    id: BigInt(1),
                    amount: BigInt(100),
                },
                "0x",
                1
            )
            const collateralMessage = createTargetMessage(
                "WITON73nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJxt7p21598rGCg8DPz3FP7baS1wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQ",
                "QA=="
            )

            const contractMessage = escrow.decodeMessage(collateralMessage)
            assert.deepStrictEqual(
                contractMessage.data,
                expectCollateralMessage.data
            )

            expect(contractMessage.data?.params).to.deep.include(
                <ValueFields<DatasetMetadata>>contractMessage.data?.params
            )
        })

        /**
         * Test case for payment decode functionality.
         */
        it("payment Decode", async function () {
            const expectPaymentMessage = createExpectMessage(
                "payment",
                {
                    type: BigInt(4),
                    owner: "0x09C6DEE9DB5e7dF2b18283c0CFCf714fEDB692d7",
                    id: BigInt(1),
                    amount: BigInt(100),
                },
                "0x",
                1
            )
            const paymentMessage = createTargetMessage(
                "WITqEsdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAJxt7p21598rGCg8DPz3FP7baS1wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQ",
                "QA=="
            )
            const contractMessage = escrow.decodeMessage(paymentMessage)
            assert.deepStrictEqual(
                contractMessage.data,
                expectPaymentMessage.data
            )
            expect(contractMessage.data?.params).to.deep.include(
                <ValueFields<DatasetMetadata>>contractMessage.data?.params
            )
        })

        /**
         * Test case for payment sigle beneficiary decode functionality.
         */
        it("paymentSingleBeneficiary Decode", async function () {
            const expectPaymentMessage = createExpectMessage(
                "paymentSingleBeneficiary",
                {
                    type: BigInt(4),
                    owner: "0xca942f0fd39185d971d1d58E151645e596FC7Eff",
                    id: BigInt(1),
                    beneficiary: "0x09C6DEE9DB5e7dF2b18283c0CFCf714fEDB692d7",
                    amount: BigInt(100),
                },
                "0x",
                1
            )
            const paymentMessage = createTargetMessage(
                "WKRy588YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAADKlC8P05GF2XHR1Y4VFkXllvx+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAACcbe6dteffKxgoPAz89xT+22ktcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZA==",
                "QA=="
            )
            const contractMessage = escrow.decodeMessage(paymentMessage)
            assert.deepStrictEqual(
                contractMessage.data,
                expectPaymentMessage.data
            )
            expect(contractMessage.data?.params).to.deep.include(
                <ValueFields<DatasetMetadata>>contractMessage.data?.params
            )
        })

        /**
         * Test case for payment transfer decode functionality.
         */
        it("paymentTransfer Decode", async function () {
            const expectPaymentMessage = createExpectMessage(
                "paymentTransfer",
                {
                    type: BigInt(5),
                    owner: "0x09C6DEE9DB5e7dF2b18283c0CFCf714fEDB692d7",
                    id: BigInt(1),
                    amount: BigInt(100),
                },
                "0x",
                1
            )
            const paymentMessage = createTargetMessage(
                "WIS6ZVXsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAJxt7p21598rGCg8DPz3FP7baS1wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQ=",
                "QA=="
            )
            const contractMessage = escrow.decodeMessage(paymentMessage)
            assert.deepStrictEqual(
                contractMessage.data,
                expectPaymentMessage.data
            )
            expect(contractMessage.data?.params).to.deep.include(
                <ValueFields<DatasetMetadata>>contractMessage.data?.params
            )
        })
    })
})
