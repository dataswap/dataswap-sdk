import dotenv from 'dotenv';
import { IContractsManager } from './interfaces/environments/IContractsManater';
import { ContractsManager } from './shared/contractsManager';
import { IAccounts } from './interfaces/environments/IAccounts';
import { Accounts } from './shared/accounts';
import { IGenerator } from './interfaces/environments/IGenerator';
import { Generator } from './shared/generator';
import { IDatasetsHelper } from './interfaces/helper/module/IDatasetshelper';
import { DatasetsHelper } from './helpers/module/datasetsHelper';


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

export function mochaGlobalSetup() {
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
}
