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

import { DataStore } from "@unipackage/datastore"
import { ValueFields, Result } from "@unipackage/utils"
import { DatasetMetadata } from "../../types"
import { DatasetMetadataDocument, DatasetMetadataSchema } from "./model"
import { MongooseDataStore, DatabaseConnection } from "@unipackage/datastore"
import { DatasetMetadataEvm } from "../evm"

/**
 * Class representing a MongoDB datastore for DatasetMetadata entities.
 * Extends the DataStore class with DatasetMetadata and DatasetMetadataDocument.
 * @class
 */
export class DatasetMetadataMongoDatastore extends DataStore<
    ValueFields<DatasetMetadata>,
    DatasetMetadataDocument
> {
    /**
     * Creates an instance of DatasetMetadataMongoDatastore.
     * @param {string} uri - The MongoDB connection URI.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<DatasetMetadata>,
                DatasetMetadataDocument
            >("DatasetMetadata", DatasetMetadataSchema, connection)
        )
    }

    /**
     * Asynchronously updates dataset metadata using the provided options.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `datasetMetadataEvm`: The Ethereum Virtual Machine instance for dataset metadata.
     *   - `datasetId`: The unique identifier of the dataset for which metadata is to be updated.
     * @returns A promise representing the completion of the dataset metadata update operation.
     */
    async updateDatasetMetadataState(options: {
        datasetMetadataEvm: DatasetMetadataEvm
        datasetId: number
    }): Promise<Result<any>> {
        try {
            const state = await options.datasetMetadataEvm.getDatasetState(
                options.datasetId
            )
            if (!state.ok) {
                return { ok: false, error: state.error }
            }
            return await this.update(
                { conditions: [{ datasetId: options.datasetId }] },
                { status: Number(state.data) }
            )
        } catch (error) {
            throw error
        }
    }
}
