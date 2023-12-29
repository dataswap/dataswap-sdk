/*******************************************************************************
 *   (c) 2023 dataswap
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/

import { Wallet } from "ethers"
import * as utils from "../../shared/utils"
import { ethers } from "ethers"
import { DatasetMetadata } from "../../../src/module/dataset/metadata/types/index"
import { IGenerator } from "../../interfaces/setup/IGenerator"
import { DatasetRequirements } from "../../../src/shared/types/datasetType"
import { DataType } from "../../../src/shared/types/dataType"
import { BidSelectionRule } from "../../../src/module/matching/metadata/types"
import { MatchingMetadata } from "../../../src/module/matching/metadata/types"

/**
 * Generates requirement actors based on count and element count for each actor.
 * @param count - The count of actors.
 * @param elementCountInActor - The element count for each actor.
 * @returns A two-dimensional array containing actors.
 */
function generateRequirementActors(
    count: number,
    elementCountInActor: number
): string[][] {
    let actors: string[][] = []
    for (let i = 0; i < count; i++) {
        let requirement: string[] = []
        for (let j = 0; j < elementCountInActor; j++) {
            let wallet = ethers.Wallet.createRandom()
            requirement.push(wallet.address)
        }
        actors.push(requirement)
    }
    return actors
}

/**
 * Generates an array with the specified count of elements.
 * @param count - The count of elements in the array.
 * @returns An array of numbers.
 */
function generateArray(count: number): number[] {
    let ret: number[] = []
    for (let i = 0; i < count; i++) {
        let rand = utils.getRandomInt(i * 1000, (i + 1) * 1000 - 1)
        ret.push(rand)
    }
    return ret
}

/**
 * Generates a two-dimensional array based on count and element count in each array.
 * @param count - The count of arrays.
 * @param elementCountInActor - The element count in each array.
 * @returns A two-dimensional array of numbers.
 */
function generateTwoDimensionalArray(
    count: number,
    elementCountInActor: number
): number[][] {
    let ret: number[][] = []
    for (let i = 0; i < count; i++) {
        let requirement: number[] = []
        for (let j = 0; j < elementCountInActor; j++) {
            let rand = utils.getRandomInt(j * 1000000, (j + 1) * 1000000 - 1)
            requirement.push(rand)
        }
        ret.push(requirement)
    }
    return ret
}

const mapingFiles = {
    root: "0xcee5fbb1d273cc6fec5593492c822f5b7bc69fc57bebf163644da4a79086ff40",
    leafHashes: [
        "0x03b2ed13af20471b3eea52c329c29bba17568ecf0190f50c9e675cf5a453b815",
    ],
    leafSizes: [20317],
}

