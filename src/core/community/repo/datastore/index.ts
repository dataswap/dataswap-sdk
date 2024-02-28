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
import { Member, FinanceAccount } from "../../types"
import { MemberDocument, MemberSchema } from "./model"
import { MongooseDataStore } from "@unipackage/datastore"

/**
 * Class representing a MongoDB datastore for Member entities.
 * Extends the DataStore class with Member and MemberDocument.
 * @class
 */
export class MemberMongoDatastore extends DataStore<
    ValueFields<Member>,
    MemberDocument
> {
    /**
     * Creates an instance of MemberMongoDatastore.
     * @param {string} uri - The MongoDB connection URI.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<ValueFields<Member>, MemberDocument>(
                "Member",
                MemberSchema,
                connection
            )
        )
    }

    /**
     * Asynchronously adds a FinanceAccount with the specified parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `address`: Member address
     *   - `datasetId`: The ID of the dataset
     *   - `matchingId`: The ID of the matching
     *   - `token`: The type of token for the escrow requirement (e.g., FIL, ERC-20)
     */
    async addFinanceAccount(options: {
        address: string
        datasetId: number
        matchingId: number
        token: string
    }): Promise<Result<any>> {
        try {
            const contain = await this.isContainFinanceAccount({
                address: options.address,
                datasetId: options.datasetId,
                matchingId: options.matchingId,
                token: options.token,
            })

            if (contain) {
                return {
                    ok: false,
                    error: new Error("FinanceAccount already exist"),
                }
            }

            let financeAccounts = await this.getFinanceAccounts({
                address: options.address,
            })

            financeAccounts.push(
                new FinanceAccount({
                    datasetId: options.datasetId,
                    matchingId: options.matchingId,
                    token: options.token,
                })
            )
            return await this.update(
                {
                    conditions: [
                        {
                            address: options.address,
                        },
                    ],
                },
                { financeAccounts: financeAccounts }
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Asynchronously checks if the specified member contains a FinanceAccount with the given parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `address`: Member address
     *   - `datasetId`: The ID of the dataset
     *   - `matchingId`: The ID of the matching
     *   - `token`: The type of token for the escrow requirement (e.g., FIL, ERC-20)
     */
    private async isContainFinanceAccount(options: {
        address: string
        datasetId: number
        matchingId: number
        token: string
    }): Promise<boolean> {
        const res = await this.find({
            conditions: [{ address: options.address }],
        })
        if (!res.ok) {
            throw res.error
        }

        if (res.data!.length != 0) {
            const current = new FinanceAccount({
                datasetId: options.datasetId,
                matchingId: options.matchingId,
                token: options.token,
            })
            for (let i = 0; i < res.data![0].financeAccounts!.length; i++) {
                if (res.data![0].financeAccounts![i] == current) {
                    return true
                }
            }
        }

        return false
    }

    /**
     * Asynchronously retrieves FinanceAccounts based on the specified address.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `address`: Member address
     * @returns A promise that resolves to an array of FinanceAccount objects.
     */
    private async getFinanceAccounts(options: {
        address: string
    }): Promise<FinanceAccount[]> {
        const res = await this.find({
            conditions: [{ address: options.address }],
        })
        if (!res.ok) {
            throw res.error
        }

        if (res.data!.length == 0) {
            throw new Error("the FinanceAccounts is none")
        }

        return res.data![0].financeAccounts!
    }
}
