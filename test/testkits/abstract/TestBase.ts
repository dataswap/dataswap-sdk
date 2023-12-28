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

/**
 * Represents the base class for test execution.
 */
export abstract class TestBase {
    /**
     * Executes an optional action before the main test action.
     * Returns 0 by default.
     * @param args - Additional arguments for the optional action.
     * @returns A promise resolving to a number (0 by default).
     */
    async optionalBefore(...args: any[]): Promise<number> { return 0 }

    /**
     * Performs actions before the main test action based on the provided ID.
     * @param id - Identifier for the action.
     * @param args - Additional arguments for the action.
     * @returns A promise resolving to a number.
     */
    private async before(id?: number, ...args: any[]): Promise<number> {
        try {
            if (!id || id === 0) {
                return await this.optionalBefore(...args)
            }
            return id
        } catch (error) {
            throw error
        }
    }

    /**
     * Represents the main action to be performed in the test.
     * To be implemented in the derived classes.
     * @param id - Identifier for the action.
     * @param args - Additional arguments for the action.
     * @returns A promise resolving to a number.
     */
    abstract action(id: number, ...args: any[]): Promise<number>

    /**
     * Performs actions after the main test action.
     * @param id - Identifier for the action.
     * @param args - Additional arguments for the action.
     * @returns A promise resolving to void.
     */
    async after(id: number, ...args: any[]): Promise<void> { }

    /**
     * Executes the test sequence.
     * @param id - Identifier for the action.
     * @param args - Additional arguments for the action.
     * @returns A promise resolving to a number.
     */
    async run(id?: number, ...args: any[]): Promise<number> {
        try {
            let targetId = await this.before(id, ...args)
            let ret = await this.action(targetId, ...args)
            if (targetId === 0) {
                targetId = ret
            }
            await this.after(targetId, ...args)
            return targetId
        } catch (error) {
            throw error
        }
    }
}
