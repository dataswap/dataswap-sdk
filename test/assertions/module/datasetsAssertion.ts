import { expect } from "chai"
import { IContractsManager } from "../../interfaces/setup/IContractsManater"
import { handleEvmError } from "../../shared/error"
import { DatasetMetadata } from "../../../src/module/dataset/metadata/types"
import { DatasetState } from "../../../src/shared/types/datasetType"
import { IAccounts } from "../../interfaces/setup/IAccounts"

export class DatasetsAssertion {
    private contractsManager: IContractsManager
    private accounts: IAccounts
    constructor(_accounts: IAccounts, _contractsManager: IContractsManager) {
        this.contractsManager = _contractsManager
        this.accounts = _accounts
    }

    async getDatasetMetadataAssertion(datasetId: number, expectData: DatasetMetadata): Promise<void> {
        let metaData = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetMetadata(datasetId))
        expect(expectData.title).to.be.equal(metaData.title)
        expect(expectData.industry).to.be.equal(metaData.industry)
        expect(expectData.name).to.be.equal(metaData.name)
        expect(expectData.description).to.be.equal(metaData.description)
        expect(expectData.source).to.be.equal(metaData.source)
        expect(expectData.accessMethod).to.be.equal(metaData.accessMethod)
        expect(expectData.sizeInBytes).to.be.equal(Number(metaData.sizeInBytes))
        expect(expectData.isPublic).to.be.equal(metaData.isPublic)
        expect(expectData.version).to.be.equal(Number(metaData.version))
    }

    async getDatasetMetadataSubmitterAssertion(datasetId: number, expectSubmitter: string): Promise<void> {
        let submitter = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetMetadataSubmitter(datasetId))
        expect(expectSubmitter).to.be.equal(submitter.data)
    }
    async getDatasetMetadataClientAssertion(datasetId: number, expectSubmitterClient: number): Promise<void> {
        let submitterClient = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetMetadataClient(datasetId))
        expect(expectSubmitterClient).to.be.equal(submitterClient.data)
    }
    async hasDatasetMetadataAssertion(expectAccessMethod: string): Promise<void> {
        let has = await handleEvmError(this.contractsManager.DatasetMetadataEvm().hasDatasetMetadata(expectAccessMethod))
        expect(true).to.be.equal(has.data)
    }

    async getDatasetStateAssertion(datasetId: number, expectState: DatasetState): Promise<void> {
        let state = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetState(datasetId))
        expect(Number(expectState)).to.be.equal(Number(state))
    }

    async governanceAddressAssertion(expectGovernance: string): Promise<void> {
        let governance = await handleEvmError(this.contractsManager.DatasetMetadataEvm().governanceAddress())
        expect(expectGovernance).to.be.equal(governance)
    }

    async submitDatasetMetadataAssertion(expectDatasetClient: number, expectData: DatasetMetadata): Promise<number> {
        let [client, clientKey] = this.accounts.getClient()
        let tx = await handleEvmError(this.contractsManager.DatasetMetadataEvm().submitDatasetMetadata(
            expectDatasetClient,
            expectData.title,
            expectData.industry,
            expectData.name,
            expectData.description,
            expectData.source,
            expectData.accessMethod,
            expectData.sizeInBytes,
            expectData.isPublic,
            expectData.version,
            {
                from: client,
                privateKey: clientKey
            }
        ))
        // Get transaction receipt and event arguments
        const receipt = await this.contractsManager.DatasetMetadataEvm().getTransactionReceipt(
            tx.data.hash
        )

        let ret = this.contractsManager.DatasetMetadataEvm().getEvmEventArgs(receipt!, "DatasetMetadataSubmitted")

        let datasetId = Number(ret.data.datasetId)
        this.datasetsCountAssertion(datasetId)
        this.getDatasetMetadataAssertion(datasetId, expectData)
        this.getDatasetMetadataSubmitterAssertion(datasetId, client)
        this.getDatasetMetadataClientAssertion(datasetId, expectDatasetClient)
        return datasetId
    }


    async datasetsProofAssertion(expectDatasetsProofAddress: string): Promise<void> {
        let datasetsProof = await handleEvmError(this.contractsManager.DatasetMetadataEvm().datasetsProof())
        expect(expectDatasetsProofAddress).to.equal(datasetsProof.data)
    }

    async datasetsCountAssertion(expectDatasetsCount: number): Promise<void> {
        let datasetCount = await handleEvmError(this.contractsManager.DatasetMetadataEvm().datasetsCount())
        expect(expectDatasetsCount).to.equal(Number(datasetCount.data))
    }

    async initDependenciesAssertion(
        expectDatasetsProof: string,
    ): Promise<void> {
        let [governance, governanceKey] = this.accounts.getGovernance()
        await handleEvmError(this.contractsManager.DatasetMetadataEvm().initDependencies(
            expectDatasetsProof,
            {
                from: governance,
                privateKey: governanceKey
            }
        ))
        await this.datasetsProofAssertion(expectDatasetsProof)
    }

    async approveDatasetAssertion(
        datasetId: number,
        expectState: DatasetState
    ): Promise<void> {
        let [governance, governanceKey] = this.accounts.getGovernance()
        await handleEvmError(this.contractsManager.DatasetMetadataEvm().approveDataset(
            datasetId,
            {
                from: governance,
                privateKey: governanceKey
            }))

        await this.getDatasetStateAssertion(datasetId, expectState)
    }

    async approveDatasetMetadataAssertion(
        datasetId: number,
        expectState: DatasetState
    ): Promise<void> {
        let [governance, governanceKey] = this.accounts.getGovernance()
        await handleEvmError(this.contractsManager.DatasetMetadataEvm().approveDatasetMetadata(
            datasetId,
            {
                from: governance,
                privateKey: governanceKey
            }))

        await this.getDatasetStateAssertion(datasetId, expectState)
    }

    async rejectDatasetAssertion(
        datasetId: number,
        expectState: DatasetState
    ): Promise<void> {
        let [governance, governanceKey] = this.accounts.getGovernance()
        await handleEvmError(this.contractsManager.DatasetMetadataEvm().rejectDataset(
            datasetId,
            {
                from: governance,
                privateKey: governanceKey
            }))
        await this.getDatasetStateAssertion(datasetId, expectState)
    }

    async rejectDatasetMetadataAssertion(
        datasetId: number,
        expectState: DatasetState
    ): Promise<void> {
        let [governance, governanceKey] = this.accounts.getGovernance()
        await handleEvmError(this.contractsManager.DatasetMetadataEvm().rejectDatasetMetadata(
            datasetId,
            {
                from: governance,
                privateKey: governanceKey
            }))
        await this.getDatasetStateAssertion(datasetId, expectState)
    }
}