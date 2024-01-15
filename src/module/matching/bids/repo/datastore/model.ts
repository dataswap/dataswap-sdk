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
import { MatchingBid } from "../../types"

/**
 * Interface representing a MatchingBidDocument, extending MatchingBid and Document.
 * @interface
 */
interface MatchingBidDocument extends ValueFields<MatchingBid>, Document {}

/**
 * Schema definition for the MatchingBid collection.
 * @constant
 */
const MatchingBidSchema = new Schema<MatchingBidDocument>({
    bidder: {
        type: String,
        required: [true, "Please provide the bidder"],
    },
    amount: {
        type: BigInt,
        required: [true, "Please provide the amount"],
    },
    complyFilplusRule: {
        type: Boolean,
    },
    matchingId: {
        type: Number,
        required: [true, "Please provide the matchingId"],
        index: { unique: true },
    },
}).index({ matchingId: 1, bidder: 1 }, { unique: true })

export { MatchingBidSchema }
export type { MatchingBidDocument }
