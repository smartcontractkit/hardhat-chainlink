import { ActionType } from "hardhat/types";

import { cancelSubscription } from "../../functions";

export const cancelSubscriptionAction: ActionType<{
  registryAddress: string;
  subscriptionId: number;
  refundAddress: string;
}> = async (taskArgs, hre) => {
  const { refundAddress, subscriptionId, registryAddress } = taskArgs;

  console.log(
    `Cancelling subscription ${subscriptionId} with refund to ${
      refundAddress || "owner"
    }...`
  );

  await cancelSubscription(hre, registryAddress, subscriptionId, refundAddress);

  console.log(`Subscription ${subscriptionId} has been cancelled.`);
};
