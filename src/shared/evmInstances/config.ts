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
    EscrowDatacapCollateralAddress: string // Address of the EscrowDatacapCollateral contract
    EscrowDataTradingFeeAddress: string // Address of the EscrowDataTradingFee contract
    EscrowDatacapChunkLandCollateralAddress: string // Address of the EscrowDatacapChunkLandCollateral contract
    EscrowChallengeCommissionAddress: string // Address of the EscrowChallengeCommission contract
    EscrowChallengeAuditCollateralAddress: string // Address of the EscrowChallengeAuditCollateral contract
    FinanceAddress: string // Address of the Finance contract
    DatasetsAddress: string // Address of the Datasets contract
    DatasetsRequirementAddress: string // Address of the DatasetsRequirement contract
    DatasetsProofAddress: string // Address of the DatasetsProof contract
    DatasetsChallengeAddress: string // Address of the DatasetsChallenge contract
    MatchingsAddress: string // Address of the Matchings contract
    MatchingsTargetAddress: string // Address of the MatchingsTarget contract
    MatchingsBidsAddress: string // Address of the MatchingsBids contract
    StoragesAddress: string // Address of the Storages contract
}

// Constant defining calibration contract addresses for various components
export const CALIBRATION_CONTRACT_ADDRESSES: Record<string, ContractAddresses> =
    {
        Hylocereus: {
            RolesAddress: "0xa6A70CCBE00F6D3cB1aE5690949D2641030ba983",
            FilecoinAddress: "0x1eD93e30f1213e0db59790EE52710720bE5AcBAF",
            FilplusAddress: "0x949979803Cbe3e1a4024bFBC3F31AD985445CCF2",
            MerkleUtilsAddress: "0xa7c9869BE574e109bE4d700AFF7d810AA5BFD882",
            CarstoreAddress: "0x051Ac205719649d437a893b1DDFD4BCF5f946BeF",
            EscrowDatacapCollateralAddress:
                "0xD9e50468a99a5e3cc9E85DD0F105A3844de36009",
            EscrowDataTradingFeeAddress:
                "0x78c24BD261B7eb5C317961E335C23cFfe401ABb1",
            EscrowDatacapChunkLandCollateralAddress:
                "0xe252f12deD2a38f751c4cC89A24129c3F521EbAb",
            EscrowChallengeCommissionAddress:
                "0x706b258e47d9D620088D9a57ebbB39A0b22D0069",
            EscrowChallengeAuditCollateralAddress:
                "0x58060a076115645F1dFcCEa57AFD272401d2CEc7",
            FinanceAddress: "0x4785D6a4D232b1E0EBD7337065Eb43C124A2b35C",
            DatasetsAddress: "0x213a2D7D8fa03c4C1adCCd695890873E8efe7E13",
            DatasetsRequirementAddress:
                "0x90F9Fdcd370ba256584E755253c2bd6371bb5529",
            DatasetsProofAddress: "0xD4A7C0b809f2353b58639e1bC72F7A1d2bf74694",
            DatasetsChallengeAddress:
                "0xc1f15762da15C345A3DD691520617baf2B36b3b2",
            MatchingsAddress: "0x9b4B40d39c2777FD86c3625B69605efEc80D1111",
            MatchingsTargetAddress:
                "0xB7db3921b1082413553a131FBCa5938FeA31900a",
            MatchingsBidsAddress: "0x926b4E24E918aFb3bfE618E2194fDBb611B6cDd5",
            StoragesAddress: "0x7A9b3826c813Ec02740eCE5C2f5CfA1e4bCb3ffF",
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
        EscrowDatacapCollateralAddress:
            "0x7777777777777777777777777777777777777777",
        EscrowDataTradingFeeAddress:
            "0x7777777777777777777777777777777777777777",
        EscrowDatacapChunkLandCollateralAddress:
            "0x7777777777777777777777777777777777777777",
        EscrowChallengeCommissionAddress:
            "0x7777777777777777777777777777777777777777",
        EscrowChallengeAuditCollateralAddress:
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
