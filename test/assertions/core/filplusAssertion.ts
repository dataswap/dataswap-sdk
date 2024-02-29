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

import { ReleaseRule } from "../../../src/core/finance/types"
import { EscrowType, ReleaseType } from "../../../src/shared/types/financeType"

/**
 * Class representing assertions related to Filplus operations.
 * @class
 * @implements {IFilplusAssertion}
 */
export class FilplusAssertion implements IFilplusAssertion {
    private filplus: FilplusEvm

    /**
     * Constructor for the FilplusAssertion class.
     *
     * @param filplus - An instance of the FilplusEvm class.
     */
    constructor(filplus: FilplusEvm) {
        this.filplus = filplus
    }

    /**
     * Asserts that the income release rule matches the expected release rule.
     *
     * @param type - The escrow type for which to check the income release rule.
     * @param expectReleaseRule - The expected release rule.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async getIncomeReleaseRuleAssertion(
        type: EscrowType,
        expectReleaseRule: ReleaseRule
    ): Promise<void> {
        let releaseRule = await handleEvmError(
            this.filplus.getIncomeReleaseRule(type)
        )
        assert.isTrue(
            expectReleaseRule.equal(releaseRule.data),
            "releaseRule should be expect"
        )
    }

    /**
     * Asserts that the escrow release rule matches the expected release rule.
     *
     * @param type - The escrow type for which to check the escrow release rule.
     * @param expectReleaseRule - The expected release rule.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async getEscrowReleaseRuleAssertion(
        type: EscrowType,
        expectReleaseRule: ReleaseRule
    ): Promise<void> {
        let releaseRule = await handleEvmError(
            this.filplus.getEscrowReleaseRule(type)
        )
        assert.isTrue(
            expectReleaseRule.equal(releaseRule.data),
            "releaseRule should be expect"
        )
    }

    /**
     * Asserts that the burn address matches the expected address.
     *
     * @param expectAddress - The expected burn address.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async getBurnAddressAssertion(expectAddress: string): Promise<void> {
        let address = await handleEvmError(this.filplus.getBurnAddress())
        assert.isTrue(
            equal(expectAddress, address.data),
            "address should be expect"
        )
    }

    /**
     * Asserts that the block number per day matches the expected number.
     *
     * @param exceptNumber - The expected block number per day.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async getPerDayBlocknumberAssertion(exceptNumber: bigint): Promise<void> {
        let number = await handleEvmError(this.filplus.getPerDayBlocknumber())
        assert.isTrue(
            equal(exceptNumber, number.data),
            "number should be expect"
        )
    }

    /**
     * Asserts that the datacap dataset approved lock days match the expected days.
     *
     * @param exceptDays - The expected datacap dataset approved lock days.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async getDatacapdatasetApprovedLockDaysAssertion(
        exceptDays: bigint
    ): Promise<void> {
        let days = await handleEvmError(
            this.filplus.getDatacapdatasetApprovedLockDays()
        )
        assert.isTrue(equal(exceptDays, days.data), "days should be expect")
    }

    /**
     * Asserts that the datacap collateral max lock days match the expected days.
     *
     * @param exceptDays - The expected datacap collateral max lock days.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async getDatacapCollateralMaxLockDaysAssertion(
        exceptDays: bigint
    ): Promise<void> {
        let days = await handleEvmError(
            this.filplus.getDatacapCollateralMaxLockDays()
        )
        assert.isTrue(equal(exceptDays, days.data), "days should be expect")
    }

    /**
     * Asserts that the challenge audit fee matches the expected fee.
     *
     * @param exceptFee - The expected challenge audit fee.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async getChallengeAuditFeeAssertion(exceptFee: bigint): Promise<void> {
        let fee = await handleEvmError(this.filplus.getChallengeAuditFee())
        assert.isTrue(equal(exceptFee, fee.data), "fee should be expect")
    }

    /**
     * Asserts that the proof audit fee matches the expected fee.
     *
     * @param exceptFee - The expected proof audit fee.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async getProofAuditFeeAssertion(exceptFee: bigint): Promise<void> {
        let fee = await handleEvmError(this.filplus.getProofAuditFee())
        assert.isTrue(equal(exceptFee, fee.data), "fee should be expect")
    }

    /**
     * Asserts that the dispute audit fee matches the expected fee.
     *
     * @param exceptFee - The expected dispute audit fee.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async getDisputeAuditFeeAssertion(exceptFee: bigint): Promise<void> {
        let fee = await handleEvmError(this.filplus.getDisputeAuditFee())
        assert.isTrue(equal(exceptFee, fee.data), "fee should be expect")
    }

    /**
     * Asserts that the challenge proofs price per point matches the expected price.
     *
     * @param exceptPrice - The expected challenge proofs price per point.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async getChallengeProofsPricePrePointAssertion(
        exceptPrice: bigint
    ): Promise<void> {
        let price = await handleEvmError(
            this.filplus.getChallengeProofsPricePrePoint()
        )
        assert.isTrue(equal(exceptPrice, price.data), "price should be expect")
    }

    /**
     * Asserts that the challenge proofs submitter count matches the expected count.
     *
     * @param exceptCount - The expected challenge proofs submitter count.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async getChallengeProofsSubmiterCountAssertion(
        exceptCount: number
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.getChallengeProofsSubmiterCount()
        )
        assert.isTrue(equal(exceptCount, count.data), "count should be expect")
    }

    /**
     * Asserts that the datacap chunk land price per byte matches the expected price.
     *
     * @param exceptPrice - The expected datacap chunk land price per byte.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async getDatacapChunkLandPricePreByteAssertion(
        exceptPrice: bigint
    ): Promise<void> {
        let price = await handleEvmError(
            this.filplus.getDatacapChunkLandPricePreByte()
        )
        assert.isTrue(equal(exceptPrice, price.data), "price should be expect")
    }

    /**
     * Asserts that the datacap price per byte matches the expected price.
     *
     * @param exceptPrice - The expected datacap price per byte.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async getDatacapPricePreByteAssertion(exceptPrice: bigint): Promise<void> {
        let price = await handleEvmError(this.filplus.getDatacapPricePreByte())
        assert.isTrue(equal(exceptPrice, price.data), "price should be expect")
    }

    /**
     * Asserts that the dataset rule's minimum proof timeout matches the expected timeout.
     *
     * @param exceptTimeout - The expected minimum proof timeout.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async datasetRuleMinProofTimeoutAssertion(
        exceptTimeout: bigint
    ): Promise<void> {
        let timeout = await handleEvmError(
            this.filplus.datasetRuleMinProofTimeout()
        )
        assert.isTrue(
            equal(exceptTimeout, timeout.data),
            "timeout should be expect"
        )
    }

    /**
     * Asserts that the dataset rule's minimum audit timeout matches the expected timeout.
     *
     * @param exceptTimeout - The expected minimum audit timeout.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async datasetRuleMinAuditTimeoutAssertion(
        exceptTimeout: bigint
    ): Promise<void> {
        let timeout = await handleEvmError(
            this.filplus.datasetRuleMinAuditTimeout()
        )
        assert.isTrue(
            equal(exceptTimeout, timeout.data),
            "timeout should be expect"
        )
    }

    /**
     * Asserts that the dataset rule's requirement timeout matches the expected timeout.
     *
     * @param exceptTimeout - The expected requirement timeout.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async datasetRuleRequirementTimeoutAssertion(
        exceptTimeout: bigint
    ): Promise<void> {
        let timeout = await handleEvmError(
            this.filplus.datasetRuleRequirementTimeout()
        )
        assert.isTrue(
            equal(exceptTimeout, timeout.data),
            "timeout should be expect"
        )
    }

    /**
     * Asserts that the dataset rule's maximum replicas in a country match the expected count.
     *
     * @param countryCode - The country code.
     * @param expectCount - The expected maximum replicas in the country.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async getDatasetRuleMaxReplicasInCountryAssertion(
        countryCode: number,
        expectCount: number
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.getDatasetRuleMaxReplicasInCountry(countryCode)
        )
        assert.isTrue(
            equal(expectCount, count.data),
            "Dataset rule max replicas in country should be expect count"
        )
    }

    /**
     * Asserts that the dataset rule's minimum regions per dataset match the expected count.
     *
     * @param expectCount - The expected minimum regions per dataset.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async datasetRuleMinRegionsPerDatasetAssertion(
        expectCount: number
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.datasetRuleMinRegionsPerDataset()
        )
        assert.isTrue(
            equal(expectCount, count.data),
            "Dataset rule min regions per dataset should be expect count"
        )
    }

    /**
     * Asserts that the dataset rule's default maximum replicas per country match the expected count.
     *
     * @param expectCount - The expected default maximum replicas per country.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async datasetRuleDefaultMaxReplicasPerCountryAssertion(
        expectCount: number
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.datasetRuleDefaultMaxReplicasPerCountry()
        )
        assert.isTrue(
            equal(expectCount, count.data),
            "Dataset rule default max replicas per country should be expect count"
        )
    }

    /**
     * Asserts that the dataset rule's maximum replicas per city match the expected count.
     *
     * @param expectCount - The expected maximum replicas per city.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async datasetRuleMaxReplicasPerCityAssertion(
        expectCount: number
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.datasetRuleMaxReplicasPerCity()
        )
        assert.isTrue(
            equal(expectCount, count.data),
            "Dataset rule max replicas per city should be expect count"
        )
    }

    /**
     * Asserts that the dataset rule's maximum proportion of mapping files to dataset match the expected proportion.
     *
     * @param expectProportion - The expected maximum proportion of mapping files to dataset.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async datasetRuleMaxProportionOfMappingFilesToDatasetAssertion(
        expectProportion: number
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.datasetRuleMaxProportionOfMappingFilesToDataset()
        )
        assert.isTrue(
            equal(expectProportion, count.data),
            "Dataset rule max proportion of mappingFiles to dataset should be expect count"
        )
    }

    /**
     * Asserts that the dataset rule's minimum SPs per dataset match the expected count.
     *
     * @param expectCount - The expected minimum SPs per dataset.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async datasetRuleMinSPsPerDatasetAssertion(
        expectCount: number
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.datasetRuleMinSPsPerDataset()
        )
        assert.isTrue(
            equal(expectCount, count.data),
            "Dataset rule min SPs per dataset should be expect count"
        )
    }

    /**
     * Asserts that the dataset rule's maximum replicas per SP match the expected count.
     *
     * @param expectCount - The expected maximum replicas per SP.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async datasetRuleMaxReplicasPerSPAssertion(
        expectCount: number
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.datasetRuleMaxReplicasPerSP()
        )
        assert.isTrue(
            equal(expectCount, count.data),
            "Dataset rule max replicas per SP should be expect count"
        )
    }

    /**
     * Asserts that the dataset rule's minimum total replicas per dataset match the expected count.
     *
     * @param expectCount - The expected minimum total replicas per dataset.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async datasetRuleMinTotalReplicasPerDatasetAssertion(
        expectCount: number
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.datasetRuleMinTotalReplicasPerDataset()
        )
        assert.isTrue(
            equal(expectCount, count.data),
            "Dataset rule min total replicas per dataset should be expect count"
        )
    }

    /**
     * Asserts that the dataset rule's maximum total replicas per dataset match the expected count.
     *
     * @param expectCount - The expected maximum total replicas per dataset.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async datasetRuleMaxTotalReplicasPerDatasetAssertion(
        expectCount: number
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.datasetRuleMaxTotalReplicasPerDataset()
        )
        assert.isTrue(
            equal(expectCount, count.data),
            "Dataset rule max total replicas per dataset should be expect count"
        )
    }

    /**
     * Asserts that the datacap rules' maximum allocated size per time match the expected size.
     *
     * @param expectSize - The expected maximum allocated size per time.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async datacapRulesMaxAllocatedSizePerTimeAssertion(
        expectSize: number
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.datacapRulesMaxAllocatedSizePerTime()
        )
        assert.isTrue(
            equal(expectSize, count.data),
            "Dataset rule max allocated size per time should be expect count"
        )
    }

    /**
     * Asserts that the datacap rules' maximum remaining percentage for next match the expected percentage.
     *
     * @param expectPercentage - The expected maximum remaining percentage for next.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async datacapRulesMaxRemainingPercentageForNextAssertion(
        expectPercentage: number
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.datacapRulesMaxRemainingPercentageForNext()
        )
        assert.isTrue(
            equal(expectPercentage, count.data),
            "Dataset rule max remaining percentage for next should be expect count"
        )
    }

    /**
     * Asserts whether the compliant rule for geolocation is as expected.
     *
     * @param regions - An array of region identifiers.
     * @param countrys - An array of country identifiers.
     * @param citys - A two-dimensional array of city identifiers.
     * @param expectHas - The expected compliance result.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async isCompliantRuleGeolocationAssertion(
        regions: bigint[],
        countrys: bigint[],
        citys: bigint[][],
        expectHas: boolean
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.isCompliantRuleGeolocation(regions, countrys, citys)
        )
        assert.isTrue(
            equal(expectHas, count.data),
            "Is compliant rule geolocation should be expect"
        )
    }

    /**
     * Asserts whether the compliant rule for the maximum proportion of mapping files to dataset is as expected.
     *
     * @param mappingFilesSize - The size of mapping files.
     * @param sourceSize - The size of the source.
     * @param expectHas - The expected compliance result.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async isCompliantRuleMaxProportionOfMappingFilesToDatasetAssertion(
        mappingFilesSize: number,
        sourceSize: number,
        expectHas: boolean
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.isCompliantRuleMaxProportionOfMappingFilesToDataset(
                mappingFilesSize,
                sourceSize
            )
        )
        assert.isTrue(
            equal(expectHas, count.data),
            "Is compliant rule max proportion of mappingFiles to dataset should be expect"
        )
    }

    /**
     * Asserts whether the compliant rule for the total replicas per dataset is as expected.
     *
     * @param dataPreparers - A two-dimensional array of data preparer identifiers.
     * @param storageProviders - A two-dimensional array of storage provider identifiers.
     * @param regions - An array of region identifiers.
     * @param countrys - An array of country identifiers.
     * @param citys - A two-dimensional array of city identifiers.
     * @param expectHas - The expected compliance result.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async isCompliantRuleTotalReplicasPerDatasetAssertion(
        dataPreparers: string[][],
        storageProviders: string[][],
        regions: bigint[],
        countrys: bigint[],
        citys: bigint[][],
        expectHas: boolean
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.isCompliantRuleTotalReplicasPerDataset(
                dataPreparers,
                storageProviders,
                regions,
                countrys,
                citys
            )
        )
        assert.isTrue(
            equal(expectHas, count.data),
            "Is compliant rule total replicas per dataset should be expect"
        )
    }

    /**
     * Asserts whether the compliant rule for the minimum SPs per dataset is as expected.
     *
     * @param requirementValue - The required value.
     * @param totalExists - The total number of existing SPs.
     * @param uniqueExists - The unique number of existing SPs.
     * @param expectHas - The expected compliance result.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async isCompliantRuleMinSPsPerDatasetAssertion(
        requirementValue: number,
        totalExists: number,
        uniqueExists: number,
        expectHas: boolean
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.isCompliantRuleMinSPsPerDataset(
                requirementValue,
                totalExists,
                uniqueExists
            )
        )
        assert.isTrue(
            equal(expectHas, count.data),
            "Is compliant rule min SPs per dataset should be expect"
        )
    }

    /**
     * Asserts whether the compliant rule for the maximum replicas per SP is as expected.
     *
     * @param value - The value to compare.
     * @param expectHas - The expected compliance result.
     * @returns A promise indicating whether the assertion passed or not.
     */
    async isCompliantRuleMaxReplicasPerSPAssertion(
        value: number,
        expectHas: boolean
    ): Promise<void> {
        let count = await handleEvmError(
            this.filplus.isCompliantRuleMaxReplicasPerSP(value)
        )
        assert.isTrue(
            equal(expectHas, count.data),
            "Is compliant rule max replicas per SP should be expect"
        )
    }

