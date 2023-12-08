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
    datasetsCount(): Promise<EvmOutput<number>>
    getDatasetMetadata(id: number): Promise<EvmOutput<DatasetMetadata>>
    getDatasetMetadataSubmitter(id: number): Promise<EvmOutput<string>>
    getDatasetState(id: number): Promise<EvmOutput<number>>
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
        industry: string,
        name: string,
        description: string,
        source: string,
        accessMethod: string,
        sizeInBytes: number,
        isPublic: boolean,
        version: number,
        options: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
}

export interface DatasetMetadataOriginEvm
    extends DatasetMetadataCallEvm,
    DatasetMetadataSendEvm { }

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
        "initDependencies",
        "approveDataset",
        "approveDatasetMetadata",
        "rejectDataset",
        "rejectDatasetMetadata",
        "submitDatasetMetadata",
    ],
    "send",
    isEvmTransactionOptions
)
export class DatasetMetadataOriginEvm extends Web3Evm { }

export class DatasetMetadataEvm extends DatasetMetadataOriginEvm {
    async getDatasetMetadata(id: number): Promise<EvmOutput<DatasetMetadata>> {
        const metaRes = await super.getDatasetMetadata(id)
        if (metaRes.ok && metaRes.data) {
            return {
                ok: true,
                data: new DatasetMetadata({
                    title: metaRes.data[0],
                    industry: metaRes.data[1],
                    name: metaRes.data[2],
                    description: metaRes.data[3],
                    source: metaRes.data[4],
                    accessMethod: metaRes.data[5],
                    submitter: metaRes.data[6],
                    createdBlockNumber: Number(metaRes.data[7]),
                    sizeInBytes: Number(metaRes.data[8]),
                    isPublic: metaRes.data[9],
                    version: Number(metaRes.data[10]),
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
