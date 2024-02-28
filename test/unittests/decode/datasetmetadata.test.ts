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
import { DatasetMetadata } from "../../../src/module/dataset/metadata/types"
import { ValueFields } from "@unipackage/utils"
import { createExpectMessage, createTargetMessage } from "../../shared/utils"
import { getContractsManager } from "../../fixtures"
import { DatasetState } from "../../../src/shared/types/datasetType"
dotenv.config()
/**
 * Test suite for the Datasests contract message decoder functionality.
 */
describe("DatasetsContractMessageDecoder", () => {
    /**
     * Test suite for the Datasets decoder functionality.
     */
    describe("#decoder", () => {
        /**
         * Test case for submitDatasetMetadata decode functionality.
         */
        it("submitDatasetMetadata should ok", async function (this: Context) {
            this.timeout(10000)
            const expectDecodeResout = createExpectMessage({
                method: "submitDatasetMetadata",
                params: {
                    client: BigInt(1420),
                    title: "title-0i4zeet",
                    industry: "industry-0i4zeet",
                    name: "dataset-0i4zeet",
                    description: "description-0i4zeet",
                    source: "aws://sdfa.com-0i4zeet",
                    accessMethod: "dataswap.com/test-0i4zeet",
                    sizeInBytes: BigInt(5120000),
                    isPublic: true,
                    version: BigInt(1),
                    submitter: "f410fcwzis33wz3sofrlh466gog5xahlthgzqezasapy",
                    createdBlockNumber: 1213438,
                    datasetId: 1,
                    status: DatasetState.None,
                },
                returns:
                    "0x0000000000000000000000000000000000000000000000000000000000000001",
                datasetId: 1,
            })
            const message = createTargetMessage({
                params: "WQLEkl3YoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA10aXRsZS0waTR6ZWV0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQaW5kdXN0cnktMGk0emVldAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2RhdGFzZXQtMGk0emVldAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABNkZXNjcmlwdGlvbi0waTR6ZWV0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWYXdzOi8vc2RmYS5jb20tMGk0emVldAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGWRhdGFzd2FwLmNvbS90ZXN0LTBpNHplZXQAAAAAAAAA",
                returns: "WCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ==",
            })

            const decodedMessage = getContractsManager()
                .DatasetMetadataEvm()
                .decodeMessage(message)

            assert.deepStrictEqual(decodedMessage.data, expectDecodeResout.data)

            expect(decodedMessage.data!.params).to.deep.include(
                <ValueFields<DatasetMetadata>>expectDecodeResout.data!.params
            )
        })
    })
})
