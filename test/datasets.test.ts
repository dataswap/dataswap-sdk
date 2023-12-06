import { describe } from "mocha"
import { expect } from "chai"
import * as utils from "./utils"
import { ethers } from 'ethers'
describe("datasetsMetadata", () => {
    it("submitDatasetMetadata", async function () {
        let metadataContract = utils.getDatasetsMetadataContract()
        let random: string = utils.generateRandomString(7);

        const expectTitle = "title-" + random;
        const expectIndustry = "industry-" + random;
        const expectName = "dataset-" + random;
        const expectDescription = "description-" + random;
        const expectSource = "aws://sdfa.com-" + random;
        const expectAccessMethod = "dataswap.com/test-" + random;
        const expectSizeInBytes = 5120000;
        const expectIsPublic = true;
        const expectVersion = 1;

        let metadataSubmitter = utils.getAccountAddress("PRIVATE_KEY_METADATASUBMITTER")
        let metadataSubmitterKey = utils.getAccountPrivateKey("PRIVATE_KEY_METADATASUBMITTER")

        this.timeout(100000)
        let tx = await metadataContract.submitDatasetMetadata(
            expectTitle,
            expectIndustry,
            expectName,
            expectDescription,
            expectSource,
            expectAccessMethod,
            expectSizeInBytes,
            expectIsPublic,
            expectVersion,
            {
                from: metadataSubmitter,
                privateKey: metadataSubmitterKey,
            }
        )

        console.log("submit metadata:", tx)

    })

    it("getDatasetMetadata", async () => {
        let metadataContract = utils.getDatasetsMetadataContract()
        let meta = await metadataContract.getDatasetMetadata(1)
        console.log("get metadata:", meta)
    })
})
