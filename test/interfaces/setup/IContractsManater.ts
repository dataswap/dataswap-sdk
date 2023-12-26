/*******************************************************************************
 *   (c) 2023 dataswap
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/

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
    /**
     * Returns the CarstoreEvm instance.
     * @returns An instance of CarstoreEvm.
     */
    CarstoreEvm(): CarstoreEvm

    /**
     * Returns the DatacapsEvm instance.
     * @returns An instance of DatacapsEvm.
     */
    DatacapsEvm(): DatacapsEvm

    /**
     * Returns the DatasetMetadataEvm instance.
     * @returns An instance of DatasetMetadataEvm.
     */
    DatasetMetadataEvm(): DatasetMetadataEvm

    /**
     * Returns the DatasetChallengeEvm instance.
     * @returns An instance of DatasetChallengeEvm.
     */
    DatasetChallengeEvm(): DatasetChallengeEvm

    /**
     * Returns the DatasetProofEvm instance.
     * @returns An instance of DatasetProofEvm.
     */
    DatasetProofEvm(): DatasetProofEvm

    /**
     * Returns the DatasetRequirementEvm instance.
     * @returns An instance of DatasetRequirementEvm.
     */
    DatasetRequirementEvm(): DatasetRequirementEvm

    /**
     * Returns the EscrowEvm instance.
     * @returns An instance of EscrowEvm.
     */
    EscrowEvm(): EscrowEvm

    /**
     * Returns the FilecoinEvm instance.
     * @returns An instance of FilecoinEvm.
     */
    FilecoinEvm(): FilecoinEvm

    /**
     * Returns the FilplusEvm instance.
     * @returns An instance of FilplusEvm.
     */
    FilplusEvm(): FilplusEvm

    /**
     * Returns the MatchingMetadataEvm instance.
     * @returns An instance of MatchingMetadataEvm.
     */
    MatchingMetadataEvm(): MatchingMetadataEvm

    /**
     * Returns the MatchingBidsEvm instance.
     * @returns An instance of MatchingBidsEvm.
     */
    MatchingBidsEvm(): MatchingBidsEvm

    /**
     * Returns the MatchingTargetEvm instance.
     * @returns An instance of MatchingTargetEvm.
     */
    MatchingTargetEvm(): MatchingTargetEvm

    /**
     * Returns the RolesEvm instance.
     * @returns An instance of RolesEvm.
     */
    RolesEvm(): RolesEvm

    /**
     * Returns the StoragesEvm instance.
     * @returns An instance of StoragesEvm.
     */
    StoragesEvm(): StoragesEvm

    /**
     * Sets up contracts roles.
     * @returns A Promise that resolves when contracts roles are set up.
     */
    setupContractsRoles(): Promise<void>

    /**
     * Sets up accounts roles.
     * @returns A Promise that resolves when accounts roles are set up.
     */
    setupAccountsRoles(): Promise<void>

    /**
     * Sets up contracts dependencies.
     * @returns A Promise that resolves when contracts dependencies are set up.
     */
    setupContractsDependencies(): Promise<void>

}
