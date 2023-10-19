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
export type { DatasetInfo } from "./dataset"

export type {
    DatasetCreateInfo,
    DatasetMetaInfo,
    DatasetOwnerInfo,
} from "./dataset/meta"

export type {
    DatasetProofCreateInfo,
    DatasetProofInfo,
    Leaves,
} from "./dataset/proof"

export type {
    DatasetChallengeCreateInfo,
    DatasetChallengesInfo,
    DatasetChallenge,
    DatasetChallengesMap,
} from "./dataset/challenge"

export type {
    DatasetDisputeCreateInfo,
    DatasetDipputesInfo,
    DatasetDispute,
    DatasetDisputesMap,
} from "./dataset/dispute"

export type {
    DatasetReplicasInfo,
    DatasetReplica,
    DatasetReplicasMap,
} from "./dataset/replicas"

export type { MatchingInfo } from "./matching"

export type { MatchingCreateInfo, MatchingMetaInfo } from "./matching/meta"

export type {
    MatchingBid,
    MatchingBidCreateInfo,
    MatchingBidsMap,
} from "./matching/bid"
