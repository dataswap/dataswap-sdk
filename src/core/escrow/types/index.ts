import { Entity } from "@unipackage/ddd"
import { ValueFields } from "@unipackage/utils"

export interface Fund {
    total: BigInt, // Total amount in fund account
    lock: BigInt, // Lock amount in fund account for payment beneficiaries
    collateral: BigInt, // Collateral amount in fund account for withdraw and punishment
    burned: BigInt, // burned amount in fund account
    createdBlockNumber: number // Fund account created block number
}

export class Fund extends Entity<Fund> {
    constructor(data?: ValueFields<Fund>) {
        super({
            total: data?.total || BigInt(0),
            lock: data?.lock || BigInt(0),
            collateral: data?.collateral || BigInt(0),
            burned: data?.burned || BigInt(0),
            createdBlockNumber: data?.createdBlockNumber || 0
        })
    }
}
