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
    CarMongoDatastore,
    CarReplicaMongoDatastore,
} from "../../../src/core/carstore/repo/datastore"
import { CarReplica, Car } from "../../../src/core/carstore/types"
import { ValueFields } from "@unipackage/utils"
import { describe, it } from "mocha"
import { DatabaseConnection } from "@unipackage/datastore"
import { CarReplicaState } from "../../../src/shared/types/carstoreType"
import { getContractsManager } from "../../fixtures"

const { expect } = chai

const connection = DatabaseConnection.getInstance(
    "mongodb://127.0.0.1:27017/datastore"
)
const sampleCar: ValueFields<Car> = new Car({
    hash: "0x189ddc51f6d7f675f307fbb9b692356d7c1b31acb024f6ca0154820be651922d",
    carId: BigInt(1),
    datasetId: 7,
    size: BigInt(4614578),
    replicasCount: BigInt(5),
    replicaInfos: Array.from(
        { length: 5 },
        () =>
            new CarReplica({
                carId: BigInt(2),
                matchingId: 0,
                filecoinClaimId: BigInt(0),
                state: CarReplicaState.None,
            })
    ),
})
/**
 * Test suite for the Carstore contract CarMongoDatastore functionality.
 */
describe("CarMongoDatastore", () => {
    const datastore = new CarMongoDatastore(connection)

    beforeEach(async () => {
        const res = await datastore.connect()
        expect(res.ok).to.be.true
    })

    afterEach(async () => {
        const res = await datastore.disconnect()
        expect(res.ok).to.be.true
    })

    describe("constructor", () => {
        it("should create an instance of CarMongoDatastore", () => {
            expect(datastore).to.be.an.instanceOf(CarMongoDatastore)
        })
    })

    describe("save", () => {
        // TODO: debug when ci
        it.skip("should save a Car to the datastore", async () => {
            const createRes =
                await datastore.CreateOrupdateByUniqueIndexes(sampleCar)
            console.log(createRes)
            expect(createRes.ok).to.be.true

            const res = await datastore.find({
                conditions: [{ datasetId: 7 }],
            })
            expect(res.ok).to.be.true
            expect(res.data).to.be.not.undefined
            expect(res.data?.length).to.deep.equal(1)
            await datastore.updateReplica({
                carstoreEvm: getContractsManager().CarstoreEvm(),
                carId: sampleCar.carId,
                matchingId: 3,
                replicaIndex: 0,
            })
            const updateRes = await datastore.find({
                conditions: [{ datasetId: 7 }],
            })
            console.log("update Res:", updateRes)
            expect(updateRes.ok).to.be.true
            expect(updateRes.data).to.be.not.undefined
            expect(updateRes.data?.length).to.deep.equal(1)
            expect(updateRes.data![0].replicaInfos![0].state).to.be.equal(
                CarReplicaState.Matched
            )
        })
    })
})

const sampleCarReplica: ValueFields<CarReplica> = new CarReplica({
    matchingId: 3,
    filecoinClaimId: BigInt(0),
    state: CarReplicaState.None,
    carId: BigInt(1),
})
/**
 * Test suite for the Carstore contract CarReplicaMongoDatastore functionality.
 */
describe("CarReplicaMongoDatastore", () => {
    const datastore = new CarReplicaMongoDatastore(connection)

    beforeEach(async () => {
        const res = await datastore.connect()
        expect(res.ok).to.be.true
    })

    afterEach(async () => {
        const res = await datastore.disconnect()
        expect(res.ok).to.be.true
    })

    describe("constructor", () => {
        it("should create an instance of CarReplicaMongoDatastore", () => {
            expect(datastore).to.be.an.instanceOf(CarReplicaMongoDatastore)
        })
    })

    describe("save", () => {
        // TODO: debug when ci
        it.skip("should save a CarReplica to the datastore", async () => {
            const createRes =
                await datastore.CreateOrupdateByUniqueIndexes(sampleCarReplica)
            console.log(createRes)
            expect(createRes.ok).to.be.true

            const res = await datastore.find({
                conditions: [{ matchingId: 3 }],
            })
            expect(res.ok).to.be.true
            expect(res.data).to.be.not.undefined
            expect(res.data?.length).to.deep.equal(1)
            expect(res.data![0].state).to.be.equal(CarReplicaState.None)
            await datastore.updateState({
                carstore: getContractsManager().CarstoreEvm(),
                carId: BigInt(1),
                matchingId: 3,
            })
            const updateRes = await datastore.find({
                conditions: [{ matchingId: 3 }],
            })
            console.log(updateRes)
            expect(updateRes.ok).to.be.true
            expect(updateRes.data).to.be.not.undefined
            expect(updateRes.data?.length).to.deep.equal(1)
            expect(updateRes.data![0].state).to.be.equal(
                CarReplicaState.Matched
            )
        })
    })
})
