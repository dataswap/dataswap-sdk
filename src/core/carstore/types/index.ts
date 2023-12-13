import { Entity } from "@unipackage/ddd"
import { ValueFields } from "@unipackage/utils"
import { State } from "../../../shared/types/carstoreType";

export interface Car {
    id: number; // The id associated with the car.
    datasetId: number; // Index of approved dataset
    size: number; //car size
    replicasCount: number; // Replica count
    MatchingIds: number[]; // Matching Ids.
}

export interface CarReplica {
    filecoinClaimId: number; // ID of the Filecoin claim associated with the replica's storage
    state: State; // Current state of the replica
}

export class Car extends Entity<Car> {
    constructor(data?: ValueFields<Car>) {
        super({
            id: data?.id || 0,
            datasetId: data?.datasetId || 0,
            size: data?.size || 0,
            replicasCount: data?.replicasCount || 0,
            MatchingIds: data?.MatchingIds || []
        })
    }
}

export class CarReplica extends Entity<CarReplica> {
    constructor(data?: ValueFields<CarReplica>) {
        super({
            filecoinClaimId: data?.filecoinClaimId || 0,
            state: data?.state || State.None
        })
    }
}