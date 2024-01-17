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
import { DatasetProofMetadata } from "../../types"

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
        index: true,
    },
    datasetSize: {
        type: BigInt,
        required: [true, "Please provide the datasetSize"],
    },
    dataType: {
        type: Number,
        required: [true, "Please provide the datatype"],
        index: true,
    },
    mappingFilesAccessMethod: {
        type: String,
    },
    rootHash: {
        type: String,
        required: [true, "Please provide the root hash of dataset proof"],
    },
    valid: {
        type: Boolean,
        required: [true, "Please provide the valid status"],
    },
}).index({ datasetId: 1, dataType: 1 }, { unique: true })

export { DatasetProofMetadataSchema }
export type { DatasetProofMetadataDocument }
