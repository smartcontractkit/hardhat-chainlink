import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
} from "ethers";
import { BytesLike, defaultAbiCoder } from "ethers/lib/utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
  LinkTokenInterface__factory,
  VRFCoordinatorV2__factory,
} from "../../types";

export const createSubscription = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<{ subscriptionId: BigNumber; transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  const tx: ContractTransaction = await vrfCoordinatorV2.createSubscription();
  const txReceipt: ContractReceipt = await tx.wait(
    hre.config.chainlink.confirmations
  );
  if (!txReceipt.events) {
    throw new Error("Error Creating New Subscription");
  }

  const subscriptionId = BigNumber.from(txReceipt.events[0].topics[1]);

  return { subscriptionId, transactionHash: tx.hash };
};

export const fundSubscription = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  linkTokenAddress: string,
  amountInJuels: BigNumberish,
  subscriptionId: BigNumberish
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const linkToken = LinkTokenInterface__factory.connect(
    linkTokenAddress,
    signer
  );

  const tx: ContractTransaction = await linkToken.transferAndCall(
    vrfCoordinatorAddress,
    amountInJuels,
    defaultAbiCoder.encode(["uint64"], [subscriptionId])
  );
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const cancelSubscription = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  subscriptionId: BigNumberish,
  receivingAddress: string
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  const tx: ContractTransaction = await vrfCoordinatorV2.cancelSubscription(
    subscriptionId,
    receivingAddress
  );
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const addConsumer = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  consumerAddress: string,
  subscriptionId: BigNumber
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  const tx: ContractTransaction = await vrfCoordinatorV2.addConsumer(
    subscriptionId,
    consumerAddress
  );
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const removeConsumer = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  consumerAddress: string,
  subscriptionId: BigNumber
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  const tx: ContractTransaction = await vrfCoordinatorV2.removeConsumer(
    subscriptionId,
    consumerAddress
  );
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const getSubscriptionDetails = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  subscriptionId: BigNumber
): Promise<{
  balance: BigNumber;
  reqCount: BigNumber;
  owner: string;
  consumers: string[];
}> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  const result = await vrfCoordinatorV2.getSubscription(subscriptionId);

  return {
    balance: result.balance,
    reqCount: result.reqCount,
    owner: result.owner,
    consumers: result.consumers,
  };
};

export const isPendingRequestExists = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  subscriptionId: BigNumber
): Promise<boolean> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  return vrfCoordinatorV2.pendingRequestExists(subscriptionId);
};

export const requestSubscriptionOwnerTransfer = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  subscriptionId: BigNumber,
  newOwnerAddress: string
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  const tx: ContractTransaction =
    await vrfCoordinatorV2.requestSubscriptionOwnerTransfer(
      subscriptionId,
      newOwnerAddress
    );
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const acceptSubscriptionOwnerTransfer = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  subscriptionId: BigNumber
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  const tx: ContractTransaction =
    await vrfCoordinatorV2.acceptSubscriptionOwnerTransfer(subscriptionId);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const getMaxConsumers = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<number> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );
  return vrfCoordinatorV2.MAX_CONSUMERS();
};

export const getMaxNumberOfWords = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<number> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  return vrfCoordinatorV2.MAX_NUM_WORDS();
};

export const getMaxRequestConfirmations = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<number> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  return vrfCoordinatorV2.MAX_REQUEST_CONFIRMATIONS();
};

export const getMinRequestConfirmations = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<number> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  const requestConfig = await vrfCoordinatorV2.getRequestConfig();

  return requestConfig[0];
};

export const getMaxRequestGasLimit = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<number> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  const requestConfig = await vrfCoordinatorV2.getRequestConfig();

  return requestConfig[1];
};

export const getCommitment = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  requestId: BigNumberish
): Promise<BytesLike> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  return vrfCoordinatorV2.getCommitment(requestId);
};

export const getCoordinatorConfig = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<{
  minimumRequestConfirmations: number;
  maxGasLimit: number;
  stalenessSeconds: number;
  gasAfterPaymentCalculation: number;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  const config = await vrfCoordinatorV2.getConfig();

  return {
    minimumRequestConfirmations: config.minimumRequestConfirmations,
    maxGasLimit: config.maxGasLimit,
    stalenessSeconds: config.stalenessSeconds,
    gasAfterPaymentCalculation: config.gasAfterPaymentCalculation,
  };
};

export const getCoordinatorTypeAndVersion = async (
  hre: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(
    vrfCoordinatorAddress,
    signer
  );

  return vrfCoordinatorV2.typeAndVersion();
};
