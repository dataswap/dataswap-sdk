/*******************************************************************************
 *   (c) 2023 dataswap
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/

import { IHelper } from "../../interfaces/helper/module/IHelpler"
/**
 * Implementation of the basic helper class that implements the IHelper interface.
 */
export class BasicHelper implements IHelper {
    private targets: Map<number, number>
    /**
     * Constructor for BasicHelper class.
     * Initializes the targets map.
     */
    constructor() {
        this.targets = new Map<number, number>()
    }

    /**
     * Complete a dependent workflow by checking the dataset state and executing a workflow if necessary.
     * @param requireDatasetState The required state of the dataset.
     * @param requireWorkflow A function that returns a Promise representing the workflow execution.
     * @returns A Promise that resolves with the target ID of the workflow.
     * @throws If an error occurs during the workflow execution.
     */
    async completeDependentWorkflow(
        requireDatasetState: number,
        requireWorkflow: () => Promise<number>
    ): Promise<number> {
        let targetId = this.getWorkflowTargetId(requireDatasetState)

        // If the target ID is not found, execute the required workflow
        if (targetId === 0) {
            try {
                targetId = await requireWorkflow()
            } catch (error) {
                targetId = 0
                throw error
            }
        }

        return targetId
    }

    /**
     * Get the workflow target ID based on the dataset state.
     * @param state The state of the dataset.
     * @returns The target ID associated with the dataset state.
     */
    getWorkflowTargetId(state: number): number {
        for (let [key, value] of this.targets) {
            if (value === state) {
                return key
            }
        }
        return 0
    }

    /**
     * Update the state of the workflow target associated with a specific ID.
     * @param id The ID of the workflow target.
     * @param newState The new state to set for the workflow target.
     */
    updateWorkflowTargetState(id: number, newState: number): void {
        this.targets.set(id, newState)
    }
}
