import { DatasetMetadataEvm } from "../../src/dataset/metadata/repo/evm"
import { DatasetRequirementEvm } from "../../src/dataset/requirement/repo/evm"
import { DatasetProofEvm } from "../../src/dataset/proof/repo/evm"
import { DatasetChallengeEvm } from "../../src/dataset/challenge/repo/evm"
import DatasetsAbi from "@dataswapcore/abi/v0.1/module/dataset/Datasets.json"
import DatasetsRequirementAbi from "@dataswapcore/abi/v0.1/module/dataset/DatasetsRequirement.json"
import DatasetsProofAbi from "@dataswapcore/abi/v0.1/module/dataset/DatasetsProof.json"
import DatasetsChallengeAbi from "@dataswapcore/abi/v0.1/module/dataset/DatasetsChallenge.json"
import * as utils from "../utils/utils"
import { Accounts } from "../utils/accounts"
import { DatasetMetadata } from "../../src/dataset/metadata/types/index"

export class DatasetsHelper {
    private static instance: DatasetsHelper;

    private metadata: DatasetMetadataEvm
    private requirement: DatasetRequirementEvm
    private proof: DatasetProofEvm
    private challenge: DatasetChallengeEvm

    private targetDatasetId: number
    private accounts: Accounts

    constructor() {
        this.metadata = utils.getContract('Datasets', DatasetsAbi.abi, DatasetMetadataEvm)
        this.requirement = utils.getContract('DatasetsRequirement', DatasetsRequirementAbi.abi, DatasetRequirementEvm)
        this.proof = utils.getContract('DatasetsProof', DatasetsProofAbi.abi, DatasetProofEvm)
        this.challenge = utils.getContract('DatasetsChallenge', DatasetsChallengeAbi.abi, DatasetChallengeEvm)
        this.targetDatasetId = 0
        this.accounts = Accounts.Instance()
    }

    public static Instance(): DatasetsHelper {
        if (!DatasetsHelper.instance) {
            DatasetsHelper.instance = new DatasetsHelper();
        }
        return DatasetsHelper.instance;
    }

    async getDatasetMetadata(datasetId: number): Promise<DatasetMetadata> {
        let call = await this.metadata.getDatasetMetadata(datasetId)
        return call.data as DatasetMetadata
    }

    async getDatasetMetadataSubmitter(datasetId: number): Promise<string> {
        let call = await this.metadata.getDatasetMetadataSubmitter(datasetId)
        return call.data as string
    }

    async submitDatasetMetadata(
        title: string,
        industry: string,
        name: string,
        description: string,
        source: string,
        accessMethod: string,
        sizeInBytes: number,
        isPublic: boolean,
        version: number
    ): Promise<number> {
        let [client, clientkey] = this.accounts.getClient()
        let tx = await this.metadata.submitDatasetMetadata(
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
        return this.targetDatasetId
    }

    getTargetDatasetId(): number {
        return this.targetDatasetId
    }
}