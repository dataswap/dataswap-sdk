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
import { ValueFields } from "@unipackage/utils"

import { EscrowType } from "../../../shared/types/escrowType"

/**
 * Represents a Fund entity.
 * @interface
 */
export interface Fund {
    total: bigint // Total amount in fund account
    locked: bigint // Lock amount in fund account for payment beneficiaries
    collateraled: bigint // Collateral amount in fund account for withdraw and punishment
    burned: bigint // burned amount in fund account
    createdBlockNumber: number // Fund account created block number
}

/**
 * Represents a Fund entity with default values.
 * @class
 */
export class Fund extends Entity<Fund> {
    constructor(data?: ValueFields<Fund>) {
        super({
            total: data?.total || BigInt(0),
            locked: data?.locked || BigInt(0),
            collateraled: data?.collateraled || BigInt(0),
            burned: data?.burned || BigInt(0),
            createdBlockNumber: data?.createdBlockNumber || 0,
        })
    }
}

/**
 * Represents a Escrow entity.
 * @interface
 */
export interface Escrow {
    type: EscrowType
    owner: string
    datasetId?: number
    matchingId?: number
    beneficiary?: string
    amount?: bigint
}

/**
 * Represents a Escrow entity with default values.
 * @class
 */
export class Escrow extends Entity<Escrow> {
    constructor(data?: ValueFields<Escrow>) {
        super({
            type: data?.type || EscrowType.DatacapCollateral,
            owner: data?.owner || "",
            ...(data?.datasetId !== undefined && { datasetId: data.datasetId }),
            ...(data?.matchingId !== undefined && {
                matchingId: data.matchingId,
            }),
            ...(data?.beneficiary !== undefined && {
                beneficiary: data.beneficiary,
            }),
            ...(data?.amount !== undefined && { amount: data.amount }),
        })
    }
}
