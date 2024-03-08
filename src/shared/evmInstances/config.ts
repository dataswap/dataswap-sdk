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
            RolesAddress: "0x39d4509C2B2f39e9e402E7a8d343E83d9aF48729",
            FilecoinAddress: "0x1eD93e30f1213e0db59790EE52710720bE5AcBAF",
            FilplusAddress: "0x22d61c84991D9589B24958277E16e7cC63CDD7C2",
            MerkleUtilsAddress: "0x7B5fa5d915Df0E23A975539E25CaFaB58F48A6cA",
            CarstoreAddress: "0xFbD35202f1ca277EF26dD6Af8a4440348c052f47",
            EscrowAddress: "0x0862a413920eFa1958dB61BD3fEC70c60B8Ed018",
            EscrowDatacapCollateralAddress:
                "0x674a01Fd2e2Ea630c9FE796112566Fd19036D7a1",
            EscrowDataTradingFeeAddress:
                "0xAeD6AA7e8E94e0541D905f0c64701F730B77F806",
            EscrowDatacapChunkLandCollateralAddress:
                "0x49C94f838b85541f0Bd0491C42d23cfF9a745C8D",
            EscrowChallengeCommissionAddress:
                "0x9101019f5EA56D2d0705d9F36D08B6409ae57257",
            FinanceAddress: "0x5B8A3E0d9f998740DE2199Ff98C739a73B10AC6C",
            DatasetsAddress: "0xb678DB7251C527E0D19a23c3E0c8640e1B540b3d",
            DatasetsRequirementAddress:
                "0x5F2EB2fB0937ca5281211e9e5e6a50B2eD5c4E91",
            DatasetsProofAddress: "0xfdbE31ad3bA77C4Af8Cb1B1C4C19E227Fa8d3a06",
            DatasetsChallengeAddress:
                "0x8338697C7264767772373b36fC5a770474C0b016",
            MatchingsAddress: "0x7466501458669b88Af9Dcb7f1eDaa7984Aa4e04B",
            MatchingsTargetAddress:
                "0x16084d08794d85E718D0B0afe98E029a2E9365e9",
            MatchingsBidsAddress: "0x56A802134E383B0b45602c4Fb9168f652D2382C0",
            StoragesAddress: "0x0d931A2eC269d57C11afa59B628E93681d299A3b",
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
