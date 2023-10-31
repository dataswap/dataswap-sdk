import { Address, Balance } from "@unipackage/filecoin"
import { EscrowType } from "../../../shared/types/escrowType"

export interface Fund {
    account: Address
    total: Balance
    lock: Balance
    collateral: Balance
    burned: Balance
    createdBlockNumber: Balance
}

export interface Escrow {
    id: number
    escrowType: EscrowType
    owner: Fund
    domainId: number
    beneficiaries: Fund[]
    escrowOperateIds: string
}
