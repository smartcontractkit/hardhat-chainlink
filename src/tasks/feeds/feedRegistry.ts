import { ActionType } from "hardhat/types";

import * as feedRegistry from "../../feeds/feedRegistry";

export const getLatestRoundData: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getLatestRoundData(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick
  );
};

export const getRoundData: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
  roundId: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getRoundData(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick,
    taskArgs.roundId
  );
};

export const proposedGetLatestRoundData: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.proposedGetLatestRoundData(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick
  );
};

export const proposedGetRoundData: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
  roundId: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.proposedGetRoundData(
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

export const getProposedFeed: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getProposedFeed(
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

export const getDecimals: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getDecimals(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick
  );
};

export const getDescription: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getDescription(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick
  );
};

export const getVersion: ActionType<{
  feedRegistryAddress: string;
  feedRegistryBaseTick: string;
  feedRegistryQuoteTick: string;
}> = async (taskArgs, hre) => {
  return feedRegistry.getVersion(
    hre,
    taskArgs.feedRegistryAddress,
    taskArgs.feedRegistryBaseTick,
    taskArgs.feedRegistryQuoteTick
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
