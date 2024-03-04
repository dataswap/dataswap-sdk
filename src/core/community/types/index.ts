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
import { ValueFields, Result } from "@unipackage/utils"

/**
 * Represents a Member entity.
 * @interface
 */
export interface Member {
    address: string // Member address
    totalDatasetsSubmitted: number // Total count of datasets submitted
    totalProofSubmitted: number // Total count of proof submitted
    totalChallengeSubmitted: number // Total count of challenge submitted
    totalMatchingSubmitted: number // Total count of matching submitted
    totalDisputeSubmitted: number // Total count of dispute submitted
    storageClient: boolean // Storage client tags
    storageProvider: boolean // Storage provider tags
    datasetPreparer: boolean // dataset provider tags
    datasetAuditer: boolean // dataset auditer tags
    financeAccounts: FinanceAccount[]
}

/**
 * Represents a Member entity.
 * @interface
 */
export interface FinanceAccount {
    datasetId: number // The ID of the dataset
    matchingId: number // The ID of the matching
    token: string // The type of token for the escrow requirement (e.g., FIL, ERC-20)
}

/**
 * Represents a Member entity with default values.
 * @class
 */
export class Member extends Entity<Member> {
    constructor(data?: ValueFields<Member>) {
        super({
            address: data?.address || "0",
            totalDatasetsSubmitted: data?.totalDatasetsSubmitted || 0,
            totalProofSubmitted: data?.totalProofSubmitted || 0,
            totalChallengeSubmitted: data?.totalChallengeSubmitted || 0,
            totalMatchingSubmitted: data?.totalMatchingSubmitted || 0,
            totalDisputeSubmitted: data?.totalDisputeSubmitted || 0,
            storageClient: data?.storageClient || false,
            storageProvider: data?.storageProvider || false,
            datasetPreparer: data?.datasetPreparer || false,
            datasetAuditer: data?.datasetAuditer || false,
            financeAccounts: data?.financeAccounts || [],
        })
    }

    /**
     * Adds the provided member data to the existing member.
     *
     * @param self - The member to which data will be added.
     * @param data - The data to be added to the member.
     * @returns - A promise resolving to the result of the operation.
     */
    async add(
        self: ValueFields<Member>,
        data: ValueFields<Member>
    ): Promise<Result<any>> {
        if (self.address !== data.address) {
            return {
                ok: false,
                error: Error("the add Member address is different"),
            }
        }

        self.totalChallengeSubmitted += data.totalChallengeSubmitted
        self.totalDatasetsSubmitted += data.totalDatasetsSubmitted
        self.totalDisputeSubmitted += data.totalDisputeSubmitted
        self.totalMatchingSubmitted += data.totalMatchingSubmitted
        self.totalProofSubmitted += data.totalProofSubmitted
        self.storageClient = self.storageClient || data.storageClient
        self.storageProvider = self.storageProvider || data.storageProvider
        self.datasetAuditer = self.datasetAuditer || data.datasetAuditer
        self.datasetPreparer = self.datasetPreparer || data.datasetPreparer

        self.financeAccounts = [
            ...self.financeAccounts,
            ...data.financeAccounts.filter(
                (obj) =>
                    !self.financeAccounts.some(
                        (el) =>
                            el.datasetId === obj.datasetId &&
                            el.matchingId === obj.matchingId &&
                            el.token === obj.token
                    )
            ),
        ]

        return { ok: true, data: self }
    }
}

/**
 * Represents a FinanceAccount entity with default values.
 * @class
 */
export class FinanceAccount extends Entity<FinanceAccount> {
    constructor(data?: ValueFields<FinanceAccount>) {
        super({
            datasetId: data?.datasetId || 0,
            matchingId: data?.matchingId || 0,
            token: data?.token || "0",
        })
    }
}
