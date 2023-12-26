import {
    Evm,
    withCallMethod,
    withSendMethod,
    EvmOutput,
    EvmTransactionOptions
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"
import { EvmEx } from "../../../../shared/types/evmEngineType"


/**
 * Interface for EVM calls related to  Storages.
 */
interface StoragesCallEvm {
    /**
     * @dev Gets the list of done cars in the matchedstore.
     * @param _matchingId The ID of the matching.
     * @return An array of content identifiers of the done cars.
     */
    getStoredCars(matchingId: number): Promise<EvmOutput<number[]>>

    /**
     * @dev Gets the count of done cars in the matchedstore.
     * @param _matchingId The ID of the matching.
     * @return The count of done cars in the matchedstore.
     */
    getStoredCarCount(matchingId: number): Promise<EvmOutput<number>>

    /**
     * @notice get total stored size
     * @param _matchingId The ID of the matching.
     * @return The total size of the matching's stored cars.
     */
    getTotalStoredSize(matchingId: number): Promise<EvmOutput<number>>

    /**
     * @notice get car size
     * @param _matchingId The ID of the matching.
     * @param _id The content identifier of the matched data.
     * @return The size of the matching's stored cars.
     */
    getStoredCarSize(matchingId: number, id: number): Promise<EvmOutput<number>>

    /**
     * @dev Get the collateral amount
     * @param matchingId The ID of the matching.
     *  */
    getProviderLockPayment(matchingId: number): Promise<EvmOutput<bigint>>

    /**
     * @dev Get the client allow payment amount
     * @param matchingId The ID of the matching.
     *  */
    getClientLockPayment(matchingId: number): Promise<EvmOutput<bigint>>

    /**
     * @dev Checks if all cars are done in the matchedstore.
     * @param _matchingId The ID of the matching.
     * @return True if all cars are done in the matchedstore, otherwise false.
     */
    isAllStoredDone(matchingId: number): Promise<EvmOutput<boolean>>

    /**
     * @dev Checks if store expiration in the matchedstore.
     * @param matchingId The ID of the matching.
     */
    isStorageExpiration(matchingId: number): Promise<EvmOutput<boolean>>
}

/**
 * Interface for EVM transactions related to  Storages.
 */
interface StoragesSendEvm {
    /**
     * @dev Submits multiple Filecoin claim Ids for a matchedstore after successful matching.
     * @param matchingId The ID of the matching.
     * @param provider A provider of storage provider of matching.
     * @param ids An array of content identifiers of the matched data.
     * @param claimIds An array of IDs of successful Filecoin storage deals.
     * @param options The options of transaction.
     */
    submitStorageClaimIds(
        matchingId: number,
        provider: number,
        ids: number[],
        claimIds: number[],
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
}

/**
 * Combined interface for EVM calls and transactions related to  Storages.
 */
export interface StoragesOriginEvm
    extends StoragesCallEvm,
    StoragesSendEvm { }

/**
 * Implementation of  StoragesOriginEvm with specific EVM methods.
 */
@withCallMethod(
    [
        "getStoredCars",
        "getStoredCarCount",
        "getTotalStoredSize",
        "getStoredCarSize",
        "getProviderLockPayment",
        "getClientLockPayment",
        "isAllStoredDone",
        "isStorageExpiration"
    ]
)
@withSendMethod(
    [
        "submitStorageClaimIds"
    ]
)
export class StoragesOriginEvm extends EvmEx { }

/**
 * Extended class for  StoragesOriginEvm with additional message decoding.
 */
export class StoragesEvm extends StoragesOriginEvm {


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
            case "submitStorageClaimIds":
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