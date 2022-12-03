import { BigNumber, Contract } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { FeedRegistryAbi } from "../../types/ethers-contracts";
import FEED_REGISTRY_ABI from "../abis/feedRegistry.abi.json";

export const Denominations = Object.freeze({
  ETH: `0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE`,
  BTC: `0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB`,
  USD: `0x0000000000000000000000000000000000000348`,
  GBP: `0x000000000000000000000000000000000000033a`,
  EUR: `0x00000000000000000000000000000000000003d2`,
  JPY: `0x0000000000000000000000000000000000000188`,
  KRW: `0x000000000000000000000000000000000000019a`,
  CNY: `0x000000000000000000000000000000000000009c`,
  AUD: `0x0000000000000000000000000000000000000024`,
  CAD: `0x000000000000000000000000000000000000007c`,
  CHF: `0x00000000000000000000000000000000000002F4`,
  ARS: `0x0000000000000000000000000000000000000020`,
  PHP: `0x0000000000000000000000000000000000000260`,
  NZD: `0x000000000000000000000000000000000000022A`,
  SGD: `0x00000000000000000000000000000000000002be`,
  NGN: `0x0000000000000000000000000000000000000236`,
  ZAR: `0x00000000000000000000000000000000000002c6`,
  RUB: `0x0000000000000000000000000000000000000283`,
  INR: `0x0000000000000000000000000000000000000164`,
  BRL: `0x00000000000000000000000000000000000003Da`,
});

export const getFeedRegistryDecimals = async (
  env: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  base: string,
  quote: string
): Promise<number> => {
  const [signer] = await env.ethers.getSigners();
  const feedRegistry: FeedRegistryAbi = new Contract(
    feedRegistryAddress,
    FEED_REGISTRY_ABI,
    signer
  ) as FeedRegistryAbi;

  return feedRegistry.decimals(base, quote);
};

export const getFeedRegistryDescription = async (
  env: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  base: string,
  quote: string
): Promise<string> => {
  const [signer] = await env.ethers.getSigners();
  const feedRegistry: FeedRegistryAbi = new Contract(
    feedRegistryAddress,
    FEED_REGISTRY_ABI,
    signer
  ) as FeedRegistryAbi;

  return feedRegistry.description(base, quote);
};

export const getFeedRegistryRoundData = async (
  env: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  base: string,
  quote: string,
  roundId: BigNumber
): Promise<{
  roundId: BigNumber;
  answer: BigNumber;
  startedAt: BigNumber;
  updatedAt: BigNumber;
  answeredInRound: BigNumber;
}> => {
  const [signer] = await env.ethers.getSigners();
  const feedRegistry: FeedRegistryAbi = new Contract(
    feedRegistryAddress,
    FEED_REGISTRY_ABI,
    signer
  ) as FeedRegistryAbi;

  const roundData = await feedRegistry.getRoundData(base, quote, roundId);

  return {
    roundId: roundData.roundId,
    answer: roundData.answer,
    startedAt: roundData.startedAt,
    updatedAt: roundData.updatedAt,
    answeredInRound: roundData.answeredInRound,
  };
};

export const getFeedRegistryLatestRoundData = async (
  env: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  base: string,
  quote: string
): Promise<{
  roundId: BigNumber;
  answer: BigNumber;
  startedAt: BigNumber;
  updatedAt: BigNumber;
  answeredInRound: BigNumber;
}> => {
  const [signer] = await env.ethers.getSigners();
  const feedRegistry: FeedRegistryAbi = new Contract(
    feedRegistryAddress,
    FEED_REGISTRY_ABI,
    signer
  ) as FeedRegistryAbi;

  const roundData = await feedRegistry.latestRoundData(base, quote);

  return {
    roundId: roundData.roundId,
    answer: roundData.answer,
    startedAt: roundData.startedAt,
    updatedAt: roundData.updatedAt,
    answeredInRound: roundData.answeredInRound,
  };
};

export const getFeedRegistryProxyAggregatorVersion = async (
  env: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  base: string,
  quote: string
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const feedRegistry: FeedRegistryAbi = new Contract(
    feedRegistryAddress,
    FEED_REGISTRY_ABI,
    signer
  ) as FeedRegistryAbi;

  const version = await feedRegistry.version(base, quote);

  return version;
};

