import { IHelper } from "./IHelpler"

export interface IMatchingsHelper extends IHelper {
    publishedMatchingWorkflow(): Promise<number>
    inProgressMatchingWorkflow(): Promise<number>
    pausedMatchingWorkflow(): Promise<number>
    completedMatchingWorkflow(): Promise<number>
}