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
import {
    DatasetProofs,
    DatasetProofMetadata,
} from "../../../src/module/dataset/proof/types"

/**
 * Test suite for the DatasetsProof contract message decoder functionality.
 */
describe("DatasetsProofMessageDecoder", () => {
    /**
     * Test suite for the DatasetsProof decoder functionality.
     */
    describe("#decoder", () => {
        /**
         * Test case for submitDatasetProofRoot decode functionality.
         */
        it("submitDatasetProofRoot should ok", async function (this: Context) {
            const expectDecodeResout = createExpectMessage({
                method: "submitDatasetProofRoot",
                params: {
                    datasetId: 5,
                    dataType: 1,
                    mappingFilesAccessMethod: "0174kxc",
                    rootHash:
                        "0x000000000000000000000000000000000000000000000000000000000000012c",
                    submitter: "f410fcwzis33wz3sofrlh466gog5xahlthgzqezasapy",
                    valid: true,
                    datasetSize: BigInt(0),
                },
                returns: "0x",
                datasetId: 5,
            })
            const message = createTargetMessage({
                params: "WMTGsVfQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABzAxNzRreGMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                returns: "QA==",
            })

            const decodedMessage = getContractsManager()
                .DatasetProofEvm()
                .decodeMessage(message)

            assert.deepStrictEqual(decodedMessage.data, expectDecodeResout.data)

            expect(expectDecodeResout.data!.params).to.deep.include(
                <ValueFields<DatasetProofMetadata>>decodedMessage.data!.params
            )
        })

        /**
         * Test case for submitDatasetProof decode functionality.
         */
        it("submitDatasetProof should ok", async function (this: Context) {
            const expectDecodeResout = createExpectMessage({
                method: "submitDatasetProof",
                params: {
                    completed: true,
                    dataType: 0,
                    datasetId: 4,
                    leafHashes: [
                        "0x0000000000000000000000000000000000000000000000000000000000000071",
                        "0x0000000000000000000000000000000000000000000000000000000000000072",
                        "0x0000000000000000000000000000000000000000000000000000000000000073",
                        "0x0000000000000000000000000000000000000000000000000000000000000074",
                        "0x0000000000000000000000000000000000000000000000000000000000000075",
                        "0x0000000000000000000000000000000000000000000000000000000000000076",
                        "0x0000000000000000000000000000000000000000000000000000000000000077",
                        "0x0000000000000000000000000000000000000000000000000000000000000078",
                        "0x0000000000000000000000000000000000000000000000000000000000000079",
                        "0x000000000000000000000000000000000000000000000000000000000000007a",
                    ],
                    leafIndex: BigInt(0),
                    leafSizes: [
                        BigInt(1130000),
                        BigInt(1140000),
                        BigInt(1150000),
                        BigInt(1160000),
                        BigInt(1170000),
                        BigInt(1180000),
                        BigInt(1190000),
                        BigInt(1200000),
                        BigInt(1210000),
                        BigInt(1220000),
                    ],
                },
                returns: "0x",
                datasetId: 4,
            })
            const message = createTargetMessage({
                params: "WQOEKlg8EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAET4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARZSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGMMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEbNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR2lAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIBYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEihwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAST4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJ2kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEp2g",
                returns: "QA==",
            })

            const decodedMessage = getContractsManager()
                .DatasetProofEvm()
                .decodeMessage(message)
            assert.deepStrictEqual(decodedMessage.data, expectDecodeResout.data)

            expect(expectDecodeResout.data!.params).to.deep.include(
                <ValueFields<DatasetProofs>>decodedMessage.data!.params
            )
        })
    })
})
