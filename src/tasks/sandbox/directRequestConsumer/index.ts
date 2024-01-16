import { BigNumber } from "ethers";
import { ActionType } from "hardhat/types";

import * as directRequestConsumer from "../../../sandbox/directRequestConsumer";

export const deploy: ActionType<{
  linkTokenAddress: string;
}> = async (taskArgs, hre): Promise<string> => {
  return directRequestConsumer.deploy(hre, taskArgs.linkTokenAddress);
};

export const requestData: ActionType<{
  directRequestConsumerAddress: string;
  operatorAddress: string;
  externalJobID: string;
  observationURL: string;
  pathToData: string;
  multiplyTimes: string;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return directRequestConsumer.requestData(
    hre,
    taskArgs.directRequestConsumerAddress,
    taskArgs.operatorAddress,
    taskArgs.externalJobID,
    taskArgs.observationURL,
    taskArgs.pathToData,
    taskArgs.multiplyTimes
  );
};

export const getLatestAnswer: ActionType<{
  directRequestConsumerAddress: string;
}> = async (taskArgs, hre): Promise<BigNumber> => {
  return directRequestConsumer.getLatestAnswer(
    hre,
    taskArgs.directRequestConsumerAddress
  );
};
