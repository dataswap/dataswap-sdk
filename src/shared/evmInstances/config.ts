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
// Interface representing contract addresses for various components
export interface ContractAddresses {
    RolesAddress: string // Address of the Roles contract
    FilecoinAddress: string // Address of the Filecoin contract
    FilplusAddress: string // Address of the Filplus contract
    MerkleUtilsAddress: string // Address of the MerkleUtils contract
    CarstoreAddress: string // Address of the Carstore contract
    EscrowAddress: string // Address of the Escrow contract
    EscrowDatacapCollateralAddress: string // Address of the EscrowDatacapCollateral contract
    EscrowDataTradingFeeAddress: string // Address of the EscrowDataTradingFee contract
    EscrowDatacapChunkLandCollateralAddress: string // Address of the EscrowDatacapChunkLandCollateral contract
    EscrowChallengeCommissionAddress: string // Address of the EscrowChallengeCommission contract
    FinanceAddress: string // Address of the Finance contract
    DatasetsAddress: string // Address of the Datasets contract
    DatasetsRequirementAddress: string // Address of the DatasetsRequirement contract
    DatasetsProofAddress: string // Address of the DatasetsProof contract
    DatasetsChallengeAddress: string // Address of the DatasetsChallenge contract
    MatchingsAddress: string // Address of the Matchings contract
    MatchingsTargetAddress: string // Address of the MatchingsTarget contract
    MatchingsBidsAddress: string // Address of the MatchingsBids contract
    StoragesAddress: string // Address of the Storages contract
    DatacapsAddress: string // Address of the Datacaps contract
}

// Constant defining calibration contract addresses for various components
export const CALIBRATION_CONTRACT_ADDRESSES: Record<string, ContractAddresses> =
    {
        Hylocereus: {
            RolesAddress: "0xd8B1d78A41BfAE0605865E408C1b70FC06CF177e",
            FilecoinAddress: "0x1eD93e30f1213e0db59790EE52710720bE5AcBAF",
            FilplusAddress: "0x2F6018205C67421402Df9F11F366Dcb2aE85Bd7B",
            MerkleUtilsAddress: "0x11B06449A0d98a5A34cb4158290a84C6565A5774",
            CarstoreAddress: "0xF6B60b5C07630a34A425B3918a77c859B83c80E5",
            EscrowAddress: "0x0862a413920eFa1958dB61BD3fEC70c60B8Ed018",
            EscrowDatacapCollateralAddress:
                "0xf4980bcf335fB35D404508Ef5D80c0E1216a1E15",
            EscrowDataTradingFeeAddress:
                "0x58b7627e19390e08eD33B4231ce71a3Ff01828A3",
            EscrowDatacapChunkLandCollateralAddress:
                "0xC4cE296D68Ad1E06488A258439bf08C851868a76",
            EscrowChallengeCommissionAddress:
                "0xECF18C1036b1C72019073b576EB225d36041671E",
            FinanceAddress: "0xe193c2f568DdF54D84a738121f49196Ee27AD110",
            DatasetsAddress: "0x8aB89ddf8B7fC4d3A75ef8E34542D1537df04D08",
            DatasetsRequirementAddress:
                "0x13B8B3a1C49984f731a3E467fA1f6Cf6715d0b53",
            DatasetsProofAddress: "0x5078876f4fB73d74BaAEB393fDa5a98403EFF073",
            DatasetsChallengeAddress:
                "0x427a138194d42FD0Bae8045b8f7521Ddc09cE174",
            MatchingsAddress: "0xE5cAD4F99Af4C24653f68574aa1Dceedd6D61B20",
            MatchingsTargetAddress:
                "0x282170A8715941447AC4915D54051B861e649224",
            MatchingsBidsAddress: "0xFCbbe1CAFa5F78829bE6ee739D5FE4A56AE827e8",
            StoragesAddress: "0x369dc871e984A66F5C8A53E4BfA252e5287d037A",
            DatacapsAddress: "0x7777777777777777777777777777777777777777",
        },
    }

// Constant defining main contract addresses for various components
export const MAIN_CONTRACT_ADDRESSES: Record<string, any> = {
    Hylocereus: {
        RolesAddress: "0x7777777777777777777777777777777777777777",
        FilecoinAddress: "0x7777777777777777777777777777777777777777",
        FilplusAddress: "0x7777777777777777777777777777777777777777",
        MerkleUtilsAddress: "0x7777777777777777777777777777777777777777",
        CarstoreAddress: "0x7777777777777777777777777777777777777777",
        EscrowAddress: "0x7777777777777777777777777777777777777777",
        EscrowDatacapCollateralAddress:
            "0x7777777777777777777777777777777777777777",
        EscrowDataTradingFeeAddress:
            "0x7777777777777777777777777777777777777777",
        EscrowDatacapChunkLandCollateralAddress:
            "0x7777777777777777777777777777777777777777",
        EscrowChallengeCommissionAddress:
            "0x7777777777777777777777777777777777777777",
        FinanceAddress: "0x7777777777777777777777777777777777777777",
        DatasetsAddress: "0x7777777777777777777777777777777777777777",
        DatasetsRequirementAddress:
            "0x7777777777777777777777777777777777777777",
        DatasetsProofAddress: "0x7777777777777777777777777777777777777777",
        DatasetsChallengeAddress: "0x7777777777777777777777777777777777777777",
        MatchingsAddress: "0x7777777777777777777777777777777777777777",
        MatchingsTargetAddress: "0x7777777777777777777777777777777777777777",
        MatchingsBidsAddress: "0x7777777777777777777777777777777777777777",
        StoragesAddress: "0x7777777777777777777777777777777777777777",
        DatacapsAddress: "0x7777777777777777777777777777777777777777",
    },
}

export const CALIBRATION_NETWORK = "calibration"
export const MAIN_NETWORK = "calibration"
export const DATASWAPNAME = "Hylocereus"
export const CALIBRATION_LOTUS_PROVIDER_URL =
    "https://api.calibration.node.glif.io/rpc/v1"
export const MAIN_LOTUS_PROVIDER_URL = "https://api.node.glif.io/rpc/v1"

/**
 * Retrieves contract addresses based on the specified network and dataswap name.
 *
 * @param options - An object containing the network and dataswap name.
 * @returns ContractAddresses - An object containing addresses for various contracts.
 */
export function contractAddresses(options: {
    network: string
    dataswapName: string
}): ContractAddresses {
    if (options.network === CALIBRATION_NETWORK) {
        return CALIBRATION_CONTRACT_ADDRESSES[options.dataswapName]
    } else {
        return MAIN_CONTRACT_ADDRESSES[options.dataswapName]
    }
}

/**
 * Retrieves the Lotus provider URL based on the specified network.
 *
 * @param network - The network for which the Lotus provider URL is needed.
 * @returns providerUrl - The Lotus provider URL for the specified network.
 */
export function providerUrl(network: string): string {
    if (network === CALIBRATION_NETWORK) {
        if (process.env.CALIBRATION_LOTUS_PROVIDER_URL) {
            return process.env.CALIBRATION_LOTUS_PROVIDER_URL
        }
        return CALIBRATION_LOTUS_PROVIDER_URL
    }
    if (process.env.MAIN_LOTUS_PROVIDER_URL) {
        return process.env.MAIN_LOTUS_PROVIDER_URL
    }
    return MAIN_LOTUS_PROVIDER_URL
}
