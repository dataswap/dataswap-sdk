import { TestBase } from "../../../abstract/TestBase";
import { DatasetsHelper } from "../../../../helpers/module/datasetsHelper"
import { IContractsManager } from "../../../../interfaces/environments/IContractsManater";
import { IAccounts } from "../../../../interfaces/environments/IAccounts";
import { IDatasetsHelper } from "../../../../interfaces/helper/module/IDatasetshelper";
import { IGenerator } from "../../../../interfaces/environments/IGenerator";


export abstract class DatasetsTestBase extends TestBase {
    protected datasetsHelper: IDatasetsHelper
    protected generator: IGenerator

    constructor(_accounts: IAccounts, _generator: IGenerator, _contractsManager: IContractsManager, _datasetsHelper?: IDatasetsHelper) {
        super(_accounts, _contractsManager)
        if (_datasetsHelper) {
            this.datasetsHelper = _datasetsHelper
        } else {
            this.datasetsHelper = new DatasetsHelper(_accounts, _generator, _contractsManager)
        }

        this.generator = _generator
    }
}