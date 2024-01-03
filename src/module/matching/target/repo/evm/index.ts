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
import { DataswapMessage } from "../../../../../message/types"
import { MatchingTarget } from "../../types"
import { DataType } from "../../../../../shared/types/dataType"
import { EvmEx } from "../../../../../shared/types/evmEngineType"
import { mergeBigIntRangesToCompleteArray } from "../../../../../shared/arrayUtils"

/**
 * Interface for making Ethereum Virtual Machine (EVM) calls related to matching targets.
 * @interface
 */
interface MatchingTargetCallEvm {
    /**
     * Retrieves information about matchings.
     * @returns {Promise<EvmOutput<string>>} A promise resolving to the EVM output for matchings.
     */
    matchings(): Promise<EvmOutput<string>>

    /**
     * Retrieves information about matching bids.
     * @returns {Promise<EvmOutput<string>>} A promise resolving to the EVM output for matching bids.
     */
    matchingsBids(): Promise<EvmOutput<string>>

    /**
     * Retrieves the target associated with a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @returns A Promise resolving to the MatchingTarget object.
     */
    getMatchingTarget(matchingId: number): Promise<EvmOutput<MatchingTarget>>
    /**
     * Checks if a specific car hash is present in a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param id - The id of the car to check.
     * @returns A Promise resolving to a boolean indicating whether the car hash is present.
     */
    isMatchingContainsCar(
        matchingId: number,
        id: bigint
    ): Promise<EvmOutput<boolean>>
    /**
     * Checks if multiple car hashes are present in a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param ids - An array of car ids to check.
     * @returns A Promise resolving to a boolean indicating whether all specified car hashes are present.
     */
    isMatchingContainsCars(
        matchingId: number,
        ids: bigint[]
    ): Promise<EvmOutput<boolean>>
    /**
     * Checks if a matching target is valid based on specified parameters.
     * @param datasetId - The ID of the dataset associated with the matching target.
     * @param cars - An array of car IDs.
     * @param size - The size of the matching target.
     * @param dataType - The type of data within the matching target.
     * @param associatedMappingFilesMatchingId - The ID of the matching associated with mapping files.
     * @returns A Promise resolving to a boolean indicating whether the matching target is valid.
     */
    isMatchingTargetValid(
        datasetId: number,
        cars: bigint[],
        size: bigint,
        dataType: DataType,
        associatedMappingFilesMatchingId: number
    ): Promise<EvmOutput<boolean>>
    /**
     * Checks if a specific candidate address meets the requirements for a Fil+ matching identified by its ID.
     * @param matchingId - The ID of the Fil+ matching.
     * @param candidate - The address of the candidate to check.
     * @returns A Promise resolving to a boolean indicating whether the candidate meets Fil+ requirements.
     */
    isMatchingTargetMeetsFilPlusRequirements(
        matchingId: number,
        candidate: string
    ): Promise<EvmOutput<boolean>>
}

/**
 * Interface for sending Ethereum Virtual Machine (EVM) transactions related to matching targets.
 * @interface
 */
interface MatchingTargetSendEvm {
    /**
     * Initializes dependencies for the contract.
     * @param matchings - The address of the matchings contract.
     * @param matchingsBids - The address of the matchingsBids contract.
     * @param options - EVM transaction options.
     * @returns A Promise resolving to the output of the EVM transaction (void).
     */
    initDependencies(
        matchings: string,
        matchingsBids: string,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
    /**
     * Creates a new target for a matching with the specified parameters.
     * @param matchingId - The ID of the matching for the target.
     * @param datasetId - The ID of the dataset for the target.
     * @param dataType - The type of data within the target.
     * @param associatedMappingFilesMatchingId - The ID of the matching associated with mapping files.
     * @param replicaIndex - The index of the replica.
     * @param options - EVM transaction options.
     * @returns A Promise resolving to the output of the EVM transaction (void).
     */
    createTarget(
        matchingId: number,
        datasetId: number,
        dataType: DataType,
        associatedMappingFilesMatchingId: number,
        replicaIndex: bigint,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
    /**
     * Publishes a matching with the specified parameters.
     * @param matchingId - The ID of the matching to publish.
     * @param datasetId - The ID of the dataset for the matching.
     * @param carsStarts - An array of starting car IDs for the matching.
     * @param carsEnds - An array of ending car IDs for the matching.
     * @param complete - A boolean indicating whether the matching is complete.
     * @param options - EVM transaction options.
     * @returns A Promise resolving to the output of the EVM transaction (void).
     */
    publishMatching(
        matchingId: number,
        datasetId: number,
        carsStarts: bigint[],
        carsEnds: bigint[],
        complete: boolean,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
}
/**
 * Combined interface for EVM calls and transactions related to MatchingTarget contract.
 */
export interface MatchingTargetOriginEvm
    extends MatchingTargetCallEvm,
        MatchingTargetSendEvm {}

/**
 * Implementation of MatchingTargetOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "matchings",
    "matchingsBids",
    "getMatchingTarget",
    "isMatchingContainsCar",
    "isMatchingContainsCars",
    "isMatchingTargetValid",
    "isMatchingTargetMeetsFilPlusRequirements",
])
@withSendMethod(["initDependencies", "createTarget", "publishMatching"])
export class MatchingTargetOriginEvm extends EvmEx {}

/**
 * Extended class for MatchingTargetEvm with additional message decoding.
 */
export class MatchingTargetEvm extends MatchingTargetOriginEvm {
    async getMatchingTarget(
        matchingId: number
    ): Promise<EvmOutput<MatchingTarget>> {
        const metaRes = await super.getMatchingTarget(matchingId)
        if (metaRes.ok && metaRes.data) {
            let data = new MatchingTarget({
                ...metaRes.data,
                matchingId: matchingId,
            })
            data.datasetID = Number(metaRes.data.datasetID)
            data.dataType = Number(data.dataType) as DataType
            data.associatedMappingFilesMatchingID = Number(
                data.associatedMappingFilesMatchingID
            )
            return {
                ok: true,
                data: data,
            }
        }
        return metaRes
    }

    decodeMessage(msg: Message): EvmOutput<DataswapMessage> {
        const decoder = new ContractMessageDecoder(this)
        const decodeRes = decoder.decode(msg)
        if (!decodeRes.ok && !decodeRes.data) {
            return { ok: false, error: decodeRes.error }
        }

        let result: DataswapMessage = decodeRes.data!.value() as DataswapMessage
        switch (decodeRes.data!.method) {
            case "createTarget":
                {
                    const params = {
                        matchingId: Number(result.params.matchingId),
                        datasetID: Number(result.params.datasetId),
                        dataType: Number(result.params.dataType) as DataType,
                        associatedMappingFilesMatchingID: Number(
                            result.params.associatedMappingFilesMatchingID
                        ),
                        replicaIndex: result.params.replicaIndex,
                    }
                    result.params = params
                    result.datasetId = Number(result.params.datasetID)
                    result.matchingId = Number(result.params.matchingId)
                }
                break
            case "publishMatching":
                {
                    const params = {
                        matchingId: Number(result.params.matchingId),
                        datasetID: Number(result.params.datasetId),
                        cars: mergeBigIntRangesToCompleteArray(
                            result.params.carsStarts,
                            result.params.carsEnds
                        ),
                        complete: result.params.complete,
                    }
                    result.params = params
                    result.datasetId = Number(result.params.datasetID)
                    result.matchingId = Number(result.params.matchingId)
                }
                break
            case "initDependencies":
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
