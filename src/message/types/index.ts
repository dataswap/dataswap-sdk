import { ContractMessage } from "@unipackage/filecoin"
export interface DataswapMessage extends ContractMessage {
    datasetId?: number
    matchingId?: number
}
