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
        let size = await handleEvmError(carstore.getCarSize(BigInt(1)))
        let datasetId = await handleEvmError(
            carstore.getCarDatasetId(BigInt(1))
        )
        let hash = await handleEvmError(carstore.getCarHash(BigInt(1)))
        let replicasCount = await handleEvmError(
            carstore.getCarReplicasCount(BigInt(1))
        )
        let matchingIds = await handleEvmError(
            carstore.getCarMatchingIds(BigInt(1))
        )

        await carstoreAssertion.getCarAssertion(
            BigInt(1),
            new Car({
                hash: hash.data,
                carId: BigInt(1),
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
        let hashs = await handleEvmError(
            carstore.getCarsHashs([BigInt(1), BigInt(2)])
        )
        let size = await handleEvmError(carstore.getCarSize(BigInt(1)))
        size += await handleEvmError(carstore.getCarSize(BigInt(2)))

        await Promise.all([
            carstoreAssertion.getCarIdAssertion(hashs.data[0], BigInt(1)),
            carstoreAssertion.getCarsIdsAssertion(hashs.data, [
                BigInt(1),
                BigInt(2),
            ]),
            carstoreAssertion.hasCarAssertion(BigInt(1), true),
            carstoreAssertion.hasCarHashAssertion(hashs.data[0], true),
            carstoreAssertion.hasCarsAssertion([BigInt(1), BigInt(2)], true),
            carstoreAssertion.hasCarsHashsAssertion(hashs.data, true),
            carstoreAssertion.getCarsSizeAssertion(
                [BigInt(1), BigInt(2)],
                size
            ),
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
            carstore.getCarReplicaFilecoinClaimId(BigInt(1), 1)
        )
        let state = await handleEvmError(
            carstore.getCarReplicaState(BigInt(1), 1)
        )

        await carstoreAssertion.getCarReplicaAssertion(
            BigInt(1),
            1,
            new CarReplica({
                matchingId: 1,
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
        await carstoreAssertion.hasCarReplicaAssertion(BigInt(1), 1, true)
    })
})
