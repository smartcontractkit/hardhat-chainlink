import { BigNumber } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { AggregatorV3Interface__factory } from "../../types";

export const getLatestPrice = async (
  env: HardhatRuntimeEnvironment,
  priceFeedAddress: string
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const priceFeed = AggregatorV3Interface__factory.connect(priceFeedAddress, signer);

  const latestRoundData = await priceFeed.latestRoundData();
  const price: BigNumber = latestRoundData.answer;

  return price;
};

export const getLatestRoundData = async (
  env: HardhatRuntimeEnvironment,
  priceFeedAddress: string
): Promise<{
  roundId: BigNumber;
  answer: BigNumber;
  startedAt: BigNumber;
  updatedAt: BigNumber;
  answeredInRound: BigNumber;
}> => {
  const [signer] = await env.ethers.getSigners();
  const priceFeed = AggregatorV3Interface__factory.connect(priceFeedAddress, signer);

  const latestRoundData = await priceFeed.latestRoundData();

  return {
    roundId: latestRoundData.roundId,
    answer: latestRoundData.answer,
    startedAt: latestRoundData.startedAt,
    updatedAt: latestRoundData.updatedAt,
    answeredInRound: latestRoundData.answeredInRound,
  };
};

export const getPriceFeedDecimals = async (
  env: HardhatRuntimeEnvironment,
  priceFeedAddress: string
): Promise<number> => {
  const [signer] = await env.ethers.getSigners();
  const priceFeed = AggregatorV3Interface__factory.connect(priceFeedAddress, signer);

  return priceFeed.decimals();
};

export const getPriceFeedDescription = async (
  env: HardhatRuntimeEnvironment,
  priceFeedAddress: string
): Promise<string> => {
  const [signer] = await env.ethers.getSigners();
  const priceFeed = AggregatorV3Interface__factory.connect(priceFeedAddress, signer);

  return priceFeed.description();
};

export const getRoundData = async (
  env: HardhatRuntimeEnvironment,
  priceFeedAddress: string,
  roundId: BigNumber
): Promise<{
  roundId: BigNumber;
  answer: BigNumber;
  startedAt: BigNumber;
  updatedAt: BigNumber;
  answeredInRound: BigNumber;
}> => {
  const [signer] = await env.ethers.getSigners();
  const priceFeed = AggregatorV3Interface__factory.connect(priceFeedAddress, signer);

  const roundData = await priceFeed.getRoundData(roundId);

  return {
    roundId: roundData.roundId,
    answer: roundData.answer,
    startedAt: roundData.startedAt,
    updatedAt: roundData.updatedAt,
    answeredInRound: roundData.answeredInRound,
  };
};

export const getPriceFeedAggregatorVersion = async (
  env: HardhatRuntimeEnvironment,
  priceFeedAddress: string
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const priceFeed = AggregatorV3Interface__factory.connect(priceFeedAddress, signer);

  const version = await priceFeed.version();

  return version;
};

export const getAggregatorAddress = async (
  env: HardhatRuntimeEnvironment,
  priceFeedAddress: string
): Promise<string> => {
  const [signer] = await env.ethers.getSigners();
  const priceFeed = AggregatorV3Interface__factory.connect(priceFeedAddress, signer);

  return priceFeed.address;
};

export const getAggregatorRoundId = async (
  env: HardhatRuntimeEnvironment,
  priceFeedAddress: string
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const priceFeed = AggregatorV3Interface__factory.connect(priceFeedAddress, signer);

  const roundData = await priceFeed.latestRoundData();
  const aggregatorRoundId =
    roundData.roundId.toBigInt() & BigInt(`0xFFFFFFFFFFFFFFFF`);

  return BigNumber.from(aggregatorRoundId);
};

export const getPhaseId = async (
  env: HardhatRuntimeEnvironment,
  priceFeedAddress: string
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const priceFeed = AggregatorV3Interface__factory.connect(priceFeedAddress, signer);

  const roundData = await priceFeed.latestRoundData();
  const phaseId = roundData.roundId.toBigInt() >> 64n;

  return BigNumber.from(phaseId);
};

export const getHistoricalPrice = async (
  env: HardhatRuntimeEnvironment,
  priceFeedAddress: string,
  roundId: BigNumber
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const priceFeed = AggregatorV3Interface__factory.connect(priceFeedAddress, signer);

  const roundData = await priceFeed.getRoundData(roundId);

  return roundData.answer;
};


