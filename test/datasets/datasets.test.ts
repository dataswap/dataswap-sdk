import { expect } from "chai"
import { describe } from "mocha"
import * as utils from "../shared/utils"
import { DatasetsHelper } from "./datasetsHelper"
import { Accounts } from "../shared/accounts"
import { Requirements } from "../shared/requirements"

describe("datasetsMetadata", () => {
    it("submitDatasetMetadataCorrect", async function () {
        let datasets = DatasetsHelper.Instance()
        let [governance,] = Accounts.Instance().getGovernance()
        let expectGovernance = await datasets.governanceAddress()
        expect(governance).to.be.equal(expectGovernance)

        let random: string = utils.generateRandomString(7);
        const dataClientId = 100
        const title = "title-" + random;
        const industry = "industry-" + random;
        const name = "dataset-" + random;
        const description = "description-" + random;
        const source = "aws://sdfa.com-" + random;
        const accessMethod = "dataswap.com/test-" + random;
        const sizeInBytes = 5120000;
        const isPublic = true;
        const version = 1;

        this.timeout(100000)

        let tx = await datasets.submitDatasetMetadata(
            dataClientId,
            title,
            industry,
            name,
            description,
            source,
            accessMethod,
            sizeInBytes,
            isPublic,
            version
        )


        let metaData = await datasets.getDatasetMetadata()
        expect(title).to.be.equal(metaData.title)
        expect(industry).to.be.equal(metaData.industry)
        expect(name).to.be.equal(metaData.name)
        expect(description).to.be.equal(metaData.description)
        expect(source).to.be.equal(metaData.source)
        expect(accessMethod).to.be.equal(metaData.accessMethod)
        expect(sizeInBytes).to.be.equal(Number(metaData.sizeInBytes))
        expect(isPublic).to.be.equal(metaData.isPublic)
        expect(version).to.be.equal(Number(metaData.version))

        expect(true).to.be.equal(await datasets.hasDatasetMetadata(metaData.accessMethod))

        let [client,] = Accounts.Instance().getClient()
        let submitter = await datasets.getDatasetMetadataSubmitter()
        expect(submitter).to.be.equal(client)
        let state = await datasets.getDatasetState()
        expect(0).to.be.equal(state)
    })

    //it("submitDatasetReplicaRequirementsCorrect", async function () {
    //    let datasets = DatasetsHelper.Instance()
    //    await datasets.submitDatasetReplicaRequirements()

    //    let count = await datasets.getDatasetReplicasCount()
    //    console.log("replica count:", count)
    //    expect(count).to.be.equal(Requirements.Instance().getRequirementsCount())
    //})
})
