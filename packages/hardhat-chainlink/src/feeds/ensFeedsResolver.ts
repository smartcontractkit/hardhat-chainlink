import { HardhatRuntimeEnvironment } from "hardhat/types";

export const resolveAggregatorAddress = async (
  hre: HardhatRuntimeEnvironment,
  baseTick: string,
  quoteTick: string
): Promise<string> => {
  const [signer] = await hre.ethers.getSigners();

  return signer.resolveName(
    `${baseTick.toLowerCase()}-${quoteTick.toLowerCase()}.data.eth`
  );
};

export const resolveAggregatorAddressWithSubdomains = async (
  hre: HardhatRuntimeEnvironment,
  baseTick: string,
  quoteTick: string
): Promise<{
  proxy: string;
  underlyingAggregator: string;
  proposedAggregator: string;
}> => {
  const [signer] = await hre.ethers.getSigners();

  const proxyAggregatorAddress = await signer.resolveName(
    `proxy.${baseTick.toLowerCase()}-${quoteTick.toLowerCase()}.data.eth`
  );

  const underlyingAggregatorAddress = await signer.resolveName(
    `aggregator.${baseTick.toLowerCase()}-${quoteTick.toLowerCase()}.data.eth`
  );

  const proposedAggregatorAddress = await signer.resolveName(
    `proposed.${baseTick.toLowerCase()}-${quoteTick.toLowerCase()}.data.eth`
  );

  return {
    proxy: proxyAggregatorAddress,
    underlyingAggregator: underlyingAggregatorAddress,
    proposedAggregator: proposedAggregatorAddress,
  };
};
