import { BigNumber, BigNumberish } from "ethers";
import { ActionType } from "hardhat/types";

import * as linkToken from "../../../sandbox/linkToken";

export const deploy: ActionType<{}> = async (
  taskArgs,
  hre
): Promise<string> => {
  return linkToken.deploy(hre);
};

export const transfer: ActionType<{
  linkTokenAddress: string;
  recipient: string;
  amount: BigNumberish;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return linkToken.transfer(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.recipient,
    taskArgs.amount
  );
};

export const getAllowance: ActionType<{
  linkTokenAddress: string;
  owner: string;
  spender: string;
}> = async (taskArgs, hre): Promise<BigNumber> => {
  return linkToken.getAllowance(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.owner,
    taskArgs.spender
  );
};

export const increaseApproval: ActionType<{
  linkTokenAddress: string;
  spender: string;
  addedValue: BigNumberish;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return linkToken.increaseApproval(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.spender,
    taskArgs.addedValue
  );
};

export const decreaseApproval: ActionType<{
  linkTokenAddress: string;
  spender: string;
  subtractedValue: BigNumberish;
}> = async (taskArgs, hre): Promise<{ transactionHash: string }> => {
  return linkToken.decreaseApproval(
    hre,
    taskArgs.linkTokenAddress,
    taskArgs.spender,
    taskArgs.subtractedValue
  );
};