    /**
     * Sets the minimum proof timeout for a dataset rule and asserts the value.
     * @param timeout - The minimum proof timeout value in blocks (bigint).
     * @returns A promise that resolves to void.
     */
    async setDatasetRuleMinProofTimeoutAssertion(
        timeout: bigint
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatasetRuleMinProofTimeout(timeout)
        )
        this.datasetRuleMinProofTimeoutAssertion(timeout)
    }

    /**
     * Sets the minimum audit timeout for a dataset rule and asserts the value.
     * @param timeout - The minimum audit timeout value in blocks (bigint).
     * @returns A promise that resolves to void.
     */
    async setDatasetRuleMinAuditTimeoutAssertion(
        timeout: bigint
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatasetRuleMinAuditTimeout(timeout)
        )
        this.datasetRuleMinAuditTimeoutAssertion(timeout)
    }

    /**
     * Sets the requirement timeout for a dataset rule and asserts the value.
     * @param timeout - The requirement timeout value in blocks (bigint).
     * @returns A promise that resolves to void.
     */
    async setDatasetRuleRequirementTimeoutAssertion(
        timeout: bigint
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatasetRuleRequirementTimeout(timeout)
        )
        this.datasetRuleRequirementTimeoutAssertion(timeout)
    }

    /**
     * Sets the income release rule for a specific escrow type.
     *
     * @param type - The type of escrow for which the income release rule is set.
     * @param releaseType - The type of release for the income.
     * @param delayBlocks - The number of blocks to delay before the income release.
     * @param durationBlocks - The duration for which the income release is active.
     * @returns A promise indicating the success of the operation.
     */
    async setIncomeReleaseRuleAssertion(
        type: EscrowType,
        releaseType: ReleaseType,
        delayBlocks: bigint,
        durationBlocks: bigint
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setIncomeReleaseRule(
                type,
                releaseType,
                delayBlocks,
                durationBlocks
            )
        )
        this.getIncomeReleaseRuleAssertion(
            type,
            new ReleaseRule({ releaseType, delayBlocks, durationBlocks })
        )
    }

    /**
     * Sets the escrow release rule for a specific escrow type.
     *
     * @param type - The type of escrow for which the escrow release rule is set.
     * @param releaseType - The type of release for the escrow.
     * @param delayBlocks - The number of blocks to delay before the escrow release.
     * @param durationBlocks - The duration for which the escrow release is active.
     * @returns A promise indicating the success of the operation.
     */
    async setEscrowReleaseRuleAssertion(
        type: EscrowType,
        releaseType: ReleaseType,
        delayBlocks: bigint,
        durationBlocks: bigint
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setEscrowReleaseRule(
                type,
                releaseType,
                delayBlocks,
                durationBlocks
            )
        )
        this.getEscrowReleaseRuleAssertion(
            type,
            new ReleaseRule({ releaseType, delayBlocks, durationBlocks })
        )
    }

    /**
     * Sets the datacap price per byte.
     *
     * @param newValue - The new value for the datacap price per byte.
     * @returns A promise indicating the success of the operation.
     */
    async setDatacapPricePreByteAssertion(newValue: bigint): Promise<void> {
        await handleEvmError(this.filplus.setDatacapPricePreByte(newValue))
        this.getDatacapPricePreByteAssertion(newValue)
    }

    /**
     * Sets the datacap chunk land price per byte.
     *
     * @param newValue - The new value for the datacap chunk land price per byte.
     * @returns A promise indicating the success of the operation.
     */
    async setDatacapChunkLandPricePreByteAssertion(
        newValue: bigint
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatacapChunkLandPricePreByte(newValue)
        )
        this.getDatacapChunkLandPricePreByteAssertion(newValue)
    }

    /**
     * Sets the count of challenge proofs submitter.
     *
     * @param newValue - The new value for the challenge proofs submitter count.
     * @returns A promise indicating the success of the operation.
     */
    async setChallengeProofsSubmiterCountAssertion(
        newValue: number
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setChallengeProofsSubmiterCount(newValue)
        )
        this.getChallengeProofsSubmiterCountAssertion(newValue)
    }

    /**
     * Sets the lock duration in days for approved datasets in datacap.
     *
     * @param newValue - The new value for the lock duration in days for approved datasets.
     * @returns A promise indicating the success of the operation.
     */
    async setDatacapdatasetApprovedLockDaysAssertion(
        newValue: bigint
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatacapdatasetApprovedLockDays(newValue)
        )
        this.getDatacapdatasetApprovedLockDaysAssertion(newValue)
    }

    /**
     * Sets the maximum lock duration in days for collateral in datacap.
     *
     * @param newValue - The new value for the maximum lock duration in days for collateral.
     * @returns A promise indicating the success of the operation.
     */
    async setDatacapCollateralMaxLockDaysAssertion(
        newValue: bigint
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatacapCollateralMaxLockDays(newValue)
        )
        this.getDatacapCollateralMaxLockDaysAssertion(newValue)
    }

    /**
     * Sets the audit fee for challenges.
     *
     * @param newValue - The new value for the challenge audit fee.
     * @returns A promise indicating the success of the operation.
     */
    async setChallengeAuditFeeAssertion(newValue: bigint): Promise<void> {
        await handleEvmError(this.filplus.setChallengeAuditFee(newValue))
        this.getChallengeAuditFeeAssertion(newValue)
    }

    /**
     * Sets the audit fee for proofs.
     *
     * @param newValue - The new value for the proof audit fee.
     * @returns A promise indicating the success of the operation.
     */
    async setProofAuditFeeAssertion(newValue: bigint): Promise<void> {
        await handleEvmError(this.filplus.setProofAuditFee(newValue))
        this.getProofAuditFeeAssertion(newValue)
    }

    /**
     * Sets the audit fee for disputes.
     *
     * @param newValue - The new value for the dispute audit fee.
     * @returns A promise indicating the success of the operation.
     */
    async setDisputeAuditFeeAssertion(newValue: bigint): Promise<void> {
        await handleEvmError(this.filplus.setDisputeAuditFee(newValue))
        this.getDisputeAuditFeeAssertion(newValue)
    }

    /**
     * Sets the price per point for challenge proofs.
     *
     * @param newValue - The new value for the challenge proofs price per point.
     * @returns A promise indicating the success of the operation.
     */
    async setChallengeProofsPricePrePointAssertion(
        newValue: bigint
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setChallengeProofsPricePrePoint(newValue)
        )
        this.getChallengeProofsPricePrePointAssertion(newValue)
    }

    /**
     * Sets the minimum number of regions required per dataset for dataset rules.
     *
     * @param newValue - The new value for the minimum regions.
     * @returns A promise indicating the success of the operation.
     */
    async setDatasetRuleMinRegionsPerDatasetAssertion(
        newValue: number
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatasetRuleMinRegionsPerDataset(newValue)
        )
        this.datasetRuleMinRegionsPerDatasetAssertion(newValue)
    }

    /**
     * Sets the default maximum number of replicas per country for dataset rules.
     *
     * @param newValue - The new value for the default maximum replicas per country.
     * @returns A promise indicating the success of the operation.
     */
    async setDatasetRuleDefaultMaxReplicasPerCountryAssertion(
        newValue: number
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatasetRuleDefaultMaxReplicasPerCountry(newValue)
        )
        this.datasetRuleDefaultMaxReplicasPerCountryAssertion(newValue)
    }

    /**
     * Sets the maximum number of replicas per country for dataset rules.
     *
     * @param countryCode - The code of the country for which the rule is set.
     * @param newValue - The new value for the maximum replicas in the specified country.
     * @returns A promise indicating the success of the operation.
     */
    async setDatasetRuleMaxReplicasInCountryAssertion(
        countryCode: number,
        newValue: number
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatasetRuleMaxReplicasInCountry(
                countryCode,
                newValue
            )
        )
        this.getDatasetRuleMaxReplicasInCountryAssertion(countryCode, newValue)
    }

    /**
     * Sets the maximum number of replicas per city for dataset rules.
     *
     * @param newValue - The new value for the maximum replicas per city.
     * @returns A promise indicating the success of the operation.
     */
    async setDatasetRuleMaxReplicasPerCityAssertion(
        newValue: number
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatasetRuleMaxReplicasPerCity(newValue)
        )
        this.datasetRuleMaxReplicasPerCityAssertion(newValue)
    }

    /**
     * Sets the maximum proportion of mapping files to dataset for dataset rules.
     *
     * @param newValue - The new value for the maximum proportion.
     * @returns A promise indicating the success of the operation.
     */
    async setDatasetRuleMaxProportionOfMappingFilesToDatasetAssertion(
        newValue: number
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatasetRuleMaxProportionOfMappingFilesToDataset(
                newValue
            )
        )
        this.datasetRuleMaxProportionOfMappingFilesToDatasetAssertion(newValue)
    }

    /**
     * Sets the minimum number of SPs (Storage Providers) required per dataset for dataset rules.
     *
     * @param newValue - The new value for the minimum SPs per dataset.
     * @returns A promise indicating the success of the operation.
     */
    async setDatasetRuleMinSPsPerDatasetAssertion(
        newValue: number
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatasetRuleMinSPsPerDataset(newValue)
        )
        this.datasetRuleMinSPsPerDatasetAssertion(newValue)
    }

    /**
     * Sets the maximum number of replicas per service provider (SP) for dataset rules.
     *
     * @param newValue - The new value for the maximum replicas per SP.
     * @returns A promise indicating the success of the operation.
     */
    async setDatasetRuleMaxReplicasPerSPAssertion(
        newValue: number
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatasetRuleMaxReplicasPerSP(newValue)
        )
        this.datasetRuleMaxReplicasPerSPAssertion(newValue)
    }

    /**
     * Sets the minimum total number of replicas per dataset for dataset rules.
     *
     * @param newValue - The new value for the minimum total replicas per dataset.
     * @returns A promise indicating the success of the operation.
     */
    async setDatasetRuleMinTotalReplicasPerDatasetAssertion(
        newValue: number
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatasetRuleMinTotalReplicasPerDataset(newValue)
        )
        this.datasetRuleMinTotalReplicasPerDatasetAssertion(newValue)
    }

    /**
     * Sets the maximum total number of replicas per dataset for dataset rules.
     *
     * @param newValue - The new value for the maximum total replicas per dataset.
     * @returns A promise indicating the success of the operation.
     */
    async setDatasetRuleMaxTotalReplicasPerDatasetAssertion(
        newValue: number
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatasetRuleMaxTotalReplicasPerDataset(newValue)
        )
        this.datasetRuleMaxTotalReplicasPerDatasetAssertion(newValue)
    }

    /**
     * Sets the maximum allocated size per time for datacap rules.
     *
     * @param newValue - The new value for the maximum allocated size per time.
     * @returns A promise indicating the success of the operation.
     */
    async setDatacapRulesMaxAllocatedSizePerTimeAssertion(
        newValue: number
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatacapRulesMaxAllocatedSizePerTime(newValue)
        )
        this.datacapRulesMaxAllocatedSizePerTimeAssertion(newValue)
    }

    /**
     * Sets the maximum remaining percentage for the next allocation for datacap rules.
     *
     * @param newValue - The new value for the maximum remaining percentage for the next allocation.
     * @returns A promise indicating the success of the operation.
     */
    async setDatacapRulesMaxRemainingPercentageForNextAssertion(
        newValue: number
    ): Promise<void> {
        await handleEvmError(
            this.filplus.setDatacapRulesMaxRemainingPercentageForNext(newValue)
        )
        this.datacapRulesMaxRemainingPercentageForNextAssertion(newValue)
    }
}
