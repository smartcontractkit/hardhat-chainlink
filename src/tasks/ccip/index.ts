import { BigNumberish } from "ethers";
import { ActionType } from "hardhat/types";

import * as ccip from "../../ccip";

export const getSupportedTokens: ActionType<{
  ccipRouterAddress: string;
  chainSelector: BigNumberish;
}> = async (taskArgs, hre) => {
  return ccip.getSupportedTokens(
    hre,
    taskArgs.ccipRouterAddress,
    taskArgs.chainSelector
  );
};

export const isChainSupported: ActionType<{
  ccipRouterAddress: string;
  chainSelector: BigNumberish;
}> = async (taskArgs, hre) => {
  return ccip.isChainSupported(
    hre,
    taskArgs.ccipRouterAddress,
    taskArgs.chainSelector
  );
};

export const getOnRamp: ActionType<{
  ccipRouterAddress: string;
  chainSelector: BigNumberish;
}> = async (taskArgs, hre) => {
  return ccip.getOnRamp(
    hre,
    taskArgs.ccipRouterAddress,
    taskArgs.chainSelector
  );
};

export const isOffRamp: ActionType<{
  ccipRouterAddress: string;
  sourceChainSelector: BigNumberish;
  offRampAddress: string;
}> = async (taskArgs, hre) => {
  return ccip.isOffRamp(
    hre,
    taskArgs.ccipRouterAddress,
    taskArgs.sourceChainSelector,
    taskArgs.offRampAddress
  );
};

export const getWrappedNative: ActionType<{
  ccipRouterAddress: string;
}> = async (taskArgs, hre) => {
  return ccip.getWrappedNative(hre, taskArgs.ccipRouterAddress);
};

export const getTypeAndVersion: ActionType<{
  ccipRouterAddress: string;
}> = async (taskArgs, hre) => {
  return ccip.getTypeAndVersion(hre, taskArgs.ccipRouterAddress);
};
