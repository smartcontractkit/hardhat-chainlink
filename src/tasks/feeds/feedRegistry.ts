import { ActionType } from "hardhat/types";

import * as feeds from "../../feeds";

export const getFeed: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
}> = async (taskArgs, hre) => {
  return feeds.getFeed(
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
  return feeds.isFeedEnabled(
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
  return feeds.getFeedRegistryDecimals(
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
  return feeds.getFeedRegistryDescription(
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
  return feeds.getFeedRegistryAggregatorVersion(
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
  return feeds.getFeedRegistryLatestRoundData(
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
  return feeds.getFeedRegistryRoundData(
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
  return feeds.getRoundFeed(
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
  return feeds.getPhase(
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
  return feeds.getPhaseFeed(
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
  return feeds.getPhaseRange(
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
  return feeds.getCurrentPhaseId(
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
  return feeds.getPreviousRoundId(
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
  return feeds.getNextRoundId(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick,
    taskArgs.roundId
  );
};
