import { Entity } from "@unipackage/ddd"

export interface DatasetChallenge {
    leaves: string[]
    siblings: string[][]
    paths: string[]
}

export class DatasetChallenge extends Entity<DatasetChallenge> { }
