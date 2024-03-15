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
import {
    BiddingMatchingTestKit,
    CancelMatchingTestKit,
    CloseMatchingTestKit,
} from "../../testkits/module/matchings/MatchingsBidsTestKit"
import { MatchingsAssertion } from "../../assertions/module/matchingsAssertion"
import { DatasetState } from "../../../src/shared/types/datasetType"

/**
 * Test suite for the Matchings functionality.
 */
describe.skip("matchings", async () => {
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
        const testKit = new CreateMatchingTargetTestKit(
            this.sharedData.matchingsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getMatchingsHelper()
        )
        this.sharedData.matchingId = await testKit.run(
            this.sharedData.matchingId
        )
    })

    /**
     * Tests publish matching.
     */
    it("publishMatching", async function () {
        const testKit = new PublishMatchingTestKit(
            this.sharedData.matchingsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getMatchingsHelper()
        )
        this.sharedData.matchingId = await testKit.run(
            this.sharedData.matchingId
        )
    })

    /**
     * Tests cancel matching.
     */
    it("cancelMatching", async function () {
        const testKit = new CancelMatchingTestKit(
            this.sharedData.matchingsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getMatchingsHelper()
        )
        this.sharedData.matchingId = await testKit.run(
            this.sharedData.matchingId
        )
    })

    /**
     * Tests pause matching.
     */
    it("pauseMatching", async function () {
        const testKit = new PauseMatchingTestKit(
            this.sharedData.matchingsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getMatchingsHelper()
        )
        this.sharedData.matchingId = await testKit.run()
    })

    /**
     * Tests resume matching.
     */
    it("resumeMatching", async function () {
        const testKit = new ResumeMatchingTestKit(
            this.sharedData.matchingsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getMatchingsHelper()
        )
        this.sharedData.matchingId = await testKit.run(
            this.sharedData.matchingId
        )
    })

    /**
     * Tests bidding matching.
     */
    it("biddingMatching", async function () {
        const testKit = new BiddingMatchingTestKit(
            this.sharedData.matchingsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getMatchingsHelper()
        )
        this.sharedData.matchingId = await testKit.run(
            this.sharedData.matchingId
        )
    })

    /**
     * Tests close matching.
     */
    it("closeMatching", async function () {
        const testKit = new CloseMatchingTestKit(
            this.sharedData.matchingsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getMatchingsHelper()
        )
        this.sharedData.matchingId = await testKit.run(
            this.sharedData.matchingId
        )
    })
})
