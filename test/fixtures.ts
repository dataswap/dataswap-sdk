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

import dotenv from "dotenv"
import { IContractsManager } from "./interfaces/setup/IContractsManater"
import { ContractsManager } from "./testkits/setup/contractsManager"
import { IGenerator } from "./interfaces/setup/IGenerator"
import { Generator } from "./testkits/setup/generator"
import { IDatasetsHelper } from "./interfaces/helper/module/IDatasetshelper"
import { DatasetsHelper } from "./helpers/module/datasetsHelper"
import { DataswapTestSetup } from "./testkits/setup/dataswapTestSetup"
import { IMatchingsHelper } from "./interfaces/helper/module/IMatchingsHelper"
import { MatchingsHelper } from "./helpers/module/matchingsHelper"

// Import test environmental parameters
function setup() {
    dotenv.config()
}

let contractsManagerInstance: IContractsManager | null = null
let generatorInstance: IGenerator | null = null
let datasetHelperInstance: IDatasetsHelper | null = null
let matchinHelperInstance: IMatchingsHelper | null = null

/**
 * Gets the contracts manager instance.
 * Throws an error if contracts manager is not initialized.
 */
export function getContractsManager(): IContractsManager {
    if (!contractsManagerInstance) {
        throw new Error("Contracts manager not initialized")
    }
    return contractsManagerInstance
}

/**
 * Gets the generator instance.
 * Throws an error if generator is not initialized.
 */
export function getGenerator(): IGenerator {
    if (!generatorInstance) {
        throw new Error("Generator not initialized")
    }
    return generatorInstance
}

/**
 * Gets the datasets helper instance.
 * Throws an error if datasetHelper is not initialized.
 */
export function getDatasetsHelper(): IDatasetsHelper {
    if (!datasetHelperInstance) {
        throw new Error("DatasetHelper not initialized")
    }
    return datasetHelperInstance
}

/**
 * Gets the matchings helper instance.
 * Throws an error if matchingHelper is not initialized.
 */
export function getMatchingsHelper(): IMatchingsHelper {
    if (!matchinHelperInstance) {
        throw new Error("MatchingHelper not initialized")
    }
    return matchinHelperInstance
}

/**
 * Global setup function for Mocha tests.
 * Sets up required instances and runs necessary initializations.
 */
export async function mochaGlobalSetup() {
    setup()
    console.log(`@@@@ Mocha add hooks finished @@@@`)
    generatorInstance = new Generator()
    contractsManagerInstance = new ContractsManager()
    datasetHelperInstance = new DatasetsHelper(
        generatorInstance,
        contractsManagerInstance
    )

    matchinHelperInstance = new MatchingsHelper(
        generatorInstance,
        contractsManagerInstance,
        datasetHelperInstance
    )

    let testSetup = new DataswapTestSetup(contractsManagerInstance)
    await testSetup.run()
}
