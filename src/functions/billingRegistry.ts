import { BigNumber } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { FunctionsBillingRegistry__factory } from "../../types";

export const getSubscriptionInfo = async (
  hre: HardhatRuntimeEnvironment,
  registryAddress: string,
  subscriptionId: number
): Promise<{
  balance: BigNumber;
  owner: string;
  consumers: string[];
}> => {
  const [signer] = await hre.ethers.getSigners();
  const registry = FunctionsBillingRegistry__factory.connect(registryAddress, signer);
  return registry.getSubscription(subscriptionId);
};
