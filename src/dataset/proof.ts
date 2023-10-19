import { Hash } from "@unipackage/filecoin"
import { Car } from "../basic/car/types"

export type Leaves = {
    [hash: string]: Car
}

export interface DatasetProofCreateInfo {
    rootHash?: Hash
    leafHashesCount?: number
    allProofsSubmitted?: boolean
}

export interface DatasetProofInfo extends DatasetProofCreateInfo {
    leaves?: Leaves
}
