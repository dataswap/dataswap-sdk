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
import { MatchingTarget } from "../../types"

/**
 * Interface representing a MatchingTargetDocument, extending MatchingTarget and Document.
 * @interface
 */
interface MatchingTargetDocument
    extends ValueFields<MatchingTarget>,
        Document {}

/**
 * Schema definition for the MatchingTarget collection.
 * @constant
 */
const MatchingTargetSchema = new Schema<MatchingTargetDocument>({
    datasetID: {
        type: Number,
        required: [true, "Please provide the datasetId"],
    },
    cars: {
        type: [String],
    },
    size: {
        type: BigInt,
    },
    dataType: {
        type: Number,
        required: [true, "Please provide the type of data"],
    },
    associatedMappingFilesMatchingID: {
        type: Number,
    },
    replicaIndex: {
        type: BigInt,
        required: [true, "Please provide the index of replica of dataset"],
    },
    complete: {
        type: Boolean,
    },
    matchingId: {
        type: Number,
        required: [true, "Please provide the matchingId"],
        index: { unique: true },
    },
})

export { MatchingTargetSchema }
export type { MatchingTargetDocument }
