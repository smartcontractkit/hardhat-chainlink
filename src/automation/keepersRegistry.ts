import { BigNumber, BytesLike, Contract } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { KeeperRegistry1_3__factory } from "../../types";

export const fundUpkeep = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  id: BigNumber,
  amountInJuels: BigNumber,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const tx = await keepersRegistry.addFunds(id, amountInJuels);
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const checkUpkeep = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  id: BigNumber,
  address: string
): Promise<{
  performData: BytesLike;
  maxLinkPayment: BigNumber;
  gasLimit: BigNumber;
  adjustedGasWei: BigNumber;
  linkEth: BigNumber;
}> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const simulatedResponse = await keepersRegistry.callStatic.checkUpkeep(
    id,
    address
  );

  return {
    performData: simulatedResponse.performData,
    maxLinkPayment: simulatedResponse.maxLinkPayment,
    gasLimit: simulatedResponse.gasLimit,
    adjustedGasWei: simulatedResponse.adjustedGasWei,
    linkEth: simulatedResponse.linkEth,
  };
};

export const migrateUpkeeps = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  ids: BigNumber[],
  destination: string,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const tx = await keepersRegistry.migrateUpkeeps(ids, destination);
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const receiveMigratedUpkeeps = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  encodedUpkeeps: BytesLike,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const tx = await keepersRegistry.receiveUpkeeps(encodedUpkeeps);
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const cancelUpkeep = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  id: BigNumber,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const tx = await keepersRegistry.cancelUpkeep(id);
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const withdrawFundsFromCanceledUpkeep = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  id: BigNumber,
  to: string,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const tx = await keepersRegistry.withdrawFunds(id, to);
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const transferKeeperPayeeship = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  keeper: string,
  proposed: string,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const tx = await keepersRegistry.transferPayeeship(keeper, proposed);
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const acceptKeeperPayeeship = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  keeper: string,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const tx = await keepersRegistry.acceptPayeeship(keeper);
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const withdrawKeeperPayment = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  from: string,
  to: string,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const tx = await keepersRegistry.withdrawPayment(from, to);
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const getActiveUpkeepIDs = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  startIndex: BigNumber,
  maxCount: BigNumber
): Promise<BigNumber[]> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  return keepersRegistry.getActiveUpkeepIDs(startIndex, maxCount);
};

export const getUpkeep = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  id: BigNumber
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
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  const upkeep = await keepersRegistry.getUpkeep(id);

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

export const getKeeperInfo = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  query: string
): Promise<{ payee: string; active: boolean; balance: BigNumber }> => {
  const [signer] = await env.ethers.getSigners();
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

export const keepersGetMaxPaymentForGas = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  gasLimit: BigNumber
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  return keepersRegistry.getMaxPaymentForGas(gasLimit);
};

export const getMinBalanceForUpkeep = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string,
  id: BigNumber
): Promise<BigNumber> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  return keepersRegistry.getMinBalanceForUpkeep(id);
};

export const getKeepersRegistryState = async (
  env: HardhatRuntimeEnvironment,
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
  const [signer] = await env.ethers.getSigners();
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

export const isKeepersRegistryPaused = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string
): Promise<boolean> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  return keepersRegistry.paused();
};

export const getKeepersRegistryTypeAndVersion = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string
): Promise<string> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  return keepersRegistry.typeAndVersion();
};

export const getKeepersRegistryUpkeepTranscoderVersion = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistryAddress: string
): Promise<number> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistry = KeeperRegistry1_3__factory.connect(
    keepersRegistryAddress,
    signer
  );

  return keepersRegistry.upkeepTranscoderVersion();
};
