import { BigNumber, BigNumberish } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { FeedRegistryInterface__factory } from "../../types";

export const getFeed = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  return feedRegistry.getFeed(feedRegistryBaseTick, feedRegistryQuoteTick);
};

export const getProposedFeed = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  return feedRegistry.getProposedFeed(
    feedRegistryBaseTick,
    feedRegistryQuoteTick
  );
};

export const isFeedEnabled = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  aggregatorAddress: string
): Promise<boolean> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  return feedRegistry.isFeedEnabled(aggregatorAddress);
};

export const getDecimals = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string
): Promise<number> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  return feedRegistry.decimals(feedRegistryBaseTick, feedRegistryQuoteTick);
};

export const getDescription = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  return feedRegistry.description(feedRegistryBaseTick, feedRegistryQuoteTick);
};

export const getVersion = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  return feedRegistry.version(feedRegistryBaseTick, feedRegistryQuoteTick);
};

export const getLatestRoundData = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string
): Promise<{
  roundId: BigNumber;
  answer: BigNumber;
  startedAt: BigNumber;
  updatedAt: BigNumber;
  answeredInRound: BigNumber;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  const roundData = await feedRegistry.latestRoundData(
    feedRegistryBaseTick,
    feedRegistryQuoteTick
  );

  return {
    roundId: roundData.roundId,
    answer: roundData.answer,
    startedAt: roundData.startedAt,
    updatedAt: roundData.updatedAt,
    answeredInRound: roundData.answeredInRound,
  };
};

export const getRoundData = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string,
  roundId: BigNumberish
): Promise<{
  roundId: BigNumber;
  answer: BigNumber;
  startedAt: BigNumber;
  updatedAt: BigNumber;
  answeredInRound: BigNumber;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  const roundData = await feedRegistry.getRoundData(
    feedRegistryBaseTick,
    feedRegistryQuoteTick,
    roundId
  );

  return {
    roundId: roundData.roundId,
    answer: roundData.answer,
    startedAt: roundData.startedAt,
    updatedAt: roundData.updatedAt,
    answeredInRound: roundData.answeredInRound,
  };
};

export const proposedGetLatestRoundData = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string
): Promise<{
  roundId: BigNumber;
  answer: BigNumber;
  startedAt: BigNumber;
  updatedAt: BigNumber;
  answeredInRound: BigNumber;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  const roundData = await feedRegistry.proposedLatestRoundData(
    feedRegistryBaseTick,
    feedRegistryQuoteTick
  );

  return {
    roundId: roundData.id,
    answer: roundData.answer,
    startedAt: roundData.startedAt,
    updatedAt: roundData.updatedAt,
    answeredInRound: roundData.answeredInRound,
  };
};

export const proposedGetRoundData = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string,
  roundId: BigNumberish
): Promise<{
  roundId: BigNumber;
  answer: BigNumber;
  startedAt: BigNumber;
  updatedAt: BigNumber;
  answeredInRound: BigNumber;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  const roundData = await feedRegistry.proposedGetRoundData(
    feedRegistryBaseTick,
    feedRegistryQuoteTick,
    roundId
  );

  return {
    roundId: roundData.id,
    answer: roundData.answer,
    startedAt: roundData.startedAt,
    updatedAt: roundData.updatedAt,
    answeredInRound: roundData.answeredInRound,
  };
};

export const getRoundFeed = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string,
  roundId: BigNumberish
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  return feedRegistry.getRoundFeed(
    feedRegistryBaseTick,
    feedRegistryQuoteTick,
    roundId
  );
};

export const getPhase = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string,
  phaseId: BigNumberish
): Promise<{
  phaseId: number;
  startingAggregatorRoundId: BigNumber;
  endingAggregatorRoundId: BigNumber;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  return feedRegistry.getPhase(
    feedRegistryBaseTick,
    feedRegistryQuoteTick,
    phaseId
  );
};

export const getPhaseFeed = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string,
  phaseId: BigNumberish
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  return feedRegistry.getPhaseFeed(
    feedRegistryBaseTick,
    feedRegistryQuoteTick,
    phaseId
  );
};

export const getPhaseRange = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string,
  phaseId: BigNumberish
): Promise<{
  startingRoundId: BigNumber;
  endingRoundId: BigNumber;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  const phaseRange = await feedRegistry.getPhaseRange(
    feedRegistryBaseTick,
    feedRegistryQuoteTick,
    phaseId
  );

  return {
    startingRoundId: phaseRange.startingRoundId,
    endingRoundId: phaseRange.endingRoundId,
  };
};

export const getCurrentPhaseId = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string
): Promise<number> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  return feedRegistry.getCurrentPhaseId(
    feedRegistryBaseTick,
    feedRegistryQuoteTick
  );
};

export const getPreviousRoundId = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string,
  roundId: BigNumberish
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  return feedRegistry.getPreviousRoundId(
    feedRegistryBaseTick,
    feedRegistryQuoteTick,
    roundId
  );
};

export const getNextRoundId = async (
  hre: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  feedRegistryBaseTick: string,
  feedRegistryQuoteTick: string,
  roundId: BigNumberish
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const feedRegistry = FeedRegistryInterface__factory.connect(
    feedRegistryAddress,
    signer
  );

  return feedRegistry.getNextRoundId(
    feedRegistryBaseTick,
    feedRegistryQuoteTick,
    roundId
  );
};
