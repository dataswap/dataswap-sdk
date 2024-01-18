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
import { DatabaseConnection } from "@unipackage/datastore"
import { getContractsManager } from "../../fixtures"
const { expect } = chai

const sampleDataswapMessage: DataswapMessage = {
    cid: { "/": "cid" },
    height: 1,
    timestamp: "timestamp",
    from: "from",
    to: "to",
    value: "100",
    method: "method",
    params: ["params"],
    status: 0,
    return: "0x",
    datasetId: 9999,
    matchingId: 1,
}

const sample1DataswapMessage: DataswapMessage = {
    cid: {
        "/": "bafy2bzaceccvotqkwxzxdfqj2tx7plxekc2gsq3ehmgawljthb2rmrs5z7o6m",
    },
    height: 1249032,
    timestamp: "timestamp",
    from: "f410fzkkc6d6tsgc5s4or2whbkfsf4wlpy7x7l6g2p6i",
    to: "f410fkj3ynjerzlufen7abogqusb5xsgujhrllxyg4ga",
    value: "100",
    method: "bidding",
    params: {
        matchingId: 3,
        amount: BigInt(1000000010),
        bidder: "f410fzkkc6d6tsgc5s4or2whbkfsf4wlpy7x7l6g2p6i",
    },
    status: 0,
    return: "0x",
    matchingId: 3,
}

describe("DataswapMessageMongoDatastore", () => {
    const connection = DatabaseConnection.getInstance(
        "mongodb://127.0.0.1:27017/datastore"
    )
    const datastore = new DataswapMessageMongoDatastore(connection)

    describe("constructor", () => {
        it("should create an instance of DataswapMessageMongoDatastore", () => {
            expect(datastore).to.be.an.instanceOf(DataswapMessageMongoDatastore)
        })
    })

    //@TODO
    //@note: Testing individually is normal, but there are issues when integrated into the CI testing environment."
    describe("save", () => {
        it.skip("should save a DataswapMessage to the datastore", async () => {
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

        it.skip("should save a DataswapMessage to the datastore with CreateOrupdateByUniqueIndexesPlus", async () => {
            await datastore.connect()
            const createRes = await datastore.CreateOrupdateByUniqueIndexes(
                sample1DataswapMessage
            )
            expect(createRes.ok).to.be.true

            const res = await datastore.find({
                conditions: [
                    {
                        cid: {
                            "/": "bafy2bzaceccvotqkwxzxdfqj2tx7plxekc2gsq3ehmgawljthb2rmrs5z7o6m",
                        },
                    },
                ],
            })
            expect(res.ok).to.be.true
            expect(res.data).to.be.not.undefined
            expect(res.data?.length).to.deep.equal(1)
            expect(res.data![0].datasetId).to.be.undefined

            const completeRes =
                await datastore.CreateOrupdateByUniqueIndexesPlus({
                    matchingTarget: getContractsManager().MatchingTargetEvm(),
                    data: sample1DataswapMessage,
                })
            expect(completeRes.ok).to.be.true
            const newRes = await datastore.find({
                conditions: [
                    {
                        cid: {
                            "/": "bafy2bzaceccvotqkwxzxdfqj2tx7plxekc2gsq3ehmgawljthb2rmrs5z7o6m",
                        },
                    },
                ],
            })
            expect(newRes.data![0].datasetId).to.deep.equal(7)
            await datastore.disconnect()
        })
    })
})
