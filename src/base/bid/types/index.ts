import { Address, Cid } from "@unipackage/filecoin"

export interface Bid {
    id: number
    matchingId: number
    bidder: Address
    bid: number
    isWinner?: boolean
    msgCid?: Cid
}
