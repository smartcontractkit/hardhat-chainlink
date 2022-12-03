import { HardhatRuntimeEnvironment } from "hardhat/types";

export const resolveEnsAggregatorAddress = async (
  env: HardhatRuntimeEnvironment,
  baseTick: string,
  quoteTick: string
): Promise<string> => {
  const [signer] = await env.ethers.getSigners();

  const proxyAggregatorAddress = await signer.resolveName(
    `${baseTick.toLowerCase()}-${quoteTick.toLowerCase()}.data.eth`
  );

  return proxyAggregatorAddress;
};

export const resolveEnsAggregatorAddressWithSubdomains = async (
  env: HardhatRuntimeEnvironment,
  baseTick: string,
  quoteTick: string
): Promise<{
  proxy: string;
  underlyingAggregator: string;
  proposedAggregator: string;
}> => {
  const [signer] = await env.ethers.getSigners();

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
