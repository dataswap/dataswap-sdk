import { DatasetMetaInfo } from "./meta"
import { DatasetProofInfo } from "./proof"
import { DatasetChallengesInfo } from "./challenge"
import { DatasetDipputesInfo } from "./dispute"
import { DatasetReplicasInfo } from "./replicas"
import { State } from "../state"
import { Operate } from "../operate"

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
