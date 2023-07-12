import { BigNumber, BigNumberish } from "ethers";
import { ActionType } from "hardhat/types";

import * as feeds from "../../feeds";

export const getLatestRoundAnswer: ActionType<{
  dataFeedAddress: string;
}> = async (taskArgs, hre): Promise<BigNumber> => {
  return feeds.getLatestRoundAnswer(hre, taskArgs.dataFeedAddress);
};

export const getLatestRoundData: ActionType<{
  dataFeedAddress: string;
}> = async (taskArgs, hre) => {
  return feeds.getLatestRoundData(hre, taskArgs.dataFeedAddress);
};

export const getRoundData: ActionType<{
  dataFeedAddress: string;
  roundId: BigNumberish;
}> = async (taskArgs, hre) => {
  return feeds.getRoundData(hre, taskArgs.dataFeedAddress, taskArgs.roundId);
};

export const getRoundAnswer: ActionType<{
  dataFeedAddress: string;
  roundId: BigNumberish;
}> = async (taskArgs, hre) => {
  return feeds.getRoundAnswer(hre, taskArgs.dataFeedAddress, taskArgs.roundId);
};

export const getDecimals: ActionType<{
  dataFeedAddress: string;
}> = async (taskArgs, hre) => {
  return feeds.getDecimals(hre, taskArgs.dataFeedAddress);
};

export const getDescription: ActionType<{
  dataFeedAddress: string;
}> = async (taskArgs, hre) => {
  return feeds.getDescription(hre, taskArgs.dataFeedAddress);
};

export const getAggregatorVersion: ActionType<{
  dataFeedAddress: string;
}> = async (taskArgs, hre) => {
  return feeds.getAggregatorVersion(hre, taskArgs.dataFeedAddress);
};

export const getAggregatorAddress: ActionType<{
  dataFeedAddress: string;
}> = async (taskArgs, hre) => {
  return feeds.getAggregatorAddress(hre, taskArgs.dataFeedAddress);
};

export const getAggregatorRoundId: ActionType<{
  dataFeedAddress: string;
}> = async (taskArgs, hre) => {
  return feeds.getAggregatorRoundId(hre, taskArgs.dataFeedAddress);
};

export const getPhaseId: ActionType<{
  dataFeedAddress: string;
}> = async (taskArgs, hre) => {
  return feeds.getPhaseId(hre, taskArgs.dataFeedAddress);
};
