import { BigNumber } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { FunctionsBillingRegistry__factory } from "../../types";
import { LinkTokenInterface__factory } from "../../types";
import { getLinkTokenAddress } from "../addresses";

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

export const fundSubscription = async (
  hre: HardhatRuntimeEnvironment,
  registryAddress: string,
  subscriptionId: number,
  linkAmount: string,
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const juelsAmount = hre.ethers.utils.parseUnits(linkAmount);
  const linkTokenAddress = getLinkTokenAddress(hre.network.config.chainId);
  const linkToken = LinkTokenInterface__factory.connect(linkTokenAddress, signer);
  const balance = await linkToken.balanceOf(signer.address);
  if (juelsAmount.gt(balance)) {
    throw Error(
      `Insufficent LINK balance. Trying to fund subscription with ${linkAmount} LINK, but only have ${hre.ethers.utils.formatEther(balance)}.`
    )
  }

  const fundTx = await linkToken.transferAndCall(
    registryAddress,
    juelsAmount,
    hre.ethers.utils.defaultAbiCoder.encode(["uint64"], [subscriptionId])
  );
  await fundTx.wait();

  const registry = FunctionsBillingRegistry__factory.connect(registryAddress, signer);
  return (await registry.getSubscription(subscriptionId)).balance;
};

export const addSubscriptionConsumer = async (
  hre: HardhatRuntimeEnvironment,
  registryAddress: string,
  subscriptionId: number,
  consumerAddress: string,
): Promise<void> => {
  const [signer] = await hre.ethers.getSigners();
  const registry = FunctionsBillingRegistry__factory.connect(registryAddress, signer);
  const addTx = await registry.addConsumer(subscriptionId, consumerAddress);
  await addTx.wait();
};

export const cancelSubscription = async (
  hre: HardhatRuntimeEnvironment,
  registryAddress: string,
  subscriptionId: number,
  refundAddress: string,
): Promise<void> => {
  const [signer] = await hre.ethers.getSigners();

  const subInfo = await getSubscriptionInfo(hre, registryAddress, subscriptionId);
  if (subInfo.owner !== signer.address) {
    throw Error("The current wallet is not the owner of the subscription")
  }

  if (!refundAddress || refundAddress === "") {
    refundAddress = subInfo.owner
  }

  const registry = FunctionsBillingRegistry__factory.connect(registryAddress, signer);
  const cancelTx = await registry.cancelSubscription(subscriptionId, refundAddress);
  await cancelTx.wait();
};
