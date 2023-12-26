import { DatasetsTestBase } from "./abstract/DatasetsTestBase";
import { DatasetState } from "../../../../src/shared/types/datasetType";
import { IContractsManager } from "../../../interfaces/setup/IContractsManater";
import { IDatasetsHelper } from "../../../interfaces/helper/module/IDatasetshelper";
import { IGenerator } from "../../../interfaces/setup/IGenerator";
import { IDatasetsAssertion } from "../../../interfaces/assertions/module/IDatasetsAssertion";

export class SubmitMetadataSuccessTestKit extends DatasetsTestBase {
    constructor(_assertion: IDatasetsAssertion, _generator: IGenerator, _contractsManager: IContractsManager, _datasetHelper?: IDatasetsHelper) {
        super(_assertion, _generator, _contractsManager, _datasetHelper)
    }

    async action(_: number): Promise<number> {
        try {
            let datasetMetadata = this.generator.generateDatasetMetadata()
            let clientId = 101

            let datasetId = await this.assertion.submitDatasetMetadataAssertion(clientId, datasetMetadata)

            return datasetId
        } catch (error) {
            throw error
        }
    }
}

export class ApproveDatasetMetadataSuccessTestKit extends DatasetsTestBase {
    constructor(_assertion: IDatasetsAssertion, _generator: IGenerator, _contractsManager: IContractsManager, _datasetHelper: IDatasetsHelper) {
        super(_assertion, _generator, _contractsManager, _datasetHelper)
    }

    async optionalBefore(): Promise<number> {
        try {
            return await this.datasetsHelper.metadataSubmittedDatasetWorkflow(5, 3)
            //return [datasetId]
        } catch (error) {
            throw error
        }
    }

    async action(datasetId: number): Promise<number> {
        try {
            await this.assertion.approveDatasetMetadataAssertion(
                datasetId,
                DatasetState.MetadataApproved
            )

            this.datasetsHelper.updateWorkflowTargetState(datasetId, DatasetState.MetadataApproved)
            return datasetId
        } catch (error) {
            throw error
        }
    }
}