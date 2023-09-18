import { BigNumberish } from "ethers";
import { ActionType } from "hardhat/types";

import * as l2FeedUptimeSequencer from "../../feeds/l2FeedUptimeSequencer";

export const isL2SequencerUp: ActionType<{
  l2SequencerAddress: string;
}> = async (taskArgs, hre) => {
  return l2FeedUptimeSequencer.isL2SequencerUp(
    hre,
    taskArgs.l2SequencerAddress
  );
};
export const getTimeSinceL2SequencerIsUp: ActionType<{
  l2SequencerAddress: string;
  gracePeriodTime: BigNumberish;
}> = async (taskArgs, hre) => {
  return l2FeedUptimeSequencer.getTimeSinceL2SequencerIsUp(
    hre,
    taskArgs.l2SequencerAddress,
    taskArgs.gracePeriodTime
  );
};
