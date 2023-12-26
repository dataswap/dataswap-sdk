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
import { FilplusEvm } from "../../../src/core/filplus/repo/evm"
import { handleEvmError } from "../../shared/error"
import { IFilplusAssertion } from "../../interfaces/assertions/core/IFilplusAssertion"

/**
 * Class representing assertions related to Filplus operations.
 * @class
 * @implements {IFilplusAssertion}
 */
export class FilplusAssertion implements IFilplusAssertion {
    private filplus: FilplusEvm

    /**
     * Creates an instance of FilplusAssertion.
     * @param {FilplusEvm} filplus - The FilplusEvm instance to perform assertions on.
     */
    constructor(filplus: FilplusEvm) {
        this.filplus = filplus
    }

    /**
     * Asserts the maximum replicas allowed in a country for a dataset rule.
     * @param {number} countryCode - The country code for the dataset rule.
     * @param {number} expectCount - The expected maximum replicas count.
     * @returns {Promise<void>}
     */
    async getDatasetRuleMaxReplicasInCountryAssertion(countryCode: number, expectCount: number): Promise<void> {
        let count = await handleEvmError(this.filplus.getDatasetRuleMaxReplicasInCountry(countryCode))
        assert.isTrue(equal(expectCount, count.data), "Dataset rule max replicas in country should be expect count")
    }

    /**
     * Asserts the minimum regions required per dataset for a dataset rule.
     * @param {number} expectCount - The expected minimum regions count.
     * @returns {Promise<void>}
     */
    async datasetRuleMinRegionsPerDatasetAssertion(expectCount: number): Promise<void> {
        let count = await handleEvmError(this.filplus.datasetRuleMinRegionsPerDataset())
        assert.isTrue(equal(expectCount, count.data), "Dataset rule min regions per dataset should be expect count")
    }

    /**
     * Asserts the default maximum replicas per country for a dataset rule.
     * @param {number} expectCount - The expected default maximum replicas count.
     * @returns {Promise<void>}
     */
    async datasetRuleDefaultMaxReplicasPerCountryAssertion(expectCount: number): Promise<void> {
        let count = await handleEvmError(this.filplus.datasetRuleDefaultMaxReplicasPerCountry())
        assert.isTrue(equal(expectCount, count.data), "Dataset rule default max replicas per country should be expect count")
    }

    /**
     * Asserts the maximum replicas per city for a dataset rule.
     * @param {number} expectCount - The expected maximum replicas count.
     * @returns {Promise<void>}
     */
    async datasetRuleMaxReplicasPerCityAssertion(expectCount: number): Promise<void> {
        let count = await handleEvmError(this.filplus.datasetRuleMaxReplicasPerCity())
        assert.isTrue(equal(expectCount, count.data), "Dataset rule max replicas per city should be expect count")
    }

    /**
     * Asserts the maximum proportion of mapping files to the dataset for a dataset rule.
     * @param {number} expectProportion - The expected maximum proportion.
     * @returns {Promise<void>}
     */
    async datasetRuleMaxProportionOfMappingFilesToDatasetAssertion(expectProportion: number): Promise<void> {
        let count = await handleEvmError(this.filplus.datasetRuleMaxProportionOfMappingFilesToDataset())
        assert.isTrue(equal(expectProportion, count.data), "Dataset rule max proportion of mappingFiles to dataset should be expect count")
    }

    /**
     * Asserts the minimum SPs (Storage Providers) required per dataset for a dataset rule.
     * @param {number} expectCount - The expected minimum SPs count.
     * @returns {Promise<void>}
     */
    async datasetRuleMinSPsPerDatasetAssertion(expectCount: number): Promise<void> {
        let count = await handleEvmError(this.filplus.datasetRuleMinSPsPerDataset())
        assert.isTrue(equal(expectCount, count.data), "Dataset rule min SPs per dataset should be expect count")
    }

