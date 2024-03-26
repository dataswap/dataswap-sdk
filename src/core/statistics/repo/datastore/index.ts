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
    MatchingStorageStatisticsInfoDocument,
    MatchingStorageStatisticsInfoSchema,
    BasicStatisticsDocument,
    BasicStatisticsSchema,
} from "./model"
import { MatchingStorageStatisticsInfo } from "../../../../shared/types/statisticsType"
import { MongooseDataStore, DatabaseConnection } from "@unipackage/datastore"
import { StoragesEvm } from "../../../../module/storages/repo/evm"
import { MatchingTargetEvm } from "../../../../module/matching/target/repo/evm"
import { BasicStatistics } from "../../../../shared/types/statisticsType"
import { DatasetMetadataEvm } from "../../../../module/dataset/metadata/repo/evm"
import { MatchingMetadataEvm } from "../../../../module/matching/metadata/repo/evm"
import { ChainFilecoinRPC, CidProperty } from "@unipackage/filecoin"
import { EvmEx } from "../../../../shared/types/evmEngineType"

/**
 * Class representing a MongoDB datastore for MatchingStorageStatisticsInfo entities.
 * Extends the DataStore class with MatchingStorageStatisticsInfo and MatchingStorageStatisticsInfoDocument.
 * @class
 */
export class MatchingStorageStatisticsInfoMongoDatastore extends DataStore<
    ValueFields<MatchingStorageStatisticsInfo>,
    MatchingStorageStatisticsInfoDocument
