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
import { DataswapMessage } from "../../../types"

interface DataswapMessageDocument extends DataswapMessage, Document { }

const DataswapMessageSchema = new Schema<DataswapMessageDocument>({
    cid: {
        type: Object,
        required: [true, "Please provide the MsgCid"],
        index: { unique: true },
    },
    height: {
        type: Number,
        required: [true, "Please provide the Replayed"],
    },
    timestamp: {
        type: String,
        required: [true, "Please provide the height"],
    },
    from: {
        type: String,
        required: [true, "Please provide the Msg"],
    },
    to: {
        type: String,
        required: [true, "Please provide the Msg"],
    },
    method: {
        type: String,
        required: [true, "Please provide the Msg"],
    },
    params: {
        type: Object,
        required: [true, "Please provide the Msg"],
    },
    status: {
        type: Number,
        required: [true, "Please provide the Msg"],
    },
    datasetId: {
        type: Number,
    },
    matchingId: {
        type: Number,
    },
})

const DataswapMessageModel =
    mongoose.models.Message ||
    mongoose.model<DataswapMessageDocument>(
        "DataswapMessage",
        DataswapMessageSchema
    )

export { DataswapMessageModel }
export type { DataswapMessageDocument }
