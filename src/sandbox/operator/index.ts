import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
} from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { Operator__factory } from "../../../types";

export const deploy = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();

  const operator = await new Operator__factory()
    .connect(signer)
    .deploy(linkTokenAddress, signer.address);
  await operator.deployed();

  return operator.address;
};

export const setAuthorizedSender = async (
  hre: HardhatRuntimeEnvironment,
  operatorAddress: string,
  sender: string
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const operator = Operator__factory.connect(operatorAddress, signer);
  const tx: ContractTransaction = await operator.setAuthorizedSenders([sender]);
  const txReceipt: ContractReceipt = await tx.wait(
    hre.config.chainlink.confirmations
  );
  if (!txReceipt.events) {
    throw new Error("Error setting authorized sender");
  }

  return { transactionHash: tx.hash };
};

export const distributeFunds = async (
  hre: HardhatRuntimeEnvironment,
  operatorAddress: string,
  receivers: string[],
  amounts: BigNumberish[]
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const operator = Operator__factory.connect(operatorAddress, signer);

  const sum = amounts.reduce((sumAgg: BigNumber, amount: BigNumberish) => {
    return sumAgg.add(BigNumber.from(amount));
  }, BigNumber.from(0));

  const tx: ContractTransaction = await operator.distributeFunds(
    receivers,
    amounts,
    {
      value: sum,
    }
  );
  const txReceipt: ContractReceipt = await tx.wait(
    hre.config.chainlink.confirmations
  );
  if (!txReceipt.events) {
    throw new Error("Error distributing funds");
  }

  return { transactionHash: tx.hash };
};
