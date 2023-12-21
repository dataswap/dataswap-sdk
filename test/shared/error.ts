export async function handleEvmError(txPromise: Promise<any>) {
    try {
        const tx = await txPromise
        if (!tx.ok) {
            console.error(tx.error)
            throw tx.error
        }

        return tx
    } catch (error) {
        console.error(error)
        throw error
    }
}
