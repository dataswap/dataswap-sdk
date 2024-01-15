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
import { ValueFields } from "@unipackage/utils"
import { MatchingBid } from "../../types"
import { MatchingBidDocument, MatchingBidSchema } from "./model"
import { MongooseDataStore } from "@unipackage/datastore"
import { MatchingBidsEvm } from "../evm"
import { newDelegatedEthAddress } from "@glif/filecoin-address"
/**
 * Class representing a MongoDB datastore for MatchingBid entities.
 * Extends the DataStore class with MatchingBid and MatchingBidDocument.
 * @class
 */
export class MatchingBidMongoDatastore extends DataStore<
    ValueFields<MatchingBid>,
    MatchingBidDocument
> {
    /**
     * Creates an instance of MatchingBidMongoDatastore.
     * @param {string} uri - The MongoDB connection URI.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<MatchingBid>,
                MatchingBidDocument
            >("MatchingBid", MatchingBidSchema, connection)
        )
    }

    /**
     * Asynchronously stores a matching bid with the specified parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `matchingBids`: The Ethereum Virtual Machine instance for matching bids.
     *   - `matchingBid`: The matching bid to be stored.
     */
    async storeMatchingBid(options: {
        matchingBids: MatchingBidsEvm
        origionMatchingBid: MatchingBid
    }) {
        try {
            const bids = await options.matchingBids.getMatchingBids(
                options.origionMatchingBid.matchingId!
            )
            if (!bids.ok) {
                throw bids.error
            }
            for (let i = 0; i < bids.data!.bidders.length; i++) {
                if (
                    options.origionMatchingBid.bidder ===
                    newDelegatedEthAddress(bids.data!.bidders[i]).toString()
                ) {
                    await this.CreateOrupdateByUniqueIndexes(
                        new MatchingBid({
                            bidder: options.origionMatchingBid.bidder,
                            amount: options.origionMatchingBid.amount,
                            complyFilplusRule: bids.data!.complyFilplusRules[i],
                            matchingId: options.origionMatchingBid.matchingId!,
                        })
                    )
                    return
                }
            }
        } catch (error) {
            throw error
        }
    }
}
