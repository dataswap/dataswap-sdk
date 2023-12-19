import { CarstoreEvm } from "../../../src/core/carstore/repo/evm"
import { DatacapsEvm } from "../../../src/module/datacaps/repo/evm"
import { DatasetMetadataEvm } from "../../../src/module/dataset/metadata/repo/evm"
import { DatasetChallengeEvm } from "../../../src/module/dataset/challenge/repo/evm"
import { DatasetProofEvm } from "../../../src/module/dataset/proof/repo/evm"
import { DatasetRequirementEvm } from "../../../src/module/dataset/requirement/repo/evm"
import { EscrowEvm } from "../../../src/core/escrow/repo/evm"
import { FilecoinEvm } from "../../../src/core/filecoin/repo/evm"
import { FilplusEvm } from "../../../src/core/filplus/repo/evm"
import { MatchingMetadataEvm } from "../../../src/module/matching/metadata/repo/evm"
import { MatchingBidsEvm } from "../../../src/module/matching/bids/repo/evm"
import { MatchingTargetEvm } from "../../../src/module/matching/target/repo/evm"
import { RolesEvm } from "../../../src/core/roles/repo/evm"
import { StoragesEvm } from "../../../src/module/storages/repo/evm"

export interface IContractsManager {
    CarstoreEvm(): CarstoreEvm
    DatacapsEvm(): DatacapsEvm
    DatasetMetadataEvm(): DatasetMetadataEvm
    DatasetChallengeEvm(): DatasetChallengeEvm
    DatasetProofEvm(): DatasetProofEvm
    DatasetRequirementEvm(): DatasetRequirementEvm
    EscrowEvm(): EscrowEvm
    FilecoinEvm(): FilecoinEvm
    FilplusEvm(): FilplusEvm
    MatchingMetadataEvm(): MatchingMetadataEvm
    MatchingBidsEvm(): MatchingBidsEvm
    MatchingTargetEvm(): MatchingTargetEvm
    RolesEvm(): RolesEvm
    StoragesEvm(): StoragesEvm
    setupContractsRoles(): Promise<void>
    setupAccountsRoles(): Promise<void>
    setupContractsDependencies(): Promise<void>
}
