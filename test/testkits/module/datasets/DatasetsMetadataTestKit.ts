import { DatasetsTestBase } from "./abstract/DatasetsTestBase";
import { expect } from "chai"
import { DatasetsHelper } from "../../../helpers/module/datasetsHelper";
import { DatasetState } from "../../../../src/shared/types/datasetType";
import { equal } from "@unipackage/utils"
import * as utils from "../../../shared/utils"
import { handleEvmError } from "../../../shared/error";
import { IContractsManager } from "../../../interfaces/environments/IContractsManater";
import { IDatasetsHelper } from "../../../interfaces/helper/module/IDatasetshelper";
import { IAccounts } from "../../../interfaces/environments/IAccounts";
import { IGenerator } from "../../../interfaces/environments/IGenerator";

export class SubmitMetadataSuccessTestKit extends DatasetsTestBase {
    constructor(_accounts: IAccounts, _generator: IGenerator, _contractsManager: IContractsManager) {
        super(_accounts, _generator, _contractsManager)
    }

    async action(_: number): Promise<number> {
        try {
            let [client, clientkey] = this.accounts.getClient()
            let datasetMetadata = this.generator.generateDatasetMetadata()
            let clientId = 100

            // Submit dataset metadata transaction
            let tx = await handleEvmError(this.contractsManager.DatasetMetadataEvm().submitDatasetMetadata(
                clientId,
                datasetMetadata.title,
                datasetMetadata.industry,
                datasetMetadata.name,
                datasetMetadata.description,
                datasetMetadata.source,
                datasetMetadata.accessMethod,
                datasetMetadata.sizeInBytes,
                datasetMetadata.isPublic,
                datasetMetadata.version,
                {
                    from: client,
                    privateKey: clientkey,
                }
            ))

            // Get transaction receipt and event arguments
            const receipt = await this.contractsManager.DatasetMetadataEvm().getTransactionReceipt(
                tx.data.hash
            )

            let ret = this.contractsManager.DatasetMetadataEvm().getEvmEventArgs(receipt!, "DatasetMetadataSubmitted")

            let datasetId = Number(ret.data.datasetId)

            let metadataOnChain = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetMetadata(datasetId))

            expect(datasetMetadata.title).to.equal(metadataOnChain.data!.title)
            //expect(true).to.equal(equal(datasetMetadata, metadataOnChain.data!))
            return datasetId
        } catch (error) {
            throw error
        }
    }
}

export class SubmitRequirementSuccessTestKit extends DatasetsTestBase {
    private dependentTestKit: SubmitMetadataSuccessTestKit
    constructor(_accounts: IAccounts, _generator: IGenerator, _contractsManager: IContractsManager, _datasetHelper?: IDatasetsHelper) {
        super(_accounts, _generator, _contractsManager, _datasetHelper)
        this.dependentTestKit = new SubmitMetadataSuccessTestKit(_accounts, _generator, _contractsManager)
    }

    async optionalBefore(): Promise<number> {
        try {
            return await this.dependentTestKit.run()
        } catch (error) {
            throw error
        }
    }

    async action(datasetId: number): Promise<number> {
        try {

            let [client, clientkey] = this.accounts.getClient()
            // Generate dataset requirements
            let requirments = this.generator.generateDatasetRequirements(5, 3)

            // Submit dataset replica requirements transaction
            let tx = await handleEvmError(this.contractsManager.DatasetRequirementEvm().submitDatasetReplicaRequirements(
                datasetId,
                requirments.dataPreparers,
                requirments.storageProviders,
                requirments.regionCodes,
                requirments.countryCodes,
                requirments.cityCodes,
                BigInt(0),
                {
                    from: client,
                    privateKey: clientkey,
                }
            ))

            // Get updated dataset state
            let datasetStateOnChain = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetState(datasetId))

            expect(BigInt(DatasetState.MetadataSubmitted)).to.equal(datasetStateOnChain.data)

            let replicasCountOnChain = await handleEvmError(this.contractsManager.DatasetRequirementEvm().getDatasetReplicasCount(datasetId))

            // Assertions for dataset state and metadata
            expect(BigInt(5)).to.equal(replicasCountOnChain.data)
            let requiementOnChain = await handleEvmError(this.contractsManager.DatasetRequirementEvm().getDatasetReplicaRequirement(datasetId, 0))

            expect(true).to.equal(equal(requiementOnChain.data?.dataPreparers as string[], requirments.dataPreparers[0]))
            expect(true).to.equal(equal(requiementOnChain.data?.storageProviders as string[], requirments.storageProviders[0]))
            expect(true).to.equal(equal(Number(requiementOnChain.data?.regionCode), requirments.regionCodes[0]))
            expect(true).to.equal(equal(Number(requiementOnChain.data?.countryCode), requirments.countryCodes[0]))
            expect(true).to.equal(equal(utils.convertToNumberArray(requiementOnChain.data!.cityCodes), requirments.cityCodes[0]))
            return datasetId
        } catch (error) {
            throw error
        }
    }
}

export class ApproveDatasetMetadataSuccessTestKit extends DatasetsTestBase {
    constructor(_accounts: IAccounts, _generator: IGenerator, _contractsManager: IContractsManager, _datasetHelper?: IDatasetsHelper) {
        super(_accounts, _generator, _contractsManager, _datasetHelper)
    }

    async optionalBefore(): Promise<number> {
        try {
            return await this.datasetsHelper.metadataSubmittedDatasetWorkflow(5, 3)
            //return [datasetId]
        } catch (error) {
            throw error
        }
    }

    async action(datasetId: number): Promise<number> {
        try {
            let [governance, governanceKey] = this.accounts.getGovernance()

            await handleEvmError(this.contractsManager.DatasetMetadataEvm().approveDatasetMetadata(
                datasetId,
                {
                    from: governance,
                    privateKey: governanceKey,
                }
            ))

            let datasetStateOnChain = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetState(datasetId))
            expect(BigInt(DatasetState.MetadataApproved)).to.equal(datasetStateOnChain.data)
            return datasetId
        } catch (error) {
            throw error
        }
    }
}