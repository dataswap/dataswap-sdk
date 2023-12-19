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
            let tx = await this.contractsManager.DatasetMetadataEvm().submitDatasetMetadata(
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
            )
            // Handle transaction failure
            if (!tx.ok) {
                throw tx.error
            }

            // Get transaction receipt and event arguments
            const receipt = await this.contractsManager.DatasetMetadataEvm().getTransactionReceipt(
                tx.data.hash
            )

            let ret = this.contractsManager.DatasetMetadataEvm().getEvmEventArgs(receipt!, "DatasetMetadataSubmitted")

            let datasetId = Number(ret.data.datasetId)

            let metadataOnChain = await this.contractsManager.DatasetMetadataEvm().getDatasetMetadata(datasetId)
            if (!metadataOnChain.ok) {
                throw metadataOnChain.error
            }
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
        console.log("SubmitRequirementSuccessTestKit optionalBefore")
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
            let tx = await this.contractsManager.DatasetRequirementEvm().submitDatasetReplicaRequirements(
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
            )
            // Handle transaction failure
            if (!tx.ok) {
                throw tx.error
            }


            // Get updated dataset state
            let call = await this.contractsManager.DatasetMetadataEvm().getDatasetState(datasetId)
            if (!call.ok) {
                throw call.error
            }
            expect(BigInt(DatasetState.MetadataSubmitted)).to.equal(call.data)

            call = await this.contractsManager.DatasetRequirementEvm().getDatasetReplicasCount(datasetId)
            if (!call.ok) {
                throw call.error
            }

            // Assertions for dataset state and metadata
            expect(BigInt(5)).to.equal(call.data)
            let ret = await this.contractsManager.DatasetRequirementEvm().getDatasetReplicaRequirement(datasetId, 0)
            if (!ret.ok) {
                throw ret.error
            }
            expect(true).to.equal(equal(ret.data?.dataPreparers as string[], requirments.dataPreparers[0]))
            expect(true).to.equal(equal(ret.data?.storageProviders as string[], requirments.storageProviders[0]))
            expect(true).to.equal(equal(Number(ret.data?.regionCode), requirments.regionCodes[0]))
            expect(true).to.equal(equal(Number(ret.data?.countryCode), requirments.countryCodes[0]))
            expect(true).to.equal(equal(utils.convertToNumberArray(ret.data!.cityCodes), requirments.cityCodes[0]))
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
            console.log("ApproveDatasetMetadataSuccessTestKit optionalBefore")
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

            let call = await handleEvmError(this.contractsManager.DatasetMetadataEvm().getDatasetState(datasetId))
            expect(BigInt(DatasetState.MetadataApproved)).to.equal(call.data)
            return datasetId
        } catch (error) {
            throw error
        }
    }
}