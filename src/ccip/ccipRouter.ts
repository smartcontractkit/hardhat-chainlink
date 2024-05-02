import { BigNumber, BigNumberish, Signer } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { Router__factory, type Router } from "../../types";
import { Client } from "../../types/chainlink-artifacts/Router";
import { Overrides } from "../shared/types";

export const getFee = async (
  hre: HardhatRuntimeEnvironment,
  ccipRouterAddress: string,
  destinationChainSelector: BigNumberish,
  message: Client.EVM2AnyMessageStruct,
  overrides?: Overrides
): Promise<BigNumber> => {
  const ccipRouter = await CCIPRouter.initialize({
    hre,
    ccipRouterAddress,
    overrides,
  });

  return ccipRouter.getFee(destinationChainSelector, message);
};

export const getSupportedTokens = async (
  hre: HardhatRuntimeEnvironment,
  ccipRouterAddress: string,
  chainSelector: BigNumberish,
  overrides?: Overrides
): Promise<string[]> => {
  const ccipRouter = await CCIPRouter.initialize({
    hre,
    ccipRouterAddress,
    overrides,
  });

  return ccipRouter.getSupportedTokens(chainSelector);
};

export const isChainSupported = async (
  hre: HardhatRuntimeEnvironment,
  ccipRouterAddress: string,
  chainSelector: BigNumberish,
  overrides?: Overrides
): Promise<boolean> => {
  const ccipRouter = await CCIPRouter.initialize({
    hre,
    ccipRouterAddress,
    overrides,
  });

  return ccipRouter.isChainSupported(chainSelector);
};

export const getOnRamp = async (
  hre: HardhatRuntimeEnvironment,
  ccipRouterAddress: string,
  chainSelector: BigNumberish,
  overrides?: Overrides
): Promise<string> => {
  const ccipRouter = await CCIPRouter.initialize({
    hre,
    ccipRouterAddress,
    overrides,
  });

  return ccipRouter.getOnRamp(chainSelector);
};

export const isOffRamp = async (
  hre: HardhatRuntimeEnvironment,
  ccipRouterAddress: string,
  sourceChainSelector: BigNumberish,
  offRampAddress: string,
  overrides?: Overrides
): Promise<boolean> => {
  const ccipRouter = await CCIPRouter.initialize({
    hre,
    ccipRouterAddress,
    overrides,
  });

  return ccipRouter.isOffRamp(sourceChainSelector, offRampAddress);
};

export const getWrappedNative = async (
  hre: HardhatRuntimeEnvironment,
  ccipRouterAddress: string,
  overrides?: Overrides
): Promise<string> => {
  const ccipRouter = await CCIPRouter.initialize({
    hre,
    ccipRouterAddress,
    overrides,
  });

  return ccipRouter.getWrappedNative();
};

export const getTypeAndVersion = async (
  hre: HardhatRuntimeEnvironment,
  ccipRouterAddress: string,
  overrides?: Overrides
): Promise<string> => {
  const ccipRouter = await CCIPRouter.initialize({
    hre,
    ccipRouterAddress,
    overrides,
  });

  return ccipRouter.getTypeAndVersion();
};

export class CCIPRouter {
  private hre: HardhatRuntimeEnvironment;
  private ccipRouter: Router;

  private constructor(
    hre: HardhatRuntimeEnvironment,
    signer: Signer,
    ccipRouterAddress: string
  ) {
    this.hre = hre;
    this.ccipRouter = Router__factory.connect(ccipRouterAddress, signer);
  }

  // static async class factory
  static async initialize(args: {
    hre: HardhatRuntimeEnvironment;
    ccipRouterAddress: string;
    overrides?: Overrides;
  }): Promise<CCIPRouter> {
    const { hre, ccipRouterAddress, overrides } = args;
    const accounts = await hre.ethers.getSigners();
    return new CCIPRouter(
      hre,
      overrides?.signer || accounts[0],
      ccipRouterAddress
    );
  }

  async getFee(
    destinationChainSelector: BigNumberish,
    message: Client.EVM2AnyMessageStruct
  ): Promise<BigNumber> {
    return this.ccipRouter.getFee(destinationChainSelector, message);
  }

  async getSupportedTokens(chainSelector: BigNumberish): Promise<string[]> {
    return this.ccipRouter.getSupportedTokens(chainSelector);
  }

  async isChainSupported(chainSelector: BigNumberish): Promise<boolean> {
    return this.ccipRouter.isChainSupported(chainSelector);
  }

  async getOnRamp(chainSelector: BigNumberish): Promise<string> {
    return this.ccipRouter.getOnRamp(chainSelector);
  }

  async isOffRamp(
    sourceChainSelector: BigNumberish,
    offRampAddress: string
  ): Promise<boolean> {
    return this.ccipRouter.isOffRamp(sourceChainSelector, offRampAddress);
  }

  async getWrappedNative(): Promise<string> {
    return this.ccipRouter.getWrappedNative();
  }

  async getTypeAndVersion(): Promise<string> {
    return this.ccipRouter.typeAndVersion();
  }
}
