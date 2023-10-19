import { Cid } from "@unipackage/filecoin"
import { Replicas } from "../../replica/types"

export interface Car {
    id: number
    cid: Cid
    size: number
    datasetID: number
    replicas: Replicas
}
