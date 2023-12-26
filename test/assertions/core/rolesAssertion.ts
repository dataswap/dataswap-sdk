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
import { RolesEvm } from "../../../src/core/roles/repo/evm"
import { handleEvmError } from "../../shared/error"
import { IRolesAssertion } from "../../interfaces/assertions/core/IRolesAssertion"

/**
 * Class representing assertions related to roles.
 * @class
 * @implements {IRolesAssertion}
 */
export class RolesAssertion implements IRolesAssertion {
    private roles: RolesEvm

    /**
     * Creates an instance of RolesAssertion.
     * @constructor
     * @param {RolesEvm} roles - The instance of RolesEvm to perform assertions on.
     */
    constructor(roles: RolesEvm) {
        this.roles = roles
    }

    /**
     * Asserts the role assigned to an entity.
     * @param {string} role - The role to check.
     * @param {string} expectRole - The expected role.
     * @returns {Promise<void>}
     */
    async checkRoleAssertion(role: string): Promise<void> {
        await handleEvmError(this.roles.checkRole(role))
    }

    /**
     * Asserts the ownership of an entity.
     * @param {string} expectAddress - The expected owner's address.
     * @returns {Promise<void>}
     */
    async ownerAssertion(expectAddress: string): Promise<void> {
        let data = await handleEvmError(this.roles.owner())
        assert.isTrue(equal(expectAddress, data.data), "owner should be expect address")
    }

    /**
     * Asserts whether a specific role is assigned to an account.
     * @param {string} role - The role to check.
     * @param {string} account - The account to check for the role.
     * @param {boolean} expectHas - The expected existence status of the role.
     * @returns {Promise<void>}
     */
    async hasRoleAssertion(role: string, account: string, expectHas: boolean): Promise<void> {
        let data = await handleEvmError(this.roles.hasRole(role, account))
        assert.isTrue(equal(expectHas, data.data), "account should be has expect role")
    }

    /**
     * Asserts the acceptance of ownership transfer to a new owner.
     * @param {string} newOwner - The expected new owner's address.
     * @returns {Promise<void>}
     */
    async acceptOwnershipAssertion(newOwner: string): Promise<void> {
        let data = await handleEvmError(this.roles.owner())
        this.roles.getWallet().setDefault(data.data)

        await this.transferOwnershipAssertion(newOwner)
        this.roles.getWallet().setDefault(newOwner)
        await handleEvmError(this.roles.acceptOwnership())

        await this.ownerAssertion(newOwner)

        // revert operate
        await this.transferOwnershipAssertion(data.data)
        this.roles.getWallet().setDefault(data.data)
        await handleEvmError(this.roles.acceptOwnership())

    }

    /**
     * Asserts the successful transfer of ownership to a new owner.
     * @param {string} newOwner - The expected new owner's address.
     * @returns {Promise<void>}
     */
    async transferOwnershipAssertion(newOwner: string): Promise<void> {
        await handleEvmError(this.roles.transferOwnership(newOwner))
    }

    /**
     * Asserts the granting of a specific role to an account.
     * @param {string} role - The role to grant.
     * @param {string} account - The account to grant the role.
     * @returns {Promise<void>}
     */
    async grantRoleAssertion(role: string, account: string): Promise<void> {
        this.roles.getWallet().setDefault(process.env.DATASWAP_GOVERNANCE!)

        await handleEvmError(this.roles.grantRole(role, account))
        await this.hasRoleAssertion(role, account, true)
    }
}