import * as utils from "../shared/utils"
import { EscrowEvm } from "../../src/core/escrow/repo/evm"
import EscrowAbi from "@dataswapcore/contracts/abi/v0.8/Escrow.json"

class EscrowHelper {
    private static instance: EscrowHelper

    private escrow: EscrowEvm

    constructor() {
        this.escrow = utils.createContractEvm(
            EscrowEvm,
            "Escrow",
            EscrowAbi
        )
    }

    public static Instance(): EscrowHelper {
        if (!EscrowHelper.instance) {
            EscrowHelper.instance = new EscrowHelper()
        }
        return EscrowHelper.instance
    }
}

export const EscrowHelperInstance = EscrowHelper.Instance()