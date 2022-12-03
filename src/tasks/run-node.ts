import * as compose from 'docker-compose'
import { join } from 'path'
import { ActionType } from 'hardhat/types'

export const runNode: ActionType<{ restartOnly: boolean }> = async (taskArgs): Promise<void> => {
    const { restartOnly } = taskArgs
    try {
        if (restartOnly) {
            await compose.restartAll({ cwd: join(__dirname), log: true })
        } else {
            await compose.down({ cwd: join(__dirname), log: true })
            await compose.upAll({ cwd: join(__dirname), log: true })
        }
        console.log('Node running')
    } catch (e) {
        console.log('Encountered errors when trying to run node')
        console.error(e)
    }
}
