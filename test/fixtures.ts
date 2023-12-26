import dotenv from 'dotenv';
import { IContractsManager } from './interfaces/setup/IContractsManater';
import { ContractsManager } from './testkits/setup/contractsManager';
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
let generatorInstance: IGenerator | null = null;
let datasetHelperInstance: IDatasetsHelper | null = null;

export function getContractsManager(): IContractsManager {
    if (!contractsManagerInstance) {
        throw new Error('Contracts manager not initialized');
    }
    return contractsManagerInstance;
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
    contractsManagerInstance = new ContractsManager();
    datasetHelperInstance = new DatasetsHelper(
        generatorInstance,
        contractsManagerInstance
    )
    let testSetup = new DataswapTestSetup(contractsManagerInstance)
    await testSetup.run()
}
