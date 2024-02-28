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
            RolesAddress: "0x824B32cfc8a6C3a276D8766D96c97997C0D615f2",
            FilecoinAddress: "0x1eD93e30f1213e0db59790EE52710720bE5AcBAF",
            FilplusAddress: "0x080843F9a787d99419D38f752694B80F3cAabaC0",
            MerkleUtilsAddress: "0x9B36806Bb747Ee5e6eaD84334DF299Db953290a7",
            CarstoreAddress: "0x5c63AE7870524A2E5ed547Ff70eB6d16DF89ba6C",
            EscrowAddress: "0x0862a413920eFa1958dB61BD3fEC70c60B8Ed018",
            EscrowDatacapCollateralAddress:
                "0x4F33a246141D88d4e52097Ffa6dbfa76c5015337",
            EscrowDataTradingFeeAddress:
                "0xBBdcd9d37b38f36e3B703C7bba3dcb18AB3a2770",
            EscrowDatacapChunkLandCollateralAddress:
                "0x7A5c761f3c0Dd2a3F92a31B4E2E0d32B23e3Dc5F",
            EscrowChallengeCommissionAddress:
                "0x539DeD3f7baF807325a75aDBCD0AeF8230f7bD85",
            FinanceAddress: "0x7Ba2c032Aed2dF3A99227183eE2D9D7552B69d7f",
            DatasetsAddress: "0xEde65362f0f2E02D4E388c98636BE13253656892",
            DatasetsRequirementAddress:
                "0x0e0C16F1A83F25e81dc68D03B091b7265219766E",
            DatasetsProofAddress: "0xE5055Cc9E90f7204ce91555E61Eec19A6bE80317",
            DatasetsChallengeAddress:
                "0x9daeA585078FEa937Eed2640f3e7232028eE8270",
            MatchingsAddress: "0x7ca67608c647175E2dDFD59F4970eF5dd5D22392",
            MatchingsTargetAddress:
                "0xed5b040471285Fe7c3C2149A166f923af65107AA",
            MatchingsBidsAddress: "0x34E56d0Cc615324B7433af9deebfd5b8eE420F2D",
            StoragesAddress: "0x706557b4b22bBc4109A71398D4343063618B8502",
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
