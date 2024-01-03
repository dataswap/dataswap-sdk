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
import { EscrowMongoDatastore } from "../../../src/core/escrow/repo/datastore"
import { Escrow } from "../../../src/core/escrow/types"
import { ValueFields } from "@unipackage/utils"
import { describe, it } from "mocha"
const { expect } = chai

const sampleEscrow: ValueFields<Escrow> = new Escrow()

/**
 * Test suite for the EscrowMongoDatastore functionality.
 */
describe("EscrowMongoDatastore", () => {
    const datastore = new EscrowMongoDatastore(
        "mongodb://127.0.0.1:27017/datastore"
    )

    /**
     * Setup before running the test suite.
     */
    beforeEach(async () => {
        const res = await datastore.connect()
        expect(res.ok).to.be.true
    })

    /**
     * Setup after running the test suite.
     */
    afterEach(async () => {
        const res = await datastore.disconnect()
        expect(res.ok).to.be.true
    })

    /**
     * Test case for constructor functionality.
     */
    describe("constructor", () => {
        it("should create an instance of EscrowMongoDatastore", () => {
            expect(datastore).to.be.an.instanceOf(EscrowMongoDatastore)
        })
    })

    /**
     * Test case for save functionality.
     */
    describe("save", () => {
        it.skip("should save a Escrow to the datastore", async () => {
            const createRes =
                await datastore.CreateOrupdateByUniqueIndexes(sampleEscrow)
            console.log(createRes)
            expect(createRes.ok).to.be.true

            const res = await datastore.find({
                conditions: [{ type: 0 }],
            })
            expect(res.ok).to.be.true
            expect(res.data).to.be.not.undefined
            expect(res.data?.length).to.deep.equal(1)
        })
    })
})
