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

import { describe } from "mocha"
import { handleEvmError } from "../../shared/error"
import { Car, CarReplica } from "../../../src/core/carstore/types"
import { CarstoreEvm } from "../../../src/core/carstore/repo/evm"
import { getContractsManager, getGenerator } from "../../fixtures"
import { DatasetsHelper } from "../../helpers/module/datasetsHelper"
import { CarstoreAssertion } from "../../assertions/core/carstoreAssertion"

/**
 * Test suite for the Carstore smart contract.
 */
describe("carstore", () => {
    let carstore: CarstoreEvm
    let carstoreAssertion: CarstoreAssertion
    let datasetHelperInstance: DatasetsHelper

    /**
     * Before hook to set up shared data and instantiate necessary objects.
     */
    before(async function () {
        this.sharedData = {}
        this.sharedData.generator = getGenerator()
        this.sharedData.contractsManager = getContractsManager()
        carstore = this.sharedData.contractsManager.CarstoreEvm()
        carstoreAssertion = new CarstoreAssertion(carstore)

        datasetHelperInstance = new DatasetsHelper(
            this.sharedData.generator,
            this.sharedData.contractsManager
        )
        await datasetHelperInstance.proofSubmittedDatasetWorkflow(true)
    })

    /**
     * Test case for the `getCar` method.
     */
    it("getCar", async function () {
        let size = await handleEvmError(carstore.getCarSize(1))
        let datasetId = await handleEvmError(carstore.getCarDatasetId(1))
        let hash = await handleEvmError(carstore.getCarHash(1))
        let replicasCount = await handleEvmError(
            carstore.getCarReplicasCount(1)
        )
        let matchingIds = await handleEvmError(carstore.getCarMatchingIds(1))

        await carstoreAssertion.getCarAssertion(
            1,
            new Car({
                hash: hash.data,
                id: 1,
                datasetId: datasetId.data,
                size: size.data,
                replicasCount: replicasCount.data,
                matchingIds: matchingIds.data,
            })
        )
    })

    /**
     * Test case for the `getCarsId` method.
     */
    it("getCarsId", async function () {
        let hashs = await handleEvmError(carstore.getCarsHashs([1, 2]))
        let size = await handleEvmError(carstore.getCarSize(1))
        size += await handleEvmError(carstore.getCarSize(2))

        await Promise.all([
            carstoreAssertion.getCarIdAssertion(hashs.data[0], 1),
            carstoreAssertion.getCarsIdsAssertion(hashs.data, [
                BigInt(1),
                BigInt(2),
            ]),
            carstoreAssertion.hasCarAssertion(1, true),
            carstoreAssertion.hasCarHashAssertion(hashs.data[0], true),
            carstoreAssertion.hasCarsAssertion([1, 2], true),
            carstoreAssertion.hasCarsHashsAssertion(hashs.data, true),
            carstoreAssertion.getCarsSizeAssertion([1, 2], size),
        ])
    })

    /**
     * Test case for the `carsCountAssertion` method.
     */
    it("carsCountAssertion", async function () {
        await carstoreAssertion.carsCountAssertion()
    })

    /**
     * Test case for the `getCarReplica` method.
     * @Note: Depends on the environment, no need to run every time.
     */
    it.skip("getCarReplica", async function () {
        let claimId = await handleEvmError(
            carstore.getCarReplicaFilecoinClaimId(1, 1)
        )
        let state = await handleEvmError(carstore.getCarReplicaState(1, 1))

        await carstoreAssertion.getCarReplicaAssertion(
            1,
            1,
            new CarReplica({
                filecoinClaimId: claimId.data,
                state: state.data,
            })
        )
    })

    /**
     * Test case for the `hasCarReplicaAssertion` method.
     * @Note: Depends on the environment, no need to run every time.
     */
    it.skip("hasCarReplicaAssertion", async function () {
        await carstoreAssertion.hasCarReplicaAssertion(1, 1, true)
    })
})
