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

import { DataStore } from "@unipackage/datastore"
import { DataswapMessage } from "../../types"
import { DataswapMessageDocument, DataswapMessageSchema } from "./model"
import { MongooseDataStore, DatabaseConnection } from "@unipackage/datastore"
import { Result } from "@unipackage/utils"
import { MatchingMetadataEvm } from "../../../module/matching/metadata/repo/evm"
import { MatchingTargetEvm } from "../../../module/matching/target/repo/evm"

/**
 * Class representing a MongoDB datastore for DataswapMessage entities.
 * Extends the DataStore class with DataswapMessage and DataswapMessageDocument.
 * @class
 */
export class DataswapMessageMongoDatastore extends DataStore<
    DataswapMessage,
    DataswapMessageDocument
> {
    /**
     * Creates an instance of DataswapMessageMongoDatastore.
     * @param {string} uri - The MongoDB connection URI.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<DataswapMessage, DataswapMessageDocument>(
                "DataswapMessage",
                DataswapMessageSchema,
                connection
            )
        )
    }

    /**
     * Asynchronously creates or updates data by unique indexes plus with the specified parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `matchingTarget`: The Ethereum Virtual Machine instance for matching target.
     *   - `data`: The data to be created or updated.
     * @returns A promise that resolves to the result of the operation, including an array of DataswapMessage.
     */
    async CreateOrupdateByUniqueIndexesPlus(options: {
        matchingTarget: MatchingTargetEvm
        data: DataswapMessage
    }): Promise<Result<DataswapMessage[]>> {
        switch (options.data.method) {
            case "pauseMatching":
            case "resumeMatching":
            case "bidding":
            case "cancelMatching":
            case "closeMatching":
                const target = await options.matchingTarget.getMatchingTarget(
                    options.data.params.matchingId
                )

                if (!target.ok) {
                    console.log(target.error)
                    break
                }
                options.data.datasetId = target.data!.datasetID
                break
            default:
        }
        return await super.CreateOrupdateByUniqueIndexes(options.data)
    }
}
