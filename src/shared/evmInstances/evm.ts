/*******************************************************************************
 *   (c) 2024 dataswap
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
import { CarstoreEvm } from "../../core/carstore/repo/evm"
import { DatasetMetadataEvm } from "../../module/dataset/metadata/repo/evm"
import { DatasetRequirementEvm } from "../../module/dataset/requirement/repo/evm"
import { DatasetProofEvm } from "../../module/dataset/proof/repo/evm"
import { DatasetChallengeEvm } from "../../module/dataset/challenge/repo/evm"
import { MatchingMetadataEvm } from "../../module/matching/metadata/repo/evm"
import { MatchingTargetEvm } from "../../module/matching/target/repo/evm"
import { MatchingBidsEvm } from "../../module/matching/bids/repo/evm"
import { StoragesEvm } from "../../module/storages/repo/evm"
import { FilplusEvm } from "../../core/filplus/repo/evm"
import { FilecoinEvm } from "../../core/filecoin/repo/evm"
import { RolesEvm } from "../../core/roles/repo/evm"

import carstoreAbi from "@dataswapcore/contracts/abi/v0.8/Carstore.json"
import datasetMetaAbi from "@dataswapcore/contracts/abi/v0.8/Datasets.json"
import datasetsRequirementAbi from "@dataswapcore/contracts/abi/v0.8/DatasetsRequirement.json"
import datasetsProofAbi from "@dataswapcore/contracts/abi/v0.8/DatasetsProof.json"
import datasetsChallengeAbi from "@dataswapcore/contracts/abi/v0.8/DatasetsChallenge.json"
import matchingsAbi from "@dataswapcore/contracts/abi/v0.8/Matchings.json"
import matchingsTargetAbi from "@dataswapcore/contracts/abi/v0.8/MatchingsTarget.json"
import matchingsBidsAbi from "@dataswapcore/contracts/abi/v0.8/MatchingsBids.json"
import storagesAbi from "@dataswapcore/contracts/abi/v0.8/Storages.json"
import filplusAbi from "@dataswapcore/contracts/abi/v0.8/Filplus.json"
import filecoinAbi from "@dataswapcore/contracts/abi/v0.8/Filecoin.json"
import rolesAbi from "@dataswapcore/contracts/abi/v0.8/Roles.json"
import {
    CALIBRATION_NETWORK,
    MAIN_NETWORK,
    DATASWAPNAME,
    contractAddresses,
    providerUrl,
} from "./config"

/**
 * Creates a new instance of CarstoreEvm for the Calibration network.
 *
 * @constant carstoreEvm_Calibration - The CarstoreEvm instance for the Calibration network.
 */
export const carstoreEvm_Calibration = new CarstoreEvm(
    carstoreAbi,
    contractAddresses({
        network: CALIBRATION_NETWORK,
        dataswapName: DATASWAPNAME,
    }).CarstoreAddress,
    providerUrl(CALIBRATION_NETWORK)
)

/**
 * Creates a new instance of CarstoreEvm for the Main network.
 *
 * @constant carstoreEvm_Main - The CarstoreEvm instance for the Main network.
 */
export const carstoreEvm_Main = new CarstoreEvm(
    carstoreAbi,
    contractAddresses({
        network: MAIN_NETWORK,
        dataswapName: DATASWAPNAME,
    }).CarstoreAddress,
    providerUrl(MAIN_NETWORK)
)

/**
 * Creates a new instance of DatasetMetadataEvm for the Calibration network.
 *
 * @constant datasetMetadataEvm_Calibration - The DatasetMetadataEvm instance for the Calibration network.
 */
export const datasetMetadataEvm_Calibration = new DatasetMetadataEvm(
    datasetMetaAbi,
    contractAddresses({
        network: CALIBRATION_NETWORK,
        dataswapName: DATASWAPNAME,
    }).DatasetsAddress,
    providerUrl(CALIBRATION_NETWORK)
)

/**
 * Creates a new instance of DatasetMetadataEvm for the Main network.
 *
 * @constant datasetMetadataEvm_Main - The DatasetMetadataEvm instance for the Main network.
 */
export const datasetMetadataEvm_Main = new DatasetMetadataEvm(
    datasetMetaAbi,
    contractAddresses({
        network: MAIN_NETWORK,
        dataswapName: DATASWAPNAME,
    }).DatasetsAddress,
    providerUrl(MAIN_NETWORK)
)

/**
 * Creates a new instance of DatasetRequirementEvm for the Calibration network.
 *
 * @constant datasetRequirementEvm_Calibration - The DatasetRequirementEvm instance for the Calibration network.
 */
