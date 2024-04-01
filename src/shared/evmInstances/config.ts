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
            RolesAddress: "0x93AFF7872f20EB474704DCFe7B87CA0883b756F0",
            FilecoinAddress: "0x1eD93e30f1213e0db59790EE52710720bE5AcBAF",
            FilplusAddress: "0x1Ca9494313391689Bd7020022b33f3a1A5106bf6",
            MerkleUtilsAddress: "0x202d2A1EE226a95B329398534cED5BEf8eA85510",
            CarstoreAddress: "0x0643888AEf33c91C8a67a0D50eE4841C677c34b0",
            EscrowDatacapCollateralAddress:
                "0x32c37C980Cf1414378d49055Bcf7465f56008d97",
            EscrowDataTradingFeeAddress:
                "0x7283f0C053D5331A8A09f0119F4fb520000A169b",
            EscrowDatacapChunkLandCollateralAddress:
                "0x999D1718279B370Ea0930F6b04eEE4aF7638AB34",
            EscrowChallengeCommissionAddress:
                "0xE0ba37b81b7b82003c6A14969e4CadFF21aB34c4",
            EscrowChallengeAuditCollateralAddress:
                "0x02d2e537390Dda4a86C068B8883bA8779414A365",
            FinanceAddress: "0xB0d20d3dBFF9529c2acD97Ec27a948ad1b91293f",
            DatasetsAddress: "0xD5EDCbd48bBe189A854577F14b4f3015c2bD3296",
            DatasetsRequirementAddress:
                "0x06a52caE4FbcD269E8CA6728755D14b311D24A1c",
            DatasetsProofAddress: "0x3a5447E29414D5F2b15efb5c80f4B0fA103e2797",
            DatasetsChallengeAddress:
                "0xbbd0f850375a44040f0cd5C00B9654aE89D74629",
            MatchingsAddress: "0x81504da4648557EC775df1BA9e067d5B9d3eA3b5",
            MatchingsTargetAddress:
                "0xdaEE655849133a984409137c40e696bcD3D874AD",
            MatchingsBidsAddress: "0xc35BCe2D4c1927ee5ce83cf1D63996E2495aa288",
            StoragesAddress: "0x6dFacB1082e50174d5446064861CbbF4A1Bea2a4",
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
