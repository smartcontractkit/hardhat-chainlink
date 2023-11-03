import * as functionsToolkit from "@chainlink/functions-toolkit";
import { DecodedResult } from "@chainlink/functions-toolkit/dist/decodeResult";
import { ReturnType } from "@chainlink/functions-toolkit/dist/types";
import fs from "fs";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { join } from "path";

import { DEFAULT_PORT } from "../../shared/constants";

const writeSimulationConfigFile = async (
  hre: HardhatRuntimeEnvironment
): Promise<string> => {
  const simulationConfig = hre.config.chainlink.functions_simulation;
  let tsCodeSimulationsConfig = "";
  tsCodeSimulationsConfig += `export const secrets = ${JSON.stringify(
    simulationConfig.secrets || {}
  )};`;
  tsCodeSimulationsConfig += `export const maxOnChainResponseBytes = ${
    simulationConfig.max_on_chain_response_bytes ||
    functionsToolkit.DEFAULT_MAX_ON_CHAIN_RESPONSE_BYTES
  };`;
  tsCodeSimulationsConfig += `export const maxExecutionTimeMs = ${
    simulationConfig.max_execution_time_ms ||
    functionsToolkit.DEFAULT_MAX_EXECUTION_DURATION_MS
  };`;
  tsCodeSimulationsConfig += `export const maxMemoryUsageMb = ${
    simulationConfig.max_memory_usage_mb ||
    functionsToolkit.DEFAULT_MAX_MEMORY_USAGE_MB
  };`;
  tsCodeSimulationsConfig += `export const numAllowedQueries = ${
    simulationConfig.num_allowed_queries ||
    functionsToolkit.DEFAULT_MAX_HTTP_REQUESTS
  };`;
  tsCodeSimulationsConfig += `export const maxQueryDurationMs = ${
    simulationConfig.max_query_duration_ms ||
    functionsToolkit.DEFAULT_MAX_HTTP_REQUEST_DURATION_MS
  };`;
  tsCodeSimulationsConfig += `export const maxQueryUrlLength = ${
    simulationConfig.max_query_url_length ||
    functionsToolkit.DEFAULT_MAX_HTTP_REQUEST_URL_LENGTH
  };`;
  tsCodeSimulationsConfig += `export const maxQueryRequestBytes = ${
    simulationConfig.max_query_request_bytes ||
    functionsToolkit.DEFAULT_MAX_HTTP_REQUEST_BYTES
  };`;
  tsCodeSimulationsConfig += `export const maxQueryResponseBytes = ${
    simulationConfig.max_query_response_bytes ||
    functionsToolkit.DEFAULT_MAX_ON_CHAIN_RESPONSE_BYTES
  };`;
  const pathToFile = join(__dirname, "/simulationConfig.ts");
  await fs.promises.writeFile(pathToFile, tsCodeSimulationsConfig);
  return pathToFile;
};

export const simulateRequest = async (
  hre: HardhatRuntimeEnvironment,
  source: string,
  args?: string[],
  bytesArgs?: string[]
): Promise<DecodedResult> => {
  const pathToConfigFile = await writeSimulationConfigFile(hre);
  const simulationDeployment =
    await functionsToolkit.startLocalFunctionsTestnet(
      pathToConfigFile,
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

  await fs.promises.unlink(pathToConfigFile);

  return hre.chainlink.utils.decodeResult(
    response.responseBytesHexstring,
    ReturnType.string
  );
};
