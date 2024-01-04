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
import { DatacapsEvm } from "../../../src/module/datacaps/repo/evm"

/**
 * Test suite for the Datacaps contract message decoder functionality.
 */
describe("DatacapsContractMessageDecoder", () => {
    let datacaps: DatacapsEvm
    /**
     * Setup before running the test suite.
     */
    before(function () {
        datacaps = getContractsManager().DatacapsEvm()
    })

    /**
     * Test suite for the Datacaps decoder functionality.
     */
    describe("#decoder", () => {
        /**
         * Test case for addDatacapChunkCollateral decode functionality.
         */
        it("addDatacapChunkCollateral Decode", async function () {
            const expectCollateralMessage = createExpectMessage(
                "addDatacapChunkCollateral",
                {
                    matchingId: BigInt(1),
                },
                "0x",
                undefined,
                1
            )
            const addDatacapChunkCollateralMessage = createTargetMessage(
                "WCTgiCkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE=",
                "QA=="
            )

            const contractMessage = datacaps.decodeMessage(
                addDatacapChunkCollateralMessage
            )
            assert.deepStrictEqual(
                contractMessage.data,
                expectCollateralMessage.data
            )

            expect(contractMessage.data?.params).to.deep.include(
                expectCollateralMessage.data?.params
            )
        })

        /**
         * Test case for requestAllocateDatacap decode functionality.
         */
        it("requestAllocateDatacap Decode", async function () {
            const expectPaymentMessage = createExpectMessage(
                "requestAllocateDatacap",
                {
                    matchingId: BigInt(1),
                },
                "0x00000000000000000000000000000000000000000000000000000000078285c5",
                undefined,
                1
            )
            const requestAllocateDatacapMessage = createTargetMessage(
                "WCRtauZ8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE=",
                "WCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4KFxQ=="
            )
            const contractMessage = datacaps.decodeMessage(
                requestAllocateDatacapMessage
            )
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
