import { SubmitMetadataSuccessTestKit, ApproveDatasetMetadataSuccessTestKit } from "../../testkits/module/datasets/DatasetsMetadataTestKit"
import { SubmitRequirementSuccessTestKit } from "../../testkits/module/datasets/DatasetsRequirementTestKit"
import { SubmitDatasetProofRootSuccessTestKit, SubmitDatasetProoSuccessTestKit } from "../../testkits/module/datasets/DatasetsProofTestKit"
import { DataType } from "../../../src/shared/types/dataType"
import { getContractsManager, getGenerator, getDatasetsHelper } from "../../fixtures"
import { DatasetState } from "../../../src/shared/types/datasetType"
import { DatasetsAssertion } from "../../assertions/module/datasetsAssertion"
import * as utils from "../../shared/utils"

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
        let testKit = new SubmitDatasetProoSuccessTestKit(
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
