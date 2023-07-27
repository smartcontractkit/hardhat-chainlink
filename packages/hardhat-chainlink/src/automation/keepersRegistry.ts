import { BigNumber, BigNumberish, BytesLike } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
  KeeperRegistry1_2__factory,
  KeeperRegistry1_3__factory,
  KeeperRegistry2_0__factory,
  TypeAndVersionInterface__factory,
} from "../../types";
import { KeeperRegistryVersion } from "../shared/enums";

const connectKeeperRegistry = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string
) => {
  const [signer] = await hre.ethers.getSigners();
  const typeAndVersionInterface =
    await TypeAndVersionInterface__factory.connect(
      keepersRegistryAddress,
      signer
    );
  const typeAndVersion = await typeAndVersionInterface.typeAndVersion();
  switch (typeAndVersion) {
    case KeeperRegistryVersion.registry1_2:
      return KeeperRegistry1_2__factory.connect(keepersRegistryAddress, signer);
    case KeeperRegistryVersion.registry1_3:
      return KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    case KeeperRegistryVersion.registry2_0:
      return KeeperRegistry2_0__factory.connect(keepersRegistryAddress, signer);
    default:
      throw new Error("Error Unsupported Keeper Registry version");
  }
};

export const fundUpkeep = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  upkeepId: BigNumberish,
  amountInJuels: BigNumberish
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  const tx = await keepersRegistry.addFunds(upkeepId, amountInJuels);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const checkUpkeep = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  upkeepId: BigNumberish,
  fromAddress: string
): Promise<any> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  return keepersRegistry.callStatic.checkUpkeep(upkeepId, fromAddress);
};

export const cancelUpkeep = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  upkeepId: BigNumberish
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  const tx = await keepersRegistry.cancelUpkeep(upkeepId);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const withdrawFunds = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  upkeepId: BigNumberish,
  receivingAddress: string
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  const tx = await keepersRegistry.withdrawFunds(upkeepId, receivingAddress);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const getActiveUpkeepIDs = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  startIndex: BigNumberish,
  maxCount: BigNumberish
): Promise<BigNumber[]> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  return keepersRegistry.getActiveUpkeepIDs(startIndex, maxCount);
};

export const getUpkeep = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  upkeepId: BigNumberish
): Promise<{
  target: string;
  executeGas: number;
  checkData: BytesLike;
  balance: BigNumber;
  lastAutomationNode: string | undefined;
  admin: string;
  maxValidBlocknumber: BigNumber;
  amountSpent: BigNumber;
}> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  const upkeep = await keepersRegistry.getUpkeep(upkeepId);

  return {
    target: upkeep.target,
    executeGas: upkeep.executeGas,
    checkData: upkeep.checkData,
    balance: upkeep.balance,
    lastAutomationNode: "lastKeeper" in upkeep ? upkeep.lastKeeper : undefined,
    admin: upkeep.admin,
    maxValidBlocknumber: upkeep.maxValidBlocknumber,
    amountSpent: upkeep.amountSpent,
  };
};

export const migrateUpkeeps = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  upkeepIds: BigNumberish[],
  destination: string
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  const tx = await keepersRegistry.migrateUpkeeps(upkeepIds, destination);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const receiveUpkeeps = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  encodedUpkeeps: BytesLike
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  const tx = await keepersRegistry.receiveUpkeeps(encodedUpkeeps);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const withdrawPayment = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  fromAddress: string,
  toAddress: string
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  const tx = await keepersRegistry.withdrawPayment(fromAddress, toAddress);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const transferPayeeship = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  keeper: string,
  proposed: string
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  const tx = await keepersRegistry.transferPayeeship(keeper, proposed);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const acceptPayeeship = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  keeper: string
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  const tx = await keepersRegistry.acceptPayeeship(keeper);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const getKeeperInfo = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  query: string
): Promise<{ payee: string; active: boolean; balance: BigNumber }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  if (!("getKeeperInfo" in keepersRegistry)) {
    throw new Error("Error Method is unsupported for Keeper Registry version");
  }

  const keeper = await keepersRegistry.getKeeperInfo(query);

  return {
    payee: keeper.payee,
    active: keeper.active,
    balance: keeper.balance,
  };
};

export const getMaxPaymentForGas = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  gasLimit: BigNumberish
): Promise<BigNumber> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  return keepersRegistry.getMaxPaymentForGas(gasLimit);
};

export const getMinBalanceForUpkeep = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  upkeepId: BigNumberish
): Promise<BigNumber> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  return keepersRegistry.getMinBalanceForUpkeep(upkeepId);
};

export const getState = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string
): Promise<{
  nonce: number;
  ownerLinkBalance: BigNumber;
  expectedLinkBalance: BigNumber;
  numUpkeeps: BigNumber;
  paymentPremiumPPB: number;
  flatFeeMicroLink: number;
  blockCountPerTurn: number | undefined;
  checkGasLimit: number;
  stalenessSeconds: number;
  gasCeilingMultiplier: number;
  minUpkeepSpend: BigNumber;
  maxPerformGas: number;
  fallbackGasPrice: BigNumber;
  fallbackLinkPrice: BigNumber;
  transcoder: string;
  registrar: string;
  automationNodes: string[] | undefined;
}> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  const store = await keepersRegistry.getState();

  return {
    nonce: store.state.nonce,
    ownerLinkBalance: store.state.ownerLinkBalance,
    expectedLinkBalance: store.state.expectedLinkBalance,
    numUpkeeps: store.state.numUpkeeps,
    paymentPremiumPPB: store.config.paymentPremiumPPB,
    flatFeeMicroLink: store.config.flatFeeMicroLink,
    blockCountPerTurn:
      "blockCountPerTurn" in store.config
        ? store.config.blockCountPerTurn
        : undefined,
    checkGasLimit: store.config.checkGasLimit,
    stalenessSeconds: store.config.stalenessSeconds,
    gasCeilingMultiplier: store.config.gasCeilingMultiplier,
    minUpkeepSpend: store.config.minUpkeepSpend,
    maxPerformGas: store.config.maxPerformGas,
    fallbackGasPrice: store.config.fallbackGasPrice,
    fallbackLinkPrice: store.config.fallbackLinkPrice,
    transcoder: store.config.transcoder,
    registrar: store.config.registrar,
    automationNodes: "keepers" in store ? store.keepers : undefined,
  };
};

export const isPaused = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string
): Promise<boolean> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  if (!("paused" in keepersRegistry)) {
    throw new Error("Error Method is unsupported for Keeper Registry version");
  }

  return keepersRegistry.paused();
};

export const getTypeAndVersion = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const typeAndVersionInterface =
    await TypeAndVersionInterface__factory.connect(
      keepersRegistryAddress,
      signer
    );
  return typeAndVersionInterface.typeAndVersion();
};

export const getUpkeepTranscoderVersion = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string
): Promise<number> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keepersRegistryAddress
  );

  return keepersRegistry.upkeepTranscoderVersion();
};
