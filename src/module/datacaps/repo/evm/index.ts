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

import {
    withCallMethod,
    withSendMethod,
    EvmOutput,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"
import { EvmEx } from "../../../../shared/types/evmEngineType"

/**
 * Interface for EVM calls related to  Datacaps.
 */
interface DatacapsCallEvm {
    /**
     * @notice Get the updated collateral funds for datacap chunk based on real-time business data
     * @param matchingId The ID of the matching
     * @return The updated collateral funds required
     */
    getDatacapChunkCollateralFunds(
        matchingId: number
    ): Promise<EvmOutput<bigint>>

    /**
     * @notice Get the updated burn funds for datacap chunk based on real-time business data
     * @param matchingId The ID of the matching
     * @return The updated burn funds required
     */
    getDatacapChunkBurnFunds(matchingId: number): Promise<EvmOutput<bigint>>

    /**
     * @notice Get collateral funds requirement for allocate chunk datacap
     */
    getCollateralRequirement(): Promise<EvmOutput<bigint>>

    /**
     * @dev Gets the allocated matched datacap for a storage.
     * @param matchingId The ID of the matching process.
     * @return The allocated datacap size.
     */
    getAvailableDatacap(matchingId: number): Promise<EvmOutput<number>>

    /**
     * @dev Gets the allocated matched datacap for a matching process.
     * @param _matchingId The ID of the matching process.
     * @return The allocated datacap size.
     */
    getAllocatedDatacap(matchingId: number): Promise<EvmOutput<number>>

    /**
     * @dev Gets the total datacap size needed to be allocated for a matching process.
     * @param _matchingId The ID of the matching process.
     * @return The total datacap size needed.
     */
    getTotalDatacapAllocationRequirement(
        matchingId: number
    ): Promise<EvmOutput<number>>

    /**
     * @dev Gets the remaining datacap size needed to be allocated for a matching process.
     * @param _matchingId The ID of the matching process.
     * @return The remaining datacap size needed.
     */
    getRemainingUnallocatedDatacap(
        matchingId: number
    ): Promise<EvmOutput<number>>

    /**
     * @dev Checks if the next datacap allocation is allowed for a matching process.
     * @param _matchingId The ID of the matching process.
     * @return True if next allocation is allowed, otherwise false.
     */
    isNextDatacapAllocationValid(
        matchingId: number
    ): Promise<EvmOutput<boolean>>
}

/**
 * Interface for EVM transactions related to  Datacaps.
 */
interface DatacapsSendEvm {
    /**
     * @notice Add collateral funds for allocating datacap chunk
     * @param matchingId The ID of the matching
     * @param options The options of transaction.
     */
    addDatacapChunkCollateral(
        matchingId: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * @dev Requests the allocation of matched datacap for a matching process.
     * @param matchingId The ID of the matching process.
     * @param options The options of transaction.
     */
    requestAllocateDatacap(
        matchingId: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<number>>
}

/**
 * Combined interface for EVM calls and transactions related to  Datacaps.
 */
export interface DatacapsOriginEvm extends DatacapsCallEvm, DatacapsSendEvm {}

/**
 * Implementation of  DatacapsOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "getDatacapChunkCollateralFunds",
    "getDatacapChunkBurnFunds",
    "getCollateralRequirement",
    "getAvailableDatacap",
    "getAllocatedDatacap",
    "getTotalDatacapAllocationRequirement",
    "getRemainingUnallocatedDatacap",
    "isNextDatacapAllocationValid",
])
@withSendMethod(["addDatacapChunkCollateral", "requestAllocateDatacap"])
export class DatacapsOriginEvm extends EvmEx {}

/**
 * Extended class for  DatacapsOriginEvm with additional message decoding.
 */
export class DatacapsEvm extends DatacapsOriginEvm {
    /**
     * Decode a DataswapMessage from an EVM message.
     *
     * @param msg - Message to decode.
     * @returns EvmOutput containing the decoded DataswapMessage.
     */
    decodeMessage(msg: Message): EvmOutput<DataswapMessage> {
        const decoder = new ContractMessageDecoder(this)
        const decodeRes = decoder.decode(msg)
        if (!decodeRes.ok && !decodeRes.data) {
            return { ok: false, error: decodeRes.error }
        }

        let result: DataswapMessage = decodeRes.data!.value() as DataswapMessage
        switch (decodeRes.data!.method) {
            case "addDatacapChunkCollateral":
            case "requestAllocateDatacap":
                result.matchingId = Number(result.params.matchingId)
                break
            default:
                return {
                    ok: false,
                    error: "Not support method!",
                }
        }

        return {
            ok: true,
            data: result,
        }
    }
}
