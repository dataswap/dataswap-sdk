import { IContractsManager } from "../../interfaces/environments/IContractsManater"
import { IAccounts } from "../../interfaces/environments/IAccounts"

export class TestSetup {
    protected accounts: IAccounts
    protected contractsManager: IContractsManager

    constructor(_accounts: IAccounts, _contractsManager: IContractsManager) {
        this.accounts = _accounts
        this.contractsManager = _contractsManager
    }
    /**
     * Set up the helper, including setting up roles for contracts.
     * @returns A Promise that resolves when the setup is complete.
     */
    async setup(): Promise<void> {
        try {
            await this.contractsManager.setupAccountsRoles()
            await this.contractsManager.setupContractsRoles()
            await this.contractsManager.setupContractsDependencies()
        } catch (error) {
            throw error
        }
    }
}
