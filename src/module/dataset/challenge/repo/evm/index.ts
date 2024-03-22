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
import { DatasetChallenge } from "../../types"
import { EvmEx } from "../../../../../shared/types/evmEngineType"
import { convertToStringArray } from "../../../../../shared/arrayUtils"
import { ethAddressFromDelegated } from "@glif/filecoin-address"

/**
 * Interface for EVM calls related to DatasetChallenge.
 */
interface DatasetChallengeCallEvm {
    /**
     * Retrieves the submitters of challenge proofs for the dataset with the specified ID.
     * @param datasetId The ID of the dataset.
     * @returns A promise resolving to the submitters of challenge proofs.
     */
    getDatasetChallengeProofsSubmitters(
        datasetId: number
    ): Promise<EvmOutput<any>>

    /**
     * Get proofs for a dataset challenge.
     *
     * @param datasetId - ID of the dataset.
     * @param auditor - Auditor's address.
     * @returns EvmOutput containing DatasetChallenge information.
     */
    getDatasetChallengeProofs(
        datasetId: number,
        auditor: string
    ): Promise<EvmOutput<any>>

    /**
     * Get the count of proofs for a dataset challenge.
     *
     * @param datasetId - ID of the dataset.
     * @returns EvmOutput containing the number of proofs.
     */
    getDatasetChallengeProofsCount(
        datasetId: number
    ): Promise<EvmOutput<number>>

    /**
     * Get the count of challenges for a dataset.
     *
     * @param datasetId - ID of the dataset.
     * @returns EvmOutput containing the number of challenges.
     */
    getChallengeSubmissionCount(datasetId: number): Promise<EvmOutput<number>>

    /**
     * @dev Retrieves the auditor candidates for a specific dataset.
     * @param datasetId The ID of the dataset.
     * @returns A promise resolving to an array of auditor candidates' addresses.
     */
    getDatasetAuditorCandidates(datasetId: number): Promise<EvmOutput<string[]>>

    /**
     * @dev Retrieves the end height of the auditor election for a specific dataset.
     * @param datasetId The ID of the dataset.
     * @returns A promise resolving to the end height of the auditor election.
     */
    getAuditorElectionEndHeight(datasetId: number): Promise<EvmOutput<number>>

    /**
     * @dev Checks if an account is a winner for a specific dataset.
     * @param datasetId The ID of the dataset.
     * @param account The account address.
     * @returns A promise resolving to a boolean indicating whether the account is a winner.
     */
    isWinner(datasetId: number, account: string): Promise<EvmOutput<boolean>>

    /**
     * Check if a dataset challenge proof is duplicate.
     *
     * @param datasetId - ID of the dataset.
     * @param auditor - Auditor's address.
     * @param randomSeed - Random seed for the proof.
     * @returns EvmOutput with `true` if the proof is duplicate, `false` otherwise.
     */
    isDatasetChallengeProofDuplicate(
        datasetId: number,
        auditor: string,
        randomSeed: bigint
    ): Promise<EvmOutput<boolean>>

    /**
     * Checks if the audit timeout for the dataset with the specified ID has occurred.
     * @param datasetId The ID of the dataset.
     * @returns A promise resolving to a boolean indicating whether the audit timeout has occurred.
     */
    isDatasetAuditTimeout(datasetId: number): Promise<EvmOutput<boolean>>

    /**
     * Retrieves the roles associated with the current user.
     * @returns A promise that resolves with the roles of the current user.
     */
    roles(): Promise<EvmOutput<string>>
}

/**
 * Interface for EVM transactions related to DatasetChallenge.
 */
interface DatasetChallengeSendEvm {
    /**
     *  Stakes an amount by the auditor for a specific dataset.
     *
     * @param datasetId The ID of the dataset.
     * @returns A promise resolving to the transaction receipt.
     */
    nominateAsDatasetAuditorCandidate(
        datasetId: number
    ): Promise<EvmOutput<void>>
    /**
     * Submit proofs for a dataset challenge.
     *
     * @param datasetId - ID of the dataset.
     * @param randomSeed - Random seed for the proof.
     * @param leaves - Array of string leaves.
     * @param siblings - Array of arrays of string siblings.
     * @param paths - Array of string paths.
     * @param options - EVM transaction options.
     * @returns EvmOutput with no data on success.
     */
    submitDatasetChallengeProofs(
        datasetId: number,
        randomSeed: bigint,
        leaves: string[],
        siblings: string[][],
        paths: bigint[],
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
}

/**
 * Combined interface for EVM calls and transactions related to DatasetChallenge.
 */
export interface DatasetChallengeOriginEvm
    extends DatasetChallengeCallEvm,
        DatasetChallengeSendEvm {}

/**
 * Implementation of DatasetChallengeOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "getDatasetChallengeProofsSubmitters",
    "getDatasetChallengeProofs",
    "getDatasetChallengeProofsCount",
    "getChallengeSubmissionCount",
    "getDatasetAuditorCandidates",
    "getAuditorElectionEndHeight",
    "isWinner",
    "isDatasetChallengeProofDuplicate",
    "isDatasetAuditTimeout",
    "roles",
])
@withSendMethod([
    "nominateAsDatasetAuditorCandidate",
    "submitDatasetChallengeProofs",
])
export class DatasetChallengeOriginEvm extends EvmEx {}

/**
 * Extended class for DatasetChallengeOriginEvm with additional message decoding.
 */
export class DatasetChallengeEvm extends DatasetChallengeOriginEvm {
    /**
     * Retrieves the submitters of challenge proofs for the dataset with the specified ID.
     * @param datasetId The ID of the dataset.
     * @returns A promise resolving to the submitters of challenge proofs.
     */
    async getDatasetChallengeProofsSubmitters(
        datasetId: number
    ): Promise<EvmOutput<[auditors: string[], points: number[]]>> {
        const res = await super.getDatasetChallengeProofsSubmitters(datasetId)
        if (res.ok && res.data) {
            return {
                ok: true,
                data: [res.data.auditors, res.data.points],
            }
        }
        return res
    }
    /**
     * Get proofs for a dataset challenge.
     * @param datasetId - ID of the dataset.
     * @param auditor - Auditor's address.
     * @returns EvmOutput containing DatasetChallenge information.
     */
    async getDatasetChallengeProofs(
        datasetId: number,
        auditor: string
    ): Promise<EvmOutput<DatasetChallenge>> {
        const res = await super.getDatasetChallengeProofs(datasetId, auditor)
        if (res.ok && res.data) {
            let data = new DatasetChallenge({
                ...res.data,
                datasetId: datasetId,
                auditor: auditor,
            })

            data.paths = convertToStringArray(res.data.paths)

            return {
                ok: true,
                data: data,
            }
        }
        return res
    }

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
            case "submitDatasetChallengeProofs":
                result.datasetId = Number(result.params.datasetId)
                result.params.datasetId = result.datasetId
                result.params.auditor = ethAddressFromDelegated(msg.Msg.From)
                result.params.paths = convertToStringArray(result.params.paths)
                break
            case "nominateAsDatasetAuditorCandidate":
                result.datasetId = Number(result.params.datasetId)
                result.params.datasetId = result.datasetId
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
