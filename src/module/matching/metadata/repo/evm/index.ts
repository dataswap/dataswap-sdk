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
    isEvmTransactionOptions,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../../message/types"
import { MatchingMetadata, MatchingState, BidSelectionRule } from "../../types"
import { EvmEx } from "../../../../../shared/types/evmEngineType"

/**
 * Interface representing the data structure for matching metadata (call EVM).
 * @interface
 */
interface MatchingMetadataCallEvm {
    /**
     * Retrieves the initiator associated with a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @returns A Promise resolving to the initiator's address.
     */
    getMatchingInitiator(matchingId: number): Promise<EvmOutput<string>>
    /**
     * Retrieves the state of a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @returns A Promise resolving to the MatchingState enum value.
     */
    getMatchingState(matchingId: number): Promise<EvmOutput<MatchingState>>
    /**
     * Retrieves the metadata associated with a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @returns A Promise resolving to the MatchingMetadata object.
     */
    getMatchingMetadata(
        matchingId: number
    ): Promise<EvmOutput<MatchingMetadata>>
}

/**
 * Interface representing the data structure for matching metadata (send EVM).
 * @interface
 */
interface MatchingMetadataSendEvm {
    /**
     * Creates a new matching with the specified parameters.
     * @param datasetId - The ID of the dataset for the matching.
     * @param bidSelectionRule - The rule used for bid selection.
     * @param biddingDelayBlockCount - The block count for bidding delay.
     * @param biddingPeriodBlockCount - The block count for the bidding period.
     * @param storageCompletionPeriodBlocks - The block count for the storage completion period.
     * @param biddingThreshold - The threshold for bidding.
     * @param replicaIndex - The index of the replica.
     * @param additionalInfo - Additional information for the matching.
     * @param options - EVM transaction options.
     * @returns A Promise resolving to the output of the EVM transaction (void).
     */
    createMatching(
        datasetId: number,
        bidSelectionRule: BidSelectionRule,
        biddingDelayBlockCount: bigint,
        biddingPeriodBlockCount: bigint,
        storageCompletionPeriodBlocks: bigint,
        biddingThreshold: bigint,
        replicaIndex: bigint,
        additionalInfo: string,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
    /**
     * Pauses a specific matching identified by its ID.
     * @param matchingId - The ID of the matching to pause.
     * @param options - EVM transaction options.
     * @returns A Promise resolving to the output of the EVM transaction (void).
     */
    pauseMatching(
        matchingId: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
    /**
     * Resumes a specific matching identified by its ID.
     * @param matchingId - The ID of the matching to resume.
     * @param options - EVM transaction options.
     * @returns A Promise resolving to the output of the EVM transaction (void).
     */
    resumeMatching(
        matchingId: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
}
/**
 * Combined interface for EVM calls and transactions related to MatchingMetadata contract.
 */
export interface MatchingMetadataOriginEvm
    extends MatchingMetadataCallEvm,
        MatchingMetadataSendEvm {}

/**
 * Implementation of MatchingMetadataOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "getMatchingInitiator",
    "getMatchingState",
    "getMatchingMetadata",
])
@withSendMethod(["createMatching", "pauseMatching", "resumeMatching"])
export class MatchingMetadataOriginEvm extends EvmEx {}

/**
 * Extended class for MatchingMetadataEvm with additional message decoding.
 */
export class MatchingMetadataEvm extends MatchingMetadataOriginEvm {
    async getMatchingMetadata(
        matchingId: number
    ): Promise<EvmOutput<MatchingMetadata>> {
        const metaRes = await super.getMatchingMetadata(matchingId)
        if (metaRes.ok && metaRes.data) {
            let data = new MatchingMetadata({
                ...metaRes.data,
                matchingId: matchingId,
            })
            data.bidSelectionRule = Number(
                data.bidSelectionRule
            ) as BidSelectionRule
            return {
                ok: true,
                data: data,
            }
        }
        return metaRes
    }

    async getMatchingState(
        matchingId: number
    ): Promise<EvmOutput<MatchingState>> {
        const metaRes = await super.getMatchingState(matchingId)
        if (metaRes.ok && metaRes.data) {
            return {
                ok: true,
                data: Number(metaRes.data) as MatchingState,
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
            case "createMatching":
                result.matchingId = Number(result.return)
                result.params.datasetId = Number(result.params.datasetId)
                result.params.bidSelectionRule = Number(
                    result.params.bidSelectionRule
                ) as BidSelectionRule
                result.params.matchingId = result.matchingId
                result.params.initiator = result.from
                result.params.createdBlockNumber = BigInt(result.height)
                result.params.biddingStartBlock =
                    result.params.createdBlockNumber +
                    BigInt(result.params.biddingDelayBlockCount)
                result.params.biddingEndBlock =
                    result.params.createdBlockNumber +
                    BigInt(result.params.biddingDelayBlockCount) +
                    BigInt(result.params.biddingPeriodBlockCount)
                result.params.size = BigInt(0)
                result.params.currentPrice = BigInt(
                    result.params.biddingThreshold
                )
                result.params.subsidy = BigInt(0)
                break
            case "pauseMatching":
            case "resumeMatching":
                result.matchingId = Number(result.params.matchingId)
                result.params.matchingId = result.matchingId
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
