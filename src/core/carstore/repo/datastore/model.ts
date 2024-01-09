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
import { Car, CarReplica } from "../../types"

/**
 * Interface representing a CarDocument, extending Car and Document.
 * @interface
 */
interface CarDocument extends ValueFields<Car>, Document {}

/**
 * Schema definition for the Car collection.
 * @constant
 */
const CarSchema = new Schema<CarDocument>({
    hash: {
        type: String,
        required: [true, "Please provide the car hash "],
    },
    datasetId: {
        type: Number,
        required: [true, "Please provide the datasetId"],
    },
    size: {
        type: BigInt,
        required: [true, "Please provide the size"],
    },
    replicasCount: {
        type: BigInt,
        required: [true, "Please provide the replicasCount"],
    },
    matchingIds: {
        type: [Number],
        required: [true, "Please provide the matchingIds"],
    },
    carId: {
        type: BigInt,
        required: [true, "Please provide the carId"],
        index: { unique: true },
    },
})

export { CarSchema }
export type { CarDocument }

/**
 * Interface representing a CarReplicaDocument, extending CarReplica and Document.
 * @interface
 */
interface CarReplicaDocument extends ValueFields<CarReplica>, Document {}

/**
 * Schema definition for the Car collection.
 * @constant
 */
const CarReplicaSchema = new Schema<CarReplicaDocument>({
    carId: {
        type: BigInt,
        required: [true, "Please provide the carId"],
        index: { unique: true },
    },
    matchingId: {
        type: Number,
        required: [true, "Please provide the matchingId"],
        index: { unique: true },
    },
    state: {
        type: Number,
    },
    filecoinClaimId: {
        type: BigInt,
    },
})

export { CarReplicaSchema }
export type { CarReplicaDocument }
