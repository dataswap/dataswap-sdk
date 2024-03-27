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
    withCallMethod,
    withSendMethod,
    EvmOutput,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"
import { EvmEx } from "../../../../shared/types/evmEngineType"

import { ReleaseRule } from "../../../finance/types"
import { EscrowType, ReleaseType } from "../../../../shared/types/financeType"

/**
 * Interface for EVM calls related to  Filplus.
 */
interface FilplusCallEvm {
    /**
     * @notice Get dataset rule max replicas in countries
     * @param countryCode The country code
     */
    getDatasetRuleMaxReplicasInCountry(
        countryCode: number
    ): Promise<EvmOutput<number>>

    /**
     * Retrieves the income release rule for a specific escrow type.
     *
     * @param type - The escrow type for which to retrieve the income release rule.
     * @returns A promise with the EVM output containing the income release rule information.
     */
    getIncomeReleaseRule(type: EscrowType): Promise<EvmOutput<ReleaseRule>>

    /**
     * Retrieves the escrow release rule for a specific escrow type.
     *
     * @param type - The escrow type for which to retrieve the escrow release rule.
     * @returns A promise with the EVM output containing the escrow release rule information.
     */
    getEscrowReleaseRule(type: EscrowType): Promise<EvmOutput<ReleaseRule>>

    /**
     * Retrieves the burn address used in the system.
     *
     * @returns A promise with the EVM output containing the burn address.
     */
    getBurnAddress(): Promise<EvmOutput<string>>

    /**
     * Retrieves the current block number per day.
     *
     * @returns A promise with the EVM output containing the block number per day.
     */
    getPerDayBlocknumber(): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the lock days for datacap dataset approval.
     *
     * @returns A promise with the EVM output containing the datacap dataset approved lock days.
     */
    financeRuleDatacapDatasetApprovedLockDays(): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the maximum lock days for datacap collateral.
     *
     * @returns A promise with the EVM output containing the datacap collateral maximum lock days.
     */
    financeRuleDatacapCollateralMaxLockDays(): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the audit fee for challenging a proof.
     *
     * @returns A promise with the EVM output containing the challenge audit fee.
     */
    finaceRuleDatasetChallengeProofCollateral(): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the audit fee for proof submission.
     *
     * @returns A promise with the EVM output containing the proof audit fee.
     */
    finaceRuleDatasetProofCollateral(): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the audit fee for dispute resolution.
     *
     * @returns A promise with the EVM output containing the dispute audit fee.
     */
    financeRuleDisputeAuditCollateral(): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the price per point for challenging proofs.
     *
     * @returns A promise with the EVM output containing the challenge proofs price per point.
     */
    financeRuleChallengeProofsPricePrePoint(): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the count of challenge proofs submitter.
     *
     * @returns A promise with the EVM output containing the count of challenge proofs submitter.
     */
    datasetRuleMaxChallengeProofsSubmitersPerDataset(): Promise<
        EvmOutput<number>
    >

    /**
     * Retrieves the price per byte for datacap chunks of land.
     *
     * @returns A promise with the EVM output containing the datacap chunk land price per byte.
     */
    financeRuleDatacapChunkLandPricePreByte(): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the price per byte for datacap.
     *
     * @returns A promise with the EVM output containing the datacap price per byte.
     */
    financeRuleDatacapPricePreByte(): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the minimum proof timeout for dataset rules.
     *
     * @returns A promise with the EVM output containing the minimum proof timeout for dataset rules.
     */
    datasetRuleMinProofTimeout(): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the minimum audit timeout for dataset rules.
     *
     * @returns A promise with the EVM output containing the minimum audit timeout for dataset rules.
     */
    datasetRuleMinAuditTimeout(): Promise<EvmOutput<bigint>>

    /**
     * Retrieves the requirement timeout for dataset rules.
     *
     * @returns A promise with the EVM output containing the requirement timeout for dataset rules.
     */
    datasetRuleRequirementTimeout(): Promise<EvmOutput<bigint>>

    /**
     * @notice Get dataset rule min regions per dataset
     */
    datasetRuleMinRegionsPerDataset(): Promise<EvmOutput<number>>

    /**
     * @notice Get dataset rule default max replicas per country
     */
    datasetRuleDefaultMaxReplicasPerCountry(): Promise<EvmOutput<number>>

