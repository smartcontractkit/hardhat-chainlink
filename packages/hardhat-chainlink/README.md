# Hardhat Chainlink Plugin

The Hardhat Chainlink plugin allows users to seamlessly interact with Chainlink services in their Hardhat-based projects. 
It provides atomic methods to interact with smart contracts related to the main Chainlink services: Data Feeds, VRF, and Automation. 
This plugin offers a convenient way to integrate Chainlink functionality into your web3 development workflow.

> **Warning**
>
> **This package is currently in the BETA testing phase and is not recommended for production usage yet.**
>
> **Open issues to submit bugs and earn the Beta Tester POAP.**

## Installation
> **Note**  
If you are starting a new Hardhat project, we recommend following the [Hardhat Getting Started](https://hardhat.org/hardhat-runner/docs/getting-started#overview) documentation first.

You can install the Hardhat Chainlink plugin using either npm or yarn. 
Choose the package manager that you prefer and run one of the following commands:  

Using npm:
```console
npm install @chainlink/hardhat-chainlink
```

Using yarn:

```console
yarn add @chainlink/hardhat-chainlink
```

After installation, add the plugin to your Hardhat config:  

`hardhat.config.js`:
```js
require("@chainlink/hardhat-chainlink");
```

`hardhat.config.ts`:
```ts
import "@chainlink/hardhat-chainlink";
```

## Usage

The Hardhat Chainlink plugin offers multiple ways to interact with Chainlink services, 
giving you the flexibility to choose the approach that suits your workflow best.

### 1. CLI

Interact with the Hardhat Chainlink plugin through the command line interface (CLI) using the following format:
```
npx hardhat chainlink:{service} [method] [--args]
```
This approach serves both as a CLI method and Hardhat tasks. 
However, it's important to note that the methods in each service are "hidden" with subtasks and won't be shown when you call `npx hardhat`. 
Instead, you can call the methods by passing its name as a parameter for the related task.

If the subtask and/or args are not passed directly, they will be interactively inquired during the CLI command execution.

> **Note**  
Arguments for methods called with CLI should be provided as a valid JSON string.

To get a list of all available methods (subtasks) and their arguments for a specific service, you can use:
```
npx hardhat chainlink:{task}:subtasks
```

Example of calling a subtask with arguments directly in the CLI:
```shell
npx hardhat chainlink:dataFeed getLatestRoundAnswer --args '{"dataFeedAddress": "0xE62B71cf983019BFf55bC83B48601ce8419650CC"}'
```

Example of interacting with the CLI interactively, where the subtask and arguments are inquired:
```shell
npx hardhat chainlink:dataFeed
# The CLI will ask you to select a subtask (getLatestRoundAnswer) and provide arguments interactively.
```

### 2. Hardhat Tasks

Integrate the Hardhat Chainlink plugin as a subtask in your own Hardhat tasks. Use the following format to run a subtask:
```
hre.run("chainlink:{service}:{method}", { ...args });
```

This method is well-suited for more complex workflows and automation. 
You can call the {service} and {method} directly in your custom Hardhat tasks, passing the required arguments as an object containing the necessary parameters.

Example of calling a subtask in a custom Hardhat task with arguments:
```js
task("myTask", "My custom task", async (taskArgs, hre) => {
  await hre.run("chainlink:dataFeed:getLatestRoundAnswer", {
    dataFeedAddress: "0xE62B71cf983019BFf55bC83B48601ce8419650CC",
  });
});
```

### 3. Methods in Hardhat Environment

Directly access Chainlink services as methods in the Hardhat Environment using the following format:
```
hre.chainlink.{service}.{method}(...args);
```
This approach is ideal for seamless integration with your existing Hardhat project. 
You can use familiar JavaScript syntax to call the Chainlink services as methods within your scripts and tasks.

Example of calling a subtask as a method in the Hardhat Environment:
```js
async function myFunction() {
  const dataFeedAddress = "0xE62B71cf983019BFf55bC83B48601ce8419650CC";
  const result = await hre.chainlink.dataFeed.getLatestRoundAnswer(dataFeedAddress);
  console.log(result);
}
```
---
Choose the method that fits your project's requirements and coding style. 
All three approaches provide the same set of functionalities, allowing you to interact with Chainlink services efficiently and effectively.

### Available Services
The Hardhat Chainlink plugin supports the following Chainlink services:

- `dataFeed` (Data Feeds)
- `dataFeedProxy` (Data Feed Proxies)
- `feedRegistry` (Feed Registries)
- `l2Sequencer` (L2 Sequencers)
- `ens` (ENS - Ethereum Name Service)
- `automationRegistry` (Automation Registries)
- `automationRegistrar` (Automation Registrars)
- `vrf` (Verifiable Random Functions)

For a more in-depth understanding of available services and methods, please explore their [tests](test).

## Registries
The Hardhat Chainlink plugin provides registries that contain information about smart contracts related
to various Chainlink services and other data, such as the [denominations library](https://docs.chain.link/data-feeds/feed-registry#denominations-library),
which is useful for interacting with the Feed Registry.

In general, these registries help you access essential contract addresses deployed on different networks, 
making it easier to integrate Chainlink services into your projects.

You can access the plugin registries using one of the following methods:

### 1. CLI

To interact with the registries through the CLI, use the following command:
```
npx hardhat chainlink:registries [method]
```

This command allows you to query records available in the registries. 
The CLI will inquire about the necessary additional information, such as the preferable network, to retrieve the required record from the registry.

To get a list of all available getter-method for a specific registry, you can use:
```
npx hardhat chainlink:registries:subtasks
```

The CLI will also inquire about the registry getter-method interactively if not provided directly.

Example of getting a record from registry directly in the CLI:
```shell
npx hardhat chainlink:registries getDataFeed
# The CLI will ask you to select a preferred network and subsequent parameters.
```

### 2. Methods in Hardhat Environment

Access the registries as methods directly in the Hardhat Environment:
```
const registry = hre.chainlink.registries.{registryName};
```

Replace {registryName} with the name of the registry (e.g., dataFeeds, feedRegistries, keeperRegistries).

Example of getting data from registry in the Hardhat Environment:
```js
async function myFunction() {
  const dataFeedAddress = hre.chainlink.registries.dataFeeds.ethereum.ETH.USD.contractAddress;
  console.log(dataFeedAddress);
  // 0xE62B71cf983019BFf55bC83B48601ce8419650CC
}
```

### Available registries

The Hardhat Chainlink plugin provides the following registries:
- `dataFeeds`: Addresses of Data Feeds-related contracts: Aggregators and Proxies, and their parameters.
- `feedRegistries`: Feed Registries' contract addresses.
- `l2Sequencers`: L2 Sequencer Uptime Feeds' contract addresses.
- `keeperRegistries`: Addresses of Automation-related contracts: Keeper Registry and Keeper Registrar.
- `linkTokens`: Link Tokens' contract addresses.
- `vrfCoordinators`: Addresses of VRF Coordinators and their parameters.
- `denominations`: Records from Denominations library to interact with Feed Registries contracts.

For a more in-depth understanding of the structure of these records, please explore their [interfaces](src%2Fregistries%2Finterfaces).

## Documentation

For detailed usage instructions and more information on each service and method, refer to the [DOCUMENTATION.md](DOCUMENTATION.md).

## Contribution
We welcome contributions from the community.  

If you find any issues, have suggestions for improvements, or want to add new features to the plugin, 
please don't hesitate to open an issue or submit a pull request.

Your contributions help us improve the Hardhat Chainlink plugin and provide better tools for the entire community.
