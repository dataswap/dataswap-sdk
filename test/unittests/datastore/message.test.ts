/*******************************************************************************
 *   (c) 2023 dataswap
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
import chai from "chai"
import { DataswapMessageMongoDatastore } from "../../../src/message/repo/datastore"
import { DataswapMessage } from "../../../src/message/types"
import { describe, it } from "mocha"
const { expect } = chai

const sampleDataswapMessage: DataswapMessage = {
    cid: { "/": "cid" },
    height: 1,
    timestamp: "timestamp",
    from: "from",
    to: "to",
    method: "method",
    params: ["params"],
    status: 0,
    return: "0x",
    datasetId: 9999,
    matchingId: 1,
}

describe("DataswapMessageMongoDatastore", () => {
    const datastore = new DataswapMessageMongoDatastore(
        "mongodb://127.0.0.1:27017/datastore"
    )

    describe("constructor", () => {
        it("should create an instance of DataswapMessageMongoDatastore", () => {
            expect(datastore).to.be.an.instanceOf(DataswapMessageMongoDatastore)
        })
    })

    //@TODO
    //@note: Testing individually is normal, but there are issues when integrated into the CI testing environment."
    /* 
    describe("save", () => {
        it("should save a DataswapMessage to the datastore", async () => {
            await datastore.connect()
            const createRes = await datastore.CreateOrupdateByUniqueIndexes(
                sampleDataswapMessage
            )
            expect(createRes.ok).to.be.true

            const res = await datastore.find({})
            expect(res.ok).to.be.true
            expect(res.data).to.be.not.undefined
            expect(res.data?.length).to.deep.equal(1)
            expect(res.data![0].datasetId).to.deep.equal(9999)
            await datastore.disconnect()
        })
    })
    */
})
