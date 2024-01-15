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

import "mocha"
import { Context } from "mocha"
import { expect } from "chai"
import * as dotenv from "dotenv"
import assert from "assert"
import { ValueFields } from "@unipackage/utils"
import { getContractsManager } from "../../fixtures"
dotenv.config()
import { createExpectMessage, createTargetMessage } from "../../shared/utils"
import { MatchingBids } from "../../../src/module/matching/bids/types"

/**
 * Test suite for the MatchingsBids contract message decoder functionality.
 */
describe("MatchingsBidsMessageDecoder", () => {
    /**
     * Test suite for the MatchingsBids decoder functionality.
     */
    describe("#decoder", () => {
        /**
         * Test case for bidding decode functionality.
         */
        it("bidding should ok", async function (this: Context) {
            const expectDecodeResout = createExpectMessage({
                method: "bidding",
                params: {
                    amount: BigInt(1000000010),
                    matchingId: 2,
                    bidder: "f410fcwzis33wz3sofrlh466gog5xahlthgzqezasapy",
                },
                returns: "0x",
                matchingId: 2,
            })
            const message = createTargetMessage({
                params: "WESW/XewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO5rKCg==",
                returns: "QA==",
            })

            const decodedMessage = getContractsManager()
                .MatchingBidsEvm()
                .decodeMessage(message)

            assert.deepStrictEqual(decodedMessage.data, expectDecodeResout.data)

            expect(expectDecodeResout.data!.params).to.deep.include(
                <ValueFields<MatchingBids>>decodedMessage.data!.params
            )
        })

        /**
         * Test case for closeMatching decode functionality.
         */
        it("closeMatching should ok", async function (this: Context) {
            const expectDecodeResout = createExpectMessage({
                method: "closeMatching",
                params: {
                    matchingId: 2,
                },
                returns: "0x",
                matchingId: 2,
            })
            const message = createTargetMessage({
                params: "WCQFBQepAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI=",
                returns: "QA==",
            })

            const decodedMessage = getContractsManager()
                .MatchingBidsEvm()
                .decodeMessage(message)

            assert.deepStrictEqual(decodedMessage.data, expectDecodeResout.data)

            expect(expectDecodeResout.data!.params).to.deep.include(
                <ValueFields<MatchingBids>>decodedMessage.data!.params
            )
        })

        /**
         * Test case for cancelMatching decode functionality.
         */
        it("cancelMatching should ok", async function (this: Context) {
            const expectDecodeResout = createExpectMessage({
                method: "cancelMatching",
                params: {
                    matchingId: 1,
                },
                returns: "0x",
                matchingId: 1,
            })
            const message = createTargetMessage({
                params: "WCQSyWGMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE=",
                returns: "QA==",
            })

            const decodedMessage = getContractsManager()
                .MatchingBidsEvm()
                .decodeMessage(message)

            assert.deepStrictEqual(decodedMessage.data, expectDecodeResout.data)

            expect(expectDecodeResout.data!.params).to.deep.include(
                <ValueFields<MatchingBids>>decodedMessage.data!.params
            )
        })
    })
})