    /**
     * Asserts the maximum replicas per SP (Storage Provider) for a dataset rule.
     * @param {number} expectCount - The expected maximum replicas count.
     * @returns {Promise<void>}
     */
    async datasetRuleMaxReplicasPerSPAssertion(expectCount: number): Promise<void> {
        let count = await handleEvmError(this.filplus.datasetRuleMaxReplicasPerSP())
        assert.isTrue(equal(expectCount, count.data), "Dataset rule max replicas per SP should be expect count")
    }

    /**
     * Asserts the minimum total replicas per dataset for a dataset rule.
     * @param {number} expectCount - The expected minimum total replicas count.
     * @returns {Promise<void>}
     */
    async datasetRuleMinTotalReplicasPerDatasetAssertion(expectCount: number): Promise<void> {
        let count = await handleEvmError(this.filplus.datasetRuleMinTotalReplicasPerDataset())
        assert.isTrue(equal(expectCount, count.data), "Dataset rule min total replicas per dataset should be expect count")
    }

    /**
     * Asserts the maximum total replicas per dataset for a dataset rule.
     * @param {number} expectCount - The expected maximum total replicas count.
     * @returns {Promise<void>}
     */
    async datasetRuleMaxTotalReplicasPerDatasetAssertion(expectCount: number): Promise<void> {
        let count = await handleEvmError(this.filplus.datasetRuleMaxTotalReplicasPerDataset())
        assert.isTrue(equal(expectCount, count.data), "Dataset rule max total replicas per dataset should be expect count")
    }

    /**
     * Asserts the maximum allocated size per time for data cap rules.
     * @param {number} expectSize - The expected maximum allocated size.
     * @returns {Promise<void>}
     */
    async datacapRulesMaxAllocatedSizePerTimeAssertion(expectSize: number): Promise<void> {
        let count = await handleEvmError(this.filplus.datacapRulesMaxAllocatedSizePerTime())
        assert.isTrue(equal(expectSize, count.data), "Dataset rule max allocated size per time should be expect count")
    }

    /**
     * Asserts the maximum remaining percentage for the next data cap rule.
     * @param {number} expectPercentage - The expected maximum remaining percentage.
     * @returns {Promise<void>}
     */
    async datacapRulesMaxRemainingPercentageForNextAssertion(expectPercentage: number): Promise<void> {
        let count = await handleEvmError(this.filplus.datacapRulesMaxRemainingPercentageForNext())
        assert.isTrue(equal(expectPercentage, count.data), "Dataset rule max remaining percentage for next should be expect count")
    }

    /**
     * Asserts whether a set of geolocation parameters complies with a rule.
     * @param {number[]} regions - The regions for the rule.
     * @param {number[]} countrys - The countries for the rule.
     * @param {number[][]} citys - The cities for the rule.
     * @param {boolean} expectHas - The expected compliance status.
     * @returns {Promise<void>}
     */
    async isCompliantRuleGeolocationAssertion(regions: number[], countrys: number[], citys: number[][], expectHas: boolean): Promise<void> {
        let count = await handleEvmError(this.filplus.isCompliantRuleGeolocation(regions, countrys, citys))
        assert.isTrue(equal(expectHas, count.data), "Is compliant rule geolocation should be expect")
    }

    /**
     * Asserts whether the proportion of mapping files to the dataset complies with a rule.
     * @param {number} mappingFilesSize - The size of mapping files.
     * @param {number} sourceSize - The size of the source dataset.
     * @param {boolean} expectHas - The expected compliance status.
     * @returns {Promise<void>}
     */
    async isCompliantRuleMaxProportionOfMappingFilesToDatasetAssertion(mappingFilesSize: number, sourceSize: number, expectHas: boolean): Promise<void> {
        let count = await handleEvmError(this.filplus.isCompliantRuleMaxProportionOfMappingFilesToDataset(mappingFilesSize, sourceSize))
        assert.isTrue(equal(expectHas, count.data), "Is compliant rule max proportion of mappingFiles to dataset should be expect")
    }

