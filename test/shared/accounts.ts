import { IAccounts } from "../interfaces/environments/IAccounts"
import * as utils from "./utils"

export class Accounts implements IAccounts {
    private client: string
    private clientKey: string
    private datasetAuditor: string
    private datasetAuditorKey: string
    private proofSubmitter: string
    private proofSubmitterKey: string
    private bidder: string
    private bidderKey: string
    private governance: string
    private governanceKey: string

    constructor() {
        this.client = utils.getAccountAddress("PRIVATE_KEY_METADATASUBMITTER")
        this.clientKey = utils.getAccountPrivateKey("PRIVATE_KEY_METADATASUBMITTER")
        this.datasetAuditor = utils.getAccountAddress("PRIVATE_KEY_DATASETAUDITOR")
        this.datasetAuditorKey = utils.getAccountPrivateKey("PRIVATE_KEY_DATASETAUDITOR")
        this.proofSubmitter = utils.getAccountAddress("PRIVATE_KEY_PROOFSUBMITTER")
        this.proofSubmitterKey = utils.getAccountPrivateKey("PRIVATE_KEY_PROOFSUBMITTER")
        this.bidder = utils.getAccountAddress("PRIVATE_KEY_BIDDER")
        this.bidderKey = utils.getAccountPrivateKey("PRIVATE_KEY_BIDDER")
        this.governance = utils.getAccountAddress("PRIVATE_KEY")
        this.governanceKey = utils.getAccountPrivateKey("PRIVATE_KEY")
    }

    getClient(): [string, string] {
        return [this.client, this.clientKey]
    }

    getDatasetAuditor(): [string, string] {
        return [this.datasetAuditor, this.datasetAuditorKey]
    }

    getProofSubmitter(): [string, string] {
        return [this.proofSubmitter, this.proofSubmitterKey]
    }

    getBidder(): [string, string] {
        return [this.bidder, this.bidderKey]
    }

    getGovernance(): [string, string] {
        return [this.governance, this.governanceKey]
    }
}


