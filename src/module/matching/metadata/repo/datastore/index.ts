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
import { BidSelectionRule, MatchingMetadata } from "../../types"
import { MatchingMetadataDocument, MatchingMetadataSchema } from "./model"
import { MongooseDataStore } from "@unipackage/datastore"
import { MatchingTargetEvm } from "../../../target/repo/evm"
import { MatchingMetadataEvm } from "../evm"
import { DatasetRequirementEvm } from "../../../../dataset/requirement/repo/evm"
import { MatchingBidsEvm } from "../../../bids/repo/evm"
import { MatchingBid, MatchingBids } from "../../../bids/types"
import { DatasetRequirement } from "../../../../dataset/requirement/types"
import { delegatedFromEthAddress, CoinType } from "@glif/filecoin-address"
/**
 * Class representing a MongoDB datastore for MatchingMetadata entities.
 * Extends the DataStore class with MatchingMetadata and MatchingMetadataDocument.
 * @class
 */
export class MatchingMetadataMongoDatastore extends DataStore<
    ValueFields<MatchingMetadata>,
    MatchingMetadataDocument
> {
    /**
     * Creates an instance of MatchingMetadataMongoDatastore.
     * @param {string} uri - The MongoDB connection URI.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<
                ValueFields<MatchingMetadata>,
                MatchingMetadataDocument
            >("MatchingMetadata", MatchingMetadataSchema, connection)
        )
    }

    /**
     * Asynchronously stores data with the original matching metadata and the specified parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `matchingMetadata`: The Ethereum Virtual Machine instance for matching metadata.
     *   - `datasetRequirement`: The Ethereum Virtual Machine instance for dataset requirement.
     *   - `origionMetadata`: The original matching metadata.
     *   - `matchingId`: The identifier of the matching.
     */
    async storeWithOrigionMatchingMetadata(options: {
        matchingMetadata: MatchingMetadataEvm
        datasetRequirement: DatasetRequirementEvm
        origionMetadata: MatchingMetadata
        matchingId: number
    }): Promise<Result<any>> {
        try {
            const state = await options.matchingMetadata.getMatchingState(
                options.matchingId
            )
            if (!state.ok) {
                return { ok: false, error: state.error }
            }

            options.origionMetadata.status = Number(state.data)

            const requirement =
                await options.datasetRequirement.getDatasetReplicaRequirement(
                    options.origionMetadata.datasetId!,
                    options.origionMetadata.replicaIndex!
                )

            if (!requirement.ok) {
                return { ok: false, error: requirement.error }
            }

            options.origionMetadata.requirement = new DatasetRequirement({
                dataPreparers: requirement.data!.dataPreparers,
                storageProviders: requirement.data!.storageProviders,
                regionCode: requirement.data!.regionCode,
                countryCode: requirement.data!.countryCode,
                cityCodes: requirement.data!.cityCodes,
                index: requirement.data!.index,
                datasetId: requirement.data!.datasetId,
            })
            return await this.CreateOrupdateByUniqueIndexes(
                options.origionMetadata
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Asynchronously updates the state of a matching with the specified parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `matchingMetadata`: The Ethereum Virtual Machine instance for matching metadata.
     *   - `matchingId`: The identifier of the matching to update its state.
     */
    async updateMatchingState(options: {
        matchingMetadata: MatchingMetadataEvm
        matchingId: number
    }): Promise<Result<any>> {
        try {
            const state = await options.matchingMetadata.getMatchingState(
                options.matchingId
            )
            if (!state.ok) {
                return { ok: false, error: state.error }
            }
            return await this.update(
                { conditions: [{ matchingId: options.matchingId }] },
                {
                    status: Number(state.data),
                }
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Asynchronously updates the target info of a matching with the specified parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `matchingTarget`: The Ethereum Virtual Machine instance for matching target.
     *   - `matchingId`: The identifier of the matching to update its size.
     */
    async updateMatchingTargetInfo(options: {
        matchingTarget: MatchingTargetEvm
        matchingId: number
    }): Promise<Result<any>> {
        try {
            const target = await options.matchingTarget.getMatchingTarget(
                options.matchingId
            )
            if (!target.ok) {
                return { ok: false, error: target.error }
            }

            return await this.update(
                { conditions: [{ matchingId: options.matchingId }] },
                {
                    size: target.data!.size,
                    //subsidy: target.data!.subsidy,
                    //TODO: get subsidy from finance
                }
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Asynchronously updates the winner of a matching based on the provided options.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `matchingBids`: The MatchingBidsEvm instance for the matching.
     *   - `matchingId`: The identifier of the matching for which the winner is to be updated.
     * @returns A promise representing the result of the update operation.
     */
    async updateMatchingWinner(options: {
        matchingBids: MatchingBidsEvm
        matchingId: number
    }): Promise<Result<any>> {
        try {
            const winner = await options.matchingBids.getMatchingWinner(
                options.matchingId
            )
            if (winner.ok) {
                return await this.update(
                    { conditions: [{ matchingId: options.matchingId }] },
                    {
                        winner: delegatedFromEthAddress(
                            winner.data!,
                            CoinType.MAIN
                        ),
                    }
                )
            }
            return { ok: true }
        } catch (error) {
            throw error
        }
    }

    /**
     * Asynchronously updates the matching data unit price based on the provided options.
     * @param options An object containing the necessary parameters:
     *                - datasetRequirementEvm: The dataset requirement Ethereum virtual machine.
     *                - matchingTarget: The matching target Ethereum virtual machine.
     *                - matchingBids: The matching bids Ethereum virtual machine.
     *                - matchingId: The ID of the matching.
     *                - height: The height of the dataset.
     * @returns A promise that resolves to a Result object.
     */
    async updateMatchingDataUnitPrice(options: {
        datasetRequirementEvm: DatasetRequirementEvm
        matchingTarget: MatchingTargetEvm
        matchingBids: MatchingBidsEvm
        matchingId: number
        height: bigint
    }): Promise<Result<any>> {
        try {
            const target = await options.matchingTarget.getMatchingTarget(
                options.matchingId
            )
            if (!target.ok) {
                return { ok: false, error: target.error }
            }

            const requirement =
                await options.datasetRequirementEvm.getDatasetReplicaRequirement(
                    target.data!.datasetID,
                    target.data!.replicaIndex
                )
            if (!requirement.ok) {
                return { ok: false, error: requirement.error }
            }

            let hasSpecifiedStorageProvider: boolean = false
            if (requirement.data?.storageProviders.length != 0) {
                hasSpecifiedStorageProvider = true
            }

            const winner = await options.matchingBids.getMatchingWinner(
                options.matchingId
            )

            if (!winner.ok) {
                return { ok: false, error: winner.error }
            }

            const ammount = await options.matchingBids.getMatchingBidAmount(
                options.matchingId,
                winner.data!
            )

            if (!ammount.ok) {
                return { ok: false, error: ammount.error }
            }
            const dataUnitPrice = ammount.data! / BigInt(target.data!.size)

            return await this.update(
                { conditions: [{ matchingId: options.matchingId }] },
                {
                    hasSpecifiedStorageProvider: hasSpecifiedStorageProvider,
                    dataUnitPrice: dataUnitPrice,
                    completedHeight: options.height,
                }
            )
            return { ok: true }
        } catch (error) {
            throw error
        }
    }

    /**
     * Private method to retrieve the best bid based on the specified rule and bids.
     *
     * @param rule - The bid selection rule.
     * @param bids - The collection of matching bids.
     * @returns The best matching bid based on the specified rule.
     */
    private _getBestBid(
        rule: BidSelectionRule,
        bids: MatchingBids
    ): MatchingBid {
        if (bids.bidders.length == 0) {
            throw new Error("bids is none")
        }
        let best: MatchingBid = new MatchingBid({
            bidder: bids.bidders[0],
            amount: bids.amounts[0],
            complyFilplusRule: bids.complyFilplusRules[0],
            matchingId: bids.matchingId,
        })
        for (let i = 0; i < bids.bidders.length; i++) {
            if (
                rule === BidSelectionRule.ImmediateAtLeast ||
                rule === BidSelectionRule.HighestBid
            ) {
                if (bids.amounts[i] > best.amount) {
                    best = new MatchingBid({
                        bidder: bids.bidders[i],
                        amount: bids.amounts[i],
                        complyFilplusRule: bids.complyFilplusRules[i],
                        matchingId: bids.matchingId,
                    })
                }
            } else {
                if (bids.amounts[i] < best.amount) {
                    best = new MatchingBid({
                        bidder: bids.bidders[i],
                        amount: bids.amounts[i],
                        complyFilplusRule: bids.complyFilplusRules[i],
                        matchingId: bids.matchingId,
                    })
                }
            }
        }

        return best
    }

    /**
     * Asynchronously updates the bidding information of a matching with the specified parameters.
     *
     * @param options - The options object containing the necessary parameters.
     *   - `matchingMetadata`: The Ethereum Virtual Machine instance for matching metadata.
     *   - `matchingBids`: The Ethereum Virtual Machine instance for matching bids.
     *   - `matchingId`: The identifier of the matching to update its bidding information.
     */
    async updateMatchingBiddingInfo(options: {
        matchingMetadata: MatchingMetadataEvm
        matchingBids: MatchingBidsEvm
        matchingId: number
    }): Promise<Result<any>> {
        try {
            const metadata = await options.matchingMetadata.getMatchingMetadata(
                options.matchingId
            )
            if (!metadata.ok) {
                return { ok: false, error: metadata.error }
            }
            const bidSelectionRule = metadata.data!.bidSelectionRule

            const bids = await options.matchingBids.getMatchingBids(
                options.matchingId
            )
            if (!bids.ok) {
                return { ok: false, error: bids.error }
            }

            const best = this._getBestBid(bidSelectionRule, bids.data!)

            return await this.update(
                { conditions: [{ matchingId: options.matchingId }] },
                {
                    currentPrice: best.amount,
                    biddingStartBlock:
                        metadata.data!.createdBlockNumber! +
                        metadata.data!.biddingDelayBlockCount +
                        metadata.data!.pausedBlockCount!,
                    biddingEndBlock:
                        metadata.data!.createdBlockNumber! +
                        metadata.data!.biddingDelayBlockCount +
                        metadata.data!.pausedBlockCount! +
                        metadata.data!.biddingPeriodBlockCount,
                }
            )
        } catch (error) {
            throw error
        }
    }
}
