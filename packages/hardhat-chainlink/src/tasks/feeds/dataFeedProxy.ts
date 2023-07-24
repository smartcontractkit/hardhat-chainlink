import { BigNumber, BigNumberish } from "ethers";
import { ActionType } from "hardhat/types";

import * as dataFeedProxy from "../../feeds/dataFeedProxy";

export const getLatestRoundAnswer: ActionType<{
  dataFeedProxyAddress: string;
}> = async (taskArgs, hre): Promise<BigNumber> => {
  return dataFeedProxy.getLatestRoundAnswer(hre, taskArgs.dataFeedProxyAddress);
};

export const getLatestRoundData: ActionType<{
  dataFeedProxyAddress: string;
}> = async (taskArgs, hre) => {
  return dataFeedProxy.getLatestRoundData(hre, taskArgs.dataFeedProxyAddress);
};

export const getRoundData: ActionType<{
  dataFeedProxyAddress: string;
  roundId: BigNumberish;
}> = async (taskArgs, hre) => {
  return dataFeedProxy.getRoundData(
    hre,
    taskArgs.dataFeedProxyAddress,
    taskArgs.roundId
  );
};

export const getRoundAnswer: ActionType<{
  dataFeedProxyAddress: string;
  roundId: BigNumberish;
}> = async (taskArgs, hre) => {
  return dataFeedProxy.getRoundAnswer(
    hre,
    taskArgs.dataFeedProxyAddress,
    taskArgs.roundId
  );
};

export const getLatestRoundId: ActionType<{
  dataFeedProxyAddress: string;
}> = async (taskArgs, hre) => {
  return dataFeedProxy.getLatestRoundId(hre, taskArgs.dataFeedProxyAddress);
};

export const getDecimals: ActionType<{
  dataFeedProxyAddress: string;
}> = async (taskArgs, hre) => {
  return dataFeedProxy.getDecimals(hre, taskArgs.dataFeedProxyAddress);
};

export const getDescription: ActionType<{
  dataFeedProxyAddress: string;
}> = async (taskArgs, hre) => {
  return dataFeedProxy.getDescription(hre, taskArgs.dataFeedProxyAddress);
};

export const getVersion: ActionType<{
  dataFeedProxyAddress: string;
}> = async (taskArgs, hre) => {
  return dataFeedProxy.getVersion(hre, taskArgs.dataFeedProxyAddress);
};

export const getAggregator: ActionType<{
  dataFeedProxyAddress: string;
}> = async (taskArgs, hre) => {
  return dataFeedProxy.getAggregator(hre, taskArgs.dataFeedProxyAddress);
};

export const getPhaseId: ActionType<{
  dataFeedProxyAddress: string;
}> = async (taskArgs, hre) => {
  return dataFeedProxy.getPhaseId(hre, taskArgs.dataFeedProxyAddress);
};

export const getPhaseAggregators: ActionType<{
  dataFeedProxyAddress: string;
  phaseId: BigNumberish;
}> = async (taskArgs, hre) => {
  return dataFeedProxy.getPhaseAggregators(
    hre,
    taskArgs.dataFeedProxyAddress,
    taskArgs.phaseId
  );
};

export const getRoundId: ActionType<{
  phaseId: BigNumberish;
  aggregatorRoundId: BigNumberish;
}> = async (taskArgs, hre) => {
  return dataFeedProxy.getRoundId(taskArgs.phaseId, taskArgs.aggregatorRoundId);
};

export const parseRoundId: ActionType<{
  roundId: BigNumberish;
}> = async (taskArgs, hre) => {
  return dataFeedProxy.parseRoundId(taskArgs.roundId);
};
