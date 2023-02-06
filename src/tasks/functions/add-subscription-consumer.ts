import { ActionType } from "hardhat/types";

import { addSubscriptionConsumer } from "../../functions";

export const addSubscriptionConsumerAction: ActionType<{
  registryAddress: string;
  subscriptionId: number;
  clientContractAddress: string;
}> = async (taskArgs, hre) => {
  const { subscriptionId, registryAddress, clientContractAddress } = taskArgs;

  console.log(
    `Adding subscription ${subscriptionId} consumer ${clientContractAddress}...`
  );

  await addSubscriptionConsumer(
    hre,
    registryAddress,
    subscriptionId,
    clientContractAddress
  );

  console.log(
    `Client ${clientContractAddress} has been authorized with subscription: ${subscriptionId}`
  );
};