    /**
     * Asserts whether the total replicas per dataset comply with a rule.
     * @param {string[][]} dataPreparers - The data preparers for the rule.
     * @param {string[][]} storageProviders - The storage providers for the rule.
     * @param {number[]} regions - The regions for the rule.
     * @param {number[]} countrys - The countries for the rule.
     * @param {number[][]} citys - The cities for the rule.
     * @param {boolean} expectHas - The expected compliance status.
     * @returns {Promise<void>}
     */
    async isCompliantRuleTotalReplicasPerDatasetAssertion(dataPreparers: string[][], storageProviders: string[][], regions: number[], countrys: number[], citys: number[][], expectHas: boolean): Promise<void> {
        let count = await handleEvmError(this.filplus.isCompliantRuleTotalReplicasPerDataset(dataPreparers, storageProviders, regions, countrys, citys))
        assert.isTrue(equal(expectHas, count.data), "Is compliant rule total replicas per dataset should be expect")
    }

    /**
     * Asserts whether the minimum SPs (Storage Providers) per dataset comply with a rule.
     * @param {number} requirementValue - The required SPs count.
     * @param {number} totalExists - The total existing SPs count.
     * @param {number} uniqueExists - The unique existing SPs count.
     * @param {boolean} expectHas - The expected compliance status.
     * @returns {Promise<void>}
     */
    async isCompliantRuleMinSPsPerDatasetAssertion(requirementValue: number, totalExists: number, uniqueExists: number, expectHas: boolean): Promise<void> {
        let count = await handleEvmError(this.filplus.isCompliantRuleMinSPsPerDataset(requirementValue, totalExists, uniqueExists))
        assert.isTrue(equal(expectHas, count.data), "Is compliant rule min SPs per dataset should be expect")
    }

    /**
     * Asserts whether the maximum replicas per SP (Storage Provider) comply with a rule.
     * @param {number} value - The maximum replicas count.
     * @param {boolean} expectHas - The expected compliance status.
     * @returns {Promise<void>}
     */
    async isCompliantRuleMaxReplicasPerSPAssertion(value: number, expectHas: boolean): Promise<void> {
        let count = await handleEvmError(this.filplus.isCompliantRuleMaxReplicasPerSP(value))
        assert.isTrue(equal(expectHas, count.data), "Is compliant rule max replicas per SP should be expect")
    }

    /**
     * Sets the minimum regions required per dataset for a dataset rule.
     * @param {number} newValue - The new minimum regions count.
     * @returns {Promise<void>}
     */
    async setDatasetRuleMinRegionsPerDatasetAssertion(newValue: number): Promise<void> {
        await handleEvmError(this.filplus.setDatasetRuleMinRegionsPerDataset(newValue))
        this.datasetRuleMinRegionsPerDatasetAssertion(newValue)
    }

    /**
     * Sets the default maximum replicas per country for a dataset rule.
     * @param {number} newValue - The new default maximum replicas count.
     * @returns {Promise<void>}
     */
    async setDatasetRuleDefaultMaxReplicasPerCountryAssertion(newValue: number): Promise<void> {
        await handleEvmError(this.filplus.setDatasetRuleDefaultMaxReplicasPerCountry(newValue))
        this.datasetRuleDefaultMaxReplicasPerCountryAssertion(newValue)
    }

    /**
     * Sets the maximum replicas in a country for a dataset rule.
     * @param {number} countryCode - The country code for the dataset rule.
     * @param {number} newValue - The new maximum replicas count.
     * @returns {Promise<void>}
     */
    async setDatasetRuleMaxReplicasInCountryAssertion(countryCode: number, newValue: number): Promise<void> {
        await handleEvmError(this.filplus.setDatasetRuleMaxReplicasInCountry(countryCode, newValue))
        this.getDatasetRuleMaxReplicasInCountryAssertion(countryCode, newValue)
    }

