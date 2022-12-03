import { BigNumber, BytesLike, Contract, ContractTransaction } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Interface, defaultAbiCoder } from "ethers/lib/utils";
import { LinkTokenAbi, KeeperRegistrarAbi } from "../../types/ethers-contracts";
import KEEPERS_REGISTRAR_ABI from "../abis/keeperRegistrar.abi.json";
import LINK_TOKEN_ABI from "../abis/linkToken.abi.json";

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
  waitNumberOfConfirmations: number = 0
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const linkToken: LinkTokenAbi = new Contract(
    linkTokenAddress,
    LINK_TOKEN_ABI,
    signer
  ) as LinkTokenAbi;

  const solidityRegisterFunctionSignature: string = `function register(string memory name,bytes calldata encryptedEmail,address upkeepContract,uint32 gasLimit,address adminAddress,bytes calldata checkData,uint96 amount,uint8 source,address sender) external;`;

  const KeeperRegistrarInterface: Interface = new Interface([
    solidityRegisterFunctionSignature,
  ]);

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
  const keepersRegistrar: KeeperRegistrarAbi = new Contract(
    keepersRegistrarAddress,
    KEEPERS_REGISTRAR_ABI,
    signer
  ) as KeeperRegistrarAbi;

  const pendingRequest = await keepersRegistrar.getPendingRequest(hash);

  return { adminAddress: pendingRequest[0], balance: pendingRequest[1] };
};

export const cancelKeepersPendingRegistrationRequest = async (
  env: HardhatRuntimeEnvironment,
  keepersRegistrarAddress: string,
  hash: BytesLike,
  waitNumberOfConfirmations: number = 0
): Promise<{ transactionHash: string }> => {
  const [signer] = await env.ethers.getSigners();
  const keepersRegistrar: KeeperRegistrarAbi = new Contract(
    keepersRegistrarAddress,
    KEEPERS_REGISTRAR_ABI,
    signer
  ) as KeeperRegistrarAbi;

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
  const keepersRegistrar: KeeperRegistrarAbi = new Contract(
    keepersRegistrarAddress,
    KEEPERS_REGISTRAR_ABI,
    signer
  ) as KeeperRegistrarAbi;

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
  const keepersRegistrar: KeeperRegistrarAbi = new Contract(
    keepersRegistrarAddress,
    KEEPERS_REGISTRAR_ABI,
    signer
  ) as KeeperRegistrarAbi;

  return await keepersRegistrar.typeAndVersion();
};
