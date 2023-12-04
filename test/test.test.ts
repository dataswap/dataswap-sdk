import { DatasetMetadataEvm } from "../src/dataset/metadata/repo/evm"
import { describe } from "mocha"
import { expect } from "chai"
import DatasetsDeployment from "../deployments/localnet/Datasets.json"

describe("RankingHolder", () => {
    it("getDatasetMetadata", async () => {
        expect(55).to.equal(55)
        await console.log("meta title:")
    })
})

describe("datasetMetadata", () => {
    it("getDatasetMetadata", async () => {
        let metadata = new DatasetMetadataEvm(
            DatasetsDeployment.abi,
            DatasetsDeployment.address,
            "http://14.198.182.245:1234/rpc/v1"
        )
        let meta = await metadata.getDatasetMetadata(1)
        console.log("meta title:", meta.data)
    })
})
