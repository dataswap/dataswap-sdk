import { Address, Cid } from "@unipackage/filecoin"
import { EscrowType, EscrowOperateType } from "../../../shared/types/escrowType"

export interface EscrowOperate {
    id: number
    escrowType: EscrowType
    owner: Address
    operate: EscrowOperateType
    amount: Address
    msgCid: Cid
}
