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

import { ReleaseRule } from "../../../../src/core/finance/types"
import {
    EscrowType,
    ReleaseType,
} from "../../../../src/shared/types/financeType"

/**
 * Interface representing assertions related to Filplus operations.
 * @interface
 */
export interface IFilplusAssertion {
    /**
     * Asserts that the income release rule matches the expected release rule.
     *
     * @param type - The escrow type for which to check the income release rule.
     * @param expectReleaseRule - The expected release rule.
     * @returns A promise indicating whether the assertion passed or not.
     */
    getIncomeReleaseRuleAssertion(
        type: EscrowType,
        expectReleaseRule: ReleaseRule
    ): Promise<void>

    /**
     * Asserts that the escrow release rule matches the expected release rule.
     *
     * @param type - The escrow type for which to check the escrow release rule.
     * @param expectReleaseRule - The expected release rule.
     * @returns A promise indicating whether the assertion passed or not.
     */
    getEscrowReleaseRuleAssertion(
        type: EscrowType,
        expectReleaseRule: ReleaseRule
    ): Promise<void>

    /**
     * Asserts that the burn address matches the expected address.
     *
     * @param expectAddress - The expected burn address.
     * @returns A promise indicating whether the assertion passed or not.
     */
    getBurnAddressAssertion(expectAddress: string): Promise<void>

    /**
     * Asserts that the block number per day matches the expected number.
     *
     * @param exceptNumber - The expected block number per day.
     * @returns A promise indicating whether the assertion passed or not.
     */
    getPerDayBlocknumberAssertion(exceptNumber: bigint): Promise<void>

    /**
     * Asserts that the datacap dataset approved lock days match the expected days.
     *
     * @param exceptDays - The expected datacap dataset approved lock days.
     * @returns A promise indicating whether the assertion passed or not.
     */
    getDatacapdatasetApprovedLockDaysAssertion(
        exceptDays: bigint
    ): Promise<void>

    /**
     * Asserts that the datacap collateral max lock days match the expected days.
     *
     * @param exceptDays - The expected datacap collateral max lock days.
     * @returns A promise indicating whether the assertion passed or not.
     */
    getDatacapCollateralMaxLockDaysAssertion(exceptDays: bigint): Promise<void>

    /**
     * Asserts that the challenge audit fee matches the expected fee.
     *
     * @param exceptFee - The expected challenge audit fee.
     * @returns A promise indicating whether the assertion passed or not.
     */
    getChallengeAuditFeeAssertion(exceptFee: bigint): Promise<void>

    /**
     * Asserts that the proof audit fee matches the expected fee.
     *
     * @param exceptFee - The expected proof audit fee.
     * @returns A promise indicating whether the assertion passed or not.
     */
    getProofAuditFeeAssertion(exceptFee: bigint): Promise<void>

    /**
     * Asserts that the dispute audit fee matches the expected fee.
     *
     * @param exceptFee - The expected dispute audit fee.
     * @returns A promise indicating whether the assertion passed or not.
     */
    getDisputeAuditFeeAssertion(exceptFee: bigint): Promise<void>

    /**
     * Asserts that the challenge proofs price per point matches the expected price.
     *
     * @param exceptPrice - The expected challenge proofs price per point.
     * @returns A promise indicating whether the assertion passed or not.
     */
    getChallengeProofsPricePrePointAssertion(exceptPrice: bigint): Promise<void>

    /**
     * Asserts that the challenge proofs submitter count matches the expected count.
     *
     * @param exceptCount - The expected challenge proofs submitter count.
     * @returns A promise indicating whether the assertion passed or not.
     */
    getChallengeProofsSubmiterCountAssertion(exceptCount: number): Promise<void>

    /**
     * Asserts that the datacap chunk land price per byte matches the expected price.
     *
     * @param exceptPrice - The expected datacap chunk land price per byte.
     * @returns A promise indicating whether the assertion passed or not.
     */
    getDatacapChunkLandPricePreByteAssertion(exceptPrice: bigint): Promise<void>

    /**
     * Asserts that the datacap price per byte matches the expected price.
     *
     * @param exceptPrice - The expected datacap price per byte.
     * @returns A promise indicating whether the assertion passed or not.
     */
    getDatacapPricePreByteAssertion(exceptPrice: bigint): Promise<void>

    /**
     * Asserts that the dataset rule's minimum proof timeout matches the expected timeout.
     *
     * @param exceptTimeout - The expected minimum proof timeout.
     * @returns A promise indicating whether the assertion passed or not.
     */
    datasetRuleMinProofTimeoutAssertion(exceptTimeout: bigint): Promise<void>

