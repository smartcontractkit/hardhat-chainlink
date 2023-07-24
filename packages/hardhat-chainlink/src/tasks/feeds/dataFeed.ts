import { BigNumber, BigNumberish } from "ethers";
import { ActionType } from "hardhat/types";

import * as dataFeed from "../../feeds/dataFeed";

export const getLatestRoundAnswer: ActionType<{
  dataFeedAddress: string;
}> = async (taskArgs, hre): Promise<BigNumber> => {
  return dataFeed.getLatestRoundAnswer(hre, taskArgs.dataFeedAddress);
};

export const getLatestRoundData: ActionType<{
  dataFeedAddress: string;
}> = async (taskArgs, hre) => {
  return dataFeed.getLatestRoundData(hre, taskArgs.dataFeedAddress);
};

export const getRoundData: ActionType<{
  dataFeedAddress: string;
  roundId: BigNumberish;
}> = async (taskArgs, hre) => {
  return dataFeed.getRoundData(hre, taskArgs.dataFeedAddress, taskArgs.roundId);
};

export const getRoundAnswer: ActionType<{
  dataFeedAddress: string;
  roundId: BigNumberish;
}> = async (taskArgs, hre) => {
  return dataFeed.getRoundAnswer(
    hre,
    taskArgs.dataFeedAddress,
    taskArgs.roundId
  );
};

export const getLatestRoundId: ActionType<{
  dataFeedAddress: string;
}> = async (taskArgs, hre) => {
  return dataFeed.getLatestRoundId(hre, taskArgs.dataFeedAddress);
};

export const getDecimals: ActionType<{
  dataFeedAddress: string;
}> = async (taskArgs, hre) => {
  return dataFeed.getDecimals(hre, taskArgs.dataFeedAddress);
};

export const getDescription: ActionType<{
  dataFeedAddress: string;
}> = async (taskArgs, hre) => {
  return dataFeed.getDescription(hre, taskArgs.dataFeedAddress);
};

export const getVersion: ActionType<{
  dataFeedAddress: string;
}> = async (taskArgs, hre) => {
  return dataFeed.getVersion(hre, taskArgs.dataFeedAddress);
};
