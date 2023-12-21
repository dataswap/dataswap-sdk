export enum EscrowType {
    DatacapCollateral, // The storage client collateral.
    DatacapChunkCollateral, // The storage provider collateral.
    DataAuditCollateral, // The dataset auditor collateral, for dispute
    DataPrepareCollateral, // The data preparer collateral,for dispute
    DatasetAuditFee, // The dataset auditor calculate fees.
    TotalDataPrepareFeeByClient, // The data preparer calculate fees of dataset paid by storage client.
    DataPrepareFeeByClient, // The data preparer calculate fees of matching paid by storage client.
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
