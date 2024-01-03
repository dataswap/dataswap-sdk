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

import mongoose, { Schema, Document } from "mongoose"
import { ValueFields } from "@unipackage/utils"
import { DatasetChallenge } from "../../types"

/**
 * Interface representing a DatasetChallengeDocument, extending DatasetChallenge and Document.
 * @interface
 */
interface DatasetChallengeDocument
    extends ValueFields<DatasetChallenge>,
        Document {}

/**
 * Schema definition for the DatasetChallenge collection.
 * @constant
 */
const DatasetChallengeSchema = new Schema<DatasetChallengeDocument>({
    datasetId: {
        type: Number,
        required: [true, "Please provide the datasetId"],
    },
    leaves: {
        type: [String],
        required: [
            true,
            "Please provide the leaves of dataset challenge proof",
        ],
    },
    siblings: {
        type: [[String]],
        required: [
            true,
            "Please provide the siblings of dataset challenge proof",
        ],
    },
    paths: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "Please provide the paths of dataset challenge proof"],
    },
    randomSeed: {
        type: mongoose.Schema.Types.ObjectId,
        required: [
            true,
            "Please provide the random seed of dataset challenge proof",
        ],
    },
    auditor: {
        type: String,
        required: [
            true,
            "Please provide the auditer of dataset challenge proof",
        ],
    },
})

/**
 * Model for the DatasetChallengeModel collection.
 * @constant
 */
const DatasetChallengeModel =
    mongoose.models.DatasetChallenge ||
    mongoose.model<DatasetChallengeDocument>(
        "DatasetChallenge",
        DatasetChallengeSchema
    )

export { DatasetChallengeModel }
export type { DatasetChallengeDocument }
