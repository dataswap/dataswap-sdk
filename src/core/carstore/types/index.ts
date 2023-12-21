import { Entity } from "@unipackage/ddd"
import { ValueFields } from "@unipackage/utils"
import { State } from "../../../shared/types/carstoreType";

export interface Car {
    hash: string; // car hash
    datasetId: number; // Index of approved dataset
    size: number; //car size
    replicasCount: number; // Replica count
    matchingIds: number[]; // Matching Ids.
    id: number; // The id associated with the car.
}

export interface CarReplica {
    state: State; // Current state of the replica
    filecoinClaimId: number; // ID of the Filecoin claim associated with the replica's storage
}

export class Car extends Entity<Car> {
    constructor(data?: ValueFields<Car>) {
        super({
            hash: data?.hash || "",
            id: data?.id || 0,
            datasetId: data?.datasetId || 0,
            size: data?.size || 0,
            replicasCount: data?.replicasCount || 0,
            matchingIds: data?.matchingIds || []
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