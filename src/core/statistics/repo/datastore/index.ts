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
 * Class representing a MongoDB datastore for DatasetsBasicStatistics entities.
 * Extends the DataStore class with BasicStatistics and BasicStatisticsDocument.
 * @class
 */
export class DatasetsBasicStatisticsMongoDatastore extends DataStore<
    ValueFields<BasicStatistics>,
    BasicStatisticsDocument
> {
    /**
     * Creates an instance of DatasetsBasicStatisticsMongoDatastore.
     * @param {string} connection - The MongoDB connection.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<BasicStatistics>,
                BasicStatisticsDocument
            >("DatasetsBasicStatistics", BasicStatisticsSchema, connection)
        )
    }

    /**
     * Stores basic statistics in the DatasetsBasicStatisticsDatastore and updates the matching target.
     * @param options - Object containing necessary parameters.
     * @param options.datasets - Datasets to be updated with the stored basic statistics info.
     * @param options.height - .
     * @returns A Promise resolving to a Result indicating the success or failure of the operation.
     */
    async updateBasicStatisticss(options: {
        datasets: DatasetMetadataEvm
        height: bigint
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
            const receipt = await options.datasets.getTransactionReceipt(
                txHash.data!
            )

            if (receipt == null) {
                console.log("get datasets statistics receipt failed:")
                return { ok: true }
            }

            const sizeStatistics = options.datasets.getEvmEventArgs(
                receipt!,
                "SizeStatistics"
            )

            const countStatistics = options.datasets.getEvmEventArgs(
                receipt!,
                "CountStatistics"
            )

            if (!countStatistics.ok) {
                console.log(
                    "get datasets countStatistics failed:",
                    countStatistics.error
                )
                return { ok: true }
            }
            if (!countStatistics.data) {
                console.log("get datasets count statistics failed")
                return { ok: true }
            }
            if (!sizeStatistics.ok) {
                console.log(
                    "get datasets sizeStatistics failed:",
                    sizeStatistics.error
                )
                return { ok: true }
            }
            if (!sizeStatistics.data) {
                console.log("get datasets size statistics failed")
                return { ok: true }
            }
            let basicStatistics = new BasicStatistics({
                totalCounts: countStatistics.data.total,
                successCounts: countStatistics.data.success,
                ongoingCounts: countStatistics.data.ongoing,
                failedCounts: countStatistics.data.failed,
                totalSize: sizeStatistics.data.total,
                successSize: sizeStatistics.data.success,
                ongoingSize: sizeStatistics.data.ongoing,
                failedSize: sizeStatistics.data.failed,
                height: options.height,
            })
            const ret =
                await this.CreateOrupdateByUniqueIndexes(basicStatistics)
            if (!ret.ok) {
                return {
                    ok: false,
                    error: new Error(`store error:${ret.error}`),
                }
            }
            return { ok: true, data: basicStatistics }
        } catch (error) {
            throw error
        }
    }
}

/**
 * Class representing a MongoDB datastore for MatchingsBasicStatistics entities.
 * Extends the DataStore class with BasicStatistics and BasicStatisticsDocument.
 * @class
 */
export class MatchingsBasicStatisticsMongoDatastore extends DataStore<
    ValueFields<BasicStatistics>,
    BasicStatisticsDocument
