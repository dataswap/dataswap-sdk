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
import { DatasetRequirementMongoDatastore } from "../../../src/module/dataset/requirement/repo/datastore"
import { DatasetRequirement } from "../../../src/module/dataset/requirement/types"
import { ValueFields } from "@unipackage/utils"
import { describe, it } from "mocha"
import { DatabaseConnection } from "@unipackage/datastore"
const { expect } = chai

const sampleDatasetRequirements: ValueFields<DatasetRequirement> = {
    dataPreparers: [
        "0x3D08114dD4F65B5DDCc760884249D9d1AE435Dee",
        "0x979f3C21f409545249243d64e1518F3be60f4Eb7",
    ],
    storageProviders: [
        "0xca942f0fd39185d971d1d58E151645e596FC7Eff",
        "0x184Aca59cA6724D3ea7D347FCec3d3f6B71E996c",
    ],
    regionCode: BigInt(585),
    countryCode: BigInt(517),
    cityCodes: [BigInt(202186), BigInt(1302254), BigInt(2236269)],
    index: 0,
    datasetId: 11,
}

/**
 * Test suite for the DatasetsRequirement contract DatasetRequirementMongoDatastore functionality.
 */
describe("DatasetRequirementsMongoDatastore", () => {
    const connection = DatabaseConnection.getInstance(
        "mongodb://127.0.0.1:27017/datastore"
    )
    const datastore = new DatasetRequirementMongoDatastore(connection)

    beforeEach(async () => {
        const res = await datastore.connect()
        expect(res.ok).to.be.true
    })

    afterEach(async () => {
        const res = await datastore.disconnect()
        expect(res.ok).to.be.true
    })

    describe("constructor", () => {
        it("should create an instance of DatasetRequirementMongoDatastore", () => {
            expect(datastore).to.be.an.instanceOf(
                DatasetRequirementMongoDatastore
            )
        })
    })

    describe("save", () => {
        // TODO: debug when ci
        it.skip("should save a DatasetRequirements to the datastore", async () => {
            const createRes = await datastore.CreateOrupdateByUniqueIndexes(
                sampleDatasetRequirements
            )
            console.log(createRes)
            expect(createRes.ok).to.be.true

            const res = await datastore.find({
                conditions: [{ datasetId: 11 }],
            })
            expect(res.ok).to.be.true
            expect(res.data).to.be.not.undefined
            expect(res.data?.length).to.deep.equal(1)
        })
    })
})
