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
import { DatasetMetadata } from "../../types"

/**
 * Interface representing a DatasetMetadataDocument, extending DatasetMetadata and Document.
 * @interface
 */
interface DatasetMetadataDocument
    extends ValueFields<DatasetMetadata>,
        Document {}

/**
 * Schema definition for the DatasetMetadata collection.
 * @constant
 */
const DatasetMetadataSchema = new Schema<DatasetMetadataDocument>({
    title: {
        type: String,
        required: [true, "Please provide the title"],
    },
    industry: {
        type: String,
        required: [true, "Please provide the industry"],
    },
    name: {
        type: String,
        required: [true, "Please provide the name"],
    },
    description: {
        type: String,
        required: [true, "Please provide the description"],
    },
    source: {
        type: String,
        required: [true, "Please provide the to source"],
    },
    accessMethod: {
        type: String,
        required: [true, "Please provide the accessMethod"],
        index: { unique: true },
    },
    sizeInBytes: {
        type: Number,
        required: [true, "Please provide the sizeInBytes"],
    },
    isPublic: {
        type: Boolean,
        required: [true, "Please provide the isPublic"],
    },
    version: {
        type: Number,
        required: [true, "Please provide the version"],
    },
    datasetId: {
        type: Number,
        required: [true, "Please provide the datasetId"],
    },
    status: {
        type: String,
    },
    submitter: {
        type: String,
        required: [true, "Please provide the submitter"],
    },
    createdBlockNumber: {
        type: String,
        required: [true, "Please provide the createdBlockNumber"],
    },
})

/**
 * Model for the DatasetMetadataModel collection.
 * @constant
 */
const DatasetMetadataModel =
    mongoose.models.Message ||
    mongoose.model<DatasetMetadataDocument>(
        "DatasetMetadata",
        DatasetMetadataSchema
    )

export { DatasetMetadataModel }
export type { DatasetMetadataDocument }
