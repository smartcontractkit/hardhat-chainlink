import { BigNumberish } from "ethers";
import { ActionType } from "hardhat/types";

import * as operator from "../../../sandbox/operator";

export const deploy: ActionType<{
  linkTokenAddress: string;
}> = async (taskArgs, hre): Promise<string> => {
  return operator.deploy(hre, taskArgs.linkTokenAddress);
};

export const setAuthorizedSender: ActionType<{
  operatorAddress: string;
  sender: string;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return operator.setAuthorizedSender(
    hre,
    taskArgs.operatorAddress,
    taskArgs.sender
  );
};

export const distributeFunds: ActionType<{
  operatorAddress: string;
  receivers: string[];
  amounts: BigNumberish[];
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return operator.distributeFunds(
    hre,
    taskArgs.operatorAddress,
    taskArgs.receivers,
    taskArgs.amounts
  );
};
