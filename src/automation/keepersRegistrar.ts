import KEEPERS_REGISTRAR_ABI from "@chainlink/contracts/abi/v0.8/KeeperRegistrar.json";
import KEEPERS_REGISTRAR2_0_ABI from "@chainlink/contracts/abi/v0.8/KeeperRegistrar2_0.json";
import {
  BigNumber,
  BigNumberish,
  BytesLike,
  ContractReceipt,
  ContractTransaction,
} from "ethers";
import { defaultAbiCoder, hexConcat, Interface } from "ethers/lib/utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
  KeeperRegistrar2_0__factory,
  KeeperRegistrar__factory,
  LinkTokenInterface__factory,
  TypeAndVersionInterface__factory,
} from "../../types";
import { KeeperRegistrarVersion } from "../shared/enums";

const connectKeeperRegistrar = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistrarAddress: string
) => {
  const [signer] = await hre.ethers.getSigners();
  const typeAndVersionInterface = TypeAndVersionInterface__factory.connect(
    keeperRegistrarAddress,
    signer
  );
  const typeAndVersion = await typeAndVersionInterface.typeAndVersion();
  switch (typeAndVersion) {
    case KeeperRegistrarVersion.registrar1_1:
      return KeeperRegistrar__factory.connect(keeperRegistrarAddress, signer);
    case KeeperRegistrarVersion.registrar2_0:
      return KeeperRegistrar2_0__factory.connect(
        keeperRegistrarAddress,
        signer
      );
    default:
      throw new Error("Error Unsupported Keeper Registrar version");
  }
};

async function _registerUpkeep(
  hre: HardhatRuntimeEnvironment,
  keeperRegistrarAddress: string,
  linkTokenAddress: string,
  amountInJuels: BigNumberish,
  upkeepName: string,
  encryptedEmail: BytesLike,
  upkeepContract: string,
  gasLimit: BigNumberish,
  adminAddress: string,
  checkData: BytesLike,
  source: BigNumberish,
  sender: string
) {
  const [signer] = await hre.ethers.getSigners();
  const linkToken = LinkTokenInterface__factory.connect(
    linkTokenAddress,
    signer
  );

  const solidityRegisterFunctionSignature: string = `register`;
  const KeeperRegistrarInterface: Interface = new Interface(
    KEEPERS_REGISTRAR_ABI
  );

  const functionSelector: BytesLike = KeeperRegistrarInterface.getSighash(
    solidityRegisterFunctionSignature
  );

  const tx: ContractTransaction = await linkToken.transferAndCall(
    keeperRegistrarAddress,
    amountInJuels,
    hexConcat([
      functionSelector,
      defaultAbiCoder.encode(
        [
          "string",
          "bytes",
          "address",
          "uint32",
          "address",
          "bytes",
          "uint96",
          "uint8",
          "address",
        ],
        [
          upkeepName,
          encryptedEmail,
          upkeepContract,
          gasLimit,
          adminAddress,
          checkData,
          amountInJuels,
          source,
          sender,
        ]
      ),
    ])
  );
  const txReceipt: ContractReceipt = await tx.wait(
    hre.config.chainlink.confirmations
  );
  if (!txReceipt.events) {
    throw new Error("Error Registering Upkeep");
  }

  const requestHash = txReceipt.events[2].topics[1];
  // Check if upkeep was automatically registered
  const upkeepId = (() => {
    if (txReceipt.events[3] && txReceipt.events[3].topics[1]) {
      return BigNumber.from(txReceipt.events[3].topics[1]);
    }
    return BigNumber.from(0);
  })();
  return { transactionHash: tx.hash, requestHash, upkeepId };
}

