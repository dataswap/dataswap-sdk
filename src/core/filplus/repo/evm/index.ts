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
    Evm,
    withCallMethod,
    withSendMethod,
    EvmOutput,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"
import { EvmEx } from "../../../../shared/types/evmEngineType"

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
    datacapRulesMaxAllocatedSizePerTime(): Promise<EvmOutput<number>>

    /**
     * @notice Get datacap rules max remaining percentage for next
     */
    datacapRulesMaxRemainingPercentageForNext(): Promise<EvmOutput<number>>

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
}

/**
 * Interface for EVM transactions related to  Filplus.
 */
interface FilplusSendEvm {
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
    setDatacapRulesMaxAllocatedSizePerTime(
        newValue: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * @notice Set datacap rule max remaining percentage for next
     * @param newValue The set value
     * @param options The options of transaction.
     */
    setDatacapRulesMaxRemainingPercentageForNext(
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
    "getDatasetRuleMaxReplicasInCountry",
    "datasetRuleMinRegionsPerDataset",
    "datasetRuleDefaultMaxReplicasPerCountry",
    "datasetRuleMaxReplicasPerCity",
    "datasetRuleMaxProportionOfMappingFilesToDataset",
    "datasetRuleMinSPsPerDataset",
    "datasetRuleMaxReplicasPerSP",
    "datasetRuleMinTotalReplicasPerDataset",
    "datasetRuleMaxTotalReplicasPerDataset",
    "datacapRulesMaxAllocatedSizePerTime",
    "datacapRulesMaxRemainingPercentageForNext",
    "isCompliantRuleGeolocation",
    "isCompliantRuleMaxProportionOfMappingFilesToDataset",
    "isCompliantRuleTotalReplicasPerDataset",
    "isCompliantRuleMinSPsPerDataset",
    "isCompliantRuleMaxReplicasPerSP",
])
@withSendMethod([
    "setDatasetRuleMinRegionsPerDataset",
    "setDatasetRuleDefaultMaxReplicasPerCountry",
    "setDatasetRuleMaxReplicasInCountry",
    "setDatasetRuleMaxReplicasPerCity",
    "setDatasetRuleMaxProportionOfMappingFilesToDataset",
    "setDatasetRuleMinSPsPerDataset",
    "setDatasetRuleMaxReplicasPerSP",
    "setDatasetRuleMinTotalReplicasPerDataset",
    "setDatasetRuleMaxTotalReplicasPerDataset",
    "setDatacapRulesMaxAllocatedSizePerTime",
    "setDatacapRulesMaxRemainingPercentageForNext",
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
            case "setDatasetRuleMinRegionsPerDataset":
            case "setDatasetRuleDefaultMaxReplicasPerCountry":
            case "setDatasetRuleMaxReplicasInCountry":
            case "setDatasetRuleMaxReplicasPerCity":
            case "setDatasetRuleMaxProportionOfMappingFilesToDataset":
            case "setDatasetRuleMinSPsPerDataset":
            case "setDatasetRuleMaxReplicasPerSP":
            case "setDatasetRuleMinTotalReplicasPerDataset":
            case "setDatasetRuleMaxTotalReplicasPerDataset":
            case "setDatacapRulesMaxAllocatedSizePerTime":
            case "setDatacapRulesMaxRemainingPercentageForNext":
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
