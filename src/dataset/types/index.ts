import { DatasetMetaData } from "../../base/metadata/types"
import { ApprovalRecords } from "./approvalRecord"
import { State } from "../../shared/state/types"
import { Operate } from "../../shared/operate/types"

export interface Dataset extends State, Operate {
    id: number
    metadata: DatasetMetaData
    currentApprovalRecordId: number
    approvalRecord: ApprovalRecords
}
