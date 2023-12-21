import { Entity } from "@unipackage/ddd"
import { ValueFields } from "@unipackage/utils"

export interface Fund {
    total: bigint, // Total amount in fund account
    locked: bigint, // Lock amount in fund account for payment beneficiaries
    collateraled: bigint, // Collateral amount in fund account for withdraw and punishment
    burned: bigint, // burned amount in fund account
    createdBlockNumber: number // Fund account created block number
}

export class Fund extends Entity<Fund> {
    constructor(data?: ValueFields<Fund>) {
        super({
            total: data?.total || BigInt(0),
            locked: data?.locked || BigInt(0),
            collateraled: data?.collateraled || BigInt(0),
            burned: data?.burned || BigInt(0),
            createdBlockNumber: data?.createdBlockNumber || 0
        })
    }
}
