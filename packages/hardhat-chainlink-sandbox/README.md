# Hardhat Chainlink Plugin

Integrates [Chainlink](https://chain.link) into [Hardhat](https://hardhat.org) projects.

> **Warning**
>
> **This package is currently in the BETA testing phase and is not recommended for production usage yet.**
>
> **Open issues to submit bugs and earn the Beta Tester POAP.**

## What

This plugin will help you to use the Chainlink protocol inside your tests, scripts & tasks. This is a community initiative, so everyone is welcome to contribute. Start by opening a "Feature Request" issue.

## Installation

```console
npm install @chainlink/hardhat-chainlink

# or

yarn add @chainlink/hardhat-chainlink
```

Import the plugin in your `hardhat.config.js`:

```js
require("@chainlink/hardhat-chainlink");
```

Or, if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "@chainlink/hardhat-chainlink";
```

## Environment extensions

This plugin extends the Hardhat Runtime Environment by adding a `chainlink` field
whose type is `ExampleHardhatRuntimeEnvironmentField`.

## Usage

Full documentation is available at [DOCUMENTATION.md](packages/hardhat-chainlink-toolkit/DOCUMENTATION.mdhainlink-toolkit/DOCUMENTATION.md). Here are a couple of examples of how to use the plugin.

### Example 1 - Get the latest price of ETH

To get the latest price of a given asset, prepare the network field inside `hardhat.config` file. To add the Goerli Testnet for example, type:

```typescript
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  }
```

Then import `chainlink` from `hardhat`, call the `getLatestPrice` function and pass it the [Aggregator contract address](https://docs.chain.link/docs/reference-contracts/):

```typescript
import { chainlink } from "hardhat";

const ethUsdGoerliAggregator: string = `0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e`;
const ethPrice = await chainlink.getLatestPrice(ethUsdGoerliAggregator);
```

Make sure that your network points to the correct one (Goerli in this example), and double-check that provided aggregator address is correct. For example, if you are writing your tests with the `forking` feature enabled or developing scripts and tasks on a Goerli network, in which case you will run the above code snippet like this:

```console
npx hardhat run scripts/myScript.ts --network goerli
```

### Example 2 - Create and Manage VRF Subscriptions inside the deployment script

Start by creating `VRFv2Consumer.sol` contract, which you can get from the [Official Chainlink Documentation](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number).

Prepare `hardhat.config` file for deployment on the Goerli network, for example:

```typescript
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  }
```

Usually, you will create and manage your subscriptions on the VRF Subscription Management page, but with the plugin, you can automate that process.

Expand your deployment script to include the following:

- Creating new VRF subscriptions
- Funding VRF subscriptions (Make sure to claim LINKs from the [faucet](https://faucets.chain.link/))
- Adding new VRF consumers
- And optionally,
  - Getting details about VRF subscriptions
  - Checking if there is a pending outgoing VRF request
  - Removing VRF consumers
  - Canceling VRF subscriptions

```typescript
// scripts/deploy.ts
import { chainlink, ethers } from "hardhat";

async function main() {
  // NOTE: If you already have an active VRF Subscription, proceed to step 3

  // Step 1: Create a new VRF Subscription
  const vrfCoordinatorAddress = `0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D`;
  const { subscriptionId } = await chainlink.createVrfSubscription(
    vrfCoordinatorAddress
  );

  // Step 2: Fund VRF Subscription
  const linkTokenAddress = `0x326C977E6efc84E512bB9C30f76E30c160eD06FB`;
  const amountInJuels = ethers.BigNumber.from(`1000000000000000000`); // 1 LINK
  await chainlink.fundVrfSubscription(
    vrfCoordinatorAddress,
    linkTokenAddress,
    amountInJuels,
    subscriptionId
  );

  // Step 3: Deploy your smart contract
  const VRFv2ConsumerFactory = await ethers.getContractFactory("VRFv2Consumer");
  const VRFv2Consumer = await VRFv2ConsumerFactory.deploy(subscriptionId);
  await VRFv2Consumer.deployed();
  console.log("VRFv2Consumer deployed to:", VRFv2Consumer.address);

  // Step 4: Add VRF Consumer contract to your VRF Subscription
  await chainlink.addVrfConsumer(
    vrfCoordinatorAddress,
    VRFv2Consumer.address,
    subscriptionId
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Run the deployment script by typing:

```console
npx hardhat run scripts/deploy.ts --network goerli
```

### Example 3 - Run Chainlink node on Hardhat network

To run a Chainlink Node on the Hardhat network, you will need to follow a couple of steps.

**Step 1**

Spin up the Hardhat network by running the following command:

```console
npx hardhat node
```

**Step 2**

Open, and if necessary, install [Docker Desktop](https://www.docker.com/get-started/).

**Step 3**

Spin up a Chainlink node using the following command, which will set up some env variables. Please do not start it from Docker Desktop.

```console
npx hardhat chainlink:run-node
```

> **Note**
>
> IMPORTANT!
>
> Each time this command runs, it will remove all containers and re-create them (before running `docker compose up`, we first run `docker compose down`)
>
> This behavior is analogous to the hardhat EVM node losing all previous history each time it is restarted.
>
> If you want to restart, only pass an additional `true` parameter (`restartOnly`) like this `npx hardhat chainlink:run-node true`

If you visit http://127.0.0.1:6688 in your browser, you should see the Chainlink node login page displayed.

You can use the following credentials to log in to your local Chainlink node:

- username - **user@hardhatchainlink.io**
- password - **strongpassword777**

<img width="1014" alt="Chainlink Node Log In Page" src="https://user-images.githubusercontent.com/37881789/203107776-8f0fcd14-e35f-445a-becd-83a2448a73b3.png">

To see the available tasks to interact with your node, run:

```console
npx hardhat
```
