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
import {
    StorageStatisticsInfoDocument,
    StorageStatisticsInfoSchema,
} from "./model"
import { StorageStatisticsInfo } from "../../../../shared/types/statisticsType"
import { MongooseDataStore, DatabaseConnection } from "@unipackage/datastore"
import { StoragesEvm } from "../../../../module/storages/repo/evm"
import { MatchingTargetEvm } from "../../../../module/matching/target/repo/evm"
/**
 * Class representing a MongoDB datastore for StorageStatisticsInfo entities.
 * Extends the DataStore class with StorageStatisticsInfo and StorageStatisticsInfoDocument.
 * @class
 */
export class StorageStatisticsInfoMongoDatastore extends DataStore<
    ValueFields<StorageStatisticsInfo>,
    StorageStatisticsInfoDocument
> {
    /**
     * Creates an instance of StorageStatisticsInfoMongoDatastore.
     * @param {string} connection - The MongoDB connection.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<StorageStatisticsInfo>,
                StorageStatisticsInfoDocument
            >("StorageStatisticsInfo", StorageStatisticsInfoSchema, connection)
        )
    }

    /**
     * Stores storages statistics in the StorageStatisticsInfoDatastore and updates the matching target.
     * @param options - Object containing necessary parameters.
     * @param options.storages - Storages to be updated with the stored storage statistics info.
     * @param options.matchingId - .
     * @returns A Promise resolving to a Result indicating the success or failure of the operation.
     */
    async updateStorageStatisticsInfos(options: {
        matchingTarget: MatchingTargetEvm
        storages: StoragesEvm
        matchingId: number
    }): Promise<Result<any>> {
        try {
            const target = await options.matchingTarget.getMatchingTarget(
                options.matchingId
            )
            if (!target.ok) {
                return { ok: false, error: target.error }
            }
            if (!target.data) {
                return {
                    ok: false,
                    error: new Error("get matching target failed"),
                }
            }
            const statistics =
                await options.storages.getMatchingStorageOverview(
                    options.matchingId
                )
            if (!statistics.ok) {
                return { ok: false, error: statistics.error }
            }
            if (!statistics.data) {
                return {
                    ok: false,
                    error: new Error("get matching storage overview failed"),
                }
            }
            statistics.data.datasetId = target.data.datasetID
            statistics.data.replicaIndex = target.data.replicaIndex

            const ret = await this.CreateOrupdateByUniqueIndexes(
                statistics.data
            )
            if (!ret.ok) {
                return {
                    ok: false,
                    error: new Error(
                        `store storage statistics error:${ret.error}`
                    ),
                }
            }
            return { ok: true, data: statistics.data }
        } catch (error) {
            throw error
        }
    }
}