    /**
     * @notice Get dataset rule max replicas per city
     */
    datasetRuleMaxReplicasPerCity(): Promise<EvmOutput<number>>

    /**
     * @notice Get dataset rule max proportion of mapping files to dataset
     */
    datasetRuleMaxProportionOfMappingFilesToDataset(): Promise<
        EvmOutput<number>
    >

    /**
     * @notice Get dataset rule min SPs per dataset
     */
    datasetRuleMinSPsPerDataset(): Promise<EvmOutput<number>>

    /**
     * @notice Get dataset rule max replicas per SP
     */
    datasetRuleMaxReplicasPerSP(): Promise<EvmOutput<number>>

    /**
     * @notice Get dataset rule min total replicas per dataset
     */
    datasetRuleMinTotalReplicasPerDataset(): Promise<EvmOutput<number>>

    /**
     * @notice Get dataset rule max total replicas per dataset
     */
    datasetRuleMaxTotalReplicasPerDataset(): Promise<EvmOutput<number>>

    /**
     * @notice Get datacap rules max allocated size per time
     */
    datacapRuleMaxAllocatedSizePerTime(): Promise<EvmOutput<number>>

    /**
     * @notice Get datacap rules max remaining percentage for next
     */
    datacapRuleMaxRemainingPercentageForNext(): Promise<EvmOutput<number>>

    /**
     * @dev Retrieves the auditors' election time for dataset rules.
     * @returns A promise resolving to the number of blocks representing the duration of the election.
     */
    datasetRuleAuditorsElectionTime(): Promise<EvmOutput<number>>

    /**
     * @notice Check if the storage area complies with filplus rules.
     * @param regions The geolocation regions
     * @param countrys The geolocation countrys
     * @param citys The geolocation citys
     */
    isCompliantRuleGeolocation(
        regions: bigint[],
        countrys: bigint[],
        citys: bigint[][]
    ): Promise<EvmOutput<boolean>>

    /**
     * @notice Check if the mappingFiles percentage in the dataset complies with filplus rules.
     * @param mappingFilesSize The mapping files size
     * @param sourceSize The source size
     *  */
    isCompliantRuleMaxProportionOfMappingFilesToDataset(
        mappingFilesSize: number,
        sourceSize: number
    ): Promise<EvmOutput<boolean>>

    /**
     * @notice Check if the total number of storage replicas complies with filplus rules.
     * @param dataPreparers The data preparers
     * @param storageProviders The storage providers
     * @param regions The regions
     * @param countrys The countrys
     * @param citys The citys
     */
    isCompliantRuleTotalReplicasPerDataset(
        dataPreparers: string[][],
        storageProviders: string[][],
        regions: bigint[],
        countrys: bigint[],
        citys: bigint[][]
    ): Promise<EvmOutput<boolean>>

    /**
     * @notice Check if the storage provider for each dataset complies with filplus rules `datasetRuleMinSPsPerDataset`.
     * @param requirementValue The requiement value
     * @param totalExists The total exists number
     * @param uniqueExists The unique exists number
     */
    isCompliantRuleMinSPsPerDataset(
        requirementValue: number,
        totalExists: number,
        uniqueExists: number
    ): Promise<EvmOutput<boolean>>

    /**
     * @notice Check if the storage provider for each dataset complies with filplus rules `datasetRuleMaxReplicasPerSP`.
     * @param value The current vale
     */
    isCompliantRuleMaxReplicasPerSP(value: number): Promise<EvmOutput<boolean>>

    /**
     * Retrieves the roles associated with the current user.
     * @returns A promise that resolves with the roles of the current user.
     */
    roles(): Promise<EvmOutput<string>>
}

/**
 * Interface for EVM transactions related to  Filplus.
 */
interface FilplusSendEvm {
    /**
     * Sets the minimum proof timeout for a dataset rule.
     * @param blocks - The minimum proof timeout value in blocks (bigint).
     * @returns A promise that resolves to an EvmOutput<void>.
     */
    setDatasetRuleMinProofTimeout(blocks: bigint): Promise<EvmOutput<void>>

    /**
     * Sets the minimum audit timeout for a dataset rule.
     * @param blocks - The minimum audit timeout value in blocks (bigint).
     * @returns A promise that resolves to an EvmOutput<void>.
     */
    setDatasetRuleMinAuditTimeout(blocks: bigint): Promise<EvmOutput<void>>

