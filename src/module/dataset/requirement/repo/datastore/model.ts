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

import { Schema, Document } from "mongoose"
import { ValueFields } from "@unipackage/utils"
import { DatasetRequirement, MatchingInfo } from "../../types"

/**
 * Interface representing a DatasetRequirementDocument, extending DatasetRequirement and Document.
 * @interface
 */
interface DatasetRequirementDocument
    extends ValueFields<DatasetRequirement>,
        Document {}

/**
 * Schema definition for the DatasetRequirement collection.
 * @constant
 */
const DatasetRequirementSchema = new Schema<DatasetRequirementDocument>({
    dataPreparers: {
        type: [String],
        required: [true, "Please provide the dataPrepares"],
    },
    storageProviders: {
        type: [String],
        required: [true, "Please provide the storageProviders"],
    },
    regionCode: {
        type: BigInt,
        required: [true, "Please provide the region code"],
    },
    countryCode: {
        type: BigInt,
        required: [true, "Please provide the country code"],
    },
    cityCodes: {
        type: [Number],
        required: [true, "Please provide the city codes"],
    },
    index: {
        type: BigInt,
        required: [true, "Please provide the index of the requirement"],
    },
    datasetId: {
        type: Number,
        required: [true, "Please provide the datasetId"],
    },
    matchings: {
        type: [Object],
    },
})

DatasetRequirementSchema.index({ datasetId: 1, index: 1 }, { unique: true })

export { DatasetRequirementSchema }
export type { DatasetRequirementDocument }
