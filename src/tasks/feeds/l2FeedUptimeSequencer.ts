import { BigNumberish } from "ethers";
import { ActionType } from "hardhat/types";

import * as feeds from "../../feeds";

export const isL2SequencerUp: ActionType<{
  l2SequencerAddress: string;
}> = async (taskArgs, hre) => {
  return feeds.isL2SequencerUp(hre, taskArgs.l2SequencerAddress);
};
export const getTimeSinceL2SequencerIsUp: ActionType<{
  l2SequencerAddress: string;
  gracePeriodTime: BigNumberish;
}> = async (taskArgs, hre) => {
  return feeds.getTimeSinceL2SequencerIsUp(
    hre,
    taskArgs.l2SequencerAddress,
    taskArgs.gracePeriodTime
  );
};
