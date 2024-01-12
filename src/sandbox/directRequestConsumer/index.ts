import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
} from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ChainlinkDirectRequestConsumer__factory } from "../../../types";

export const deploy = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();

  const directRequestConsumer =
    await new ChainlinkDirectRequestConsumer__factory()
      .connect(signer)
      .deploy(linkTokenAddress);
  await directRequestConsumer.deployed();

  return directRequestConsumer.address;
};

export const requestData = async (
  hre: HardhatRuntimeEnvironment,
  directRequestConsumerAddress: string,
  operatorAddress: string,
  externalJobID: string,
  observationURL: string,
  pathToData: string,
  multiplyTimes: BigNumberish
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const directRequestConsumer = ChainlinkDirectRequestConsumer__factory.connect(
    directRequestConsumerAddress,
    signer
  );

  const tx: ContractTransaction = await directRequestConsumer.requestData(
    operatorAddress,
    externalJobID.replace(/-/g, ""),
    observationURL,
    pathToData,
    multiplyTimes
  );
  const txReceipt: ContractReceipt = await tx.wait(
    hre.config.chainlink.confirmations
  );
  if (!txReceipt.events) {
    throw new Error("Error executing Direct Request");
  }

  return { transactionHash: tx.hash };
};

export const getLatestAnswer = async (
  hre: HardhatRuntimeEnvironment,
  directRequestConsumerAddress: string
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const directRequestConsumer = ChainlinkDirectRequestConsumer__factory.connect(
    directRequestConsumerAddress,
    signer
  );
  return directRequestConsumer.answer();
};
