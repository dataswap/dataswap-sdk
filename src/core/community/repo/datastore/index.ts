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
import { Member } from "../../types"
import { MemberDocument, MemberSchema } from "./model"
import { MongooseDataStore } from "@unipackage/datastore"
import { MatchingTargetEvm } from "../../../../module/matching/target/repo/evm"

/**
 * Class representing a MongoDB datastore for Member entities.
 * Extends the DataStore class with Member and MemberDocument.
 * @class
 */
export class MemberMongoDatastore extends DataStore<
    ValueFields<Member>,
    MemberDocument
> {
    private lock: Promise<void> = Promise.resolve()
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
     * Creates or updates a member in the datastore.
     *
     * @param arg - The member information to be created or updated or the options object.
     * @returns - A promise resolving to the result of the operation.
     */
    async createOrUpdateMember(
        arg:
            | Member
            | {
                  matchingTarget: MatchingTargetEvm
                  update: Member
              }
    ): Promise<Result<any>> {
        if ("matchingTarget" in arg && "update" in arg) {
            const datasetId = await this.getDatasetId({
                matchingTarget: arg.matchingTarget,
                matchingId: arg.update.financeAccounts[0].matchingId,
            })
            arg.update.financeAccounts[0].datasetId = datasetId
            return await this.createOrUpdateMember(arg.update)
        } else {
            try {
                await this.lock
                let data = await this.getMember({
                    address: arg.address,
                })

                if (data !== undefined) {
                    arg.add(arg, data)
                }
                return await this.CreateOrupdateByUniqueIndexes(arg)
            } catch (error) {
                throw error
            } finally {
                this.lock = Promise.resolve()
            }
        }
    }

    /**
     * Retrieves the dataset ID associated with the provided MatchingTarget and Matching ID.
     *
     * @param options - The options object containing MatchingTarget and Matching ID.
     * @param options.matchingTarget - The MatchingTargetEvm instance.
     * @param options.matchingId - The Matching ID.
     * @returns - A promise resolving to the dataset ID.
     * @throws Will throw an error if fetching the matching target fails.
     */
    private async getDatasetId(options: {
        matchingTarget: MatchingTargetEvm
        matchingId: number
    }): Promise<number> {
        const target = await options.matchingTarget.getMatchingTarget(
            options.matchingId
        )
        if (!(target.ok || target.data)) {
            throw {
                ok: false,
                error: new Error("get matching target failed"),
            }
        }

        return target.data!.datasetID
    }

    /**
     * Fetches a member's information based on the provided address.
     * @param options - The options containing the member's address.
     * @param options.address - The address of the member.
     * @returns A promise that resolves to a `ValueFields` object containing the member's information, or `undefined` if not found.
     * @throws If there is an error during the fetch, it will be thrown.
     */
    private async getMember(options: {
        address: string
    }): Promise<ValueFields<Member> | undefined> {
        const res = await this.find({
            conditions: [{ address: options.address }],
        })
        if (!res.ok) {
            throw res.error
        }

        if (res.data!.length == 0) {
            return undefined
        }

        return res.data![0]
    }
}
