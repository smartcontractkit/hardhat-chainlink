import { BigNumber, BigNumberish } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { AggregatorProxyInterface__factory } from "../../types";
import { AGGREGATOR_PROXY_PHASE_OFFSET } from "../shared/constants";

import * as dataFeed from "./dataFeed";

export const getLatestRoundAnswer = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedProxyAddress: string
): Promise<BigNumber> => {
  return dataFeed.getLatestRoundAnswer(hre, dataFeedProxyAddress);
};

export const getLatestRoundData = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedProxyAddress: string
): Promise<{
  roundId: BigNumber;
  answer: BigNumber;
  startedAt: BigNumber;
  updatedAt: BigNumber;
  answeredInRound: BigNumber;
}> => {
  return dataFeed.getLatestRoundData(hre, dataFeedProxyAddress);
};

export const getRoundAnswer = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedProxyAddress: string,
  roundId: BigNumberish
): Promise<BigNumber> => {
  return dataFeed.getRoundAnswer(hre, dataFeedProxyAddress, roundId);
};

export const getRoundData = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedProxyAddress: string,
  roundId: BigNumberish
): Promise<{
  roundId: BigNumber;
  answer: BigNumber;
  startedAt: BigNumber;
  updatedAt: BigNumber;
  answeredInRound: BigNumber;
}> => {
  return dataFeed.getRoundData(hre, dataFeedProxyAddress, roundId);
};

export const getLatestRoundId = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedProxyAddress: string
): Promise<BigNumber> => {
  return dataFeed.getLatestRoundId(hre, dataFeedProxyAddress);
};

export const getDecimals = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedProxyAddress: string
): Promise<number> => {
  return dataFeed.getDecimals(hre, dataFeedProxyAddress);
};

export const getDescription = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedProxyAddress: string
): Promise<string> => {
  return dataFeed.getDescription(hre, dataFeedProxyAddress);
};

export const getVersion = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedProxyAddress: string
): Promise<BigNumber> => {
  return dataFeed.getVersion(hre, dataFeedProxyAddress);
};

export const getAggregator = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedProxyAddress: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeedProxy = AggregatorProxyInterface__factory.connect(
    dataFeedProxyAddress,
    signer
  );

  return dataFeedProxy.aggregator();
};

export const getPhaseId = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedProxyAddress: string
): Promise<number> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeedProxy = AggregatorProxyInterface__factory.connect(
    dataFeedProxyAddress,
    signer
  );

  return dataFeedProxy.phaseId();
};

export const getPhaseAggregators = async (
  hre: HardhatRuntimeEnvironment,
  dataFeedProxyAddress: string,
  phaseId: BigNumberish
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const dataFeedProxy = AggregatorProxyInterface__factory.connect(
    dataFeedProxyAddress,
    signer
  );

  return dataFeedProxy.phaseAggregators(phaseId);
};

export const getRoundId = (
  _phaseId: BigNumberish,
  _aggregatorRoundId: BigNumberish
): BigNumber => {
  const phaseId = BigNumber.from(_phaseId);
  const aggregatorRoundId = BigNumber.from(_aggregatorRoundId);

  const result = phaseId
    .shl(AGGREGATOR_PROXY_PHASE_OFFSET)
    .or(aggregatorRoundId);

  return result.and(
    BigNumber.from("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
  );
};

export const parseRoundId = (
  _roundId: BigNumberish
): {
  phaseId: BigNumber;
  aggregatorRoundId: BigNumber;
} => {
  const roundId = BigNumber.from(_roundId);

  const phaseId = roundId.div(
    BigNumber.from(2).pow(AGGREGATOR_PROXY_PHASE_OFFSET)
  );
  const aggregatorRoundId = roundId.and(BigNumber.from("0xFFFFFFFFFFFFFFFF"));

  return {
    phaseId,
    aggregatorRoundId,
  };
};
