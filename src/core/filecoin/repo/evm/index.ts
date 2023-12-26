import {
    Evm,
    withCallMethod,
    EvmOutput
} from "@unipackage/net"
import { DealState } from "../../../../shared/types/filecoinType"
import { EvmEx } from "../../../../shared/types/evmEngineType"

/**
 * Interface for EVM calls related to  Filecoin.
 */
interface FilecoinCallEvm {
    /**
     * @notice The function to get the state of a Filecoin storage deal for a replica.
     * @param cid The cid
     * @param claimId The claim id
     */
    getReplicaDealState(
        cid: string,
        claimId: number
    ): Promise<EvmOutput<DealState>>

    /**
     * @notice The function to get the data of a claim for a replica.
     * @param provider The replica provider
     * @param claimId The replica claim id
     */
    getReplicaClaimData(
        provider: number,
        claimId: number
    ): Promise<EvmOutput<string>>
}

/**
 * Interface for EVM transactions related to  Filecoin.
 */
interface FilecoinSendEvm { }

/**
 * Combined interface for EVM calls and transactions related to  Filecoin.
 */
export interface FilecoinOriginEvm
    extends FilecoinCallEvm,
    FilecoinSendEvm { }

/**
 * Implementation of  FilecoinOriginEvm with specific EVM methods.
 */
@withCallMethod(
    [
        "getReplicaDealState",
        "getReplicaClaimData"
    ]
)
export class FilecoinOriginEvm extends EvmEx { }

/**
 * Extended class for  FilecoinOriginEvm with additional message decoding.
 */
export class FilecoinEvm extends FilecoinOriginEvm { }