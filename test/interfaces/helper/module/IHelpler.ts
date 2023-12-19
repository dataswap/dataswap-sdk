
export interface IHelper {
    completeDependentWorkflow(requireState: number, requireWorkflow: () => Promise<number>): Promise<number>
    getWorkflowTargetId(state: number): number
    updateWorkflowTargetState(id: number, newState: number): void
}