    /**
     * Sets the requirement timeout for a dataset rule.
     * @param blocks - The requirement timeout value in blocks (bigint).
     * @returns A promise that resolves to an EvmOutput<void>.
     */
    setDatasetRuleRequirementTimeout(blocks: bigint): Promise<EvmOutput<void>>

    /**
     * Sets the income release rule for a specific escrow type.
     *
     * @param type - The escrow type.
     * @param releaseType - The release type.
     * @param delayBlocks - The number of blocks to delay before releasing income.
     * @param durationBlocks - The duration in blocks for which the income release rule is active.
     * @returns A promise with the EVM output indicating the success of the operation.
     */
    setIncomeReleaseRule(
        type: EscrowType,
        releaseType: ReleaseType,
        delayBlocks: bigint,
        durationBlocks: bigint
    ): Promise<EvmOutput<void>>

    /**
     * Sets the escrow release rule for a specific escrow type.
     *
     * @param type - The escrow type.
     * @param releaseType - The release type.
     * @param delayBlocks - The number of blocks to delay before releasing escrow.
     * @param durationBlocks - The duration in blocks for which the escrow release rule is active.
     * @returns A promise with the EVM output indicating the success of the operation.
     */
    setEscrowReleaseRule(
        type: EscrowType,
        releaseType: ReleaseType,
        delayBlocks: bigint,
        durationBlocks: bigint
    ): Promise<EvmOutput<void>>

    /**
     * Sets the price per byte for datacap.
     *
     * @param newValue - The new value for datacap price per byte.
     * @returns A promise with the EVM output indicating the success of the operation.
     */
    setFinanceRuleDatacapPricePreByte(
        newValue: bigint
    ): Promise<EvmOutput<void>>

    /**
     * Sets the price per byte for datacap chunks of land.
     *
     * @param newValue - The new value for datacap chunk land price per byte.
     * @returns A promise with the EVM output indicating the success of the operation.
     */
    setFinanceRuleDatacapChunkLandPricePreByte(
        newValue: bigint
    ): Promise<EvmOutput<void>>

    /**
     * Sets the count of challenge proofs submitter.
     *
     * @param newValue - The new value for the count of challenge proofs submitter.
     * @returns A promise with the EVM output indicating the success of the operation.
     */
    setDatasetRuleMaxChallengeProofsSubmitersPerDataset(
        newValue: number
    ): Promise<EvmOutput<void>>

    /**
     * Sets the lock days for datacap dataset approval.
     *
     * @param newValue - The new value for datacap dataset approved lock days.
     * @returns A promise with the EVM output indicating the success of the operation.
     */
    setFinanceRuleDatacapDatasetApprovedLockDays(
        newValue: bigint
    ): Promise<EvmOutput<void>>

    /**
     * Sets the maximum lock days for datacap collateral.
     *
     * @param newValue - The new value for datacap collateral maximum lock days.
     * @returns A promise with the EVM output indicating the success of the operation.
     */
    setFinanceRuleDatacapCollateralMaxLockDays(
        newValue: bigint
    ): Promise<EvmOutput<void>>

    /**
     * Sets the time for auditors' election in terms of blocks.
     * @param blocks The number of blocks representing the duration of the election.
     * @returns A promise resolving to the transaction receipt.
     */
    setDatasetRuleAuditorsElectionTime(blocks: number): Promise<EvmOutput<void>>
    /**
     * Sets the audit fee for challenging a proof.
     *
     * @param newValue - The new value for the challenge audit fee.
     * @returns A promise with the EVM output indicating the success of the operation.
     */
    setFinaceRuleDatasetChallengeProofCollateral(
        newValue: bigint
    ): Promise<EvmOutput<void>>

    /**
     * Sets the audit fee for proof submission.
     *
     * @param newValue - The new value for the proof audit fee.
     * @returns A promise with the EVM output indicating the success of the operation.
     */
    setFinaceRuleDatasetProofCollateral(
        newValue: bigint
    ): Promise<EvmOutput<void>>

    /**
     * Sets the audit fee for dispute resolution.
     *
     * @param newValue - The new value for the dispute audit fee.
     * @returns A promise with the EVM output indicating the success of the operation.
     */
    setFinanceRuleDisputeAuditCollateral(
        newValue: bigint
    ): Promise<EvmOutput<void>>

