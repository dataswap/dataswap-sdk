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
import { IDatasetsAssertion } from "../../../interfaces/assertions/module/IDatasetsAssertion";

/**
 * Represents a test kit for submitting metadata successfully.
 * Extends from DatasetsTestBase.
 */
export class SubmitMetadataSuccessTestKit extends DatasetsTestBase {
    /**
     * Constructor for SubmitMetadataSuccessTestKit.
     * @param _assertion - The assertion instance.
     * @param _generator - The generator instance.
     * @param _contractsManager - The contracts manager instance.
     * @param _datasetHelper - The datasets helper instance.
     */
    constructor(_assertion: IDatasetsAssertion, _generator: IGenerator, _contractsManager: IContractsManager, _datasetHelper?: IDatasetsHelper) {
        super(_assertion, _generator, _contractsManager, _datasetHelper)
    }

    /**
     * Action function to execute the submission of metadata.
     * @param _ - Unused parameter.
     * @returns Promise resolving to a number.
     */
    async action(_: number): Promise<number> {
        try {
            let datasetMetadata = this.generator.generateDatasetMetadata()
            let clientId = 101

            let datasetId = await this.assertion.submitDatasetMetadataAssertion(
                process.env.DATASWAP_METADATASUBMITTER as string,
                clientId,
                datasetMetadata
            )

            return datasetId
        } catch (error) {
            throw error
        }
    }
}

/**
 * Represents a test kit for approving dataset metadata successfully.
 * Extends from DatasetsTestBase.
 */
export class ApproveDatasetMetadataSuccessTestKit extends DatasetsTestBase {
    /**
     * Constructor for ApproveDatasetMetadataSuccessTestKit.
     * @param _assertion - The assertion instance.
     * @param _generator - The generator instance.
     * @param _contractsManager - The contracts manager instance.
     * @param _datasetHelper - The datasets helper instance.
     */
    constructor(_assertion: IDatasetsAssertion, _generator: IGenerator, _contractsManager: IContractsManager, _datasetHelper: IDatasetsHelper) {
        super(_assertion, _generator, _contractsManager, _datasetHelper)
    }

    /**
     * Optional function executed before the action.
     * @returns Promise resolving to a number.
     */
    async optionalBefore(): Promise<number> {
        try {
            return await this.datasetsHelper.metadataSubmittedDatasetWorkflow(5, 3)
            //return [datasetId]
        } catch (error) {
            throw error
        }
    }

    /**
     * Action function to execute the approval of dataset metadata.
     * @param datasetId - The ID of the dataset.
     * @returns Promise resolving to a number.
     */
    async action(datasetId: number): Promise<number> {
        try {
            await this.assertion.approveDatasetMetadataAssertion(
                process.env.DATASWAP_GOVERNANCE as string,
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
