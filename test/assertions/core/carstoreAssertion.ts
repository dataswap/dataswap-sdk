import { assert } from "chai"
import { equal } from "@unipackage/utils"
import { handleEvmError } from "../../shared/error"
import { State } from "../../../src/shared/types/carstoreType"
import { CarstoreEvm } from "../../../src/core/carstore/repo/evm"
import { Car, CarReplica } from "../../../src/core/carstore/types"


export class CarstoreAssertion {
    private Carstore: CarstoreEvm

    constructor(Carstore: CarstoreEvm) {
        this.Carstore = Carstore
    }

    async getCarAssertion(id: number, expectCar: Car) {
        let car = await handleEvmError(this.Carstore.getCar(id))
        assert.isTrue(equal(car.data, expectCar), "Car should be expect car")
    }

    async getCarSizeAssertion(id: number, expectSize: number) {
        let size = await handleEvmError(this.Carstore.getCarSize(id))
        assert.isTrue(equal(size.data, expectSize), "Car size should be expect car size")
    }

    async getCarsSizeAssertion(ids: number[], expectSize: number) {
        let size = await handleEvmError(this.Carstore.getCarsSize(ids))
        assert.isTrue(equal(size.data, expectSize), "Cars size should be expect cars size")
    }

    async getCarDatasetIdAssertion(id: number, expectDatasetId: number) {
        let datasetId = await handleEvmError(this.Carstore.getCarDatasetId(id))
        assert.isTrue(equal(datasetId.data, expectDatasetId), "datasetId should be expect datasetId")
    }

    async getCarMatchingIdsAssertion(id: number, expectMatchingIds: number) {
        let matchingIds = await handleEvmError(this.Carstore.getCarMatchingIds(id))
        assert.isTrue(equal(matchingIds.data, expectMatchingIds), "matchingIds should be expect matchingIds")
    }

    async getCarReplicaAssertion(id: number, matchingId: number, expectCarReplica: CarReplica) {
        let carReplica = await handleEvmError(this.Carstore.getCarReplica(id, matchingId))
        assert.isTrue(equal(carReplica.data, expectCarReplica), "carReplica should be expect carReplica")
    }

    async getCarReplicasCountAssertion(id: number, expectCount: number) {
        let count = await handleEvmError(this.Carstore.getCarReplicasCount(id))
        assert.isTrue(equal(count.data, expectCount), "carReplica count should be expect carReplica count")
    }

    async getCarReplicaFilecoinClaimIdAssertion(id: number, matchingId: number, expectClaimId: number) {
        let claimId = await handleEvmError(this.Carstore.getCarReplicaFilecoinClaimId(id, matchingId))
        assert.isTrue(equal(claimId.data, expectClaimId), "carReplica claimId should be expect carReplica claimId")
    }

    async getCarReplicaStateAssertion(id: number, matchingId: number, expectState: State) {
        let state = await handleEvmError(this.Carstore.getCarReplicaState(id, matchingId))
        assert.isTrue(equal(state.data, expectState), "carReplica state should be expect carReplica state")
    }

    async getCarHashAssertion(id: number, expectHash: string) {
        let hash = await handleEvmError(this.Carstore.getCarHash(id))
        assert.isTrue(equal(hash.data, expectHash), "car hash should be expect car hash")
    }

    async getCarsHashsAssertion(ids: number[], expectHashs: string[]) {
        let hashs = await handleEvmError(this.Carstore.getCarsHashs(ids))
        assert.isTrue(equal(hashs.data, expectHashs), "car hashs should be expect car hashs")
    }

    async getCarIdAssertion(hash: string, expectId: number) {
        let id = await handleEvmError(this.Carstore.getCarId(hash))
        assert.isTrue(equal(id.data, expectId), "car id should be expect car id")
    }

    async getCarsIdsAssertion(hashs: string[], expectIds: number[]) {
        let ids = await handleEvmError(this.Carstore.getCarsIds(hashs))
        assert.isTrue(equal(ids.data, expectIds), "car ids should be expect car ids")
    }

    async carsCountAssertion(expectCount: number) {
        let count = await handleEvmError(this.Carstore.carsCount())
        assert.isTrue(equal(count.data, expectCount), "cars count should be expect cars count")
    }

    async hasCarHashAssertion(hash: string, expectHas: boolean) {
        let has = await handleEvmError(this.Carstore.hasCarHash(hash))
        assert.isTrue(equal(has.data, expectHas), "has car hash should be expect value")
    }

    async hasCarAssertion(id: number, expectHas: boolean) {
        let has = await handleEvmError(this.Carstore.hasCar(id))
        assert.isTrue(equal(has.data, expectHas), "has car should be expect value")
    }

    async hasCarReplicaAssertion(id: number, matchingId: number, expectHas: boolean) {
        let has = await handleEvmError(this.Carstore.hasCarReplica(id, matchingId))
        assert.isTrue(equal(has.data, expectHas), "has car replica should be expect value")
    }

    async hasCarsHashsAssertion(hashs: string[], expectHas: boolean) {
        let has = await handleEvmError(this.Carstore.hasCarsHashs(hashs))
        assert.isTrue(equal(has.data, expectHas), "has cars hashs should be expect value")
    }

    async hasCarsAssertion(ids: string[], expectHas: boolean) {
        let has = await handleEvmError(this.Carstore.hasCars(ids))
        assert.isTrue(equal(has.data, expectHas), "has cars should be expect value")
    }
}