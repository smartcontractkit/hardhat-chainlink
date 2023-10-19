import {
  FunctionsResponse,
  RequestCommitment,
  SubscriptionInfo,
} from "@chainlink/functions-toolkit/dist/types";
import { ActionType } from "hardhat/types";

import * as functionsRouter from "../../functions/functionsRouter";

export const createSubscription: ActionType<{
  linkTokenAddress: string;
  functionsRouterAddress: string;
  consumerAddress: string;
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
  requestCommitments: RequestCommitment[];
}> = async (taskArgs, hre): Promise<string> => {
  return functionsRouter.timeoutRequests(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.functionsRouterAddress,
    taskArgs.requestCommitments
  );
};

export const estimateRequestCost: ActionType<{
  linkTokenAddress: string;
  functionsRouterAddress: string;
  donId: string;
  subscriptionId: string;
  callbackGasLimit: number;
  gasPriceWei: string;
}> = async (taskArgs, hre): Promise<BigInt> => {
  return functionsRouter.estimateRequestCost(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.functionsRouterAddress,
    taskArgs.donId,
    taskArgs.subscriptionId,
    taskArgs.callbackGasLimit,
    taskArgs.gasPriceWei
  );
};

export const listenForResponse: ActionType<{
  functionsRouterAddress: string;
  requestId: string;
  timeout?: number;
}> = async (taskArgs, hre): Promise<FunctionsResponse> => {
  return functionsRouter.listenForResponse(
    hre,
    taskArgs.functionsRouterAddress,
    taskArgs.requestId,
    taskArgs.timeout
  );
};
