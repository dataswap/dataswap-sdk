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
    getMatchingMetadata(matchingId: number): Promise<EvmOutput<MatchingMetadata>>
}

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
        biddingDelayBlockCount: number,
        biddingPeriodBlockCount: number,
        storageCompletionPeriodBlocks: number,
        biddingThreshold: bigint,
        replicaIndex: number,
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
    MatchingMetadataSendEvm { }

/**
 * Implementation of MatchingMetadataOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "getMatchingInitiator",
    "getMatchingState",
    "getMatchingMetadata",
])
@withSendMethod([
    "createMatching",
    "pauseMatching",
    "resumeMatching",
])

export class MatchingMetadataOriginEvm extends EvmEx { }

/**
 * Extended class for MatchingMetadataEvm with additional message decoding.
 */
export class MatchingMetadataEvm extends MatchingMetadataOriginEvm {
    async getMatchingMetadata(matchingId: number): Promise<EvmOutput<MatchingMetadata>> {
        const metaRes = await super.getMatchingMetadata(matchingId)
        if (metaRes.ok && metaRes.data) {
            return {
                ok: true,
                data: new MatchingMetadata({
                    ...metaRes.data,
                    matchingId: matchingId,
                }),
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

        let result: DataswapMessage = decodeRes.data as DataswapMessage
        switch (decodeRes.data!.method) {
            case "createMatching":
                result.matchingId = msg.MsgRct?.Return
                break
            case "pauseMatching" ||
                "resumeMatching":
                result.matchingId = result.params.matchingId
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
