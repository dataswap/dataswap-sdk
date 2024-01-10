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
 * Interface representing dataset requirements.
 * @interface
 */
export interface DatasetRequirement {
    dataPreparers: string[]
    storageProviders: string[]
    regionCode: bigint
    countryCode: bigint
    cityCodes: number[]
    index?: bigint
    datasetId?: number
}

/**
 * Class representing a dataset requirement entity.
 * @class
 * @extends {Entity<DatasetRequirement>}
 */
export class DatasetRequirement extends Entity<DatasetRequirement> {}

/**
 * Interface representing the requirements for a dataset, including data preparers, storage providers, and geographic codes.
 */
export interface DatasetRequirements {
    dataPreparers: string[][]
    storageProviders: string[][]
    regions: bigint[]
    countrys: bigint[]
    citys: bigint[][]
    amount: bigint
    datasetId?: number
}

/**
 * Class representing a dataset requirements entity.
 * @class
 * @extends {Entity<DatasetRequirements>}
 */
export class DatasetRequirements extends Entity<DatasetRequirements> {}
