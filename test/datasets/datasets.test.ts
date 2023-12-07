import { expect } from "chai"
import { describe } from "mocha"
import * as utils from "../utils/utils"
import { DatasetsHelper } from "./datasetshelper"
import { Accounts } from "../utils/accounts"

describe("datasetsMetadata", () => {
    it("submitDatasetMetadataCorrect", async function () {
        let datasets = DatasetsHelper.Instance()
        let random: string = utils.generateRandomString(7);
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
        let datasetId = await datasets.submitDatasetMetadata(
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

        let metaData = await datasets.getDatasetMetadata(datasetId)
        expect(title).to.be.equal(metaData.title)
        expect(industry).to.be.equal(metaData.industry)
        expect(name).to.be.equal(metaData.name)
        expect(description).to.be.equal(metaData.description)
        expect(source).to.be.equal(metaData.source)
        expect(accessMethod).to.be.equal(metaData.accessMethod)
        expect(sizeInBytes).to.be.equal(metaData.sizeInBytes)
        expect(isPublic).to.be.equal(metaData.isPublic)
        expect(version).to.be.equal(metaData.version)

        let [client,] = Accounts.Instance().getClient()
        let submitter = await datasets.getDatasetMetadataSubmitter(datasetId)
        expect(submitter).to.be.equal(client)
    })

})
