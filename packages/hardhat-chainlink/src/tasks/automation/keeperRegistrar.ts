import { BigNumberish, BytesLike } from "ethers";
import { ActionType } from "hardhat/types";

import * as automationRegistrar from "../../automation/keepersRegistrar";

export const registerUpkeep: ActionType<{
  linkTokenAddress: string;
  keepersRegistrarAddress: string;
  amountInJuels: BigNumberish;
  upkeepName: string;
  encryptedEmail: BytesLike;
  upkeepContract: string;
  gasLimit: number;
  adminAddress: string;
  checkData: BytesLike;
  ocrConfig: BytesLike;
  source: number;
  sender: string;
}> = async (taskArgs, hre) => {
  return automationRegistrar.registerUpkeep(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.keepersRegistrarAddress,
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
  keepersRegistrarAddress: string;
  requestHash: BytesLike;
}> = async (taskArgs, hre) => {
  return automationRegistrar.getPendingRequest(
    hre,
    taskArgs.keepersRegistrarAddress,
    taskArgs.requestHash
  );
};

export const cancelRequest: ActionType<{
  keepersRegistrarAddress: string;
  requestHash: BytesLike;
}> = async (taskArgs, hre) => {
  return automationRegistrar.cancelRequest(
    hre,
    taskArgs.keepersRegistrarAddress,
    taskArgs.requestHash
  );
};

export const getRegistrationConfig: ActionType<{
  keepersRegistrarAddress: string;
}> = async (taskArgs, hre) => {
  return automationRegistrar.getRegistrationConfig(
    hre,
    taskArgs.keepersRegistrarAddress
  );
};

export const getTypeAndVersion: ActionType<{
  keepersRegistrarAddress: string;
}> = async (taskArgs, hre) => {
  return automationRegistrar.getTypeAndVersion(
    hre,
    taskArgs.keepersRegistrarAddress
  );
};