    /**
     * Sets the maximum replicas per city for a dataset rule.
     * @param {number} newValue - The new maximum replicas count.
     * @returns {Promise<void>}
     */
    async setDatasetRuleMaxReplicasPerCityAssertion(newValue: number): Promise<void> {
        await handleEvmError(this.filplus.setDatasetRuleMaxReplicasPerCity(newValue))
        this.datasetRuleMaxReplicasPerCityAssertion(newValue)
    }

    /**
     * Sets the maximum proportion of mapping files to the dataset for a dataset rule.
     * @param {number} newValue - The new maximum proportion.
     * @returns {Promise<void>}
     */
    async setDatasetRuleMaxProportionOfMappingFilesToDatasetAssertion(newValue: number): Promise<void> {
        await handleEvmError(this.filplus.setDatasetRuleMaxProportionOfMappingFilesToDataset(newValue))
        this.datasetRuleMaxProportionOfMappingFilesToDatasetAssertion(newValue)
    }

    /**
     * Sets the minimum SPs (Storage Providers) required per dataset for a dataset rule.
     * @param {number} newValue - The new minimum SPs count.
     * @returns {Promise<void>}
     */
    async setDatasetRuleMinSPsPerDatasetAssertion(newValue: number): Promise<void> {
        await handleEvmError(this.filplus.setDatasetRuleMinSPsPerDataset(newValue))
        this.datasetRuleMinSPsPerDatasetAssertion(newValue)
    }

    /**
     * Sets the maximum replicas per SP (Storage Provider) for a dataset rule.
     * @param {number} newValue - The new maximum replicas count.
     * @returns {Promise<void>}
     */
    async setDatasetRuleMaxReplicasPerSPAssertion(newValue: number): Promise<void> {
        await handleEvmError(this.filplus.setDatasetRuleMaxReplicasPerSP(newValue))
        this.datasetRuleMaxReplicasPerSPAssertion(newValue)
    }

    /**
     * Sets the minimum total replicas per dataset for a dataset rule.
     * @param {number} newValue - The new minimum total replicas count.
     * @returns {Promise<void>}
     */
    async setDatasetRuleMinTotalReplicasPerDatasetAssertion(newValue: number): Promise<void> {
        await handleEvmError(this.filplus.setDatasetRuleMinTotalReplicasPerDataset(newValue))
        this.datasetRuleMinTotalReplicasPerDatasetAssertion(newValue)
    }

    /**
     * Sets the maximum total replicas per dataset for a dataset rule.
     * @param {number} newValue - The new maximum total replicas count.
     * @returns {Promise<void>}
     */
    async setDatasetRuleMaxTotalReplicasPerDatasetAssertion(newValue: number): Promise<void> {
        await handleEvmError(this.filplus.setDatasetRuleMaxTotalReplicasPerDataset(newValue))
        this.datasetRuleMaxTotalReplicasPerDatasetAssertion(newValue)
    }

    /**
     * Sets the maximum allocated size per time for data cap rules.
     * @param {number} newValue - The new maximum allocated size.
     * @returns {Promise<void>}
     */
    async setDatacapRulesMaxAllocatedSizePerTimeAssertion(newValue: number): Promise<void> {
        await handleEvmError(this.filplus.setDatacapRulesMaxAllocatedSizePerTime(newValue))
        this.datacapRulesMaxAllocatedSizePerTimeAssertion(newValue)
    }

    /**
     * Sets the maximum remaining percentage for the next data cap rule.
     * @param {number} newValue - The new maximum remaining percentage.
     * @returns {Promise<void>}
     */
    async setDatacapRulesMaxRemainingPercentageForNextAssertion(newValue: number): Promise<void> {
        await handleEvmError(this.filplus.setDatacapRulesMaxRemainingPercentageForNext(newValue))
        this.datacapRulesMaxRemainingPercentageForNextAssertion(newValue)
    }
}