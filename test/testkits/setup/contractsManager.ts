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
import { ethers } from "ethers"
import { handleEvmError } from "../../shared/error"
import { IContractsManager } from "../../interfaces/setup/IContractsManater"
import * as utils from "../../shared/utils"
import { Wallet } from "../../../src/shared/types/evmEngineType"
import { IWallet } from "@unipackage/net"

// Define contracts
const contracts: [string, new (...args: any[]) => any][] = [
    ["Carstore", CarstoreEvm],
    ["Datacaps", DatacapsEvm],
    ["Datasets", DatasetMetadataEvm],
    ["DatasetsChallenge", DatasetChallengeEvm],
    ["DatasetsProof", DatasetProofEvm],
    ["DatasetsRequirement", DatasetRequirementEvm],
    ["Escrow", EscrowEvm],
    ["Filecoin", FilecoinEvm],
    ["Filplus", FilplusEvm],
    ["Matchings", MatchingMetadataEvm],
    ["MatchingsBids", MatchingBidsEvm],
    ["MatchingsTarget", MatchingTargetEvm],
    ["Roles", RolesEvm],
    ["Storages", StoragesEvm],
    //["MerkleUtils",]
]

function initWallet(url: string): IWallet {
    let wallet = new Wallet(url)
    wallet.add(process.env.PRIVATE_KEY as string)
    wallet.add(process.env.PRIVATE_KEY_BIDDER as string)
    wallet.add(process.env.PRIVATE_KEY_DATASETAUDITOR as string)
    wallet.add(process.env.PRIVATE_KEY_METADATASUBMITTER as string)
    wallet.add(process.env.PRIVATE_KEY_PROOFSUBMITTER as string)
    return wallet
}

export class ContractsManager implements IContractsManager {
    private contractsEvms = new Map<string, any>()
    private contractsAddresses = new Map<string, string>()

    constructor() {
        // Get the RPC URL for the network
        let url = utils.getNetworkRpcURL()

        // Instantiate contract instances for each contract name
        contracts.forEach(([contractName, evmConstructor]) => {
            let contractAddress = utils.getContractAddress(contractName)

            let wallet = initWallet(url)
            // Load contract ABI
            const contractAbi = require(
                `@dataswapcore/contracts/abi/v0.8/${contractName}.json`
            )

            // Store contract instances and addresses in maps
            this.contractsEvms.set(
                contractName,
                new evmConstructor(contractAbi, contractAddress, url, wallet)
            )
            this.contractsAddresses.set(contractName, contractAddress)
        })
    }

