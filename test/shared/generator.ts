import * as utils from "./utils"
import { DatasetMetadata } from "../../src/dataset/metadata/types/index"

export class Generator {

    generatorDatasetMetadata(): DatasetMetadata {
        let random: string = utils.generateRandomString(7)
        return new DatasetMetadata({
            title: "title-" + random,
            industry: "industry-" + random,
            name: "dataset-" + random,
            description: "description-" + random,
            source: "aws://sdfa.com-" + random,
            accessMethod: "dataswap.com/test-" + random,
            submitter: "",
            createdBlockNumber: 0,
            sizeInBytes: 5120000,
            isPublic: true,
            version: 1,
            datasetId: 0,
            status: "",
        })
    }
}