export interface IAccounts {
    getClient(): [string, string]
    getDatasetAuditor(): [string, string]
    getProofSubmitter(): [string, string]
    getBidder(): [string, string]
    getGovernance(): [string, string]
}