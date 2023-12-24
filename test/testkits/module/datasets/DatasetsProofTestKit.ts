import { DatasetsTestBase } from "./abstract/DatasetsTestBase";
import { DataType } from "../../../../src/shared/types/dataType";
import { expect } from "chai"
import { handleEvmError } from "../../../shared/error";
import { IContractsManager } from "../../../interfaces/setup/IContractsManater";
import { IDatasetsHelper } from "../../../interfaces/helper/module/IDatasetshelper";
import { IAccounts } from "../../../interfaces/setup/IAccounts";
import { IGenerator } from "../../../interfaces/setup/IGenerator";

export class SubmitDatasetProofRootSuccessTestKit extends DatasetsTestBase {
    private dataType: DataType
    constructor(dataType: DataType, _accounts: IAccounts, _generator: IGenerator, _contractsManager: IContractsManager, _datasetHelper?: IDatasetsHelper) {
        super(_accounts, _generator, _contractsManager, _datasetHelper)
        this.dataType = dataType
    }

    async optionalBefore(): Promise<number> {
        try {
            return await this.datasetsHelper.metadataApprovedDatasetWorkflow()
            //return [datasetId]
        } catch (error) {
            throw error
        }
    }

    async action(datasetId: number): Promise<number> {
        try {
            let [datasetPreparer, datasetPreparerKey] = this.accounts.getProofSubmitter()
            let [rootHash, , , mappingFilesAccessMethod] = this.generator.generateDatasetProof(0, this.dataType)

            await handleEvmError(this.contractsManager.DatasetProofEvm().submitDatasetProofRoot(
                datasetId,
                this.dataType,
                mappingFilesAccessMethod,
                rootHash,
                {
                    from: datasetPreparer,
                    privateKey: datasetPreparerKey,
                }
            ))

            let proofSubmitterOnChain = await handleEvmError(this.contractsManager.DatasetProofEvm().getDatasetProofSubmitter(datasetId))
            expect(datasetPreparer).to.equal(proofSubmitterOnChain.data)
            return datasetId
        } catch (error) {
            throw error
        }
    }
}