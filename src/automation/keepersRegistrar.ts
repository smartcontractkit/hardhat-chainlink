import { BigNumber, BytesLike, Contract, ContractTransaction } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Interface, defaultAbiCoder } from "ethers/lib/utils";
import { LinkTokenInterface__factory, KeeperRegistrar__factory } from "../../types";
import KEEPERS_REGISTRAR_ABI from "@chainlink/contracts/abi/v0.8/KeeperRegistrar.json";

export const registerUpkeep = async (
  env: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  keepersRegistrarAddress: string,
  amountInJuels: BigNumber,
  name: string,
  encryptedEmail: BytesLike,
  upkeepContract: string,
  gasLimit: number,
  adminAddress: string,
  checkData: BytesLike,
  source: number,
  sender: string,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const linkToken = LinkTokenInterface__factory.connect(linkTokenAddress, signer);

  const solidityRegisterFunctionSignature: string = `register`;

  const KeeperRegistrarInterface: Interface = new Interface(KEEPERS_REGISTRAR_ABI);

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
        name,
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
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const getKeepersPendingRegistrationRequest = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistrarAddress: string,
  hash: BytesLike
): Promise<{
  adminAddress: string;
  balance: BigNumber;
}> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistrar = KeeperRegistrar__factory.connect(keepersRegistrarAddress, signer);

  const pendingRequest = await keepersRegistrar.getPendingRequest(hash);

  return { adminAddress: pendingRequest[0], balance: pendingRequest[1] };
};

export const cancelKeepersPendingRegistrationRequest = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistrarAddress: string,
  hash: BytesLike,
  waitNumberOfConfirmations: number
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistrar = KeeperRegistrar__factory.connect(keepersRegistrarAddress, signer);

  const tx: ContractTransaction = await keepersRegistrar.cancel(hash);
  await tx.wait(waitNumberOfConfirmations);

  return { transactionHash: tx.hash };
};

export const getKeepersRegistrarConfig = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistrarAddress: string
): Promise<{
  autoApproveConfigType: number;
  autoApproveMaxAllowed: number;
  approvedCount: number;
  automationRegistry: string;
  minLINKJuels: BigNumber;
}> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistrar = KeeperRegistrar__factory.connect(keepersRegistrarAddress, signer);

  const config = await keepersRegistrar.getRegistrationConfig();

  return {
    autoApproveConfigType: config.autoApproveConfigType,
    autoApproveMaxAllowed: config.autoApproveMaxAllowed,
    approvedCount: config.approvedCount,
    automationRegistry: config.keeperRegistry,
    minLINKJuels: config.minLINKJuels,
  };
};

export const getKeepersRegistrarTypeAndVersion = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistrarAddress: string
): Promise<string> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistrar = KeeperRegistrar__factory.connect(keepersRegistrarAddress, signer);

  return await keepersRegistrar.typeAndVersion();
};
