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
import { FilecoinAssertion } from "../../assertions/core/filecoinAssertion"
import { DealState } from "../../../src/shared/types/filecoinType"
import { getContractsManager, getGenerator } from "../../fixtures"

/**
 * Test suite for the Filecoin functionality.
 */
describe("filecoin", () => {
    let filecoinAssertion: FilecoinAssertion

    /**
     * Setup before running the test suite.
     */
    before(function () {
        this.sharedData = {}
        this.sharedData.generator = getGenerator()
        this.sharedData.contractsManager = getContractsManager()
        let filecoin = this.sharedData.contractsManager.FilecoinEvm()
        filecoinAssertion = new FilecoinAssertion(filecoin)
    })

    /**
     * Test case for the `getReplicaDealState` method. TODO: Complete filecoin unit test #99
     */
    it.skip("getReplicaDealState", async function () {
        await filecoinAssertion.getReplicaDealStateAssertion(
            "0x03b2ed13af20471b3eea52c329c29bba17568ecf0190f50c9e675cf5a453b815",
            1,
            DealState.Slashed
        )
    })

    /**
     * Test case for the `getReplicaClaimData` method. TODO: Complete filecoin unit test #99
     */
    it.skip("getReplicaClaimData", async function () {
        await filecoinAssertion.getReplicaClaimDataAssertion(
            1,
            1,
            "0x03b2ed13af20471b3eea52c329c29bba17568ecf0190f50c9e675cf5a453b815"
        )
    })
})
