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
import { DataType } from "../../../../src/shared/types/dataType";
import { IContractsManager } from "../../../interfaces/setup/IContractsManater";
import { IDatasetsHelper } from "../../../interfaces/helper/module/IDatasetshelper";
import { IGenerator } from "../../../interfaces/setup/IGenerator";
import { IDatasetsAssertion } from "../../../interfaces/assertions/module/IDatasetsAssertion";
import { DatasetsHelper } from "../../../helpers/module/datasetsHelper";

/**
 * Represents a test kit for submitting dataset proof root successfully.
 * Extends from DatasetsTestBase.
 */
export class SubmitDatasetProofRootSuccessTestKit extends DatasetsTestBase {
    /**
     * Constructor for SubmitDatasetProofRootSuccessTestKit.
     * @param _assertion - The assertion instance.
     * @param _generator - The generator instance.
     * @param _contractsManager - The contracts manager instance.
     * @param _datasetHelper - The datasets helper instance.
     */
    constructor(_assertion: IDatasetsAssertion, _generator: IGenerator, _contractsManager: IContractsManager, _datasetHelper?: IDatasetsHelper) {
        super(_assertion, _generator, _contractsManager, _datasetHelper)
    }

    /**
     * Optional setup before the action execution.
     * @returns Promise resolving to a number.
     */
    async optionalBefore(): Promise<number> {
        try {
            return await this.datasetsHelper.metadataApprovedDatasetWorkflow()
        } catch (error) {
            throw error
        }
    }

    /**
     * Action function to submit dataset proof root.
     * @param datasetId - The ID of the dataset.
     * @returns Promise resolving to a number.
     */
    async action(datasetId: number): Promise<number> {
        try {
            let dataType = DataType.MappingFiles

            // Generate proof for mapping files
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

            // Generate proof for source
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

/**
 * Represents a test kit for submitting dataset proof successfully.
 * Extends from DatasetsTestBase.
 */
export class SubmitDatasetProofSuccessTestKit extends DatasetsTestBase {
    private dependentTestKit: SubmitDatasetProofRootSuccessTestKit

    /**
     * Constructor for SubmitDatasetProofSuccessTestKit.
     * @param _assertion - The assertion instance.
     * @param _generator - The generator instance.
     * @param _contractsManager - The contracts manager instance.
     * @param _datasetHelper - The datasets helper instance.
     */
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

    /**
     * Optional setup before the action execution.
     * @returns Promise resolving to a number.
     */
    async optionalBefore(): Promise<number> {
        try {
            let datasetId = await this.dependentTestKit.run()
            return datasetId
        } catch (error) {
            throw error
        }
    }

    /**
     * Action function to submit dataset proof.
     * @param datasetId - The ID of the dataset.
     * @returns Promise resolving to a number.
     */
    async action(datasetId: number): Promise<number> {
        try {
            let dataType = DataType.MappingFiles
            let rootHash = this.generator.getProofRoot(datasetId, dataType)
            let [leafHashes, leafSizes] = this.generator.getDatasetProof(rootHash!, dataType)

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
            let [sourceLeafHashes, sourceLeafSizes] = this.generator.getDatasetProof(sourceRootHash!, dataType)

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
