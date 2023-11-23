import {
    Web3Evm,
    withMethods,
    EvmOutput,
    isEvmTransactionOptions,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"
import { DatasetChallenge } from "../../types"

interface DatasetChallengeCallEvm {
    getDatasetChallengeProofs(
        datasetId: number,
        auditor: string
    ): EvmOutput<DatasetChallenge>
    getDatasetChallengeProofsCount(datasetId: number): EvmOutput<number>
    getChallengeCount(datasetId: number): EvmOutput<number>
    isDatasetChallengeProofDuplicate(
        datasetId: number,
        auditor: string,
        randomSeed: number
    ): EvmOutput<boolean>
}

interface DatasetChallengeSendEvm {
    submitDatasetChallengeProofs(
        datasetId: number,
        randomSeed: number,
        leaves: string[],
        siblings: string[][],
        paths: string[],
        options: EvmTransactionOptions
    ): EvmOutput<void>
}

export interface DatasetChallengeOriginEvm
    extends DatasetChallengeCallEvm,
        DatasetChallengeSendEvm {}

@withMethods(
    [
        "getDatasetChallengeProofs",
        "getDatasetChallengeProofsCount",
        "getChallengeCount",
        "isDatasetChallengeProofDuplicate",
    ],
    "call"
)
@withMethods(["submitDatasetChallengeProofs"], "send", isEvmTransactionOptions)
export class DatasetChallengeOriginEvm extends Web3Evm {}

export class DatasetChallengeEvm extends DatasetChallengeOriginEvm {
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