    /**
     * Asserts that the dataset rule's minimum audit timeout matches the expected timeout.
     *
     * @param exceptTimeout - The expected minimum audit timeout.
     * @returns A promise indicating whether the assertion passed or not.
     */
    datasetRuleMinAuditTimeoutAssertion(exceptTimeout: bigint): Promise<void>

    /**
     * Asserts that the dataset rule's requirement timeout matches the expected timeout.
     *
     * @param exceptTimeout - The expected requirement timeout.
     * @returns A promise indicating whether the assertion passed or not.
     */
    datasetRuleRequirementTimeoutAssertion(exceptTimeout: bigint): Promise<void>
    /**
     * Asserts the maximum replicas allowed in a country for a dataset rule.
     * @param {number} countryCode - The country code for the dataset rule.
     * @param {number} expectCount - The expected maximum replicas count.
     * @returns {Promise<void>}
     */
    getDatasetRuleMaxReplicasInCountryAssertion(
        countryCode: number,
        expectCount: number
    ): Promise<void>

    /**
     * Asserts the minimum regions required per dataset for a dataset rule.
     * @param {number} expectCount - The expected minimum regions count.
     * @returns {Promise<void>}
     */
    datasetRuleMinRegionsPerDatasetAssertion(expectCount: number): Promise<void>

    /**
     * Asserts the default maximum replicas per country for a dataset rule.
     * @param {number} expectCount - The expected default maximum replicas count.
     * @returns {Promise<void>}
     */
    datasetRuleDefaultMaxReplicasPerCountryAssertion(
        expectCount: number
    ): Promise<void>

    /**
     * Asserts the maximum replicas per city for a dataset rule.
     * @param {number} expectCount - The expected maximum replicas count.
     * @returns {Promise<void>}
     */
    datasetRuleMaxReplicasPerCityAssertion(expectCount: number): Promise<void>

    /**
     * Asserts the maximum proportion of mapping files to the dataset for a dataset rule.
     * @param {number} expectProportion - The expected maximum proportion.
     * @returns {Promise<void>}
     */
    datasetRuleMaxProportionOfMappingFilesToDatasetAssertion(
        expectProportion: number
    ): Promise<void>

    /**
     * Asserts the minimum SPs (Storage Providers) required per dataset for a dataset rule.
     * @param {number} expectCount - The expected minimum SPs count.
     * @returns {Promise<void>}
     */
    datasetRuleMinSPsPerDatasetAssertion(expectCount: number): Promise<void>

    /**
     * Asserts the maximum replicas per SP (Storage Provider) for a dataset rule.
     * @param {number} expectCount - The expected maximum replicas count.
     * @returns {Promise<void>}
     */
    datasetRuleMaxReplicasPerSPAssertion(expectCount: number): Promise<void>

    /**
     * Asserts the minimum total replicas per dataset for a dataset rule.
     * @param {number} expectCount - The expected minimum total replicas count.
     * @returns {Promise<void>}
     */
    datasetRuleMinTotalReplicasPerDatasetAssertion(
        expectCount: number
    ): Promise<void>

    /**
     * Asserts the maximum total replicas per dataset for a dataset rule.
     * @param {number} expectCount - The expected maximum total replicas count.
     * @returns {Promise<void>}
     */
    datasetRuleMaxTotalReplicasPerDatasetAssertion(
        expectCount: number
    ): Promise<void>

    /**
     * Asserts the maximum allocated size per time for data cap rules.
     * @param {number} expectSize - The expected maximum allocated size.
     * @returns {Promise<void>}
     */
    datacapRulesMaxAllocatedSizePerTimeAssertion(
        expectSize: number
    ): Promise<void>

    /**
     * Asserts the maximum remaining percentage for the next data cap rule.
     * @param {number} expectPercentage - The expected maximum remaining percentage.
     * @returns {Promise<void>}
     */
    datacapRulesMaxRemainingPercentageForNextAssertion(
        expectPercentage: number
    ): Promise<void>

    /**
     * Asserts whether a set of geolocation parameters complies with a rule.
     * @param {bigint[]} regions - The regions for the rule.
     * @param {bigint[]} countrys - The countries for the rule.
     * @param {bigint[][]} citys - The cities for the rule.
     * @param {boolean} expectHas - The expected compliance status.
     * @returns {Promise<void>}
     */
    isCompliantRuleGeolocationAssertion(
        regions: bigint[],
        countrys: bigint[],
        citys: bigint[][],
        expectHas: boolean
    ): Promise<void>

