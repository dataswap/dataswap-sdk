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
    withSendMethod,
    EvmOutput,
    withCallMethod,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"
import { EvmEx } from "../../../../shared/types/evmEngineType"
import { ContractType } from "../../../../shared/types/rolesType"

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
    checkRole(role: string): Promise<EvmOutput<void>>

    /**
     * @dev Returns the address of the current owner.
     */
    owner(): Promise<EvmOutput<string>>

    /**
     * @notice Checks whether the given account has the specified role.
     * @param role The role to check.
     * @param account The account for which to check the role.
     * @returns A Promise resolving to the EvmOutput<boolean> indicating whether the account has the specified role.
     */
    hasRole(role: string, account: string): Promise<EvmOutput<boolean>>

    /**
     * Retrieves data from the filplus contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    filplus(): Promise<EvmOutput<string>>

    /**
     * Retrieves finance contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    finance(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the Filecoin contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    filecoin(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the carstore contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    carstore(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the storages contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    storages(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the merkleUtils contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    merkleUtils(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the datasets contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    datasets(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the datasetsProof contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    datasetsProof(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the datasetsChallenge contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    datasetsChallenge(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the datasetsRequirement contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    datasetsRequirement(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the matchings contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    matchings(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the matchingsBids contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    matchingsBids(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the matchingsTarget contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    matchingsTarget(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the escrowDataTradingFee contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    escrowDataTradingFee(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the escrowDatacapChunkLandCollateral contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    escrowDatacapChunkLandCollateral(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the escrowChallengeCommission contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    escrowChallengeCommission(): Promise<EvmOutput<string>>

    /**
     * Retrieves data related to the escrowDatacapCollateral contract.
     * @returns A promise that resolves to an EvmOutput<string>.
     */
    escrowDatacapCollateral(): Promise<EvmOutput<string>>
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
    pendingOwner(options?: EvmTransactionOptions): Promise<EvmOutput<string>>

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
    transferOwnership(
        newOwner: string,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * @notice Grants the specified role to the given account.
     * @param role The role to be granted.
     * @param account The account to which the role will be granted.
     * @param options The options of transaction.
     * @returns A Promise resolving to the EvmOutput<void> indicating the success of the transaction.
     */
    grantRole(
        role: string,
        account: string,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Registers a contract of a specific type.
     * @param type The type of contract to register.
     * @param contract The address of the contract to register.
     * @returns Promise resolved when the contract is registered successfully.
     */
    registerContract(
        type: ContractType,
        contract: string
    ): Promise<EvmOutput<void>>
}

/**
 * Combined interface for EVM calls and transactions related to  Roles.
 */
export interface RolesOriginEvm extends RolesCallEvm, RolesSendEvm {}

/**
 * Implementation of  RolesOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "hasRole",
    "checkRole",
    "owner",
    "escrowDatacapCollateral",
    "escrowDatacapChunkLandCollateral",
    "escrowChallengeCommission",
    "escrowDataTradingFee",
    "matchingsTarget",
    "matchingsBids",
    "matchings",
    "datasetsRequirement",
    "datasetsChallenge",
    "datasetsProof",
    "datasets",
    "merkleUtils",
    "storages",
    "carstore",
    "filecoin",
    "finance",
    "filplus",
])
@withSendMethod([
    "grantRole",
    "acceptOwnership",
    "pendingOwner",
    "renounceOwnership",
    "transferOwnership",
    "registerContract",
])
export class RolesOriginEvm extends EvmEx {}

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

        let result: DataswapMessage =
            decodeRes.data!.values() as DataswapMessage
        switch (decodeRes.data!.method) {
            case "grantRole":
            case "acceptOwnership":
            case "pendingOwner":
            case "renounceOwnership":
            case "transferOwnership":
            case "registerContract":
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
