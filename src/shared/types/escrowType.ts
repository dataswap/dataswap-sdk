/*******************************************************************************
 *   (c) 2023 dataswap
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/

/**
 * Enum representing the types of escrow, including collateral, fees, and other related operations.
 */
export enum EscrowType {
    DatacapCollateral, // The storage client collateral. index = datasetId
    DatacapChunkCollateral, // The storage provider collateral. index = matchingId
    DataAuditCollateral, // The dataset auditor collateral, for dispute. index = datasetId
    DataPrepareCollateral, // The data preparer collateral,for dispute. index = datasetId
    DatasetAuditFee, // The dataset auditor calculate fees. index = datasetId
    TotalDataPrepareFeeByClient, // The data preparer calculate fees of dataset paid by storage client. index = datasetId
    DataPrepareFeeByClient, // The data preparer calculate fees of matching paid by storage client. index = matchingId
    DataPrepareFeeByProvider, // The data preparer calculate fees paid by storage provider. index = matchingId
}

/**
 * Enum representing the types of escrow operations.
 */
export enum EscrowOperateType {
    Collateral,
    CollateralWithdraw,
    CollateralBurned,
    Payment,
    PaymentRefund,
    PaymentWithdraw,
}
