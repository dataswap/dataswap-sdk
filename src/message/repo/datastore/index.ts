import { DataStore } from "@unipackage/datastore"
import { DataswapMessage } from "../../types"
import { DataswapMessageDocument, DataswapMessageModel } from "./model"
import { MongooseDataStore } from "@unipackage/datastore"

export class DataswapMessageMongoDatastore extends DataStore<
    DataswapMessage,
    DataswapMessageDocument
> {
    constructor(uri: string) {
        super(
            new MongooseDataStore<DataswapMessage, DataswapMessageDocument>(
                DataswapMessageModel,
                uri
            )
        )
    }
}
