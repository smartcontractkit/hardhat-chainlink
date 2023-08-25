import { BigNumber, BigNumberish } from "ethers";
import { BytesLike } from "ethers/lib/utils";
import { ActionType } from "hardhat/types";

import * as vrf from "../../vrf";

export const createSubscription: ActionType<{
  vrfCoordinatorAddress: string;
}> = async (taskArgs, hre) => {
  return vrf.createSubscription(hre, taskArgs.vrfCoordinatorAddress);
};

export const fundSubscription: ActionType<{
  vrfCoordinatorAddress: string;
  linkTokenAddress: string;
  amountInJuels: BigNumberish;
  subscriptionId: BigNumberish;
}> = async (taskArgs, hre) => {
  return vrf.fundSubscription(
    hre,
    taskArgs.vrfCoordinatorAddress,
    taskArgs.linkTokenAddress,
    taskArgs.amountInJuels,
    taskArgs.subscriptionId
  );
};

export const cancelSubscription: ActionType<{
  vrfCoordinatorAddress: string;
  subscriptionId: BigNumberish;
  receivingAddress: string;
}> = async (taskArgs, hre) => {
  return vrf.cancelSubscription(
    hre,
    taskArgs.vrfCoordinatorAddress,
    taskArgs.subscriptionId,
    taskArgs.receivingAddress
  );
};

export const addConsumer: ActionType<{
  vrfCoordinatorAddress: string;
  consumerAddress: string;
  subscriptionId: BigNumber;
}> = async (taskArgs, hre) => {
  return vrf.addConsumer(
    hre,
    taskArgs.vrfCoordinatorAddress,
    taskArgs.consumerAddress,
    taskArgs.subscriptionId
  );
};

export const removeConsumer: ActionType<{
  vrfCoordinatorAddress: string;
  consumerAddress: string;
  subscriptionId: BigNumber;
}> = async (taskArgs, hre) => {
  return vrf.removeConsumer(
    hre,
    taskArgs.vrfCoordinatorAddress,
    taskArgs.consumerAddress,
    taskArgs.subscriptionId
  );
};

export const getSubscriptionDetails: ActionType<{
  vrfCoordinatorAddress: string;
  subscriptionId: BigNumber;
}> = async (taskArgs, hre) => {
  return vrf.getSubscriptionDetails(
    hre,
    taskArgs.vrfCoordinatorAddress,
    taskArgs.subscriptionId
  );
};

export const requestRandomWords: ActionType<{
  vrfCoordinatorAddress: string;
  keyHash: BytesLike;
  subscriptionId: BigNumberish;
  requestConfirmations: BigNumberish;
  callbackGasLimit: BigNumberish;
  numWords: BigNumberish;
}> = async (taskArgs, hre) => {
  return vrf.requestRandomWords(
    hre,
    taskArgs.vrfCoordinatorAddress,
    taskArgs.keyHash,
    taskArgs.subscriptionId,
    taskArgs.requestConfirmations,
    taskArgs.callbackGasLimit,
    taskArgs.numWords
  );
};

export const isPendingRequestExists: ActionType<{
  vrfCoordinatorAddress: string;
  subscriptionId: BigNumber;
}> = async (taskArgs, hre) => {
  return vrf.isPendingRequestExists(
    hre,
    taskArgs.vrfCoordinatorAddress,
    taskArgs.subscriptionId
  );
};

export const requestSubscriptionOwnerTransfer: ActionType<{
  vrfCoordinatorAddress: string;
  subscriptionId: BigNumber;
  newOwnerAddress: string;
}> = async (taskArgs, hre) => {
  return vrf.requestSubscriptionOwnerTransfer(
    hre,
    taskArgs.vrfCoordinatorAddress,
    taskArgs.subscriptionId,
    taskArgs.newOwnerAddress
  );
};

export const acceptSubscriptionOwnerTransfer: ActionType<{
  vrfCoordinatorAddress: string;
  subscriptionId: BigNumber;
}> = async (taskArgs, hre) => {
  return vrf.acceptSubscriptionOwnerTransfer(
    hre,
    taskArgs.vrfCoordinatorAddress,
    taskArgs.subscriptionId
  );
};

export const getMaxConsumers: ActionType<{
  vrfCoordinatorAddress: string;
}> = async (taskArgs, hre) => {
  return vrf.getMaxConsumers(hre, taskArgs.vrfCoordinatorAddress);
};

export const getMaxNumberOfWords: ActionType<{
  vrfCoordinatorAddress: string;
}> = async (taskArgs, hre) => {
  return vrf.getMaxNumberOfWords(hre, taskArgs.vrfCoordinatorAddress);
};

export const getMaxRequestConfirmations: ActionType<{
  vrfCoordinatorAddress: string;
}> = async (taskArgs, hre) => {
  return vrf.getMaxRequestConfirmations(hre, taskArgs.vrfCoordinatorAddress);
};

export const getMinRequestConfirmations: ActionType<{
  vrfCoordinatorAddress: string;
}> = async (taskArgs, hre) => {
  return vrf.getMinRequestConfirmations(hre, taskArgs.vrfCoordinatorAddress);
};

export const getMaxRequestGasLimit: ActionType<{
  vrfCoordinatorAddress: string;
}> = async (taskArgs, hre) => {
  return vrf.getMaxRequestGasLimit(hre, taskArgs.vrfCoordinatorAddress);
};

export const getCommitment: ActionType<{
  vrfCoordinatorAddress: string;
  requestId: string;
}> = async (taskArgs, hre) => {
  return vrf.getCommitment(
    hre,
    taskArgs.vrfCoordinatorAddress,
    taskArgs.requestId
  );
};

export const getConfig: ActionType<{
  vrfCoordinatorAddress: string;
}> = async (taskArgs, hre) => {
  return vrf.getConfig(hre, taskArgs.vrfCoordinatorAddress);
};

export const getTypeAndVersion: ActionType<{
  vrfCoordinatorAddress: string;
}> = async (taskArgs, hre) => {
  return vrf.getTypeAndVersion(hre, taskArgs.vrfCoordinatorAddress);
};
