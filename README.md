# Hardhat Chainlink Plugin

Integrates [Chainlink](https://chain.link) into [Hardhat](https://hardhat.org) projects.

## What

This plugin will help you to use the Chainlink protocol inside your tests, scripts & tasks. This is a community initiative, so everyone is welcome to contribute. Start by openning a "Feature Request" issue.

## Installation

```bash
npm install hardhat-chainlink

# or

yarn add hardhat-chainlink
```

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-chainlink");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-chainlink";
```

## Environment extensions

This plugin extends the Hardhat Runtime Environment by adding an `chainlink` field
whose type is `ExampleHardhatRuntimeEnvironmentField`.

## Usage

To get the latest price of a given asset, prepare the network field inside `hardhat.config` file. To add Rinkeby testnet for example:

```typescript
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  }
```

Then import `chainlink` from `hardhat`, call the `getLatestPrice` function and pass it the [Aggreagator contract address](https://docs.chain.link/docs/reference-contracts/):

```typescript
import { chainlink } from "hardhat";

const ethUsdRinkebyAggregator: string = `0x8A753747A1Fa494EC906cE90E9f37563A8AF630e`;
const ethPrice = await chainlink.getLatestPrice(ethUsdRinkebyAggregator);
```
