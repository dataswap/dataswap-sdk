import {
    withCallMethod,
    withSendMethod,
    EvmOutput,
    EvmTransactionOptions
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"
import { Fund } from "../../types"
import { EvmEx } from "../../../../shared/types/evmEngineType"
import { EscrowType } from "../../../../shared/types/escrowType"

/**
 * Interface for EVM calls related to Escrow.
 */
interface EscrowCallEvm {

    /**
     * @notice Get owner fund.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds. 
     */
    getOwnerFund(
        type: EscrowType,
        owner: string,
        id: number): Promise<EvmOutput<Fund>>

    /**
     * @notice Get beneficiariesList.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds. 
     */
    getBeneficiariesList(
        type: EscrowType,
        owner: string,
        id: number
    ): Promise<EvmOutput<string[]>>

    /**
     * @notice Get beneficiary fund.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds. 
     * @param beneficiary The beneficiary address for the payment credited funds.
     */
    getBeneficiaryFund(
        type: EscrowType,
        owner: string,
        id: number,
        beneficiary: string
    ): Promise<EvmOutput<Fund>>
}

/**
 * Interface for EVM transactions related to Escrow.
 */
interface EscrowSendEvm {

    /**
     * Records the sent amount as credit for future withdrawals.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     * @param amount The collateral funds.
     * @param options The options of transaction.
     */
    collateral(
        type: EscrowType,
        owner: string,
        id: number,
        amount: bigint,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Redeem funds from collateral to available account after the collateral expires.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     * @param options The options of transaction.
     */
    collateralRedeem(
        type: EscrowType,
        owner: string,
        id: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Withdraw funds from available account to authorized address.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     * @param options The options of transaction.
     */
    withdraw(
        type: EscrowType,
        owner: string,
        id: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Records the sent amount as credit for future payment withdraw.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     * @param amount The payment funds.
     * @param options The options of transaction.
     */
    payment(
        type: EscrowType,
        owner: string,
        id: number,
        amount: bigint,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Records the sent amount as credit for future payment withdraw.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     * @param beneficiary The beneficiary address for the payment credited funds.
     * @param amount The payment funds.
     * @param options The options of transaction.
     */
    paymentSingleBeneficiary(
        type: EscrowType,
        owner: string,
        id: number,
        beneficiary: string,
        amount: bigint,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Withdraw funds from available account to beneficiary address.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     * @param beneficiary The beneficiary address for the payment credited funds.
     * @param options The options of transaction.
     */
    paymentWithdraw(
        type: EscrowType,
        owner: string,
        id: number,
        beneficiary: string,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Transfer funds from payment to available account for total data prepare fee business.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     * @param amount The transfer funds.
     * @param options The options of transaction.
     */
    paymentTransfer(
        type: EscrowType,
        owner: string,
        id: number,
        amount: bigint,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>

    /**
     * Refund funds from payment to available account after the payment expires.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     * @param options The options of transaction.
     */
    paymentRefund(
        type: EscrowType,
        owner: string,
        id: number,
        options?: EvmTransactionOptions
    ): Promise<EvmOutput<void>>
}

/**
 * Combined interface for EVM calls and transactions related to Escrow.
 */
export interface EscrowOriginEvm
    extends EscrowCallEvm,
    EscrowSendEvm { }

/**
 * Implementation of EscrowOriginEvm with specific EVM methods.
 */
@withCallMethod(
    [
        "getOwnerFund",
        "getBeneficiariesList",
        "getBeneficiaryFund"
    ]
)
@withSendMethod(
    [
        "collateral",
        "collateralRedeem",
        "withdraw",
        "payment",
        "paymentSingleBeneficiary",
        "paymentWithdraw",
        "paymentTransfer",
        "paymentRefund"
    ]
)
export class EscrowOriginEvm extends EvmEx { }

/**
 * Extended class for EscrowOriginEvm with additional message decoding.
 */
export class EscrowEvm extends EscrowOriginEvm {

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
            case "collateral":
            case "collateralRedeem":
            case "withdraw":
            case "payment":
            case "paymentSingleBeneficiary":
            case "paymentWithdraw":
            case "paymentTransfer":
            case "paymentRefund":
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