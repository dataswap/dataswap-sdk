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

import { DataStore, DatabaseConnection } from "@unipackage/datastore"
import { ValueFields } from "@unipackage/utils"
import { MatchingTarget } from "../../types"
import { MatchingTargetDocument, MatchingTargetSchema } from "./model"
import { MongooseDataStore } from "@unipackage/datastore"

/**
 * Class representing a MongoDB datastore for MatchingTarget entities.
 * Extends the DataStore class with MatchingTarget and MatchingTargetDocument.
 * @class
 */
export class MatchingTargetMongoDatastore extends DataStore<
    ValueFields<MatchingTarget>,
    MatchingTargetDocument
> {
    /**
     * Creates an instance of MatchingTargetMongoDatastore.
     * @param {string} uri - The MongoDB connection URI.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<MatchingTarget>,
                MatchingTargetDocument
            >("MatchingTarget", MatchingTargetSchema, connection)
        )
    }
}
