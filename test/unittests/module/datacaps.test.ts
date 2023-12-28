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
import { DataType } from "../../../src/shared/types/dataType"
import {
    getContractsManager,
    getGenerator,
    getMatchingsHelper,
} from "../../fixtures"
import { DatacapsAssertion } from "../../assertions/module/datacapsAssertion"

/**
 * Test suite for the Datacaps smart contract.
 */
describe("datacaps", () => {
    let datacapsAssertion: DatacapsAssertion
    let matchID: number

    /**
     * Before hook to set up shared data and instantiate necessary objects.
     */
    before(async function () {
        this.sharedData = {}
        this.sharedData.generator = getGenerator()
        this.sharedData.contractsManager = getContractsManager()
        datacapsAssertion = new DatacapsAssertion(
            this.sharedData.contractsManager
        )
        /**
         * Keep the following code for unit testing.
         */
        // matchID = await getMatchingsHelper().completedMatchingWorkflow(
        //     DataType.Source
        // )
    })

    /**
     * Test case for the `getCollateralRequirement` method.
     */
    it.skip("getCollateralRequirement", async function () {
        await datacapsAssertion.getCollateralRequirementAssertion(
            BigInt("49999961419625267200")
        )
    })

    /**
     * Test case for the `requestAllocateDatacap` method.
     */
    it.skip("requestAllocateDatacap", async function () {
        await datacapsAssertion.requestAllocateDatacapAssertion(
            process.env.DATASWAP_PROOFSUBMITTER!,
            matchID
        )
    })
})
