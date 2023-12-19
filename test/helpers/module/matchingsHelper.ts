import { IMatchingsHelper } from "../../interfaces/helper/module/IMatchingsHelper"
import { BasicHelper } from "./basicHelper"
import { MatchingState } from "../../../src/shared/types/matchingType"
import { expect } from "chai"

class MatchingsHelper extends BasicHelper implements IMatchingsHelper {
    async publishedMatchingWorkflow(): Promise<number> {
        return 0
    }
    async inProgressMatchingWorkflow(): Promise<number> {
        return 0
    }
    async pausedMatchingWorkflow(): Promise<number> {
        return 0
    }
    async completedMatchingWorkflow(): Promise<number> {
        return 0
    }
}
