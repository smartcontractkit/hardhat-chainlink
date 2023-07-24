import { BigNumberish, BytesLike } from "ethers";
import { ActionType } from "hardhat/types";

import * as automation from "../../automation";

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
  source: number;
  sender: string;
}> = async (taskArgs, hre) => {
  return automation.registerUpkeep(
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
    taskArgs.source,
    taskArgs.sender
  );
};

export const getPendingRegistrationRequest: ActionType<{
  keepersRegistrarAddress: string;
  requestHash: BytesLike;
}> = async (taskArgs, hre) => {
  return automation.getPendingRegistrationRequest(
    hre,
    taskArgs.keepersRegistrarAddress,
    taskArgs.requestHash
  );
};

export const cancelPendingRegistrationRequest: ActionType<{
  keepersRegistrarAddress: string;
  requestHash: BytesLike;
}> = async (taskArgs, hre) => {
  return automation.cancelPendingRegistrationRequest(
    hre,
    taskArgs.keepersRegistrarAddress,
    taskArgs.requestHash
  );
};

export const getKeeperRegistrarConfig: ActionType<{
  keepersRegistrarAddress: string;
}> = async (taskArgs, hre) => {
  return automation.getKeeperRegistrarConfig(
    hre,
    taskArgs.keepersRegistrarAddress
  );
};

export const getKeepersRegistrarTypeAndVersion: ActionType<{
  keepersRegistrarAddress: string;
}> = async (taskArgs, hre) => {
  return automation.getKeepersRegistrarTypeAndVersion(
    hre,
    taskArgs.keepersRegistrarAddress
  );
};
