import { DatasetsTestBase } from "./abstract/DatasetsTestBase";
import { DatasetState } from "../../../../src/shared/types/datasetType";
import { IContractsManager } from "../../../interfaces/setup/IContractsManater";
import { IDatasetsHelper } from "../../../interfaces/helper/module/IDatasetshelper";
import { IGenerator } from "../../../interfaces/setup/IGenerator";
import { SubmitMetadataSuccessTestKit } from "./DatasetsMetadataTestKit";
import { IDatasetsAssertion } from "../../../interfaces/assertions/module/IDatasetsAssertion";
import { DatasetsHelper } from "../../../helpers/module/datasetsHelper";

export class SubmitRequirementSuccessTestKit extends DatasetsTestBase {
    private dependentTestKit: SubmitMetadataSuccessTestKit
    constructor(_assertion: IDatasetsAssertion, _generator: IGenerator, _contractsManager: IContractsManager, _datasetHelper?: IDatasetsHelper) {
        super(_assertion, _generator, _contractsManager, _datasetHelper)
        if (!_datasetHelper) {
            _datasetHelper = new DatasetsHelper(_generator, _contractsManager)
        }

        this.dependentTestKit = new SubmitMetadataSuccessTestKit(_assertion, _generator, _contractsManager, _datasetHelper)
    }

    async optionalBefore(): Promise<number> {
        try {
            return await this.dependentTestKit.run()
        } catch (error) {
            throw error
        }
    }

    async action(datasetId: number): Promise<number> {
        try {
            // Generate dataset requirements
            let requirments = this.generator.generateDatasetRequirements(5, 3)
            await this.assertion.submitDatasetReplicaRequirementsAssertion(process.env.DATASWAP_METADATASUBMITTER as string, datasetId, requirments, BigInt(0))
            await this.assertion.getDatasetStateAssertion(datasetId, DatasetState.MetadataSubmitted)
            this.datasetsHelper.updateWorkflowTargetState(datasetId, DatasetState.MetadataSubmitted)
            return datasetId
        } catch (error) {
            throw error
        }
    }
}
