import * as functionsToolkit from "@chainlink/functions-toolkit";
import { DecodedResult } from "@chainlink/functions-toolkit/dist/decodeResult";
import { ReturnType } from "@chainlink/functions-toolkit/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { DEFAULT_PORT } from "../../shared/constants";

export const simulateRequest = async (
  hre: HardhatRuntimeEnvironment,
  source: string,
  args?: string[],
  bytesArgs?: string[]
): Promise<DecodedResult> => {
  const simulationDeployment =
    await functionsToolkit.startLocalFunctionsTestnet(
      undefined,
      {},
      hre.config.chainlink.functions_simulation?.port || DEFAULT_PORT
    );

  const provider = new hre.ethers.providers.JsonRpcProvider(
    `http://localhost:${
      hre.config.chainlink.functions_simulation?.port || DEFAULT_PORT
    }/`
  );
  const admin = new hre.ethers.Wallet(
    simulationDeployment.adminWallet.privateKey,
    provider
  );
  const functionsConsumerAddress =
    await hre.chainlink.sandbox.functionsConsumer.deploy(
      simulationDeployment.functionsRouterContract.address,
      simulationDeployment.donId,
      {
        signer: admin,
        provider,
      }
    );

  const functionsConsumer =
    await hre.chainlink.sandbox.functionsConsumer.initializeFunctionsConsumer(
      functionsConsumerAddress,
      {
        signer: admin,
        provider,
      }
    );

  const subscriptionManager =
    await hre.chainlink.functions.initializeFunctionsSubscriptionManager(
      simulationDeployment.functionsRouterContract.address,
      simulationDeployment.linkTokenContract.address,
      {
        signer: admin,
        provider,
      }
    );

  const responseListener =
    await hre.chainlink.functions.initializeFunctionsResponseListener(
      simulationDeployment.functionsRouterContract.address,
      {
        signer: admin,
        provider,
      }
    );

  const { subscriptionId } = await subscriptionManager.createSubscription(
    functionsConsumerAddress
  );

  const juelsAmount = hre.ethers.utils.parseUnits("100", "ether");
  await subscriptionManager.fundSubscription(juelsAmount, subscriptionId);

  const { transactionHash } = await functionsConsumer.sendRequest(
    subscriptionId,
    source,
    "0xabcd",
    functionsToolkit.Location.Remote,
    args,
    bytesArgs,
    100_000
  );

  const receipt = await provider.getTransactionReceipt(transactionHash);
  const requestId = receipt.logs[0].topics[1];
  const response = await responseListener.listenForResponse(requestId);

  return hre.chainlink.utils.decodeResult(
    response.responseBytesHexstring,
    ReturnType.string
  );
};
