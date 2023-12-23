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
    private associatedMappingFilesMatchingIds: Map<number, number>
    private matchingDatasetIdMap: Map<number, number>

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
        this.associatedMappingFilesMatchingIds = new Map<number, number>()
        this.matchingDatasetIdMap = new Map<number, number>()
    }

    private _getTargetDatasetId(matchingId: number): number | undefined {
        return this.matchingDatasetIdMap.get(matchingId)
    }
    private _setTargetDatasetId(matchingId: number, datasetId: number): void {
        this.matchingDatasetIdMap.set(matchingId, datasetId)
    }
    getAssociatedMappingFilesMatchingId(matchingId: number): number | undefined {
        return this.associatedMappingFilesMatchingIds.get(matchingId)
    }

    setAssociatedMappingFilesMatchingId(matchingId: number, associatedMatchingId: any): void {
        this.associatedMappingFilesMatchingIds.set(matchingId, associatedMatchingId)
    }

    async createdMatchingWorkflow(dataType: DataType, targetDatasetId?: number): Promise<number> {
        try {
            let datasetId = 0
            if (!targetDatasetId) {
                datasetId = await this.datasetHelper.aprovedDatasetWorkflow()
            } else {
                datasetId = targetDatasetId
            }

            let replicasCount = await handleEvmError(this.contractsManager.DatasetRequirementEvm().getDatasetReplicasCount(datasetId))
            let replicaIndex = this.generator.datasetNextReplicaIndex(datasetId, replicasCount.data)
            let [
                bidSelectionRule,
                biddingDelayBlockCount,
                biddingPeriodBlockCount,
                storageCompletionPeriodBlocks,
                biddingThreshold,
                additionalInfo,
            ] = this.generator.generatorMatchingInfo(datasetId, replicaIndex)

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
                let associatedMappingFilesMatchingId = this.getAssociatedMappingFilesMatchingId(matchingId)
                if (!associatedMappingFilesMatchingId) {
                    associatedMatchingId = await this.completeDependentWorkflow(
                        MatchingState.Completed,
                        async (): Promise<number> => {
                            return await this.completedMatchingWorkflow(DataType.MappingFiles, datasetId)
                        }
                    )
                    this.setAssociatedMappingFilesMatchingId(matchingId, associatedMatchingId)
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

            let matchingState = await handleEvmError(this.contractsManager.MatchingMetadataEvm().getMatchingState(matchingId))
            expect(BigInt(MatchingState.None)).to.equal(matchingState.data)
            this.updateWorkflowTargetState(matchingId, Number(MatchingState.None))
            return matchingId
        } catch (error) {
            throw error
        }
    }

    async inProgressMatchingWorkflow(dataType: DataType, targetDatasetId?: number): Promise<number> {
        try {
            let matchingId = await this.completeDependentWorkflow(
                Number(MatchingState.None),
                async (): Promise<number> => {
                    return await this.createdMatchingWorkflow(dataType, targetDatasetId)
                }
            )
            let datasetId = this._getTargetDatasetId(matchingId)

            let matchingCount = await handleEvmError(this.contractsManager.DatasetProofEvm().getDatasetProofCount(datasetId!, dataType))

            let cars = await handleEvmError(this.contractsManager.DatasetProofEvm().getDatasetProof(
                datasetId!,
                dataType,
                0,
                matchingCount.data,
            ))

            let carsIds = await handleEvmError(this.contractsManager.CarstoreEvm().getCarsIds(cars.data))
            let { starts, ends } = utils.splitNumbers(carsIds)

            let [dataPreparer, dataPreparersKey] = this.accounts.getProofSubmitter()
            await handleEvmError(this.contractsManager.MatchingTargetEvm().publishMatching(
                matchingId,
                datasetId!,
                starts,
                ends,
                true,
                {
                    from: dataPreparer,
                    privateKey: dataPreparersKey
                }
            ))

            let matchingState = await handleEvmError(this.contractsManager.MatchingMetadataEvm().getMatchingState(matchingId))
            expect(BigInt(MatchingState.InProgress)).to.equal(matchingState.data)
            this.updateWorkflowTargetState(matchingId, Number(MatchingState.InProgress))
            return matchingId
        } catch (error) {
            throw error
        }
    }

    async pausedMatchingWorkflow(dataType: DataType, targetDatasetId?: number): Promise<number> {
        try {
            let matchingId = await this.completeDependentWorkflow(
                Number(MatchingState.InProgress),
                async (): Promise<number> => {
                    return await this.inProgressMatchingWorkflow(dataType, targetDatasetId)
                }
            )
            let [dataPreparer, dataPreparersKey] = this.accounts.getProofSubmitter()
            await handleEvmError(this.contractsManager.MatchingMetadataEvm().pauseMatching(
                matchingId,
                {
                    from: dataPreparer,
                    privateKey: dataPreparersKey
                }
            ))
            let matchingState = await handleEvmError(this.contractsManager.MatchingMetadataEvm().getMatchingState(matchingId))
            expect(BigInt(MatchingState.Paused)).to.equal(matchingState.data)
            this.updateWorkflowTargetState(matchingId, Number(MatchingState.Paused))
            return matchingId
        } catch (error) {
            throw error
        }
    }
    async completedMatchingWorkflow(dataType: DataType, targetDatasetId?: number): Promise<number> {
        try {
            let matchingId = await this.completeDependentWorkflow(
                Number(MatchingState.InProgress),
                async (): Promise<number> => {
                    return await this.inProgressMatchingWorkflow(dataType, targetDatasetId)
                }
            )

            let [bidder, bidderkey] = this.accounts.getBidder()
            await handleEvmError(this.contractsManager.MatchingBidsEvm().bidding(
                matchingId,
                BigInt(10000000000),
                {
                    from: bidder,
                    privateKey: bidderkey,
                    value: this.contractsManager.MatchingBidsEvm().generateWei("1", "ether")
                }))

            await handleEvmError(this.contractsManager.MatchingBidsEvm().closeMatching(
                matchingId,
                {
                    from: bidder,
                    privateKey: bidderkey,
                }
            ))

            let matchingState = await handleEvmError(this.contractsManager.MatchingMetadataEvm().getMatchingState(matchingId))
            expect(BigInt(MatchingState.Completed)).to.equal(matchingState.data)
            this.updateWorkflowTargetState(matchingId, Number(MatchingState.Completed))
            return matchingId
        } catch (error) {
            throw error
        }
    }
}
