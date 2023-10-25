import { State } from "../../../shared/state/types"
import { Address, Cid } from "@unipackage/filecoin"

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
    datasetInternalId: number
    replicaRequirement: ReplicaRequirement
    msgCid: Cid
    state: State
    matchingIds?: number[]
}
