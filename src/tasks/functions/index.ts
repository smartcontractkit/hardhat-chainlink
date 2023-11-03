import { RequestCommitment } from "@chainlink/functions-toolkit/dist/types";
import { BigNumber, BigNumberish } from "ethers";
import { ActionType } from "hardhat/types";

import * as functions from "../../functions";
import { FunctionsSubscriptionDetails } from "../../shared/types";

export const createSubscription: ActionType<{
  functionsRouterAddress: string;
  consumerAddress?: string;
}> = async (taskArgs, hre): Promise<{ subscriptionId: BigNumber }> => {
  return functions.createSubscription(
    hre,
    taskArgs.functionsRouterAddress,
    taskArgs.consumerAddress
  );
};

export const fundSubscription: ActionType<{
  linkTokenAddress: string;
  functionsRouterAddress: string;
  amountInJuels: BigNumberish;
  subscriptionId: BigNumberish;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return functions.fundSubscription(
    hre,
    taskArgs.functionsRouterAddress,
    taskArgs.linkTokenAddress,
    taskArgs.amountInJuels,
    taskArgs.subscriptionId
  );
};

export const getSubscriptionDetails: ActionType<{
  functionsRouterAddress: string;
  subscriptionId: BigNumberish;
}> = async (taskArgs, hre): Promise<FunctionsSubscriptionDetails> => {
  return functions.getSubscriptionDetails(
    hre,
    taskArgs.functionsRouterAddress,
    taskArgs.subscriptionId
  );
};

export const cancelSubscription: ActionType<{
  functionsRouterAddress: string;
  subscriptionId: BigNumberish;
  receivingAddress: string | undefined;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return functions.cancelSubscription(
    hre,
    taskArgs.functionsRouterAddress,
    taskArgs.subscriptionId,
    taskArgs.receivingAddress
  );
};

export const requestSubscriptionOwnerTransfer: ActionType<{
  functionsRouterAddress: string;
  subscriptionId: BigNumberish;
  newOwnerAddress: string;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return functions.requestSubscriptionOwnerTransfer(
    hre,
    taskArgs.functionsRouterAddress,
    taskArgs.subscriptionId,
    taskArgs.newOwnerAddress
  );
};

export const acceptSubscriptionOwnerTransfer: ActionType<{
  functionsRouterAddress: string;
  subscriptionId: string;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return functions.acceptSubscriptionOwnerTransfer(
    hre,
    taskArgs.functionsRouterAddress,
    taskArgs.subscriptionId
  );
};

export const addConsumer: ActionType<{
  functionsRouterAddress: string;
  consumerAddress: string;
  subscriptionId: BigNumberish;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return functions.addConsumer(
    hre,
    taskArgs.functionsRouterAddress,
    taskArgs.consumerAddress,
    taskArgs.subscriptionId
  );
};

export const removeConsumer: ActionType<{
  functionsRouterAddress: string;
  consumerAddress: string;
  subscriptionId: BigNumberish;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return functions.removeConsumer(
    hre,
    taskArgs.functionsRouterAddress,
    taskArgs.consumerAddress,
    taskArgs.subscriptionId
  );
};

export const timeoutRequests: ActionType<{
  functionsRouterAddress: string;
  requestIdsString: string;
  donId: string;
  toBlock?: string;
  pastBlocksToSearch?: string;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  const requestIds = taskArgs.requestIdsString
    .split(",")
    .map((value) => value.trim());
  const toBlock = taskArgs.toBlock ? +taskArgs.toBlock : "latest";
  const pastBlocksToSearch = taskArgs.pastBlocksToSearch
    ? +taskArgs.pastBlocksToSearch
    : undefined;
  const promises = requestIds.map((requestId: string) => {
    return functions.fetchRequestCommitment(
      hre,
      taskArgs.functionsRouterAddress,
      taskArgs.donId,
      requestId,
      toBlock,
      pastBlocksToSearch
    );
  });
  const requestCommitments: RequestCommitment[] = await Promise.all(promises);
  return functions.timeoutRequests(
    hre,
    taskArgs.functionsRouterAddress,
    requestCommitments
  );
};

export const estimateRequestCost: ActionType<{
  functionsRouterAddress: string;
  donId: string;
  subscriptionId: BigNumberish;
  callbackGasLimit: string;
  gasPriceWei: BigNumberish;
}> = async (taskArgs, hre): Promise<BigInt> => {
  return functions.estimateRequestCost(
    hre,
    taskArgs.functionsRouterAddress,
    taskArgs.donId,
    taskArgs.subscriptionId,
    +taskArgs.callbackGasLimit,
    taskArgs.gasPriceWei
  );
};
