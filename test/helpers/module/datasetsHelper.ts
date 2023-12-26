import { IDatasetsHelper } from "../../interfaces/helper/module/IDatasetshelper"
import { BasicHelper } from "./basicHelper"
import { DatasetState } from "../../../src/shared/types/datasetType"
import { DataType } from "../../../src/shared/types/dataType"
import { expect } from "chai"
import { handleEvmError } from "../../shared/error"
import { IGenerator } from "../../interfaces/setup/IGenerator"
import { IContractsManager } from "../../interfaces/setup/IContractsManater"
import { DatasetsAssertion } from "../../assertions/module/datasetsAssertion"
import { IDatasetsAssertion } from "../../interfaces/assertions/module/IDatasetsAssertion"


export class DatasetsHelper extends BasicHelper implements IDatasetsHelper {
    private generator: IGenerator
    private contractsManager: IContractsManager
    private assertion: IDatasetsAssertion
    constructor(
        _generator: IGenerator,
        _contractsManager: IContractsManager
    ) {
        super()
        this.generator = _generator
        this.contractsManager = _contractsManager
        this.assertion = new DatasetsAssertion(_contractsManager)
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
            let datasetMetadata = this.generator.generateDatasetMetadata()
            let clientId = 101

            let datasetId = await this.assertion.submitDatasetMetadataAssertion(process.env.DATASWAP_METADATASUBMITTER as string, clientId, datasetMetadata)

            // Generate dataset requirements
            let requirments = this.generator.generateDatasetRequirements(replicasCount, elementCountInReplica, duplicateIndex, duplicateCount)

            // Submit dataset replica requirements transaction
            await this.assertion.submitDatasetReplicaRequirementsAssertion(
                process.env.DATASWAP_METADATASUBMITTER as string,
                datasetId,
                requirments,
                BigInt(0)
            )

            await this.assertion.getDatasetStateAssertion(datasetId, DatasetState.MetadataSubmitted)

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
            await this.assertion.approveDatasetMetadataAssertion(
                process.env.DATASWAP_GOVERNANCE as string,
                datasetId,
                DatasetState.MetadataApproved
            )

            this.updateWorkflowTargetState(datasetId, DatasetState.MetadataApproved)

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
        await this.assertion.rejectDatasetMetadataAssertion(process.env.DATASWAP_GOVERNANCE as string, datasetId, DatasetState.MetadataRejected)

        this.updateWorkflowTargetState(datasetId, Number(DatasetState.MetadataRejected))
        return datasetId
    }

    async fundsNotEnoughDatasetWorkflow(): Promise<number> {
        let datasetId = await this.completeDependentWorkflow(
            DatasetState.MetadataApproved,
            this.metadataApprovedDatasetWorkflow,
        )

        let dataType = DataType.MappingFiles
        let [rootHashMappings, leafHashesMappings, leafSizesMappings, mappingFilesAccessMethod] = this.generator.generateDatasetProof(0, dataType)

        this.contractsManager.DatasetProofEvm().getWallet().setDefault(process.env.DATASWAP_PROOFSUBMITTER as string)
        await handleEvmError(this.contractsManager.DatasetProofEvm().submitDatasetProofRoot(
            datasetId,
            dataType,
            mappingFilesAccessMethod,
            rootHashMappings,
        ))

        await handleEvmError(this.contractsManager.DatasetProofEvm().submitDatasetProof(
            datasetId,
            dataType,
            leafHashesMappings,
            0,
            leafSizesMappings,
            true,
        ))
        this.generator.setProofRoot(datasetId, DataType.MappingFiles, rootHashMappings)

        dataType = DataType.Source

        let [rootHash, leafHashes, leafSizes,] = this.generator.generateDatasetProof(0, dataType)
        await handleEvmError(this.contractsManager.DatasetProofEvm().submitDatasetProofRoot(
            datasetId,
            dataType,
            '',
            rootHash,
        ))


        await handleEvmError(this.contractsManager.DatasetProofEvm().submitDatasetProof(
            datasetId,
            dataType,
            leafHashes,
            0,
            leafSizes,
            true,
        ))
        await handleEvmError(this.contractsManager.DatasetProofEvm().submitDatasetProofCompleted(
            datasetId,
        ))
        // Get updated dataset state
        let datasetState = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetState(datasetId))

        // Assertions for dataset state and metadata
        expect(BigInt(DatasetState.FundsNotEnough)).to.equal(datasetState.data)
        this.generator.setProofRoot(datasetId, DataType.Source, rootHashMappings)

        this.updateWorkflowTargetState(datasetId, Number(DatasetState.FundsNotEnough))
        return datasetId
    }

    async proofSubmittedDatasetWorkflow(): Promise<number> {
        let datasetId = await this.completeDependentWorkflow(
            DatasetState.FundsNotEnough,
            this.fundsNotEnoughDatasetWorkflow
        )
        this.contractsManager.DatasetProofEvm().getWallet().setDefault(process.env.DATASWAP_METADATASUBMITTER as string)
        let fee = BigInt(this.contractsManager.DatasetProofEvm().generateWei("0.5", "ether").toString())
        await handleEvmError(this.contractsManager.DatasetProofEvm().appendDatasetFunds(
            datasetId,
            fee,
            fee,
            {
                value: this.contractsManager.DatasetProofEvm().generateWei("1", "ether")
            }
        ))

        this.contractsManager.DatasetProofEvm().getWallet().setDefault(process.env.DATASWAP_PROOFSUBMITTER as string)
        await handleEvmError(this.contractsManager.DatasetProofEvm().submitDatasetProofCompleted(
            datasetId,
        ))


        // Get updated dataset state
        let datasetState = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetState(datasetId))

        // Assertions for dataset state and metadata
        expect(BigInt(DatasetState.DatasetProofSubmitted)).to.equal(datasetState.data)
        this.updateWorkflowTargetState(datasetId, Number(DatasetState.DatasetProofSubmitted))
        return datasetId
    }

    async aprovedDatasetWorkflow(): Promise<number> {
        let datasetId = await this.completeDependentWorkflow(
            DatasetState.DatasetProofSubmitted,
            this.proofSubmittedDatasetWorkflow,
        )
        let rootHash = this.generator.getProofRoot(datasetId, DataType.Source)
        let [randomSeed, leaves, siblings, paths] = this.generator.generateDatasetChallengeProof(rootHash!)

        this.contractsManager.DatasetProofEvm().getWallet().setDefault(process.env.DATASWAP_DATASETAUDITOR as string)
        await handleEvmError(this.contractsManager.DatasetChallengeEvm().submitDatasetChallengeProofs(
            datasetId,
            randomSeed,
            leaves,
            siblings,
            paths,
        ))

        this.contractsManager.DatasetMetadataEvm().getWallet().setDefault(process.env.DATASWAP_GOVERNANCE as string)
        await handleEvmError(this.contractsManager.DatasetMetadataEvm().approveDataset(
            datasetId,
        ))

        // Get updated dataset state
        let datasetState = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetState(datasetId))

        // Assertions for dataset state and metadata
        expect(BigInt(DatasetState.DatasetApproved)).to.equal(datasetState.data)
        this.updateWorkflowTargetState(datasetId, Number(DatasetState.DatasetApproved))

        return datasetId
    }

}
