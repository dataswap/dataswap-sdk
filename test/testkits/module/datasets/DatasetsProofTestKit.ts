import { DatasetsHelper } from "../../../helpers/module/datasetsHelper";
import { DatasetsTestBase } from "./abstract/DatasetsTestBase";
import { DataType } from "../../../../src/shared/types/datasetType";
import { expect } from "chai"
import { handleEvmError } from "../../../shared/error";
import { IContractsManager } from "../../../interfaces/environments/IContractsManater";
import { IDatasetsHelper } from "../../../interfaces/helper/module/IDatasetshelper";
import { IAccounts } from "../../../interfaces/environments/IAccounts";
import { IGenerator } from "../../../interfaces/environments/IGenerator";

export class SubmitDatasetProofRootSuccessTestKit extends DatasetsTestBase {
    private dataType: DataType
    constructor(dataType: DataType, _accounts: IAccounts, _generator: IGenerator, _contractsManager: IContractsManager, _datasetHelper?: IDatasetsHelper) {
        super(_accounts, _generator, _contractsManager, _datasetHelper)
        this.dataType = dataType
    }

    async optionalBefore(): Promise<number> {
        try {
            console.log("ApproveDatasetMetadataSuccessTestKit optionalBefore")
            return await this.datasetsHelper.metadataApprovedDatasetWorkflow()
            //return [datasetId]
        } catch (error) {
            throw error
        }
    }

    async action(datasetId: number): Promise<number> {
        try {
            let [dp, dpkey] = this.accounts.getProofSubmitter()
            let [rootHash, , , mappingFilesAccessMethod] = this.generator.generateDatasetProof(0, this.dataType)

            await handleEvmError(this.contractsManager.DatasetProofEvm().submitDatasetProofRoot(
                datasetId,
                this.dataType,
                mappingFilesAccessMethod,
                rootHash,
                {
                    from: dp,
                    privateKey: dpkey,
                }
            ))

            let call = await handleEvmError(this.contractsManager.DatasetProofEvm().getDatasetProofSubmitter(datasetId))
            expect(dp).to.equal(call.data)
            return datasetId
        } catch (error) {
            throw error
        }
    }
}