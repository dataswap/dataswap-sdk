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
import { SubmitDatasetProofRootTestKit, SubmitDatasetProofTestKit, SubmitDatasetProofCompletedTestKit } from "../../testkits/module/datasets/DatasetsProofTestKit"
import { getContractsManager, getGenerator } from "../../fixtures"
import { DatasetsAssertion } from "../../assertions/module/datasetsAssertion"
import { DatasetsHelper } from "../../helpers/module/datasetsHelper"

/**
 * Test suite for the DatasetsProof functionality.
 */
describe("datasetsProof", async () => {

    /**
     * Setup before running the test suite.
     */
    before(function () {
        this.sharedData = {}
        this.sharedData.generator = getGenerator()
        this.sharedData.contractsManager = getContractsManager()
        this.sharedData.datasetHelper = new DatasetsHelper(
            getGenerator(),
            getContractsManager()
        )
        this.sharedData.datasetsAssertion = new DatasetsAssertion(
            this.sharedData.contractsManager
        )
    })

    /**
     * Tests assert dependencies addressed of DatasetsProof.
     */
    it("assertDependenciesAdresses", async function () {
        await this.sharedData.datasetsAssertion.proofInitDependenciesAssertion(process.env.DATASWAP_GOVERNANCE as string, process.env.DatasetsChallengeAddress as string)
    })

    /**
     * Tests successful submission of dataset proof root.
     */
    it("submitDatasetProofRoot", async function () {
        let testKit = new SubmitDatasetProofRootTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            this.sharedData.datasetHelper,
        )
        let datasetId = await testKit.run()
        this.sharedData.datasetId = datasetId
    })

    /**
     * Tests successful submission of dataset proof.
     */
    it("submitDatasetProof", async function () {
        let testKit = new SubmitDatasetProofTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            this.sharedData.datasetHelper,
        )

        let datasetId = this.sharedData.datasetId
        datasetId = await testKit.run(datasetId)
        this.sharedData.datasetId = datasetId
    })

    /**
     * Tests submission of dataset proof completed.
     */
    it("submitDatasetProofCompleted", async function () {
        let testKit = new SubmitDatasetProofCompletedTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            this.sharedData.datasetHelper,
        )

        let datasetId = this.sharedData.datasetId
        await testKit.run(datasetId)
    })
})