export const getFeed = async (
  env: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  base: string,
  quote: string
): Promise<string> => {
  const [signer] = await env.ethers.getSigners();
  const feedRegistry: FeedRegistryAbi = new Contract(
    feedRegistryAddress,
    FEED_REGISTRY_ABI,
    signer
  ) as FeedRegistryAbi;

  const feedAddress = await feedRegistry.getFeed(base, quote);

  return feedAddress;
};

export const getPhaseFeed = async (
  env: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  base: string,
  quote: string,
  phaseId: BigNumber
): Promise<string> => {
  const [signer] = await env.ethers.getSigners();
  const feedRegistry: FeedRegistryAbi = new Contract(
    feedRegistryAddress,
    FEED_REGISTRY_ABI,
    signer
  ) as FeedRegistryAbi;

  const feedAddress = await feedRegistry.getPhaseFeed(base, quote, phaseId);

  return feedAddress;
};

export const isFeedEnabled = async (
  env: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  aggregatorAddress: string
): Promise<boolean> => {
  const [signer] = await env.ethers.getSigners();
  const feedRegistry: FeedRegistryAbi = new Contract(
    feedRegistryAddress,
    FEED_REGISTRY_ABI,
    signer
  ) as FeedRegistryAbi;

  return feedRegistry.isFeedEnabled(aggregatorAddress);
};

export const getPhase = async (
  env: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  base: string,
  quote: string,
  phaseId: BigNumber
): Promise<{
  phaseId: number;
  startingAggregatorRoundId: BigNumber;
  endingAggregatorRoundId: BigNumber;
}> => {
  const [signer] = await env.ethers.getSigners();
  const feedRegistry: FeedRegistryAbi = new Contract(
    feedRegistryAddress,
    FEED_REGISTRY_ABI,
    signer
  ) as FeedRegistryAbi;

  const phase = await feedRegistry.getPhase(base, quote, phaseId);

  return {
    phaseId: phase.phaseId,
    startingAggregatorRoundId: phase.startingAggregatorRoundId,
    endingAggregatorRoundId: phase.endingAggregatorRoundId,
  };
};

export const getRoundFeed = async (
  env: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  base: string,
  quote: string,
  roundId: BigNumber
): Promise<string> => {
  const [signer] = await env.ethers.getSigners();
  const feedRegistry: FeedRegistryAbi = new Contract(
    feedRegistryAddress,
    FEED_REGISTRY_ABI,
    signer
  ) as FeedRegistryAbi;

  const aggregatorAddress = await feedRegistry.getRoundFeed(
    base,
    quote,
    roundId
  );

  return aggregatorAddress;
};

export const getPhaseRange = async (
  env: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  base: string,
  quote: string,
  phaseId: BigNumber
): Promise<{
  startingRoundId: BigNumber;
  endingRoundId: BigNumber;
}> => {
  const [signer] = await env.ethers.getSigners();
  const feedRegistry: FeedRegistryAbi = new Contract(
    feedRegistryAddress,
    FEED_REGISTRY_ABI,
    signer
  ) as FeedRegistryAbi;

  const phaseRange = await feedRegistry.getPhaseRange(base, quote, phaseId);

  return {
    startingRoundId: phaseRange.startingRoundId,
    endingRoundId: phaseRange.endingRoundId,
  };
};

export const getPreviousRoundId = async (
  env: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  base: string,
  quote: string,
  roundId: BigNumber
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const feedRegistry: FeedRegistryAbi = new Contract(
    feedRegistryAddress,
    FEED_REGISTRY_ABI,
    signer
  ) as FeedRegistryAbi;

  const previousRoundId = await feedRegistry.getPreviousRoundId(
    base,
    quote,
    roundId
  );

  return previousRoundId;
};

export const getNextRoundId = async (
  env: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  base: string,
  quote: string,
  roundId: BigNumber
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const feedRegistry: FeedRegistryAbi = new Contract(
    feedRegistryAddress,
    FEED_REGISTRY_ABI,
    signer
  ) as FeedRegistryAbi;

  const nextRoundId = await feedRegistry.getNextRoundId(base, quote, roundId);

  return nextRoundId;
};

export const getCurrentPhaseId = async (
  env: HardhatRuntimeEnvironment,
  feedRegistryAddress: string,
  base: string,
  quote: string
): Promise<number> => {
  const [signer] = await env.ethers.getSigners();
  const feedRegistry: FeedRegistryAbi = new Contract(
    feedRegistryAddress,
    FEED_REGISTRY_ABI,
    signer
  ) as FeedRegistryAbi;

  const currentPhaseId = await feedRegistry.getCurrentPhaseId(base, quote);

  return currentPhaseId;
};
