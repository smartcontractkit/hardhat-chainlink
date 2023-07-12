import { BigNumber, BigNumberish } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { AggregatorV3Interface__factory } from "../../types";

export const getLatestRoundAnswer = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedAddress: string
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeed = AggregatorV3Interface__factory.connect(
    dataFeedAddress,
    signer
  );

  const latestRoundData = await dataFeed.latestRoundData();

  return latestRoundData.answer;
};

export const getLatestRoundData = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedAddress: string
): Promise<{
  roundId: BigNumber;
  answer: BigNumber;
  startedAt: BigNumber;
  updatedAt: BigNumber;
  answeredInRound: BigNumber;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeed = AggregatorV3Interface__factory.connect(
    dataFeedAddress,
    signer
  );

  const latestRoundData = await dataFeed.latestRoundData();

  return {
    roundId: latestRoundData.roundId,
    answer: latestRoundData.answer,
    startedAt: latestRoundData.startedAt,
    updatedAt: latestRoundData.updatedAt,
    answeredInRound: latestRoundData.answeredInRound,
  };
};

export const getRoundAnswer = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedAddress: string,
  roundId: BigNumberish
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeed = AggregatorV3Interface__factory.connect(
    dataFeedAddress,
    signer
  );

  const roundData = await dataFeed.getRoundData(roundId);

  return roundData.answer;
};

export const getRoundData = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedAddress: string,
  roundId: BigNumberish
): Promise<{
  roundId: BigNumber;
  answer: BigNumber;
  startedAt: BigNumber;
  updatedAt: BigNumber;
  answeredInRound: BigNumber;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeed = AggregatorV3Interface__factory.connect(
    dataFeedAddress,
    signer
  );

  const roundData = await dataFeed.getRoundData(roundId);

  return {
    roundId: roundData.roundId,
    answer: roundData.answer,
    startedAt: roundData.startedAt,
    updatedAt: roundData.updatedAt,
    answeredInRound: roundData.answeredInRound,
  };
};

export const getDecimals = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedAddress: string
): Promise<number> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeed = AggregatorV3Interface__factory.connect(
    dataFeedAddress,
    signer
  );

  return dataFeed.decimals();
};

export const getDescription = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedAddress: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeed = AggregatorV3Interface__factory.connect(
    dataFeedAddress,
    signer
  );

  return dataFeed.description();
};

export const getAggregatorVersion = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedAddress: string
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeed = AggregatorV3Interface__factory.connect(
    dataFeedAddress,
    signer
  );

  return dataFeed.version();
};

export const getAggregatorAddress = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedAddress: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeed = AggregatorV3Interface__factory.connect(
    dataFeedAddress,
    signer
  );

  return dataFeed.address;
};

export const getAggregatorRoundId = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedAddress: string
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeed = AggregatorV3Interface__factory.connect(
    dataFeedAddress,
    signer
  );

  const roundData = await dataFeed.latestRoundData();
  const aggregatorRoundId =
    // tslint:disable-next-line:no-bitwise
    roundData.roundId.toBigInt() & BigInt(`0xFFFFFFFFFFFFFFFF`);

  return BigNumber.from(aggregatorRoundId);
};

export const getPhaseId = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedAddress: string
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeed = AggregatorV3Interface__factory.connect(
    dataFeedAddress,
    signer
  );

  const roundData = await dataFeed.latestRoundData();
  // tslint:disable-next-line:no-bitwise
  const phaseId = roundData.roundId.toBigInt() >> 64n;

  return BigNumber.from(phaseId);
};
