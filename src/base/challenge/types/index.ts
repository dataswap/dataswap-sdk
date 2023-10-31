import { Address, Cid } from "@unipackage/filecoin"

export interface Challenge {
    id: number
    datasetId: number
    proofId: number
    submitter: Address
    randomSeed: number
    challenge: string
    msgCid: Cid
}
