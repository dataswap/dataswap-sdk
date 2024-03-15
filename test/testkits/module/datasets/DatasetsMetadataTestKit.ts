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

import { DatasetsTestBase } from "./abstract/DatasetsTestBase"
import { DatasetState } from "../../../../src/shared/types/datasetType"
import { IContractsManager } from "../../../interfaces/setup/IContractsManater"
import { IDatasetsHelper } from "../../../interfaces/helper/module/IDatasetshelper"
import { IGenerator } from "../../../interfaces/setup/IGenerator"
import { IDatasetsAssertion } from "../../../interfaces/assertions/module/IDatasetsAssertion"
import { DataType } from "../../../../src/shared/types/dataType"

/**
 * Represents a test kit for submitting metadata successfully.
 * Extends from DatasetsTestBase.
 */
export class SubmitMetadataTestKit extends DatasetsTestBase {
    /**
     * Constructor for SubmitMetadataSuccessTestKit.
     * @param _assertion - The assertion instance.
     * @param _generator - The generator instance.
     * @param _contractsManager - The contracts manager instance.
     * @param _datasetHelper - The datasets helper instance.
     */
    constructor(
        _assertion: IDatasetsAssertion,
        _generator: IGenerator,
        _contractsManager: IContractsManager,
        _datasetHelper?: IDatasetsHelper
    ) {
        super(_assertion, _generator, _contractsManager, _datasetHelper)
    }

    /**
     * Action function to execute the submission of metadata.
     * @param _ - Unused parameter.
     * @returns Promise resolving to a number.
     */
    async action(_: number): Promise<number> {
        try {
            const datasetMetadata = this.generator.generateDatasetMetadata()
            const clientId = 101

            const datasetId =
                await this.assertion.submitDatasetMetadataAssertion(
                    process.env.DATASWAP_METADATASUBMITTER as string,
                    clientId,
                    datasetMetadata
                )

            const datasetRuleMinProofTimeout = await this.contractsManager
                .FilplusEvm()
                .datasetRuleMinProofTimeout()

            const datasetRuleMinAuditTimeout = await this.contractsManager
                .FilplusEvm()
                .datasetRuleMinAuditTimeout()

            await this.assertion.updateDatasetTimeoutParametersAssertion(
                process.env.DATASWAP_METADATASUBMITTER as string,
                datasetId,
                datasetRuleMinProofTimeout.data! + BigInt(1),
                datasetRuleMinAuditTimeout.data! + BigInt(1)
            )
            await this.assertion.getDatasetStateAssertion(
                datasetId,
                DatasetState.MetadataSubmitted
            )
            this.datasetsHelper.updateWorkflowTargetState(
                datasetId,
                DatasetState.MetadataSubmitted
            )
            return datasetId
        } catch (error) {
            throw error
        }
    }
}
