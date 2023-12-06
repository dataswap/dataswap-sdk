import { expect } from "chai"
import { describe } from "mocha"
import * as utils from "./utils"
import { DatasetMetadataEvm } from "../src/dataset/metadata/repo/evm"
import { DatasetMetadata } from "../src/dataset/metadata/types/index"
import DatasetsDeployment from "@dataswapcore/abi/v0.1/module/dataset/Datasets.json"

describe("datasetsMetadata", () => {
    async function getDatasetMetadata(datasetId: number): Promise<DatasetMetadata> {
        let metadataContract = utils.getContract('Datasets', DatasetsDeployment.abi, DatasetMetadataEvm)
        let meta = await metadataContract.getDatasetMetadata(datasetId)
        return meta.data as DatasetMetadata
    }

    async function getDatasetMetadataSubmitter(datasetId: number): Promise<string> {
        let metadataContract = utils.getContract('Datasets', DatasetsDeployment.abi, DatasetMetadataEvm)
        let submitter = await metadataContract.getDatasetMetadataSubmitter(datasetId)
        return submitter.data as string
    }

    async function submitDatasetMetadata(
        title: string,
        industry: string,
        name: string,
        description: string,
        source: string,
        accessMethod: string,
        sizeInBytes: number,
        isPublic: boolean,
        version: number
    ): Promise<number> {
        let metadataContract = utils.getContract('Datasets', DatasetsDeployment.abi, DatasetMetadataEvm)
        let metadataSubmitter = utils.getAccountAddress("PRIVATE_KEY_METADATASUBMITTER")
        let metadataSubmitterKey = utils.getAccountPrivateKey("PRIVATE_KEY_METADATASUBMITTER")
        let tx = await metadataContract.submitDatasetMetadata(
            title,
            industry,
            name,
            description,
            source,
            accessMethod,
            sizeInBytes,
            isPublic,
            version,
            {
                from: metadataSubmitter,
                privateKey: metadataSubmitterKey,
            }
        )
        await tx
        let datasetId = await metadataContract.datasetsCount()
        return Number(datasetId.data)
    }

    it("submitDatasetMetadata", async function () {
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
        let datasetId = await submitDatasetMetadata(
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

        let metaData = await getDatasetMetadata(datasetId)
        expect(title).to.be.equal(metaData.title)
        expect(industry).to.be.equal(metaData.industry)
        expect(name).to.be.equal(metaData.name)
        expect(description).to.be.equal(metaData.description)
        expect(source).to.be.equal(metaData.source)
        expect(accessMethod).to.be.equal(metaData.accessMethod)
        expect(sizeInBytes).to.be.equal(metaData.sizeInBytes)
        expect(isPublic).to.be.equal(metaData.isPublic)
        expect(version).to.be.equal(metaData.version)

        let metadataSubmitter = utils.getAccountAddress("PRIVATE_KEY_METADATASUBMITTER")

        let submitter = await getDatasetMetadataSubmitter(datasetId)
        expect(submitter).to.be.equal(metadataSubmitter)
    })

})
