import KEEPERS_REGISTRAR_ABI from "@chainlink/contracts/abi/v0.8/KeeperRegistrar.json";
import {
  BigNumber,
  BigNumberish,
  BytesLike,
  ContractTransaction,
} from "ethers";
import { defaultAbiCoder, Interface } from "ethers/lib/utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
  KeeperRegistrar__factory,
  LinkTokenInterface__factory,
} from "../../types";

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
  source: number = 0,
  sender: string
): Promise<{ transactionHash: string }> => {
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
};

export const getPendingRegistrationRequest = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistrarAddress: string,
  requestHash: BytesLike
): Promise<{
  adminAddress: string;
  balance: BigNumber;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistrar = KeeperRegistrar__factory.connect(
    keepersRegistrarAddress,
    signer
  );

  const pendingRequest = await keepersRegistrar.getPendingRequest(requestHash);

  return { adminAddress: pendingRequest[0], balance: pendingRequest[1] };
};

export const cancelPendingRegistrationRequest = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistrarAddress: string,
  requestHash: BytesLike
): Promise<{ transactionHash: string }> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistrar = KeeperRegistrar__factory.connect(
    keepersRegistrarAddress,
    signer
  );

  const tx: ContractTransaction = await keepersRegistrar.cancel(requestHash);
  await tx.wait(hre.config.chainlink.confirmations);

  return { transactionHash: tx.hash };
};

export const getKeeperRegistrarConfig = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistrarAddress: string
): Promise<{
  autoApproveConfigType: number;
  autoApproveMaxAllowed: number;
  approvedCount: number;
  keeperRegistry: string;
  minLINKJuels: BigNumber;
}> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistrar = KeeperRegistrar__factory.connect(
    keepersRegistrarAddress,
    signer
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

export const getKeepersRegistrarTypeAndVersion = async (
  hre: HardhatRuntimeEnvironment,
  keepersRegistrarAddress: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();
  const keepersRegistrar = KeeperRegistrar__factory.connect(
    keepersRegistrarAddress,
    signer
  );

  return keepersRegistrar.typeAndVersion();
};
