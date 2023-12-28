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

/**
 * Interface representing assertions related to roles.
 * @interface
 */
export interface IRolesAssertion {
    /**
     * Asserts the role assigned to an entity.
     * @param {string} role - The role to check.
     * @param {string} expectRole - The expected role.
     * @returns {Promise<void>}
     */
    checkRoleAssertion(role: string, expectRole: string): Promise<void>

    /**
     * Asserts the ownership of an entity.
     * @param {string} expectAddress - The expected owner's address.
     * @returns {Promise<void>}
     */
    ownerAssertion(expectAddress: string): Promise<void>

    /**
     * Asserts whether a specific role is assigned to an account.
     * @param {string} role - The role to check.
     * @param {string} account - The account to check for the role.
     * @param {boolean} expectHas - The expected existence status of the role.
     * @returns {Promise<void>}
     */
    hasRoleAssertion(
        role: string,
        account: string,
        expectHas: boolean
    ): Promise<void>

    /**
     * Asserts the acceptance of ownership transfer to a new owner.
     * @param {string} newOwner - The expected new owner's address.
     * @returns {Promise<void>}
     */
    acceptOwnershipAssertion(newOwner: string): Promise<void>

    /**
     * Asserts the successful transfer of ownership to a new owner.
     * @param {string} newOwner - The expected new owner's address.
     * @returns {Promise<void>}
     */
    transferOwnershipAssertion(newOwner: string): Promise<void>

    /**
     * Asserts the granting of a specific role to an account.
     * @param {string} role - The role to grant.
     * @param {string} account - The account to grant the role.
     * @returns {Promise<void>}
     */
    grantRoleAssertion(role: string, account: string): Promise<void>
}
