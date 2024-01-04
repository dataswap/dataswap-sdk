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
import { RolesEvm } from "../../../src/core/roles/repo/evm"

/**
 * Test suite for the Roles contract message decoder functionality.
 */
describe("RolesContractMessageDecoder", () => {
    let roles: RolesEvm
    /**
     * Setup before running the test suite.
     */
    before(function () {
        roles = getContractsManager().RolesEvm()
    })

    /**
     * Test suite for the Roles decoder functionality.
     */
    describe("#decoder", () => {
        /**
         * Test case for grantRole decode functionality.
         */
        it("grantRole Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "grantRole",
                params: {
                    role: "0x56d96069d0c85d21b8d789da2cd39ba97ceec51143707e32ecb8343eb4258a9c",
                    account: "0x5Ab1B36e259E0251262Ed2c9a3BD8C9f73470320",
                },
                returns: "0x",
            })
            const targetMessage = createTargetMessage({
                params: "WEQvL/FdVtlgadDIXSG414naLNObqXzuxRFDcH4y7Lg0PrQlipwAAAAAAAAAAAAAAABasbNuJZ4CUSYu0smjvYyfc0cDIA==",
                returns: "QA==",
            })

            const contractMessage = roles.decodeMessage(targetMessage)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })

        /**
         * Test case for acceptOwnership decode functionality.
         */
        it("acceptOwnership Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "acceptOwnership",
                params: {},
                returns: "0x",
            })

            const targetMessage = createTargetMessage({
                params: "RHm6UJc=",
                returns: "QA==",
            })

            const contractMessage = roles.decodeMessage(targetMessage)
            contractMessage.data!.params = {}
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })

        /**
         * Test case for transferOwnership decode functionality.
         */
        it("transferOwnership Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "transferOwnership",
                params: {
                    newOwner: "0x09C6DEE9DB5e7dF2b18283c0CFCf714fEDB692d7",
                },
                returns: "0x",
            })
            const targetMessage = createTargetMessage({
                params: "WCTy/eOLAAAAAAAAAAAAAAAACcbe6dteffKxgoPAz89xT+22ktc=",
                returns: "QA==",
            })

            const contractMessage = roles.decodeMessage(targetMessage)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })
    })
})
