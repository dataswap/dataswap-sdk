import { DataStore } from "@unipackage/datastore"
import { DatasetMetadata } from "../../type"
import { DatasetMetadataDocument, DatasetMetadataModel } from "./model"
import { MongooseDataStore } from "@unipackage/datastore"

export class DatasetMetadataMongoDatastore extends DataStore<
    DatasetMetadata,
    DatasetMetadataDocument
> {
    constructor(uri: string) {
        super(
            new MongooseDataStore<DatasetMetadata, DatasetMetadataDocument>(
                DatasetMetadataModel,
                uri
            )
        )
    }
}
