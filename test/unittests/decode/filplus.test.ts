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
            const expectMessage = createExpectMessage(
                "setDatasetRuleMinRegionsPerDataset",
                {
                    newValue: BigInt(5),
                },
                "0x"
            )
            const targetMessage = createTargetMessage(
                "WCSzY+H1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                "QA=="
            )

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
            const expectMessage = createExpectMessage(
                "setDatasetRuleDefaultMaxReplicasPerCountry",
                {
                    newValue: BigInt(5),
                },
                "0x"
            )
            const targetMessage = createTargetMessage(
                "WCSOL34HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                "QA=="
            )

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
            const expectMessage = createExpectMessage(
                "setDatasetRuleMaxReplicasInCountry",
                {
                    countryCode: BigInt(5),
                    newValue: BigInt(5),
                },
                "0x"
            )
            const targetMessage = createTargetMessage(
                "WEQiup65AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQ==",
                "QA=="
            )

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
            const expectMessage = createExpectMessage(
                "setDatasetRuleMaxReplicasPerCity",
                {
                    newValue: BigInt(5),
                },
                "0x"
            )
            const targetMessage = createTargetMessage(
                "WCSbps89AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                "QA=="
            )

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
            const expectMessage = createExpectMessage(
                "setDatasetRuleMaxProportionOfMappingFilesToDataset",
                {
                    newValue: BigInt(5),
                },
                "0x"
            )
            const targetMessage = createTargetMessage(
                "WCSlS/rzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                "QA=="
            )

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
            const expectMessage = createExpectMessage(
                "setDatasetRuleMinSPsPerDataset",
                {
                    newValue: BigInt(5),
                },
                "0x"
            )
            const targetMessage = createTargetMessage(
                "WCS3evW5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                "QA=="
            )

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
            const expectMessage = createExpectMessage(
                "setDatasetRuleMaxReplicasPerSP",
                {
                    newValue: BigInt(5),
                },
                "0x"
            )
            const targetMessage = createTargetMessage(
                "WCRaxHsnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                "QA=="
            )

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
            const expectMessage = createExpectMessage(
                "setDatasetRuleMinTotalReplicasPerDataset",
                {
                    newValue: BigInt(5),
                },
                "0x"
            )
            const targetMessage = createTargetMessage(
                "WCRZGrxRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                "QA=="
            )

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
            const expectMessage = createExpectMessage(
                "setDatasetRuleMaxTotalReplicasPerDataset",
                {
                    newValue: BigInt(5),
                },
                "0x"
            )
            const targetMessage = createTargetMessage(
                "WCRSbLi/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                "QA=="
            )

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
            const expectMessage = createExpectMessage(
                "setDatacapRulesMaxAllocatedSizePerTime",
                {
                    newValue: BigInt(5),
                },
                "0x"
            )
            const targetMessage = createTargetMessage(
                "WCQubiGBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                "QA=="
            )

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
            const expectMessage = createExpectMessage(
                "setDatacapRulesMaxRemainingPercentageForNext",
                {
                    newValue: BigInt(5),
                },
                "0x"
            )
            const targetMessage = createTargetMessage(
                "WCSQF+XaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU=",
                "QA=="
            )

            const contractMessage = filplus.decodeMessage(targetMessage)
            assert.deepStrictEqual(contractMessage.data, expectMessage.data)

            expect(contractMessage.data?.params).to.deep.include(
                expectMessage.data?.params
            )
        })
    })
})
