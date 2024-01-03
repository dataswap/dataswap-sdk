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
import { DatasetProofMetadata, DatasetProofs } from "../../types"

/**
 * Interface representing a DatasetProofMetadataDocument, extending DatasetProofMetadata and Document.
 * @interface
 */
interface DatasetProofMetadataDocument
    extends ValueFields<DatasetProofMetadata>,
        Document {}

/**
 * Schema definition for the DatasetProofMetadata collection.
 * @constant
 */
const DatasetProofMetadataSchema = new Schema<DatasetProofMetadataDocument>({
    datasetId: {
        type: Number,
        required: [true, "Please provide the datasetId"],
    },
    dataType: {
        type: Number,
        required: [true, "Please provide the datatype"],
    },
    mappingFilesAccessMethod: {
        type: String,
        required: [true, "Please provide the access method of mapping files"],
    },
    rootHash: {
        type: String,
        required: [true, "Please provide the root hash of dataset proof"],
    },
})

/**
 * Model for the DatasetProofMetadataModel collection.
 * @constant
 */
const DatasetProofMetadataModel =
    mongoose.models.DatasetProofMetadata ||
    mongoose.model<DatasetProofMetadataDocument>(
        "DatasetProofMetadata",
        DatasetProofMetadataSchema
    )

export { DatasetProofMetadataModel }
export type { DatasetProofMetadataDocument }

/**
 * Interface representing a DatasetProofsDocument, extending DatasetProofs and Document.
 * @interface
 */
interface DatasetProofsDocument extends ValueFields<DatasetProofs>, Document {}

/**
 * Schema definition for the DatasetProofMetadata collection.
 * @constant
 */
const DatasetProofsSchema = new Schema<DatasetProofsDocument>({
    datasetId: {
        type: Number,
        required: [true, "Please provide the datasetId"],
    },
    dataType: {
        type: Number,
        required: [true, "Please provide the datatype"],
    },
    leafHashes: {
        type: [String],
        required: [true, "Please provide the hash of leaves"],
    },
    leafIndex: {
        type: Number,
        required: [true, "Please provide the index of leaves start"],
    },
    leafSizes: {
        type: [Number],
        required: [true, "Please provide the size of leaves"],
    },
    completed: {
        type: Boolean,
        required: [
            true,
            "Please provide the submission progress status for proots, whether it's completed or not",
        ],
    },
})

/**
 * Model for the DatasetProofsModel collection.
 * @constant
 */
const DatasetProofsModel =
    mongoose.models.DatasetProofs ||
    mongoose.model<DatasetProofsDocument>("DatasetProofs", DatasetProofsSchema)

export { DatasetProofsModel }
export type { DatasetProofsDocument }
