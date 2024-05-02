import * as networkHelpers from "@nomicfoundation/hardhat-network-helpers";
import { BigNumber, constants, providers, utils } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
  CCIPReceiver__factory,
  SimpleCCIPReceiver__factory,
} from "../../../types";
import {
  CCIPMessage,
  GasEstimationOptions,
  Overrides,
} from "../../shared/types";

export const deploy = async (
  hre: HardhatRuntimeEnvironment,
  ccipRouterAddress: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();

  const ccipReceiver = await new SimpleCCIPReceiver__factory()
    .connect(signer)
    .deploy(ccipRouterAddress);
  await ccipReceiver.deployed();

  return ccipReceiver.address;
};

export const getRouterAddress = async (
  hre: HardhatRuntimeEnvironment,
  ccipReceiverAddress: string,
  overrides?: Overrides
): Promise<string> => {
  const provider = overrides?.provider
    ? overrides.provider
    : hre.ethers.provider;
  const ccipReceiver = CCIPReceiver__factory.connect(
    ccipReceiverAddress,
    provider
  );
  return ccipReceiver.getRouter();
};

export const estimateGas = async (
  hre: HardhatRuntimeEnvironment,
  ccipReceiverAddress: string,
  ccipMessage: CCIPMessage,
  gasEstimationOptions: GasEstimationOptions = {}
): Promise<BigNumber> => {
  validateCCIPMessage(ccipMessage);

  const provider = await getProvider(hre, gasEstimationOptions);
  const ccipRouterAddress = await getRouterAddress(hre, ccipReceiverAddress, {
    provider,
  });
  const encodedMessageData = await encodeCCIPMessageData(ccipMessage);

  return provider.estimateGas({
    from: ccipRouterAddress,
    to: ccipReceiverAddress,
    data: encodedMessageData,
  });
};

const getProvider = async (
  hre: HardhatRuntimeEnvironment,
  estimationOptions: GasEstimationOptions
): Promise<providers.JsonRpcProvider> => {
  if (!estimationOptions.destinationChainRpcUrl) {
    return hre.ethers.provider;
  }

  if (estimationOptions.isForking) {
    await networkHelpers.reset(
      estimationOptions.destinationChainRpcUrl,
      estimationOptions.destinationChainBlockId
    );
    return hre.ethers.provider;
  }

  return new hre.ethers.providers.JsonRpcProvider(
    estimationOptions.destinationChainRpcUrl
  );
};

const encodeCCIPMessageData = async (
  any2EVMMessage: CCIPMessage
): Promise<string> => {
  const ccipReceiverInterface = CCIPReceiver__factory.createInterface();
  return ccipReceiverInterface.encodeFunctionData("ccipReceive", [
    any2EVMMessage,
  ]);
};

const validateCCIPMessage = (ccipMessage: CCIPMessage) => {
  if (ccipMessage.messageId) {
    if (!utils.isBytesLike(ccipMessage.messageId)) {
      throw new Error("Invalid messageId: must be a bytes-like value");
    }
    // Pad messageId to 32 bytes if it is less than 32 bytes
    ccipMessage.messageId = utils.hexZeroPad(ccipMessage.messageId, 32);
  } else {
    ccipMessage.messageId = constants.HashZero;
  }

  if (!ccipMessage.sender) {
    throw new Error("Invalid sender: sender is required");
  }

  if (utils.isAddress(ccipMessage.sender)) {
    ccipMessage.sender = utils.defaultAbiCoder.encode(
      ["address"],
      [ccipMessage.sender]
    );
  }

  if (!ccipMessage.data) {
    ccipMessage.data = utils.hexValue(0);
  }

  if (ccipMessage.destTokenAmounts) {
    ccipMessage.destTokenAmounts.forEach((destTokenAmount) => {
      if (!utils.isAddress(destTokenAmount.token)) {
        throw new Error("Invalid destTokenAmounts: token must be an address");
      }
    });
  } else {
    ccipMessage.destTokenAmounts = [];
  }
};
