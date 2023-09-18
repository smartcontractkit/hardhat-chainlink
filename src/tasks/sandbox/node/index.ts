import { ActionType } from "hardhat/types";

import * as node from "../../../sandbox/node";
import { DockerOutput } from "../../../shared/types";

export const run: ActionType<{}> = async (
  taskArgs,
  hre
): Promise<DockerOutput> => {
  return node.run(hre);
};

export const restart: ActionType<{}> = async (
  taskArgs,
  hre
): Promise<DockerOutput> => {
  return node.restart(hre);
};

export const stop: ActionType<{}> = async (
  taskArgs,
  hre
): Promise<DockerOutput> => {
  return node.stop(hre);
};

export const getETHKeys: ActionType<{}> = async (
  taskArgs,
  hre
): Promise<string> => {
  return node.getETHKeys(hre);
};

export const getP2PKeys: ActionType<{}> = async (
  taskArgs,
  hre
): Promise<string> => {
  return node.getP2PKeys(hre);
};

export const getOCRKeys: ActionType<{}> = async (
  taskArgs,
  hre
): Promise<string> => {
  return node.getOCRKeys(hre);
};

export const getJobs: ActionType<{}> = async (
  taskArgs,
  hre
): Promise<string> => {
  return node.getJobs(hre);
};

export const createDirectRequestJob: ActionType<{
  operatorAddress: string;
}> = async (taskArgs, hre): Promise<void> => {
  return node.createDirectRequestJob(hre, taskArgs.operatorAddress);
};