    /**
     * Asserts whether the proportion of mapping files to the dataset complies with a rule.
     * @param {number} mappingFilesSize - The size of mapping files.
     * @param {number} sourceSize - The size of the source dataset.
     * @param {boolean} expectHas - The expected compliance status.
     * @returns {Promise<void>}
     */
    isCompliantRuleMaxProportionOfMappingFilesToDatasetAssertion(
        mappingFilesSize: number,
        sourceSize: number,
        expectHas: boolean
    ): Promise<void>

    /**
     * Asserts whether the total replicas per dataset comply with a rule.
     * @param {string[][]} dataPreparers - The data preparers for the rule.
     * @param {string[][]} storageProviders - The storage providers for the rule.
     * @param {bigint[]} regions - The regions for the rule.
     * @param {bigint[]} countrys - The countries for the rule.
     * @param {bigint[][]} citys - The cities for the rule.
     * @param {boolean} expectHas - The expected compliance status.
     * @returns {Promise<void>}
     */
    isCompliantRuleTotalReplicasPerDatasetAssertion(
        dataPreparers: string[][],
        storageProviders: string[][],
        regions: bigint[],
        countrys: bigint[],
        citys: bigint[][],
        expectHas: boolean
    ): Promise<void>

    /**
     * Asserts whether the minimum SPs (Storage Providers) per dataset comply with a rule.
     * @param {number} requirementValue - The required SPs count.
     * @param {number} totalExists - The total existing SPs count.
     * @param {number} uniqueExists - The unique existing SPs count.
     * @param {boolean} expectHas - The expected compliance status.
     * @returns {Promise<void>}
     */
    isCompliantRuleMinSPsPerDatasetAssertion(
        requirementValue: number,
        totalExists: number,
        uniqueExists: number,
        expectHas: boolean
    ): Promise<void>

    /**
     * Asserts whether the maximum replicas per SP (Storage Provider) comply with a rule.
     * @param {number} value - The maximum replicas count.
     * @param {boolean} expectHas - The expected compliance status.
     * @returns {Promise<void>}
     */
    isCompliantRuleMaxReplicasPerSPAssertion(
        value: number,
        expectHas: boolean
    ): Promise<void>

    /**
     * Sets the income release rule for a specific escrow type.
     *
     * @param type - The type of escrow for which the income release rule is set.
     * @param releaseType - The type of release for the income.
     * @param delayBlocks - The number of blocks to delay before the income release.
     * @param durationBlocks - The duration for which the income release is active.
     * @returns A promise indicating the success of the operation.
     */
    setIncomeReleaseRuleAssertion(
        type: EscrowType,
        releaseType: ReleaseType,
        delayBlocks: bigint,
        durationBlocks: bigint
    ): Promise<void>

    /**
     * Sets the escrow release rule for a specific escrow type.
     *
     * @param type - The type of escrow for which the escrow release rule is set.
     * @param releaseType - The type of release for the escrow.
     * @param delayBlocks - The number of blocks to delay before the escrow release.
     * @param durationBlocks - The duration for which the escrow release is active.
     * @returns A promise indicating the success of the operation.
     */
    setEscrowReleaseRuleAssertion(
        type: EscrowType,
        releaseType: ReleaseType,
        delayBlocks: bigint,
        durationBlocks: bigint
    ): Promise<void>

    /**
     * Sets the datacap price per byte.
     *
     * @param newValue - The new value for the datacap price per byte.
     * @returns A promise indicating the success of the operation.
     */
    setDatacapPricePreByteAssertion(newValue: bigint): Promise<void>

    /**
     * Sets the datacap chunk land price per byte.
     *
     * @param newValue - The new value for the datacap chunk land price per byte.
     * @returns A promise indicating the success of the operation.
     */
    setDatacapChunkLandPricePreByteAssertion(newValue: bigint): Promise<void>

    /**
     * Sets the count of challenge proofs submitter.
     *
     * @param newValue - The new value for the challenge proofs submitter count.
     * @returns A promise indicating the success of the operation.
     */
    setChallengeProofsSubmiterCountAssertion(newValue: number): Promise<void>

    /**
     * Sets the lock duration in days for approved datasets in datacap.
     *
     * @param newValue - The new value for the lock duration in days for approved datasets.
     * @returns A promise indicating the success of the operation.
     */
    setDatacapdatasetApprovedLockDaysAssertion(newValue: bigint): Promise<void>

