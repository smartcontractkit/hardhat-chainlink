import { ActionType } from "hardhat/types";

export const getSubscriptionInfo: ActionType<{
  registryAddress: string;
  subscriptionId: number;
}> = async (taskArgs, hre) => {
  const { registryAddress, subscriptionId } = taskArgs;

  console.log(`Reading subscription ${subscriptionId} info from Functions registry ${registryAddress} on network ${hre.network.name}`);
  const subInfo = await hre.chainlink.functionsGetSubscriptionInfo(
    registryAddress,
    subscriptionId
  );

  console.log(`Subscription ${subscriptionId} owner: ${subInfo.owner}`);
  console.log(`Balance: ${hre.ethers.utils.formatEther(subInfo.balance)} LINK`);
  console.log(
    `${subInfo.consumers.length} authorized consumer contract${subInfo.consumers.length === 1 ? "" : "s"
    }:`
  );
  console.log(subInfo.consumers);
};
