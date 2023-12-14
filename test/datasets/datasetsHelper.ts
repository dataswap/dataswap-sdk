import { DatasetMetadataEvm } from "../../src/dataset/metadata/repo/evm"
import { DatasetRequirementEvm } from "../../src/dataset/requirement/repo/evm"
import { DatasetProofEvm } from "../../src/dataset/proof/repo/evm"
import { DatasetChallengeEvm } from "../../src/dataset/challenge/repo/evm"
import DatasetsAbi from "@dataswapcore/contracts/abi/v0.8/Datasets.json"
import DatasetsRequirementAbi from "@dataswapcore/contracts/abi/v0.8/DatasetsRequirement.json"
import DatasetsProofAbi from "@dataswapcore/contracts/abi/v0.8/DatasetsProof.json"
import DatasetsChallengeAbi from "@dataswapcore/contracts/abi/v0.8/DatasetsChallenge.json"
import * as utils from "../shared/utils"
import { Accounts } from "../shared/accounts"
import { Requirements } from "../shared/requirements"
import { DatasetMetadata } from "../../src/dataset/metadata/types/index"
import { DatasetRequirement } from "../../src/dataset/requirement/types"
import { EvmEngine } from "../../src/shared/types/evmEngineType"

export class DatasetsHelper {
    private static instance: DatasetsHelper

    private metadata: DatasetMetadataEvm
    private requirement: DatasetRequirementEvm
    private proof: DatasetProofEvm
    private challenge: DatasetChallengeEvm

    private targetDatasetId: number
    private accounts: Accounts
    private requirements: Requirements

    constructor() {
        ;(this.metadata = new DatasetMetadataEvm(
            new EvmEngine(
                DatasetsAbi,
                utils.getEnvVariable("DatasetsAddress") as string,
                utils.getEnvVariable("NETWORK_RPC_URL") as string
            )
        )),
            (this.requirement = new DatasetRequirementEvm(
                new EvmEngine(
                    DatasetsRequirementAbi,
                    utils.getEnvVariable(
                        "DatasetsRequirementAddress"
                    ) as string,
                    utils.getEnvVariable("NETWORK_RPC_URL") as string
                )
            )),
            (this.proof = new DatasetProofEvm(
                new EvmEngine(
                    DatasetsProofAbi,
                    utils.getEnvVariable("DatasetsProofAddress") as string,
                    utils.getEnvVariable("NETWORK_RPC_URL") as string
                )
            ))
        this.challenge = new DatasetChallengeEvm(
            new EvmEngine(
                DatasetsChallengeAbi,
                utils.getEnvVariable("DatasetsChallengeAddress") as string,
                utils.getEnvVariable("NETWORK_RPC_URL") as string
            )
        )
        this.targetDatasetId = 0
        this.accounts = Accounts.Instance()
        this.requirements = Requirements.Instance()
    }

    public static Instance(): DatasetsHelper {
        if (!DatasetsHelper.instance) {
            DatasetsHelper.instance = new DatasetsHelper()
        }
        return DatasetsHelper.instance
    }

    async getDatasetMetadata(): Promise<DatasetMetadata> {
        let call = await this.metadata.getDatasetMetadata(this.targetDatasetId)
        return call.data as DatasetMetadata
    }

    async getDatasetMetadataSubmitter(): Promise<string> {
        let call = await this.metadata.getDatasetMetadataSubmitter(
            this.targetDatasetId
        )
        return call.data as string
    }

    async getDatasetState(): Promise<number> {
        let call = await this.metadata.getDatasetState(this.targetDatasetId)
        return Number(call.data)
    }

    async governanceAddress(): Promise<string> {
        let call = await this.metadata.governanceAddress()
        return call.data as string
    }

    async hasDatasetMetadata(accessMethod: string): Promise<boolean> {
        let call = await this.metadata.hasDatasetMetadata(accessMethod)
        return call.data as boolean
    }
    async approveDataset() {
        let [governance, governanceKey] = this.accounts.getGovernance()
        let tx = await this.metadata.approveDataset(this.targetDatasetId, {
            from: governance,
            privateKey: governanceKey,
        })
    }
    async approveDatasetMetadata() {
        let [governance, governanceKey] = this.accounts.getGovernance()
        let tx = await this.metadata.approveDatasetMetadata(
            this.targetDatasetId,
            {
                from: governance,
                privateKey: governanceKey,
            }
        )
    }

    async rejectDataset() {
        let [governance, governanceKey] = this.accounts.getGovernance()
        let tx = await this.metadata.rejectDataset(this.targetDatasetId, {
            from: governance,
            privateKey: governanceKey,
        })
    }

    async rejectDatasetMetadata() {
        let [governance, governanceKey] = this.accounts.getGovernance()
        let tx = await this.metadata.rejectDatasetMetadata(
            this.targetDatasetId,
            {
                from: governance,
                privateKey: governanceKey,
            }
        )
    }

    async submitDatasetMetadata(
        dataClientId: number,
        title: string,
        industry: string,
        name: string,
        description: string,
        source: string,
        accessMethod: string,
        sizeInBytes: number,
        isPublic: boolean,
        version: number
    ) {
        let [client, clientkey] = this.accounts.getClient()
        let tx = await this.metadata.submitDatasetMetadata(
            dataClientId,
            title,
            industry,
            name,
            description,
            source,
            accessMethod,
            sizeInBytes,
            isPublic,
            version,
            {
                from: client,
                privateKey: clientkey,
            }
        )
        await tx
        let call = await this.metadata.datasetsCount()
        this.targetDatasetId = Number(call.data)
    }

    getTargetDatasetId(): number {
        return this.targetDatasetId
    }

    async getDatasetReplicasCount(): Promise<number> {
        let call = await this.requirement.getDatasetReplicasCount(
            this.targetDatasetId
        )
        return Number(call.data)
    }

    async getDatasetReplicaRequirement(
        index: number
    ): Promise<DatasetRequirement> {
        let call = await this.requirement.getDatasetReplicaRequirement(
            this.targetDatasetId,
            index
        )
        return call.data as DatasetRequirement
    }

    async getDatasetPreCollateralRequirements(): Promise<number> {
        let call = await this.requirement.getDatasetPreCollateralRequirements(
            this.targetDatasetId
        )
        return Number(call.data)
    }

    async submitDatasetReplicaRequirements() {
        let [client, clientkey] = this.accounts.getClient()

        let dataPreparers = this.requirements.getDataPreparers()
        let [dp] = Accounts.Instance().getProofSubmitter()
        dataPreparers[0][0] = dp

        let storageProviders = this.requirements.getStorageProviders()
        let [sp] = Accounts.Instance().getBidder()
        storageProviders[0][0] = sp

        let regions = this.requirements.getRegions()
        let countrys = this.requirements.getCountrys()
        let citys = this.requirements.getCitys()
        console.log("data preparers:", dataPreparers)
        console.log("storage providers:", storageProviders)
        console.log("regions:", regions)
        console.log("countrys:", countrys)
        console.log("citys:", citys)

        let call = await this.requirement.submitDatasetReplicaRequirements(
            this.targetDatasetId,
            dataPreparers,
            storageProviders,
            regions,
            countrys,
            citys,
            {
                from: client,
                privateKey: clientkey,
            }
        )

        return Number(call.data)
    }
}
