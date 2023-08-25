import { BigNumber, BigNumberish, constants } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

// NOTE: Interface for both deployed SequencerUptimeFeeds is the same, we can use any
import { OptimismSequencerUptimeFeed__factory as SequencerUptimeFeed__factory } from "../../types";

export const isL2SequencerUp = async (
  hre: HardhatRuntimeEnvironment,
  l2SequencerAddress: string
): Promise<boolean> => {
  const [signer] = await hre.ethers.getSigners();
  const sequencerUptimeFeed = SequencerUptimeFeed__factory.connect(
    l2SequencerAddress,
    signer
  );

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
  const sequencerUptimeFeed = SequencerUptimeFeed__factory.connect(
    l2SequencerAddress,
    signer
  );

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
