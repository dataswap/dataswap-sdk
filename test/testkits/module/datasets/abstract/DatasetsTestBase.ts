import { TestBase } from "../../../abstract/TestBase";
import { DatasetsHelper } from "../../../../helpers/module/datasetsHelper"
import { IContractsManager } from "../../../../interfaces/setup/IContractsManater";
import { IDatasetsHelper } from "../../../../interfaces/helper/module/IDatasetshelper";
import { IGenerator } from "../../../../interfaces/setup/IGenerator";
import { IDatasetsAssertion } from "../../../../interfaces/assertions/module/IDatasetsAssertion";


export abstract class DatasetsTestBase extends TestBase {
    protected generator: IGenerator
    protected contractsManager: IContractsManager
    protected datasetsHelper: IDatasetsHelper
    protected assertion: IDatasetsAssertion

    constructor(_assertion: IDatasetsAssertion, _generator: IGenerator, _contractsManager: IContractsManager, _datasetsHelper?: IDatasetsHelper) {
        super()
        if (_datasetsHelper) {
            this.datasetsHelper = _datasetsHelper
        } else {
            this.datasetsHelper = new DatasetsHelper(_generator, _contractsManager)
        }
        this.generator = _generator
        this.contractsManager = _contractsManager
        this.assertion = _assertion
    }
}