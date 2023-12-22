import { TestSetup } from "./TestSetup"
import { IContractsManager } from "../../interfaces/setup/IContractsManater"
import { IAccounts } from "../../interfaces/setup/IAccounts"

export abstract class TestBase extends TestSetup {
    constructor(_accounts: IAccounts, _contractsManager: IContractsManager) {
        super(_accounts, _contractsManager)
    }
    async optionalBefore(): Promise<number> { return 0 }

    private async before(id?: number): Promise<number> {
        try {
            if (!id) {
                await super.setup()
                return await this.optionalBefore()
            }
            return id
        } catch (error) {
            throw error
        }
    }


    abstract action(id: number): Promise<number>

    async after(id: number): Promise<void> { }

    async run(id?: number): Promise<number> {
        try {
            let targetId = await this.before(id)
            let ret = await this.action(targetId)
            if (targetId === 0) {
                targetId = ret
            }
            await this.after(targetId)
            return targetId
        } catch (error) {
            throw error
        }
    }
}