import { BigNumber, BigNumberish } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { AggregatorV2V3Interface__factory } from "../../types";

export const getLatestRoundAnswer = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedAddress: string
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeed = AggregatorV2V3Interface__factory.connect(
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
  const dataFeed = AggregatorV2V3Interface__factory.connect(
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
  const dataFeed = AggregatorV2V3Interface__factory.connect(
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
  const dataFeed = AggregatorV2V3Interface__factory.connect(
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

export const getLatestRoundId = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedAddress: string
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeed = AggregatorV2V3Interface__factory.connect(
    dataFeedAddress,
    signer
  );

  const roundData = await dataFeed.latestRoundData();
  return roundData.roundId;
};

export const getDecimals = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedAddress: string
): Promise<number> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeed = AggregatorV2V3Interface__factory.connect(
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
  const dataFeed = AggregatorV2V3Interface__factory.connect(
    dataFeedAddress,
    signer
  );

  return dataFeed.description();
};

export const getVersion = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedAddress: string
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeed = AggregatorV2V3Interface__factory.connect(
    dataFeedAddress,
    signer
  );

  return dataFeed.version();
};
