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
  keeperRegistryAddress: string
) => {
  const [signer] = await hre.ethers.getSigners();
  const typeAndVersionInterface = TypeAndVersionInterface__factory.connect(
    keeperRegistryAddress,
    signer
  );
  const typeAndVersion = await typeAndVersionInterface.typeAndVersion();
  switch (typeAndVersion) {
    case KeeperRegistryVersion.registry1_2:
      return KeeperRegistry1_2__factory.connect(keeperRegistryAddress, signer);
    case KeeperRegistryVersion.registry1_3:
      return KeeperRegistry1_3__factory.connect(keeperRegistryAddress, signer);
    case KeeperRegistryVersion.registry2_0:
      return KeeperRegistry2_0__factory.connect(keeperRegistryAddress, signer);
    default:
      throw new Error("Error Unsupported Keeper Registry version");
  }
};

export const getState = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string
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
  keepers: string[] | undefined;
}> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keeperRegistryAddress
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
    keepers: "keepers" in store ? store.keepers : undefined,
  };
};

export const getActiveUpkeepIDs = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string,
  startIndex: BigNumberish,
  maxCount: BigNumberish
): Promise<BigNumber[]> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keeperRegistryAddress
  );

  return keepersRegistry.getActiveUpkeepIDs(startIndex, maxCount);
};

export const getMaxPaymentForGas = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string,
  gasLimit: BigNumberish
): Promise<BigNumber> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keeperRegistryAddress
  );

  return keepersRegistry.getMaxPaymentForGas(gasLimit);
};

export const isPaused = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string
): Promise<boolean> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keeperRegistryAddress
  );

  if (!("paused" in keepersRegistry)) {
    throw new Error("Error Method is unsupported for Keeper Registry version");
  }

  return keepersRegistry.paused();
};

export const getUpkeep = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string,
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
    keeperRegistryAddress
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

export const getMinBalanceForUpkeep = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string,
  upkeepId: BigNumberish
): Promise<BigNumber> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keeperRegistryAddress
  );

  return keepersRegistry.getMinBalanceForUpkeep(upkeepId);
};

export const fundUpkeep = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string,
  upkeepId: BigNumberish,
  amountInJuels: BigNumberish
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keeperRegistryAddress
  );

  const tx = await keepersRegistry.addFunds(upkeepId, amountInJuels);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const cancelUpkeep = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string,
  upkeepId: BigNumberish
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keeperRegistryAddress
  );

  const tx = await keepersRegistry.cancelUpkeep(upkeepId);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const withdrawFunds = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string,
  upkeepId: BigNumberish,
  receivingAddress: string
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keeperRegistryAddress
  );

  const tx = await keepersRegistry.withdrawFunds(upkeepId, receivingAddress);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const migrateUpkeeps = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string,
  upkeepIds: BigNumberish[],
  destination: string
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keeperRegistryAddress
  );

  const tx = await keepersRegistry.migrateUpkeeps(upkeepIds, destination);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const getKeeperInfo = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string,
  keeperAddress: string
): Promise<{ payee: string; active: boolean; balance: BigNumber }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keeperRegistryAddress
  );

  if (!("getKeeperInfo" in keepersRegistry)) {
    throw new Error("Error Method is unsupported for Keeper Registry version");
  }

  const keeper = await keepersRegistry.getKeeperInfo(keeperAddress);

  return {
    payee: keeper.payee,
    active: keeper.active,
    balance: keeper.balance,
  };
};

export const getUpkeepTranscoderVersion = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string
): Promise<number> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keeperRegistryAddress
  );

  return keepersRegistry.upkeepTranscoderVersion();
};

export const getTypeAndVersion = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const typeAndVersionInterface = TypeAndVersionInterface__factory.connect(
    keeperRegistryAddress,
    signer
  );
  return typeAndVersionInterface.typeAndVersion();
};

// NOTE: Methods below are for keepers and payees and will not be exposed
export const withdrawPayment = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string,
  fromAddress: string,
  toAddress: string
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keeperRegistryAddress
  );

  const tx = await keepersRegistry.withdrawPayment(fromAddress, toAddress);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const transferPayeeship = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string,
  keeper: string,
  proposed: string
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keeperRegistryAddress
  );

  const tx = await keepersRegistry.transferPayeeship(keeper, proposed);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const acceptPayeeship = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistryAddress: string,
  keeper: string
): Promise<{ transactionHash: string }> => {
  const keepersRegistry = await connectKeeperRegistry(
    hre,
    keeperRegistryAddress
  );

  const tx = await keepersRegistry.acceptPayeeship(keeper);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};
