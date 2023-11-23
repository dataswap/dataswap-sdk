import mongoose, { Schema, Document } from "mongoose"
import { DataswapMessage } from "../../../types"

interface DataswapMessageDocument extends DataswapMessage, Document {}

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
