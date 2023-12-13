export enum EscrowType {
    DatacapCollateral, // The storage client collateral.
    DatacapChunkCollateral, // The storage provider collateral.
    DataAuditCollateral, // The data auditor collateral, for dispute
    DataPrepareCollateral, // The data preparer collateral,for dispute
    DataAuditFee, // The data auditor calculate fees.
    DataPrepareFeeByClient, // The data preparer calculate fees paid by storage client.
    DataPrepareFeeByProvider // The data preparer calculate fees paid by storage provider.
}

export enum EscrowOperateType {
    Collateral,
    CollateralWithdraw,
    CollateralBurned,
    Payment,
    PaymentRefund,
    PaymentWithdraw,
}
