import {
  BigNumber,
  ContractTransaction,
  ContractReceipt,
} from "ethers";
import { BytesLike, defaultAbiCoder } from "ethers/lib/utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  LinkTokenInterface__factory,
  VRFCoordinatorV2__factory,
} from "../../types/ethers-contracts";

export const createVrfSubscription = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  waitNumberOfConfirmations: number
): Promise<{ subscriptionId: BigNumber; transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const tx: ContractTransaction = await vrfCoordinatorV2.createSubscription();
  const txReceipt: ContractReceipt = await tx.wait(waitNumberOfConfirmations);
  if (!txReceipt.events) throw "Error Creating New Subscription";

  const subscriptionId = BigNumber.from(txReceipt.events[0].topics[1]);

  return { subscriptionId: subscriptionId, transactionHash: tx.hash };
};

export const fundVrfSubscription = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  linkTokenAddress: string,
  amountInJuels: BigNumber,
  subscriptionId: BigNumber,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const linkToken = LinkTokenInterface__factory.connect(linkTokenAddress, signer);

  const tx: ContractTransaction = await linkToken.transferAndCall(
    vrfCoordinatorAddress,
    amountInJuels,
    defaultAbiCoder.encode(["uint64"], [subscriptionId])
  );
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const addVrfConsumer = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  consumerAddress: string,
  subscriptionId: BigNumber,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const tx: ContractTransaction = await vrfCoordinatorV2.addConsumer(
    subscriptionId,
    consumerAddress
  );
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const removeVrfConsumer = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  consumerAddress: string,
  subscriptionId: BigNumber,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const tx: ContractTransaction = await vrfCoordinatorV2.removeConsumer(
    subscriptionId,
    consumerAddress
  );
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const cancelVrfSubscription = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  subscriptionId: BigNumber,
  receivingWallet: string,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const tx: ContractTransaction = await vrfCoordinatorV2.cancelSubscription(
    subscriptionId,
    receivingWallet
  );
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const getVrfSubscriptionDetails = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  subscriptionId: BigNumber
): Promise<{
  balance: BigNumber;
  reqCount: BigNumber;
  owner: string;
  consumers: string[];
}> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const callback = await vrfCoordinatorV2.getSubscription(subscriptionId);

  return {
    balance: callback.balance,
    reqCount: callback.reqCount,
    owner: callback.owner,
    consumers: callback.consumers,
  };
};

export const pendingVrfRequestExists = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  subscriptionId: BigNumber
): Promise<boolean> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  return await vrfCoordinatorV2.pendingRequestExists(subscriptionId);
};

export const requestVrfSubscriptionOwnerTransfer = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  subscriptionId: BigNumber,
  newOwnerAddress: string,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const tx: ContractTransaction = await vrfCoordinatorV2.requestSubscriptionOwnerTransfer(
    subscriptionId,
    newOwnerAddress
  );
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const acceptVrfSubscriptionOwnerTransfer = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  subscriptionId: BigNumber,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const tx: ContractTransaction = await vrfCoordinatorV2.acceptSubscriptionOwnerTransfer(
    subscriptionId
  );
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const getMaxVrfConsumers = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<number> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const maxConsumers = await vrfCoordinatorV2.MAX_CONSUMERS();

  return maxConsumers;
};

export const getMaxVrfNumberOfWords = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<number> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const maxNumWords = await vrfCoordinatorV2.MAX_NUM_WORDS();

  return maxNumWords;
};

export const getMaxVrfRequestConfirmations = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<number> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const maxRequestConfirmations = await vrfCoordinatorV2.MAX_REQUEST_CONFIRMATIONS();

  return maxRequestConfirmations;
};

export const getMinVrfRequestConfirmations = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<number> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const requestConfig = await vrfCoordinatorV2.getRequestConfig();

  return requestConfig[0];
};

export const getMaxVrfRequestGasLimit = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<number> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const requestConfig = await vrfCoordinatorV2.getRequestConfig();

  return requestConfig[1];
};

export const getVrfCommitment = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string,
  requestId: BigNumber
): Promise<BytesLike> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const commitment = await vrfCoordinatorV2.getCommitment(requestId);

  return commitment;
};

export const getVrfCoordinatorConfig = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<{
  minimumRequestConfirmations: number;
  maxGasLimit: number;
  stalenessSeconds: number;
  gasAfterPaymentCalculation: number;
}> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const config = await vrfCoordinatorV2.getConfig();

  return {
    minimumRequestConfirmations: config.minimumRequestConfirmations,
    maxGasLimit: config.maxGasLimit,
    stalenessSeconds: config.stalenessSeconds,
    gasAfterPaymentCalculation: config.gasAfterPaymentCalculation,
  };
};

export const getVrfCoordinatorTypeAndVersion = async (
  env: HardhatRuntimeEnvironment,
  vrfCoordinatorAddress: string
): Promise<string> => {
  const [signer] = await env.ethers.getSigners();
  const vrfCoordinatorV2 = VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);

  const typeAndVersion = await vrfCoordinatorV2.typeAndVersion();

  return typeAndVersion;
};
