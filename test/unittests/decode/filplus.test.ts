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

import { describe } from "mocha"
import assert from "assert"
import { expect } from "chai"
import { createExpectMessage, createTargetMessage } from "../../shared/utils"
import { getContractsManager } from "../../fixtures"
import { FilplusEvm } from "../../../src/core/filplus/repo/evm"

/**
 * Test suite for the Filplus contract message decoder functionality.
 */
describe("FilplusContractMessageDecoder", () => {
    let filplus: FilplusEvm
    /**
     * Setup before running the test suite.
     */
    before(function () {
        filplus = getContractsManager().FilplusEvm()
    })

    /**
     * Test suite for the Filplus decoder functionality.
     */
    describe("#decoder", () => {
        /**
         * Test case for setDatasetRuleMinRegionsPerDataset decode functionality.
         */
        it("setDatasetRuleMinRegionsPerDataset Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "setDatasetRuleMinRegionsPerDataset",
                params: {
                    newValue: BigInt(5),
                },
                returns: "0x",
            })
            const targetMessage = createTargetMessage({
                params: "WCSzY+H1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                returns: "QA==",
            })

            const contractMessage = filplus.decodeMessage(targetMessage)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })

        /**
         * Test case for setDatasetRuleDefaultMaxReplicasPerCountry decode functionality.
         */
        it("setDatasetRuleDefaultMaxReplicasPerCountry Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "setDatasetRuleDefaultMaxReplicasPerCountry",
                params: {
                    newValue: BigInt(5),
                },
                returns: "0x",
            })
            const targetMessage = createTargetMessage({
                params: "WCSOL34HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                returns: "QA==",
            })

            const contractMessage = filplus.decodeMessage(targetMessage)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })

        /**
         * Test case for setDatasetRuleMaxReplicasInCountry decode functionality.
         */
        it("setDatasetRuleMaxReplicasInCountry Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "setDatasetRuleMaxReplicasInCountry",
                params: {
                    countryCode: BigInt(5),
                    newValue: BigInt(5),
                },
                returns: "0x",
            })
            const targetMessage = createTargetMessage({
                params: "WEQiup65AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQ==",
                returns: "QA==",
            })

            const contractMessage = filplus.decodeMessage(targetMessage)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })

        /**
         * Test case for setDatasetRuleMaxReplicasPerCity decode functionality.
         */
        it("setDatasetRuleMaxReplicasPerCity Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "setDatasetRuleMaxReplicasPerCity",
                params: {
                    newValue: BigInt(5),
                },
                returns: "0x",
            })
            const targetMessage = createTargetMessage({
                params: "WCSbps89AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                returns: "QA==",
            })

            const contractMessage = filplus.decodeMessage(targetMessage)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })

        /**
         * Test case for setDatasetRuleMaxProportionOfMappingFilesToDataset decode functionality.
         */
        it("setDatasetRuleMaxProportionOfMappingFilesToDataset Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "setDatasetRuleMaxProportionOfMappingFilesToDataset",
                params: {
                    newValue: BigInt(5),
                },
                returns: "0x",
            })
            const targetMessage = createTargetMessage({
                params: "WCSlS/rzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                returns: "QA==",
            })

            const contractMessage = filplus.decodeMessage(targetMessage)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })

        /**
         * Test case for setDatasetRuleMinSPsPerDataset decode functionality.
         */
        it("setDatasetRuleMinSPsPerDataset Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "setDatasetRuleMinSPsPerDataset",
                params: {
                    newValue: BigInt(5),
                },
                returns: "0x",
            })
            const targetMessage = createTargetMessage({
                params: "WCS3evW5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                returns: "QA==",
            })

            const contractMessage = filplus.decodeMessage(targetMessage)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })

        /**
         * Test case for setDatasetRuleMaxReplicasPerSP decode functionality.
         */
        it("setDatasetRuleMaxReplicasPerSP Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "setDatasetRuleMaxReplicasPerSP",
                params: {
                    newValue: BigInt(5),
                },
                returns: "0x",
            })
            const targetMessage = createTargetMessage({
                params: "WCRaxHsnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                returns: "QA==",
            })

            const contractMessage = filplus.decodeMessage(targetMessage)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })

        /**
         * Test case for setDatasetRuleMinTotalReplicasPerDataset decode functionality.
         */
        it("setDatasetRuleMinTotalReplicasPerDataset Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "setDatasetRuleMinTotalReplicasPerDataset",
                params: {
                    newValue: BigInt(5),
                },
                returns: "0x",
            })
            const targetMessage = createTargetMessage({
                params: "WCRZGrxRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                returns: "QA==",
            })

            const contractMessage = filplus.decodeMessage(targetMessage)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })

        /**
         * Test case for setDatasetRuleMaxTotalReplicasPerDataset decode functionality.
         */
        it("setDatasetRuleMaxTotalReplicasPerDataset Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "setDatasetRuleMaxTotalReplicasPerDataset",
                params: {
                    newValue: BigInt(5),
                },
                returns: "0x",
            })
            const targetMessage = createTargetMessage({
                params: "WCRSbLi/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                returns: "QA==",
            })

            const contractMessage = filplus.decodeMessage(targetMessage)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })

        /**
         * Test case for setDatacapRulesMaxAllocatedSizePerTime decode functionality.
         */
        it("setDatacapRulesMaxAllocatedSizePerTime Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "setDatacapRulesMaxAllocatedSizePerTime",
                params: {
                    newValue: BigInt(5),
                },
                returns: "0x",
            })
            const targetMessage = createTargetMessage({
                params: "WCQubiGBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                returns: "QA==",
            })

            const contractMessage = filplus.decodeMessage(targetMessage)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })

        /**
         * Test case for setDatacapRulesMaxRemainingPercentageForNext decode functionality.
         */
        it("setDatacapRulesMaxRemainingPercentageForNext Decode", async function () {
            const expectMessage = createExpectMessage({
                method: "setDatacapRulesMaxRemainingPercentageForNext",
                params: {
                    newValue: BigInt(5),
                },
                returns: "0x",
            })
            const targetMessage = createTargetMessage({
                params: "WCSQF+XaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                returns: "QA==",
            })

            const contractMessage = filplus.decodeMessage(targetMessage)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })
    })
})