const sourcesFiles = {
    root: "0x7ea8b1c4a9f6045bdff6ab808a9e38b4a6f267744f2a263dd67978ab0589fb32",
    leafHashes: [
        "0x189ddc51f6d7f675f307fbb9b692356d7c1b31acb024f6ca0154820be651922d",
        "0x2ac20905deb46956b763eadc1c8239e049081295a0909c205a7ec2212e5c003e",
        "0x2df84bab87867064b8b549e182eaae7852bd550a4b14c242ca158341960e6336",
        "0x33829806cc1c16376d8d473ecb5951d094593848d3c6e1d77a361f7dd0cb3e0f",
        "0x362fd53af46821236ef2f829eedfef72cbe5853f41abd61282e0f2eb4fbf9827",
        "0x43f40b38e787f531aa124c6b903eef5dec68953fa59c3a97657ad003f4b6cb3f",
        "0x4a239ae579441d153690d207c4e26d1cba3117daa9015e2afeb0ba0d88b34f3f",
        "0x4a831df0821c9681920a790ce6ad684848d7be458967904d3196cc0382b9d215",
        "0x65a1e86a7d5455a8acd5f2733a3b1ff76b3201e944e13d5258b550374e525e3a",
        "0x6dcc0b4e0f562cdc37173b1d41a29e31156eae8daaa0d027af9ca2c2ecb89b12",
        "0x858cb82287821110c9a0635542dc3787486521ffd46941d51015fd1342182c1b",
        "0x96f1b709bbab9baed0206c60a16af3305ca21ce5b07d7f4d8acce315bf3c002c",
        "0x9a8bbcdae9b5bc502496398a928501984ea7b1534c0633099affe294de241414",
        "0x9efa364658970f5377be7e3cfc930dbd91a773dc2857272f5897f1be9c1fed2f",
        "0xa6c50fa1ae9632eb18db13c167642920eb0eefd0e42f7b89bf188bd03c438e02",
        "0xb1568ace6cdc2e79f9ca25d4ef561d70f610d82e6c09c491f1c96be99f399f29",
        "0xce0d7c688026b201dd44f80ef59b29d7859e76c17a20b53d9efca5c380260e09",
        "0xd6f6d2d73da478bc3e48dad633e383d6c1ebd0eec44ce36829cc85cb5afe9435",
        "0xdaa2c0d85c8e88c268005c9b240ed58e99ceb0a97e9da19fc7dd7330ce86911a",
        "0xdf70dd01307c21d9dc726c964461eb3b9d2c140e78316e06aefc858bfd8b6a13",
        "0xe3ecc04634d3de676322c6d46fa5d7387b58f9495d072671922136905a102910",
        "0xe42e622c2cce02196ad7ca31b5b4508705649b0ab350ffc55d02690eb8560216",
        "0xe698515ceb8ec364eaf1a062b353da0a207cf08285f520a65639ac9dc42be21e",
        "0xf156b51e099b12f73ed350bff3aecffd104e9a89ff855d408bd98f28dc963728",
        "0xffd36031fe2da834a1e7146895dc24bfef7f631a7f9de2da749b0acaf4ae5626",
    ],
    leafSizes: [
        4614578, 6123034, 6855856, 4614569, 4614578, 4614569, 3235713, 4633191,
        4614578, 4983893, 4614569, 4614569, 4614569, 4614569, 4614569, 4806396,
        4614569, 4614569, 4614569, 6243442, 4614569, 6290888, 7285150, 5782191,
        5150690,
    ],
}
const challengeProof = {
    randomSeed: 1232131,
    leaves: [
        "0xadacd58b8058f1c749ad8763f5b8e46d69ff5ae98fd6e32277c5de50f5fdff2b",
    ],
    siblings: [
        [
            "0xebb1f53d91b7771ddbe7bc775abd6f1bb89678ca1da127afa13cd79bd2de4311",
            "0xcbac7f6367fd225711f59c1d73c455ff63212e0e7d7d7dff43072163ade8ea1f",
            "0x4c71c57af3ac0a389cb5c9fbf8a8f15dab2fd9eee3a3e96ca9de7fd8dbe2ef08",
            "0x984e768c92376b322f03121987cd7f3d8aa6b941ac76d8bd8d6c293092ec353b",
            "0x7f4188eccc50bedd14f321c0501c7a2ea9ccd8c08598c9dd090182216b7aec3d",
            "0xe554bdd5c003e828565707f40947b5ca7dddeb588b825a9f405f736372899e02",
            "0xdc37d0f2cf19b37a4bd99c65083fa1b0a0606c5c4233e9496ab7fdac26fcb739",
            "0xa221157942d88ad43e73fbafc0954f06d26a17653a9e2ad6a0b447a5da1efc3d",
            "0x5135bc52c81343285e12e88dcc4aab75d31b0766655502dea952bd90c3db7910",
            "0x1ffeb97335c2615c5597381158807661e1eee827bd6c7f710074985bd5b6b436",
            "0x8b1fa317c21a26305f84530f93541fc02ba24236bc4a74be04b1f6186f394e3e",
            "0xbac8bd01d7ae2e77a73c254f85109514d0d017a8e01fbc5a3781e1815fcc8614",
            "0x198824b3074c603c78a31bb5a62c135a458d5ee67b1bfc8f1c52e6c27119c237",
            "0xbcec5ac0e7759282f9ad004b2612348f83cc1ceee9058f84a9458fcb370e9925",
            "0x6ac2cb87a29690722a5f82c8ec8e678efde37c313c4711326c38fdcb63bd7320",
            "0xef7e73cedaee47c1e72d1e33318bc389727ebb0bb6fff03a25ab3ed4682a4e29",
            "0x9c507a4a56d1df47f8196dc7244e9e8b7ad10e3534a65b50bd90c69ab25bb521",
            "0x7ea8b1c4a9f6045bdff6ab808a9e38b4a6f267744f2a263dd67978ab0589fb32",
        ],
    ],
    paths: [0x2e78d],
}

