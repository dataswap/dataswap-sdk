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

import { IContractsManager } from "../../interfaces/setup/IContractsManater"

/**
 * Represents a setup for Dataswap tests.
 */
export class DataswapTestSetup {
    protected contractsManager: IContractsManager

    constructor(_contractsManager: IContractsManager) {
        this.contractsManager = _contractsManager
    }

    /**
     * Runs the setup process for Dataswap tests.
     * Sets up accounts roles, contracts roles, and contracts dependencies.
     * @returns A Promise that resolves when the setup completes successfully.
     * @throws Error if there's an issue during the setup process.
     */
    async run(): Promise<void> {
        try {
            await this.contractsManager.setupAccountsRoles()
            await this.contractsManager.setupContractsRoles()
            await this.contractsManager.setupContractsDependencies()
        } catch (error) {
            throw error
        }
    }
}
