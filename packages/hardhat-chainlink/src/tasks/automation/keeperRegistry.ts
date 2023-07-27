import { BigNumberish, BytesLike } from "ethers";
import { ActionType } from "hardhat/types";

import * as automation from "../../automation/keepersRegistry";

export const fundUpkeep: ActionType<{
  keeperRegistryAddress: string;
  upkeepId: BigNumberish;
  amountInJuels: BigNumberish;
}> = async (taskArgs, hre) => {
  return automation.fundUpkeep(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.upkeepId,
    taskArgs.amountInJuels
  );
};

export const checkUpkeep: ActionType<{
  keeperRegistryAddress: string;
  upkeepId: BigNumberish;
  fromAddress: string;
}> = async (taskArgs, hre) => {
  return automation.checkUpkeep(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.upkeepId,
    taskArgs.fromAddress
  );
};

export const cancelUpkeep: ActionType<{
  keeperRegistryAddress: string;
  upkeepId: BigNumberish;
}> = async (taskArgs, hre) => {
  return automation.cancelUpkeep(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.upkeepId
  );
};

export const withdrawFunds: ActionType<{
  keeperRegistryAddress: string;
  upkeepId: BigNumberish;
  receivingAddress: string;
}> = async (taskArgs, hre) => {
  return automation.withdrawFunds(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.upkeepId,
    taskArgs.receivingAddress
  );
};

export const getActiveUpkeepIDs: ActionType<{
  keeperRegistryAddress: string;
  startIndex: BigNumberish;
  maxCount: BigNumberish;
}> = async (taskArgs, hre) => {
  return automation.getActiveUpkeepIDs(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.startIndex,
    taskArgs.maxCount
  );
};

export const getUpkeep: ActionType<{
  keeperRegistryAddress: string;
  upkeepId: BigNumberish;
}> = async (taskArgs, hre) => {
  return automation.getUpkeep(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.upkeepId
  );
};

export const migrateUpkeeps: ActionType<{
  keeperRegistryAddress: string;
  upkeepIds: BigNumberish[];
  destination: string;
}> = async (taskArgs, hre) => {
  return automation.migrateUpkeeps(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.upkeepIds,
    taskArgs.destination
  );
};

export const receiveUpkeeps: ActionType<{
  keeperRegistryAddress: string;
  encodedUpkeeps: BytesLike;
}> = async (taskArgs, hre) => {
  return automation.receiveUpkeeps(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.encodedUpkeeps
  );
};

export const withdrawPayment: ActionType<{
  keeperRegistryAddress: string;
  fromAddress: string;
  toAddress: string;
}> = async (taskArgs, hre) => {
  return automation.withdrawPayment(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.fromAddress,
    taskArgs.toAddress
  );
};

export const transferPayeeship: ActionType<{
  keeperRegistryAddress: string;
  keeper: string;
  proposed: string;
}> = async (taskArgs, hre) => {
  return automation.transferPayeeship(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.keeper,
    taskArgs.proposed
  );
};

export const acceptPayeeship: ActionType<{
  keeperRegistryAddress: string;
  keeper: string;
}> = async (taskArgs, hre) => {
  return automation.acceptPayeeship(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.keeper
  );
};

export const getKeeperInfo: ActionType<{
  keeperRegistryAddress: string;
  query: string;
}> = async (taskArgs, hre) => {
  return automation.getKeeperInfo(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.query
  );
};

export const getMaxPaymentForGas: ActionType<{
  keeperRegistryAddress: string;
  gasLimit: BigNumberish;
}> = async (taskArgs, hre) => {
  return automation.getMaxPaymentForGas(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.gasLimit
  );
};

export const getMinBalanceForUpkeep: ActionType<{
  keeperRegistryAddress: string;
  upkeepId: BigNumberish;
}> = async (taskArgs, hre) => {
  return automation.getMinBalanceForUpkeep(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.upkeepId
  );
};

export const getState: ActionType<{
  keeperRegistryAddress: string;
}> = async (taskArgs, hre) => {
  return automation.getState(hre, taskArgs.keeperRegistryAddress);
};

export const isPaused: ActionType<{
  keeperRegistryAddress: string;
}> = async (taskArgs, hre) => {
  return automation.isPaused(hre, taskArgs.keeperRegistryAddress);
};

export const getTypeAndVersion: ActionType<{
  keeperRegistryAddress: string;
}> = async (taskArgs, hre) => {
  return automation.getTypeAndVersion(hre, taskArgs.keeperRegistryAddress);
};

export const getUpkeepTranscoderVersion: ActionType<{
  keeperRegistryAddress: string;
}> = async (taskArgs, hre) => {
  return automation.getUpkeepTranscoderVersion(
    hre,
    taskArgs.keeperRegistryAddress
  );
};
