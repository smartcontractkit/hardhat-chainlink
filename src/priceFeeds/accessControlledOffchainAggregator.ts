import { BigNumber, Contract } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { AccessControlledOffchainAggregatorAbi } from "../../types/ethers-contracts";
import ACCESS_CONTROLLED_OFFCHAIN_AGGREGATOR_ABI from "../abis/accessControlledOffchainAggregator.abi.json";

export const getHistoricalPriceFromAggregator = async (
  env: HardhatRuntimeEnvironment,
  aggregatorAddress: string,
  aggregatorRoundId: BigNumber
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const aggregator: AccessControlledOffchainAggregatorAbi = new Contract(
    aggregatorAddress,
    ACCESS_CONTROLLED_OFFCHAIN_AGGREGATOR_ABI,
    signer
  ) as AccessControlledOffchainAggregatorAbi;

  const price = await aggregator.getAnswer(aggregatorRoundId);

  return price;
};

export const getRoundTimestampOfAggregator = async (
  env: HardhatRuntimeEnvironment,
  aggregatorAddress: string,
  aggregatorRoundId: BigNumber
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const aggregator: AccessControlledOffchainAggregatorAbi = new Contract(
    aggregatorAddress,
    ACCESS_CONTROLLED_OFFCHAIN_AGGREGATOR_ABI,
    signer
  ) as AccessControlledOffchainAggregatorAbi;

  const timestamp = await aggregator.getTimestamp(aggregatorRoundId);

  return timestamp;
};

export const getLatestTimestampOfAggregator = async (
  env: HardhatRuntimeEnvironment,
  aggregatorAddress: string
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const aggregator: AccessControlledOffchainAggregatorAbi = new Contract(
    aggregatorAddress,
    ACCESS_CONTROLLED_OFFCHAIN_AGGREGATOR_ABI,
    signer
  ) as AccessControlledOffchainAggregatorAbi;

  const timestamp = await aggregator.latestTimestamp();

  return timestamp;
};

export const getLatestRoundIdOfAggregator = async (
  env: HardhatRuntimeEnvironment,
  aggregatorAddress: string
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const aggregator: AccessControlledOffchainAggregatorAbi = new Contract(
    aggregatorAddress,
    ACCESS_CONTROLLED_OFFCHAIN_AGGREGATOR_ABI,
    signer
  ) as AccessControlledOffchainAggregatorAbi;

  const aggregatorRoundId = await aggregator.latestRound();

  return aggregatorRoundId;
};

export const getTypeAndVersionOfAggregator = async (
  env: HardhatRuntimeEnvironment,
  aggregatorAddress: string
): Promise<string> => {
  const [signer] = await env.ethers.getSigners();
  const aggregator: AccessControlledOffchainAggregatorAbi = new Contract(
    aggregatorAddress,
    ACCESS_CONTROLLED_OFFCHAIN_AGGREGATOR_ABI,
    signer
  ) as AccessControlledOffchainAggregatorAbi;

  const typeAndVersion = await aggregator.typeAndVersion();

  return typeAndVersion;
};

export const getPhaseIdOfAggregator = async (
  env: HardhatRuntimeEnvironment,
  aggregatorAddress: string
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const aggregator: AccessControlledOffchainAggregatorAbi = new Contract(
    aggregatorAddress,
    ACCESS_CONTROLLED_OFFCHAIN_AGGREGATOR_ABI,
    signer
  ) as AccessControlledOffchainAggregatorAbi;

  const version = await aggregator.version();

  return version;
};
