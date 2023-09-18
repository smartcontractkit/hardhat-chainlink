import { BigNumber } from "ethers";
import { ActionType } from "hardhat/types";

import * as drConsumer from "../../../sandbox/drConsumer";

export const deploy: ActionType<{
  linkTokenAddress: string;
}> = async (taskArgs, hre): Promise<string> => {
  return drConsumer.deploy(hre, taskArgs.linkTokenAddress);
};

export const requestData: ActionType<{
  directRequestConsumerAddress: string;
  operatorAddress: string;
  externalJobID: string;
  observationURL: string;
  pathToData: string;
  multiplyTimes: string;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return drConsumer.requestData(
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
  return drConsumer.getLatestAnswer(hre, taskArgs.directRequestConsumerAddress);
};
