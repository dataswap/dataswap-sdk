import { expect } from "chai"

import { DatasetsHelperInstance } from "../helpers/datasetsHelper"
import { DatasetMetadata } from "../../src/module/dataset/metadata/types/index"

export class DatasetsAssertion {
    async getDatasetMetadataAssertion(data: DatasetMetadata) {
        let metaData = await DatasetsHelperInstance.getDatasetMetadata()
        expect(data.title).to.be.equal(metaData.title)
        expect(data.industry).to.be.equal(metaData.industry)
        expect(data.name).to.be.equal(metaData.name)
        expect(data.description).to.be.equal(metaData.description)
        expect(data.source).to.be.equal(metaData.source)
        expect(data.accessMethod).to.be.equal(metaData.accessMethod)
        expect(data.sizeInBytes).to.be.equal(Number(metaData.sizeInBytes))
        expect(data.isPublic).to.be.equal(metaData.isPublic)
        expect(data.version).to.be.equal(Number(metaData.version))
    }

    async getDatasetMetadataSubmitterAssertion(client: string) {
        let submitter = await DatasetsHelperInstance.getDatasetMetadataSubmitter()
        expect(submitter).to.be.equal(client)
    }

    async hasDatasetMetadataAssertion(accessMethod: string) {
        let has = await DatasetsHelperInstance.hasDatasetMetadata(accessMethod)
        expect(true).to.be.equal(has)
    }

    async getDatasetStateAssertion(stat: number) {
        let state = await DatasetsHelperInstance.getDatasetState()
        expect(stat).to.be.equal(state)
    }

    async governanceAddressAssertion(governance: string) {
        let expectGovernance = await DatasetsHelperInstance.governanceAddress()
        expect(governance).to.be.equal(expectGovernance)
    }
}