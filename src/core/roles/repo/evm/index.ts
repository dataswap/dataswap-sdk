import {
    Evm,
    withSendMethod,
    EvmOutput,
    withCallMethod,
    EvmTransactionOptions
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"

/**
 * Interface for EVM calls related to  Roles.
 */
interface RolesCallEvm {
    /**
     * @dev Revert with a standard message if `_msgSender()` is missing `role`.
     * Overriding this function changes the behavior of the {onlyRole} modifier.
     *
     * Format of the revert message is described in {_checkRole}.
     *
     * _Available since v4.6._
     */
    checkRole(role: Buffer): Promise<EvmOutput<void>>

    /**
     * @dev Returns the address of the current owner.
     */
    owner(): Promise<EvmOutput<Buffer>>
}

/**
 * Interface for EVM transactions related to  Roles.
 */
interface RolesSendEvm {
    /**
     * @dev The new owner accepts the ownership transfer.
     * @param options The options of transaction.
     */
    acceptOwnership(options: EvmTransactionOptions): Promise<EvmOutput<void>>

    /** 
     * @dev Returns the address of the pending owner.
     * @param options The options of transaction.
     */
    pendingOwner(options: EvmTransactionOptions): Promise<EvmOutput<Buffer>>

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     * @param options The options of transaction.
     */
    renounceOwnership(options: EvmTransactionOptions): Promise<EvmOutput<void>>

    /**
     * @dev Starts the ownership transfer of the contract to a new account. Replaces the pending transfer if there is one.
     * Can only be called by the current owner.
     * @param newOwner The transfer to account.
     * @param options The options of transaction.
     */
    transferOwnership(newOwner: Buffer, options: EvmTransactionOptions): Promise<EvmOutput<void>>

    /**
     * @notice grantDataswapContractRole function to grant the dataswap contract role for dataswap contract. TODO: Move to governance
     * @param contracts The contracts address of grant dataswap role
     * @param options The options of transaction.
     */
    grantDataswapContractRole(contracts: Buffer[], options: EvmTransactionOptions): Promise<EvmOutput<void>>
}

/**
 * Combined interface for EVM calls and transactions related to  Roles.
 */
export interface RolesOriginEvm
    extends RolesCallEvm,
    RolesSendEvm { }

/**
 * Implementation of  RolesOriginEvm with specific EVM methods.
 */
@withCallMethod(
    [
        "checkRole",
        "owner"
    ]
)
@withSendMethod(
    [
        "acceptOwnership",
        "checkRole",
        "owner",
        "pendingOwner",
        "renounceOwnership",
        "transferOwnership",
        "grantDataswapContractRole"
    ]
)
export class RolesOriginEvm extends Evm { }

/**
 * Extended class for  RolesOriginEvm with additional message decoding.
 */
export class RolesEvm extends RolesOriginEvm {


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
            case "acceptOwnership":
            case "pendingOwner":
            case "renounceOwnership":
            case "transferOwnership":
            case "grantDataswapContractRole":
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