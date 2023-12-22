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
import { IAccounts } from "../../interfaces/setup/IAccounts"
import { handleEvmError } from "../../shared/error"
import { IContractsManager } from "../../interfaces/setup/IContractsManater"
import * as utils from "../../shared/utils"

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
];

export class ContractsManager implements IContractsManager {
    private contractsEvms = new Map<string, any>()
    private contractsAddresses = new Map<string, string>()
    private accounts: IAccounts

    constructor(_accounts: IAccounts) {
        this.accounts = _accounts
        // Get the RPC URL for the network
        let url = utils.getNetworkRpcURL();

        // Instantiate contract instances for each contract name
        contracts.forEach(([contractName, evmConstructor]) => {
            let contractAddress = utils.getContractAddress(contractName);

            // Load contract ABI
            const contractAbi = require(`@dataswapcore/contracts/abi/v0.8/${contractName}.json`);

            // Store contract instances and addresses in maps
            this.contractsEvms.set(contractName, new evmConstructor(
                contractAbi, contractAddress, url
            ))
            this.contractsAddresses.set(contractName, contractAddress)
        })
    }

    /**
     * Grant a specific role to a contract.
     * @param contractAddress The address of the contract to grant the role.
     * @param role The role to grant.
     */
    private async _setupContractRole(contractAddress: string, role: string): Promise<void> {
        try {
            let [governance, governanceKey] = this.accounts.getGovernance()
            const roleBytes = ethers.utils.toUtf8Bytes(role)
            const hash = ethers.utils.keccak256(roleBytes);
            let ret = await this.RolesEvm().hasRole(hash, contractAddress)
            if (!ret.ok) {
                throw new ret.error
            }
            if (ret.data) {
                // Role already set up
                return
            }

            // Grant the role to the contract
            let tx = await this.RolesEvm().grantRole(
                hash,
                contractAddress,
                {
                    from: governance,
                    privateKey: governanceKey
                }
            );
            if (!tx.ok) {
                throw tx.error
            }
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
                    await this._setupContractRole(address, "DATASWAP");
                } catch (error) {
                    throw error;
                }
            }

            let [client,] = this.accounts.getClient()
            await this._setupContractRole(client, "CC");

            let [bidder,] = this.accounts.getBidder()
            await this._setupContractRole(bidder, "SP");

            let [datasetAuditor,] = this.accounts.getDatasetAuditor()
            await this._setupContractRole(datasetAuditor, "DA");

