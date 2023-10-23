import { State } from "../../../shared/state/types"
import { Address } from "@unipackage/filecoin"

export interface Geolocation {
    regionCode: number
    countryCode: number
    cityCodes: number[]
}

export interface ReplicaRequirement {
    dataPreparers: Address[]
    storageProviders: Address[]
    geolocations: Geolocation
}

export interface DatasetReplica {
    id: number
    datasetID: number
    replicaRequirement: ReplicaRequirement
    state: State //TODO
    matchingIds: number[]
}
