import { BigNumber, BigNumberish, constants, Contract } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { L2SequencerUptimeStatusFeedAbi } from "../../types-abis";
import L2_SEQUENCER_UPTIME_STATUS_FEED_ABI from "../contracts/abis/l2SequencerUptimeStatusFeed.abi.json";

export const isL2SequencerUp = async (
  hre: HardhatRuntimeEnvironment,
  l2SequencerAddress: string
): Promise<boolean> => {
  const [signer] = await hre.ethers.getSigners();
  const sequencerUptimeFeed: L2SequencerUptimeStatusFeedAbi = new Contract(
    l2SequencerAddress,
    L2_SEQUENCER_UPTIME_STATUS_FEED_ABI,
    signer
  ) as L2SequencerUptimeStatusFeedAbi;

  const roundData = await sequencerUptimeFeed.latestRoundData();

  return roundData.answer === constants.Zero;
};

export const getTimeSinceL2SequencerIsUp = async (
  hre: HardhatRuntimeEnvironment,
  l2SequencerAddress: string,
  gracePeriodTime: BigNumberish = BigNumber.from(3600)
): Promise<{
  isSequencerUp: boolean;
  timeSinceUp: BigNumber;
  isGracePeriodOver: boolean;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const sequencerUptimeFeed: L2SequencerUptimeStatusFeedAbi = new Contract(
    l2SequencerAddress,
    L2_SEQUENCER_UPTIME_STATUS_FEED_ABI,
    signer
  ) as L2SequencerUptimeStatusFeedAbi;

  const roundData = await sequencerUptimeFeed.latestRoundData();
  const isSequencerUp = roundData.answer === constants.Zero;

  let timeSinceUp: BigNumber;
  let isGracePeriodOver: boolean;

  if (!isSequencerUp) {
    timeSinceUp = BigNumber.from(0);
    isGracePeriodOver = false;
  } else {
    const latestBlock = await hre.ethers.provider.getBlock("latest");
    timeSinceUp = BigNumber.from(latestBlock.timestamp).sub(
      roundData.startedAt
    );
    isGracePeriodOver = timeSinceUp.gt(gracePeriodTime);
  }

  return {
    isSequencerUp,
    timeSinceUp,
    isGracePeriodOver,
  };
};
