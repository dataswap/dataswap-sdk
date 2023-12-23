import { IMatchingsHelper } from "../../interfaces/helper/module/IMatchingsHelper"
import { BasicHelper } from "./basicHelper"
import { MatchingState } from "../../../src/shared/types/matchingType"
import { expect } from "chai"
import { handleEvmError } from "../../shared/error"
import { IGenerator } from "../../interfaces/setup/IGenerator"
import { IAccounts } from "../../interfaces/setup/IAccounts"
import { IContractsManager } from "../../interfaces/setup/IContractsManater"
import { IDatasetsHelper } from "../../interfaces/helper/module/IDatasetshelper"
import { DatasetState } from "../../../src/shared/types/datasetType"
import { DataType } from "../../../src/shared/types/dataType"
import * as utils from "../../shared/utils"

class MatchingsHelper extends BasicHelper implements IMatchingsHelper {
    private accounts: IAccounts
    private generator: IGenerator
    private contractsManager: IContractsManager
    private datasetHelper: IDatasetsHelper
    constructor(
        _accounts: IAccounts,
        _generator: IGenerator,
        _contractsManager: IContractsManager,
        _datasetHelper: IDatasetsHelper
    ) {
        super()
        this.accounts = _accounts
        this.generator = _generator
        this.contractsManager = _contractsManager
        this.datasetHelper = _datasetHelper
    }

    async publishedMatchingWorkflow(dataType: DataType, associatedMappingFilesMatchingId?: number): Promise<number> {
        let datasetId = await this.datasetHelper.aprovedDatasetWorkflow()
        let [
            bidSelectionRule,
            biddingDelayBlockCount,
            biddingPeriodBlockCount,
            storageCompletionPeriodBlocks,
            biddingThreshold,
            replicaIndex,
            additionalInfo,
        ] = this.generator.generatorMatchingInfo(datasetId, 0)
        let [dataPreparer, dataPreparersKey] = this.accounts.getProofSubmitter()
        let tx = await handleEvmError(this.contractsManager.MatchingMetadataEvm().createMatching(
            datasetId,
            bidSelectionRule,
            biddingDelayBlockCount,
            biddingPeriodBlockCount,
            storageCompletionPeriodBlocks,
            biddingThreshold,
            replicaIndex,
            additionalInfo,
            {
                from: dataPreparer,
                privateKey: dataPreparersKey,
                value: this.contractsManager.MatchingMetadataEvm().generateWei("1000000000", "wei")
            }
        ))
        // Get transaction receipt and event arguments
        const receipt = await this.contractsManager.MatchingMetadataEvm().getTransactionReceipt(
            tx.data.hash
        )

        let ret = this.contractsManager.DatasetMetadataEvm().getEvmEventArgs(receipt!, "MatchingCreated")
        let matchingId = Number(ret.data.matchingId)


        let associatedMatchingId: number = 0
        if (dataType === DataType.Source) {
            if (!associatedMappingFilesMatchingId) {
                throw new Error("associatedMappingFilesMatchingId must not nil when data type is source")
            } else {
                associatedMatchingId = associatedMappingFilesMatchingId
            }
        }

        await handleEvmError(this.contractsManager.MatchingTargetEvm().createTarget(
            matchingId,
            datasetId,
            dataType,
            associatedMatchingId,
            replicaIndex,
            {
                from: dataPreparer,
                privateKey: dataPreparersKey
            }
        ))

        let matchingCount = await handleEvmError(this.contractsManager.DatasetProofEvm().getDatasetProofCount(datasetId, dataType))

        let cars = await handleEvmError(this.contractsManager.DatasetProofEvm().getDatasetProof(
            datasetId,
            dataType,
            0,
            matchingCount.data,
        ))

        let carsIds = await handleEvmError(this.contractsManager.CarstoreEvm().getCarsIds(cars.data))
        let { starts, ends } = utils.splitNumbers(carsIds)
        await handleEvmError(this.contractsManager.MatchingTargetEvm().publishMatching(
            matchingId,
            datasetId,
            starts,
            ends,
            true,
            {
                from: dataPreparer,
                privateKey: dataPreparersKey
            }
        ))

        let matchingState = await handleEvmError(this.contractsManager.MatchingMetadataEvm().getMatchingState(matchingId))
        expect(BigInt(MatchingState.Published)).to.equal(matchingState.data)
        this.updateWorkflowTargetState(matchingId, Number(MatchingState.Published))
        expect(MatchingState.Published)

        return matchingId
    }

    async inProgressMatchingWorkflow(): Promise<number> {
        return 0
    }

    async pausedMatchingWorkflow(): Promise<number> {
        return 0
    }
    async completedMatchingWorkflow(): Promise<number> {
        return 0
    }
}
