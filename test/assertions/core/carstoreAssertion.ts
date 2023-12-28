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

import { assert } from "chai"
import { equal } from "@unipackage/utils"
import { handleEvmError } from "../../shared/error"
import { CarReplicaState } from "../../../src/shared/types/carstoreType"
import { CarstoreEvm } from "../../../src/core/carstore/repo/evm"
import { Car, CarReplica } from "../../../src/core/carstore/types"
import { ICarstoreAssertion } from "../../interfaces/assertions/core/ICarstoreAssertion"

/**
 * The CarstoreAssertion class provides assertion methods for testing CarstoreEvm.
 * It includes methods for various assertions related to cars, replicas, hashes, and more.
 */
export class CarstoreAssertion implements ICarstoreAssertion {
    private carstore: CarstoreEvm

    /**
     * Constructs a new CarstoreAssertion instance.
     * @param carstore - The CarstoreEvm instance to be asserted.
     */
    constructor(carstore: CarstoreEvm) {
        this.carstore = carstore
    }

    /**
     * Asserts that the retrieved car matches the expected car.
     * @param id - The ID of the car to retrieve.
     * @param expectCar - The expected car data.
     */
    async getCarAssertion(id: number, expectCar: Car): Promise<void> {
        let car = await handleEvmError(this.carstore.getCar(id))
        assert.isTrue(equal(car.data, expectCar), "Car should be expect car")
    }

    /**
     * Asserts that the retrieved size of multiple cars matches the expected size.
     * @param ids - The IDs of the cars to retrieve sizes for.
     * @param expectSize - The expected total size of the cars.
     */
    async getCarsSizeAssertion(
        ids: number[],
        expectSize: number
    ): Promise<void> {
        let size = await handleEvmError(this.carstore.getCarsSize(ids))
        assert.isTrue(
            equal(size.data, expectSize),
            "Cars size should be expect cars size"
        )
    }

    /**
     * Asserts that the retrieved car replica matches the expected car replica.
     * @param id - The ID of the car to retrieve a replica for.
     * @param matchingId - The matching ID of the car replica.
     * @param expectCarReplica - The expected car replica data.
     */
    async getCarReplicaAssertion(
        id: number,
        matchingId: number,
        expectCarReplica: CarReplica
    ): Promise<void> {
        let carReplica = await handleEvmError(
            this.carstore.getCarReplica(id, matchingId)
        )
        assert.isTrue(
            equal(carReplica.data, expectCarReplica),
            "carReplica should be expect carReplica"
        )
    }

    /**
     * Asserts that the retrieved ID of a car matches the expected ID.
     * @param hash - The hash of the car to retrieve the ID for.
     * @param expectId - The expected ID of the car.
     */
    async getCarIdAssertion(hash: string, expectId: number): Promise<void> {
        let id = await handleEvmError(this.carstore.getCarId(hash))
        assert.isTrue(
            equal(id.data, expectId),
            "car id should be expect car id"
        )
    }

    /**
     * Asserts that the retrieved IDs of multiple cars match the expected IDs.
     * @param hashs - The hashes of the cars to retrieve IDs for.
     * @param expectIds - The expected IDs of the cars.
     */
    async getCarsIdsAssertion(
        hashs: string[],
        expectIds: bigint[]
    ): Promise<void> {
        let ids = await handleEvmError(this.carstore.getCarsIds(hashs))
        assert.isTrue(
            equal(ids.data, expectIds),
            "car ids should be expect car ids"
        )
    }

    /**
     * Asserts that the count of cars matches the expected count.
     */
    async carsCountAssertion(): Promise<void> {
        let count = await handleEvmError(this.carstore.carsCount())
        assert.isTrue(count.data != 0, "cars count shouldn't be 0")
    }

    /**
     * Asserts whether a car with a specific hash exists.
     * @param hash - The hash of the car to check.
     * @param expectHas - The expected existence status.
     */
    async hasCarHashAssertion(hash: string, expectHas: boolean): Promise<void> {
        let has = await handleEvmError(this.carstore.hasCarHash(hash))
        assert.isTrue(
            equal(has.data, expectHas),
            "has car hash should be expect value"
        )
    }

    /**
     * Asserts whether a car with a specific ID exists.
     * @param id - The ID of the car to check.
     * @param expectHas - The expected existence status.
     */
    async hasCarAssertion(id: number, expectHas: boolean): Promise<void> {
        let has = await handleEvmError(this.carstore.hasCar(id))
        assert.isTrue(
            equal(has.data, expectHas),
            "has car should be expect value"
        )
    }

    /**
     * Asserts whether a car replica with specific IDs exists.
     * @param id - The ID of the car to check.
     * @param matchingId - The matching ID of the car replica.
     * @param expectHas - The expected existence status.
     */
    async hasCarReplicaAssertion(
        id: number,
        matchingId: number,
        expectHas: boolean
    ): Promise<void> {
        let has = await handleEvmError(
            this.carstore.hasCarReplica(id, matchingId)
        )
        assert.isTrue(
            equal(has.data, expectHas),
            "has car replica should be expect value"
        )
    }

    /**
     * Asserts whether cars with specific hashes exist.
     * @param hashs - The hashes of the cars to check.
     * @param expectHas - The expected existence status.
     */
    async hasCarsHashsAssertion(
        hashs: string[],
        expectHas: boolean
    ): Promise<void> {
        let has = await handleEvmError(this.carstore.hasCarsHashs(hashs))
        assert.isTrue(
            equal(has.data, expectHas),
            "has cars hashs should be expect value"
        )
    }

    /**
     * Asserts whether cars with specific IDs exist.
     * @param ids - The IDs of the cars to check.
     * @param expectHas - The expected existence status.
     */
    async hasCarsAssertion(ids: number[], expectHas: boolean): Promise<void> {
        let has = await handleEvmError(this.carstore.hasCars(ids))
        assert.isTrue(
            equal(has.data, expectHas),
            "has cars should be expect value"
        )
    }
}
