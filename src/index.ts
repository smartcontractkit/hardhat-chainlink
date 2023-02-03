import { extendConfig, extendEnvironment, task } from "hardhat/config";
import { boolean } from "hardhat/internal/core/params/argumentTypes";
import { lazyObject } from "hardhat/plugins";
import {
  HardhatConfig,
  HardhatRuntimeEnvironment,
  HardhatUserConfig,
} from "hardhat/types";

import { HardhatChainlink } from "./HardhatChainlink";
import { createJob } from "./tasks/create-job";
import { deployLinkToken } from "./tasks/deploy-link-token";
import { deployOracle } from "./tasks/deploy-oracle";
import { getSubscriptionInfo } from "./tasks/functions/get-subscription-info";
import { deployConsumerContract } from "./tasks/functions/deploy-consumer-contract";
import { simulateRequestAction } from "./tasks/functions/simulate-request";
import { generateConsumerContract } from "./tasks/functions/generate-consumer-contract";
import { createSubscriptionAction } from "./tasks/functions/create-subscription";
import { fundSubscriptionAction } from "./tasks/functions/fund-subscription";
import { addSubscriptionConsumerAction } from "./tasks/functions/add-subscription-consumer";
import { cancelSubscriptionAction } from "./tasks/functions/cancel-subscription";
import { fundEth, fundLink } from "./tasks/fund";
import { nodeInfo } from "./tasks/node-info";
import { runNode } from "./tasks/run-node";
import "./type-extensions";

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => { }
);

extendEnvironment((hre: HardhatRuntimeEnvironment) => {
  hre.chainlink = lazyObject(() => new HardhatChainlink(hre));
});

task("chainlink:run-node", "Runs the chainlink node")
  .addOptionalPositionalParam(
    "restartOnly",
    "Restart the existing containers instead of removing and recreating them",
    false,
    boolean
  )
  .setAction(runNode);

task("chainlink:create-job", "Creates the job")
  .addPositionalParam("oracleAddress", "Address of Oracle")
  .addOptionalPositionalParam("jobType", "direct or cron", "direct")
  .setAction(createJob);

task(
  "chainlink:deploy-link",
  "Deploys the Link token into a running node"
).setAction(deployLinkToken);

task("chainlink:deploy-oracle", "Deploys the oracle")
  .addPositionalParam("nodeAddress", "The node address")
  .addPositionalParam("linkAddress", "The Link token address")
  .setAction(deployOracle);

task("chainlink:fund-eth", "Funds the node with ETH")
  .addPositionalParam("nodeAddress", "The node address")
  .addPositionalParam("amount", "Amount to fund")
  .setAction(fundEth);

task("chainlink:fund-link", "Funds the node with LINK")
  .addPositionalParam("linkAddress", "The link token address")
  .addPositionalParam("contractAddress", "The consumer contract address")
  .setAction(fundLink);

task("chainlink:node-info", "Get node info").setAction(nodeInfo);

task(
  "chainlink:functions-get-subscription-info",
  "Retrieve Functions subscription info"
)
  .addPositionalParam(
    "registryAddress",
    "FunctionsBillingRegistry contract address"
  )
  .addPositionalParam("subscriptionId", "Subscription ID")
  .setAction(getSubscriptionInfo);

task(
  "chainlink:functions-deploy-consumer-contract",
  "Deploys FunctionsConsumer contract"
)
  .addPositionalParam(
    "oracleAddress",
    "FunctionsOracle contract address"
  )
  .addOptionalPositionalParam(
    "verifyContract",
    "Verify deployed contract with Etherscan"
  )
  .setAction(deployConsumerContract);

task(
  "chainlink:functions-simulate-request",
  "Simulates an end-to-end fulfillment locally for the FunctionsConsumer contract"
)
  .addPositionalParam(
    "functionsPublicKey",
    "Functions DON public key (hex without 0x prefix)"
  )
  .addOptionalParam(
    "gasLimit",
    "Maximum amount of gas that can be used to call fulfillRequest in the client contract (defaults to 100,000)"
  )
  .setAction(simulateRequestAction);

task(
  "chainlink:functions-generate-consumer-contract",
  "Generates a new FunctionsConsumer.sol contract in your contracts directory"
).setAction(generateConsumerContract);

task(
  "chainlink:functions-fund-subscription",
  "Funds an existing subscription with the given amount of LINK"
)
  .addPositionalParam(
    "registryAddress",
    "FunctionsBillingRegistry address"
  )
  .addPositionalParam(
    "subscriptionId",
    "A subscription ID"
  )
  .addPositionalParam(
    "linkAmount",
    "Amount of LINK to fund the subscription"
  )
  .setAction(fundSubscriptionAction)

task(
  "chainlink:functions-create-subscription",
  "Creates a new subscription"
)
  .addPositionalParam(
    "registryAddress",
    "FunctionsBillingRegistry address"
  )
  .addOptionalPositionalParam(
    "clientContractAddress",
    "Address of the client contract address authorized to use the new billing subscription"
  )
  .addOptionalPositionalParam(
    "linkAmount",
    "Initial amount used to fund the subscription in LINK"
  )
  .setAction(createSubscriptionAction)

task(
  "chainlink:functions-add-subscription-consumer",
  "Authorize a client contract address to consumer the subscription"
)
  .addPositionalParam(
    "registryAddress",
    "FunctionsBillingRegistry address"
  )
  .addPositionalParam(
    "subscriptionId",
    "A subscription ID"
  )
  .addPositionalParam(
    "clientContractAddress",
    "A client contract address"
  )
  .setAction(addSubscriptionConsumerAction)

task(
  "chainlink:functions-cancel-subscription",
  "Cancels a subscription and refunds to a specified address"
)
  .addPositionalParam(
    "registryAddress",
    "FunctionsBillingRegistry address"
  )
  .addPositionalParam(
    "subscriptionId",
    "A subscription ID to cancel"
  )
  .addOptionalPositionalParam(
    "refundAddress",
    "An address to refund (defaults to subscription owner)"
  )
  .setAction(cancelSubscriptionAction)