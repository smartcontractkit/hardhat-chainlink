import { BigNumberish, BytesLike } from "ethers";
import { ActionType } from "hardhat/types";

import * as automation from "../../automation";

export const fundUpkeep: ActionType<{
  keepersRegistryAddress: string;
  upkeepId: BigNumberish;
  amountInJuels: BigNumberish;
}> = async (taskArgs, hre) => {
  return automation.fundUpkeep(
    hre,
    taskArgs.keepersRegistryAddress,
    taskArgs.upkeepId,
    taskArgs.amountInJuels
  );
};

export const checkUpkeep: ActionType<{
  keepersRegistryAddress: string;
  upkeepId: BigNumberish;
  fromAddress: string;
}> = async (taskArgs, hre) => {
  return automation.checkUpkeep(
    hre,
    taskArgs.keepersRegistryAddress,
    taskArgs.upkeepId,
    taskArgs.fromAddress
  );
};

export const cancelUpkeep: ActionType<{
  keepersRegistryAddress: string;
  upkeepId: BigNumberish;
}> = async (taskArgs, hre) => {
  return automation.cancelUpkeep(
    hre,
    taskArgs.keepersRegistryAddress,
    taskArgs.upkeepId
  );
};

export const withdrawFunds: ActionType<{
  keepersRegistryAddress: string;
  upkeepId: BigNumberish;
  receivingAddress: string;
}> = async (taskArgs, hre) => {
  return automation.withdrawFunds(
    hre,
    taskArgs.keepersRegistryAddress,
    taskArgs.upkeepId,
    taskArgs.receivingAddress
  );
};

export const getActiveUpkeepIDs: ActionType<{
  keepersRegistryAddress: string;
  startIndex: BigNumberish;
  maxCount: BigNumberish;
}> = async (taskArgs, hre) => {
  return automation.getActiveUpkeepIDs(
    hre,
    taskArgs.keepersRegistryAddress,
    taskArgs.startIndex,
    taskArgs.maxCount
  );
};

export const getUpkeep: ActionType<{
  keepersRegistryAddress: string;
  upkeepId: BigNumberish;
}> = async (taskArgs, hre) => {
  return automation.getUpkeep(
    hre,
    taskArgs.keepersRegistryAddress,
    taskArgs.upkeepId
  );
};

export const migrateUpkeeps: ActionType<{
  keepersRegistryAddress: string;
  upkeepIds: BigNumberish[];
  destination: string;
}> = async (taskArgs, hre) => {
  return automation.migrateUpkeeps(
    hre,
    taskArgs.keepersRegistryAddress,
    taskArgs.upkeepIds,
    taskArgs.destination
  );
};

export const receiveUpkeeps: ActionType<{
  keepersRegistryAddress: string;
  encodedUpkeeps: BytesLike;
}> = async (taskArgs, hre) => {
  return automation.receiveUpkeeps(
    hre,
    taskArgs.keepersRegistryAddress,
    taskArgs.encodedUpkeeps
  );
};

export const withdrawKeeperPayment: ActionType<{
  keepersRegistryAddress: string;
  fromAddress: string;
  toAddress: string;
}> = async (taskArgs, hre) => {
  return automation.withdrawKeeperPayment(
    hre,
    taskArgs.keepersRegistryAddress,
    taskArgs.fromAddress,
    taskArgs.toAddress
  );
};

export const transferKeeperPayeeship: ActionType<{
  keepersRegistryAddress: string;
  keeper: string;
  proposed: string;
}> = async (taskArgs, hre) => {
  return automation.transferKeeperPayeeship(
    hre,
    taskArgs.keepersRegistryAddress,
    taskArgs.keeper,
    taskArgs.proposed
  );
};

export const acceptKeeperPayeeship: ActionType<{
  keepersRegistryAddress: string;
  keeper: string;
}> = async (taskArgs, hre) => {
  return automation.acceptKeeperPayeeship(
    hre,
    taskArgs.keepersRegistryAddress,
    taskArgs.keeper
  );
};

export const getKeeperInfo: ActionType<{
  keepersRegistryAddress: string;
  query: string;
}> = async (taskArgs, hre) => {
  return automation.getKeeperInfo(
    hre,
    taskArgs.keepersRegistryAddress,
    taskArgs.query
  );
};

export const getMaxPaymentForGas: ActionType<{
  keepersRegistryAddress: string;
  gasLimit: BigNumberish;
}> = async (taskArgs, hre) => {
  return automation.getMaxPaymentForGas(
    hre,
    taskArgs.keepersRegistryAddress,
    taskArgs.gasLimit
  );
};

export const getMinBalanceForUpkeep: ActionType<{
  keepersRegistryAddress: string;
  upkeepId: BigNumberish;
}> = async (taskArgs, hre) => {
  return automation.getMinBalanceForUpkeep(
    hre,
    taskArgs.keepersRegistryAddress,
    taskArgs.upkeepId
  );
};

export const getKeeperRegistryState: ActionType<{
  keepersRegistryAddress: string;
}> = async (taskArgs, hre) => {
  return automation.getKeeperRegistryState(
    hre,
    taskArgs.keepersRegistryAddress
  );
};

export const isKeeperRegistryPaused: ActionType<{
  keepersRegistryAddress: string;
}> = async (taskArgs, hre) => {
  return automation.isKeeperRegistryPaused(
    hre,
    taskArgs.keepersRegistryAddress
  );
};

export const getKeeperRegistryTypeAndVersion: ActionType<{
  keepersRegistryAddress: string;
}> = async (taskArgs, hre) => {
  return automation.getKeeperRegistryTypeAndVersion(
    hre,
    taskArgs.keepersRegistryAddress
  );
};

export const getKeeperRegistryUpkeepTranscoderVersion: ActionType<{
  keepersRegistryAddress: string;
}> = async (taskArgs, hre) => {
  return automation.getKeeperRegistryUpkeepTranscoderVersion(
    hre,
    taskArgs.keepersRegistryAddress
  );
};
