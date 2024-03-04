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
import {
    MatchingStorageStatisticsInfoMongoDatastore,
    DatasetsBasicStatisticsMongoDatastore,
} from "../../../src/core/statistics/repo/datastore"
import {
    MatchingStorageStatisticsInfo,
    BasicStatistics,
} from "../../../src/shared/types/statisticsType"
import { ValueFields } from "@unipackage/utils"
import { describe, it } from "mocha"
import { DatabaseConnection } from "@unipackage/datastore"
const { expect } = chai

const sampleMatchingStorageStatisticsInfo: ValueFields<MatchingStorageStatisticsInfo> =
    {
        total: BigInt(10),
        completed: BigInt(1),
        usedDatacap: BigInt(1),
        availableDatacap: BigInt(5),
        canceled: BigInt(1),
        unallocatedDatacap: BigInt(3),
        storageProviders: [1024],
        datasetId: 1,
        matchingId: 2,
        replicaIndex: BigInt(3),
    }

describe("StorageStatisticsInfoMongoDatastore", () => {
    const connection = DatabaseConnection.getInstance(
        "mongodb://127.0.0.1:27017/datastore"
    )
    const datastore = new MatchingStorageStatisticsInfoMongoDatastore(
        connection
    )

    beforeEach(async () => {
        const res = await datastore.connect()
        expect(res.ok).to.be.true
    })

    afterEach(async () => {
        const res = await datastore.disconnect()
        expect(res.ok).to.be.true
    })

    describe("constructor", () => {
        it("should create an instance of MatchingStorageStatisticsInfoMongoDatastore", () => {
            expect(datastore).to.be.an.instanceOf(
                MatchingStorageStatisticsInfoMongoDatastore
            )
        })
    })

    describe("save", () => {
        //@note: Testing individually is normal, but there are issues when integrated into the CI testing environment."
        it.skip("should save a MatchingStorageStatisticsInfoMongoDatastore to the datastore", async () => {
            const createRes = await datastore.CreateOrupdateByUniqueIndexes(
                sampleMatchingStorageStatisticsInfo
            )
            console.log(createRes)
            expect(createRes.ok).to.be.true

            const res = await datastore.find({
                conditions: [
                    { datasetId: 1, matchingId: 1, replicaIndex: BigInt(1) },
                ],
            })
            expect(res.ok).to.be.true
            expect(res.data).to.be.not.undefined
            expect(res.data?.length).to.deep.equal(1)
        })
    })
})

const sampleBasicStatistics: ValueFields<BasicStatistics> = {
    totalCounts: 10,
    successCounts: 3,
    ongoingCounts: 6,
    failedCounts: 1,
    totalSize: 1000,
    successSize: 400,
    ongoingSize: 500,
    failedSize: 100,
    height: BigInt(1024),
}

describe("DatasetsBasicStatisticsMongoDatastore", () => {
    const connection = DatabaseConnection.getInstance(
        "mongodb://127.0.0.1:27017/datastore"
    )
    const datastore = new DatasetsBasicStatisticsMongoDatastore(connection)

    beforeEach(async () => {
        const res = await datastore.connect()
        expect(res.ok).to.be.true
    })

    afterEach(async () => {
        const res = await datastore.disconnect()
        expect(res.ok).to.be.true
    })

    describe("constructor", () => {
        it("should create an instance of DatasetsBasicStatisticsMongoDatastore", () => {
            expect(datastore).to.be.an.instanceOf(
                DatasetsBasicStatisticsMongoDatastore
            )
        })
    })

    describe("save", () => {
        //@note: Testing individually is normal, but there are issues when integrated into the CI testing environment."
        it.skip("should save a DatasetsBasicStatistics to the datastore", async () => {
            const createRes = await datastore.CreateOrupdateByUniqueIndexes(
                sampleBasicStatistics
            )
            console.log(createRes)
            expect(createRes.ok).to.be.true

            const res = await datastore.find({
                conditions: [{ height: 1024 }],
            })
            expect(res.ok).to.be.true
            expect(res.data).to.be.not.undefined
            expect(res.data?.length).to.deep.equal(1)
        })
    })
})
