import { Address } from "@unipackage/filecoin"

export interface Datacap {
    id: number
    matchingId: number
    applicant: Address
    amount: number
}
