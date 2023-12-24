import { expect } from "chai"
import { IContractsManager } from "../../interfaces/setup/IContractsManater"
import { handleEvmError } from "../../shared/error"
import { DatasetMetadata } from "../../../src/module/dataset/metadata/types"
import { DatasetState } from "../../../src/shared/types/datasetType"
import { IAccounts } from "../../interfaces/setup/IAccounts"
import { IDatasetsAssertion } from "../../interfaces/assertions/module/IDatasetsAssertion"
import { equal } from "@unipackage/utils"
import { DatasetRequirement } from "../../../src/module/dataset/requirement/types"
import { DatasetRequirements } from "../../../src/shared/types/datasetType"
import * as utils from "../../shared/utils"
import { DataType } from "../../../src/shared/types/dataType"
import { DatasetChallenge } from "../../../src/module/dataset/challenge/types"

export class DatasetsAssertion implements IDatasetsAssertion {
    private contractsManager: IContractsManager
    private accounts: IAccounts
    constructor(_accounts: IAccounts, _contractsManager: IContractsManager) {
        this.contractsManager = _contractsManager
        this.accounts = _accounts
    }

    async getDatasetMetadataAssertion(datasetId: number, expectData: DatasetMetadata): Promise<void> {
        let metaData = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetMetadata(datasetId))
        expect(expectData.title).to.be.equal(metaData.title)
        expect(expectData.industry).to.be.equal(metaData.industry)
        expect(expectData.name).to.be.equal(metaData.name)
        expect(expectData.description).to.be.equal(metaData.description)
        expect(expectData.source).to.be.equal(metaData.source)
        expect(expectData.accessMethod).to.be.equal(metaData.accessMethod)
        expect(expectData.sizeInBytes).to.be.equal(Number(metaData.sizeInBytes))
        expect(expectData.isPublic).to.be.equal(metaData.isPublic)
        expect(expectData.version).to.be.equal(Number(metaData.version))
    }

    async getDatasetMetadataSubmitterAssertion(datasetId: number, expectSubmitter: string): Promise<void> {
        let submitter = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetMetadataSubmitter(datasetId))
        expect(expectSubmitter).to.be.equal(submitter.data)
    }
    async getDatasetMetadataClientAssertion(datasetId: number, expectSubmitterClient: number): Promise<void> {
        let submitterClient = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetMetadataClient(datasetId))
        expect(expectSubmitterClient).to.be.equal(submitterClient.data)
    }
    async hasDatasetMetadataAssertion(expectAccessMethod: string): Promise<void> {
        let has = await handleEvmError(this.contractsManager.DatasetMetadataEvm().hasDatasetMetadata(expectAccessMethod))
        expect(true).to.be.equal(has.data)
    }

    async getDatasetStateAssertion(datasetId: number, expectState: DatasetState): Promise<void> {
        let state = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetState(datasetId))
        expect(Number(expectState)).to.be.equal(Number(state))
    }

    async governanceAddressAssertion(expectGovernance: string): Promise<void> {
        let governance = await handleEvmError(this.contractsManager.DatasetMetadataEvm().governanceAddress())
        expect(expectGovernance).to.be.equal(governance)
    }

    async submitDatasetMetadataAssertion(expectDatasetClient: number, expectData: DatasetMetadata): Promise<number> {
        let [client, clientKey] = this.accounts.getClient()
        let tx = await handleEvmError(this.contractsManager.DatasetMetadataEvm().submitDatasetMetadata(
            expectDatasetClient,
            expectData.title,
            expectData.industry,
            expectData.name,
            expectData.description,
            expectData.source,
            expectData.accessMethod,
            expectData.sizeInBytes,
            expectData.isPublic,
            expectData.version,
            {
                from: client,
                privateKey: clientKey
            }
        ))
        // Get transaction receipt and event arguments
        const receipt = await this.contractsManager.DatasetMetadataEvm().getTransactionReceipt(
            tx.data.hash
        )

        let ret = this.contractsManager.DatasetMetadataEvm().getEvmEventArgs(receipt!, "DatasetMetadataSubmitted")

        let datasetId = Number(ret.data.datasetId)
        this.datasetsCountAssertion(datasetId)
        this.getDatasetMetadataAssertion(datasetId, expectData)
        this.getDatasetMetadataSubmitterAssertion(datasetId, client)
        this.getDatasetMetadataClientAssertion(datasetId, expectDatasetClient)
        return datasetId
    }


    async datasetsProofAssertion(expectDatasetsProofAddress: string): Promise<void> {
        let datasetsProof = await handleEvmError(this.contractsManager.DatasetMetadataEvm().datasetsProof())
        expect(expectDatasetsProofAddress).to.equal(datasetsProof.data)
    }

    async datasetsCountAssertion(expectDatasetsCount: number): Promise<void> {
        let datasetCount = await handleEvmError(this.contractsManager.DatasetMetadataEvm().datasetsCount())
        expect(expectDatasetsCount).to.equal(Number(datasetCount.data))
    }

    async initDatasetsDependenciesAssertion(
        expectDatasetsProof: string,
    ): Promise<void> {
        let [governance, governanceKey] = this.accounts.getGovernance()
        await handleEvmError(this.contractsManager.DatasetMetadataEvm().initDependencies(
            expectDatasetsProof,
            {
                from: governance,
                privateKey: governanceKey
            }
        ))
        await this.datasetsProofAssertion(expectDatasetsProof)
    }

    async approveDatasetAssertion(
        datasetId: number,
        expectState: DatasetState
    ): Promise<void> {
        let [governance, governanceKey] = this.accounts.getGovernance()
        await handleEvmError(this.contractsManager.DatasetMetadataEvm().approveDataset(
            datasetId,
            {
                from: governance,
                privateKey: governanceKey
            }))

        await this.getDatasetStateAssertion(datasetId, expectState)
    }

    async approveDatasetMetadataAssertion(
        datasetId: number,
        expectState: DatasetState
    ): Promise<void> {
        let [governance, governanceKey] = this.accounts.getGovernance()
        await handleEvmError(this.contractsManager.DatasetMetadataEvm().approveDatasetMetadata(
            datasetId,
            {
                from: governance,
                privateKey: governanceKey
            }))

        await this.getDatasetStateAssertion(datasetId, expectState)
    }

    async rejectDatasetAssertion(
        datasetId: number,
        expectState: DatasetState
    ): Promise<void> {
        let [governance, governanceKey] = this.accounts.getGovernance()
        await handleEvmError(this.contractsManager.DatasetMetadataEvm().rejectDataset(
            datasetId,
            {
                from: governance,
                privateKey: governanceKey
            }))
        await this.getDatasetStateAssertion(datasetId, expectState)
    }

    async rejectDatasetMetadataAssertion(
        datasetId: number,
        expectState: DatasetState
    ): Promise<void> {
        let [governance, governanceKey] = this.accounts.getGovernance()
        await handleEvmError(this.contractsManager.DatasetMetadataEvm().rejectDatasetMetadata(
            datasetId,
            {
                from: governance,
                privateKey: governanceKey
            }))
        await this.getDatasetStateAssertion(datasetId, expectState)
    }

    async getDatasetReplicasCountAssertion(datasetId: number, expectCount: number): Promise<void> {
        let replicasCount = await handleEvmError(this.contractsManager.DatasetRequirementEvm().getDatasetReplicasCount(datasetId))
        expect(expectCount).to.equal(Number(replicasCount.data))

    }

    async getDatasetReplicaRequirementAssertion(datasetId: number, index: number, expectRequirement: DatasetRequirement): Promise<void> {
        let requirement = await handleEvmError(this.contractsManager.DatasetRequirementEvm().getDatasetReplicaRequirement(datasetId, index))
        expect(true).to.equal(equal(requirement.data?.dataPreparers as string[], expectRequirement.dataPreparers))
        expect(true).to.equal(equal(requirement.data?.storageProviders as string[], expectRequirement.storageProviders))
        expect(true).to.equal(equal(Number(requirement.data?.regionCode), expectRequirement.regionCode))
        expect(true).to.equal(equal(Number(requirement.data?.countryCode), expectRequirement.countryCode))
        expect(true).to.equal(equal(utils.convertToNumberArray(requirement.data!.cityCodes), expectRequirement.cityCodes))

    }

    async getDatasetPreCollateralRequirementsAssertion(datasetId: number, expectPreCollateral: bigint): Promise<void> {
        let preCollateral = await handleEvmError(this.contractsManager.DatasetRequirementEvm().getDatasetPreCollateralRequirements(datasetId))
        expect(preCollateral).to.be.equal(expectPreCollateral)
    }

    async submitDatasetReplicaRequirementsAssertion(datasetId: number, expectRequirements: DatasetRequirements, expectAmount: bigint): Promise<void> {
        let [client, clientKey] = this.accounts.getClient()
        let expectReplicasCount = expectRequirements.dataPreparers.length
        await handleEvmError(this.contractsManager.DatasetRequirementEvm().submitDatasetReplicaRequirements(
            datasetId,
            expectRequirements.dataPreparers,
            expectRequirements.storageProviders,
            expectRequirements.regionCodes,
            expectRequirements.countryCodes,
            expectRequirements.cityCodes,
            expectAmount,
            {
                from: client,
                privateKey: clientKey
            }
        ))
        this.getDatasetReplicasCountAssertion(datasetId, expectReplicasCount)
        let index = utils.getRandomInt(0, expectReplicasCount - 1)
        let expectRequirement = new DatasetRequirement({
            dataPreparers: expectRequirements.dataPreparers[index],
            storageProviders: expectRequirements.storageProviders[index],
            regionCode: expectRequirements.regionCodes[index],
            countryCode: expectRequirements.countryCodes[index],
            cityCodes: expectRequirements.cityCodes[index]
        })
        this.getDatasetReplicaRequirementAssertion(datasetId, index, expectRequirement)
    }
    async datasetsChallengeAssertion(expectDatasetChallengeAddress: string): Promise<void> {
        let datasetsChallenge = await handleEvmError(this.contractsManager.DatasetProofEvm().datasetsChallenge())
        expect(expectDatasetChallengeAddress).to.be.equal(datasetsChallenge.data)
    }

    async getDatasetAppendCollateralAssertion(datasetId: number, expectAppendCollateral: bigint): Promise<void> {
        let appendCollateral = await handleEvmError(this.contractsManager.DatasetProofEvm().getDatasetAppendCollateral(datasetId))
        expect(expectAppendCollateral).to.be.equal(appendCollateral.data)
    }

    async getDatasetProofAssertion(
        datasetId: number,
        dataType: DataType,
        index: number,
        len: number,
        expectProof: string[]
    ): Promise<void> {
        let proof = await handleEvmError(this.contractsManager.DatasetProofEvm().getDatasetProof(datasetId, dataType, index, len))
        expect(equal(expectProof, proof.data)).to.be.true
    }

    async getDatasetProofCountAssertion(
        datasetId: number,
        dataType: DataType,
        expectProofCount: number
    ): Promise<void> {
        let proofCount = await handleEvmError(this.contractsManager.DatasetProofEvm().getDatasetProofCount(datasetId, dataType))
        expect(expectProofCount).to.be.equal(Number(proofCount.data))
    }

    async getDatasetProofSubmitterAssertion(datasetId: number, expectProofSubmitter: string): Promise<void> {
        let proofSubmitter = await handleEvmError(this.contractsManager.DatasetProofEvm().getDatasetProofSubmitter(datasetId))
        expect(expectProofSubmitter).to.be.equal(Number(proofSubmitter.data))
    }

    async getDatasetSizeAssertion(datasetId: number, dataType: DataType, expectSize: number): Promise<void> {
        let size = await handleEvmError(this.contractsManager.DatasetProofEvm().getDatasetSize(datasetId, dataType))
        expect(expectSize).to.be.equal(Number(size.data))
    }

    async getDatasetCollateralRequirementAssertion(datasetId: number, expectCollateral: bigint): Promise<void> {
        let collateral = await handleEvmError(this.contractsManager.DatasetProofEvm().getDatasetCollateralRequirement(datasetId))
        expect(expectCollateral).to.be.equal(collateral.data)
    }

    async getDatasetDataAuditorFeesRequirementAssertion(datasetId: number, expectAuditorFeesRequirement: bigint): Promise<void> {
        let fees = await handleEvmError(this.contractsManager.DatasetProofEvm().getDatasetDataAuditorFeesRequirement(datasetId))
        expect(expectAuditorFeesRequirement).to.be.equal(fees.data)
    }

    async getDatasetDataAuditorFeesAssertion(datasetId: number, expectAuditorFees: bigint): Promise<void> {
        let fees = await handleEvmError(this.contractsManager.DatasetProofEvm().getDatasetDataAuditorFees(datasetId))
        expect(expectAuditorFees).to.be.equal(fees.data)
    }

    async isDatasetProofallCompletedAssertion(datasetId: number, dataType: DataType, expectRet: boolean): Promise<void> {
        let ret = await handleEvmError(this.contractsManager.DatasetProofEvm().isDatasetProofallCompleted(datasetId, dataType))
        expect(expectRet).to.be.equal(ret.data)
    }

    async isDatasetContainsCarAssertion(datasetId: number, id: number, expectRet: boolean): Promise<void> {
        let ret = await handleEvmError(this.contractsManager.DatasetProofEvm().isDatasetContainsCar(datasetId, id))
        expect(expectRet).to.be.equal(ret.data)
    }

    async isDatasetContainsCarsAssertion(datasetId: number, ids: number[], expectRet: boolean): Promise<void> {
        let ret = await handleEvmError(this.contractsManager.DatasetProofEvm().isDatasetContainsCars(datasetId, ids))
        expect(expectRet).to.be.equal(ret.data)
    }

    async isDatasetProofSubmitterAssertion(datasetId: number, submitter: string, expectRet: boolean): Promise<void> {
        let ret = await handleEvmError(this.contractsManager.DatasetProofEvm().isDatasetProofSubmitter(datasetId, submitter))
        expect(expectRet).to.be.equal(ret.data)
    }

    async initDatasetsProofDependenciesAssertion(expectDatasetsChallenge: string): Promise<void> {
        let [governance, governanceKey] = this.accounts.getGovernance()
        let ret = await handleEvmError(this.contractsManager.DatasetProofEvm().initDependencies(
            expectDatasetsChallenge,
            {
                from: governance,
                privateKey: governanceKey
            }))
        await this.datasetsChallengeAssertion(expectDatasetsChallenge)
    }

    async submitDatasetProofRootAssertion(
        datasetId: number,
        dataType: DataType,
        mappingFilesAccessMethod: string,
        rootHash: string,
        expectSubmitter: string
    ): Promise<void> {
        let [expectDataPreparer, dataPreparerKey] = this.accounts.getProofSubmitter()
        await handleEvmError(this.contractsManager.DatasetProofEvm().submitDatasetProofRoot(
            datasetId,
            dataType,
            mappingFilesAccessMethod,
            rootHash,
            {
                from: expectDataPreparer,
                privateKey: dataPreparerKey
            }))
        await this.getDatasetProofSubmitterAssertion(datasetId, expectDataPreparer)
        await this.isDatasetProofSubmitterAssertion(datasetId, expectDataPreparer, true)
    }
    async submitDatasetProofAssertion(
        datasetId: number,
        dataType: DataType,
        expectLeafHashes: string[],
        expectLeafIndex: number,
        expectLeafSizes: number[],
        expectCompleted: boolean,
    ): Promise<void> {
        let [dataPreparer, dataPreparerKey] = this.accounts.getProofSubmitter()
        await handleEvmError(this.contractsManager.DatasetProofEvm().submitDatasetProof(
            datasetId,
            dataType,
            expectLeafHashes,
            expectLeafIndex,
            expectLeafSizes,
            expectCompleted,
            {
                from: dataPreparer,
                privateKey: dataPreparerKey
            }
        ))
        let carsIds = await handleEvmError(this.contractsManager.CarstoreEvm().getCarsIds(expectLeafHashes))
        await this.isDatasetContainsCarsAssertion(datasetId, carsIds, true)
        await this.isDatasetContainsCarAssertion(datasetId, carsIds[0], true)
    }

    async submitDatasetProofCompletedAssertion(
        datasetId: number,
        expectState: DatasetState
    ): Promise<void> {
        let [dataPreparer, dataPreparerKey] = this.accounts.getProofSubmitter()
        await handleEvmError(this.contractsManager.DatasetProofEvm().submitDatasetProofCompleted(
            datasetId,
            {
                from: dataPreparer,
                privateKey: dataPreparerKey
            }
        ))
        await this.isDatasetProofallCompletedAssertion(datasetId, DataType.MappingFiles, true)
        await this.isDatasetProofallCompletedAssertion(datasetId, DataType.Source, true)
        await this.getDatasetStateAssertion(datasetId, expectState)
    }

    async appendDatasetFundsAssertion(
        datasetId: number,
        expectDatacapCollateral: bigint,
        expectDataAuditorFees: bigint,
    ): Promise<void> {
        let [client, clientKey] = this.accounts.getClient()
        await handleEvmError(this.contractsManager.DatasetProofEvm().appendDatasetFunds(
            datasetId,
            expectDatacapCollateral,
            expectDataAuditorFees,
            {
                from: client,
                privateKey: clientKey,
                value: expectDataAuditorFees + expectDatacapCollateral
            }
        ))
        await this.getDatasetStateAssertion(datasetId, DatasetState.MetadataApproved)
    }

    async getDatasetChallengeProofsAssertion(
        datasetId: number,
        auditor: string,
        expects: DatasetChallenge
    ): Promise<void> {
        let challengeProof = await handleEvmError(this.contractsManager.DatasetChallengeEvm().getDatasetChallengeProofs(
            datasetId,
            auditor
        ))
        expect(equal(expects.leaves, challengeProof.data.leaves)).to.be.true
        expect(equal(expects.paths, challengeProof.data.paths)).to.be.true
        expect(equal(expects.siblings, challengeProof.data.siblings)).to.be.true
    }

    async getDatasetChallengeProofsCountAssertion(datasetId: number, expectCount: number): Promise<void> {
        let challengeProofsCount = await handleEvmError(this.contractsManager.DatasetChallengeEvm().getDatasetChallengeProofsCount(
            datasetId
        ))
        expect(expectCount).to.be.equal(Number(challengeProofsCount.data))
    }

    async getChallengeSubmissionCountAssertion(datasetId: number, expectCount: number): Promise<void> {
        let challengeSubmissionCount = await handleEvmError(this.contractsManager.DatasetChallengeEvm().getChallengeSubmissionCount(datasetId))
        expect(expectCount).to.be.equal(Number(challengeSubmissionCount.data))
    }

    async isDatasetChallengeProofDuplicateAssertion(
        datasetId: number,
        auditor: string,
        randomSeed: number,
        expectRet: boolean
    ): Promise<void> {
        let ret = await handleEvmError(this.contractsManager.DatasetChallengeEvm().isDatasetChallengeProofDuplicate(
            datasetId,
            auditor,
            randomSeed
        ))
        expect(expectRet).to.be.equal(ret.data)
    }

    async submitDatasetChallengeProofsAssertion(
        datasetId: number,
        randomSeed: number,
        leaves: string[],
        siblings: string[][],
        paths: number[],
    ): Promise<void> {
        let count = await handleEvmError(this.contractsManager.DatasetChallengeEvm().getDatasetChallengeProofsCount(datasetId))
        let [auditor, auditorKey] = this.accounts.getDatasetAuditor()
        await handleEvmError(this.contractsManager.DatasetChallengeEvm().submitDatasetChallengeProofs(
            datasetId,
            randomSeed,
            leaves,
            siblings,
            paths,
            {
                from: auditor,
                privateKey: auditorKey
            }
        ))
        await this.getDatasetChallengeProofsCountAssertion(datasetId, Number(count.data) + 1)
    }
}