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
import { ethers } from "ethers"
import { RolesAssertion } from "../../assertions/core/rolesAssertion"
import { getContractsManager, getGenerator } from "../../fixtures"

/**
 * Test suite for the Roles functionality.
 */
describe("roles", () => {
    let rolesAssertion: RolesAssertion

    /**
     * Setup before running the test suite.
     */
    before(function () {
        this.sharedData = {}
        this.sharedData.generator = getGenerator()
        this.sharedData.contractsManager = getContractsManager()
        let roles = this.sharedData.contractsManager.RolesEvm()
        rolesAssertion = new RolesAssertion(roles)
    })

    /**
     * Test case for granting a role to an account.
     */
    it("grantRole", async function () {
        let roleBytes = ethers.utils.toUtf8Bytes("CC")
        let role = ethers.utils.keccak256(roleBytes)
        let account = await this.sharedData.generator.generatorAddress()
        await rolesAssertion.grantRoleAssertion(role, account)
    })

    /**
     * Test case for accepting ownership.
     */
    it("acceptOwnership", async function () {
        await rolesAssertion.acceptOwnershipAssertion(process.env.DATASWAP_METADATASUBMITTER!)
    })
})