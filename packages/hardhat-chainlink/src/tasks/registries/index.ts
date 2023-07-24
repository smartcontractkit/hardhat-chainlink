import { ActionType } from "hardhat/types";

import {
  inquireDataFeedAddress,
  inquireDenomination,
  inquireFeedRegistryAddress,
  inquireFunctionOracleAddress,
  inquireKeeperRegistrarAddress,
  inquireKeeperRegistryAddress,
  inquireL2SequencerAddress,
  inquireLinkTokenAddress,
  inquireVRFCoordinatorAddress,
} from "../../helpers/inquirers";

export const getDataFeedAddress: ActionType<{}> = async (taskArgs, hre) => {
  return inquireDataFeedAddress(hre, false);
};

export const getFeedRegistryAddress: ActionType<{}> = async (taskArgs, hre) => {
  return inquireFeedRegistryAddress(hre, false);
};

export const getVRFCoordinatorAddress: ActionType<{}> = async (
  taskArgs,
  hre
) => {
  return inquireVRFCoordinatorAddress(hre, false);
};

export const getLinkTokenAddress: ActionType<{}> = async (taskArgs, hre) => {
  return inquireLinkTokenAddress(hre, false);
};

export const getKeeperRegistryAddress: ActionType<{}> = async (
  taskArgs,
  hre
) => {
  return inquireKeeperRegistryAddress(hre, false);
};

export const getKeeperRegistrarAddress: ActionType<{}> = async (
  taskArgs,
  hre
) => {
  return inquireKeeperRegistrarAddress(hre, false);
};

export const getL2SequencerAddress: ActionType<{}> = async (taskArgs, hre) => {
  return inquireL2SequencerAddress(hre, false);
};

export const getFunctionOracleAddress: ActionType<{}> = async (
  taskArgs,
  hre
) => {
  return inquireFunctionOracleAddress(hre, false);
};

export const getDenomination: ActionType<{}> = async () => {
  return inquireDenomination();
};
