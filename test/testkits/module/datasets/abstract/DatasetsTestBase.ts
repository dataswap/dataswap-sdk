import { TestBase } from "../../../abstract/TestBase";
import { DatasetsHelper } from "../../../../helpers/module/datasetsHelper"
import { IContractsManager } from "../../../../interfaces/setup/IContractsManater";
import { IAccounts } from "../../../../interfaces/setup/IAccounts";
import { IDatasetsHelper } from "../../../../interfaces/helper/module/IDatasetshelper";
import { IGenerator } from "../../../../interfaces/setup/IGenerator";


export abstract class DatasetsTestBase extends TestBase {
    protected accounts: IAccounts
    protected generator: IGenerator
    protected contractsManager: IContractsManager
    protected datasetsHelper: IDatasetsHelper

    constructor(_accounts: IAccounts, _generator: IGenerator, _contractsManager: IContractsManager, _datasetsHelper?: IDatasetsHelper) {
        super()
        if (_datasetsHelper) {
            this.datasetsHelper = _datasetsHelper
        } else {
            this.datasetsHelper = new DatasetsHelper(_accounts, _generator, _contractsManager)
        }
        this.accounts = _accounts
        this.generator = _generator
        this.contractsManager = _contractsManager
    }
}