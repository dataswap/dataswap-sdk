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
import { MatchingMetadataMongoDatastore } from "../../../src/module/matching/metadata/repo/datastore"
import {
    BidSelectionRule,
    MatchingMetadata,
} from "../../../src/module/matching/metadata/types"
import { ValueFields } from "@unipackage/utils"
import { describe, it } from "mocha"
import { DatabaseConnection } from "@unipackage/datastore"
const { expect } = chai

const sampleMatchingMetadata: ValueFields<MatchingMetadata> = {
    additionalInfo: "none",
    bidSelectionRule: BidSelectionRule.HighestBid,
    biddingDelayBlockCount: BigInt(30),
    biddingPeriodBlockCount: BigInt(20),
    biddingThreshold: BigInt(1000000000),
    datasetId: 1,
    replicaIndex: BigInt(0),
    storageCompletionPeriodBlocks: BigInt(100000),
}
/**
 * Test suite for the Matchings contract MatchingMetadataMongoDatastore functionality.
 */
describe("MatchingMetadataMongoDatastore", () => {
    const connection = DatabaseConnection.getInstance(
        "mongodb://127.0.0.1:27017/datastore"
    )
    const datastore = new MatchingMetadataMongoDatastore(connection)

    beforeEach(async () => {
        const res = await datastore.connect()
        expect(res.ok).to.be.true
    })

    afterEach(async () => {
        const res = await datastore.disconnect()
        expect(res.ok).to.be.true
    })

    describe("constructor", () => {
        it("should create an instance of MatchingMetadataMongoDatastore", () => {
            expect(datastore).to.be.an.instanceOf(
                MatchingMetadataMongoDatastore
            )
        })
    })

    describe("save", () => {
        // TODO: debug when ci
        it.skip("should save a MatchingMetadata to the datastore", async () => {
            const createRes = await datastore.CreateOrupdateByUniqueIndexes(
                sampleMatchingMetadata
            )
            console.log(createRes)
            expect(createRes.ok).to.be.true

            const res = await datastore.find({
                conditions: [{ matchingId: 1 }],
            })
            expect(res.ok).to.be.true
            expect(res.data).to.be.not.undefined
            expect(res.data?.length).to.deep.equal(1)
        })
    })
})
