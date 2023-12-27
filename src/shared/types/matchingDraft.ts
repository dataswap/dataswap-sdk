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

/**
 * Interface representing the creation information for a matching.
 */
export interface MatchingCreateInfo {
    mockSubmitter?: string
    auctionPeriod: Array<any>
    initialPrice: number
    storageCompletePeriod: number
    storageLifecycle: number
    dataTransferType: string
    datalocation: string
    dpBandwidthSpeed: string
    spLocation: string
    spBandwidthSpeed: string
}

/**
 * Interface representing the overview information for a matching.
 */
export interface MatchingOverviewType extends MatchingCreateInfo {
    id: number
    datasetId: string
    replicaId: string
    size: string
    createdTime: string
    submitter: string
    state: string
    operate: string
    bids?: any
    winner?: any
}

/**
 * Interface representing the creation information for a matching bid.
 */
export interface MatchingBidCreateInfo {
    bidder: string
    bid: number
}

/**
 * Interface representing the type of a matching bid.
 */
export interface MatchingBidType extends MatchingBidCreateInfo {
    bidTime: string
}
