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
import { MatchingTarget } from "../../../src/module/matching/target/types"
import { DataType } from "../../../src/shared/types/dataType"

/**
 * Test suite for the MatchingsTarget contract message decoder functionality.
 */
describe("MatchingsTargetMessageDecoder", () => {
    /**
     * Test suite for the MatchingsTarget decoder functionality.
     */
    describe("#decoder", () => {
        /**
         * Test case for createTarget decode functionality.
         */
        it("createTarget should ok", async function (this: Context) {
            const expectDecodeResout = createExpectMessage({
                method: "createTarget",
                params: {
                    associatedMappingFilesMatchingID: 0,
                    dataType: DataType.MappingFiles,
                    datasetID: 1,
                    matchingId: 2,
                    replicaIndex: BigInt(0),
                },
                returns: "0x",
                datasetId: 1,
                matchingId: 2,
            })
            const message = createTargetMessage({
                params: "WKTyEOArAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
                returns: "QA==",
            })

            const decodedMessage = getContractsManager()
                .MatchingTargetEvm()
                .decodeMessage(message)

            assert.deepStrictEqual(decodedMessage.data, expectDecodeResout.data)

            expect(expectDecodeResout.data!.params).to.deep.include(
                <ValueFields<MatchingTarget>>decodedMessage.data!.params
            )
        })

        /**
         * Test case for publishMatching decode functionality.
         */
        it("publishMatching should ok", async function (this: Context) {
            const expectDecodeResout = createExpectMessage({
                method: "publishMatching",
                params: {
                    cars: ["1"],
                    complete: true,
                    datasetID: 1,
                    matchingId: 2,
                },
                returns: "0x",
                datasetId: 1,
                matchingId: 2,
            })
            const message = createTargetMessage({
                params: "WQEkA4L0HQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ==",
                returns: "QA==",
            })

            const decodedMessage = getContractsManager()
                .MatchingTargetEvm()
                .decodeMessage(message)
            assert.deepStrictEqual(decodedMessage.data, expectDecodeResout.data)

            expect(expectDecodeResout.data!.params).to.deep.include(
                <ValueFields<MatchingTarget>>decodedMessage.data!.params
            )
        })
    })
})
