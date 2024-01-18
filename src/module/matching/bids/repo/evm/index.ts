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
import { MatchingBids } from "../../types"
import { EvmEx } from "../../../../../shared/types/evmEngineType"

/**
 * Interface representing the data structure for calling matching bids in an EVM environment.
 * @interface
 */
interface MatchingBidsCallEvm {
    matchings(): Promise<EvmOutput<string>>
    matchingsTarget(): Promise<EvmOutput<string>>
    /**
     * Retrieves the bids associated with a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @returns A Promise resolving to the MatchingBids object.
     */
    getMatchingBids(matchingId: number): Promise<EvmOutput<MatchingBids>>

    /**
     * Retrieves the bid amount for a specific bidder in a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param bidder - The address of the bidder.
     * @returns A Promise resolving to the bid amount.
     */
    getMatchingBidAmount(
        matchingId: number,
        bidder: string
    ): Promise<EvmOutput<bigint>>
    /**
     * Retrieves the count of bids for a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @returns A Promise resolving to the count of bids.
     */
    getMatchingBidsCount(matchingId: number): Promise<EvmOutput<number>>
    /**
     * Retrieves the winner of a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param candidate - The address of the candidate.
     * @returns A Promise resolving to the address of the winner.
     */
    getMatchingWinner(matchingId: number): Promise<EvmOutput<string>>
    /**
     * Retrieves the winners of multiple matchings identified by their IDs.
     * @param matchingIds - An array of matching IDs.
     * @returns A Promise resolving to an array of winner addresses.
     */
    getMatchingWinners(matchingIds: number[]): Promise<EvmOutput<string[]>>
    /**
     * Checks if a bidder has placed a bid in a matching identified by its ID.
     * @param matchingId - The ID of the matching.
     * @param bidder - The address of the bidder.
     * @returns A Promise resolving to a boolean indicating whether the bidder has placed a bid.
     */
    hasMatchingBid(
        matchingId: number,
        bidder: string
    ): Promise<EvmOutput<boolean>>
}

/**
 * Interface representing the data structure for sending matching bids in an EVM environment.
 * @interface
 */
interface MatchingBidsSendEvm {
    /**
     * Initializes dependencies for the contract.
     * @param matchings - The address of the matchings contract.
     * @param matchingsTarget - The address of the matchingsTarget contract.
     * @param options - EVM transaction options.
     * @returns A Promise resolving to the output of the EVM transaction (void).
     */
    initDependencies(
        matchings: string,
        matchingsTarget: string,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Places a bid in a matching with the specified parameters.
     * @param matchingId - The ID of the matching to place a bid.
     * @param amount - The amount of the bid.
     * @param options - EVM transaction options.
     * @returns A Promise resolving to the output of the EVM transaction (void).
     */
    bidding(
        matchingId: number,
        amount: bigint,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Cancels a specific matching identified by its ID.
     * @param matchingId - The ID of the matching to cancel.
     * @param options - EVM transaction options.
     * @returns A Promise resolving to the output of the EVM transaction (void).
     */
    cancelMatching(
        matchingId: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Closes a specific matching identified by its ID.
     * @param matchingId - The ID of the matching to close.
     * @param options - EVM transaction options.
     * @returns A Promise resolving to the output of the EVM transaction (void).
     */
    closeMatching(
        matchingId: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
}

/**
 * Combined interface for EVM calls and transactions related to MatchingBids contract.
 */
export interface MatchingBidsOriginEvm
    extends MatchingBidsCallEvm,
        MatchingBidsSendEvm {}

/**
 * Implementation of MatchingBidsOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "matchings",
    "matchingsTarget",
    "getMatchingBids",
    "getMatchingBidAmount",
    "getMatchingBidsCount",
    "getMatchingWinner",
    "getMatchingWinners",
    "hasMatchingBid",
])
@withSendMethod([
    "initDependencies",
    "bidding",
    "cancelMatching",
    "closeMatching",
])
export class MatchingBidsOriginEvm extends EvmEx {}
/**
 * Extended class for MatchingBidsEvm with additional message decoding.
 */
export class MatchingBidsEvm extends MatchingBidsOriginEvm {
    async getMatchingBids(
        matchingId: number
    ): Promise<EvmOutput<MatchingBids>> {
        const metaRes = await super.getMatchingBids(matchingId)
        if (metaRes.ok && metaRes.data) {
            return {
                ok: true,
                data: new MatchingBids({
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

        let result: DataswapMessage =
            decodeRes.data!.values() as DataswapMessage
        switch (decodeRes.data!.method) {
            case "bidding":
                result.matchingId = Number(result.params.matchingId)
                result.params.matchingId = result.matchingId
                result.params.bidder = msg.Msg.From
                result.params.createdBlockNumber = BigInt(result.height)
                break
            case "cancelMatching":
            case "closeMatching":
                result.matchingId = Number(result.params.matchingId)
                result.params.matchingId = result.matchingId
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
