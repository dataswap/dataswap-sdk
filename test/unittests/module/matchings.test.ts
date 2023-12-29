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
import {
    getContractsManager,
    getGenerator,
    getMatchingsHelper,
} from "../../fixtures"
import {
    CreateMatchingsMetadataTestKit,
    PauseMatchingTestKit,
    ResumeMatchingTestKit,
} from "../../testkits/module/matchings/MatchingsTestKit"
import {
    CreateMatchingTargetTestKit,
    PublishMatchingTestKit,
} from "../../testkits/module/matchings/MatchingsTargetTestKit"
import { MatchingsAssertion } from "../../assertions/module/matchingsAssertion"

/**
 * Test suite for the Matchings functionality.
 */
describe("matchings", async () => {
    /**
     * Setup before running the test suite.
     */
    before(function () {
        this.sharedData = {}
        this.sharedData.matchingId = 0
        this.sharedData.generator = getGenerator()
        this.sharedData.contractsManager = getContractsManager()
        this.sharedData.matchingsHelper = getMatchingsHelper()

        this.sharedData.matchingsAssertion = new MatchingsAssertion(
            this.sharedData.contractsManager
        )
    })
    /**
     * Tests assert dependencies addressed of matchingsTarget.
     */
    it("assertTargetDependenciesAdresses", async function () {
        await this.sharedData.matchingsAssertion.targetInitDependenciesAssertion(
            process.env.DATASWAP_GOVERNANCE as string,
            process.env.MatchingsAddress as string,
            process.env.MatchingsBidsAddress as string
        )
    })

    /**
     * Tests create matching metadata.
     */
    it("createMatchingsMetadata", async function () {
        const testKit = new CreateMatchingsMetadataTestKit(
            this.sharedData.matchingsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getMatchingsHelper()
        )
        this.sharedData.matchingId = await testKit.run()
    })

    /**
     * Tests create matching target.
     */
    it("createMatchingsTarget", async function () {
        const matchingId = this.sharedData.matchingId
        const testKit = new CreateMatchingTargetTestKit(
            this.sharedData.matchingsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getMatchingsHelper()
        )
        this.sharedData.matchingId = await testKit.run(matchingId)
    })

    /**
     * Tests publish matching.
     */
    it("publishMatching", async function () {
        const matchingId = this.sharedData.matchingId
        const testKit = new PublishMatchingTestKit(
            this.sharedData.matchingsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getMatchingsHelper()
        )
        this.sharedData.matchingId = await testKit.run(matchingId)
    })

    /**
     * Tests create matching metadata.
     */
    it("pauseMatching", async function () {
        const matchingId = this.sharedData.matchingId
        const testKit = new PauseMatchingTestKit(
            this.sharedData.matchingsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getMatchingsHelper()
        )
        this.sharedData.matchingId = await testKit.run(matchingId)
    })

    /**
     * Tests create matching metadata.
     */
    it("resumeMatching", async function () {
        const matchingId = this.sharedData.matchingId
        const testKit = new ResumeMatchingTestKit(
            this.sharedData.matchingsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getMatchingsHelper()
        )
        this.sharedData.matchingId = await testKit.run(matchingId)
    })
})
