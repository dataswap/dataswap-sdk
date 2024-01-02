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

import {
    SubmitMetadataTestKit,
    ApproveDatasetMetadataTestKit,
    RejectDatasetMetadataTestKit,
    RejectDatasetTestKit,
    ApproveDatasetTestKit,
} from "../../testkits/module/datasets/DatasetsMetadataTestKit"
import {
    getContractsManager,
    getGenerator,
    getDatasetsHelper,
} from "../../fixtures"
import { DatasetsAssertion } from "../../assertions/module/datasetsAssertion"
import { DatasetState } from "../../../src/shared/types/datasetType"
/**
 * Test suite for the Datasets functionality.
 */
describe("datasetsmetadata", async () => {
    /**
     * Setup before running the test suite.
     */
    before(function () {
        this.sharedData = {}
        this.sharedData.generator = getGenerator()
        this.sharedData.contractsManager = getContractsManager()
        this.sharedData.datasetHelper = getDatasetsHelper()
        this.sharedData.datasetsAssertion = new DatasetsAssertion(
            this.sharedData.contractsManager
        )
    })

    /**
     * Tests assert dependencies addressed of datasets.
     */
    it("assertDependenciesAdresses", async function () {
        await this.sharedData.datasetsAssertion.metadataInitDependenciesAssertion(
            process.env.DATASWAP_GOVERNANCE as string,
            process.env.DatasetsProofAddress as string
        )
    })

    /**
     * Tests successful submission of dataset metadata.
     */
    it("submitMetadata", async function () {
        const testKit = new SubmitMetadataTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            this.sharedData.datasetsHelper!
        )
        await testKit.run()
    })

    /**
     * Tests approve metadata of Datasets.
     */
    it("approveMetadata", async function () {
        const testKit = new ApproveDatasetMetadataTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getDatasetsHelper()
        )
        await testKit.run()
    })

    /**
     * Tests reject metadata of Datasets.
     */
    it("rejectDatasetMetadata", async function () {
        const testKit = new RejectDatasetMetadataTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!
        )
        await testKit.run()
    })

    /**
     * Tests reject dataset.
     */
    it("rejectDataset", async function () {
        const testKit = new RejectDatasetTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!
        )
        await testKit.run()
    })

    /**
     * Tests approve dataset.
     */
    it("approveDataset", async function () {
        const testKit = new ApproveDatasetTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getDatasetsHelper()
        )
        await testKit.run()
    })
})
