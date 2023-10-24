import { DatasetMetaData } from "../../base/metadata/types"
import { DatasetReplica } from "../../base/datasetReplica/types"
import { Workflows } from "./workflow"
import { State } from "../../shared/state/types"
import { Operate } from "../../shared/operate/types"

export interface Dataset extends State, Operate {
    id: number
    metadata: DatasetMetaData
    replicas: Array<DatasetReplica>

    validWorkflowId: number
    workflows: Workflows
}
