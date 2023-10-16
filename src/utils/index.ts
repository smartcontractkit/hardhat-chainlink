import * as functionsToolkit from "@chainlink/functions-toolkit";
import { BigNumber, BigNumberish } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { AGGREGATOR_PROXY_PHASE_OFFSET } from "../shared/constants";

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

export const transferETH = async (
  hre: HardhatRuntimeEnvironment,
  recipient: string,
  amount: BigNumberish
): Promise<{
  transactionHash: string;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const tx = await signer.sendTransaction({
    to: recipient,
    value: amount,
  });
  await tx.wait(hre.config.chainlink.confirmations);

  return {
    transactionHash: tx.hash,
  };
};

export const createGist = async (
  githubApiToken: string,
  content: string
): Promise<string> => {
  return functionsToolkit.createGist(githubApiToken, content);
};

export const deleteGist = async (
  githubApiToken: string,
  gistURL: string
): Promise<boolean> => {
  return functionsToolkit.deleteGist(githubApiToken, gistURL);
};
