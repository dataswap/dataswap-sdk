import { DatasetsTestBase } from "./abstract/DatasetsTestBase";
import { DataType } from "../../../../src/shared/types/dataType";
import { IContractsManager } from "../../../interfaces/setup/IContractsManater";
import { IDatasetsHelper } from "../../../interfaces/helper/module/IDatasetshelper";
import { IGenerator } from "../../../interfaces/setup/IGenerator";
import { IDatasetsAssertion } from "../../../interfaces/assertions/module/IDatasetsAssertion";
import { DatasetsHelper } from "../../../helpers/module/datasetsHelper";

export class SubmitDatasetProofRootSuccessTestKit extends DatasetsTestBase {
    constructor(_assertion: IDatasetsAssertion, _generator: IGenerator, _contractsManager: IContractsManager, _datasetHelper?: IDatasetsHelper) {
        super(_assertion, _generator, _contractsManager, _datasetHelper)
    }

    async optionalBefore(): Promise<number> {
        try {
            return await this.datasetsHelper.metadataApprovedDatasetWorkflow()
        } catch (error) {
            throw error
        }
    }

    async action(datasetId: number): Promise<number> {
        try {
            let dataType = DataType.MappingFiles
            let [rootHash, , , mappingFilesAccessMethod] = this.generator.generateDatasetProof(0, dataType)
            await this.assertion.submitDatasetProofRootAssertion(
                datasetId,
                dataType,
                mappingFilesAccessMethod,
                rootHash,
                process.env.DATASWAP_PROOFSUBMITTER as string
            )
            this.generator.setProofRoot(datasetId, dataType, rootHash)
            dataType = DataType.Source
            let [sourceRootHash, , ,] = this.generator.generateDatasetProof(0, dataType)
            await this.assertion.submitDatasetProofRootAssertion(
                datasetId,
                dataType,
                '',
                sourceRootHash,
                process.env.DATASWAP_PROOFSUBMITTER as string
            )
            this.generator.setProofRoot(datasetId, dataType, sourceRootHash)

            return datasetId
        } catch (error) {
            throw error
        }
    }
}

export class SubmitDatasetProoSuccessTestKit extends DatasetsTestBase {
    private dependentTestKit: SubmitDatasetProofRootSuccessTestKit
    constructor(_assertion: IDatasetsAssertion, _generator: IGenerator, _contractsManager: IContractsManager, _datasetHelper?: IDatasetsHelper) {
        if (!_datasetHelper) {
            _datasetHelper = new DatasetsHelper(_generator, _contractsManager)
        }

        super(_assertion, _generator, _contractsManager, _datasetHelper)
        this.dependentTestKit = new SubmitDatasetProofRootSuccessTestKit(
            _assertion,
            _generator,
            _contractsManager,
            _datasetHelper
        )
    }

    async optionalBefore(): Promise<number> {
        try {
            let datasetId = await this.dependentTestKit.run()
            return datasetId
        } catch (error) {
            throw error
        }
    }

    async action(datasetId: number): Promise<number> {
        try {
            let dataType = DataType.MappingFiles
            let rootHash = this.generator.getProofRoot(datasetId, dataType)
            let [leafHashes, leafSizes] = this.generator.getDatasetProof(rootHash!)

            await this.assertion.submitDatasetProofAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                datasetId,
                dataType,
                leafHashes,
                0,
                leafSizes,
                true
            )

            dataType = DataType.Source
            let sourceRootHash = this.generator.getProofRoot(datasetId, dataType)
            let [sourceLeafHashes, sourceLeafSizes] = this.generator.getDatasetProof(sourceRootHash!)

            await this.assertion.submitDatasetProofAssertion(
                process.env.DATASWAP_PROOFSUBMITTER as string,
                datasetId,
                dataType,
                sourceLeafHashes,
                0,
                sourceLeafSizes,
                true
            )

            return datasetId
        } catch (error) {
            throw error
        }
    }
}