import { ActionType } from 'hardhat/types'

export const deployLinkToken: ActionType<void> = async (taskArguments, hre) => {
    const LinkToken = await hre.ethers.getContractFactory('LinkToken')
    const linkToken = await LinkToken.deploy()

    await linkToken.deployed()

    console.table({ 'Link Token Address': linkToken.address })
}
