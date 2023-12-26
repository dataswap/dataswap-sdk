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


import { SubmitMetadataSuccessTestKit, ApproveDatasetMetadataSuccessTestKit } from "../../testkits/module/datasets/DatasetsMetadataTestKit"
import { SubmitRequirementSuccessTestKit } from "../../testkits/module/datasets/DatasetsRequirementTestKit"
import { SubmitDatasetProofRootSuccessTestKit, SubmitDatasetProofSuccessTestKit } from "../../testkits/module/datasets/DatasetsProofTestKit"
import { getContractsManager, getGenerator, getDatasetsHelper } from "../../fixtures"
import { DatasetState } from "../../../src/shared/types/datasetType"
import { DatasetsAssertion } from "../../assertions/module/datasetsAssertion"

describe("datasets", async () => {
    before(function () {
        this.sharedData = {}
        this.sharedData.datasetId = 0
        this.sharedData.generator = getGenerator()
        this.sharedData.contractsManager = getContractsManager()
        this.sharedData.datasetHelper = getDatasetsHelper()
        this.sharedData.datasetsAssertion = new DatasetsAssertion(
            this.sharedData.contractsManager
        )
    })

    it("SubmitDatasetsMetadataSuccess", async function () {
        let testKit = new SubmitMetadataSuccessTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            this.sharedData.datasetsHelper!
        )
        let datasetId = await testKit.run()
        this.sharedData.datasetId = datasetId
    })

    it("SubmitRequirementSuccess", async function () {
        try {
            let datasetId = this.sharedData.datasetId!
            let testKit = new SubmitRequirementSuccessTestKit(
                this.sharedData.datasetsAssertion!,
                this.sharedData.generator!,
                this.sharedData.contractsManager!,
                this.sharedData.datasetsHelper!
            )
            datasetId = await testKit.run()
            this.sharedData.datasetId = datasetId
        } catch (error) {
            throw error
        }
    })

    it("ApproveDatasetMetadataSuccessTestSuite", async function () {
        let testKit = new ApproveDatasetMetadataSuccessTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            this.sharedData.datasetsHelper!
        )
        let datasetId = this.sharedData.datasetId
        datasetId = await testKit.run(datasetId)
        this.sharedData.datasetId = datasetId
        this.sharedData.datasetHelper.updateWorkflowTargetState(datasetId, DatasetState.MetadataApproved)
    })

    it("SubmitDatasetProofRootSuccess", async function () {
        let testKit = new SubmitDatasetProofRootSuccessTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getDatasetsHelper(),
        )
        let datasetId = this.sharedData.datasetId

        datasetId = await testKit.run(datasetId)
        this.sharedData.datasetId = datasetId
    })

    it("SubmitDatasetProofSuccess", async function () {
        let testKit = new SubmitDatasetProofSuccessTestKit(
            this.sharedData.datasetsAssertion!,
            this.sharedData.generator!,
            this.sharedData.contractsManager!,
            getDatasetsHelper(),
        )

        let datasetId = this.sharedData.datasetId
        datasetId = await testKit.run(datasetId)
        this.sharedData.datasetId = datasetId
    })
})
