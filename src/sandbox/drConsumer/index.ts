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

  const drConsumer = await new ChainlinkDirectRequestConsumer__factory()
    .connect(signer)
    .deploy(linkTokenAddress);
  await drConsumer.deployed();

  return drConsumer.address;
};

export const requestData = async (
  hre: HardhatRuntimeEnvironment,
  drConsumerAddress: string,
  operatorAddress: string,
  externalJobID: string,
  observationURL: string,
  pathToData: string,
  multiplyTimes: BigNumberish
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const drConsumer = ChainlinkDirectRequestConsumer__factory.connect(
    drConsumerAddress,
    signer
  );

  const tx: ContractTransaction = await drConsumer.requestData(
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
  drConsumerAddress: string
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const drConsumer = ChainlinkDirectRequestConsumer__factory.connect(
    drConsumerAddress,
    signer
  );
  return drConsumer.answer();
};
