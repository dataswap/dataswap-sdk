import {
    Evm,
    withCallMethod,
    withSendMethod,
    EvmOutput
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"

/**
 * Interface for EVM calls related to  Datacaps.
 */
interface DatacapsCallEvm {
    /**
     * @notice Get the updated collateral funds for datacap chunk based on real-time business data
     * @param matchingId The ID of the matching
     * @return The updated collateral funds required
     */
    getDatacapChunkCollateralFunds(matchingId: number): Promise<EvmOutput<BigInt>>

    /**
     * @notice Get the updated burn funds for datacap chunk based on real-time business data
     * @param matchingId The ID of the matching
     * @return The updated burn funds required
     */
    getDatacapChunkBurnFunds(matchingId: number): Promise<EvmOutput<BigInt>>

    /**
     * @notice Get collateral funds requirement for allocate chunk datacap
     */
    getCollateralRequirement(): Promise<EvmOutput<BigInt>>

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
    getTotalDatacapAllocationRequirement(matchingId: number): Promise<EvmOutput<number>>

    /**
     * @dev Gets the remaining datacap size needed to be allocated for a matching process.
     * @param _matchingId The ID of the matching process.
     * @return The remaining datacap size needed.
     */
    getRemainingUnallocatedDatacap(matchingId: number): Promise<EvmOutput<number>>

    /**
     * @dev Checks if the next datacap allocation is allowed for a matching process.
     * @param _matchingId The ID of the matching process.
     * @return True if next allocation is allowed, otherwise false.
     */
    isNextDatacapAllocationValid(matchingId: number): Promise<EvmOutput<boolean>>
}

/**
 * Interface for EVM transactions related to  Datacaps.
 */
interface DatacapsSendEvm {
    /**
     * @notice Add collateral funds for allocating datacap chunk
     * @param matchingId The ID of the matching
     */
    addDatacapChunkCollateral(matchingId: number): Promise<EvmOutput<void>>

    /**
     * @dev Requests the allocation of matched datacap for a matching process.
     * @param matchingId The ID of the matching process.
     */
    requestAllocateDatacap(matchingId: number): Promise<EvmOutput<number>>
}

/**
 * Combined interface for EVM calls and transactions related to  Datacaps.
 */
export interface DatacapsOriginEvm
    extends DatacapsCallEvm,
    DatacapsSendEvm { }

/**
 * Implementation of  DatacapsOriginEvm with specific EVM methods.
 */
@withCallMethod(
    [
        "getDatacapChunkCollateralFunds",
        "getDatacapChunkBurnFunds",
        "getCollateralRequirement",
        "getAvailableDatacap",
        "getAllocatedDatacap",
        "getTotalDatacapAllocationRequirement",
        "getRemainingUnallocatedDatacap",
        "isNextDatacapAllocationValid"
    ]
)
@withSendMethod(
    [
        "addDatacapChunkCollateral",
        "requestAllocateDatacap"
    ]
)
export class DatacapsOriginEvm extends Evm { }

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

        let result: DataswapMessage = decodeRes.data as DataswapMessage
        switch (decodeRes.data!.method) {
            case "addDatacapChunkCollateral":
            case "requestAllocateDatacap":
                result.matchingId = result.params.matchingId
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