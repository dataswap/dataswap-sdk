import dotenv from 'dotenv';
import { IContractsManager } from './interfaces/setup/IContractsManater';
import { ContractsManager } from './testkits/setup/contractsManager';
import { IAccounts } from './interfaces/setup/IAccounts';
import { Accounts } from './testkits/setup/accounts';
import { IGenerator } from './interfaces/setup/IGenerator';
import { Generator } from './testkits/setup/generator';
import { IDatasetsHelper } from './interfaces/helper/module/IDatasetshelper';
import { DatasetsHelper } from './helpers/module/datasetsHelper';
import { DataswapTestSetup } from './testkits/setup/dataswapTestSetup';


function setup() {
    // import test Environmental parameters
    dotenv.config()
}

let contractsManagerInstance: IContractsManager | null = null;
let accountsInstance: IAccounts | null = null;
let generatorInstance: IGenerator | null = null;
let datasetHelperInstance: IDatasetsHelper | null = null;

export function getContractsManager(): IContractsManager {
    if (!contractsManagerInstance) {
        throw new Error('Contracts manager not initialized');
    }
    return contractsManagerInstance;
}

export function getAccounts(): IAccounts {
    if (!accountsInstance) {
        throw new Error('Accounts not initialized');
    }
    return accountsInstance;
}

export function getGenerator(): IGenerator {
    if (!generatorInstance) {
        throw new Error('Generator not initialized');
    }
    return generatorInstance;
}
export function getDatasetsHelper(): IDatasetsHelper {
    if (!datasetHelperInstance) {
        throw new Error('datasetHelper not initialized');
    }
    return datasetHelperInstance;
}

export async function mochaGlobalSetup() {
    setup()
    console.log(`@@@@ Mocha add hooks finished @@@@`)
    generatorInstance = new Generator();
    accountsInstance = new Accounts();
    contractsManagerInstance = new ContractsManager(accountsInstance);
    datasetHelperInstance = new DatasetsHelper(
        accountsInstance,
        generatorInstance,
        contractsManagerInstance
    )
    let testSetup = new DataswapTestSetup(contractsManagerInstance)
    await testSetup.run()
}
