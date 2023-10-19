import { DatasetMetaInfo } from "./meta"
import { DatasetProofInfo } from "./proof"
import { DatasetChallengesInfo } from "./challenge"
import { DatasetDipputesInfo } from "./dispute"
import { DatasetReplicasInfo } from "./replicas"
import { State } from "../basic/state/types"
import { Operate } from "../basic/operate/types"

export interface DatasetInfo extends State, Operate {
    metadata: DatasetMetaInfo
    mappingFilesAccessMethod?: string

    sourceProof: DatasetProofInfo
    mappingFilesProof: DatasetProofInfo
    proofSubmitter: string

    proofChallenge: DatasetChallengesInfo
    disputes: DatasetDipputesInfo
    replicas: DatasetReplicasInfo
}
