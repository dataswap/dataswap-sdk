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

import { ReleaseType } from "../../../shared/types/financeType"

/**
 * Represents a AccountOverview entity.
 * @interface
 */
export interface AccountOverview {
    deposited: bigint // Total deposited.
    withdrawn: bigint // Total withdrawn.
    burned: bigint // Total burned.
    balance: bigint // Total balance = availabe + locks + escrows.
    available: bigint // available amount.
    locks: bigint // locks amount.
    escrows: bigint // escrows amount.
}

/**
 * Represents a AccountIncome entity.
 * @interface
 */
export interface AccountIncome {
    total: bigint // Total amount.
    lock: bigint // lock amount.
}

/**
 * Represents a AccountEscrow entity.
 * @interface
 */
export interface AccountEscrow {
    latestHeight: bigint // Account created block number.
    expenditure: bigint // Expenditure amount.
    current: bigint // Current available amount.
    total: bigint // Total amount.
}

/**
 * Represents a ReleaseRule entity.
 * @interface
 */
export interface ReleaseRule {
    releaseType: ReleaseType
    delayBlocks: bigint
    durationBlocks: bigint
}

/**
 * Represents a AccountOverview entity with default values.
 * @class
 */
export class AccountOverview extends Entity<AccountOverview> {
    constructor(data?: ValueFields<AccountOverview>) {
        super({
            deposited: data?.deposited || BigInt(0),
            withdrawn: data?.withdrawn || BigInt(0),
            burned: data?.burned || BigInt(0),
            balance: data?.balance || BigInt(0),
            available: data?.available || BigInt(0),
            locks: data?.locks || BigInt(0),
            escrows: data?.escrows || BigInt(0),
        })
    }
}

/**
 * Represents a AccountIncome entity with default values.
 * @class
 */
export class AccountIncome extends Entity<AccountIncome> {
    constructor(data?: ValueFields<AccountIncome>) {
        super({
            total: data?.total || BigInt(0),
            lock: data?.lock || BigInt(0),
        })
    }
}

/**
 * Represents a AccountEscrow entity with default values.
 * @class
 */
export class AccountEscrow extends Entity<AccountEscrow> {
    constructor(data?: ValueFields<AccountEscrow>) {
        super({
            latestHeight: data?.latestHeight || BigInt(0),
            expenditure: data?.expenditure || BigInt(0),
            current: data?.current || BigInt(0),
            total: data?.total || BigInt(0),
        })
    }
}

/**
 * Represents a ReleaseRule entity with default values.
 * @class
 */
export class ReleaseRule extends Entity<ReleaseRule> {
    constructor(data?: ValueFields<ReleaseRule>) {
        super({
            releaseType: data?.releaseType || ReleaseType.Linear,
            delayBlocks: data?.delayBlocks || BigInt(0),
            durationBlocks: data?.durationBlocks || BigInt(0),
        })
    }
}
