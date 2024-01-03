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
import { MatchingMetadata } from "../../types"

/**
 * Interface representing a MatchingMetadataDocument, extending MatchingMetadata and Document.
 * @interface
 */
interface MatchingMetadataDocument
    extends ValueFields<MatchingMetadata>,
        Document {}

/**
 * Schema definition for the MatchingMetadata collection.
 * @constant
 */
const MatchingMetadataSchema = new Schema<MatchingMetadataDocument>({
    bidSelectionRule: {
        type: Number,
        required: [true, "Please provide the bidSelectionRule"],
    },
    biddingDelayBlockCount: {
        type: Number,
        required: [true, "Please provide the biddingDelayBlockCount"],
    },
    biddingPeriodBlockCount: {
        type: Number,
        required: [true, "Please provide the biddingPeriodBlockCount"],
    },
    storageCompletionPeriodBlocks: {
        type: Number,
        required: [true, "Please provide the storageCompletionPeriodBlocks"],
    },
    biddingThreshold: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide the biddingThreshold"],
    },
    createdBlockNumber: {
        type: Number,
        required: [true, "Please provide the createdBlockNumber"],
    },
    additionalInfo: {
        type: String,
        required: [true, "Please provide the additionalInfo"],
    },
    initiator: {
        type: String,
        required: [true, "Please provide the initiator"],
    },
    pausedBlockCount: {
        type: Number,
        required: [true, "Please provide the pausedBlockCount"],
    },
    matchingId: {
        type: Number,
        required: [true, "Please provide the matchingId"],
    },
})

/**
 * Model for the MatchingMetadataModel collection.
 * @constant
 */
const MatchingMetadataModel =
    mongoose.models.MatchingMetadata ||
    mongoose.model<MatchingMetadataDocument>(
        "MatchingMetadata",
        MatchingMetadataSchema
    )

export { MatchingMetadataModel }
export type { MatchingMetadataDocument }
