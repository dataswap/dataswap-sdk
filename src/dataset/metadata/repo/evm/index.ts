import {
    Web3Evm,
    withMethods,
    EvmOutput,
    isEvmTransactionOptions,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"
import { DatasetMetadata } from "../../types"

interface DatasetMetadataCallEvm {
    datasetsCount(id: number): Promise<EvmOutput<number>>
    getDatasetMetadata(id: number): Promise<EvmOutput<DatasetMetadata>>
    getDatasetMetadataSubmitter(id: number): Promise<EvmOutput<string>>
    getDatasetState(id: number): Promise<EvmOutput<String>>
    governanceAddress(): Promise<EvmOutput<string>>
    hasDatasetMetadata(accessMethod: string): Promise<EvmOutput<boolean>>
}

interface DatasetMetadataSendEvm {
    approveDataset(
        id: number,
        options: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
    approveDatasetMetadata(
        id: number,
        options: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
    rejectDataset(
        id: number,
        options: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
    rejectDatasetMetadata(
        id: number,
        options: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
    submitDatasetMetadata(
        title: string,
        name: string,
        description: string,
        sizeInBytes: number,
        industry: string,
        source: string,
        accessMethod: string,
        version: number,
        isPublic: boolean,
        options: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
}

export interface DatasetMetadataOriginEvm
    extends DatasetMetadataCallEvm,
        DatasetMetadataSendEvm {}

@withMethods(
    [
        "datasetsCount",
        "getDatasetMetadata",
        "getDatasetMetadataSubmitter",
        "getDatasetState",
        "governanceAddress",
        "hasDatasetMetadata",
    ],
    "call"
)
@withMethods(
    [
        "approveDataset",
        "approveDatasetMetadata",
        "rejectDataset",
        "rejectDatasetMetadata",
        "submitDatasetMetadata",
    ],
    "send",
    isEvmTransactionOptions
)
export class DatasetMetadataOriginEvm extends Web3Evm {}

export class DatasetMetadataEvm extends DatasetMetadataOriginEvm {
    async getDatasetMetadata(id: number): Promise<EvmOutput<DatasetMetadata>> {
        const metaRes = await super.getDatasetMetadata(id)
        if (metaRes.ok && metaRes.data) {
            return {
                ok: true,
                data: new DatasetMetadata({
                    ...metaRes.data,
                    datasetId: id,
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
            case "submitDatasetMetadata":
                result.datasetId = msg.MsgRct?.Return
                break
            case "approveDataset" ||
                "approveDatasetMetadata" ||
                "rejectDataset" ||
                "rejectDatasetMetadata":
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