export const datasetRequirementEvm_Calibration = new DatasetRequirementEvm(
    datasetsRequirementAbi,
    contractAddresses({
        network: CALIBRATION_NETWORK,
        dataswapName: DATASWAPNAME,
    }).DatasetsRequirementAddress,
    providerUrl(CALIBRATION_NETWORK)
)

/**
 * Creates a new instance of DatasetRequirementEvm for the Main network.
 *
 * @constant datasetRequirementEvm_Main - The DatasetRequirementEvm instance for the Main network.
 */
export const datasetRequirementEvm_Main = new DatasetRequirementEvm(
    datasetsRequirementAbi,
    contractAddresses({
        network: MAIN_NETWORK,
        dataswapName: DATASWAPNAME,
    }).DatasetsRequirementAddress,
    providerUrl(MAIN_NETWORK)
)

/**
 * Creates a new instance of DatasetProofEvm for the Calibration network.
 *
 * @constant datasetProofEvm_Calibration - The DatasetProofEvm instance for the Calibration network.
 */
export const datasetProofEvm_Calibration = new DatasetProofEvm(
    datasetsProofAbi,
    contractAddresses({
        network: CALIBRATION_NETWORK,
        dataswapName: DATASWAPNAME,
    }).DatasetsProofAddress,
    providerUrl(CALIBRATION_NETWORK)
)

/**
 * Creates a new instance of DatasetProofEvm for the Main network.
 *
 * @constant datasetProofEvm_Main - The DatasetProofEvm instance for the Main network.
 */
export const datasetProofEvm_Main = new DatasetProofEvm(
    datasetsProofAbi,
    contractAddresses({
        network: MAIN_NETWORK,
        dataswapName: DATASWAPNAME,
    }).DatasetsProofAddress,
    providerUrl(MAIN_NETWORK)
)

/**
 * Creates a new instance of DatasetChallengeEvm for the Calibration network.
 *
 * @constant datasetChallengeEvm_Calibration - The DatasetChallengeEvm instance for the Calibration network.
 */
export const datasetChallengeEvm_Calibration = new DatasetChallengeEvm(
    datasetsChallengeAbi,
    contractAddresses({
        network: CALIBRATION_NETWORK,
        dataswapName: DATASWAPNAME,
    }).DatasetsChallengeAddress,
    providerUrl(CALIBRATION_NETWORK)
)

/**
 * Creates a new instance of DatasetChallengeEvm for the Main network.
 *
 * @constant datasetChallengeEvm_Main - The DatasetChallengeEvm instance for the Main network.
 */
export const datasetChallengeEvm_Main = new DatasetChallengeEvm(
    datasetsChallengeAbi,
    contractAddresses({
        network: MAIN_NETWORK,
        dataswapName: DATASWAPNAME,
    }).DatasetsChallengeAddress,
    providerUrl(MAIN_NETWORK)
)

/**
 * Creates a new instance of MatchingMetadataEvm for the Calibration network.
 *
 * @constant matchingMetadataEvm_Calibration - The MatchingMetadataEvm instance for the Calibration network.
 */
export const matchingMetadataEvm_Calibration = new MatchingMetadataEvm(
    matchingsAbi,
    contractAddresses({
        network: CALIBRATION_NETWORK,
        dataswapName: DATASWAPNAME,
    }).MatchingsAddress,
    providerUrl(CALIBRATION_NETWORK)
)

/**
 * Creates a new instance of MatchingMetadataEvm for the Main network.
 *
 * @constant matchingMetadataEvm_Main - The MatchingMetadataEvm instance for the Main network.
 */
export const matchingMetadataEvm_Main = new MatchingMetadataEvm(
    matchingsAbi,
    contractAddresses({
        network: MAIN_NETWORK,
        dataswapName: DATASWAPNAME,
    }).MatchingsAddress,
    providerUrl(MAIN_NETWORK)
)

/**
 * Creates a new instance of MatchingTargetEvm for the Calibration network.
 *
 * @constant matchingTargetEvm_Calibration - The MatchingTargetEvm instance for the Calibration network.
 */
export const matchingTargetEvm_Calibration = new MatchingTargetEvm(
    matchingsTargetAbi,
    contractAddresses({
        network: CALIBRATION_NETWORK,
        dataswapName: DATASWAPNAME,
    }).MatchingsTargetAddress,
    providerUrl(CALIBRATION_NETWORK)
)

/**
 * Creates a new instance of MatchingTargetEvm for the Main network.
 *
 * @constant matchingTargetEvm_Main - The MatchingTargetEvm instance for the Main network.
 */
export const matchingTargetEvm_Main = new MatchingTargetEvm(
    matchingsTargetAbi,
    contractAddresses({
        network: MAIN_NETWORK,
        dataswapName: DATASWAPNAME,
    }).MatchingsTargetAddress,
    providerUrl(MAIN_NETWORK)
)

