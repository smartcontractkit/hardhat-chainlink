import {
  RequestCommitment,
  SubscriptionInfo,
} from "@chainlink/functions-toolkit/dist/types";
import { ActionType } from "hardhat/types";

import * as functionsRouter from "../../functions/functionsRouter";
import * as functionsUtils from "../../functions/functionsUtils";

export const createSubscription: ActionType<{
  linkTokenAddress: string;
  functionsRouterAddress: string;
  consumerAddress?: string;
}> = async (taskArgs, hre): Promise<number> => {
  return functionsRouter.createSubscription(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.functionsRouterAddress,
    taskArgs.consumerAddress
  );
};

export const fundSubscription: ActionType<{
  linkTokenAddress: string;
  functionsRouterAddress: string;
  juelsAmount: string;
  subscriptionId: string;
}> = async (taskArgs, hre): Promise<string> => {
  return functionsRouter.fundSubscription(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.functionsRouterAddress,
    taskArgs.juelsAmount,
    taskArgs.subscriptionId
  );
};

export const getSubscriptionInfo: ActionType<{
  linkTokenAddress: string;
  functionsRouterAddress: string;
  subscriptionId: string;
}> = async (taskArgs, hre): Promise<SubscriptionInfo> => {
  return functionsRouter.getSubscriptionInfo(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.functionsRouterAddress,
    taskArgs.subscriptionId
  );
};

export const cancelSubscription: ActionType<{
  linkTokenAddress: string;
  functionsRouterAddress: string;
  subscriptionId: string;
  refundAddress: string;
}> = async (taskArgs, hre): Promise<string> => {
  return functionsRouter.cancelSubscription(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.functionsRouterAddress,
    taskArgs.subscriptionId,
    taskArgs.refundAddress
  );
};

export const requestSubscriptionTransfer: ActionType<{
  linkTokenAddress: string;
  functionsRouterAddress: string;
  subscriptionId: string;
  newOwner: string;
}> = async (taskArgs, hre): Promise<string> => {
  return functionsRouter.requestSubscriptionTransfer(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.functionsRouterAddress,
    taskArgs.subscriptionId,
    taskArgs.newOwner
  );
};

export const acceptSubscriptionTransfer: ActionType<{
  linkTokenAddress: string;
  functionsRouterAddress: string;
  subscriptionId: string;
}> = async (taskArgs, hre): Promise<string> => {
  return functionsRouter.acceptSubscriptionTransfer(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.functionsRouterAddress,
    taskArgs.subscriptionId
  );
};

export const addConsumer: ActionType<{
  linkTokenAddress: string;
  functionsRouterAddress: string;
  subscriptionId: string;
  consumerAddress: string;
}> = async (taskArgs, hre): Promise<string> => {
  return functionsRouter.addConsumer(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.functionsRouterAddress,
    taskArgs.subscriptionId,
    taskArgs.consumerAddress
  );
};

export const removeConsumer: ActionType<{
  linkTokenAddress: string;
  functionsRouterAddress: string;
  subscriptionId: string;
  consumerAddress: string;
}> = async (taskArgs, hre): Promise<string> => {
  return functionsRouter.removeConsumer(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.functionsRouterAddress,
    taskArgs.subscriptionId,
    taskArgs.consumerAddress
  );
};

export const timeoutRequests: ActionType<{
  linkTokenAddress: string;
  functionsRouterAddress: string;
  requestIdsString: string;
  donId: string;
  toBlock?: string;
  pastBlocksToSearch: string;
}> = async (taskArgs, hre): Promise<string> => {
  const requestIds = taskArgs.requestIdsString.split(",");
  const toBlock = taskArgs.toBlock ? +taskArgs.toBlock : "latest";
  const pastBlocksToSearch = taskArgs.pastBlocksToSearch
    ? +taskArgs.pastBlocksToSearch
    : undefined;
  const promises = requestIds.map((requestId: string) => {
    return functionsUtils.fetchRequestCommitment(
      hre,
      taskArgs.functionsRouterAddress,
      requestId,
      taskArgs.donId,
      toBlock,
      pastBlocksToSearch
    );
  });
  const requestCommitments: RequestCommitment[] = await Promise.all(promises);
  return functionsRouter.timeoutRequests(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.functionsRouterAddress,
    requestCommitments
  );
};

export const estimateRequestCost: ActionType<{
  linkTokenAddress: string;
  functionsRouterAddress: string;
  donId: string;
  subscriptionId: string;
  callbackGasLimit: string;
  gasPriceWei: string;
}> = async (taskArgs, hre): Promise<BigInt> => {
  return functionsRouter.estimateRequestCost(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.functionsRouterAddress,
    taskArgs.donId,
    taskArgs.subscriptionId,
    +taskArgs.callbackGasLimit,
    taskArgs.gasPriceWei
  );
};
