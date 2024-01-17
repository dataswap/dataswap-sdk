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
import { DatasetProofMetadata } from "../../types"
import { DatasetProofEvm } from "../evm"
import { DataType } from "../../../../../shared/types/dataType"
import {
    DatasetProofMetadataDocument,
    DatasetProofMetadataSchema,
} from "./model"
import { MongooseDataStore, DatabaseConnection } from "@unipackage/datastore"

/**
 * Class representing a MongoDB datastore for DatasetProofMetadata entities.
 * Extends the DataStore class with DatasetProofMetadata and DatasetProofMetadataDocument.
 * @class
 */
export class DatasetProofMetadataMongoDatastore extends DataStore<
    ValueFields<DatasetProofMetadata>,
    DatasetProofMetadataDocument
> {
    /**
     * Creates an instance of DatasetProofMetadataMongoDatastore.
     * @param {string} uri - The MongoDB connection URI.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<DatasetProofMetadata>,
                DatasetProofMetadataDocument
            >("DatasetProofMetadata", DatasetProofMetadataSchema, connection)
        )
    }

    /**
     * Asynchronously updates the dataset size.
     * @param options Contains options for the update:
     *   - `datasetProofEvm`: The Ethereum Virtual Machine instance for dataset proof.
     *   - `datasetId`: The unique identifier of the dataset to be updated.
     * @returns A Promise that resolves to the result of the operation:
     *   - If the operation is successful, it returns `{ ok: true }`.
     *   - If the operation fails, it returns `{ ok: false, error: ErrorDetails }`.
     */
    async updateDatasetSize(options: {
        datasetProofEvm: DatasetProofEvm
        datasetId: number
    }): Promise<Result<any>> {
        try {
            const dataType = [DataType.Source, DataType.MappingFiles]
            for (const value of dataType) {
                const state = await options.datasetProofEvm.getDatasetSize(
                    options.datasetId,
                    value
                )
                if (!state.ok) {
                    return { ok: false, error: state.error }
                }
                await this.update(
                    {
                        conditions: [
                            {
                                datasetId: options.datasetId,
                            },
                            {
                                dataType: value,
                            },
                        ],
                    },
                    { datasetSize: state.data }
                )
            }
        } catch (error) {
            throw error
        }

        return { ok: true }
    }
}