/**
 * Creates a new instance of MatchingBidsEvm for the Calibration network.
 *
 * @constant matchingBidsEvm_Calibration - The MatchingBidsEvm instance for the Calibration network.
 */
export const matchingBidsEvm_Calibration = new MatchingBidsEvm(
    matchingsBidsAbi,
    contractAddresses({
        network: CALIBRATION_NETWORK,
        dataswapName: DATASWAPNAME,
    }).MatchingsBidsAddress,
    providerUrl(CALIBRATION_NETWORK)
)

/**
 * Creates a new instance of MatchingBidsEvm for the Main network.
 *
 * @constant matchingBidsEvm_Main - The MatchingBidsEvm instance for the Main network.
 */
export const matchingBidsEvm_Main = new MatchingBidsEvm(
    matchingsBidsAbi,
    contractAddresses({
        network: MAIN_NETWORK,
        dataswapName: DATASWAPNAME,
    }).MatchingsBidsAddress,
    providerUrl(MAIN_NETWORK)
)

/**
 * Creates a new instance of StoragesEvm for the Calibration network.
 *
 * @constant storagesEvm_Calibration - The StoragesEvm instance for the Calibration network.
 */
export const storagesEvm_Calibration = new StoragesEvm(
    storagesAbi,
    contractAddresses({
        network: CALIBRATION_NETWORK,
        dataswapName: DATASWAPNAME,
    }).StoragesAddress,
    providerUrl(CALIBRATION_NETWORK)
)

/**
 * Creates a new instance of StoragesEvm for the Main network.
 *
 * @constant storagesEvm_Main - The StoragesEvm instance for the Main network.
 */
export const storagesEvm_Main = new StoragesEvm(
    storagesAbi,
    contractAddresses({
        network: MAIN_NETWORK,
        dataswapName: DATASWAPNAME,
    }).StoragesAddress,
    providerUrl(MAIN_NETWORK)
)

/**
 * Creates a new instance of FilplusEvm for the Calibration network.
 *
 * @constant filplusEvm_Calibraion - The FilplusEvm instance for the Calibration network.
 */
export const filplusEvm_Calibraion = new FilplusEvm(
    filplusAbi,
    contractAddresses({
        network: CALIBRATION_NETWORK,
        dataswapName: DATASWAPNAME,
    }).FilplusAddress,
    providerUrl(CALIBRATION_NETWORK)
)

/**
 * Creates a new instance of FilplusEvm for the Main network.
 *
 * @constant filplusEvm_Main - The FilplusEvm instance for the Main network.
 */
export const filplusEvm_Main = new FilplusEvm(
    filplusAbi,
    contractAddresses({
        network: MAIN_NETWORK,
        dataswapName: DATASWAPNAME,
    }).FilplusAddress,
    providerUrl(MAIN_NETWORK)
)

/**
 * Creates a new instance of FilecoinEvm for the Calibration network.
 *
 * @constant filecoinEvm_Calibraion - The FilecoinEvm instance for the Calibration network.
 */
export const filecoinEvm_Calibraion = new FilecoinEvm(
    filecoinAbi,
    contractAddresses({
        network: CALIBRATION_NETWORK,
        dataswapName: DATASWAPNAME,
    }).FilecoinAddress,
    providerUrl(CALIBRATION_NETWORK)
)

/**
 * Creates a new instance of FilecoinEvm for the Main network.
 *
 * @constant filecoinEvm_Main - The FilecoinEvm instance for the Main network.
 */
export const filecoinEvm_Main = new FilecoinEvm(
    filecoinAbi,
    contractAddresses({
        network: MAIN_NETWORK,
        dataswapName: DATASWAPNAME,
    }).FilecoinAddress,
    providerUrl(MAIN_NETWORK)
)

/**
 * Creates a new instance of RolesEvm for the Calibration network.
 *
 * @constant rolesEvm_Calibration - The RolesEvm instance for the Calibration network.
 */
export const rolesEvm_Calibration = new RolesEvm(
    rolesAbi,
    contractAddresses({
        network: CALIBRATION_NETWORK,
        dataswapName: DATASWAPNAME,
    }).RolesAddress,
    providerUrl(CALIBRATION_NETWORK)
)

/**
 * Creates a new instance of RolesEvm for the Main network.
 *
 * @constant rolesEvm_Main - The RolesEvm instance for the Main network.
 */
export const rolesEvm_Main = new RolesEvm(
    rolesAbi,
    contractAddresses({
        network: MAIN_NETWORK,
        dataswapName: DATASWAPNAME,
    }).RolesAddress,
    providerUrl(MAIN_NETWORK)
)
