import { Entity } from "@unipackage/ddd"

export interface DatasetRequirement {
    dataPreparers: string[]
    storageProviders: string[]
    regionCode: number
    countryCode: number
    cityCodes: number[]
}

export class DatasetRequirement extends Entity<DatasetRequirement> { }