    /**
     * Sets the price per point for challenging proofs.
     *
     * @param newValue - The new value for the challenge proofs price per point.
     * @returns A promise with the EVM output indicating the success of the operation.
     */
    setFinanceRuleChallengeProofsPricePrePoint(
        newValue: bigint
    ): Promise<EvmOutput<void>>

    /**
     * @notice Set dataset rule min regions per dataset
     * @param newValue The set value
     * @param options The options of transaction.
     */
    setDatasetRuleMinRegionsPerDataset(
        newValue: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * @notice Set dataset rule default max replicas per country
     * @param newValue The set value
     * @param options The options of transaction.
     */
    setDatasetRuleDefaultMaxReplicasPerCountry(
        newValue: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * @notice Set dataset rule max replicas in country
     * @param countryCode The country code
     * @param newValue The set value
     * @param options The options of transaction.
     */
    setDatasetRuleMaxReplicasInCountry(
        countryCode: number,
        newValue: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * @notice Set dataset rule max replicas per city
     * @param newValue The set value
     * @param options The options of transaction.
     */
    setDatasetRuleMaxReplicasPerCity(
        newValue: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * @notice Set maximum proportion of dataset mapping files
     * @param newValue The set value
     * @param options The options of transaction.
     */
    setDatasetRuleMaxProportionOfMappingFilesToDataset(
        newValue: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * @notice Set dataset rule min SPs per dataset
     * @param newValue The set value
     * @param options The options of transaction.
     */
    setDatasetRuleMinSPsPerDataset(
        newValue: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * @notice Set dataset rule max replicas per SP
     * @param newValue The set value
     * @param options The options of transaction.
     */
    setDatasetRuleMaxReplicasPerSP(
        newValue: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * @notice Set dataset rule min total replicas per dataset
     * @param newValue The set value
     * @param options The options of transaction.
     */
    setDatasetRuleMinTotalReplicasPerDataset(
        newValue: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * @notice Set dataset rule max total replicas per dataset
     * @param newValue The set value
     * @param options The options of transaction.
     */
    setDatasetRuleMaxTotalReplicasPerDataset(
        newValue: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * @notice Set datacap rule max allocated size per time
     * @param newValue The set value
     * @param options The options of transaction.
     */
    setDatacapRuleMaxAllocatedSizePerTime(
        newValue: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * @notice Set datacap rule max remaining percentage for next
     * @param newValue The set value
     * @param options The options of transaction.
     */
    setDatacapRuleMaxRemainingPercentageForNext(
        newValue: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
}

/**
 * Combined interface for EVM calls and transactions related to  Filplus.
 */
export interface FilplusOriginEvm extends FilplusCallEvm, FilplusSendEvm {}

/**
 * Implementation of  FilplusOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "getIncomeReleaseRule",
    "getEscrowReleaseRule",
    "getBurnAddress",
    "getPerDayBlocknumber",
    "financeRuleDatacapDatasetApprovedLockDays",
    "financeRuleDatacapCollateralMaxLockDays",
    "finaceRuleDatasetChallengeProofCollateral",
    "finaceRuleDatasetProofCollateral",
    "financeRuleDisputeAuditCollateral",
    "financeRuleChallengeProofsPricePrePoint",
    "datasetRuleMaxChallengeProofsSubmitersPerDataset",
    "financeRuleDatacapChunkLandPricePreByte",
    "financeRuleDatacapPricePreByte",
    "datasetRuleMinProofTimeout",
    "datasetRuleMinAuditTimeout",
    "datasetRuleRequirementTimeout",
    "getDatasetRuleMaxReplicasInCountry",
    "datasetRuleMinRegionsPerDataset",
    "datasetRuleDefaultMaxReplicasPerCountry",
    "datasetRuleMaxReplicasPerCity",
    "datasetRuleMaxProportionOfMappingFilesToDataset",
    "datasetRuleMinSPsPerDataset",
    "datasetRuleMaxReplicasPerSP",
    "datasetRuleMinTotalReplicasPerDataset",
    "datasetRuleMaxTotalReplicasPerDataset",
    "datacapRuleMaxAllocatedSizePerTime",
    "datacapRuleMaxRemainingPercentageForNext",
    "datasetRuleAuditorsElectionTime",
    "isCompliantRuleGeolocation",
    "isCompliantRuleMaxProportionOfMappingFilesToDataset",
    "isCompliantRuleTotalReplicasPerDataset",
    "isCompliantRuleMinSPsPerDataset",
    "isCompliantRuleMaxReplicasPerSP",
    "roles",
])
@withSendMethod([
    "setIncomeReleaseRule",
    "setEscrowReleaseRule",
    "setFinanceRuleDatacapPricePreByte",
    "setFinanceRuleDatacapChunkLandPricePreByte",
    "setDatasetRuleMaxChallengeProofsSubmitersPerDataset",
    "setFinanceRuleDatacapDatasetApprovedLockDays",
    "setFinanceRuleDatacapCollateralMaxLockDays",
    "setDatasetRuleAuditorsElectionTime",
    "setFinaceRuleDatasetChallengeProofCollateral",
    "setFinaceRuleDatasetProofCollateral",
    "setFinanceRuleDisputeAuditCollateral",
    "setFinanceRuleChallengeProofsPricePrePoint",
    "setDatasetRuleMinRegionsPerDataset",
    "setDatasetRuleMinProofTimeout",
    "setDatasetRuleMinAuditTimeout",
    "setDatasetRuleRequirementTimeout",
    "setDatasetRuleDefaultMaxReplicasPerCountry",
    "setDatasetRuleMaxReplicasInCountry",
    "setDatasetRuleMaxReplicasPerCity",
    "setDatasetRuleMaxProportionOfMappingFilesToDataset",
    "setDatasetRuleMinSPsPerDataset",
    "setDatasetRuleMaxReplicasPerSP",
    "setDatasetRuleMinTotalReplicasPerDataset",
    "setDatasetRuleMaxTotalReplicasPerDataset",
    "setDatacapRuleMaxAllocatedSizePerTime",
    "setDatacapRuleMaxRemainingPercentageForNext",
])
export class FilplusOriginEvm extends EvmEx {}

/**
 * Extended class for  FilplusOriginEvm with additional message decoding.
 */
export class FilplusEvm extends FilplusOriginEvm {
    /**
     * Decode a DataswapMessage from an EVM message.
     *
     * @param msg - Message to decode.
     * @returns EvmOutput containing the decoded DataswapMessage.
     */
    decodeMessage(msg: Message): EvmOutput<DataswapMessage> {
        const decoder = new ContractMessageDecoder(this)
        const decodeRes = decoder.decode(msg)
        if (!decodeRes.ok && !decodeRes.data) {
            return { ok: false, error: decodeRes.error }
        }

        let result: DataswapMessage =
            decodeRes.data!.values() as DataswapMessage
        switch (decodeRes.data!.method) {
            case "setIncomeReleaseRule":
            case "setEscrowReleaseRule":
            case "setFinanceRuleDatacapPricePreByte":
            case "setFinanceRuleDatacapChunkLandPricePreByte":
            case "setDatasetRuleMaxChallengeProofsSubmitersPerDataset":
            case "setFinanceRuleDatacapDatasetApprovedLockDays":
            case "setFinanceRuleDatacapCollateralMaxLockDays":
            case "setDatasetRuleAuditorsElectionTime":
            case "setFinaceRuleDatasetChallengeProofCollateral":
            case "setFinaceRuleDatasetProofCollateral":
            case "setFinanceRuleDisputeAuditCollateral":
            case "setFinanceRuleChallengeProofsPricePrePoint":
            case "setDatasetRuleMinProofTimeout":
            case "setDatasetRuleMinAuditTimeout":
            case "setDatasetRuleRequirementTimeout":
            case "setDatasetRuleMinRegionsPerDataset":
            case "setDatasetRuleDefaultMaxReplicasPerCountry":
            case "setDatasetRuleMaxReplicasInCountry":
            case "setDatasetRuleMaxReplicasPerCity":
            case "setDatasetRuleMaxProportionOfMappingFilesToDataset":
            case "setDatasetRuleMinSPsPerDataset":
            case "setDatasetRuleMaxReplicasPerSP":
            case "setDatasetRuleMinTotalReplicasPerDataset":
            case "setDatasetRuleMaxTotalReplicasPerDataset":
            case "setDatacapRuleMaxAllocatedSizePerTime":
            case "setDatacapRuleMaxRemainingPercentageForNext":
            case "upgradeTo":
                break
            default:
                return {
                    ok: false,
                    error: "Not support method!",
                }
        }

        return {
            ok: true,
            data: result,
        }
    }
}
