/*******************************************************************************
 *   (c) 2023 unipackage
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

import "mocha"
import { Context } from "mocha"
import { expect } from "chai"
import * as dotenv from "dotenv"
import assert from "assert"
import { SubmitRequirementsParams } from "../../../src/module/dataset/requirement/types"
import { ValueFields } from "@unipackage/utils"
import { getContractsManager } from "../../fixtures"
dotenv.config()
import { createExpectMessage, createTargetMessage } from "../../shared/utils"

/**
 * Test suite for the DatasetsRequirement contract message decoder functionality.
 */
describe("DatasetsRequirementMessageDecoder", () => {
    /**
     * Test suite for the DatasetsRequirement decoder functionality.
     */
    describe("#decoder", () => {
        /**
         * Test case for submitDatasetReplicaRequirements decode functionality.
         */
        it("should ok", async function (this: Context) {
            const expectDecodeResout = createExpectMessage(
                "submitDatasetReplicaRequirements",
                {
                    requirements: [
                        {
                            cityCodes: [
                                BigInt(202186),
                                BigInt(1302254),
                                BigInt(2236269),
                            ],
                            countryCode: BigInt(517),
                            dataPreparers: [
                                "0x3D08114dD4F65B5DDCc760884249D9d1AE435Dee",
                                "0xC2390a70E3D6C274c637fD6037967BF4663e07eE",
                                "0x253d87fD415cbE26f530CA401Ce8AA113C32f1f5",
                            ],
                            datasetId: 11,
                            index: 0,
                            regionCode: BigInt(585),
                            storageProviders: [
                                "0xca942f0fd39185d971d1d58E151645e596FC7Eff",
                                "0xd5AF749423FA0ab211240eF26f73d771a2Cb6778",
                                "0x598074BD62dD6e14E4dd15Fc908FB409deE77f64",
                            ],
                        },
                        {
                            cityCodes: [
                                BigInt(874493),
                                BigInt(1643077),
                                BigInt(2734308),
                            ],
                            countryCode: BigInt(1300),
                            dataPreparers: [
                                "0x979f3C21f409545249243d64e1518F3be60f4Eb7",
                                "0x4cDf59ddb23668165b7D109D3416Aa5FFE682B1a",
                                "0x192b12ff82304dA9E5D37B425755757d647a2b31",
                            ],
                            datasetId: 11,
                            index: 1,
                            regionCode: BigInt(1094),
                            storageProviders: [
                                "0x184Aca59cA6724D3ea7D347FCec3d3f6B71E996c",
                                "0x750b5F3524e5f96b949018fB58EEc36F49402004",
                                "0x22822605a14C44158B7354E0B4ABebd4722Fa312",
                            ],
                        },
                        {
                            cityCodes: [
                                BigInt(829857),
                                BigInt(1762976),
                                BigInt(2620313),
                            ],
                            countryCode: BigInt(2040),
                            dataPreparers: [
                                "0xDfCc32262CB62f1eedC5f3FC58dE2F3fAB89B73d",
                                "0x41442822716d34cB6ACb0978dE60806187c9175e",
                                "0x4681Ea9e8097d149cD12C048A942124D3BCE1dcF",
                            ],
                            datasetId: 11,
                            index: 2,
                            regionCode: BigInt(2763),
                            storageProviders: [
                                "0xaCd80C6A5839e4d80748916870A2f596ae052777",
                                "0x51e13328149150Fe4171623aeb69aDd5A62Cd05a",
                                "0xF1ef4dF1dC966331BFE4Bdd36bD351A55e61BeF1",
                            ],
                        },
                        {
                            cityCodes: [
                                BigInt(936103),
                                BigInt(1278556),
                                BigInt(2974395),
                            ],
                            countryCode: BigInt(3063),
                            dataPreparers: [
                                "0x7F19C6A84EE71Bc2F571b09A52Aad87e3452d535",
                                "0xB5D0bE97F9d6e5e6059fc8a5F19A914f46D023C9",
                                "0xB641A97f2F9da332EE74af96d2F701BA639608A2",
                            ],
                            datasetId: 11,
                            index: 3,
                            regionCode: BigInt(3474),
                            storageProviders: [
                                "0x0d86402Ee34ff4cEf2051B815267d408f46e4fbB",
                                "0xe71E0Bc1F84013Af66C6412ae2dbBaF13fEa72f3",
                                "0x3eE3b0E365635633B6E05735f55d922A197D1fa8",
                            ],
                        },
                        {
                            cityCodes: [
                                BigInt(904553),
                                BigInt(1701439),
                                BigInt(2437775),
                            ],
                            countryCode: BigInt(4687),
                            dataPreparers: [
                                "0xf705B61cbc14C979d25D5025CB7B76803dA15a5c",
                                "0x22f66354D765027340Df0C046a7f8f64d1370Af3",
                                "0xB8DF85865D0268c1C927EF0Eb7C3d54f034BBBE1",
                            ],
                            datasetId: 11,
                            index: 4,
                            regionCode: BigInt(4211),
                            storageProviders: [
                                "0xE22211411a799A2196f5D6E49Cc9930B5604F1d2",
                                "0x74db2A6D75705CE53E70ca0eEEed037e0818d174",
                                "0xcbE047c7D7214aD669fDe719f869f5816CDf4379",
                            ],
                        },
                    ],
                    datasetId: 11,
                    amount: BigInt(0),
                },
                "0x",
                11
            )
            const message = createTargetMessage(
                "WQwk+esAwQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAA9CBFN1PZbXdzHYIhCSdnRrkNd7gAAAAAAAAAAAAAAAMI5CnDj1sJ0xjf9YDeWe/RmPgfuAAAAAAAAAAAAAAAAJT2H/UFcvib1MMpAHOiqETwy8fUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAJefPCH0CVRSSSQ9ZOFRjzvmD063AAAAAAAAAAAAAAAATN9Z3bI2aBZbfRCdNBaqX/5oKxoAAAAAAAAAAAAAAAAZKxL/gjBNqeXTe0JXVXV9ZHorMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAA38wyJiy2Lx7txfP8WN4vP6uJtz0AAAAAAAAAAAAAAABBRCgicW00y2rLCXjeYIBhh8kXXgAAAAAAAAAAAAAAAEaB6p6Al9FJzRLASKlCEk07zh3PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAB/GcaoTucbwvVxsJpSqth+NFLVNQAAAAAAAAAAAAAAALXQvpf51uXmBZ/IpfGakU9G0CPJAAAAAAAAAAAAAAAAtkGpfy+dozLudK+W0vcBumOWCKIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAPcFthy8FMl50l1QJct7doA9oVpcAAAAAAAAAAAAAAAAIvZjVNdlAnNA3wwEan+PZNE3CvMAAAAAAAAAAAAAAAC434WGXQJowckn7w63w9VPA0u74QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAypQvD9ORhdlx0dWOFRZF5Zb8fv8AAAAAAAAAAAAAAADVr3SUI/oKshEkDvJvc9dxostneAAAAAAAAAAAAAAAAFmAdL1i3W4U5N0V/JCPtAne539kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAYSspZymck0+p9NH/Ow9P2tx6ZbAAAAAAAAAAAAAAAAHULXzUk5flrlJAY+1juw29JQCAEAAAAAAAAAAAAAAAAIoImBaFMRBWLc1TgtKvr1HIvoxIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAKzYDGpYOeTYB0iRaHCi9ZauBSd3AAAAAAAAAAAAAAAAUeEzKBSRUP5BcWI662mt1aYs0FoAAAAAAAAAAAAAAADx703x3JZjMb/kvdNr01GlXmG+8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAADYZALuNP9M7yBRuBUmfUCPRuT7sAAAAAAAAAAAAAAADnHgvB+EATr2bGQSri27rxP+py8wAAAAAAAAAAAAAAAD7jsONlY1YztuBXNfVdkioZfR+oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAADiIhFBGnmaIZb11uScyZMLVgTx0gAAAAAAAAAAAAAAAHTbKm11cFzlPnDKDu7tA34IGNF0AAAAAAAAAAAAAAAAy+BHx9chStZp/ecZ+Gn1gWzfQ3kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKywAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEHMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEk8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxXKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT3u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACIfbQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANV/0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkSRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKbjkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAypoQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGuagAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAn+5kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADkinAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATglwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC1iuwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANzWkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABn2PwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJTKP",
                "QA=="
            )

            const decodedMessage = getContractsManager()
                .DatasetRequirementEvm()
                .decodeMessage(message)

            assert.deepStrictEqual(decodedMessage.data, expectDecodeResout.data)

            expect(expectDecodeResout.data!.params).to.deep.include(
                <ValueFields<SubmitRequirementsParams>>(
                    decodedMessage.data!.params
                )
            )
        })
    })
})
