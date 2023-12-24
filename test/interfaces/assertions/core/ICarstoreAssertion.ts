import { Car } from "../../../../src/core/carstore/types"
import { CarReplica } from "../../../../src/core/carstore/types"
import { CarReplicaState } from "../../../../src/shared/types/carstoreType"

export interface ICarstoreAssertion {
    getCarAssertion(id: number, expectCar: Car): Promise<void>
    getCarSizeAssertion(id: number, expectSize: number): Promise<void>
    getCarsSizeAssertion(ids: number[], expectSize: number): Promise<void>
    getCarDatasetIdAssertion(id: number, expectDatasetId: number): Promise<void>
    getCarMatchingIdsAssertion(id: number, expectMatchingIds: number): Promise<void>
    getCarReplicaAssertion(id: number, matchingId: number, expectCarReplica: CarReplica): Promise<void>
    getCarReplicasCountAssertion(id: number, expectCount: number): Promise<void>
    getCarReplicaFilecoinClaimIdAssertion(id: number, matchingId: number, expectClaimId: number): Promise<void>
    getCarReplicaStateAssertion(id: number, matchingId: number, expectState: CarReplicaState): Promise<void>
    getCarHashAssertion(id: number, expectHash: string): Promise<void>
    getCarsHashsAssertion(ids: number[], expectHashs: string[]): Promise<void>
    getCarIdAssertion(hash: string, expectId: number): Promise<void>
    getCarsIdsAssertion(hashs: string[], expectIds: number[]): Promise<void>
    carsCountAssertion(expectCount: number): Promise<void>
    hasCarHashAssertion(hash: string, expectHas: boolean): Promise<void>
    hasCarAssertion(id: number, expectHas: boolean): Promise<void>
    hasCarReplicaAssertion(id: number, matchingId: number, expectHas: boolean): Promise<void>
    hasCarsHashsAssertion(hashs: string[], expectHas: boolean): Promise<void>
    hasCarsAssertion(ids: string[], expectHas: boolean): Promise<void>
}