> {
    /**
     * Creates an instance of MatchingStorageStatisticsInfoMongoDatastore.
     * @param {string} connection - The MongoDB connection.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<MatchingStorageStatisticsInfo>,
                MatchingStorageStatisticsInfoDocument
            >(
                "MatchingStorageStatisticsInfo",
                MatchingStorageStatisticsInfoSchema,
                connection
            )
        )
    }

    /**
     * Stores storages statistics in the MatchingStorageStatisticsInfoDatastore and updates the matching target.
     * @param options - Object containing necessary parameters.
     * @param options.storages - Storages to be updated with the stored storage statistics info.
     * @param options.matchingId - .
     * @returns A Promise resolving to a Result indicating the success or failure of the operation.
     */
    async updateMatchingStorageStatisticsInfos(options: {
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

/**
 * Class representing a MongoDB datastore for DatasetsStatistics entities.
 * Extends the DataStore class with BasicStatistics and BasicStatisticsDocument.
 * @class
 */
export class DatasetsStatisticsMongoDatastore extends DataStore<
    ValueFields<BasicStatistics>,
    BasicStatisticsDocument
> {
    /**
     * Creates an instance of DatasetsStatisticsMongoDatastore.
     * @param {string} connection - The MongoDB connection.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<BasicStatistics>,
                BasicStatisticsDocument
            >("DatasetsStatistics", BasicStatisticsSchema, connection)
        )
    }

    /**
     * Stores data statistics in the DatasetsStatisticsDatastore and updates the matching target.
     * @param options - Object containing necessary parameters.
     * @param options.evm - Instance of EvmEx.
     * @param chainFilecoinRPC: Instance of ChainFilecoinRPC.
     * @param msgCid: Property representing the Cid.
     * @returns A Promise resolving to a Result indicating the success or failure of the operation.
     */
    async updateStatisticss(options: {
        evm: EvmEx
        chainFilecoinRPC: ChainFilecoinRPC
        msgCid: CidProperty
    }): Promise<Result<any>> {
        try {
            const txHash =
                await options.chainFilecoinRPC.EthGetTransactionHashByCid(
                    options.msgCid
                )

            if (!txHash.ok) {
                console.log(
                    "get datasets statistics tx hash failed:",
                    txHash.error
                )
                return { ok: true }
            }
            // Get transaction receipt and event arguments
            const receipt = await options.evm.getTransactionReceipt(
                txHash.data!
            )

            if (receipt == null) {
                console.log("get datasets statistics receipt failed:")
                return { ok: true }
            }

            const dataStatisticsEvent = options.evm.getEvmEventArgs(
                receipt!,
                "DatasetsStatistics"
            )

            if (!dataStatisticsEvent.ok) {
                console.log(
                    "get datasetsStatistics failed:",
                    dataStatisticsEvent.error
                )
                return { ok: true }
            }
            if (!dataStatisticsEvent.data) {
                console.log("get datasets statistics failed")
                return { ok: true }
            }

            let dataStatistics = new BasicStatistics({
                totalCounts: dataStatisticsEvent.data.totalCount,
                successCounts: dataStatisticsEvent.data.successCount,
                ongoingCounts: BigInt(
                    dataStatisticsEvent.data.totalCount -
                        dataStatisticsEvent.data.successCount -
                        dataStatisticsEvent.data.failedCount
                ),
                failedCounts: dataStatisticsEvent.data.failedCount,
                totalSize: dataStatisticsEvent.data.totalSize,
                successSize: dataStatisticsEvent.data.successSize,
                ongoingSize: BigInt(
                    dataStatisticsEvent.data.totalSize -
                        dataStatisticsEvent.data.successSize -
                        dataStatisticsEvent.data.failedSize
                ),
                failedSize: dataStatisticsEvent.data.failedSize,
                height: dataStatisticsEvent.data.height,
            })
            const ret = await this.CreateOrupdateByUniqueIndexes(dataStatistics)
            if (!ret.ok) {
                return {
                    ok: false,
                    error: new Error(`store error:${ret.error}`),
                }
            }
            return { ok: true, data: dataStatistics }
        } catch (error) {
            throw error
        }
    }
}

/**
 * Class representing a MongoDB datastore for MatchingsStatistics entities.
 * Extends the DataStore class with BasicStatistics and BasicStatisticsDocument.
 * @class
 */
export class MatchingsStatisticsMongoDatastore extends DataStore<
    ValueFields<BasicStatistics>,
    BasicStatisticsDocument
> {
    /**
     * Creates an instance of MatchingsStatisticsMongoDatastore.
     * @param {string} connection - The MongoDB connection.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<BasicStatistics>,
                BasicStatisticsDocument
            >("MatchingsStatistics", BasicStatisticsSchema, connection)
        )
    }

    /**
     * Stores basic statistics in the MatchingsStatisticsDatastore and updates the matching target.
     * @param options - Object containing necessary parameters.
     * @param options.evm - Instance of EvmEx.
     * @param chainFilecoinRPC: Instance of ChainFilecoinRPC.
     * @param msgCid: Property representing the Cid.
     * @returns A Promise resolving to a Result indicating the success or failure of the operation.
     */
    async updateStatisticss(options: {
        evm: EvmEx
        chainFilecoinRPC: ChainFilecoinRPC
        msgCid: CidProperty
    }): Promise<Result<any>> {
        try {
            const txHash =
                await options.chainFilecoinRPC.EthGetTransactionHashByCid(
                    options.msgCid
                )

            if (!txHash.ok) {
                console.log(
                    "get matchings statistics tx hash failed:",
                    txHash.error
                )
                return { ok: true }
            }
            // Get transaction receipt and event arguments
            const receipt = await options.evm.getTransactionReceipt(
                txHash.data!
            )

            if (receipt == null) {
                console.log("get matchings statistics receipt failed:")
                return { ok: true }
            }

            const dataStatisticsEvent = options.evm.getEvmEventArgs(
                receipt!,
                "MatchingsStatistics"
            )

            if (!dataStatisticsEvent.ok) {
                console.log(
                    "get matchingsStatistics failed:",
                    dataStatisticsEvent.error
                )
                return { ok: true }
            }
            if (!dataStatisticsEvent.data) {
                console.log("get matchings statistics failed")
                return { ok: true }
            }

            let dataStatistics = new BasicStatistics({
                totalCounts: dataStatisticsEvent.data.totalCount,
                successCounts: dataStatisticsEvent.data.successCount,
                ongoingCounts: BigInt(
                    dataStatisticsEvent.data.totalCount -
                        dataStatisticsEvent.data.successCount -
                        dataStatisticsEvent.data.failedCount
                ),
                failedCounts: dataStatisticsEvent.data.failedCount,
                totalSize: dataStatisticsEvent.data.totalSize,
                successSize: dataStatisticsEvent.data.successSize,
                ongoingSize: BigInt(
                    dataStatisticsEvent.data.totalSize -
                        dataStatisticsEvent.data.successSize -
                        dataStatisticsEvent.data.failedSize
                ),
                failedSize: dataStatisticsEvent.data.failedSize,
                height: dataStatisticsEvent.data.height,
            })
            const ret = await this.CreateOrupdateByUniqueIndexes(dataStatistics)
            if (!ret.ok) {
                return {
                    ok: false,
                    error: new Error(`store error:${ret.error}`),
                }
            }
            return { ok: true, data: dataStatistics }
        } catch (error) {
            throw error
        }
    }
}

/**
 * Class representing a MongoDB datastore for StoragesStatistics entities.
 * Extends the DataStore class with BasicStatistics and BasicStatisticsDocument.
 * @class
 */
export class StoragesStatisticsMongoDatastore extends DataStore<
    ValueFields<BasicStatistics>,
    BasicStatisticsDocument
> {
    /**
     * Creates an instance of StoragesStatisticsMongoDatastore.
     * @param {string} connection - The MongoDB connection.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<BasicStatistics>,
                BasicStatisticsDocument
            >("StoragesStatistics", BasicStatisticsSchema, connection)
        )
    }

    /**
     * Stores basic statistics in the MatchingsStatisticsDatastore and updates the matching target.
     * @param options - Object containing necessary parameters.
     * @param options.evm - Instance of EvmEx.
     * @param chainFilecoinRPC: Instance of ChainFilecoinRPC.
     * @param msgCid: Property representing the Cid.
     * @returns A Promise resolving to a Result indicating the success or failure of the operation.
     */
    async updateStatisticss(options: {
        evm: EvmEx
        chainFilecoinRPC: ChainFilecoinRPC
        msgCid: CidProperty
    }): Promise<Result<any>> {
        try {
            const txHash =
                await options.chainFilecoinRPC.EthGetTransactionHashByCid(
                    options.msgCid
                )

            if (!txHash.ok) {
                console.log(
                    "get storages statistics tx hash failed:",
                    txHash.error
                )
                return { ok: true }
            }
            // Get transaction receipt and event arguments
            const receipt = await options.evm.getTransactionReceipt(
                txHash.data!
            )

            if (receipt == null) {
                console.log("get storages statistics receipt failed:")
                return { ok: true }
            }

            const dataStatisticsEvent = options.evm.getEvmEventArgs(
                receipt!,
                "StoragesStatistics"
            )

            if (!dataStatisticsEvent.ok) {
                console.log(
                    "get storagesStatistics failed:",
                    dataStatisticsEvent.error
                )
                return { ok: true }
            }
            if (!dataStatisticsEvent.data) {
                console.log("get storages statistics failed")
                return { ok: true }
            }

            let dataStatistics = new BasicStatistics({
                totalCounts: dataStatisticsEvent.data.totalCount,
                successCounts: dataStatisticsEvent.data.successCount,
                ongoingCounts: BigInt(
                    dataStatisticsEvent.data.totalCount -
                        dataStatisticsEvent.data.successCount -
                        dataStatisticsEvent.data.failedCount
                ),
                failedCounts: dataStatisticsEvent.data.failedCount,
                totalSize: dataStatisticsEvent.data.totalSize,
                successSize: dataStatisticsEvent.data.successSize,
                ongoingSize: BigInt(
                    dataStatisticsEvent.data.totalSize -
                        dataStatisticsEvent.data.successSize -
                        dataStatisticsEvent.data.failedSize
                ),
                failedSize: dataStatisticsEvent.data.failedSize,
                height: dataStatisticsEvent.data.height,
            })
            const ret = await this.CreateOrupdateByUniqueIndexes(dataStatistics)
            if (!ret.ok) {
                return {
                    ok: false,
                    error: new Error(`store error:${ret.error}`),
                }
            }
            return { ok: true, data: dataStatistics }
        } catch (error) {
            throw error
        }
    }
}
