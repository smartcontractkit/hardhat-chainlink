import { BigNumberish } from "ethers";
import { ActionType } from "hardhat/types";

import * as utils from "../../utils";

export const getRoundId: ActionType<{
  phaseId: BigNumberish;
  aggregatorRoundId: BigNumberish;
}> = async (taskArgs) => {
  return utils.getRoundId(taskArgs.phaseId, taskArgs.aggregatorRoundId);
};

export const parseRoundId: ActionType<{
  roundId: BigNumberish;
}> = async (taskArgs) => {
  return utils.parseRoundId(taskArgs.roundId);
};

export const transferETH: ActionType<{
  recipient: string;
  amount: BigNumberish;
}> = async (taskArgs, hre) => {
  return utils.transferETH(hre, taskArgs.recipient, taskArgs.amount);
};
