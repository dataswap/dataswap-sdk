import { Cid, Hash } from "@unipackage/filecoin"

enum DataType {
    Source,
    MappingFiles,
}
// generator when proof
export interface Car {
    datasetID: number
    dataType: DataType
    id: number
    hash: Hash
    cid: Cid
    size: number
    msgCid: Cid
}
