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
import { MatchingStorageStatisticsInfo } from "../../../../shared/types/statisticsType"
import { BasicStatistics } from "../../../../shared/types/statisticsType"
/**
 * Interface representing a MatchingStorageStatisticsInfoDocument, extending MatchingStorageStatisticsInfo and Document.
 * @interface
 */
interface MatchingStorageStatisticsInfoDocument
    extends ValueFields<MatchingStorageStatisticsInfo>,
        Document {}

/**
 * Schema definition for the storage statistics collection.
 * @constant
 */
const MatchingStorageStatisticsInfoSchema =
    new Schema<MatchingStorageStatisticsInfoDocument>({
        total: {
            type: BigInt,
            required: [true, "Please provide the total"],
        },
        completed: {
            type: BigInt,
            required: [true, "Please provide the completed"],
        },
        usedDatacap: {
            type: BigInt,
            required: [true, "Please provide the usedDatacap"],
        },
        availableDatacap: {
            type: BigInt,
            required: [true, "Please provide the availableDatacap"],
        },
        canceled: {
            type: BigInt,
            required: [true, "Please provide the canceled"],
        },
        unallocatedDatacap: {
            type: BigInt,
            required: [true, "Please provide the unallocatedDatacap"],
        },
        storageProviders: {
            type: [Number],
            required: [true, "Please provide the storageProviders"],
        },
        datasetId: {
            type: Number,
            required: [true, "Please provide the datasetId"],
            index: true,
        },
        replicaIndex: {
            type: BigInt,
            required: [true, "Please provide the replicaIndex"],
        },
        matchingId: {
            type: Number,
            required: [true, "Please provide the matchingId"],
            index: true,
        },
    }).index({ datasetId: 1, matchingId: 1, replicaIndex: 1 }, { unique: true })

export { MatchingStorageStatisticsInfoSchema }
export type { MatchingStorageStatisticsInfoDocument }

/**
 * Interface representing a BasicStatisticsDocument, extending BasicStatistics and Document.
 * @interface
 */
interface BasicStatisticsDocument
    extends ValueFields<BasicStatistics>,
        Document {}

/**
 * Schema definition for the basic statistics collection.
 * @constant
 */
const BasicStatisticsSchema = new Schema<BasicStatisticsDocument>({
    totalCounts: {
        type: BigInt,
        required: [true, "Please provide the totalCounts"],
    },
    successCounts: {
        type: BigInt,
        required: [true, "Please provide the successCounts"],
    },
    ongoingCounts: {
        type: BigInt,
        required: [true, "Please provide the ongoingCounts"],
    },
    failedCounts: {
        type: BigInt,
        required: [true, "Please provide the failedCounts"],
    },
    totalSize: {
        type: BigInt,
        required: [true, "Please provide the totalSize"],
    },
    successSize: {
        type: BigInt,
        required: [true, "Please provide the successSize"],
    },
    ongoingSize: {
        type: BigInt,
        required: [true, "Please provide the ongoingSize"],
    },
    failedSize: {
        type: BigInt,
        required: [true, "Please provide the failedSize"],
    },
    height: {
        type: BigInt,
        required: [true, "Please provide the height"],
        index: { unique: true },
    },
})

export { BasicStatisticsSchema }
export type { BasicStatisticsDocument }
