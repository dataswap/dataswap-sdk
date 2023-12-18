import {
    Evm,
    withCallMethod,
    withSendMethod,
    EvmOutput,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"
import { DataType } from "../../../../shared/types/dataType"

interface DatasetProofCallEvm {
    getDatasetAppendCollateral(datasetId: number): EvmOutput<number>
    getDatasetProof(
        datasetId: number,
        dataType: DataType,
        index: number,
        len: number
    ): string[]
    getDatasetCars(
        datasetId: number,
        dataType: DataType,
        index: number,
        len: number
    ): string[]
    getDatasetProofCount(
        datasetId: number,
        dataType: DataType
    ): EvmOutput<number>
    getDatasetProofSubmitter(datasetId: number): EvmOutput<string>
    getDatasetCarsCount(
        datasetId: number,
        dataType: DataType
    ): EvmOutput<number>
    getDatasetSize(datasetId: number, dataType: DataType): EvmOutput<number>
    getDatasetCollateralRequirement(datasetId: number): EvmOutput<number>
    isDatasetContainsCar(datasetId: number, id: number): EvmOutput<boolean>
    isDatasetContainsCars(datasetId: number, ids: number[]): EvmOutput<boolean>
    isDatasetProofSubmitter(
        datasetId: number,
        submitter: string
    ): EvmOutput<boolean>
    isDatasetProofallCompleted(
        datasetId: number,
        dataType: DataType
    ): EvmOutput<boolean>
}

interface DatasetProofSendEvm {
    submitDatasetProofRoot(
        datasetId: number,
        dataType: DataType,
        mappingFilesAccessMethod: string,
        rootHash: string,
        options: EvmTransactionOptions
    ): EvmOutput<void>

    submitDatasetProof(
        datasetId: number,
        dataType: DataType,
        leafHashes: string[],
        leafIndex: number,
        leafSizes: number[],
        completed: boolean,
        options: EvmTransactionOptions
    ): EvmOutput<void>

    submitDatasetProofCompleted(
        datasetId: number,
        options: EvmTransactionOptions
    ): EvmOutput<void>

    appendDatasetCollateral(
        datasetId: number,
        options: EvmTransactionOptions
    ): EvmOutput<void>
}

export interface DatasetProofOriginEvm
    extends DatasetProofCallEvm,
        DatasetProofSendEvm {}

@withCallMethod([
    "getDatasetAppendCollateral",
    "getDatasetProof",
    "getDatasetCars",
    "getDatasetProofCount",
    "getDatasetProofSubmitter",
    "getDatasetCarsCount",
    "getDatasetSize",
    "getDatasetCollateralRequirement",
    "isDatasetContainsCar",
    "isDatasetContainsCars",
    "isDatasetProofSubmitter",
    "isDatasetProofallCompleted",
])
@withSendMethod([
    "submitDatasetProofRoot",
    "submitDatasetProof",
    "submitDatasetProofCompleted",
    "appendDatasetCollateral",
])
export class DatasetProofOriginEvm extends Evm {}

export class DatasetProofEvm extends DatasetProofOriginEvm {
    decodeMessage(msg: Message): EvmOutput<DataswapMessage> {
        const decoder = new ContractMessageDecoder(this)
        const decodeRes = decoder.decode(msg)
        if (!decodeRes.ok && !decodeRes.data) {
            return { ok: false, error: decodeRes.error }
        }

        let result: DataswapMessage = decodeRes.data as DataswapMessage
        switch (decodeRes.data!.method) {
            case "submitDatasetProofRoot" ||
                "submitDatasetProof" ||
                "submitDatasetProofCompleted" ||
                "appendDatasetCollateral":
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
