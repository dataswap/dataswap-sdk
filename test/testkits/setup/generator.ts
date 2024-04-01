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
import { DatasetRequirements } from "../../../src/module/dataset/requirement/types"
import { DataType } from "../../../src/shared/types/dataType"
import { BidSelectionRule } from "../../../src/module/matching/metadata/types"
import { MatchingMetadata } from "../../../src/module/matching/metadata/types"
import { DatasetState } from "../../../src/shared/types/datasetType"

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
function generateArray(count: number): bigint[] {
    let ret: bigint[] = []
    for (let i = 0; i < count; i++) {
        let rand = BigInt(utils.getRandomInt(i * 1000, (i + 1) * 1000 - 1))
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
): bigint[][] {
    let ret: bigint[][] = []
    for (let i = 0; i < count; i++) {
        let requirement: bigint[] = []
        for (let j = 0; j < elementCountInActor; j++) {
            const rand = BigInt(
                utils.getRandomInt(j * 1000000, (j + 1) * 1000000 - 1)
            )
            requirement.push(rand)
        }
        ret.push(requirement)
    }
    return ret
}

const mapingFiles = {
    root: "0x757c91c3e08e1fdb277880aa37e49203d4eba235c8712cdb8eb301ca8d37c224",
    leafHashes: [
        "0x49c1823ea2782220b5d73007b710d3c7c8dbf98dd9a4575e0396a59c2946ad1c",
        "0x5ece7a766231e9492cf9d24f2d6f450c0f21cb9a76e72b474dc7ff020954792b",
    ],
    leafSizes: [17738863, 15842149],
}

const sourcesFiles = {
    root: "0xc60968e53c3a31755e3ab7d9653842a0221484369de4b49ec964b703d8c1b90d",
    leafHashes: [
        "0x6271e0c135067a3ff0cb918a86ccfecb4ae921181b50f6a9199eee3f122b1124",
        "0xae84c1b0caa2608d2b4abfbe698a5535c8131ebe4a8cabae80534dfdd37e4738",
    ],
    leafSizes: [16107711314, 22550796033],
}
const challengeProof = {
    randomSeed: BigInt(7777778),
    leaves: [
        "0x1d97626ccb27bff0eb968eb64aef009cc925d0c336fd048202ec2f53b1818816",
        "0xe869ac719f39c70ab372087949af204e38705cbfd3b6b429a6f88c2d7feda43a",
        "0xfd4291d108d2e573394a7e5bf7a4e8aa7f7b7def73dbb0c683a7bb393e02be3f",
        "0x72ff5f5e05e0cf0d3922c200cda28fd44d78cdc5abeac45573ee7b577d9eda1b",
        "0xcfd15b73339e1b75534225c827b17a351dafdf8954a4cd9926da2ce397986b08",
    ],
    siblings: [
        [
            "0x783db4958613386987c353e44fecf45bbce6f1f508bc57ddbad0850588cced20",
            "0x843e639712eb9f75b3af0886a4bdf89b5f70b42db91615e4ba7bd8fa31bb9021",
            "0x1bd02661ed5e1560c12b2c9af748e72eabe400e4974d920d8c3b3fdb812bab18",
            "0x49cef2e1482c6efcf4f3e8d850ea36755a86595b9e6544441f47637ba6f80416",
            "0x21c07c3dee6b0d3bb2df2ea337f3f8ddbf027b0f460cf6ff451e3575eb47d112",
            "0xb9cdb4023abc15c52e65ec73b9fd8a9f3283bc13c26932f7bc20e9dd0b9ea60d",
            "0x33f843cb625cd8e1f0f8347553b77f0f6bf2a0ee6887cde83b9159eaa1d9c81a",
            "0xaf9c74161103ce5cb721742daa5afb286b1c6bcfb701a43570c7573326b55d14",
            "0xb2c87e46df1b14a745c0d84e5cca8c00d579c1c6d329d5551ad561c992c22935",
            "0x53c2235afe9f1ce7e33ea9242fa86ff30411ad921b7363d11d1f1880a54ce93c",
            "0xc2b0301297b8d4bf521903f609f4655e592c705537fe304a78cdf0b1b68ff324",
            "0x84052a5a6ce12f2b57c01ef75898b54dd048b54a55dca4241437ef232fe82630",
            "0xaf733a1ab18b9550c893ded3ec00a266fa3d39d2d3f6da3368442377a69efd2c",
            "0x81b71374f2c412d13aea67d057b6696729d064090d48bc2da72ff05a871f2c05",
            "0xa8de4d2a54bda520711099943c859299cc6f8ae6f94870d483f56bf92d090917",
            "0x9b1c5c4ce254e022bf34d7830d1a2a09371cfc920e8a053f65fb91cbb132b708",
            "0x398a83dafea56dbcd028c3c8692832762ccf47569775c87ea9a5709f38a7ff1e",
            "0x8e27c3e247f13442a4b244d314edd423e31dba739abdf50adc9ab44adfe86f31",
            "0xf996eb11e18dbe607c3f7c1998fe14139488ff86ce8d0c269002d429529ebf11",
            "0xbacd10496df88641fa33603daf376f9e3252e72f217b781997c8c13626ef113c",
            "0x47e05dc3d5de1f95a5ae62ea9980ea96a3c60af61f5e19052a74340c5efc6106",
            "0x469496ee76672ae897a66d1d2c06b209c354a4e439077e237506029607887033",
            "0x17c6bc7452adc3ba37e232ada9897e72cc651112cc2eb7d610c7d0b027af8805",
            "0x48c9dee38685ef92bb8df5903085529d4f06d610ef2fea0c8f7a5df550337d13",
            "0x7cc90fbdd264958a83d8e909219e23dcb7fbd8abd497a031ae305b1dac11940f",
            "0x48fd60b61ff75d5b3a7ea36602fe3f3e41a9efd61d1b6cd24ef3d08fd8183927",
            "0x858474fea7264facd8a96d04b4f9d6846872cc5596652981587e9bee224d7c24",
            "0x0457c9b369ae5445eb42bbd096e8b1c50177b22fc2f9f06f3887b5c505bc1631",
            "0x8185d90f0d86eac16a866f52c1f0dac5ffaa68d13b577a299c303e4faa9e483d",
        ],
        [
            "0xca1260ca67717cad469af8f0e854e008a5a643685ab16079aa3b290e343ed211",
            "0x89266b62e43012faf1be7b36921935c7bb4731b26caf28fe9a389cf5520bd119",
            "0x3fb5faa3286a5f0726e7d1bd4ad0e2ffec3ad499205066fc3df1511d9fa41406",
            "0x584c8437aaeb4d7d66789a1646138b939be687fc3f53b954d2b44e71d6c47036",
            "0x4cdbbe70c266fad5c5092ed01daf3bab0da7f83ea1019449fb56bcf3b69d5e04",
            "0x7c6d04142698588cdb6e2beba3c37413885f8fdaffded4b50d0abe6616c1fc10",
            "0x69e76738c8346ae37e212941f58b46740c5fbf02ea445e1970dcdd53dbe1f729",
            "0xf1dfc4fa1315758743ee2eddedb9389411ce07d6d323b2092f6faf69a3bb2829",
            "0xc48b32ff014d092b5e78b9af407103c5cc036a075718183d35547df6a8c18430",
            "0xa8bab718f692876a918e0d67228681967fac036f3863f028b16ad9b2f30a490d",
            "0xc5610f66f6dc4d8a750409720ae507ad7bf3b387e023c843732145a3bc527b36",
            "0x7b544fabae0e41f518f68802b05252e2feaca7627b2d08ee18bb6abed04bb339",
            "0xe9445ffc8448408f41b801891553cf69cdd7403ddefa21453ae8ab7a1df59d0b",
            "0xa6257228265ee1a45c00cf1a502e1ecbfd46c72ff8b9bb107d89649e8f23e907",
            "0xd5fffc07d795ad602a8f880553e3ac1556be3eccad82025f0493fa1eafca9e23",
            "0x7267217d0db93a40dd66c1f0ae5b8e6a2723139b1a134ae5cdad91a5f380ef11",
            "0xe0e9b67444f60492291d27f7f62287d274f539c16f6f67d23960bff188e97424",
            "0x4f084e1f2547de5769d5fcbde95666da42de7785eb1fd1433abfea63bb635213",
            "0x61c31b2b1a65d5f2b1faedbb553a97b3017056138e8dcccf8881a8619e6fb604",
            "0x1500e5ede5a0463e390081f5b1cb2f4781b9574e74cd596e510f7c3b777d010b",
            "0x728a1c78b1c736870235fa916320c1c2cef453b032b98d781f762ce9b8f4b51d",
            "0xccc38461903848573d647ca247e87799ae624a688d74106c837fad8792dd4705",
            "0x14aa8a2738e52df25c198547be69524ca8c81508e38467f643f6103edee5252b",
            "0xffdc0cb9a260731516ce350fe348b946b7aff7f6b86cd18d19bfa8a69ffe8739",
            "0x796eb40bc9efb811ec5da9e5480cceb689ed20e9dde1688789772b5c85490008",
            "0x66df47d920b751ab82dcfb469be950b77a10a0966817355a1936b47413353429",
            "0xbe49fe37dfba880674287121cbb8f4f89960cde3ef3dce4a8764f4c55580260d",
            "0x4d8ed972ff591d1bf1cf96100915159bddea2b405b7df768380dac4c56c39f1c",
            "0x8185d90f0d86eac16a866f52c1f0dac5ffaa68d13b577a299c303e4faa9e483d",
        ],
        [
            "0x94023fd301d5cc792b1161b8cda40eece40f86675707f6aa2285ea24a00fd424",
            "0xbea03b1424c5e9356f7547d96a2e4ac42a4d7cb8df521f07305b2269a8799831",
            "0xac3df9a086fbfe567a9f28f3c5eb388dc59fa4c8f9c7efc6ab3c9cab3d4c6104",
            "0xee01fe16327573c6c6f30349fec26e7b2663f9b99331d5994fbd99c4dc1b813d",
            "0x536289f5b5fd077fdefe2497d960f5e8d7d876e98fdcaa4d16029db5c6988318",
            "0xd6d7e921fea5847e7ea19aa37f57d411a7b5137c3fce03881d22307bceb9f80e",
            "0x40c206c3f21bb6ea1f96f993b88bb1b2a396c0b3bd5fe9ea2804573335e7da00",
            "0xd113561d14c34b9cab924733c20af9a6bfefd331ab6399414725a93754e46320",
            "0xdd2f56716d168da56a33d8eed4259464c0a51c8dcb1d9f1fe820285d3e79e011",
            "0x6ab40a9d5711a089f6a3cac6432c8f8e125609e992393eed2fc5c86a80719b1c",
            "0xc035870c4b65a129367ad70a3e453cd2d06630768308166ad7d06c7d6e49fb26",
            "0x355e8e66166d20944f3748af37ff54dfff68bab34cc6866bcaafac90515def00",
            "0x495dc32262fae8a45b524b5d6fd9aa2a3dfcb79790ef34bf0e1f9957a86eb839",
            "0x7c4fb6aeecc04f9a1992ec547cba38c8967375be19d111757f7dc25b72c0313b",
            "0xebbaeb3523be0cf3109be9099444f54462feaf1f492fad760286f03ec7fd323d",
            "0x8d716c0d8f4c60e7cd7aeb87c6ce2462810dd7f0a921762296ab8dccee4e760e",
            "0x83a60d4072f57a0a0ac6fe9733fd9b2a015cf3686fb60fdc9943d34383ea7d28",
            "0x926088363d562767c1b3c8e9c8d0621a71c14112346e4b477432e3e30d0e4f21",
            "0x7e617cdc899af0f3010a8c477d53c2c277054f8f8721fd0c75a76c3caa7ff721",
            "0xa8165ec729a41a46c3bc289b61b71f1b63b245cd175bfd5fbabbe00fdd74aa26",
            "0xa2e25760359976b04655e4fd278a46c6a24a37f1964851a7749bb4d9a118a905",
            "0x075531eddc0cbf6d5efbcdafb6d04f6f22bdef9dc9739cc31414a6d4a15a8717",
            "0x9e14f7957f9f11c7218052af533588a09dcaddb35965dbd34f8d87af9d2d3625",
            "0x37c85272ac04ee4995276f62879ef87bbec042a84b8df40cefd1a758fe3d823a",
            "0xe63186cbc0ad0fa8fe1554620995274fd804ad711c6023bcc77475a8cb28c327",
            "0xe4ab790b992569a8cffb16843ef50ad461f4962efc62f3627123b82e3c41a614",
            "0x41e1c76257a808af2a06c91ce124c862dc5ad512533fdc838d9b2b46e4580f30",
            "0x0457c9b369ae5445eb42bbd096e8b1c50177b22fc2f9f06f3887b5c505bc1631",
            "0x8185d90f0d86eac16a866f52c1f0dac5ffaa68d13b577a299c303e4faa9e483d",
        ],
        [
            "0x82aecc026a0d3f064dcf30cf39724701a409a1c26a7f958056de9a77dc87ec3e",
            "0xb4e30e0e73c11f2967daa371af14f301ae0f1cee0efe45fc5e7a92f787b82c0d",
            "0x0b67b314acea9bb64f5be2e5a4f97810c15ccebde8cc317f78e66bf14d6e5112",
            "0x9aa5795c48ba9124803e5b5ce36db8690f573396b9dccec39510db3f9043162e",
            "0x9c209ea8b1874bc33532904034b4271889baba20699da964adde4223b6e3213a",
            "0xd251d7658ef2ff77cda1bcab72700c1dc73fb5cb47280990766d22531a4a3f3d",
            "0xed7d73a8d9b653cd4fcf6ab26af84a95d38b334352034b7151b2cb9c59765304",
            "0x9b53c777b9a8c76d249eb9855d0d0588b82f751f7e6008dd3565277619b0b833",
            "0xd1497bc4ea6a424443aeee2c0bcccaead6af9cfe0b1dee3e99a528309a00220c",
            "0x0d3529dd303fe5224aced57418f13cdee591f3883fe38f15227d563f7b92492d",
            "0xfd6368c844bacd14c81468dcf5cf1a2b1608f754b8fd732fd2b59e2284622c00",
            "0x02d259b1567d0171cb3c53971decf2c0c9cc3d3f728cd51241f1306eb57c6c05",
            "0xae62e8c281c53f2031152646036ecc1d66c6623ec3c442ccc6827725f79da422",
            "0x3b37d7e6abae9a5e1723343e55b5220aa85e5ba9d83519268814d67ae95b7e0a",
            "0xabdc5fe74867ebf020ab2c71e8699c25fbb835be0b9c3e6d7f37b475ca98fc03",
            "0x4bafded9e11634d4ccc22a23b36aee8b909a215ae63d6ed999a44ed397b7d53c",
            "0x43b2667cf122ffe8b87dd163600b1e8e849f4d0a473848f6763aa26492563833",
            "0xae5a7f7e5261660095429c7941ff566a6be5ded06a77b8e6bc7869ab3b0ce316",
            "0x0f6e003e5bb97d59ebf25d9e56f656a0b107c8bcae36cca79a695168435a372d",
            "0xa6dfcdd9b9a17823d62cedfc0c929e06c40298a610bdd981fdae988c18840912",
            "0xd3e1f7e141867a2fcf559eaf169622eb653d7cbaf62cdf25c1d5bedae860d214",
            "0xa7e36b3d9b60f984c5fbafd20b2751b25f03d69e45573ff35d6817176c68d40a",
            "0x31c5dd941b34a6e9bd832ee90d7c483192d6d2e0b3de850a54816f377e86ff11",
            "0xdd70642886cbb189aafaa98e37313d25f74e42b04d3623b423ac00f8f8ec2a02",
            "0x21976f720de1d348ef6e27fdab38808d3ebcc8c932b29fe92eca2f1fbcbb193b",
            "0x0f56ec8d54faefe2f57698d10f6d702adf77f4ee789b9af9e95fa9270b248c03",
            "0x7de6ad961f12b00827bb90fc9195daca988c27a2c2a1b930c927a52fd677e90b",
            "0x5e1675b72876bb8291f709cc4ced820e52e80e2ee17351e0f5b371a5dead463d",
            "0x5f361839e4c6d1176afd67dab6c4f260babcec5b930a40a5774f9190d0e3c223",
            "0xff8238e08d7743ea0966a7e5b0340071fee2eddbc3aeb9859e9e787c61177d3c",
        ],
        [
            "0x5eb3cb08f7b9ed3100ddf7bf9ae86a8190bc9ddf64825e132cc09af96180e336",
            "0x29bbed1777aabcdfa1d3542e7a98721e86ae45b2bee37d62617fcb772510253f",
            "0x6f951d727cf3b35e8f885f8d9a52f6a6c6ce0181ddf0d02317ad3392a97f8836",
            "0xcd43ef30242711121aff6f4387c7b0640fe3b4372bae8bfa5480a57f3ec5450b",
            "0xf5a9c1087e3dcd221423f7af42f762c1a4f5bb547fa86d8031850061e8888115",
            "0x6ffeb60a235c2b9fdb2dda8b1b199b98bb71a00a82d5deb73f0060d2fdda1003",
            "0x36f8ebe23536461f4467020a89f9c148e1a61267ce83b2702505a673b772f30f",
            "0x8f0a4784bcabab67eaa7b0dced7c6a58762e72547dd6a88cec9cb958a9673f2a",
            "0xd4ab763d0277679b1665657614e453035646e3a6d93de576c13fcc77643be118",
            "0x117c3d99807bd998eb2c90544658acf56ede3bdb0586b4afe9bd6694f811662c",
            "0x488ffc970d40c417ee2f8b979e9eba46ff0f20f956a2c287684e1dc2263eb620",
            "0x649f3545d906d9c7bfcc9ef7f19cf55988cdd6ae84223dd38bfa72252ebc9210",
            "0xa3d8efc01be01d2070ca05d095226dcde471965be790f0cf275620cdd0c76301",
            "0x853517427ad1aed7accd805402f273e775f293e7a7d2cb2ab3c3aea107632217",
            "0x1b94a454f348878374ce4355707cabb078f267dbd806e6a7584f8e6b7116b62f",
            "0xb5f58d0d44dc6bc4c9087be8749f0b0df4281f90ead9457d9b32b27f320d0115",
            "0xc4f29a0fd85f37ad2ef927b421683937a22075ecc585ade51e8e375efd21a339",
            "0x5ec81454ce49662205702ba27826cfe681d59a9c043a0a24c789e4d753991639",
            "0xa73bd463fd16444724ad9ed11e13982ad64c8f5e164aae1115df46d9df480a1f",
            "0xaf8179e9285a4e95c1e5c61fc26fd415e91fc66c1dda29158f44d2f6fa3d6304",
            "0x6b3cc53cf781319cd40335bdc5872ce128fc71583e485f1fc8d5e3c0f874fa30",
            "0x4e519235863d0abf856b09e451b7b9a68395c5bf52a80d835f91d49dece60122",
            "0xe48d48e2371144855c30749761a12f3f6dc95741de9d0819c800ad0a5eda262f",
            "0x301350d0b1947bfd0f8ff7477d0eac1a7b34d3d773287bbb332abf6b9cee4328",
            "0xc7416bb560b77eaa07416dbfd7fe7cad1d4f669ea7e6e9a2033586a14a8f3820",
            "0xb1e3adc0c704bdd416cea570440062feaad380e9a1ef51eaa126a39aefc16b32",
            "0x7de6ad961f12b00827bb90fc9195daca988c27a2c2a1b930c927a52fd677e90b",
            "0x5e1675b72876bb8291f709cc4ced820e52e80e2ee17351e0f5b371a5dead463d",
            "0x5f361839e4c6d1176afd67dab6c4f260babcec5b930a40a5774f9190d0e3c223",
            "0xff8238e08d7743ea0966a7e5b0340071fee2eddbc3aeb9859e9e787c61177d3c",
        ],
    ],
    paths: [
        BigInt(0x160edbbc),
        BigInt(0x19aca893),
        BigInt(0x11f253a7),
        BigInt(0x31abe5c2),
        BigInt(0x3366f364),
    ],
}

export class Generator implements IGenerator {
    private proofRootsMap: Map<number, Map<DataType, string>>
    private nonce = 100
    constructor() {
        this.proofRootsMap = new Map<number, Map<DataType, string>>()
    }

    /**
     * Generates dataset metadata.
     * @param accessMethod - (Optional) The access method for the dataset.
     * @returns The generated dataset metadata.
     */
    generateDatasetMetadata(accessMethod?: string): DatasetMetadata {
        const random: string = utils.generateRandomString(7)
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
            status: DatasetState.None,
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
            regions: generateArray(replicasCount),
            countrys: generateArray(replicasCount),
            citys: generateTwoDimensionalArray(
                replicasCount,
                elementCountInReplica
            ),
            amount: BigInt(0),
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
            const root = utils.numberToBytes32(this.nonce)
            this.nonce++
            const [leafHashs, leafSizes] = this._generateFakeLeaves(
                leavesCount,
                dataType
            )
            const accessMethod = utils.generateRandomString(7)
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

        const accessMethod: string =
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
            "0xc60968e53c3a31755e3ab7d9653842a0221484369de4b49ec964b703d8c1b90d" ===
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
        randomSeed: bigint,
        leaves: string[],
        siblings: string[][],
        paths: bigint[],
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
        const wallet = Wallet.createRandom(++this.nonce)
        return [await wallet.getAddress(), wallet.privateKey]
    }

    /**
     * Retrieves matching information for a dataset at a given index.
     * @param datasetId - The ID of the dataset.
     * @param index - The index of the dataset.
     * @returns Information about bid selection rule, bidding delay, storage completion, threshold, and additional info.
     */
    generatorMatchingInfo(datasetId: number, index: bigint): MatchingMetadata {
        return new MatchingMetadata({
            bidSelectionRule: BidSelectionRule.HighestBid,
            biddingDelayBlockCount: BigInt(30),
            biddingPeriodBlockCount: BigInt(20),
            storageCompletionPeriodBlocks: BigInt(100000),
            biddingThreshold: BigInt(1000000000),
            createdBlockNumber: BigInt(0),
            additionalInfo: "none",
            initiator: "",
            pausedBlockCount: BigInt(0),
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
