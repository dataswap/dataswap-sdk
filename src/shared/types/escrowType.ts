export enum EscrowType {
    DatacapCollateral, // The storage client collateral.
    DatacapChunkCollateral, // The storage provider collateral.
    DataAuditCollateral, // The data auditor collateral, for dispute
    DataPrepareCollateral, // The data preparer collateral,for dispute
    DataAuditFee, // The data auditor calculate fees.
    DataPrepareFeeByClient, // The data preparer calculate fees paid by SC.
    DataPrepareFeeByProvider, // The data preparer calculate fees paid by SP.
}

export enum EscrowOperateType {
    Deposit,
    Withdraw,
}
