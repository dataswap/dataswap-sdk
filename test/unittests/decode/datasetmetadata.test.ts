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
import { Message } from "@unipackage/filecoin" // Replace with the actual path to your TypeScript file
import { DatasetMetadataEvm } from "../../../src/module/dataset/metadata/repo/evm"
import datasetMetaAbi from "@dataswapcore/contracts/abi/v0.8/Datasets.json"
import { Context } from "mocha"
import { expect } from "chai"
import * as dotenv from "dotenv"
import assert from "assert"
import { DatasetMetadata } from "../../../src/module/dataset/metadata/types"
import { ValueFields } from "@unipackage/utils"
dotenv.config()

describe("ContractMessageDecoder", () => {
    const expectDecodeResult = {
        ok: true,
        data: {
            cid: {
                "/": "bafy2bzacebnjyelld3l7nxbtzqxg7ljs7sjsbkalz3szorwmu3wkulaqph6mm",
            },
            height: 1213438,
            timestamp: "",
            from: "f410fcwzis33wz3sofrlh466gog5xahlthgzqezasapy",
            to: "f410fai7exftlsq6igc35jsxij7twcza3feadlmtrjla",
            method: "submitDatasetMetadata",
            params: {
                client: BigInt(1420),
                title: "title-0i4zeet",
                industry: "industry-0i4zeet",
                name: "dataset-0i4zeet",
                description: "description-0i4zeet",
                source: "aws://sdfa.com-0i4zeet",
                accessMethod: "dataswap.com/test-0i4zeet",
                sizeInBytes: BigInt(5120000),
                isPublic: true,
                version: BigInt(1),
                submitter: "f410fcwzis33wz3sofrlh466gog5xahlthgzqezasapy",
                createdBlockNumber: 1213438,
                datasetId: 1,
            },
            status: 0,
            return: "0x0000000000000000000000000000000000000000000000000000000000000001",
            datasetId: 1,
        },
    }

    const datasetmetaEvm = new DatasetMetadataEvm(
        datasetMetaAbi,
        "0x023e4b966b943c830b7d4cae84fe761641b29003",
        "https://api.calibration.node.glif.io/rpc/v1"
    )

    const message: Message = new Message({
        Height: 1213438,
        Replayed: true,
        MsgCid: {
            "/": "bafy2bzacebnjyelld3l7nxbtzqxg7ljs7sjsbkalz3szorwmu3wkulaqph6mm",
        },
        Msg: {
            Version: 0,
            To: "f410fai7exftlsq6igc35jsxij7twcza3feadlmtrjla",
            From: "f410fcwzis33wz3sofrlh466gog5xahlthgzqezasapy",
            Nonce: 550,
            Value: "0",
            GasLimit: 35862045,
            GasFeeCap: "4128217110",
            GasPremium: "2057242745",
            Method: 3844450837,
            Params: "WQLEkl3YoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA10aXRsZS0waTR6ZWV0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQaW5kdXN0cnktMGk0emVldAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2RhdGFzZXQtMGk0emVldAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABNkZXNjcmlwdGlvbi0waTR6ZWV0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWYXdzOi8vc2RmYS5jb20tMGk0emVldAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGWRhdGFzd2FwLmNvbS90ZXN0LTBpNHplZXQAAAAAAAAA",
            CID: {
                "/": "bafy2bzacedwcmokyjjyju2a7s6tsdvakcjwzztgpmbvdabk7v7zdadsqndxec",
            },
        },
        MsgRct: {
            ExitCode: 0,
            Return: "WCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ==",
            GasUsed: 28697436,
            EventsRoot: {
                "/": "bafy2bzacebkqi5zhbxevtqfadttyoguh2parrfe3qkh7rlfgxfux3eyhihzq6",
            },
        },
        GasCost: {
            Message: {
                "/": "bafy2bzacedwcmokyjjyju2a7s6tsdvakcjwzztgpmbvdabk7v7zdadsqndxec",
            },
            GasUsed: "28697436",
            BaseFeeBurn: "2869743600",
            OverEstimationBurn: "107225700",
            MinerPenalty: "0",
            MinerTip: "73776931897113525",
            Refund: "74269372894507125",
            TotalCost: "73776934874082825",
        },
    })

    describe("#decoder", () => {
        it("should ok", async function (this: Context) {
            this.timeout(10000)
            const contractMessage = datasetmetaEvm.decodeMessage(message)
            assert.deepStrictEqual(
                contractMessage.data,
                expectDecodeResult.data
            )
            expect(contractMessage.data.params).to.deep.include(
                <ValueFields<DatasetMetadata>>contractMessage.data.params
            )
        })
    })
})
