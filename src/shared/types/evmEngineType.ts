import {
    EthersEvmEngine,
    Web3EvmEngine,
    EthersWallet,
    Web3Wallet,
    Evm
} from "@unipackage/net"
import { AbiFunctionFragment } from "web3"

export const EvmEngine = EthersEvmEngine
export const Wallet = EthersWallet


export class EvmEx extends Evm {
    constructor(abi: AbiFunctionFragment[], address: string, url: string) {
        super(new EvmEngine(abi, address, url))
    }
}
