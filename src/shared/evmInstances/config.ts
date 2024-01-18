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
            RolesAddress: "0x40769d4797a4fc1A60529a5096bcFfd2b7c66317",
            FilecoinAddress: "0x1eD93e30f1213e0db59790EE52710720bE5AcBAF",
            FilplusAddress: "0xf547A6284A3964580DD8F60C7Fe1cA2ACacE48e6",
            MerkleUtilsAddress: "0xc7f0154Dc2ad6e3F28304358D68Ad045D186A78D",
            CarstoreAddress: "0xC7FBF8Df0A6E584A17361e7E4287EE3a1F72b7b5",
            EscrowAddress: "0x0862a413920eFa1958dB61BD3fEC70c60B8Ed018",
            DatasetsAddress: "0x27400663b98367C5D4b04480030D4DDe193C2fEa",
            DatasetsRequirementAddress:
                "0xAdE3e240736e550837e5b65b0163bbD56178aDdD",
            DatasetsProofAddress: "0x15764e7bE0638696B88ECF39fc7f6167aB53552f",
            DatasetsChallengeAddress:
                "0x60AcEb9dafE38D428f4DC7eBF01fa604EfDc4e0f",
            MatchingsAddress: "0xdc9Df3dC24202451535E4eB0A3ecBBF4B64ae5C8",
            MatchingsTargetAddress:
                "0xcA2852b58a67650cA6F220BA68267140caC7D915",
            MatchingsBidsAddress: "0x527786A491cAe85237e00b8d0A483DBc8D449e2b",
            StoragesAddress: "0x4AEF9E8A0acc86404FF704398eBB023E014C5335",
            DatacapsAddress: "0x2b06517fd3971E5829399f27f6C0F3f497F85ECc",
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
