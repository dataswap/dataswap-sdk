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
import { getContractsManager, getGenerator } from "../../fixtures"
import { DatasetsHelper } from "../../helpers/module/datasetsHelper"
import { StoragesAssertion } from "../../assertions/module/storagesAssertion"

/**
 * Test suite for the Storages functionality.
 */
describe.skip("storages", () => {
    let storagesAssertion: StoragesAssertion
    let datasetHelperInstance: DatasetsHelper
    let matchID: number

    /**
     * Setup before running the test suite.
     */
    before(async function () {
        this.sharedData = {}
        this.sharedData.generator = getGenerator()
        this.sharedData.contractsManager = getContractsManager()
        let storages = this.sharedData.contractsManager.StoragesEvm()
        storagesAssertion = new StoragesAssertion(storages)

        datasetHelperInstance = new DatasetsHelper(
            this.sharedData.generator,
            this.sharedData.contractsManager
        )
        /**
         * Keep the following code for unit testing
         */
        // await datasetHelperInstance.proofSubmittedDatasetWorkflow(true)
        /**
         * Keep the following code for unit testing.
         */
        // matchID = await getMatchingsHelper().completedMatchingWorkflow(
        //     DataType.Source
        // )
    })

    /**
     * Test case for submitStorageClaimIds functionality. TODO: Complete storages unit test #100
     */
    it.skip("submitStorageClaimIds", async function () {
        await storagesAssertion.submitStorageClaimIdsAssertion("", 1, 1, [], [])
    })

    /**
     * Test case for the `requestAllocateDatacap` method.
     */
    it.skip("requestAllocateDatacap", async function () {
        await storagesAssertion.requestAllocateDatacapAssertion(
            process.env.DATASWAP_PROOFSUBMITTER!,
            matchID
        )
    })
})
