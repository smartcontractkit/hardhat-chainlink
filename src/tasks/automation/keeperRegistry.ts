import { BigNumber, BigNumberish } from "ethers";
import { ActionType } from "hardhat/types";

import * as automation from "../../automation/keepersRegistry";

export const getState: ActionType<{
  keeperRegistryAddress: string;
}> = async (taskArgs, hre) => {
  return automation.getState(hre, taskArgs.keeperRegistryAddress);
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

export const isPaused: ActionType<{
  keeperRegistryAddress: string;
}> = async (taskArgs, hre) => {
  return automation.isPaused(hre, taskArgs.keeperRegistryAddress);
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

export const migrateUpkeeps: ActionType<{
  keeperRegistryAddress: string;
  upkeepIds: string;
  destination: string;
}> = async (taskArgs, hre) => {
  const upkeepIds = taskArgs.upkeepIds.split(",").map((upkeepId) => {
    return BigNumber.from(upkeepId.trim());
  });
  return automation.migrateUpkeeps(
    hre,
    taskArgs.keeperRegistryAddress,
    upkeepIds,
    taskArgs.destination
  );
};

export const getKeeperInfo: ActionType<{
  keeperRegistryAddress: string;
  keeperAddress: string;
}> = async (taskArgs, hre) => {
  return automation.getKeeperInfo(
    hre,
    taskArgs.keeperRegistryAddress,
    taskArgs.keeperAddress
  );
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
