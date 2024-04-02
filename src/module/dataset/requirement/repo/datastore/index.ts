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

import { DataStore, DatabaseConnection } from "@unipackage/datastore"
import { ValueFields, Result } from "@unipackage/utils"
import { DatasetRequirement, MatchingInfo } from "../../types"
import { DatasetRequirementDocument, DatasetRequirementSchema } from "./model"
import { MongooseDataStore } from "@unipackage/datastore"
import { MatchingTargetEvm } from "../../../../matching/target/repo/evm"
import { MatchingMetadataEvm } from "../../../../matching/metadata/repo/evm"
import { StoragesEvm } from "../../../../storages/repo/evm"

/**
 * Class representing a MongoDB datastore for DatasetRequirement entities.
 * Extends the DataStore class with DatasetRequirement and DatasetRequirementDocument.
 * @class
 */
export class DatasetRequirementMongoDatastore extends DataStore<
    ValueFields<DatasetRequirement>,
    DatasetRequirementDocument
> {
    /**
     * Creates an instance of DatasetRequirementMongoDatastore.
     * @param {string} uri - The MongoDB connection URI.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<DatasetRequirement>,
                DatasetRequirementDocument
            >("DatasetRequirement", DatasetRequirementSchema, connection)
        )
    }

    /**
     * Asynchronously checks if the specified dataset contains a matching with the given parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `datasetId`: The unique identifier of the dataset.
     *   - `index`: The index value.
     *   - `matchingId`: The identifier of the matching to check for.
     * @returns A promise that resolves to a boolean indicating whether the matching is contained in the dataset.
     */
    private async isContainMatching(options: {
        datasetId: number
        index: bigint
        matchingId: number
    }): Promise<boolean> {
        const res = await this.find({
            conditions: [
                { datasetId: options.datasetId },
                { index: options.index },
            ],
        })
        if (!res.ok) {
            throw res.error
        }

        if (res.data!.length == 0) {
            return false
        }

        for (let i = 0; i < res.data![0].matchings!.length; i++) {
            if (res.data![0].matchings![i].matchingId === options.matchingId) {
                return true
            }
        }
        return false
    }

    /**
     * Asynchronously retrieves matchings based on the specified dataset and index.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `datasetId`: The unique identifier of the dataset.
     *   - `index`: The index value.
     * @returns A promise that resolves to an array of MatchingInfo objects.
     */
    private async getMatchings(options: {
        datasetId: number
        index: bigint
    }): Promise<MatchingInfo[]> {
        const res = await this.find({
            conditions: [
                { datasetId: options.datasetId },
                { index: options.index },
            ],
        })
        if (!res.ok) {
            throw res.error
        }

        if (res.data!.length == 0) {
            return []
        }

        return res.data![0].matchings!
    }

    /**
     * Asynchronously adds a matching with the specified parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `matchingTarget`: The Ethereum Virtual Machine instance for the matching target.
     *   - `matchingMetadata`: The Ethereum Virtual Machine instance for the matching metadata.
     *   - `datasetId`: The unique identifier of the dataset.
     *   - `index`: The index value.
     *   - `matchingId`: The identifier of the matching to be added.
     */
    async addMatching(options: {
        matchingTarget: MatchingTargetEvm
        matchingMetadata: MatchingMetadataEvm
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
            const contain = await this.isContainMatching({
                datasetId: target.data.datasetID,
                index: target.data.replicaIndex,
                matchingId: options.matchingId,
            })

            if (contain) {
                return { ok: true }
            }

            let matchings = await this.getMatchings({
                datasetId: target.data.datasetID,
                index: target.data.replicaIndex,
            })

            const state = await options.matchingMetadata.getMatchingState(
                options.matchingId
            )
            if (!state.ok) {
                return { ok: false, error: target.error }
            }

            matchings.push(
                new MatchingInfo({
                    matchingId: options.matchingId,
                    matchingState: Number(state.data!),
                    finishedCount: 0,
                    totalCount: target.data!.cars.length,
                    finishedSize: "0",
                    totalSize: target.data!.size.toString(),
                })
            )
            return await this.update(
                {
                    conditions: [
                        {
                            datasetId: target.data.datasetID,
                        },
                        {
                            index: target.data.replicaIndex,
                        },
                    ],
                },
                { matchings: matchings }
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Asynchronously removes a matching with the specified parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `datasetId`: The unique identifier of the dataset.
     *   - `index`: The index value.
     *   - `matchingId`: The identifier of the matching to be removed.
     */
    async removeMaching(options: {
        matchingTarget: MatchingTargetEvm
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
            const contain = await this.isContainMatching({
                datasetId: target.data.datasetID,
                index: target.data.replicaIndex,
                matchingId: options.matchingId,
            })
            if (!contain) {
                return { ok: true }
            }
            const matchings = await this.getMatchings({
                datasetId: target.data.datasetID,
                index: target.data.replicaIndex,
            })
            let newMatchings = []
            for (let i = 0; i < matchings.length; i++) {
                if (options.matchingId !== matchings[i].matchingId) {
                    newMatchings.push(matchings[i])
                }
            }
            return await this.update(
                {
                    conditions: [
                        {
                            datasetId: target.data.datasetID,
                        },
                        {
                            index: target.data.replicaIndex,
                        },
                    ],
                },
                { matchings: newMatchings }
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Asynchronously updates a matching with the specified parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `storages`: The Ethereum Virtual Machine instance for storages.
     *   - `datasetId`: The unique identifier of the dataset.
     *   - `index`: The index value.
     *   - `matchingId`: The identifier of the matching to be updated.
     */
    async updateMatching(options: {
        storages: StoragesEvm
        matchingTarget: MatchingTargetEvm
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
            const count = await options.storages.getStoredCarCount(
                options.matchingId
            )
            if (!count.ok) {
                return { ok: false, error: count.error }
            }
            const storageStatistics =
                await options.storages.getMatchingStorageOverview(
                    options.matchingId
                )
            if (!storageStatistics.ok) {
                return { ok: false, error: storageStatistics.error }
            }
            let matchings = await this.getMatchings({
                datasetId: target.data.datasetID,
                index: target.data.replicaIndex,
            })
            for (let i = 0; i < matchings.length; i++) {
                if (options.matchingId === matchings[i].matchingId) {
                    matchings[i].finishedCount = Number(count.data)
                    matchings[i].finishedSize = BigInt(
                        storageStatistics.data?.completed!
                    ).toString()
                }
            }
            return await this.update(
                {
                    conditions: [
                        {
                            datasetId: target.data.datasetID,
                        },
                        {
                            index: target.data.replicaIndex,
                        },
                    ],
                },
                { matchings: matchings }
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Asynchronously updates the state of a matching with the specified parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `matchingMetadata`: The Ethereum Virtual Machine instance for matching metadata.
     *   - `datasetId`: The unique identifier of the dataset.
     *   - `index`: The index value.
     *   - `matchingId`: The identifier of the matching to update its state.
     */
    async updateMatchingState(options: {
        matchingMetadata: MatchingMetadataEvm
        matchingTarget: MatchingTargetEvm
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
            const state = await options.matchingMetadata.getMatchingState(
                options.matchingId
            )
            if (!state.ok) {
                return { ok: false, error: state.error }
            }
            if (!state.data) {
                return {
                    ok: false,
                    error: new Error("get matching state failed"),
                }
            }
            let matchings = await this.getMatchings({
                datasetId: target.data.datasetID,
                index: target.data.replicaIndex,
            })
            for (let i = 0; i < matchings.length; i++) {
                if (options.matchingId === matchings[i].matchingId) {
                    matchings[i].matchingState = Number(state.data)
                }
            }
            return await this.update(
                {
                    conditions: [
                        {
                            datasetId: target.data.datasetID,
                        },
                        {
                            index: target.data.replicaIndex,
                        },
                    ],
                },
                { matchings: matchings }
            )
        } catch (error) {
            throw error
        }
    }
}
