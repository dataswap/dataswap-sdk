import {
    Evm,
    withCallMethod,
    withSendMethod,
    EvmOutput,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"
import { DatasetMetadata, newDatasetMetadata } from "../../types"
import { decodeReternData } from "../../../../shared/decodeReturnData"

interface DatasetMetadataCallEvm {
    datasetsCount(): Promise<EvmOutput<number>>
    getDatasetMetadata(id: number): Promise<EvmOutput<any>>
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
        client: number,
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
        DatasetMetadataSendEvm {}

@withCallMethod([
    "datasetsCount",
    "getDatasetMetadata",
    "getDatasetMetadataSubmitter",
    "getDatasetState",
    "governanceAddress",
    "hasDatasetMetadata",
])
@withSendMethod([
    "initDependencies",
    "approveDataset",
    "approveDatasetMetadata",
    "rejectDataset",
    "rejectDatasetMetadata",
    "submitDatasetMetadata",
])
export class DatasetMetadataOriginEvm extends Evm {}

export class DatasetMetadataEvm extends DatasetMetadataOriginEvm {
    async getDatasetMetadata(id: number): Promise<EvmOutput<DatasetMetadata>> {
        const metaRes = await super.getDatasetMetadata(id)
        if (metaRes.ok && metaRes.data) {
            let dataRes = decodeReternData(
                newDatasetMetadata(),
                metaRes.data as unknown[]
            )
            dataRes.datasetId = id
            return {
                ok: true,
                data: dataRes,
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
