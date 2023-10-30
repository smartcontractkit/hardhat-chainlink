import { BigNumberish } from "ethers";
import { ActionType } from "hardhat/types";

import * as functionsConsumer from "../../../sandbox/functionsConsumer";

export const deploy: ActionType<{
  functionsRouterAddress: string;
  donId: string;
}> = async (taskArgs, hre): Promise<string> => {
  return functionsConsumer.deploy(
    hre,
    taskArgs.functionsRouterAddress,
    taskArgs.donId
  );
};

export const sendRequest: ActionType<{
  functionsConsumerAddress: string;
  subscriptionId: BigNumberish;
  source: string;
  secretsLocation: string;
  encryptedSecretsReference: string;
  args: string;
  bytesArgs: string;
  callbackGasLimit: BigNumberish;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  const args = taskArgs.args
    ? taskArgs.args.split(",").map((value) => value.trim())
    : [];
  const bytesArgs = taskArgs.bytesArgs
    ? taskArgs.bytesArgs.split(",").map((value) => value.trim())
    : [];
  return functionsConsumer.sendRequest(
    hre,
    taskArgs.functionsConsumerAddress,
    taskArgs.subscriptionId,
    taskArgs.source,
    taskArgs.encryptedSecretsReference,
    +taskArgs.secretsLocation,
    args,
    bytesArgs,
    taskArgs.callbackGasLimit
  );
};

export const sendEncodedRequest: ActionType<{
  functionsConsumerAddress: string;
  subscriptionId: BigNumberish;
  encodedRequest: string;
  callbackGasLimit: BigNumberish;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return functionsConsumer.sendEncodedRequest(
    hre,
    taskArgs.functionsConsumerAddress,
    taskArgs.subscriptionId,
    taskArgs.encodedRequest,
    taskArgs.callbackGasLimit
  );
};

export const setDonId: ActionType<{
  functionsConsumerAddress: string;
  donId: string;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return functionsConsumer.setDonId(
    hre,
    taskArgs.functionsConsumerAddress,
    taskArgs.donId
  );
};

export const getDonId: ActionType<{
  functionsConsumerAddress: string;
}> = async (taskArgs, hre): Promise<string> => {
  return functionsConsumer.getDonId(hre, taskArgs.functionsConsumerAddress);
};

export const getLastRequestId: ActionType<{
  functionsConsumerAddress: string;
}> = async (taskArgs, hre): Promise<string> => {
  return functionsConsumer.getLastRequestId(
    hre,
    taskArgs.functionsConsumerAddress
  );
};

export const getLastResponse: ActionType<{
  functionsConsumerAddress: string;
}> = async (taskArgs, hre): Promise<string> => {
  return functionsConsumer.getLastResponse(
    hre,
    taskArgs.functionsConsumerAddress
  );
};

export const getLastError: ActionType<{
  functionsConsumerAddress: string;
}> = async (taskArgs, hre): Promise<string> => {
  return functionsConsumer.getLastError(hre, taskArgs.functionsConsumerAddress);
};
