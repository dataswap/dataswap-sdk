import mongoose, { Schema, Document } from "mongoose"
import { DatasetMetadata } from "../../../type"

interface DatasetMetadataDocument extends DatasetMetadata, Document {}

const DatasetMetadataSchema = new Schema<DatasetMetadataDocument>({
    name: {
        type: String,
        required: [true, "Please provide the name"],
        index: { unique: true },
    },
    title: {
        type: String,
        required: [true, "Please provide the title"],
        index: { unique: true },
    },
    description: {
        type: String,
        required: [true, "Please provide the description"],
        index: { unique: true },
    },
    sizeInBytes: {
        type: Number,
        required: [true, "Please provide the sizeInBytes"],
        index: { unique: true },
    },
    industry: {
        type: String,
        required: [true, "Please provide the industry"],
        index: { unique: true },
    },
    source: {
        type: String,
        required: [true, "Please provide the source"],
        index: { unique: true },
    },
    accessMethod: {
        type: String,
        required: [true, "Please provide the accessMethod"],
        index: { unique: true },
    },
    version: {
        type: Number,
        required: [true, "Please provide the version"],
        index: { unique: true },
    },
    isPublic: {
        type: Boolean,
        required: [true, "Please provide the isPublic"],
        index: { unique: true },
    },
    msgCid: {
        type: Object,
        required: [true, "Please provide the msgCid"],
        index: { unique: true },
    },
    submitter: {
        type: String,
        required: [true, "Please provide the submitter"],
        index: { unique: true },
    },
    createdBlockNumber: {
        type: Number,
        required: [true, "Please provide the createdBlockNumber"],
        index: { unique: true },
    },
    datasetId: {
        type: Number,
        required: [true, "Please provide the datasetId"],
        index: { unique: true },
    },
})

const DatasetMetadataModel =
    mongoose.models.DatasetMetadata ||
    mongoose.model<DatasetMetadataDocument>(
        "DatasetMetadata",
        DatasetMetadataSchema
    )

export { DatasetMetadataModel }
export type { DatasetMetadataDocument }
