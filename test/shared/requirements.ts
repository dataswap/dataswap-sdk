import { ethers } from 'ethers'
import { Accounts } from './accounts'
import * as utils from './utils'
const REQUIREMENTS_COUNT = 5
const REQUIREMENTS_MAX_ACTOR_COUNT = 5
const REQUIREMENTS_MIN_ACTOR_COUNT = 3

function getRequirementActors(count: number, minActors: number, maxActors: number): string[][] {
    let actors: string[][] = []
    for (let i = 0; i < count; i++) {
        let actorsCount = utils.getRandomInt(minActors, maxActors)
        let requirement: string[] = []
        for (let j = 0; j < actorsCount; j++) {
            let wallet = ethers.Wallet.createRandom();
            requirement.push(wallet.address)
        }
        actors.push(requirement)
    }
    return actors
}

function getArray(count: number): number[] {
    let ret: number[] = []
    for (let i = 0; i < count; i++) {
        let rand = utils.getRandomInt(1, 256)
        ret.push(rand)
    }
    return ret
}
function getTwoDimensionalArray(count: number, minMembers: number, maxMembers: number): number[][] {
    let ret: number[][] = []
    for (let i = 0; i < count; i++) {
        let memberCount = utils.getRandomInt(minMembers, maxMembers)
        let requirement: number[] = []
        for (let j = 0; j < memberCount; j++) {
            let rand = utils.getRandomInt(1, 10000000)
            requirement.push(rand)
        }
        ret.push(requirement)
    }
    return ret
}

export class Requirements {
    private static instance: Requirements;
    private dataPreparers: string[][] = []
    private storageProviders: string[][] = []
    private regions: number[] = []
    private countrys: number[] = []
    private citys: number[][] = []

    private constructor() {
        this.dataPreparers = getRequirementActors(REQUIREMENTS_COUNT, REQUIREMENTS_MIN_ACTOR_COUNT, REQUIREMENTS_MAX_ACTOR_COUNT)
        this.storageProviders = getRequirementActors(REQUIREMENTS_COUNT, REQUIREMENTS_MIN_ACTOR_COUNT, REQUIREMENTS_MAX_ACTOR_COUNT)
        this.regions = getArray(REQUIREMENTS_COUNT)
        this.countrys = getArray(REQUIREMENTS_COUNT)
        this.citys = getTwoDimensionalArray(REQUIREMENTS_COUNT, REQUIREMENTS_MIN_ACTOR_COUNT, REQUIREMENTS_MAX_ACTOR_COUNT)
    }

    public static Instance(): Requirements {
        if (!Requirements.instance) {
            Requirements.instance = new Requirements();
        }
        return Requirements.instance;
    }

    getDataPreparers(): string[][] {
        return this.dataPreparers
    }

    getStorageProviders(): string[][] {
        return this.storageProviders
    }

    getRegions(): number[] {
        return this.regions
    }

    getCountrys(): number[] {
        return this.countrys
    }

    getCitys(): number[][] {
        return this.citys
    }

    getRequirementsCount(): number {
        return REQUIREMENTS_COUNT
    }
}