import { Wallet } from 'ethers';
import * as utils from "./utils"
import { DatasetMetadata } from "../../src/module/dataset/metadata/types/index"

export class Generator {
    private nonce = 0
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

    async generatorAddress(): Promise<string> {
        return await Wallet.createRandom(++this.nonce).getAddress()
    }

    async generatorEthAccount(): Promise<[string, string]> {
        let wallet = Wallet.createRandom(++this.nonce)
        return [await wallet.getAddress(), wallet.privateKey]
    }
}