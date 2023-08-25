import { BigNumberish, BytesLike } from "ethers";
import { ActionType } from "hardhat/types";

import * as automationRegistrar from "../../automation/keepersRegistrar";

export const registerUpkeep: ActionType<{
  keeperRegistrarAddress: string;
  linkTokenAddress: string;
  amountInJuels: BigNumberish;
  upkeepName: string;
  encryptedEmail: BytesLike;
  upkeepContract: string;
  gasLimit: string;
  adminAddress: string;
  checkData: BytesLike;
  ocrConfig?: BytesLike;
  source?: BigNumberish;
  sender: string;
}> = async (taskArgs, hre) => {
  return automationRegistrar.registerUpkeep(
    hre,
    taskArgs.keeperRegistrarAddress,
    taskArgs.linkTokenAddress,
    taskArgs.amountInJuels,
    taskArgs.upkeepName,
    taskArgs.encryptedEmail,
    taskArgs.upkeepContract,
    taskArgs.gasLimit,
    taskArgs.adminAddress,
    taskArgs.checkData,
    taskArgs.ocrConfig,
    taskArgs.source,
    taskArgs.sender
  );
};

export const getPendingRequest: ActionType<{
  keeperRegistrarAddress: string;
  requestHash: BytesLike;
}> = async (taskArgs, hre) => {
  return automationRegistrar.getPendingRequest(
    hre,
    taskArgs.keeperRegistrarAddress,
    taskArgs.requestHash
  );
};

export const cancelRequest: ActionType<{
  keeperRegistrarAddress: string;
  requestHash: BytesLike;
}> = async (taskArgs, hre) => {
  return automationRegistrar.cancelRequest(
    hre,
    taskArgs.keeperRegistrarAddress,
    taskArgs.requestHash
  );
};

export const getRegistrationConfig: ActionType<{
  keeperRegistrarAddress: string;
}> = async (taskArgs, hre) => {
  return automationRegistrar.getRegistrationConfig(
    hre,
    taskArgs.keeperRegistrarAddress
  );
};

export const getTypeAndVersion: ActionType<{
  keeperRegistrarAddress: string;
}> = async (taskArgs, hre) => {
  return automationRegistrar.getTypeAndVersion(
    hre,
    taskArgs.keeperRegistrarAddress
  );
};
