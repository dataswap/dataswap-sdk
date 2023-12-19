export enum DatasetState {
    None, // No specific state.
    MetadataSubmitted, // Metadata submitted but not approved.
    MetadataApproved, // Metadata has been approved.
    MetadataRejected, // Metadata submission has been rejected.
    FundsNotEnough, // Not enough collateral when submit proof or challenge proof.
    DatasetProofSubmitted, // Proof of dataset submitted.
    DatasetApproved // Dataset has been approved.
}

export enum DataType {
    Source, // Matching is associated with a dataset
    MappingFiles // Matching is associated with mapping files
}

export interface DatasetRequirements {
    dataPreparers: string[][]
    storageProviders: string[][]
    regionCodes: number[]
    countryCodes: number[]
    cityCodes: number[][]
}
