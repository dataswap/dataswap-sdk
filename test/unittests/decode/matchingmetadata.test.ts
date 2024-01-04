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
import { MatchingMetadata } from "../../../src/module/matching/metadata/types"
import { ValueFields } from "@unipackage/utils"
import { getContractsManager } from "../../fixtures"
dotenv.config()
import { createExpectMessage, createTargetMessage } from "../../shared/utils"
import { BidSelectionRule } from "../../../src/module/matching/metadata/types"

/**
 * Test suite for the Matchings contract message decoder functionality.
 */
describe("MatchingMetadataMessageDecoder", () => {
    /**
     * Test suite for the MatchingMetadata decoder functionality.
     */
    describe("#decoder", () => {
        /**
         * Test case for createMatching decode functionality.
         */
        it("createMatching should ok", async function (this: Context) {
            const expectDecodeResout = createExpectMessage(
                "createMatching",
                {
                    additionalInfo: "none",
                    bidSelectionRule: BidSelectionRule.HighestBid,
                    biddingDelayBlockCount: BigInt(30),
                    biddingPeriodBlockCount: BigInt(20),
                    biddingThreshold: BigInt(1000000000),
                    datasetId: 1,
                    replicaIndex: BigInt(0),
                    storageCompletionPeriodBlocks: BigInt(100000),
                    createdBlockNumber: BigInt(1213438),
                    initiator: "f410fcwzis33wz3sofrlh466gog5xahlthgzqezasapy",
                    matchingId: 1,
                },
                "0x0000000000000000000000000000000000000000000000000000000000000001",
                undefined,
                1
            )
            const message = createTargetMessage(
                "WQFEKzTLxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABhqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO5rKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABG5vbmUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                "WCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ=="
            )

            const decodedMessage = getContractsManager()
                .MatchingMetadataEvm()
                .decodeMessage(message)
            assert.deepStrictEqual(decodedMessage.data, expectDecodeResout.data)

            expect(expectDecodeResout.data!.params).to.deep.include(
                <ValueFields<MatchingMetadata>>decodedMessage.data!.params
            )
        })

        /**
         * Test case for pauseMatching decode functionality.
         */
        it("pauseMatching should ok", async function (this: Context) {
            const expectDecodeResout = createExpectMessage(
                "pauseMatching",
                {
                    matchingId: 2,
                },
                "0x",
                undefined,
                2
            )
            const message = createTargetMessage(
                "WCSSGR5sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI=",
                "QA=="
            )

            const decodedMessage = getContractsManager()
                .MatchingMetadataEvm()
                .decodeMessage(message)
            assert.deepStrictEqual(decodedMessage.data, expectDecodeResout.data)

            expect(expectDecodeResout.data!.params).to.deep.include(
                <ValueFields<MatchingMetadata>>decodedMessage.data!.params
            )
        })

        /**
         * Test case for pauseMatching decode functionality.
         */
        it("resumeMatching should ok", async function (this: Context) {
            const expectDecodeResout = createExpectMessage(
                "resumeMatching",
                {
                    matchingId: 2,
                },
                "0x",
                undefined,
                2
            )
            const message = createTargetMessage(
                "WCQe0lFjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI=",
                "QA=="
            )

            const decodedMessage = getContractsManager()
                .MatchingMetadataEvm()
                .decodeMessage(message)
            assert.deepStrictEqual(decodedMessage.data, expectDecodeResout.data)

            expect(expectDecodeResout.data!.params).to.deep.include(
                <ValueFields<MatchingMetadata>>decodedMessage.data!.params
            )
        })
    })
})