    /**
     * Sets the maximum lock duration in days for collateral in datacap.
     *
     * @param newValue - The new value for the maximum lock duration in days for collateral.
     * @returns A promise indicating the success of the operation.
     */
    setDatacapCollateralMaxLockDaysAssertion(newValue: bigint): Promise<void>

    /**
     * Sets the audit fee for challenges.
     *
     * @param newValue - The new value for the challenge audit fee.
     * @returns A promise indicating the success of the operation.
     */
    setChallengeAuditFeeAssertion(newValue: bigint): Promise<void>

    /**
     * Sets the audit fee for proofs.
     *
     * @param newValue - The new value for the proof audit fee.
     * @returns A promise indicating the success of the operation.
     */
    setProofAuditFeeAssertion(newValue: bigint): Promise<void>

    /**
     * Sets the audit fee for disputes.
     *
     * @param newValue - The new value for the dispute audit fee.
     * @returns A promise indicating the success of the operation.
     */
    setDisputeAuditFeeAssertion(newValue: bigint): Promise<void>

    /**
     * Sets the price per point for challenge proofs.
     *
     * @param newValue - The new value for the challenge proofs price per point.
     * @returns A promise indicating the success of the operation.
     */
    setChallengeProofsPricePrePointAssertion(newValue: bigint): Promise<void>

    /**
     * Sets the minimum regions required per dataset for a dataset rule.
     * @param {number} newValue - The new minimum regions count.
     * @returns {Promise<void>}
     */
    setDatasetRuleMinRegionsPerDatasetAssertion(newValue: number): Promise<void>

    /**
     * Sets the default maximum replicas per country for a dataset rule.
     * @param {number} newValue - The new default maximum replicas count.
     * @returns {Promise<void>}
     */
    setDatasetRuleDefaultMaxReplicasPerCountryAssertion(
        newValue: number
    ): Promise<void>

    /**
     * Sets the maximum replicas in a country for a dataset rule.
     * @param {number} countryCode - The country code for the dataset rule.
     * @param {number} newValue - The new maximum replicas count.
     * @returns {Promise<void>}
     */
    setDatasetRuleMaxReplicasInCountryAssertion(
        countryCode: number,
        newValue: number
    ): Promise<void>

    /**
     * Sets the maximum replicas per city for a dataset rule.
     * @param {number} newValue - The new maximum replicas count.
     * @returns {Promise<void>}
     */
    setDatasetRuleMaxReplicasPerCityAssertion(newValue: number): Promise<void>

    /**
     * Sets the maximum proportion of mapping files to the dataset for a dataset rule.
     * @param {number} newValue - The new maximum proportion.
     * @returns {Promise<void>}
     */
    setDatasetRuleMaxProportionOfMappingFilesToDatasetAssertion(
        newValue: number
    ): Promise<void>

    /**
     * Sets the minimum SPs (Storage Providers) required per dataset for a dataset rule.
     * @param {number} newValue - The new minimum SPs count.
     * @returns {Promise<void>}
     */
    setDatasetRuleMinSPsPerDatasetAssertion(newValue: number): Promise<void>

    /**
     * Sets the maximum replicas per SP (Storage Provider) for a dataset rule.
     * @param {number} newValue - The new maximum replicas count.
     * @returns {Promise<void>}
     */
    setDatasetRuleMaxReplicasPerSPAssertion(newValue: number): Promise<void>

    /**
     * Sets the minimum total replicas per dataset for a dataset rule.
     * @param {number} newValue - The new minimum total replicas count.
     * @returns {Promise<void>}
     */
    setDatasetRuleMinTotalReplicasPerDatasetAssertion(
        newValue: number
    ): Promise<void>

    /**
     * Sets the maximum total replicas per dataset for a dataset rule.
     * @param {number} newValue - The new maximum total replicas count.
     * @returns {Promise<void>}
     */
    setDatasetRuleMaxTotalReplicasPerDatasetAssertion(
        newValue: number
    ): Promise<void>

    /**
     * Sets the maximum allocated size per time for data cap rules.
     * @param {number} newValue - The new maximum allocated size.
     * @returns {Promise<void>}
     */
    setDatacapRulesMaxAllocatedSizePerTimeAssertion(
        newValue: number
    ): Promise<void>

    /**
     * Sets the maximum remaining percentage for the next data cap rule.
     * @param {number} newValue - The new maximum remaining percentage.
     * @returns {Promise<void>}
     */
    setDatacapRulesMaxRemainingPercentageForNextAssertion(
        newValue: number
    ): Promise<void>
}
