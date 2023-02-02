import { ActionType } from "hardhat/types";

export const deployConsumerContract: ActionType<{
  oracleAddress: string;
  verifyContract: boolean;
}> = async (taskArgs, hre) => {
  const { oracleAddress, verifyContract } = taskArgs;

  console.log(`Deploying FunctionsConsumer contract to ${hre.network.name}`)

  const clientContractFactory = await hre.ethers.getContractFactory("FunctionsConsumer")
  const clientContract = await clientContractFactory.deploy(oracleAddress)

  console.log(`Waiting for transaction ${clientContract.deployTransaction.hash} to be confirmed...`)
  await clientContract.deployed()

  if (verifyContract && (process.env.POLYGONSCAN_API_KEY || process.env.ETHERSCAN_API_KEY)) {
    try {
      console.log("Verifying contract...")
      await hre.run("verify:verify", {
        address: clientContract.address,
        constructorArguments: [oracleAddress],
      })
      console.log("Contract verified")
    } catch (error) {
      if (error instanceof Error && error.message.includes("Already Verified")) {
        console.log("Contract already verified")
      } else {
        console.error("Failed to verify contract:", error)
      }
    }
  } else if (verifyContract) {
    console.warn("POLYGONSCAN_API_KEY or ETHERSCAN_API_KEY missing. Skipping contract verification...")
  }

  console.table({ "FunctionsConsumer": clientContract.address })
}
