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
import { DatasetMetadataMongoDatastore } from "../../../src/module/dataset/metadata/repo/datastore"
import { DatasetMetadata } from "../../../src/module/dataset/metadata/types"
import { ValueFields } from "@unipackage/utils"
import { describe, it } from "mocha"
const { expect } = chai

const sampleDatasetMetadata: ValueFields<DatasetMetadata> = {
    title: "a",
    industry: "a",
    name: "a",
    description: "a",
    source: "a",
    accessMethod: "a",
    submitter: "a",
    createdBlockNumber: 0,
    sizeInBytes: 0,
    isPublic: true,
    version: 0,
    datasetId: 0,
    status: "a",
}

describe("DatasetMetadataMongoDatastore", () => {
    const datastore = new DatasetMetadataMongoDatastore(
        "mongodb://127.0.0.1:27017/datastore"
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
        it("should create an instance of DatasetMetadataMongoDatastore", () => {
            expect(datastore).to.be.an.instanceOf(DatasetMetadataMongoDatastore)
        })
    })

    describe("save", () => {
        //@note: Testing individually is normal, but there are issues when integrated into the CI testing environment."
        it.skip("should save a DatasetMetadata to the datastore", async () => {
            const createRes = await datastore.CreateOrupdateByUniqueIndexes(
                sampleDatasetMetadata
            )
            console.log(createRes)
            expect(createRes.ok).to.be.true

            const res = await datastore.find({
                conditions: [{ accessMethod: "a" }],
            })
            expect(res.ok).to.be.true
            expect(res.data).to.be.not.undefined
            expect(res.data?.length).to.deep.equal(1)
        })
    })
})