async function _registerUpkeep2_0(
  hre: HardhatRuntimeEnvironment,
  keeperRegistrarAddress: string,
  linkTokenAddress: string,
  amountInJuels: BigNumberish,
  upkeepName: string,
  encryptedEmail: BytesLike,
  upkeepContract: string,
  gasLimit: BigNumberish,
  adminAddress: string,
  checkData: BytesLike,
  ocrConfig: BytesLike,
  sender: string
) {
  const [signer] = await hre.ethers.getSigners();
  const linkToken = LinkTokenInterface__factory.connect(
    linkTokenAddress,
    signer
  );

  const solidityRegisterFunctionSignature: string = `register`;
  const KeeperRegistrarInterface: Interface = new Interface(
    KEEPERS_REGISTRAR2_0_ABI
  );

  const functionSelector: BytesLike = KeeperRegistrarInterface.getSighash(
    solidityRegisterFunctionSignature
  );

  const tx: ContractTransaction = await linkToken.transferAndCall(
    keeperRegistrarAddress,
    amountInJuels,
    hexConcat([
      functionSelector,
      defaultAbiCoder.encode(
        [
          "string",
          "bytes",
          "address",
          "uint32",
          "address",
          "bytes",
          "bytes",
          "uint96",
          "address",
        ],
        [
          upkeepName,
          encryptedEmail,
          upkeepContract,
          gasLimit,
          adminAddress,
          checkData,
          ocrConfig,
          amountInJuels,
          sender,
        ]
      ),
    ])
  );
  const txReceipt: ContractReceipt = await tx.wait(
    hre.config.chainlink.confirmations
  );
  if (!txReceipt.events) {
    throw new Error("Error Registering Upkeep");
  }

  const requestHash = txReceipt.events[2].topics[1];
  // Check if upkeep was automatically registered
  const upkeepId = (() => {
    if (txReceipt.events[3] && txReceipt.events[3].topics[1]) {
      return BigNumber.from(txReceipt.events[3].topics[1]);
    }
    return BigNumber.from(0);
  })();
  return { transactionHash: tx.hash, requestHash, upkeepId };
}

export const registerUpkeep = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistrarAddress: string,
  linkTokenAddress: string,
  amountInJuels: BigNumberish,
  upkeepName: string,
  encryptedEmail: BytesLike = "0x",
  upkeepContract: string,
  gasLimit: BigNumberish = 500_000,
  adminAddress: string,
  checkData: BytesLike = "0x",
  ocrConfig: BytesLike = "0x",
  source: BigNumberish = 0,
  sender: string
): Promise<{
  transactionHash: string;
  requestHash: string;
  upkeepId: BigNumber;
}> => {
  const [signer] = await hre.ethers.getSigners();

  const typeAndVersionInterface = TypeAndVersionInterface__factory.connect(
    keeperRegistrarAddress,
    signer
  );
  const typeAndVersion = await typeAndVersionInterface.typeAndVersion();
  switch (typeAndVersion) {
    case KeeperRegistrarVersion.registrar1_1:
      return _registerUpkeep(
        hre,
        keeperRegistrarAddress,
        linkTokenAddress,
        amountInJuels,
        upkeepName,
        encryptedEmail,
        upkeepContract,
        gasLimit,
        adminAddress,
        checkData,
        source,
        sender
      );
    case KeeperRegistrarVersion.registrar2_0:
      return _registerUpkeep2_0(
        hre,
        keeperRegistrarAddress,
        linkTokenAddress,
        amountInJuels,
        upkeepName,
        encryptedEmail,
        upkeepContract,
        gasLimit,
        adminAddress,
        checkData,
        ocrConfig,
        sender
      );
    default:
      throw new Error("Error Unsupported Keeper Registrar version");
  }
};

export const getPendingRequest = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistrarAddress: string,
  requestHash: BytesLike
): Promise<{
  adminAddress: string;
  balance: BigNumber;
}> => {
  const keepersRegistrar = await connectKeeperRegistrar(
    hre,
    keeperRegistrarAddress
  );

  const pendingRequest = await keepersRegistrar.getPendingRequest(requestHash);

  return { adminAddress: pendingRequest[0], balance: pendingRequest[1] };
};

export const cancelRequest = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistrarAddress: string,
  requestHash: BytesLike
): Promise<{ transactionHash: string }> => {
  const keepersRegistrar = await connectKeeperRegistrar(
    hre,
    keeperRegistrarAddress
  );

  const tx: ContractTransaction = await keepersRegistrar.cancel(requestHash);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const getRegistrationConfig = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistrarAddress: string
): Promise<{
  autoApproveConfigType: number;
  autoApproveMaxAllowed: number;
  approvedCount: number;
  keeperRegistry: string;
  minLINKJuels: BigNumber;
}> => {
  const keepersRegistrar = await connectKeeperRegistrar(
    hre,
    keeperRegistrarAddress
  );

  const config = await keepersRegistrar.getRegistrationConfig();

  return {
    autoApproveConfigType: config.autoApproveConfigType,
    autoApproveMaxAllowed: config.autoApproveMaxAllowed,
    approvedCount: config.approvedCount,
    keeperRegistry: config.keeperRegistry,
    minLINKJuels: config.minLINKJuels,
  };
};

export const getTypeAndVersion = async (
  hre: HardhatRuntimeEnvironment,
  keeperRegistrarAddress: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const typeAndVersionInterface = TypeAndVersionInterface__factory.connect(
    keeperRegistrarAddress,
    signer
  );
  return typeAndVersionInterface.typeAndVersion();
};
