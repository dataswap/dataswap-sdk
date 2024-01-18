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
        type: BigInt,
        required: [true, "Please provide the biddingDelayBlockCount"],
    },
    biddingPeriodBlockCount: {
        type: BigInt,
        required: [true, "Please provide the biddingPeriodBlockCount"],
    },
    storageCompletionPeriodBlocks: {
        type: BigInt,
        required: [true, "Please provide the storageCompletionPeriodBlocks"],
    },
    biddingThreshold: {
        type: String,
        required: [true, "Please provide the biddingThreshold"],
    },
    additionalInfo: {
        type: String,
    },
    initiator: {
        type: String,
        required: [true, "Please provide the initiator"],
    },
    createdBlockNumber: {
        type: BigInt,
        required: [true, "Please provide the createdBlockNumber"],
    },
    pausedBlockCount: {
        type: BigInt,
    },
    replicaIndex: {
        type: BigInt,
        required: [true, "Please provide the replicaIndex"],
    },
    matchingId: {
        type: Number,
        required: [true, "Please provide the matchingId"],
        index: { unique: true },
    },
    datasetId: {
        type: Number,
        required: [true, "Please provide the datasetId"],
    },
    status: {
        type: Number,
    },
    size: {
        type: BigInt,
    },
    currentPrice: {
        type: BigInt,
    },
    requirement: {
        type: Object,
    },
    biddingStartBlock: {
        type: BigInt,
    },
    biddingEndBlock: {
        type: BigInt,
    },
    subsidy: {
        type: BigInt,
    },
    winner: {
        type: String,
    },
})

export { MatchingMetadataSchema }
export type { MatchingMetadataDocument }
