import KEEPERS_REGISTRAR_ABI from "@chainlink/contracts/abi/v0.8/KeeperRegistrar.json";
import KEEPERS_REGISTRAR2_0_ABI from "@chainlink/contracts/abi/v0.8/KeeperRegistrar2_0.json";
import {
  BigNumber,
  BigNumberish,
  BytesLike,
  ContractTransaction,
} from "ethers";
import { defaultAbiCoder, Interface } from "ethers/lib/utils";
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
  keepersRegistrarAddress: string
) => {
  const [signer] = await hre.ethers.getSigners();
  const typeAndVersionInterface =
    await TypeAndVersionInterface__factory.connect(
      keepersRegistrarAddress,
      signer
    );
  const typeAndVersion = await typeAndVersionInterface.typeAndVersion();
  switch (typeAndVersion) {
    case KeeperRegistrarVersion.registrar1_1:
      return KeeperRegistrar__factory.connect(keepersRegistrarAddress, signer);
    case KeeperRegistrarVersion.registrar2_0:
      return KeeperRegistrar2_0__factory.connect(
        keepersRegistrarAddress,
        signer
      );
    default:
      throw new Error("Error Unsupported Keeper Registrar version");
  }
};

async function _registerUpkeep(
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  keepersRegistrarAddress: string,
  amountInJuels: BigNumberish,
  upkeepName: string,
  encryptedEmail: BytesLike,
  upkeepContract: string,
  gasLimit: number,
  adminAddress: string,
  checkData: BytesLike,
  source: number,
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
    keepersRegistrarAddress,
    amountInJuels,
    defaultAbiCoder.encode(
      [
        "bytes4",
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
        functionSelector,
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
    )
  );
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
}

async function _registerUpkeep2_0(
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  keepersRegistrarAddress: string,
  amountInJuels: BigNumberish,
  upkeepName: string,
  encryptedEmail: BytesLike,
  upkeepContract: string,
  gasLimit: number,
  adminAddress: string,
  checkData: BytesLike,
  ocrConfig: BigNumberish,
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
    keepersRegistrarAddress,
    amountInJuels,
    defaultAbiCoder.encode(
      [
        "bytes4",
        "string",
        "bytes",
        "address",
        "uint32",
        "address",
        "bytes",
        "bytes",
        "uint8",
        "address",
      ],
      [
        functionSelector,
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
    )
  );
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
}

export const registerUpkeep = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  keepersRegistrarAddress: string,
  amountInJuels: BigNumberish,
  upkeepName: string,
  encryptedEmail: BytesLike = "",
  upkeepContract: string,
  gasLimit: number = 200000,
  adminAddress: string,
  checkData: BytesLike = "",
  ocrConfig: BytesLike = "",
  source: number = 0,
  sender: string
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();

  const typeAndVersionInterface =
    await TypeAndVersionInterface__factory.connect(
      keepersRegistrarAddress,
      signer
    );
  const typeAndVersion = await typeAndVersionInterface.typeAndVersion();
  switch (typeAndVersion) {
    case KeeperRegistrarVersion.registrar1_1:
      return _registerUpkeep(
        hre,
        linkTokenAddress,
        keepersRegistrarAddress,
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
        linkTokenAddress,
        keepersRegistrarAddress,
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
    default:
      throw new Error("Error Unsupported Keeper Registrar version");
  }
};

export const getPendingRequest = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistrarAddress: string,
  requestHash: BytesLike
): Promise<{
  adminAddress: string;
  balance: BigNumber;
}> => {
  const keepersRegistrar = await connectKeeperRegistrar(
    hre,
    keepersRegistrarAddress
  );

  const pendingRequest = await keepersRegistrar.getPendingRequest(requestHash);

  return { adminAddress: pendingRequest[0], balance: pendingRequest[1] };
};

export const cancelRequest = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistrarAddress: string,
  requestHash: BytesLike
): Promise<{ transactionHash: string }> => {
  const keepersRegistrar = await connectKeeperRegistrar(
    hre,
    keepersRegistrarAddress
  );

  const tx: ContractTransaction = await keepersRegistrar.cancel(requestHash);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const getRegistrationConfig = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistrarAddress: string
): Promise<{
  autoApproveConfigType: number;
  autoApproveMaxAllowed: number;
  approvedCount: number;
  keeperRegistry: string;
  minLINKJuels: BigNumber;
}> => {
  const keepersRegistrar = await connectKeeperRegistrar(
    hre,
    keepersRegistrarAddress
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
  keepersRegistrarAddress: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const typeAndVersionInterface =
    await TypeAndVersionInterface__factory.connect(
      keepersRegistrarAddress,
      signer
    );
  return typeAndVersionInterface.typeAndVersion();
};
