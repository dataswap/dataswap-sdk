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
import { MatchingTargetMongoDatastore } from "../../../src/module/matching/target/repo/datastore"
import { MatchingTarget } from "../../../src/module/matching/target/types"
import { ValueFields } from "@unipackage/utils"
import { describe, it } from "mocha"
import { DataType } from "../../../src/shared/types/dataType"
import { DatabaseConnection } from "@unipackage/datastore"
const { expect } = chai

const sampleMatchingTarget: ValueFields<MatchingTarget> = {
    datasetID: 1,
    cars: [BigInt(1)],
    size: BigInt(1111),
    dataType: DataType.MappingFiles,
    associatedMappingFilesMatchingID: 0,
    replicaIndex: BigInt(0),
    subsidy: BigInt(0),
    complete: true,
    matchingId: 2,
}

describe("MatchingTargetMongoDatastore", () => {
    const connection = DatabaseConnection.getInstance(
        "mongodb://127.0.0.1:27017/datastore"
    )
    const datastore = new MatchingTargetMongoDatastore(connection)

    beforeEach(async () => {
        const res = await datastore.connect()
        expect(res.ok).to.be.true
    })

    afterEach(async () => {
        const res = await datastore.disconnect()
        expect(res.ok).to.be.true
    })

    describe("constructor", () => {
        it("should create an instance of MatchingTargetMongoDatastore", () => {
            expect(datastore).to.be.an.instanceOf(MatchingTargetMongoDatastore)
        })
    })

    describe("save", () => {
        //@note: Testing individually is normal, but there are issues when integrated into the CI testing environment."
        it.skip("should save a MatchingTarget to the datastore", async () => {
            const createRes =
                await datastore.CreateOrupdateByUniqueIndexes(
                    sampleMatchingTarget
                )
            console.log(createRes)
            expect(createRes.ok).to.be.true

            const res = await datastore.find({
                conditions: [{ matchingId: 2 }],
            })
            expect(res.ok).to.be.true
            expect(res.data).to.be.not.undefined
            expect(res.data?.length).to.deep.equal(1)
        })
    })
})
