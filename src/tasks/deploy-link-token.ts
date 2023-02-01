import { ActionType } from 'hardhat/types'
import LinkTokenArtifact from "../../artifacts/@chainlink/contracts/src/v0.4/LinkToken.sol/LinkToken.json"

export const deployLinkToken: ActionType<void> = async (taskArguments, hre) => {
    const LinkToken = await hre.ethers.getContractFactoryFromArtifact(LinkTokenArtifact)
    const linkToken = await LinkToken.deploy()

    await linkToken.deployed()

    console.table({ 'Link Token Address': linkToken.address })
}