            let [datasetPreparer,] = this.accounts.getProofSubmitter()
            await this._setupContractRole(datasetPreparer, "DP");
        } catch (error) {
            throw error
        }
    }

    /**
     * Set up roles for all accounts.
     */
    public async setupAccountsRoles(): Promise<void> {
        try {
            let [client,] = this.accounts.getClient()
            await this._setupContractRole(client, "CC");

            let [bidder,] = this.accounts.getBidder()
            await this._setupContractRole(bidder, "SP");

            let [datasetAuditor,] = this.accounts.getDatasetAuditor()
            await this._setupContractRole(datasetAuditor, "DA");

            let [datasetPreparer,] = this.accounts.getProofSubmitter()
            await this._setupContractRole(datasetPreparer, "DP");
        } catch (error) {
            throw error
        }
    }

    private async setupDatasetsDependencies(): Promise<void> {
        try {
            let [governance, governanceKey] = this.accounts.getGovernance()
            let datasetProofAddress = this.contractsAddresses.get("DatasetsProof")
            if (!datasetProofAddress) {
                throw new Error("cant get datasetsProof address in env")
            }
            let ret = await handleEvmError(this.DatasetMetadataEvm().datasetsProof())
            if (ret.data as string === datasetProofAddress) {
                // Role already set up
                return
            }

            await handleEvmError(this.DatasetMetadataEvm().initDependencies(
                datasetProofAddress,
                {
                    from: governance,
                    privateKey: governanceKey
                }
            ))
        } catch (error) {
            throw error
        }
    }

    private async setupDatasetsProofDependencies(): Promise<void> {
        try {
            let [governance, governanceKey] = this.accounts.getGovernance()
            let datasetChallengeAddress = this.contractsAddresses.get("DatasetsChallenge")
            if (!datasetChallengeAddress) {
                throw new Error("cant get datasetsChallenge address in env")
            }

            let ret = await handleEvmError(this.DatasetProofEvm().datasetsChallenge())
            if (ret.data as string === datasetChallengeAddress) {
                // Role already set up
                return
            }

            await handleEvmError(this.DatasetProofEvm().initDependencies(
                datasetChallengeAddress,
                {
                    from: governance,
                    privateKey: governanceKey
                }
            ))
        } catch (error) {
            throw error
        }
    }
    private async setupMatchingsBidsDependencies(): Promise<void> {
        try {
            let [governance, governanceKey] = this.accounts.getGovernance()


            let matchingsAddress = this.contractsAddresses.get("Matchings")
            if (!matchingsAddress) {
                throw new Error("cant get matchings ddress in env")
            }
            let matchingsTargetAddress = this.contractsAddresses.get("MatchingsTarget")
            if (!matchingsTargetAddress) {
                throw new Error("cant get matchingsTarget ddress in env")
            }

            let ret = await handleEvmError(this.MatchingBidsEvm().matchings())
            let retMatchingsAddress = ret.data as string
            ret = await handleEvmError(this.MatchingBidsEvm().matchingsTarget())
            let retMatchingsTargetAddress = ret.data as string

            if (retMatchingsAddress === matchingsAddress &&
                retMatchingsTargetAddress === matchingsTargetAddress) {
                // Role already set up
                return
            } else {
                await handleEvmError(this.MatchingBidsEvm().initDependencies(
                    matchingsAddress,
                    matchingsTargetAddress,
                    {
                        from: governance,
                        privateKey: governanceKey
                    }
                ))
            }
        } catch (error) {
            throw error
        }
    }

    private async setupMatchingsTargetDependencies(): Promise<void> {
        try {
            let [governance, governanceKey] = this.accounts.getGovernance()


            let matchingsAddress = this.contractsAddresses.get("Matchings")
            if (!matchingsAddress) {
                throw new Error("cant get matchings ddress in env")
            }
            let matchingsBidsAddress = this.contractsAddresses.get("MatchingsBids")
            if (!matchingsBidsAddress) {
                throw new Error("cant get matchingsBids ddress in env")
            }

            let ret = await handleEvmError(this.MatchingTargetEvm().matchings())
            let retMatchingsAddress = ret.data as string
            ret = await handleEvmError(this.MatchingTargetEvm().matchingsBids())
            let retMatchingsBidsAddress = ret.data as string

            if (retMatchingsAddress === matchingsAddress &&
                retMatchingsBidsAddress === matchingsBidsAddress) {
                // Role already set up
                return
            } else {
                await handleEvmError(this.MatchingTargetEvm().initDependencies(
                    matchingsAddress,
                    matchingsBidsAddress,
                    {
                        from: governance,
                        privateKey: governanceKey
                    }
                ))
            }
        } catch (error) {
            throw error
        }
    }
    private async setupEscrowDependencies(): Promise<void> {
        try {
            let [governance, governanceKey] = this.accounts.getGovernance()

            let datasetProofAddress = this.contractsAddresses.get("DatasetsProof")
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

            if (retDatasetProofAddress === datasetProofAddress &&
                retStoragesAddress === storagesAddress &&
                retDatacapsAddress === datacapsAddress) {
                // Role already set up
                return
            } else {
                await handleEvmError(this.EscrowEvm().initDependencies(
                    datasetProofAddress,
                    storagesAddress,
                    datacapsAddress,
                    {
                        from: governance,
                        privateKey: governanceKey
                    }
                ))
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

    public CarstoreEvm(): CarstoreEvm {
        return this.getEvmInstance("Carstore") as CarstoreEvm
    }
    public DatacapsEvm(): DatacapsEvm {
        return this.getEvmInstance("Datacaps") as DatacapsEvm
    }
    public DatasetMetadataEvm(): DatasetMetadataEvm {
        return this.getEvmInstance("Datasets") as DatasetMetadataEvm
    }

    public DatasetChallengeEvm(): DatasetChallengeEvm {
        return this.getEvmInstance("DatasetsChallenge") as DatasetChallengeEvm
    }

    public DatasetProofEvm(): DatasetProofEvm {
        return this.getEvmInstance("DatasetsProof") as DatasetProofEvm
    }

    public DatasetRequirementEvm(): DatasetRequirementEvm {
        return this.getEvmInstance("DatasetsRequirement") as DatasetRequirementEvm
    }

    public EscrowEvm(): EscrowEvm {
        return this.getEvmInstance("Escrow") as EscrowEvm
    }

    public FilecoinEvm(): FilecoinEvm {
        return this.getEvmInstance("Filecoin") as FilecoinEvm
    }

    public FilplusEvm(): FilplusEvm {
        return this.getEvmInstance("Filplus") as FilplusEvm
    }

    public MatchingMetadataEvm(): MatchingMetadataEvm {
        return this.getEvmInstance("Matchings") as MatchingMetadataEvm
    }

    public MatchingBidsEvm(): MatchingBidsEvm {
        return this.getEvmInstance("MatchingsBids") as MatchingBidsEvm
    }

    public MatchingTargetEvm(): MatchingTargetEvm {
        return this.getEvmInstance("MatchingsTarget") as MatchingTargetEvm
    }

    public RolesEvm(): RolesEvm {
        return this.getEvmInstance("Roles") as RolesEvm
    }

    public StoragesEvm(): StoragesEvm {
        return this.getEvmInstance("Storages") as StoragesEvm
    }
}
