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
import { getContractsManager } from "../../fixtures"
import { MatchingState } from "../../../src/shared/types/matchingType"
const { expect } = chai

const sampleMatchingMetadata: ValueFields<MatchingMetadata> = {
    bidSelectionRule: BidSelectionRule.HighestBid,
    biddingDelayBlockCount: BigInt(30),
    biddingPeriodBlockCount: BigInt(20),
    storageCompletionPeriodBlocks: BigInt(100000),
    biddingThreshold: BigInt(1000000000),
    additionalInfo: "none",
    initiator: "f410fhuebctou6znv3xghmceeesoz2gxegxpoopw46jq",
    createdBlockNumber: BigInt(1248993),
    pausedBlockCount: BigInt(0),
    replicaIndex: BigInt(0),
    matchingId: 3,
    datasetId: 7,
    biddingStartBlock: BigInt(100),
    biddingEndBlock: BigInt(100),
    currentPrice: BigInt(900000000),
    size: BigInt(0),
    subsidy: BigInt(0),
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
        //@note: Testing individually is normal, but there are issues when integrated into the CI testing environment."
        it.skip("should save a MatchingMetadata to the datastore", async () => {
            const createRes = await datastore.CreateOrupdateByUniqueIndexes(
                sampleMatchingMetadata
            )
            console.log(createRes)
            expect(createRes.ok).to.be.true

            const res = await datastore.find({
                conditions: [{ matchingId: 3 }],
            })
            expect(res.ok).to.be.true
            expect(res.data).to.be.not.undefined
            expect(res.data?.length).to.deep.equal(1)
            await datastore.storeWithOrigionMatchingMetadata({
                matchingMetadata: getContractsManager().MatchingMetadataEvm(),
                datasetRequirement:
                    getContractsManager().DatasetRequirementEvm(),
                origionMetadata: res.data![0] as MatchingMetadata,
                matchingId: 3,
            })
            const storedRes = await datastore.find({
                conditions: [{ matchingId: 3 }],
            })
            expect(storedRes.data![0].status).to.be.equal(
                MatchingState.Completed
            )
            expect(storedRes.data![0].requirement?.countryCode).to.be.equal(
                BigInt(438)
            )
            console.log(storedRes)
            await datastore.updateMatchingBiddingInfo({
                matchingMetadata: getContractsManager().MatchingMetadataEvm(),
                matchingBids: getContractsManager().MatchingBidsEvm(),
                matchingId: 3,
            })
            const updateBiddingRes = await datastore.find({
                conditions: [{ matchingId: 3 }],
            })
            expect(updateBiddingRes.data![0].biddingStartBlock).to.be.equal(
                BigInt(1249025)
            )
            expect(updateBiddingRes.data![0].biddingEndBlock).to.be.equal(
                BigInt(1249045)
            )
            expect(updateBiddingRes.data![0].currentPrice).to.be.equal(
                BigInt(1000000010)
            )
            await datastore.updateMatchingState({
                matchingMetadata: getContractsManager().MatchingMetadataEvm(),
                matchingId: 3,
            })
            const updateStateRes = await datastore.find({
                conditions: [{ matchingId: 3 }],
            })
            expect(updateStateRes.data![0].status).to.be.equal(
                MatchingState.Completed
            )

            await datastore.updateMatchingTargetInfo({
                matchingTarget: getContractsManager().MatchingTargetEvm(),
                matchingId: 3,
            })
            const updateTargetRes = await datastore.find({
                conditions: [{ matchingId: 3 }],
            })
            expect(updateTargetRes.data![0].size).to.be.equal(BigInt(20317))
            expect(updateTargetRes.data![0].subsidy).to.be.equal(BigInt(0))
        })
    })
})