export class Generator implements IGenerator {
    private proofRootsMap: Map<number, Map<DataType, string>>
    private nonce = 300
    constructor() {
        this.proofRootsMap = new Map<number, Map<DataType, string>>()
    }

    /**
     * Generates dataset metadata.
     * @param accessMethod - (Optional) The access method for the dataset.
     * @returns The generated dataset metadata.
     */
    generateDatasetMetadata(accessMethod?: string): DatasetMetadata {
        let random: string = utils.generateRandomString(7)
        let ret = new DatasetMetadata({
            title: "title-" + random,
            industry: "industry-" + random,
            name: "dataset-" + random,
            description: "description-" + random,
            source: "aws://sdfa.com-" + random,
            accessMethod: "163.com-" + random,
            submitter: "",
            createdBlockNumber: 0,
            sizeInBytes: BigInt(5120000),
            isPublic: true,
            version: BigInt(1),
            datasetId: 0,
            status: "",
        })
        if (accessMethod) {
            ret.accessMethod = accessMethod
        }
        return ret
    }
    /**
     * Generates dataset requirements for creating replicas.
     * @param replicasCount - The number of replicas to be created.
     * @param elementCountInReplica - The number of elements in each replica.
     * @param duplicateElementIndex - (Optional) The index of the duplicate element.
     * @param duplicateCount - (Optional) The number of times the element should be duplicated.
     * @returns The generated dataset requirements.
     */
    generateDatasetRequirements(
        replicasCount: number,
        elementCountInReplica: number,
        duplicateElementIndex?: number,
        duplicateCount?: number
    ): DatasetRequirements {
        //TODO: Duplicate Data Generation Feature
        let requirements: DatasetRequirements = {
            dataPreparers: generateRequirementActors(
                replicasCount,
                elementCountInReplica
            ),
            storageProviders: generateRequirementActors(
                replicasCount,
                elementCountInReplica
            ),
            regionCodes: generateArray(replicasCount),
            countryCodes: generateArray(replicasCount),
            cityCodes: generateTwoDimensionalArray(
                replicasCount,
                elementCountInReplica
            ),
        } as DatasetRequirements
        requirements.dataPreparers[0][0] = process.env
            .DATASWAP_PROOFSUBMITTER as string
        requirements.storageProviders[0][0] = process.env
            .DATASWAP_BIDDER as string
        return requirements
    }

    /**
     * Generates fake leaves for a given count.
     * @param _count The count of fake leaves to generate.
     * @returns An array containing fake leaf hashes and sizes.
     */
    private _generateFakeLeaves(
        _count: number,
        dataType: DataType
    ): [leafHashs: string[], leafSizes: number[]] {
        let leafHashs: string[] = []
        let leafSizes: number[] = []
        for (let i = 0; i < _count; i++) {
            this.nonce++
            if (dataType === DataType.MappingFiles) {
                leafSizes[i] = this.nonce
            } else {
                leafSizes[i] = this.nonce * 10000
            }
            leafHashs[i] = utils.numberToBytes32(this.nonce)
        }
        return [leafHashs, leafSizes]
    }
    /**
     * Generates dataset proof with specified leaf count and data type.
     * @param leavesCount - The number of leaves in the dataset proof.
     * @param dataType - The data type for the dataset.
     * @param fakedata Whether the specified generate fake data (optional).
     * @returns The generated dataset proof containing root, leaf hashes, leaf sizes, and mapping files access method.
     */
    generateDatasetProof(
        leavesCount: number,
        dataType: DataType,
        fakedata?: boolean
    ): [
        root: string,
        leafHashes: string[],
        leafSizes: number[],
        mappingFilesAccessMethod: string,
    ] {
        const isFakeData = fakedata !== undefined ? fakedata : false

        if (isFakeData) {
            let root = utils.numberToBytes32(this.nonce)
            this.nonce++
            let [leafHashs, leafSizes] = this._generateFakeLeaves(
                leavesCount,
                dataType
            )
            let accessMethod = utils.generateRandomString(7)
            return [root, leafHashs, leafSizes, accessMethod]
        }

        if (dataType === DataType.Source) {
            return [
                sourcesFiles.root,
                sourcesFiles.leafHashes,
                sourcesFiles.leafSizes,
                "",
            ]
        }

        let accessMethod: string =
            "mappingfilesAccessMethod:" + utils.generateRandomString(7)
        return [
            mapingFiles.root,
            mapingFiles.leafHashes,
            mapingFiles.leafSizes,
            accessMethod,
        ]
    }

