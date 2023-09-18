import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
} from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { LinkToken__factory } from "../../../types";

export const deploy = async (
  hre: HardhatRuntimeEnvironment
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();

  const linkToken = await new LinkToken__factory().connect(signer).deploy();
  await linkToken.deployed();

  return linkToken.address;
};

export const transfer = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  recipient: string,
  amount: BigNumberish
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const linkToken = LinkToken__factory.connect(linkTokenAddress, signer);

  const tx: ContractTransaction = await linkToken.transfer(recipient, amount);
  const txReceipt: ContractReceipt = await tx.wait(
    hre.config.chainlink.confirmations
  );
  if (!txReceipt.events) {
    throw new Error("Error transferring Link Tokens");
  }

  return { transactionHash: tx.hash };
};

export const getAllowance = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  owner: string,
  spender: string
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const linkToken = LinkToken__factory.connect(linkTokenAddress, signer);

  return linkToken.allowance(owner, spender);
};

export const increaseApproval = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  spender: string,
  addedValue: BigNumberish
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const linkToken = LinkToken__factory.connect(linkTokenAddress, signer);

  const tx: ContractTransaction = await linkToken.increaseApproval(
    spender,
    addedValue
  );
  const txReceipt: ContractReceipt = await tx.wait(
    hre.config.chainlink.confirmations
  );
  if (!txReceipt.events) {
    throw new Error("Error increasing Link Tokens approval");
  }

  return { transactionHash: tx.hash };
};

export const decreaseApproval = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  spender: string,
  subtractedValue: BigNumberish
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const linkToken = LinkToken__factory.connect(linkTokenAddress, signer);

  const tx: ContractTransaction = await linkToken.decreaseApproval(
    spender,
    subtractedValue
  );
  const txReceipt: ContractReceipt = await tx.wait(
    hre.config.chainlink.confirmations
  );
  if (!txReceipt.events) {
    throw new Error("Error decreasing Link Tokens approval");
  }

  return { transactionHash: tx.hash };
};
