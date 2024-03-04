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
import { DatasetState } from "../../../../shared/types/datasetType"

/**
 * Interface representing metadata information for a dataset.
 * @interface
 */
export interface DatasetMetadata {
    title: string
    industry: string
    name: string
    description: string
    source: string
    accessMethod: string
    // set submitter and createdBlockNumber is optional,because this interface must mathed the txinput decode params(submitmetadata)
    submitter?: string
    createdBlockNumber?: number
    sizeInBytes: bigint
    isPublic: boolean
    version: bigint
    proofBlockCount?: bigint
    auditBlockCount?: bigint
    associatedDatasetId?: number
    challengeCommissionPrice?: bigint
    completedHeight?: bigint
    datasetId?: number
    status?: DatasetState
}

/**
 * Class representing a DatasetMetadata entity.
 * @class
 * @extends Entity<DatasetMetadata>
 */
export class DatasetMetadata extends Entity<DatasetMetadata> {}

/**
 * Interface representing timeout parameters information for a dataset.
 * @interface
 */
export interface DatasetTimeoutParameters {
    proofBlockCount: bigint
    auditBlockCount: bigint
    datasetId?: number
}

/**
 * Class representing a DatasetTimeoutParameters entity.
 * @class
 * @extends Entity<DatasetTimeoutParameters>
 */
export class DatasetTimeoutParameters extends Entity<DatasetTimeoutParameters> {}