    /**
     * Retrieves dataset proof based on the root.
     * @param root - The root identifier of the dataset proof.
     * @param dataType - The data type for the dataset.
     * @param fakedata Whether the specified generate fake data (optional).
     * @returns The dataset proof containing leaf hashes and leaf sizes.
     */
    getDatasetProof(
        root: string,
        dataType: DataType,
        fakedata?: boolean
    ): [leafHashes: string[], leafSizes: number[]] {
        const isFakeData = fakedata !== undefined ? fakedata : false
        if (isFakeData) {
            return this._generateFakeLeaves(10, dataType)
        }

        if (
            "0x7ea8b1c4a9f6045bdff6ab808a9e38b4a6f267744f2a263dd67978ab0589fb32" ===
            root
        ) {
            return [sourcesFiles.leafHashes, sourcesFiles.leafSizes]
        }

        return [mapingFiles.leafHashes, mapingFiles.leafSizes]
    }
    /**
     * Generates dataset challenge proof based on the root.
     * @param root - The root identifier of the dataset proof.
     * @returns The dataset challenge proof containing random seed, leaves, siblings, and paths.
     */
    generateDatasetChallengeProof(
        root: string
    ): [
        randomSeed: number,
        leaves: string[],
        siblings: string[][],
        paths: number[],
    ] {
        //TODO :Need to automatically generate verifiable challenge proofs.
        return [
            challengeProof.randomSeed,
            challengeProof.leaves,
            challengeProof.siblings,
            challengeProof.paths,
        ]
    }

    /**
     * Asynchronously generates an address for a generator.
     * @returns The generated address.
     */
    async generatorAddress(): Promise<string> {
        return await Wallet.createRandom(++this.nonce).getAddress()
    }

    /**
     * Asynchronously generates an Ethereum account for a generator.
     * @returns The generated Ethereum account consisting of address and private key.
     */
    async generatorEthAccount(): Promise<[string, string]> {
        let wallet = Wallet.createRandom(++this.nonce)
        return [await wallet.getAddress(), wallet.privateKey]
    }

    /**
     * Retrieves matching information for a dataset at a given index.
     * @param datasetId - The ID of the dataset.
     * @param index - The index of the dataset.
     * @returns Information about bid selection rule, bidding delay, storage completion, threshold, and additional info.
     */
    generatorMatchingInfo(datasetId: number, index: number): MatchingMetadata {
        return new MatchingMetadata({
            bidSelectionRule: BidSelectionRule.HighestBid,
            biddingDelayBlockCount: 30,
            biddingPeriodBlockCount: 20,
            storageCompletionPeriodBlocks: 100000,
            biddingThreshold: BigInt(1000000000),
            createdBlockNumber: 0,
            additionalInfo: "none",
            initiator: "",
            pausedBlockCount: 0,
            matchingId: 0,
        })
    }

    /**
     * Retrieves the proof root for a specific dataset ID and data type.
     * @param id - The ID of the dataset.
     * @param dataType - The data type for the proof.
     * @returns The proof root if found, otherwise undefined.
     */
    getProofRoot(id: number, dataType: DataType): string | undefined {
        const rootsMap = this.proofRootsMap.get(id)
        if (rootsMap) {
            return rootsMap.get(dataType)
        }
        return undefined
    }
    /**
     * Sets the proof root for a specific  dataset ID and data type.
     * @param id - The ID of the dataset.
     * @param dataType - The data type for the proof.
     * @param root - The root identifier for the proof.
     */
    setProofRoot(id: number, dataType: DataType, root: string): void {
        let rootsMap = this.proofRootsMap.get(id)
        if (!rootsMap) {
            rootsMap = new Map<DataType, string>()
        }
        rootsMap.set(dataType, root)
        this.proofRootsMap.set(id, rootsMap)
    }
}
