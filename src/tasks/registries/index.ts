import { ActionType } from "hardhat/types";

import * as inquirers from "../../helpers/inquirers";

export const getDataFeed: ActionType<{}> = async (taskArgs, hre) => {
  return inquirers.inquireDataFeed(hre, false);
};

export const getFeedRegistry: ActionType<{}> = async (taskArgs, hre) => {
  return inquirers.inquireFeedRegistry(hre, false);
};

export const getVRFCoordinator: ActionType<{}> = async (taskArgs, hre) => {
  return inquirers.inquireVRFCoordinator(hre, false);
};

export const getLinkToken: ActionType<{}> = async (taskArgs, hre) => {
  return inquirers.inquireLinkToken(hre, false);
};

export const getKeeperRegistry: ActionType<{}> = async (taskArgs, hre) => {
  return inquirers.inquireKeeperRegistry(hre, false);
};

export const getL2Sequencer: ActionType<{}> = async (taskArgs, hre) => {
  return inquirers.inquireL2Sequencer(hre, false);
};

export const getFunctionRouter: ActionType<{}> = async (taskArgs, hre) => {
  return inquirers.inquireFunctionRouter(hre, false);
};

export const getDenomination: ActionType<{}> = async () => {
  return inquirers.inquireDenomination();
};
