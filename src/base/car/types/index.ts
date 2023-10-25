import { Cid, Hash } from "@unipackage/filecoin"
import { DataType } from "../../../shared/types/dataType"

// generator when proof
export interface Car {
    id: number
    datasetID: number
    dataType: DataType
    datasetInternalCarId: number
    hash: Hash
    cid: Cid
    size: number
    msgCid: Cid
}
