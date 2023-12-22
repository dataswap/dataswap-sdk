export abstract class TestBase {
    async optionalBefore(): Promise<number> { return 0 }

    private async before(id?: number): Promise<number> {
        try {
            if (!id) {
                return await this.optionalBefore()
            }
            return id
        } catch (error) {
            throw error
        }
    }


    abstract action(id: number): Promise<number>

    async after(id: number): Promise<void> { }

    async run(id?: number): Promise<number> {
        try {
            let targetId = await this.before(id)
            let ret = await this.action(targetId)
            if (targetId === 0) {
                targetId = ret
            }
            await this.after(targetId)
            return targetId
        } catch (error) {
            throw error
        }
    }
}