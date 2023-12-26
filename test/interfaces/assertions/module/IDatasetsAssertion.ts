import { DatasetState } from "../../../../src/shared/types/datasetType"
import { DatasetMetadata } from "../../../../src/module/dataset/metadata/types"
import { DataType } from "../../../../src/shared/types/dataType"
import { DatasetRequirement } from "../../../../src/module/dataset/requirement/types"
import { DatasetRequirements } from "../../../../src/shared/types/datasetType"
import { DatasetChallenge } from "../../../../src/module/dataset/challenge/types"

export interface IDatasetsAssertion {
    // Datasets
    getDatasetMetadataAssertion(datasetId: number, expectData: DatasetMetadata): Promise<void>
    getDatasetMetadataSubmitterAssertion(datasetId: number, expectSubmitter: string): Promise<void>
    getDatasetMetadataClientAssertion(datasetId: number, expectSubmitterClient: number): Promise<void>
    hasDatasetMetadataAssertion(expectAccessMethod: string): Promise<void>
    getDatasetStateAssertion(datasetId: number, expectState: DatasetState): Promise<void>
    governanceAddressAssertion(expectGovernance: string): Promise<void>
    submitDatasetMetadataAssertion(expectDatasetClient: number, expectData: DatasetMetadata): Promise<number>
    datasetsProofAssertion(expectDatasetsProofAddress: string): Promise<void>
    datasetsCountAssertion(expectDatasetsCount: number): Promise<void>
    initDatasetsDependenciesAssertion(expectDatasetsProof: string,): Promise<void>
    approveDatasetAssertion(datasetId: number, expectState: DatasetState): Promise<void>
    approveDatasetMetadataAssertion(datasetId: number, expectState: DatasetState): Promise<void>
    rejectDatasetAssertion(datasetId: number, expectState: DatasetState): Promise<void>
    rejectDatasetMetadataAssertion(datasetId: number, expectState: DatasetState): Promise<void>
    //DatasetsRequirement
    getDatasetReplicasCountAssertion(datasetId: number, expectCount: number): Promise<void>
    getDatasetReplicaRequirementAssertion(datasetId: number, index: number, expectRequirement: DatasetRequirement): Promise<void>
    getDatasetPreCollateralRequirementsAssertion(datasetId: number, expectPreCollateral: bigint): Promise<void>
    submitDatasetReplicaRequirementsAssertion(datasetId: number, expectRequirements: DatasetRequirements, expectAmount: bigint): Promise<void>
    //DatasetsProof
    datasetsChallengeAssertion(expectDatasetChallengeAddress: string): Promise<void>
    getDatasetAppendCollateralAssertion(datasetId: number, expectAppendCollateral: bigint): Promise<void>
    getDatasetProofAssertion(
        datasetId: number,
        dataType: DataType,
        index: number,
        len: number,
        expectProof: string[]
    ): Promise<void>
    getDatasetProofCountAssertion(
        datasetId: number,
        dataType: DataType,
        expectProofCount: number
    ): Promise<void>
    getDatasetProofSubmitterAssertion(datasetId: number, expectProofSubmitter: string): Promise<void>
    getDatasetSizeAssertion(datasetId: number, dataType: DataType, expectSize: number): Promise<void>
    getDatasetCollateralRequirementAssertion(datasetId: number, expectCollateral: bigint): Promise<void>
    getDatasetDataAuditorFeesRequirementAssertion(datasetId: number, expectAuditorFeesRequirement: bigint): Promise<void>
    getDatasetDataAuditorFeesAssertion(datasetId: number, expectAuditorFees: bigint): Promise<void>
    isDatasetProofallCompletedAssertion(
        datasetId: number,
        dataType: DataType,
        expectRet: boolean
    ): Promise<void>
    isDatasetContainsCarAssertion(datasetId: number, id: number, expectRet: boolean): Promise<void>
    isDatasetContainsCarsAssertion(datasetId: number, ids: number[], expectRet: boolean): Promise<void>
    isDatasetProofSubmitterAssertion(
        datasetId: number,
        submitter: string,
        expectRet: boolean
    ): Promise<void>
    initDatasetsProofDependenciesAssertion(
        expectDatasetsChallenge: string,
    ): Promise<void>
    submitDatasetProofRootAssertion(
        datasetId: number,
        dataType: DataType,
        mappingFilesAccessMethod: string,
        rootHash: string,
        expectSubmitter: string
    ): Promise<void>
    submitDatasetProofAssertion(
        datasetId: number,
        dataType: DataType,
        expectLeafHashes: string[],
        expectLeafIndex: number,
        expectLeafSizes: number[],
        expectCompleted: boolean,
    ): Promise<void>

    submitDatasetProofCompletedAssertion(
        datasetId: number,
        expectState: DatasetState
    ): Promise<void>

    appendDatasetFundsAssertion(
        datasetId: number,
        expectDatacapCollateral: bigint,
        expectDataAuditorFees: bigint,
    ): Promise<void>

    //DatasetsChallenge
    getDatasetChallengeProofsAssertion(
        datasetId: number,
        auditor: string,
        expects: DatasetChallenge
    ): Promise<void>

    getDatasetChallengeProofsCountAssertion(datasetId: number, expectCount: number): Promise<void>

    getChallengeSubmissionCountAssertion(datasetId: number, expectCount: number): Promise<void>

    isDatasetChallengeProofDuplicateAssertion(
        datasetId: number,
        auditor: string,
        randomSeed: number,
        expectRet: boolean
    ): Promise<void>
    submitDatasetChallengeProofsAssertion(
        datasetId: number,
        randomSeed: number,
        leaves: string[],
        siblings: string[][],
        paths: number[],
    ): Promise<void>
}