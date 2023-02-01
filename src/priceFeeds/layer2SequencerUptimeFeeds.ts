import { BigNumber, constants, Contract } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { L2SequencerUptimeStatusFeedAbi } from "../../types-abis";
import L2_SEQUENCER_UPTIME_STATUS_FEED_ABI from "../abis/l2SequencerUptimeStatusFeed.abi.json";

export const isLayer2SequencerUp = async (
  env: HardhatRuntimeEnvironment,
  sequencerUptimeFeedAddress: string
): Promise<boolean> => {
  const [signer] = await env.ethers.getSigners();
  const sequencerUptimeFeed: L2SequencerUptimeStatusFeedAbi = new Contract(
    sequencerUptimeFeedAddress,
    L2_SEQUENCER_UPTIME_STATUS_FEED_ABI,
    signer
  ) as L2SequencerUptimeStatusFeedAbi;

  const roundData = await sequencerUptimeFeed.latestRoundData();
  const isSequencerUp = roundData.answer === constants.Zero ? true : false;

  return isSequencerUp;
};

export const getTimeSinceLayer2SequencerIsUp = async (
  env: HardhatRuntimeEnvironment,
  sequencerUptimeFeedAddress: string,
  gracePeriodTime = BigNumber.from(3600)
): Promise<{
  isSequencerUp: boolean;
  timeSinceUp: BigNumber;
  isGracePeriodOver: boolean;
}> => {
  const [signer] = await env.ethers.getSigners();
  const sequencerUptimeFeed: L2SequencerUptimeStatusFeedAbi = new Contract(
    sequencerUptimeFeedAddress,
    L2_SEQUENCER_UPTIME_STATUS_FEED_ABI,
    signer
  ) as L2SequencerUptimeStatusFeedAbi;

  const roundData = await sequencerUptimeFeed.latestRoundData();
  const isSequencerUp = roundData.answer === constants.Zero ? true : false;

  let timeSinceUp: BigNumber;
  let isGracePeriodOver: boolean;

  if (!isSequencerUp) {
    timeSinceUp = BigNumber.from(0);
    isGracePeriodOver = false;
  } else {
    const latestBlock = await env.ethers.provider.getBlock("latest");
    timeSinceUp = BigNumber.from(latestBlock.timestamp).sub(
      roundData.startedAt
    );
    isGracePeriodOver = timeSinceUp.gt(gracePeriodTime) ? true : false;
  }

  return {
    isSequencerUp: isSequencerUp,
    timeSinceUp: timeSinceUp,
    isGracePeriodOver: isGracePeriodOver,
  };
};
