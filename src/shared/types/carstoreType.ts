export enum State {
    None, //justify if Replica exsits
    Matched, // Replica has been matched for storage
    Stored, // Replica has been successfully stored
    StorageFailed, // The filecoin claim id's verification failed.
    Slashed, // The filecoin storage has been slashed.
    Expired // The filecoin storage has expired.
}