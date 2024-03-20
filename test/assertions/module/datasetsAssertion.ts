/*******************************************************************************
 *   (c) 2023 dataswap
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/

import { expect } from "chai"
import { IContractsManager } from "../../interfaces/setup/IContractsManater"
import { handleEvmError } from "../../../src/shared/errors"
import { DatasetMetadata } from "../../../src/module/dataset/metadata/types"
import { DatasetState } from "../../../src/shared/types/datasetType"
import { IDatasetsAssertion } from "../../interfaces/assertions/module/IDatasetsAssertion"
import { equal } from "@unipackage/utils"
import {
    DatasetRequirement,
    DatasetRequirements,
} from "../../../src/module/dataset/requirement/types"
import * as utils from "../../shared/utils"
import {
    convertToNumberArray,
    convertToStringArray,
} from "../../../src/shared/arrayUtils"
import { DataType } from "../../../src/shared/types/dataType"
import { DatasetChallenge } from "../../../src/module/dataset/challenge/types"
import { delay } from "@unipackage/utils"
import { EscrowType, FIL } from "../../../src/shared/types/financeType"
import exp from "constants"

export class DatasetsAssertion implements IDatasetsAssertion {
    private contractsManager: IContractsManager
    constructor(_contractsManager: IContractsManager) {
        this.contractsManager = _contractsManager
    }
    // Datasets

    /**
     * Asynchronously asserts the count overview based on the expected total, success, ongoing, and failed counts.
     * @param expectTotal The expected total count.
     * @param expectSuccess The expected success count.
     * @param expectOngoing The expected ongoing count.
     * @param expectFailed The expected failed count.
     * @returns A promise that resolves when the assertion is completed.
     */
    async getCountOverviewAssertion(
        expectTotal: bigint,
        expectSuccess: bigint,
        expectOngoing: bigint,
        expectFailed: bigint
    ): Promise<void> {
        const statistics = await handleEvmError(
            this.contractsManager.DatasetMetadataEvm().getCountOverview()
        )
        expect(expectTotal).to.be.equal(statistics.total)
        expect(expectSuccess).to.be.equal(statistics.success)
        expect(expectOngoing).to.be.equal(statistics.ongoing)
        expect(expectFailed).to.be.equal(statistics.failed)
    }

    /**
     * Asynchronously asserts the size overview based on the expected total, success, ongoing, and failed counts.
     * @param expectTotal The expected total count.
     * @param expectSuccess The expected success count.
     * @param expectOngoing The expected ongoing count.
     * @param expectFailed The expected failed count.
     * @returns A promise that resolves when the assertion is completed.
     */
    async getSizeOverviewAssertion(
        expectTotal: bigint,
        expectSuccess: bigint,
        expectOngoing: bigint,
        expectFailed: bigint
    ): Promise<void> {
        const statistics = await handleEvmError(
            this.contractsManager.DatasetMetadataEvm().getSizeOverview()
        )
        expect(expectTotal).to.be.equal(statistics.total)
        expect(expectSuccess).to.be.equal(statistics.success)
        expect(expectOngoing).to.be.equal(statistics.ongoing)
        expect(expectFailed).to.be.equal(statistics.failed)
    }

    /**
     * Retrieves the metadata for a specific dataset and asserts it against the expected data.
     * @param datasetId - The ID of the dataset.
     * @param expectData - The expected dataset metadata.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getDatasetMetadataAssertion(
        datasetId: number,
        expectData: DatasetMetadata
    ): Promise<void> {
        const metaData = await handleEvmError(
            this.contractsManager
                .DatasetMetadataEvm()
                .getDatasetMetadata(datasetId)
        )
        expect(expectData.title).to.be.equal(metaData.title)
        expect(expectData.industry).to.be.equal(metaData.industry)
        expect(expectData.name).to.be.equal(metaData.name)
        expect(expectData.description).to.be.equal(metaData.description)
        expect(expectData.source).to.be.equal(metaData.source)
        expect(expectData.accessMethod).to.be.equal(metaData.accessMethod)
        expect(expectData.sizeInBytes).to.be.equal(metaData.sizeInBytes)
        expect(expectData.isPublic).to.be.equal(metaData.isPublic)
        expect(expectData.version).to.be.equal(metaData.version)
        expect(datasetId).to.be.equal(metaData.datasetId)
    }

    /**
     * Retrieves the submitter for a specific dataset and asserts it against the expected submitter address.
     * @param datasetId - The ID of the dataset.
     * @param expectSubmitter - The expected submitter address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getDatasetMetadataSubmitterAssertion(
        datasetId: number,
        expectSubmitter: string
    ): Promise<void> {
        const submitter = await handleEvmError(
            this.contractsManager
                .DatasetMetadataEvm()
                .getDatasetMetadataSubmitter(datasetId)
        )
        expect(expectSubmitter).to.be.equal(submitter)
    }

    /**
     * Retrieves the client ID associated with the submitter for a specific dataset and asserts it.
     * @param datasetId - The ID of the dataset.
     * @param expectSubmitterClient - The expected submitter client ID.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getDatasetMetadataClientAssertion(
        datasetId: number,
        expectSubmitterClient: number
    ): Promise<void> {
        const submitterClient = await handleEvmError(
            this.contractsManager
                .DatasetMetadataEvm()
                .getDatasetMetadataClient(datasetId)
        )
        expect(expectSubmitterClient).to.be.equal(Number(submitterClient))
    }
    /**
     * Asynchronously retrieves parameters for dataset timeout assertion.
     *
     * @param datasetId The ID of the dataset.
     * @param expectProofBlockCount The expected number of proof blocks.
     * @param expectAuditBlockCount The expected number of audit blocks.
     * @returns {Promise<void>} A Promise that resolves when the parameters are retrieved.
     */
    async getDatasetTimeoutParametersAssersion(
        datasetId: number,
        expectProofBlockCount: bigint,
        expectAuditBlockCount: bigint
    ): Promise<void> {
        const datasetTimeoutParameters = await handleEvmError(
            this.contractsManager
                .DatasetMetadataEvm()
                .getDatasetTimeoutParameters(datasetId)
        )
        expect(datasetTimeoutParameters.proofBlockCount).to.be.equal(
            expectProofBlockCount
        )
        expect(datasetTimeoutParameters.auditBlockCount).to.be.equal(
            expectAuditBlockCount
        )
    }
    /**
     * Checks for the existence of dataset metadata and asserts the access method against the expectation.
     * @param expectAccessMethod - The expected access method.
     * @returns A Promise resolving if the assertion is successful.
     */
    async hasDatasetMetadataAssertion(
        expectAccessMethod: string
    ): Promise<void> {
        const has = await handleEvmError(
            this.contractsManager
                .DatasetMetadataEvm()
                .hasDatasetMetadata(expectAccessMethod)
        )
        expect(true).to.be.equal(has)
    }

    /**
     * Retrieves the state for a specific dataset and asserts it against the expected state.
     * @param datasetId - The ID of the dataset.
     * @param expectState - The expected dataset state.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getDatasetStateAssertion(
        datasetId: number,
        expectState: DatasetState
    ): Promise<void> {
        const state = await handleEvmError(
            this.contractsManager
                .DatasetMetadataEvm()
                .getDatasetState(datasetId)
        )
        expect(Number(expectState)).to.be.equal(Number(state))
    }

    /**
     * Asserts the governance address against the expected governance address.
     * @param expectGovernance - The expected governance address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async governanceAddressAssertion(expectGovernance: string): Promise<void> {
        const governance = await handleEvmError(
            this.contractsManager.DatasetMetadataEvm().governanceAddress()
        )
        expect(expectGovernance).to.be.equal(governance)
    }

    /**
     * Asynchronously updates parameters for dataset timeout assertion.
     *
     * @param caller The caller responsible for the update.
     * @param datasetId The ID of the dataset.
     * @param expectProofBlockCount The expected number of proof blocks.
     * @param expectAuditBlockCount The expected number of audit blocks.
     * @returns {Promise<void>} A Promise that resolves when the parameters are updated.
     */
    async updateDatasetTimeoutParametersAssertion(
        caller: string,
        datasetId: number,
        expectProofBlockCount: bigint,
        expectAuditBlockCount: bigint
    ): Promise<void> {
        this.contractsManager
            .DatasetMetadataEvm()
            .getWallet()
            .setDefault(caller)
        await handleEvmError(
            this.contractsManager
                .DatasetMetadataEvm()
                .updateDatasetTimeoutParameters(
                    datasetId,
                    expectProofBlockCount,
                    expectAuditBlockCount
                )
        )
        await this.getDatasetTimeoutParametersAssersion(
            datasetId,
            expectProofBlockCount,
            expectAuditBlockCount
        )
    }

    /**
     * Submits dataset metadata and asserts the client ID against the expected client ID.
     * @param caller - The caller that to send msg
     * @param expectDatasetClient - The expected dataset client ID.
     * @param expectData - The expected dataset metadata.
     * @returns A Promise resolving to the ID of the submitted dataset.
     */
    async submitDatasetMetadataAssertion(
        caller: string,
        expectDatasetClient: number,
        expectData: DatasetMetadata
    ): Promise<number> {
        this.contractsManager
            .DatasetMetadataEvm()
            .getWallet()
            .setDefault(caller)
        const countStatistic = await handleEvmError(
            this.contractsManager.DatasetMetadataEvm().getCountOverview()
        )
        const tx = await handleEvmError(
            this.contractsManager
                .DatasetMetadataEvm()
                .submitDatasetMetadata(
                    expectDatasetClient,
                    expectData.title,
                    expectData.industry,
                    expectData.name,
                    expectData.description,
                    expectData.source,
                    expectData.accessMethod,
                    expectData.sizeInBytes,
                    expectData.isPublic,
                    expectData.version
                )
        )
        await delay(4000)
        // Get transaction receipt and event arguments
        const receipt = await this.contractsManager
            .DatasetMetadataEvm()
            .getTransactionReceipt(tx.hash)

        const ret = this.contractsManager
            .DatasetMetadataEvm()
            .getEvmEventArgs(receipt!, "DatasetMetadataSubmitted")

        const datasetId = Number(ret.data.datasetId)
        await this.datasetsCountAssertion(datasetId)
        await this.getDatasetMetadataAssertion(datasetId, expectData)
        await this.getDatasetMetadataSubmitterAssertion(datasetId, caller)
        await this.getDatasetMetadataClientAssertion(
            datasetId,
            expectDatasetClient
        )
        await this.hasDatasetMetadataAssertion(expectData.accessMethod)
        await this.getCountOverviewAssertion(
            countStatistic.total + BigInt(1),
            countStatistic.success,
            countStatistic.ongoing + BigInt(1),
            countStatistic.failed
        )
        return datasetId
    }

    /**
     * Asserts the count of datasets against the expected datasets count.
     * @param expectDatasetsCount - The expected count of datasets.
     * @returns A Promise resolving if the assertion is successful.
     */
    async datasetsCountAssertion(expectDatasetsCount: number): Promise<void> {
        const datasetCount = await handleEvmError(
            this.contractsManager.DatasetMetadataEvm().datasetsCount()
        )
        expect(expectDatasetsCount).to.equal(Number(datasetCount))
    }

    //DatasetsRequirement
    /**
     * Asserts the count of replicas for a dataset against the expected count.
     * @param datasetId - The ID of the dataset.
     * @param expectCount - The expected count of replicas.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getDatasetReplicasCountAssertion(
        datasetId: number,
        expectCount: number
    ): Promise<void> {
        const replicasCount = await handleEvmError(
            this.contractsManager
                .DatasetRequirementEvm()
                .getDatasetReplicasCount(datasetId)
        )
        expect(expectCount).to.equal(Number(replicasCount))
    }

    /**
     * Asserts the requirements of a specific replica for a dataset against the expected requirements.
     * @param datasetId - The ID of the dataset.
     * @param index - The index of the replica.
     * @param expectRequirement - The expected requirements of the replica.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getDatasetReplicaRequirementAssertion(
        datasetId: number,
        index: bigint,
        expectRequirement: DatasetRequirement
    ): Promise<void> {
        const requirement = await handleEvmError(
            this.contractsManager
                .DatasetRequirementEvm()
                .getDatasetReplicaRequirement(datasetId, index)
        )
        expect(true).to.equal(
            equal(
                requirement?.dataPreparers as string[],
                expectRequirement.dataPreparers
            )
        )
        expect(true).to.equal(
            equal(
                requirement?.storageProviders as string[],
                expectRequirement.storageProviders
            )
        )
        expect(true).to.equal(
            equal(requirement?.regionCode, expectRequirement.regionCode)
        )
        expect(true).to.equal(
            equal(requirement?.countryCode, expectRequirement.countryCode)
        )
        expect(true).to.equal(
            equal(requirement!.cityCodes, expectRequirement.cityCodes)
        )
        expect(expectRequirement.index).to.be.equal(index)
        expect(expectRequirement.datasetId).to.be.equal(datasetId)
    }

    /**
     * Submits replica requirements for a dataset and asserts the requirements and amount against the expected values.
     * @param caller - The caller that to send msg
     * @param datasetId - The ID of the dataset.
     * @param expectRequirements - The expected replica requirements.
     * @param expectAmount - The expected amount associated with the requirements.
     * @returns A Promise resolving if the assertion is successful.
     */
    async submitDatasetReplicaRequirementsAssertion(
        caller: string,
        datasetId: number,
        expectRequirements: DatasetRequirements,
        expectAmount: bigint
    ): Promise<void> {
        try {
            const expectReplicasCount = expectRequirements.dataPreparers.length
            this.contractsManager
                .DatasetRequirementEvm()
                .getWallet()
                .setDefault(caller)
            await handleEvmError(
                this.contractsManager
                    .DatasetRequirementEvm()
                    .submitDatasetReplicaRequirements(
                        datasetId,
                        expectRequirements.dataPreparers,
                        expectRequirements.storageProviders,
                        expectRequirements.regions,
                        expectRequirements.countrys,
                        expectRequirements.citys,
                        expectAmount,
                        {
                            value: "5000000000000000000",
                        }
                    )
            )
            await delay(6000)
            await this.getDatasetReplicasCountAssertion(
                datasetId,
                expectReplicasCount
            )
            const index = utils.getRandomInt(0, expectReplicasCount - 1)
            const expectRequirement = new DatasetRequirement({
                dataPreparers: expectRequirements.dataPreparers[index],
                storageProviders: expectRequirements.storageProviders[index],
                regionCode: expectRequirements.regions[index],
                countryCode: expectRequirements.countrys[index],
                cityCodes: convertToNumberArray(
                    expectRequirements.citys[index]
                ),
                index: BigInt(index),
                datasetId: datasetId,
            })
            await this.getDatasetReplicaRequirementAssertion(
                datasetId,
                BigInt(index),
                expectRequirement
            )
        } catch (error) {
            throw error
        }
    }

    //DatasetsProof

    /**
     * Asserts the proof for a specific data type within a dataset against the expected proof.
     * @param datasetId - The ID of the dataset.
     * @param dataType - The type of data.
     * @param index - The index of the proof.
     * @param len - The length of the proof.
     * @param expectProof - The expected proof.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getDatasetProofAssertion(
        datasetId: number,
        dataType: DataType,
        index: number,
        len: number,
        expectProof: string[]
    ): Promise<void> {
        const proof = await handleEvmError(
            this.contractsManager
                .DatasetProofEvm()
                .getDatasetProof(datasetId, dataType, index, len)
        )
        expect(equal(expectProof, proof)).to.be.true
    }

    /**
     * Asserts the count of proofs for a specific data type within a dataset against the expected count.
     * @param datasetId - The ID of the dataset.
     * @param dataType - The type of data.
     * @param expectProofCount - The expected count of proofs.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getDatasetProofCountAssertion(
        datasetId: number,
        dataType: DataType,
        expectProofCount: number
    ): Promise<void> {
        const proofCount = await handleEvmError(
            this.contractsManager
                .DatasetProofEvm()
                .getDatasetProofCount(datasetId, dataType)
        )
        expect(expectProofCount).to.be.equal(Number(proofCount))
    }

    /**
     * Asserts the submitter of the dataset proof against the expected submitter address.
     * @param datasetId - The ID of the dataset.
     * @param expectProofSubmitter - The expected submitter address of the dataset proof.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getDatasetProofSubmitterAssertion(
        datasetId: number,
        expectProofSubmitter: string
    ): Promise<void> {
        const proofSubmitter = await handleEvmError(
            this.contractsManager
                .DatasetProofEvm()
                .getDatasetProofSubmitter(datasetId)
        )
        expect(expectProofSubmitter).to.be.equal(proofSubmitter)
    }

    /**
     * Asserts the size of a specific data type within a dataset against the expected size.
     * @param datasetId - The ID of the dataset.
     * @param dataType - The type of data.
     * @param expectSize - The expected size of the data type within the dataset.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getDatasetSizeAssertion(
        datasetId: number,
        dataType: DataType,
        expectSize: number
    ): Promise<void> {
        const size = await handleEvmError(
            this.contractsManager
                .DatasetProofEvm()
                .getDatasetSize(datasetId, dataType)
        )
        expect(expectSize).to.be.equal(Number(size))
    }

    /**
     * Asserts if all proofs for a specific data type within a dataset are completed.
     * @param datasetId - The ID of the dataset.
     * @param dataType - The type of data.
     * @param expectRet - The expected boolean value indicating if all proofs are completed.
     * @returns A Promise resolving if the assertion is successful.
     */
    async isDatasetProofallCompletedAssertion(
        datasetId: number,
        dataType: DataType,
        expectRet: boolean
    ): Promise<void> {
        const ret = await handleEvmError(
            this.contractsManager
                .DatasetProofEvm()
                .isDatasetProofallCompleted(datasetId, dataType)
        )
        expect(expectRet).to.be.equal(ret)
    }

    /**
     * Asserts if a specific car is contained within the dataset.
     * @param datasetId - The ID of the dataset.
     * @param id - The ID of the car.
     * @param expectRet - The expected boolean value indicating if the car is contained.
     * @returns A Promise resolving if the assertion is successful.
     */
    async isDatasetContainsCarAssertion(
        datasetId: number,
        id: number,
        expectRet: boolean
    ): Promise<void> {
        const ret = await handleEvmError(
            this.contractsManager
                .DatasetProofEvm()
                .isDatasetContainsCar(datasetId, id)
        )
        expect(expectRet).to.be.equal(ret)
    }

    /**
     * Asserts if multiple cars are contained within the dataset.
     * @param datasetId - The ID of the dataset.
     * @param ids - The IDs of the cars.
     * @param expectRet - The expected boolean value indicating if all cars are contained.
     * @returns A Promise resolving if the assertion is successful.
     */
    async isDatasetContainsCarsAssertion(
        datasetId: number,
        ids: number[],
        expectRet: boolean
    ): Promise<void> {
        const ret = await handleEvmError(
            this.contractsManager
                .DatasetProofEvm()
                .isDatasetContainsCars(datasetId, ids)
        )
        expect(expectRet).to.be.equal(ret)
    }

    /**
     * Asserts the submitter of dataset proofs against the expected submitter address.
     * @param datasetId - The ID of the dataset.
     * @param submitter - The submitter address of the dataset proof.
     * @param expectRet - The expected boolean value indicating if the submitter matches.
     * @returns A Promise resolving if the assertion is successful.
     */
    async isDatasetProofSubmitterAssertion(
        datasetId: number,
        submitter: string,
        expectRet: boolean
    ): Promise<void> {
        let ret = await handleEvmError(
            this.contractsManager
                .DatasetProofEvm()
                .isDatasetProofSubmitter(datasetId, submitter)
        )
        expect(expectRet).to.be.equal(ret)
    }

    /**
     * Asserts the submission of a dataset's proof root against the expected parameters.
     * @param datasetId - The ID of the dataset.
     * @param dataType - The type of data.
     * @param mappingFilesAccessMethod - The mapping files access method.
     * @param rootHash - The root hash of the proof.
     * @param expectSubmitter - The expected submitter address.
     * @returns A Promise resolving if the assertion is successful.
     */
    async submitDatasetProofRootAssertion(
        datasetId: number,
        dataType: DataType,
        mappingFilesAccessMethod: string,
        rootHash: string,
        expectSubmitter: string
    ): Promise<void> {
        try {
            this.contractsManager
                .DatasetProofEvm()
                .getWallet()
                .setDefault(expectSubmitter)
            await handleEvmError(
                this.contractsManager
                    .DatasetProofEvm()
                    .submitDatasetProofRoot(
                        datasetId,
                        dataType,
                        mappingFilesAccessMethod,
                        rootHash
                    )
            )
            await delay(4000)
            await this.getDatasetProofSubmitterAssertion(
                datasetId,
                expectSubmitter
            )
            await this.isDatasetProofSubmitterAssertion(
                datasetId,
                expectSubmitter,
                true
            )
        } catch (error) {
            throw error
        }
    }

    /**
     * Asserts the submission of dataset proof details against the expected parameters.
     * @param caller - The caller that to send msg
     * @param datasetId - The ID of the dataset.
     * @param dataType - The type of data.
     * @param expectLeafHashes - The expected leaf hashes in the proof.
     * @param expectLeafIndex - The expected leaf index in the proof.
     * @param expectLeafSizes - The expected leaf sizes in the proof.
     * @param expectCompleted - The expected completion status of the proof.
     * @returns A Promise resolving if the assertion is successful.
     */
    async submitDatasetProofAssertion(
        caller: string,
        datasetId: number,
        dataType: DataType,
        expectLeafHashes: string[],
        expectLeafIndex: number,
        expectLeafSizes: number[],
        expectCompleted: boolean
    ): Promise<void> {
        const sizeStatistic = await handleEvmError(
            this.contractsManager.DatasetMetadataEvm().getSizeOverview()
        )
        this.contractsManager.DatasetProofEvm().getWallet().setDefault(caller)
        let proofCount = await handleEvmError(
            this.contractsManager
                .DatasetProofEvm()
                .getDatasetProofCount(datasetId, dataType)
        )
        let datasetSize = await handleEvmError(
            this.contractsManager
                .DatasetProofEvm()
                .getDatasetSize(datasetId, dataType)
        )
        await handleEvmError(
            this.contractsManager
                .DatasetProofEvm()
                .submitDatasetProof(
                    datasetId,
                    dataType,
                    expectLeafHashes,
                    expectLeafIndex,
                    expectLeafSizes,
                    expectCompleted
                )
        )
        await delay(4000)
        const carsIds = await handleEvmError(
            this.contractsManager.CarstoreEvm().getCarsIds(expectLeafHashes)
        )
        await this.isDatasetContainsCarsAssertion(
            datasetId,
            convertToNumberArray(carsIds),
            true
        )
        await this.isDatasetContainsCarAssertion(
            datasetId,
            Number(carsIds[0]),
            true
        )
        await this.getDatasetProofAssertion(
            datasetId,
            dataType,
            expectLeafIndex,
            expectLeafHashes.length,
            expectLeafHashes
        )
        await this.getDatasetProofCountAssertion(
            datasetId,
            dataType,
            Number(proofCount) + expectLeafHashes.length
        )
        const sum = expectLeafSizes.reduce((acc, curr) => acc + curr, 0)
        await this.getDatasetSizeAssertion(
            datasetId,
            dataType,
            Number(datasetSize) + sum
        )
        await this.getSizeOverviewAssertion(
            sizeStatistic.total + BigInt(sum),
            sizeStatistic.success,
            sizeStatistic.ongoing + BigInt(sum),
            sizeStatistic.failed
        )
    }
    /**
     * Completes the escrow process for the dataset with the specified ID and expected state.
     * @param caller - The caller that to send msg
     * @param datasetId The ID of the dataset.
     * @param expectState The expected state of the dataset.
     * @returns A promise that resolves when the escrow process is completed.
     */
    async completeEscrowAssersion(
        caller: string,
        datasetId: number,
        expectState: DatasetState
    ): Promise<void> {
        this.contractsManager.DatasetProofEvm().getWallet().setDefault(caller)
        await handleEvmError(
            this.contractsManager.DatasetProofEvm().completeEscrow(datasetId)
        )
        await delay(4000)
        await this.getDatasetStateAssertion(datasetId, expectState)
    }
    /**
     * Asserts the completion status of a dataset's proof submission against the expected state.
     * @param caller - The caller that to send msg
     * @param datasetId - The ID of the dataset.
     * @param expectState - The expected state of the dataset.
     * @returns A Promise resolving if the assertion is successful.
     */
    async submitDatasetProofCompletedAssertion(
        caller: string,
        datasetId: number,
        expectState: DatasetState
    ): Promise<void> {
        this.contractsManager.DatasetProofEvm().getWallet().setDefault(caller)
        await handleEvmError(
            this.contractsManager
                .DatasetProofEvm()
                .submitDatasetProofCompleted(datasetId)
        )
        await delay(4000)
        await this.isDatasetProofallCompletedAssertion(
            datasetId,
            DataType.MappingFiles,
            true
        )
        await this.isDatasetProofallCompletedAssertion(
            datasetId,
            DataType.Source,
            true
        )
        await this.getDatasetStateAssertion(datasetId, expectState)
    }

    //DatasetsChallenge

    /**
     * Asserts the dataset's challenge proofs against the expected parameters.
     * @param datasetId - The ID of the dataset.
     * @param auditor - The address of the auditor.
     * @param expects - The expected dataset challenge proofs.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getDatasetChallengeProofsAssertion(
        datasetId: number,
        auditor: string,
        expects: DatasetChallenge
    ): Promise<void> {
        const challengeProof = await handleEvmError(
            this.contractsManager
                .DatasetChallengeEvm()
                .getDatasetChallengeProofs(datasetId, auditor)
        )
        expect(equal(expects.leaves, challengeProof.leaves)).to.be.true
        expect(equal(expects.paths, challengeProof.paths)).to.be.true
        expect(equal(expects.siblings, challengeProof.siblings)).to.be.true
        expect(expects.randomSeed).to.be.equal(challengeProof.randomSeed)
    }

    /**
     * Asserts the count of dataset challenge proofs against the expected count.
     * @param datasetId - The ID of the dataset.
     * @param expectCount - The expected count of challenge proofs.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getDatasetChallengeProofsCountAssertion(
        datasetId: number,
        expectCount: number
    ): Promise<void> {
        const challengeProofsCount = await handleEvmError(
            this.contractsManager
                .DatasetChallengeEvm()
                .getDatasetChallengeProofsCount(datasetId)
        )
        expect(expectCount).to.be.equal(Number(challengeProofsCount))
    }

    /**
     * Asserts the count of challenge submissions against the expected count.
     * @param datasetId - The ID of the dataset.
     * @param expectCount - The expected count of challenge submissions.
     * @returns A Promise resolving if the assertion is successful.
     */
    async getChallengeSubmissionCountAssertion(
        datasetId: number,
        expectCount: number
    ): Promise<void> {
        const challengeSubmissionCount = await handleEvmError(
            this.contractsManager
                .DatasetChallengeEvm()
                .getChallengeSubmissionCount(datasetId)
        )
        expect(expectCount).to.be.equal(Number(challengeSubmissionCount))
    }

    /**
     * Asserts whether a dataset's challenge proof is duplicate based on the provided parameters.
     * @param datasetId - The ID of the dataset.
     * @param auditor - The address of the auditor.
     * @param randomSeed - The random seed.
     * @param expectRet - The expected return value.
     * @returns A Promise resolving if the assertion is successful.
     */
    async isDatasetChallengeProofDuplicateAssertion(
        datasetId: number,
        auditor: string,
        randomSeed: bigint,
        expectRet: boolean
    ): Promise<void> {
        const ret = await handleEvmError(
            this.contractsManager
                .DatasetChallengeEvm()
                .isDatasetChallengeProofDuplicate(
                    datasetId,
                    auditor,
                    randomSeed
                )
        )
        expect(expectRet).to.be.equal(ret)
    }
    /**
     * Asynchronously asserts auditor stake.
     *
     * @param caller The caller asserting the auditor stake.
     * @param datasetId The ID of the dataset.
     * @param expectAmount The amount of stake being asserted.
     * @returns {Promise<void>} A Promise that resolves when the assertion is completed.
     */
    async auditorStakeAssersion(
        caller: string,
        datasetId: number,
        expectAmount: bigint
    ): Promise<void> {
        this.contractsManager.FinanceEvm().getWallet().setDefault(caller)
        await handleEvmError(
            this.contractsManager
                .FinanceEvm()
                .deposit(datasetId, 0, caller, FIL, {
                    value: expectAmount,
                })
        )

        this.contractsManager
            .DatasetChallengeEvm()
            .getWallet()
            .setDefault(caller)

        await handleEvmError(
            this.contractsManager
                .DatasetChallengeEvm()
                .auditorStake(datasetId, expectAmount)
        )
        const accountEscrow = await this.contractsManager
            .FinanceEvm()
            .getAccountEscrow(
                datasetId,
                0,
                caller,
                FIL,
                EscrowType.EscrowChallengeAuditCollateral
            )
        expect(accountEscrow.data!.current).to.be.equal(expectAmount)
    }

    /**
     * Asserts the submission of dataset challenge proofs against the expected parameters.
     * @param caller - The caller that to send msg
     * @param datasetId - The ID of the dataset.
     * @param randomSeed - The random seed for the challenge proof.
     * @param leaves - The array of leaf hashes in the proof.
     * @param siblings - The array of sibling hashes in the proof.
     * @param paths - The array of paths in the proof.
     * @returns A Promise resolving if the assertion is successful.
     */
    async submitDatasetChallengeProofsAssertion(
        caller: string,
        datasetId: number,
        randomSeed: bigint,
        leaves: string[],
        siblings: string[][],
        paths: bigint[]
    ): Promise<void> {
        const count = await handleEvmError(
            this.contractsManager
                .DatasetChallengeEvm()
                .getDatasetChallengeProofsCount(datasetId)
        )
        this.contractsManager
            .DatasetChallengeEvm()
            .getWallet()
            .setDefault(caller)

        const tx = await handleEvmError(
            this.contractsManager
                .DatasetChallengeEvm()
                .submitDatasetChallengeProofs(
                    datasetId,
                    randomSeed,
                    leaves,
                    siblings,
                    paths
                )
        )
        await delay(4000)

        await this.getDatasetChallengeProofsAssertion(
            datasetId,
            caller,
            new DatasetChallenge({
                leaves: leaves,
                siblings: siblings,
                paths: convertToStringArray(paths),
                randomSeed: randomSeed,
            })
        )

        await this.getDatasetStateAssertion(datasetId, DatasetState.Approved)
        await this.getDatasetChallengeProofsCountAssertion(
            datasetId,
            Number(count) + 1
        )

        await this.isDatasetChallengeProofDuplicateAssertion(
            datasetId,
            caller,
            randomSeed,
            true
        )

        let expectSubmissionCount: number
        const carsCount = await handleEvmError(
            this.contractsManager
                .DatasetProofEvm()
                .getDatasetProofCount(datasetId, DataType.Source)
        )
        if (Number(carsCount) < 1000) {
            expectSubmissionCount = 1
        } else {
            expectSubmissionCount = carsCount / 1000 + 1
        }
        await this.getChallengeSubmissionCountAssertion(
            datasetId,
            expectSubmissionCount
        )
    }
}
