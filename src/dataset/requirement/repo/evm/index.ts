import {
    Evm,
    withCallMethod,
    withSendMethod,
    EvmOutput,
    isEvmTransactionOptions,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"
import { DatasetRequirement } from "../../types"

interface DatasetRequirementCallEvm {
    getDatasetReplicasCount(datasetId: number): EvmOutput<number>

    getDatasetReplicaRequirement(
        datasetId: number,
        index: number
    ): EvmOutput<DatasetRequirement>

    getDatasetPreCollateralRequirements(datasetId: number): EvmOutput<number>
}

interface DatasetRequirementSendEvm {
    submitDatasetReplicaRequirements(
        datasetId: number,
        dataPreparers: string[][],
        storageProviders: string[][],
        regions: number[],
        countrys: number[],
        citys: number[][],
        options: EvmTransactionOptions
    ): EvmOutput<void>
}

export interface DatasetRequirementOriginEvm
    extends DatasetRequirementCallEvm,
        DatasetRequirementSendEvm {}

@withCallMethod([
    "getDatasetChallengeProofs",
    "getDatasetChallengeProofsCount",
    "getChallengeCount",
    "isDatasetChallengeProofDuplicate",
])
@withSendMethod(["submitDatasetChallengeProofs"])
export class DatasetRequirementOriginEvm extends Evm {}

export class DatasetRequirementEvm extends DatasetRequirementOriginEvm {
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
