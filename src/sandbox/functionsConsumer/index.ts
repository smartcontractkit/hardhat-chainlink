import { Location } from "@chainlink/functions-toolkit/dist/types";
import { BigNumberish, Contract, ContractTransaction, Signer } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { FunctionsConsumer__factory } from "../../../types";
import { Overrides } from "../../shared/types";

export const deploy = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  donId: string,
  overrides?: Overrides
): Promise<string> => {
  const functionsConsumer = await FunctionsConsumer.deploy({
    hre,
    functionsRouterAddress,
    donId,
    overrides,
  });
  return functionsConsumer.functionsConsumerAddress;
};

export const sendRequest = async (
  hre: HardhatRuntimeEnvironment,
  functionsConsumerAddress: string,
  subscriptionId: BigNumberish,
  source: string,
  encryptedSecretsReference: string,
  secretsLocation: Location,
  args?: string[],
  bytesArgs?: string[],
  callbackGasLimit?: BigNumberish,
  overrides?: Overrides
): Promise<{ transactionHash: string }> => {
  const functionsConsumer = await FunctionsConsumer.initialize({
    hre,
    functionsConsumerAddress,
    overrides,
  });
  return functionsConsumer.sendRequest(
    subscriptionId,
    source,
    encryptedSecretsReference,
    secretsLocation,
    args,
    bytesArgs,
    callbackGasLimit
  );
};

export const sendEncodedRequest = async (
  hre: HardhatRuntimeEnvironment,
  functionsConsumerAddress: string,
  subscriptionId: BigNumberish,
  encodedRequest: string,
  callbackGasLimit: BigNumberish,
  overrides?: Overrides
): Promise<{ transactionHash: string }> => {
  const functionsConsumer = await FunctionsConsumer.initialize({
    hre,
    functionsConsumerAddress,
    overrides,
  });
  return functionsConsumer.sendEncodedRequest(
    encodedRequest,
    subscriptionId,
    callbackGasLimit
  );
};

export const setDonId = async (
  hre: HardhatRuntimeEnvironment,
  functionsConsumerAddress: string,
  donId: string,
  overrides?: Overrides
): Promise<{ transactionHash: string }> => {
  const functionsConsumer = await FunctionsConsumer.initialize({
    hre,
    functionsConsumerAddress,
    overrides,
  });
  return functionsConsumer.setDonId(donId);
};

export const getDonId = async (
  hre: HardhatRuntimeEnvironment,
  functionsConsumerAddress: string
): Promise<string> => {
  const functionsConsumer = await FunctionsConsumer.initialize({
    hre,
    functionsConsumerAddress,
  });
  return functionsConsumer.getDonId();
};

export const getLastRequestId = async (
  hre: HardhatRuntimeEnvironment,
  functionsConsumerAddress: string
): Promise<string> => {
  const functionsConsumer = await FunctionsConsumer.initialize({
    hre,
    functionsConsumerAddress,
  });
  return functionsConsumer.getLastRequestId();
};

export const getLastResponse = async (
  hre: HardhatRuntimeEnvironment,
  functionsConsumerAddress: string
): Promise<string> => {
  const functionsConsumer = await FunctionsConsumer.initialize({
    hre,
    functionsConsumerAddress,
  });
  return functionsConsumer.getLastResponse();
};

export const getLastError = async (
  hre: HardhatRuntimeEnvironment,
  functionsConsumerAddress: string
): Promise<string> => {
  const functionsConsumer = await FunctionsConsumer.initialize({
    hre,
    functionsConsumerAddress,
  });
  return functionsConsumer.getLastError();
};

export class FunctionsConsumer {
  private hre: HardhatRuntimeEnvironment;
  private functionsConsumerContract: Contract;
  public functionsConsumerAddress: string;

  private constructor(
    hre: HardhatRuntimeEnvironment,
    signer: Signer,
    functionsConsumerAddress: string
  ) {
    this.hre = hre;
    this.functionsConsumerContract = FunctionsConsumer__factory.connect(
      functionsConsumerAddress,
      signer
    );
    this.functionsConsumerAddress = this.functionsConsumerContract.address;
  }

  static async initialize(args: {
    hre: HardhatRuntimeEnvironment;
    functionsConsumerAddress: string;
    overrides?: Overrides;
  }): Promise<FunctionsConsumer> {
    const { hre, functionsConsumerAddress, overrides } = args;
    const accounts = await hre.ethers.getSigners();
    const signer = overrides?.signer || accounts[0];
    return new FunctionsConsumer(hre, signer, functionsConsumerAddress);
  }

  static async deploy(args: {
    hre: HardhatRuntimeEnvironment;
    functionsRouterAddress: string;
    donId: string;
    overrides?: Overrides;
  }): Promise<FunctionsConsumer> {
    const { hre, functionsRouterAddress, donId, overrides } = args;
    const accounts = await hre.ethers.getSigners();
    const signer = overrides?.signer || accounts[0];
    const functionsConsumer = await new FunctionsConsumer__factory()
      .connect(signer)
      .deploy(
        functionsRouterAddress,
        hre.ethers.utils.formatBytes32String(donId)
      );
    await functionsConsumer.deployed();
    return new FunctionsConsumer(hre, signer, functionsConsumer.address);
  }

  async sendRequest(
    subscriptionId: BigNumberish,
    source: string,
    encryptedSecretsReference: string,
    secretsLocation: Location,
    args: string[] = [],
    bytesArgs: string[] = [],
    callbackGasLimit: BigNumberish = 100_000
  ): Promise<{ transactionHash: string }> {
    const tx: ContractTransaction =
      await this.functionsConsumerContract.sendRequest(
        source,
        secretsLocation,
        encryptedSecretsReference,
        args,
        bytesArgs,
        subscriptionId,
        callbackGasLimit,
        {
          gasLimit: 500_000,
        }
      );
    await tx.wait(this.hre.config.chainlink.confirmations);

    return { transactionHash: tx.hash };
  }

  async sendEncodedRequest(
    encodedRequest: string,
    subscriptionId: BigNumberish,
    callbackGasLimit: BigNumberish
  ): Promise<{ transactionHash: string }> {
    const tx: ContractTransaction =
      await this.functionsConsumerContract.sendEncodedRequest(
        encodedRequest,
        subscriptionId,
        callbackGasLimit
      );
    await tx.wait(this.hre.config.chainlink.confirmations);

    return { transactionHash: tx.hash };
  }

  async setDonId(donId: string): Promise<{ transactionHash: string }> {
    const tx: ContractTransaction =
      await this.functionsConsumerContract.setDonId(
        this.hre.ethers.utils.formatBytes32String(donId)
      );
    await tx.wait(this.hre.config.chainlink.confirmations);

    return { transactionHash: tx.hash };
  }

  async getDonId(): Promise<string> {
    const donId = this.functionsConsumerContract.donId();
    return this.hre.ethers.utils.parseBytes32String(donId);
  }

  async getLastRequestId(): Promise<string> {
    return this.functionsConsumerContract.s_lastRequestId();
  }

  async getLastResponse(): Promise<string> {
    return this.functionsConsumerContract.s_lastResponse();
  }

  async getLastError(): Promise<string> {
    return this.functionsConsumerContract.s_lastError();
  }
}