    /**
     * Grant a specific role to a contract.
     * @param contractAddress The address of the contract to grant the role.
     * @param role The role to grant.
     */
    private async _grantRole(
        contractAddress: string,
        role: string
    ): Promise<void> {
        try {
            const roleBytes = ethers.utils.toUtf8Bytes(role)
            const hash = ethers.utils.keccak256(roleBytes)
            let ret = await handleEvmError(
                this.RolesEvm().hasRole(hash, contractAddress)
            )
            if (ret.data) {
                // Role already set up
                return
            }

            this.RolesEvm()
                .getWallet()
                .setDefault(process.env.DATASWAP_GOVERNANCE as string)
            // Grant the role to the contract
            await handleEvmError(
                this.RolesEvm().grantRole(hash, contractAddress)
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Set up roles for all contracts.
     */
    public async setupContractsRoles(): Promise<void> {
        try {
            for (const [_, address] of this.contractsAddresses) {
                try {
                    await this._grantRole(address, "DATASWAP")
                } catch (error) {
                    throw error
                }
            }
        } catch (error) {
            throw error
        }
    }

    /**
     * Set up roles for all accounts.
     */
    public async setupAccountsRoles(): Promise<void> {
        try {
            await this._grantRole(
                process.env.DATASWAP_METADATASUBMITTER as string,
                "CC"
            )

            await this._grantRole(process.env.DATASWAP_BIDDER as string, "SP")

            await this._grantRole(
                process.env.DATASWAP_DATASETAUDITOR as string,
                "DA"
            )

            await this._grantRole(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                "DP"
            )
        } catch (error) {
            throw error
        }
    }
    /**
     * Set up dependencies for the Datasets contract.
     * @returns A promise that resolves when the dependencies are set up.
     */
    private async setupDatasetsDependencies(): Promise<void> {
        try {
            let datasetProofAddress =
                this.contractsAddresses.get("DatasetsProof")
            if (!datasetProofAddress) {
                throw new Error("cant get datasetsProof address in env")
            }
            let ret = await handleEvmError(
                this.DatasetMetadataEvm().datasetsProof()
            )
            if ((ret.data as string) === datasetProofAddress) {
                // Role already set up
                return
            }

            this.RolesEvm()
                .getWallet()
                .setDefault(process.env.DATASWAP_GOVERNANCE as string)
            await handleEvmError(
                this.DatasetMetadataEvm().initDependencies(datasetProofAddress)
            )
        } catch (error) {
            throw error
        }
    }
    /**
     * Set up dependencies for the DatasetsProof contract.
     * @returns A promise that resolves when the dependencies are set up.
     */
    private async setupDatasetsProofDependencies(): Promise<void> {
        try {
            let datasetChallengeAddress =
                this.contractsAddresses.get("DatasetsChallenge")
            if (!datasetChallengeAddress) {
                throw new Error("cant get datasetsChallenge address in env")
            }

            let ret = await handleEvmError(
                this.DatasetProofEvm().datasetsChallenge()
            )
            if ((ret.data as string) === datasetChallengeAddress) {
                // Role already set up
                return
            }

            this.RolesEvm()
                .getWallet()
                .setDefault(process.env.DATASWAP_GOVERNANCE as string)
            await handleEvmError(
                this.DatasetProofEvm().initDependencies(datasetChallengeAddress)
            )
        } catch (error) {
            throw error
        }
    }
    /**
     * Set up dependencies for the MatchingsBids contract.
     * @returns A promise that resolves when the dependencies are set up.
     */
    private async setupMatchingsBidsDependencies(): Promise<void> {
        try {
            let matchingsAddress = this.contractsAddresses.get("Matchings")
            if (!matchingsAddress) {
                throw new Error("cant get matchings ddress in env")
            }
            let matchingsTargetAddress =
                this.contractsAddresses.get("MatchingsTarget")
            if (!matchingsTargetAddress) {
                throw new Error("cant get matchingsTarget ddress in env")
            }

            let ret = await handleEvmError(this.MatchingBidsEvm().matchings())
            let retMatchingsAddress = ret.data as string
            ret = await handleEvmError(this.MatchingBidsEvm().matchingsTarget())
            let retMatchingsTargetAddress = ret.data as string

            if (
                retMatchingsAddress === matchingsAddress &&
                retMatchingsTargetAddress === matchingsTargetAddress
            ) {
                // Role already set up
                return
            } else {
                this.RolesEvm()
                    .getWallet()
                    .setDefault(process.env.DATASWAP_GOVERNANCE as string)
                await handleEvmError(
                    this.MatchingBidsEvm().initDependencies(
                        matchingsAddress,
                        matchingsTargetAddress
                    )
                )
            }
        } catch (error) {
            throw error
        }
    }
    /**
     * Set up dependencies for the MatchingsTarget contract.
     * @returns A promise that resolves when the dependencies are set up.
     */
    private async setupMatchingsTargetDependencies(): Promise<void> {
        try {
            let matchingsAddress = this.contractsAddresses.get("Matchings")
            if (!matchingsAddress) {
                throw new Error("cant get matchings ddress in env")
            }
            let matchingsBidsAddress =
                this.contractsAddresses.get("MatchingsBids")
            if (!matchingsBidsAddress) {
                throw new Error("cant get matchingsBids ddress in env")
            }

            let ret = await handleEvmError(this.MatchingTargetEvm().matchings())
            let retMatchingsAddress = ret.data as string
            ret = await handleEvmError(this.MatchingTargetEvm().matchingsBids())
            let retMatchingsBidsAddress = ret.data as string

            if (
                retMatchingsAddress === matchingsAddress &&
                retMatchingsBidsAddress === matchingsBidsAddress
            ) {
                // Role already set up
                return
            } else {
                this.RolesEvm()
                    .getWallet()
                    .setDefault(process.env.DATASWAP_GOVERNANCE as string)
                await handleEvmError(
                    this.MatchingTargetEvm().initDependencies(
                        matchingsAddress,
                        matchingsBidsAddress
                    )
                )
            }
        } catch (error) {
            throw error
        }
    }
    /**
     * Set up dependencies for the Escrow contract.
     * @returns A promise that resolves when the dependencies are set up.
     */
    private async setupEscrowDependencies(): Promise<void> {
        try {
            let datasetProofAddress =
                this.contractsAddresses.get("DatasetsProof")
            if (!datasetProofAddress) {
                throw new Error("cant get datasetsProof address in env")
            }
            let storagesAddress = this.contractsAddresses.get("Storages")
            if (!storagesAddress) {
                throw new Error("cant get storages address in env")
            }
            let datacapsAddress = this.contractsAddresses.get("Datacaps")
            if (!datacapsAddress) {
                throw new Error("cant get datacaps address in env")
            }

            let ret = await handleEvmError(this.EscrowEvm().datasetsProof())
            let retDatasetProofAddress = ret.data as string
            ret = await handleEvmError(this.EscrowEvm().storages())
            let retStoragesAddress = ret.data as string
            ret = await handleEvmError(this.EscrowEvm().datacaps())
            let retDatacapsAddress = ret.data as string

            if (
                retDatasetProofAddress === datasetProofAddress &&
                retStoragesAddress === storagesAddress &&
                retDatacapsAddress === datacapsAddress
            ) {
                // Role already set up
                return
            } else {
                this.RolesEvm()
                    .getWallet()
                    .setDefault(process.env.DATASWAP_GOVERNANCE as string)
                await handleEvmError(
                    this.EscrowEvm().initDependencies(
                        datasetProofAddress,
                        storagesAddress,
                        datacapsAddress
                    )
                )
            }
        } catch (error) {
            throw error
        }
    }
    /**
     * Set up dependencies for all contracts.
     */
    public async setupContractsDependencies(): Promise<void> {
        try {
            await this.setupDatasetsDependencies()
            await this.setupDatasetsProofDependencies()
            await this.setupMatchingsBidsDependencies()
            await this.setupMatchingsTargetDependencies()
            await this.setupEscrowDependencies()
        } catch (error) {
            throw error
        }
    }

    /**
     * Get an instance of a specific contract.
     * @param contractName The name of the contract.
     * @returns An instance of the specified contract.
     */
    private getEvmInstance(contractName: string): any {
        return this.contractsEvms.get(contractName)
    }
    /**
     * Get an instance of the Carstore contract Evm.
     * @returns An instance of the Carstore contract Evm.
     */
    public CarstoreEvm(): CarstoreEvm {
        return this.getEvmInstance("Carstore") as CarstoreEvm
    }
    /**
     * Get an instance of the Datacaps contract Evm.
     * @returns An instance of the Datacaps contract Evm.
     */
    public DatacapsEvm(): DatacapsEvm {
        return this.getEvmInstance("Datacaps") as DatacapsEvm
    }
    /**
     * Get an instance of the Datasets contract Evm.
     * @returns An instance of the Datasets contract Evm.
     */
    public DatasetMetadataEvm(): DatasetMetadataEvm {
        return this.getEvmInstance("Datasets") as DatasetMetadataEvm
    }
    /**
     * Get an instance of the DatasetsChallenge contract Evm.
     * @returns An instance of the DatasetsChallenge contract Evm.
     */
    public DatasetChallengeEvm(): DatasetChallengeEvm {
        return this.getEvmInstance("DatasetsChallenge") as DatasetChallengeEvm
    }
    /**
     * Get an instance of the DatasetsProof contract Evm.
     * @returns An instance of the DatasetsProof contract Evm.
     */
    public DatasetProofEvm(): DatasetProofEvm {
        return this.getEvmInstance("DatasetsProof") as DatasetProofEvm
    }
    /**
     * Get an instance of the DatasetsRequirement contract Evm.
     * @returns An instance of the DatasetsRequirement contract Evm.
     */
    public DatasetRequirementEvm(): DatasetRequirementEvm {
        return this.getEvmInstance(
            "DatasetsRequirement"
        ) as DatasetRequirementEvm
    }
    /**
     * Get an instance of the Escrow contract Evm.
     * @returns An instance of the Escrow contract Evm.
     */
    public EscrowEvm(): EscrowEvm {
        return this.getEvmInstance("Escrow") as EscrowEvm
    }
    /**
     * Get an instance of the Filecoin contract Evm.
     * @returns An instance of the Filecoin contract Evm.
     */
    public FilecoinEvm(): FilecoinEvm {
        return this.getEvmInstance("Filecoin") as FilecoinEvm
    }
    /**
     * Get an instance of the Filplus contract Evm.
     * @returns An instance of the Filplus contract Evm.
     */
    public FilplusEvm(): FilplusEvm {
        return this.getEvmInstance("Filplus") as FilplusEvm
    }
    /**
     * Get an instance of the Matchingscontract Evm.
     * @returns An instance of the Matchings contract Evm.
     */
    public MatchingMetadataEvm(): MatchingMetadataEvm {
        return this.getEvmInstance("Matchings") as MatchingMetadataEvm
    }
    /**
     * Get an instance of the MatchingsBids contract Evm.
     * @returns An instance of the MatchingsBids contract Evm.
     */
    public MatchingBidsEvm(): MatchingBidsEvm {
        return this.getEvmInstance("MatchingsBids") as MatchingBidsEvm
    }
    /**
     * Get an instance of the MatchingsTarget contract Evm.
     * @returns An instance of the MatchingsTarget contract Evm.
     */
    public MatchingTargetEvm(): MatchingTargetEvm {
        return this.getEvmInstance("MatchingsTarget") as MatchingTargetEvm
    }
    /**
     * Get an instance of the Roles contract Evm.
     * @returns An instance of the Roles contract Evm.
     */
    public RolesEvm(): RolesEvm {
        return this.getEvmInstance("Roles") as RolesEvm
    }
    /**
     * Get an instance of the Storages contract Evm.
     * @returns An instance of the Storages contract Evm.
     */
    public StoragesEvm(): StoragesEvm {
        return this.getEvmInstance("Storages") as StoragesEvm
    }
}
