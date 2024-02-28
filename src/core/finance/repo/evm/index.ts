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
import { AccountOverview, AccountIncome, AccountEscrow } from "../../types"
import { EvmEx } from "../../../../shared/types/evmEngineType"
import { EscrowType } from "../../../../shared/types/financeType"

/**
 * Interface for EVM calls related to Finance.
 */
interface FinanceCallEvm {
    /**
     * Retrieves the account overview for a specific dataset, matching process, owner, and token.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for the account overview (e.g., FIL, ERC-20).
     * @returns A Promise resolving to the account overview information.
     */
    getAccountOverview(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string
    ): Promise<EvmOutput<AccountOverview>>

    /**
     * Retrieves the account income details for a specific dataset, matching process, owner, token, and escrow type.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for trading income details (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @returns A Promise resolving to the account income information.
     */
    getAccountIncome(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        type: EscrowType
    ): Promise<EvmOutput<AccountIncome>>

    /**
     * Retrieves the account escrow details for a specific dataset, matching process, owner, token, and escrow type.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for the escrowed amount (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @returns A Promise resolving to the account escrow information.
     */
    getAccountEscrow(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        type: EscrowType
    ): Promise<EvmOutput<AccountEscrow>>

    /**
     * Retrieves the required escrow amount for a specific dataset, matching process, owner, token, and escrow type.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for the escrow requirement (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @returns A Promise resolving to the required escrow amount as a bigint.
     */
    getEscrowRequirement(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        type: EscrowType
    ): Promise<EvmOutput<bigint>>

    /**
     * Checks if the escrowed funds are enough for a specific dataset, matching process, owner, token, and escrow type.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for escrow checking (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @returns A Promise resolving to a boolean indicating whether the escrowed funds are enough.
     */
    isEscrowEnough(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        type: EscrowType
    ): Promise<EvmOutput<boolean>>
}

/**
 * Interface for EVM transactions related to Finance.
 */
interface FinanceSendEvm {
    /**
     * Deposits funds into the specified dataset, matching process, owner, and token.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for the deposit (e.g., FIL, ERC-20).
     * @param options The options of transaction.
     * @returns A Promise resolving to the transaction output.
     */
    deposit(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Withdraws funds from the specified dataset, matching process, owner, token, and amount.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param owner The address of the account owner.
     * @param token The type of token for withdrawal (e.g., FIL, ERC-20).
     * @param amount The amount to be withdrawn as a bigint.
     * @param options The options of transaction.
     * @returns A Promise resolving to the transaction output.
     */
    withdraw(
        datasetId: number,
        matchingId: number,
        owner: string,
        token: string,
        amount: bigint,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Escrows funds in the specified dataset, matching process, token, and escrow type.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param token The type of token for escrow (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @param options The options of transaction.
     * @returns A Promise resolving to the transaction output.
     */
    escrow(
        datasetId: number,
        matchingId: number,
        token: string,
        type: EscrowType,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Claims escrowed funds for the specified dataset, matching process, token, and escrow type.
     * @param datasetId The ID of the dataset.
     * @param matchingId The ID of the matching process.
     * @param token The type of token for escrow handling (e.g., FIL, ERC-20).
     * @param type The type of escrow (e.g., deposit, payment).
     * @param options The options of transaction.
     * @returns A Promise resolving to the transaction output.
     */
    claimEscrow(
        datasetId: number,
        matchingId: number,
        token: string,
        type: EscrowType,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
}

/**
 * Combined interface for EVM calls and transactions related to Finance.
 */
export interface FinanceOriginEvm extends FinanceCallEvm, FinanceSendEvm {}

/**
 * Implementation of FinanceOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "getAccountOverview",
    "getAccountIncome",
    "getAccountEscrow",
    "getEscrowRequirement",
    "isEscrowEnough",
])
@withSendMethod(["deposit", "withdraw", "escrow", "claimEscrow"])
export class FinanceOriginEvm extends EvmEx {}

/**
 * Extended class for FinanceOriginEvm with additional message decoding.
 */
export class FinanceEvm extends FinanceOriginEvm {
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
            case "deposit":
            case "withdraw":
            case "escrow":
            case "claimEscrow":
                result.datasetId = Number(result.params.datasetId)
                result.params.datasetId = result.datasetId
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