> {
    /**
     * Creates an instance of MatchingsBasicStatisticsMongoDatastore.
     * @param {string} connection - The MongoDB connection.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<BasicStatistics>,
                BasicStatisticsDocument
            >("MatchingsBasicStatistics", BasicStatisticsSchema, connection)
        )
    }

    /**
     * Stores basic statistics in the MatchingsBasicStatisticsDatastore and updates the matching target.
     * @param options - Object containing necessary parameters.
     * @param options.matchings - matchings to be updated with the stored basic statistics info.
     * @param options.height - .
     * @returns A Promise resolving to a Result indicating the success or failure of the operation.
     */
    async updateBasicStatisticss(options: {
        matchings: MatchingMetadataEvm
        height: bigint
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
            const receipt = await options.matchings.getTransactionReceipt(
                txHash.data!
            )

            if (receipt == null) {
                console.log("get matchings statistics receipt failed:")
                return { ok: true }
            }

            const sizeStatistics = options.matchings.getEvmEventArgs(
                receipt!,
                "SizeStatistics"
            )

            const countStatistics = options.matchings.getEvmEventArgs(
                receipt!,
                "CountStatistics"
            )

            if (!countStatistics.ok) {
                console.log(
                    "get matchings countStatistics failed:",
                    countStatistics.error
                )
                return { ok: true }
            }
            if (!countStatistics.data) {
                console.log("get matchings count statistics failed")
                return { ok: true }
            }
            if (!sizeStatistics.ok) {
                console.log(
                    "get matchings sizeStatistics failed:",
                    sizeStatistics.error
                )
                return { ok: true }
            }
            if (!sizeStatistics.data) {
                console.log("get matchings size statistics failed")
                return { ok: true }
            }
            let basicStatistics = new BasicStatistics({
                totalCounts: countStatistics.data.total,
                successCounts: countStatistics.data.success,
                ongoingCounts: countStatistics.data.ongoing,
                failedCounts: countStatistics.data.failed,
                totalSize: sizeStatistics.data.total,
                successSize: sizeStatistics.data.success,
                ongoingSize: sizeStatistics.data.ongoing,
                failedSize: sizeStatistics.data.failed,
                height: options.height,
            })
            const ret =
                await this.CreateOrupdateByUniqueIndexes(basicStatistics)
            if (!ret.ok) {
                return {
                    ok: false,
                    error: new Error(`store error:${ret.error}`),
                }
            }
            return { ok: true, data: basicStatistics }
        } catch (error) {
            throw error
        }
    }
}

/**
 * Class representing a MongoDB datastore for StoragesBasicStatistics entities.
 * Extends the DataStore class with BasicStatistics and BasicStatisticsDocument.
 * @class
 */
export class StoragesBasicStatisticsMongoDatastore extends DataStore<
    ValueFields<BasicStatistics>,
    BasicStatisticsDocument
> {
    /**
     * Creates an instance of StoragesBasicStatisticsMongoDatastore.
     * @param {string} connection - The MongoDB connection.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<BasicStatistics>,
                BasicStatisticsDocument
            >("StoragesBasicStatistics", BasicStatisticsSchema, connection)
        )
    }

    /**
     * Stores basic statistics in the StoragesBasicStatisticsDatastore and updates the matching target.
     * @param options - Object containing necessary parameters.
     * @param options.storages - storages to be updated with the stored basic statistics info.
     * @param options.height - .
     * @returns A Promise resolving to a Result indicating the success or failure of the operation.
     */
    async updateBasicStatisticss(options: {
        storages: StoragesEvm
        height: bigint
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
            const receipt = await options.storages.getTransactionReceipt(
                txHash.data!
            )

            if (receipt == null) {
                console.log("get storages statistics receipt failed:")
                return { ok: true }
            }

            const sizeStatistics = options.storages.getEvmEventArgs(
                receipt!,
                "SizeStatistics"
            )

            const countStatistics = options.storages.getEvmEventArgs(
                receipt!,
                "CountStatistics"
            )

            if (!countStatistics.ok) {
                console.log(
                    "get storages countStatistics failed:",
                    countStatistics.error
                )
                return { ok: true }
            }
            if (!countStatistics.data) {
                console.log("get storages count statistics failed")
                return { ok: true }
            }
            if (!sizeStatistics.ok) {
                console.log(
                    "get storages sizeStatistics failed:",
                    sizeStatistics.error
                )
                return { ok: true }
            }
            if (!sizeStatistics.data) {
                console.log("get storages size statistics failed")
                return { ok: true }
            }
            let basicStatistics = new BasicStatistics({
                totalCounts: countStatistics.data.total,
                successCounts: countStatistics.data.success,
                ongoingCounts: countStatistics.data.ongoing,
                failedCounts: countStatistics.data.failed,
                totalSize: sizeStatistics.data.total,
                successSize: sizeStatistics.data.success,
                ongoingSize: sizeStatistics.data.ongoing,
                failedSize: sizeStatistics.data.failed,
                height: options.height,
            })
            const ret =
                await this.CreateOrupdateByUniqueIndexes(basicStatistics)
            if (!ret.ok) {
                return {
                    ok: false,
                    error: new Error(`store error:${ret.error}`),
                }
            }
            return { ok: true, data: basicStatistics }
        } catch (error) {
            throw error
        }
    }
}
