import { Cid } from "@unipackage/filecoin"

export interface DatasetMaintain {
    id: number
    datasetId: number
    operate?: string
    operateTime: string
    msgCid: Cid
}
