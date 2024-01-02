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
import { FilplusAssertion } from "../../assertions/core/filplusAssertion"
import { getContractsManager, getGenerator } from "../../fixtures"

/**
 * Test suite for the Filplus functionality.
 */
describe("filplus", () => {
    let filplusAssertion: FilplusAssertion

    /**
     * Setup before running the test suite.
     */
    before(function () {
        this.sharedData = {}
        this.sharedData.generator = getGenerator()
        this.sharedData.contractsManager = getContractsManager()
        let filplus = this.sharedData.contractsManager.FilplusEvm()
        filplusAssertion = new FilplusAssertion(filplus)
    })

    /**
     * Test case for setting the minimum regions per dataset rule.
     */
    it("setDatasetRuleMinRegionsPerDataset", async function () {
        await filplusAssertion.setDatasetRuleMinRegionsPerDatasetAssertion(5)
    })

    /**
     * Test case for setting the default maximum replicas per country rule.
     */
    it("setDatasetRuleDefaultMaxReplicasPerCountry", async function () {
        await filplusAssertion.setDatasetRuleDefaultMaxReplicasPerCountryAssertion(
            5
        )
    })

    /**
     * Test case for setting the maximum replicas in a country rule.
     */
    it("setDatasetRuleMaxReplicasInCountry", async function () {
        await filplusAssertion.setDatasetRuleMaxReplicasInCountryAssertion(5, 5)
    })

    /**
     * Test case for setting the maximum replicas per city rule.
     */
    it("setDatasetRuleMaxReplicasPerCity", async function () {
        await filplusAssertion.setDatasetRuleMaxReplicasPerCityAssertion(5)
    })

    /**
     * Test case for setting the maximum proportion of mapping files to dataset rule.
     */
    it("setDatasetRuleMaxProportionOfMappingFilesToDataset", async function () {
        await filplusAssertion.setDatasetRuleMaxProportionOfMappingFilesToDatasetAssertion(
            5
        )
    })

    /**
     * Test case for setting the minimum SPs per dataset rule.
     */
    it("setDatasetRuleMinSPsPerDataset", async function () {
        await filplusAssertion.setDatasetRuleMinSPsPerDatasetAssertion(5)
    })

    /**
     * Test case for setting the maximum replicas per SP rule.
     */
    it("setDatasetRuleMaxReplicasPerSP", async function () {
        await filplusAssertion.setDatasetRuleMaxReplicasPerSPAssertion(5)
    })

    /**
     * Test case for setting the minimum total replicas per dataset rule.
     */
    it("setDatasetRuleMinTotalReplicasPerDataset", async function () {
        await filplusAssertion.setDatasetRuleMinTotalReplicasPerDatasetAssertion(
            5
        )
    })

    /**
     * Test case for setting the maximum total replicas per dataset rule.
     */
    it("setDatasetRuleMaxTotalReplicasPerDataset", async function () {
        await filplusAssertion.setDatasetRuleMaxTotalReplicasPerDatasetAssertion(
            5
        )
    })

    /**
     * Test case for setting the maximum allocated size per time rule in datacap.
     */
    it("setDatacapRulesMaxAllocatedSizePerTime", async function () {
        await filplusAssertion.setDatacapRulesMaxAllocatedSizePerTimeAssertion(
            5
        )
    })

    /**
     * Test case for setting the maximum remaining percentage for the next rule in datacap.
     */
    it("setDatacapRulesMaxRemainingPercentageForNext", async function () {
        await filplusAssertion.setDatacapRulesMaxRemainingPercentageForNextAssertion(
            5
        )
    })

    /**
     * Test case for compliance rule: "isCompliantRuleMaxProportionOfMappingFilesToDataset".
     */
    it("isCompliantRuleMaxProportionOfMappingFilesToDataset", async function () {
        await filplusAssertion.isCompliantRuleMaxProportionOfMappingFilesToDatasetAssertion(
            40,
            10000,
            true
        )
        await filplusAssertion.isCompliantRuleMaxProportionOfMappingFilesToDatasetAssertion(
            400,
            10000,
            false
        )
    })

    /**
     * Test case for compliance rule: "isCompliantRuleGeolocation".
     */
    it("isCompliantRuleGeolocation", async function () {
        let requirements =
            this.sharedData.generator.generateDatasetRequirements(5, 1)

        await filplusAssertion.isCompliantRuleGeolocationAssertion(
            requirements.regions,
            requirements.countrys,
            requirements.citys,
            true
        )
        await filplusAssertion.isCompliantRuleGeolocationAssertion(
            [BigInt(1), BigInt(1), BigInt(1), BigInt(1), BigInt(1)],
            requirements.countrys,
            requirements.citys,
            false
        )
        await filplusAssertion.isCompliantRuleGeolocationAssertion(
            requirements.regions,
            [BigInt(1), BigInt(1), BigInt(1), BigInt(1), BigInt(1)],
            requirements.citys,
            false
        )
        await filplusAssertion.isCompliantRuleGeolocationAssertion(
            requirements.regions,
            requirements.countrys,
            [[BigInt(1)], [BigInt(1)], [BigInt(1)], [BigInt(1)], [BigInt(1)]],
            false
        )
    })

    /**
     * Test case for compliance rule: "isCompliantRuleTotalReplicasPerDataset".
     */
    it("isCompliantRuleTotalReplicasPerDataset", async function () {
        let requirements =
            this.sharedData.generator.generateDatasetRequirements(5, 1)

        await filplusAssertion.isCompliantRuleTotalReplicasPerDatasetAssertion(
            requirements.dataPreparers,
            requirements.storageProviders,
            requirements.regions,
            requirements.countrys,
            requirements.citys,
            true
        )
        await filplusAssertion.isCompliantRuleTotalReplicasPerDatasetAssertion(
            requirements.dataPreparers,
            requirements.storageProviders,
            [BigInt(1), BigInt(1), BigInt(1), BigInt(1), BigInt(1)],
            requirements.countrys,
            requirements.citys,
            false
        )
        await filplusAssertion.isCompliantRuleTotalReplicasPerDatasetAssertion(
            requirements.dataPreparers,
            requirements.storageProviders,
            requirements.regions,
            [BigInt(1), BigInt(1), BigInt(1), BigInt(1), BigInt(1)],
            requirements.citys,
            false
        )
        await filplusAssertion.isCompliantRuleTotalReplicasPerDatasetAssertion(
            requirements.dataPreparers,
            requirements.storageProviders,
            requirements.regions,
            requirements.countrys,
            [[BigInt(1)], [BigInt(1)], [BigInt(1)], [BigInt(1)], [BigInt(1)]],
            false
        )

        let dataPreparers = [
            requirements.dataPreparers[0],
            requirements.dataPreparers[0],
            requirements.dataPreparers[0],
            requirements.dataPreparers[0],
            requirements.dataPreparers[0],
        ]
        let storageProviders = [
            requirements.storageProviders[0],
            requirements.storageProviders[0],
            requirements.storageProviders[0],
            requirements.storageProviders[0],
            requirements.storageProviders[0],
        ]
        await filplusAssertion.isCompliantRuleTotalReplicasPerDatasetAssertion(
            dataPreparers,
            requirements.storageProviders,
            requirements.regions,
            requirements.countrys,
            requirements.citys,
            false
        )
        await filplusAssertion.isCompliantRuleTotalReplicasPerDatasetAssertion(
            requirements.dataPreparers,
            storageProviders,
            requirements.regions,
            requirements.countrys,
            requirements.citys,
            false
        )
    })

    /**
     * Test case for compliance rule: "isCompliantRuleMinSPsPerDataset".
     */
    it("isCompliantRuleMinSPsPerDataset", async function () {
        await filplusAssertion.isCompliantRuleMinSPsPerDatasetAssertion(
            10,
            5,
            5,
            true
        )
        await filplusAssertion.isCompliantRuleMinSPsPerDatasetAssertion(
            10,
            8,
            1,
            false
        )
    })

    /**
     * Test case for compliance rule: "isCompliantRuleMaxReplicasPerSP".
     */
    it("isCompliantRuleMaxReplicasPerSP", async function () {
        await filplusAssertion.isCompliantRuleMaxReplicasPerSPAssertion(
            10,
            true
        )
        await filplusAssertion.isCompliantRuleMaxReplicasPerSPAssertion(
            11,
            false
        )
    })
})
