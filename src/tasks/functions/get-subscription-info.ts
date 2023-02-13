import { ActionType } from "hardhat/types";

export const getSubscriptionInfo: ActionType<{
  registryAddress: string;
  subscriptionId: number;
}> = async (taskArgs, hre) => {
  const { registryAddress, subscriptionId } = taskArgs;

  console.log(
    `Reading subscription ${subscriptionId} info from Functions registry ${registryAddress} on network ${hre.network.name}`
  );
  const subInfo = await hre.chainlink.functionsGetSubscriptionInfo(
    registryAddress,
    subscriptionId
  );

  console.table({
    Owner: subInfo.owner,
    Balance: `${hre.ethers.utils.formatEther(subInfo.balance)} LINK`,
  });

  console.log(`Authorized consumers:`);
  console.table(subInfo.consumers);
};
