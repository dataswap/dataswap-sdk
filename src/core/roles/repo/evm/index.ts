import {
    Evm,
    withSendMethod,
    EvmOutput,
    withCallMethod,
    EvmTransactionOptions
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"
import { EvmEx } from "../../../../shared/types/evmEngineType"

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

    /**
     * @notice Checks whether the given account has the specified role.
     * @param role The role to check.
     * @param account The account for which to check the role.
     * @returns A Promise resolving to the EvmOutput<boolean> indicating whether the account has the specified role.
     */
    hasRole(role: string, account: string): Promise<EvmOutput<boolean>>
}


/**
 * Interface for EVM transactions related to  Roles.
 */
interface RolesSendEvm {
    /**
     * @dev The new owner accepts the ownership transfer.
     * @param options The options of transaction.
     */
    acceptOwnership(options?: EvmTransactionOptions): Promise<EvmOutput<void>>

    /** 
     * @dev Returns the address of the pending owner.
     * @param options The options of transaction.
     */
    pendingOwner(options?: EvmTransactionOptions): Promise<EvmOutput<Buffer>>

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     * @param options The options of transaction.
     */
    renounceOwnership(options?: EvmTransactionOptions): Promise<EvmOutput<void>>

    /**
     * @dev Starts the ownership transfer of the contract to a new account. Replaces the pending transfer if there is one.
     * Can only be called by the current owner.
     * @param newOwner The transfer to account.
     * @param options The options of transaction.
     */
    transferOwnership(newOwner: Buffer, options?: EvmTransactionOptions): Promise<EvmOutput<void>>

    /**
     * @notice grantDataswapContractRole function to grant the dataswap contract role for dataswap contract. TODO: Move to governance
     * @param contracts The contracts address of grant dataswap role
     * @param options The options of transaction.
     */
    grantDataswapContractRole(contracts: string[], options?: EvmTransactionOptions): Promise<EvmOutput<void>>

    /**
     * @notice Grants the specified role to the given account.
     * @param role The role to be granted.
     * @param account The account to which the role will be granted.
     * @param options The options of transaction.
     * @returns A Promise resolving to the EvmOutput<void> indicating the success of the transaction.
     */
    grantRole(role: string, account: string, options?: EvmTransactionOptions): Promise<EvmOutput<void>>
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
        "hasRole",
        "checkRole",
        "owner"
    ]
)
@withSendMethod(
    [
        "grantRole",
        "acceptOwnership",
        "pendingOwner",
        "renounceOwnership",
        "transferOwnership",
        "grantDataswapContractRole"
    ]
)
export class RolesOriginEvm extends EvmEx { }

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