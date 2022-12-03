import { ActionType } from 'hardhat/types'

export const deployOracle: ActionType<{
    nodeAddress: string
    linkAddress: string
}> = async (taskArgs, hre) => {
    const { nodeAddress, linkAddress } = taskArgs

    const Oracle = await hre.ethers.getContractFactory('Oracle')
    const oracle = await Oracle.deploy(linkAddress)

    await oracle.deployed()

    // Set Fulfillment on Oracle
    await oracle.setFulfillmentPermission(nodeAddress, true)

    console.log(
        "All set on this end! If you've setup everything correctly, you can start getting external data from your smart contract"
    )

    console.table({ 'Oracle Address': oracle.address })
}
