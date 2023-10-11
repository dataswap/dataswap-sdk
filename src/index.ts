//Old type, to be delete
export type {
    DatasetChallengeProofType,
    DatasetDisputeType,
    DatasetOverviewType,
    DatasetProofType,
    DatasetReplicasType,
} from "./shared/types/datasetDraft"

export type {
    MatchingOverviewType,
    MatchingBidType,
} from "./shared/types/matchingDraft"

//New type
export type { DatasetInfo } from "./shared/types/dataset"

export type {
    DatasetCreateInfo,
    DatasetMetaInfo,
    DatasetOwnerInfo,
} from "./shared/types/dataset/meta"

export type {
    DatasetProofCreateInfo,
    DatasetProofInfo,
    DatasetLeafHash,
    DatasetLeafHashesMap,
} from "./shared/types/dataset/proof"

export type {
    DatasetChallengeCreateInfo,
    DatasetChallengesInfo,
    DatasetChallenge,
    DatasetChallengesMap,
} from "./shared/types/dataset/challenge"

export type {
    DatasetDisputeCreateInfo,
    DatasetDipputesInfo,
    DatasetDispute,
    DatasetDisputesMap,
} from "./shared/types/dataset/dispute"

export type {
    DatasetReplicasInfo,
    DatasetReplica,
    DatasetReplicasMap,
} from "./shared/types/dataset/replicas"

export type { MatchingInfo } from "./shared/types/matching"

export type {
    MatchingCreateInfo,
    MatchingMetaInfo,
} from "./shared/types/matching/meta"

export type {
    MatchingBid,
    MatchingBidCreateInfo,
    MatchingBidsMap,
} from "./shared/types/matching/bid"
