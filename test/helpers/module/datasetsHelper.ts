import { IDatasetsHelper } from "../../interfaces/helper/module/IDatasetshelper"
import { BasicHelper } from "./basicHelper"
import { DatasetState } from "../../../src/shared/types/datasetType"
import { expect } from "chai"
import { handleEvmError } from "../../shared/error"
import { IGenerator } from "../../interfaces/environments/IGenerator"
import { IAccounts } from "../../interfaces/environments/IAccounts"
import { IContractsManager } from "../../interfaces/environments/IContractsManater"


export class DatasetsHelper extends BasicHelper implements IDatasetsHelper {
    private accounts: IAccounts
    private generator: IGenerator
    private contractsManager: IContractsManager
    constructor(
        _accounts: IAccounts,
        _generator: IGenerator,
        _contractsManager: IContractsManager
    ) {
        super()
        this.accounts = _accounts
        this.generator = _generator
        this.contractsManager = _contractsManager
    }
    /**
     * Workflow for submitting dataset metadata.
     * @param replicasCount The number of replicas for the dataset.
     * @param elementCountInReplica The element count in each replica.
     * @param duplicateIndex The duplicate index (optional).
     * @param duplicateCount The duplicate count (optional).
     * @returns A Promise that resolves with the dataset ID.
     */
    async metadataSubmittedDatasetWorkflow(replicasCount: number, elementCountInReplica: number, duplicateIndex?: number, duplicateCount?: number): Promise<number> {
        try {
            let [client, clientkey] = this.accounts.getClient()
            let datasetMetadata = this.generator.generateDatasetMetadata()
            let clientId = 100

            // Submit dataset metadata transaction
            let tx = await this.contractsManager.DatasetMetadataEvm().submitDatasetMetadata(
                clientId,
                datasetMetadata.title,
                datasetMetadata.industry,
                datasetMetadata.name,
                datasetMetadata.description,
                datasetMetadata.source,
                datasetMetadata.accessMethod,
                datasetMetadata.sizeInBytes,
                datasetMetadata.isPublic,
                datasetMetadata.version,
                {
                    from: client,
                    privateKey: clientkey,
                }
            )
            // Handle transaction failure
            if (!tx.ok) {
                console.log("submit metadata failed, tx:", tx)
            }

            // Get transaction receipt and event arguments
            const receipt = await this.contractsManager.DatasetMetadataEvm().getTransactionReceipt(
                tx.data.hash
            )

            let ret = this.contractsManager.DatasetMetadataEvm().getEvmEventArgs(receipt!, "DatasetMetadataSubmitted")

            let datasetId = Number(ret.data.datasetId)

            // Generate dataset requirements
            let requirments = this.generator.generateDatasetRequirements(replicasCount, elementCountInReplica, duplicateIndex, duplicateCount)

            // Submit dataset replica requirements transaction
            tx = await this.contractsManager.DatasetRequirementEvm().submitDatasetReplicaRequirements(
                datasetId,
                requirments.dataPreparers,
                requirments.storageProviders,
                requirments.regionCodes,
                requirments.countryCodes,
                requirments.cityCodes,
                BigInt(0),
                {
                    from: client,
                    privateKey: clientkey,
                }
            )
            // Handle transaction failure
            if (!tx.ok) {
                console.log("submit requirements failed, tx:", tx)
            }

            // Get updated dataset state
            let datasetState = await this.contractsManager.DatasetMetadataEvm().getDatasetState(datasetId)

            // Assertions for dataset state and metadata
            expect(BigInt(DatasetState.MetadataSubmitted)).to.equal(datasetState.data)
            // Update workflow target state and return dataset ID
            this.updateWorkflowTargetState(datasetId, Number(DatasetState.MetadataSubmitted))
            return datasetId
        } catch (error) {
            throw error
        }
    }

    async metadataApprovedDatasetWorkflow(): Promise<number> {
        try {
            let datasetId = await this.completeDependentWorkflow(
                Number(DatasetState.MetadataSubmitted),
                async (): Promise<number> => {
                    return await this.metadataSubmittedDatasetWorkflow(5, 3)
                }
            )

            let [governance, governanceKey] = this.accounts.getGovernance()

            await this.contractsManager.DatasetMetadataEvm().approveDatasetMetadata(
                datasetId,
                {
                    from: governance,
                    privateKey: governanceKey,
                }
            )
            // Get updated dataset state
            let datasetState = await this.contractsManager.DatasetMetadataEvm().getDatasetState(datasetId)

            // Assertions for dataset state and metadata
            expect(BigInt(DatasetState.MetadataApproved)).to.equal(datasetState.data)

            this.updateWorkflowTargetState(datasetId, Number(DatasetState.MetadataApproved))
            return datasetId
        } catch (error) {
            throw error
        }
    }

    async metadataRejectedDatasetWorkflow(): Promise<number> {
        let datasetId = await this.completeDependentWorkflow(
            DatasetState.MetadataSubmitted,
            async (): Promise<number> => {
                return await this.metadataSubmittedDatasetWorkflow(5, 3)
            }
        )

        let [governance, governanceKey] = this.accounts.getGovernance()

        this.contractsManager.DatasetMetadataEvm().rejectDatasetMetadata(
            datasetId,
            {
                from: governance,
                privateKey: governanceKey
            })
        // Get updated dataset state
        let datasetState = await this.contractsManager.DatasetMetadataEvm().getDatasetState(datasetId)

        // Assertions for dataset state and metadata
        expect(BigInt(DatasetState.MetadataRejected)).to.equal(datasetState.data)
        this.updateWorkflowTargetState(datasetId, Number(DatasetState.MetadataRejected))
        return datasetId
    }

    async fundsNotEnoughDatasetWorkflow(): Promise<number> {
        let datasetId = await this.completeDependentWorkflow(
            DatasetState.MetadataSubmitted,
            this.metadataApprovedDatasetWorkflow,
        )

        let [dp, dpKey] = this.accounts.getGovernance()


        // Get updated dataset state
        let datasetState = await this.contractsManager.DatasetMetadataEvm().getDatasetState(datasetId)

        // Assertions for dataset state and metadata
        expect(BigInt(DatasetState.MetadataRejected)).to.equal(datasetState.data)
        this.updateWorkflowTargetState(datasetId, Number(DatasetState.MetadataRejected))
        return datasetId
    }

    async proofSubmittedDatasetWorkflow(dataType: number): Promise<number> {

        return 0
    }

    async aprovedDatasetWorkflow(): Promise<number> {

        return 0
    }
}
