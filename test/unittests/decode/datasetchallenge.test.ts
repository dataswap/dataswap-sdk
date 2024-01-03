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
import { DatasetChallenge } from "../../../src/module/dataset/challenge/types"

/**
 * Test suite for the DatasetChallenge contract message decoder functionality.
 */
describe("DatasetChallengeMessageDecoder", () => {
    /**
     * Test suite for the DatasetChallenge decoder functionality.
     */
    describe("#decoder", () => {
        /**
         * Test case for submitDatasetChallengeProofs decode functionality.
         */
        it("submitDatasetChallengeProofs should ok", async function (this: Context) {
            const expectDecodeResout = createExpectMessage(
                "submitDatasetChallengeProofs",
                {
                    auditor: "f410fcwzis33wz3sofrlh466gog5xahlthgzqezasapy",
                    datasetId: 1,
                    leaves: [
                        "0xadacd58b8058f1c749ad8763f5b8e46d69ff5ae98fd6e32277c5de50f5fdff2b",
                    ],
                    paths: [BigInt(190349)],
                    randomSeed: BigInt(1232131),
                    siblings: [
                        [
                            "0xebb1f53d91b7771ddbe7bc775abd6f1bb89678ca1da127afa13cd79bd2de4311",
                            "0xcbac7f6367fd225711f59c1d73c455ff63212e0e7d7d7dff43072163ade8ea1f",
                            "0x4c71c57af3ac0a389cb5c9fbf8a8f15dab2fd9eee3a3e96ca9de7fd8dbe2ef08",
                            "0x984e768c92376b322f03121987cd7f3d8aa6b941ac76d8bd8d6c293092ec353b",
                            "0x7f4188eccc50bedd14f321c0501c7a2ea9ccd8c08598c9dd090182216b7aec3d",
                            "0xe554bdd5c003e828565707f40947b5ca7dddeb588b825a9f405f736372899e02",
                            "0xdc37d0f2cf19b37a4bd99c65083fa1b0a0606c5c4233e9496ab7fdac26fcb739",
                            "0xa221157942d88ad43e73fbafc0954f06d26a17653a9e2ad6a0b447a5da1efc3d",
                            "0x5135bc52c81343285e12e88dcc4aab75d31b0766655502dea952bd90c3db7910",
                            "0x1ffeb97335c2615c5597381158807661e1eee827bd6c7f710074985bd5b6b436",
                            "0x8b1fa317c21a26305f84530f93541fc02ba24236bc4a74be04b1f6186f394e3e",
                            "0xbac8bd01d7ae2e77a73c254f85109514d0d017a8e01fbc5a3781e1815fcc8614",
                            "0x198824b3074c603c78a31bb5a62c135a458d5ee67b1bfc8f1c52e6c27119c237",
                            "0xbcec5ac0e7759282f9ad004b2612348f83cc1ceee9058f84a9458fcb370e9925",
                            "0x6ac2cb87a29690722a5f82c8ec8e678efde37c313c4711326c38fdcb63bd7320",
                            "0xef7e73cedaee47c1e72d1e33318bc389727ebb0bb6fff03a25ab3ed4682a4e29",
                            "0x9c507a4a56d1df47f8196dc7244e9e8b7ad10e3534a65b50bd90c69ab25bb521",
                            "0x7ea8b1c4a9f6045bdff6ab808a9e38b4a6f267744f2a263dd67978ab0589fb32",
                        ],
                    ],
                },
                "0x",
                1
            )
            const message = createTargetMessage(
                "WQPEV8owTwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASzQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa2s1YuAWPHHSa2HY/W45G1p/1rpj9bjInfF3lD1/f8rAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS67H1PZG3dx3b57x3Wr1vG7iWeModoSevoTzXm9LeQxHLrH9jZ/0iVxH1nB1zxFX/YyEuDn19ff9DByFjrejqH0xxxXrzrAo4nLXJ+/io8V2rL9nu46PpbKnef9jb4u8ImE52jJI3azIvAxIZh81/PYqmuUGsdti9jWwpMJLsNTt/QYjszFC+3RTzIcBQHHouqczYwIWYyd0JAYIha3rsPeVUvdXAA+goVlcH9AlHtcp93etYi4Jan0Bfc2NyiZ4C3DfQ8s8Zs3pL2ZxlCD+hsKBgbFxCM+lJarf9rCb8tzmiIRV5QtiK1D5z+6/AlU8G0moXZTqeKtagtEel2h78PVE1vFLIE0MoXhLojcxKq3XTGwdmZVUC3qlSvZDD23kQH/65czXCYVxVlzgRWIB2YeHu6Ce9bH9xAHSYW9W2tDaLH6MXwhomMF+EUw+TVB/AK6JCNrxKdL4EsfYYbzlOPrrIvQHXri53pzwlT4UQlRTQ0Beo4B+8WjeB4YFfzIYUGYgkswdMYDx4oxu1piwTWkWNXuZ7G/yPHFLmwnEZwje87FrA53WSgvmtAEsmEjSPg8wc7ukFj4SpRY/LNw6ZJWrCy4eilpByKl+CyOyOZ47943wxPEcRMmw4/ctjvXMg735zztruR8HnLR4zMYvDiXJ+uwu2//A6Jas+1GgqTimcUHpKVtHfR/gZbcckTp6LetEONTSmW1C9kMaaslu1IX6oscSp9gRb3/argIqeOLSm8md0TyomPdZ5eKsFifsyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALnjQ==",
                "QA=="
            )

            const decodedMessage = getContractsManager()
                .DatasetChallengeEvm()
                .decodeMessage(message)

            assert.deepStrictEqual(decodedMessage.data, expectDecodeResout.data)

            expect(expectDecodeResout.data!.params).to.deep.include(
                <ValueFields<DatasetChallenge>>decodedMessage.data!.params
            )
        })
    })
})
