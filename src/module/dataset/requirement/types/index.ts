import { Entity } from "@unipackage/ddd"

export interface DatasetRequirement {
    dataPreparers: string[]
    storageProviders: string[]
    region: number
    country: number
    citys: number[]
}

export class DatasetRequirement extends Entity<DatasetRequirement> { }