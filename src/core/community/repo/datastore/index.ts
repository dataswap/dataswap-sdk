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
     * @param update - The member information to be created or updated.
     * @returns - A promise resolving to the result of the operation.
     */
    async createOrUpdateMember(update: Member): Promise<Result<any>> {
        try {
            await this.lock
            let data = await this.getMember({
                address: update.address,
            })

            if (data !== undefined) {
                update.add(update, data)
            }
            return await this.CreateOrupdateByUniqueIndexes(update)
        } catch (error) {
            throw error
        } finally {
            this.lock = Promise.resolve()
        }
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
