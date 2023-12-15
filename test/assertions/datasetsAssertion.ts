import { expect } from "chai"

import { DatasetsHelper } from "../helpers/datasetsHelper"
import { DatasetMetadata } from "../../src/dataset/metadata/types/index"

export class DatasetsAssertion {
    private datasetsHelper: DatasetsHelper

    constructor(datasetsHelper: DatasetsHelper) {
        this.datasetsHelper = datasetsHelper
    }

    async getDatasetMetadataAssertion(data: DatasetMetadata) {
        let metaData = await this.datasetsHelper.getDatasetMetadata()
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
        let submitter = await this.datasetsHelper.getDatasetMetadataSubmitter()
        expect(submitter).to.be.equal(client)
    }

    async hasDatasetMetadataAssertion(accessMethod: string) {
        let has = await this.datasetsHelper.hasDatasetMetadata(accessMethod)
        expect(true).to.be.equal(has)
    }

    async getDatasetStateAssertion(stat: number) {
        let state = await this.datasetsHelper.getDatasetState()
        expect(stat).to.be.equal(state)
    }

    async governanceAddressAssertion(governance: string) {
        let expectGovernance = await this.datasetsHelper.governanceAddress()
        expect(governance).to.be.equal(expectGovernance)
    }
}