export enum DealState {
    Stored, // The filecoin deal's verification was successful.
    StorageFailed, // The filecoin deal's verification failed.
    Slashed, // The filecoin deal has been slashed.
    Expired // The filecoin deal has expired.
}