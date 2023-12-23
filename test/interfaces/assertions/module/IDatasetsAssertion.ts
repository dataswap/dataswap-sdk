import { DatasetState } from "../../../../src/shared/types/datasetType"
import { DatasetMetadata } from "../../../../src/module/dataset/metadata/types"

export interface IDatasetsAssertion {
    getDatasetMetadataAssertion(datasetId: number, expectData: DatasetMetadata): Promise<void>
    getDatasetMetadataSubmitterAssertion(datasetId: number, expectSubmitter: string): Promise<void>
    getDatasetMetadataClientAssertion(datasetId: number, expectSubmitterClient: number): Promise<void>
    hasDatasetMetadataAssertion(expectAccessMethod: string): Promise<void>
    getDatasetStateAssertion(datasetId: number, expectState: DatasetState): Promise<void>
    governanceAddressAssertion(expectGovernance: string): Promise<void>
    submitDatasetMetadataAssertion(expectDatasetClient: number, expectData: DatasetMetadata): Promise<number>
    datasetsProofAssertion(expectDatasetsProofAddress: string): Promise<void>
    datasetsCountAssertion(expectDatasetsCount: number): Promise<void>
    initDependenciesAssertion(expectDatasetsProof: string,): Promise<void>
    approveDatasetAssertion(datasetId: number, expectState: DatasetState): Promise<void>
    approveDatasetMetadataAssertion(datasetId: number, expectState: DatasetState): Promise<void>
    rejectDatasetAssertion(datasetId: number, expectState: DatasetState): Promise<void>
    rejectDatasetMetadataAssertion(datasetId: number, expectState: DatasetState): Promise<void>
}