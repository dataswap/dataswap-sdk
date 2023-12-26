export abstract class TestBase {
    async optionalBefore(...args: any[]): Promise<number> { return 0 }

    private async before(id?: number, ...args: any[]): Promise<number> {
        try {
            if (!id) {
                return await this.optionalBefore(...args)
            }
            return id
        } catch (error) {
            throw error
        }
    }


    abstract action(id: number, ...args: any[]): Promise<number>

    async after(id: number, ...args: any[]): Promise<void> { }

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