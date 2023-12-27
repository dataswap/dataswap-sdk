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

import { DatasetsTestBase } from "./abstract/DatasetsTestBase";
import { DatasetState } from "../../../../src/shared/types/datasetType";
import { IContractsManager } from "../../../interfaces/setup/IContractsManater";
import { IDatasetsHelper } from "../../../interfaces/helper/module/IDatasetshelper";
import { IGenerator } from "../../../interfaces/setup/IGenerator";
import { SubmitMetadataTestKit } from "./DatasetsMetadataTestKit";
import { IDatasetsAssertion } from "../../../interfaces/assertions/module/IDatasetsAssertion";
import { DatasetsHelper } from "../../../helpers/module/datasetsHelper";

/**
 * Represents a test kit for submitting requirement successfully.
 * Extends from DatasetsTestBase.
 */
export class SubmitRequirementTestKit extends DatasetsTestBase {
    private dependentTestKit: SubmitMetadataTestKit

    /**
     * Constructor for SubmitRequirementSuccessTestKit.
     * @param _assertion - The assertion instance.
     * @param _generator - The generator instance.
     * @param _contractsManager - The contracts manager instance.
     * @param _datasetHelper - The datasets helper instance.
     */
    constructor(_assertion: IDatasetsAssertion, _generator: IGenerator, _contractsManager: IContractsManager, _datasetHelper?: IDatasetsHelper) {
        super(_assertion, _generator, _contractsManager, _datasetHelper)
        if (!_datasetHelper) {
            _datasetHelper = new DatasetsHelper(_generator, _contractsManager)
        }

        this.dependentTestKit = new SubmitMetadataTestKit(_assertion, _generator, _contractsManager, _datasetHelper)
    }

    /**
     * Optional setup before the action execution.
     * @returns Promise resolving to a number.
     */
    async optionalBefore(): Promise<number> {
        try {
            return await this.dependentTestKit.run()
        } catch (error) {
            throw error
        }
    }

    /**
     * Action function to submit dataset requirements.
     * @param datasetId - The ID of the dataset.
     * @returns Promise resolving to a number.
     */
    async action(datasetId: number): Promise<number> {
        try {
            // Generate dataset requirements
            let requirements = this.generator.generateDatasetRequirements(5, 3)
            await this.assertion.submitDatasetReplicaRequirementsAssertion(process.env.DATASWAP_METADATASUBMITTER as string, datasetId, requirements, BigInt(0))
            await this.assertion.getDatasetStateAssertion(datasetId, DatasetState.MetadataSubmitted)
            this.datasetsHelper.updateWorkflowTargetState(datasetId, DatasetState.MetadataSubmitted)
            return datasetId
        } catch (error) {
            throw error
        }
    }
}