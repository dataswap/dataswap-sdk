import { State } from "../../shared/state/types"
import { Operate } from "../../shared/operate/types"

export interface Dataset extends State, Operate {
    id: number
    metadataId: number
    replicaIds: string //eg: [1-2,4,9,100]

    validWorkflowId: number
    workflowIds: string
}
