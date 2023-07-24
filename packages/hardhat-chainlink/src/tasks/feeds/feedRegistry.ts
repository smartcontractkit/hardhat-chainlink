import { ActionType } from "hardhat/types";

import * as feedRegistry from "../../feeds/feedRegistry";

export const getFeed: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getFeed(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick
  );
};

export const isFeedEnabled: ActionType<{
  feedRegistryAddress: string;
  aggregatorAddress: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.isFeedEnabled(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.aggregatorAddress
  );
};

export const getFeedRegistryDecimals: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getFeedRegistryDecimals(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick
  );
};

export const getFeedRegistryDescription: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getFeedRegistryDescription(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick
  );
};

export const getFeedRegistryAggregatorVersion: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getFeedRegistryAggregatorVersion(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick
  );
};

export const getFeedRegistryLatestRoundData: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getFeedRegistryLatestRoundData(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick
  );
};

export const getFeedRegistryRoundData: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
  roundId: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getFeedRegistryRoundData(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick,
    taskArgs.roundId
  );
};

export const getRoundFeed: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
  roundId: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getRoundFeed(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick,
    taskArgs.roundId
  );
};

export const getPhase: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
  phaseId: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getPhase(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick,
    taskArgs.phaseId
  );
};

export const getPhaseFeed: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
  phaseId: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getPhaseFeed(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick,
    taskArgs.phaseId
  );
};

export const getPhaseRange: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
  phaseId: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getPhaseRange(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick,
    taskArgs.phaseId
  );
};

export const getCurrentPhaseId: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getCurrentPhaseId(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick
  );
};

export const getPreviousRoundId: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
  roundId: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getPreviousRoundId(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick,
    taskArgs.roundId
  );
};

export const getNextRoundId: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
  roundId: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getNextRoundId(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick,
    taskArgs.roundId
  );
};
