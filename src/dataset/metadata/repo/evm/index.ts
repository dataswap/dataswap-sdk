import {
    Web3Evm,
    withMethods,
    EvmOutput,
    EvmDecodeOutPut,
    isEvmTransactionOptions,
    EvmTransactionOptions,
} from "@unipackage/net"
import { DatasetMetadataBasic } from "../../type"
import { Message } from "@unipackage/filecoin"

interface DatasetMetadataCallEvm {
    datasetsCount(id: number): Promise<EvmOutput<number>>
    getDatasetMetadata(id: number): Promise<EvmOutput<DatasetMetadataBasic>>
    getDatasetMetadataSubmitter(id: number): Promise<EvmOutput<string>>
    getDatasetState(id: number): Promise<EvmOutput<DatasetMetadataBasic>>
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

export interface DatasetMetadataEvm
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
export class DatasetMetadataEvm extends Web3Evm {
    decodeMessage(msg: Message): EvmOutput<EvmDecodeOutPut> {
        const res = this.decodeTxInput(msg.Msg.Params)
        if (!res.ok && !res.data) {
            return { ok: false, error: res.error }
        }
        let params = {
            //TODO: to be delete
            datasetId: 0,
            ...res.data!.params,
            msgCid: msg.MsgCid,
            submitter: msg.Msg.From,
            createdBlockNumber: msg.Height,
        }
        if (res.data!.method === "submitDatasetMetadata") {
            //TODO: to be update
            params.datasetId = msg.MsgRct?.Return
        }

        return {
            ok: true,
            data: {
                method: res.data!.method,
                params: params,
            },
        }
    }
}
