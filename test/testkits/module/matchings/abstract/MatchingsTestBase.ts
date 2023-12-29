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

import { TestBase } from "../../../abstract/TestBase"
import { IContractsManager } from "../../../../interfaces/setup/IContractsManater"
import { IGenerator } from "../../../../interfaces/setup/IGenerator"
import { IMatchingsHelper } from "../../../../interfaces/helper/module/IMatchingsHelper"
import { IMatchingsAssertion } from "../../../../interfaces/assertions/module/IMatchingsAssertion"

/**
 * Base class for tests related to matchings.
 */
export abstract class MatchingsTestBase extends TestBase {
    protected generator: IGenerator
    protected contractsManager: IContractsManager
    protected matchingsHelper: IMatchingsHelper
    protected assertion: IMatchingsAssertion

    /**
     * Constructor for MatchingsTestBase.
     * @param _assertion - The assertion instance.
     * @param _generator - The generator instance.
     * @param _contractsManager - The contracts manager instance.
     * @param _matchingsHelper - The matchings helper instance.
     */
    constructor(
        _assertion: IMatchingsAssertion,
        _generator: IGenerator,
        _contractsManager: IContractsManager,
        _matchingsHelper: IMatchingsHelper
    ) {
        super()
        this.matchingsHelper = _matchingsHelper
        this.generator = _generator
        this.contractsManager = _contractsManager
        this.assertion = _assertion
    }
}
