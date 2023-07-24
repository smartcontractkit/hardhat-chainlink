import { BigNumber, BigNumberish, BytesLike } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { KeeperRegistry1_3__factory } from "../../types";

export const fundUpkeep = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  upkeepId: BigNumberish,
  amountInJuels: BigNumberish
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
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
): Promise<{
  performData: BytesLike;
  maxLinkPayment: BigNumber;
  gasLimit: BigNumber;
  adjustedGasWei: BigNumber;
  linkEth: BigNumber;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const simulatedResponse = await keepersRegistry.callStatic.checkUpkeep(
    upkeepId,
    fromAddress
  );

  return {
    performData: simulatedResponse.performData,
    maxLinkPayment: simulatedResponse.maxLinkPayment,
    gasLimit: simulatedResponse.gasLimit,
    adjustedGasWei: simulatedResponse.adjustedGasWei,
    linkEth: simulatedResponse.linkEth,
  };
};

export const cancelUpkeep = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  upkeepId: BigNumberish
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
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
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
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
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
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
  lastAutomationNode: string;
  admin: string;
  maxValidBlocknumber: BigNumber;
  amountSpent: BigNumber;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const upkeep = await keepersRegistry.getUpkeep(upkeepId);

  return {
    target: upkeep.target,
    executeGas: upkeep.executeGas,
    checkData: upkeep.checkData,
    balance: upkeep.balance,
    lastAutomationNode: upkeep.lastKeeper,
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
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
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
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const tx = await keepersRegistry.receiveUpkeeps(encodedUpkeeps);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const withdrawKeeperPayment = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  fromAddress: string,
  toAddress: string
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const tx = await keepersRegistry.withdrawPayment(fromAddress, toAddress);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const transferKeeperPayeeship = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  keeper: string,
  proposed: string
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const tx = await keepersRegistry.transferPayeeship(keeper, proposed);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const acceptKeeperPayeeship = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  keeper: string
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
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
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

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
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  return keepersRegistry.getMaxPaymentForGas(gasLimit);
};

export const getMinBalanceForUpkeep = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  upkeepId: BigNumberish
): Promise<BigNumber> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  return keepersRegistry.getMinBalanceForUpkeep(upkeepId);
};

export const getKeeperRegistryState = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string
): Promise<{
  nonce: number;
  ownerLinkBalance: BigNumber;
  expectedLinkBalance: BigNumber;
  numUpkeeps: BigNumber;
  paymentPremiumPPB: number;
  flatFeeMicroLink: number;
  blockCountPerTurn: number;
  checkGasLimit: number;
  stalenessSeconds: number;
  gasCeilingMultiplier: number;
  minUpkeepSpend: BigNumber;
  maxPerformGas: number;
  fallbackGasPrice: BigNumber;
  fallbackLinkPrice: BigNumber;
  transcoder: string;
  registrar: string;
  automationNodes: string[];
}> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const store = await keepersRegistry.getState();

  return {
    nonce: store.state.nonce,
    ownerLinkBalance: store.state.ownerLinkBalance,
    expectedLinkBalance: store.state.expectedLinkBalance,
    numUpkeeps: store.state.numUpkeeps,
    paymentPremiumPPB: store.config.paymentPremiumPPB,
    flatFeeMicroLink: store.config.flatFeeMicroLink,
    blockCountPerTurn: store.config.blockCountPerTurn,
    checkGasLimit: store.config.checkGasLimit,
    stalenessSeconds: store.config.stalenessSeconds,
    gasCeilingMultiplier: store.config.gasCeilingMultiplier,
    minUpkeepSpend: store.config.minUpkeepSpend,
    maxPerformGas: store.config.maxPerformGas,
    fallbackGasPrice: store.config.fallbackGasPrice,
    fallbackLinkPrice: store.config.fallbackLinkPrice,
    transcoder: store.config.transcoder,
    registrar: store.config.registrar,
    automationNodes: store.keepers,
  };
};

export const isKeeperRegistryPaused = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string
): Promise<boolean> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  return keepersRegistry.paused();
};

export const getKeeperRegistryTypeAndVersion = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  return keepersRegistry.typeAndVersion();
};

export const getKeeperRegistryUpkeepTranscoderVersion = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string
): Promise<number> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  return keepersRegistry.upkeepTranscoderVersion();
};
