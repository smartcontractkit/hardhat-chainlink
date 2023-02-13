import { ActionType } from "hardhat/types";

import { fundSubscription } from "../../functions";

export const fundSubscriptionAction: ActionType<{
  registryAddress: string;
  subscriptionId: number;
  linkAmount: string;
}> = async (taskArgs, hre) => {
  const { linkAmount, subscriptionId, registryAddress } = taskArgs;

  console.log(
    `Funding with subscription ${subscriptionId} with ${linkAmount} LINK`
  );

  const newBalance = await fundSubscription(
    hre,
    registryAddress,
    subscriptionId,
    linkAmount
  );

  console.log(
    `Subscription ${subscriptionId} new balance: ${hre.ethers.utils.formatEther(
      newBalance
    )} LINK`
  );
};
