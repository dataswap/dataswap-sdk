import {
    Evm,
    withCallMethod,
    withSendMethod,
    EvmOutput,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../../message/types"
import { DatasetChallenge } from "../../types"
import { EvmEx } from "../../../../../shared/types/evmEngineType"

/**
 * Interface for EVM calls related to DatasetChallenge.
 */
interface DatasetChallengeCallEvm {
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
    ): Promise<EvmOutput<DatasetChallenge>>

    /**
     * Get the count of proofs for a dataset challenge.
     *
     * @param datasetId - ID of the dataset.
     * @returns EvmOutput containing the number of proofs.
     */
    getDatasetChallengeProofsCount(datasetId: number): Promise<EvmOutput<number>>

    /**
     * Get the count of challenges for a dataset.
     *
     * @param datasetId - ID of the dataset.
     * @returns EvmOutput containing the number of challenges.
     */
    getChallengeSubmissionCount(datasetId: number): Promise<EvmOutput<number>>

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
        randomSeed: number
    ): Promise<EvmOutput<boolean>>
}

/**
 * Interface for EVM transactions related to DatasetChallenge.
 */
interface DatasetChallengeSendEvm {
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
        randomSeed: number,
        leaves: string[],
        siblings: string[][],
        paths: number[],
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
}

/**
 * Combined interface for EVM calls and transactions related to DatasetChallenge.
 */
export interface DatasetChallengeOriginEvm
    extends DatasetChallengeCallEvm,
    DatasetChallengeSendEvm { }

/**
 * Implementation of DatasetChallengeOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "getDatasetChallengeProofs",
    "getDatasetChallengeProofsCount",
    "getChallengeSubmissionCount",
    "isDatasetChallengeProofDuplicate",
])
@withSendMethod(["submitDatasetChallengeProofs"])
export class DatasetChallengeOriginEvm extends EvmEx { }

/**
 * Extended class for DatasetChallengeOriginEvm with additional message decoding.
 */
export class DatasetChallengeEvm extends DatasetChallengeOriginEvm {
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

        let result: DataswapMessage = decodeRes.data as DataswapMessage
        switch (decodeRes.data!.method) {
            case "submitDatasetChallengeProofs":
                result.datasetId = result.params.datasetId
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
