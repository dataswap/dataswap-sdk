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
 * Interface representing the creation information for a dataset.
 */
export interface DatasetCreateInfo {
    name: string
    description?: string
    size: string
    industry?: string
    source?: string
    accessMethod?: string
    version?: string
    ownername?: string
    ownercountry?: string
    ownerwebsite?: string
    isPublic?: boolean
    replicasRequiredNumber?: string
    replicasCountries?: Array<string>
    dpFee?: number
}

/**
 * Interface representing the creation information for a dataset proof.
 */
export interface DatasetProofCreateInfo {
    rootHash?: string
    leafHashesCount?: number
    completed?: boolean
}

/**
 * Interface representing the creation information for a dataset challenge.
 */
export interface DatasetChallengeCreateInfo {
    mockDa?: string
    challenge: string
    estimatedDaFee?: number
}

/**
 * Interface representing the creation information for a dataset dispute.
 */
export interface DatasetDisputeCreateInfo {
    mockSubmitter?: string
    mockResult?: boolean
    disputeProof: string
}

/**
 * Interface representing the overview of a dataset, combining create information, proof information, and additional metadata.
 */
export interface DatasetOverviewType
    extends DatasetCreateInfo,
    DatasetProofCreateInfo {
    id: number
    createdHeight: string
    createdTime: string
    submitter: string
    state: string
    operate: string
    proofs?: any
    proofChallenge?: any
    disputes?: any
    replicasDetail?: any
}

/**
 * Interface representing the type of a dataset proof.
 */
export interface DatasetProofType {
    hash: string
    cid: string
    size: string
}

/**
 * Interface representing the type of a dataset challenge proof.
 */
export interface DatasetChallengeProofType {
    da: string
    challenge: string
    operate: string
}

/**
 * Interface representing the type of a dataset dispute.
 */
export interface DatasetDisputeType {
    submitter: string
    da: string
    challenge: string
    disputeProof: string
    result: string
}

/**
 * Interface representing the type of dataset replicas.
 */
export interface DatasetReplicasType {
    id: string
    country: string
    dp: string
    state: string
    operate: string
}
