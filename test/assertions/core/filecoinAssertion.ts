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

import { assert } from "chai"
import { equal } from "@unipackage/utils"
import { FilecoinEvm } from "../../../src/core/filecoin/repo/evm"
import { handleEvmError } from "../../shared/error"
import { DealState } from "../../../src/shared/types/filecoinType"
import { IFilecoinAssertion } from "../../interfaces/assertions/core/IFilecoinAssertion"

/**
 * Class for asserting operations on a FilecoinEvm instance.
 */
export class FilecoinAssertion implements IFilecoinAssertion {
    private filecoin: FilecoinEvm

    /**
     * Creates a new instance of FilecoinAssertion.
     * @param {FilecoinEvm} filecoin - The FilecoinEvm instance to assert operations on.
     */
    constructor(filecoin: FilecoinEvm) {
        this.filecoin = filecoin
    }

    /**
     * Asserts the state of a replica deal.
     * @param {string} cid - The content identifier (CID) of the replica.
     * @param {number} claimId - The claim ID of the replica deal.
     * @param {DealState} expectState - The expected state of the replica deal.
     * @returns {Promise<void>}
     */
    async getReplicaDealStateAssertion(
        cid: string,
        claimId: number,
        expectState: DealState
    ): Promise<void> {
        let state = await handleEvmError(
            this.filecoin.getReplicaDealState(cid, claimId)
        )
        assert.isTrue(
            equal(expectState, state.data),
            "ReplicaDealState should be expect state"
        )
    }

    /**
     * Asserts the data of a replica claim.
     * @param {number} provider - The provider of the replica claim.
     * @param {number} claimId - The claim ID of the replica.
     * @param {string} expectData - The expected data of the replica claim.
     * @returns {Promise<void>}
     */
    async getReplicaClaimDataAssertion(
        provider: number,
        claimId: number,
        expectData: string
    ): Promise<void> {
        let data = await handleEvmError(
            this.filecoin.getReplicaClaimData(provider, claimId)
        )
        assert.isTrue(
            equal(expectData, data.data),
            "ReplicaClaimData should be expect data"
        )
    }
}
