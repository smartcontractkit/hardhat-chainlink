import "@nomiclabs/hardhat-ethers/";
import { BigNumber, Contract } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import AGGREGATOR_V3_INTERFACE_ABI from "../abis/aggregatorV3Interface.abi.json";

export const getLatestPrice = async (
  env: HardhatRuntimeEnvironment,
  priceFeedAddress: string
): Promise<BigNumber> => {
  const accounts: SignerWithAddress[] = await env.ethers.getSigners();
  const signer: SignerWithAddress = accounts[0];

  const priceFeed = new Contract(
    priceFeedAddress,
    AGGREGATOR_V3_INTERFACE_ABI,
    signer
  );

  const latestRoundData = await priceFeed.latestRoundData();
  const price: BigNumber = latestRoundData.answer;

  return price;
};

export class HardhatChainlink {
  env: HardhatRuntimeEnvironment;

  constructor(env: HardhatRuntimeEnvironment) {
    this.env = env;
  }

  public async getLatestPrice(priceFeedAddress: string): Promise<BigNumber> {
    return getLatestPrice(this.env, priceFeedAddress);
  }
}
