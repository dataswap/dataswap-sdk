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
import { Entity } from "@unipackage/ddd"

/**
 * Represents basic statistics information.
 */
export interface BasicStatistics {
    totalCounts: number // Total count
    successCounts: number // Count of successful operations
    ongoingCounts: number // Count of ongoing operations
    failedCounts: number // Count of failed operations
    totalSize: number // Total size
    successSize: number // Count of successful size
    ongoingSize: number // Count of ongoing size
    failedSize: number // Count of failed size
    height: bigint // current height
}

export class BasicStatistics extends Entity<BasicStatistics> {}

/**
 * Represents basic statistics information.
 */
export interface BasicStatisticsInfo {
    total: number // Total count
    success: number // Count of successful operations
    ongoing: number // Count of ongoing operations
    failed: number // Count of failed operations
    height?: bigint // current height
}

export class BasicStatisticsInfo extends Entity<BasicStatisticsInfo> {}

/**
 * Interface representing storage statistics information.
 */
export interface StorageStatisticsInfo {
    dataswapTotal: bigint // Total dataswap capacity (optional).
    total: bigint // Total storage capacity.
    completed: bigint // Completed storage capacity.
    usedDatacap: bigint // Used data capacity.
    availableDatacap: bigint // Available data capacity.
    canceled: bigint // Canceled storage capacity.
    unallocatedDatacap: bigint // Unallocated data capacity.
}

export class StorageStatisticsInfo extends Entity<StorageStatisticsInfo> {}

/**
 * Interface representing storage related dataset statistics information.
 */
export interface DatasetStorageStatisticsInfo {
    total: bigint // Total storage capacity.
    completed: bigint // Completed storage capacity.
    usedDatacap: bigint // Used data capacity.
    availableDatacap: bigint // Available data capacity.
    canceled: bigint // Canceled storage capacity.
    unallocatedDatacap: bigint // Unallocated data capacity.
    datasetId: number // Dataset ID (optional).
    replicaIndex?: bigint // Replica index (optional).
}

export class DatasetStorageStatisticsInfo extends Entity<DatasetStorageStatisticsInfo> {}

/**
 * Interface representing storage related matching statistics information.
 */
export interface MatchingStorageStatisticsInfo {
    total: bigint // Total storage capacity.
    completed: bigint // Completed storage capacity.
    usedDatacap: bigint // Used data capacity.
    availableDatacap: bigint // Available data capacity.
    canceled: bigint // Canceled storage capacity.
    unallocatedDatacap: bigint // Unallocated data capacity.
    storageProviders?: number[] // List of storage providers (optional).
    matchingId: number // Matching ID (optional).
    datasetId?: number // Dataset ID (optional).
    replicaIndex?: bigint // Replica index (optional).
}

export class MatchingStorageStatisticsInfo extends Entity<MatchingStorageStatisticsInfo> {}
