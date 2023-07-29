# Hardhat Chainlink Plugin Documentation

Welcome to the Hardhat Chainlink Plugin Documentation page.

New to Hardhat? Check the [Official Hardhat Documentation](https://hardhat.org/docs).

New to Chainlink? Check the [Official Chainlink Documentation](https://docs.chain.link/).

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

## Environment extensions and Hardhat tasks

This plugin extends the Hardhat Runtime Environment by adding a `chainlink` field
whose type is `ExampleHardhatRuntimeEnvironmentField`. To use it, import in your tests/scripts/tasks the `chainlink` field from `hardhat`:

```typescript
import { chainlink } from "hardhat";

// or

const { chainlink } = require("hardhat");
```

This plugin comes with predefined Hardhat tasks for interacting with the local Chainlink Node. To see the available tasks, run the following command:

```console
npx hardhat
```

# Available Tasks
List of available methods 
## Data Feeds
Related to smart contracts implementing Offchain Aggregator interface.

Hardhat environment: `dataFeed`  
Hardhat tasks: `dataFeeds`

#### getLatestRoundAnswer

- **Action:** dataFeed.getLatestRoundAnswer
- **Command:** `get-latest-round-answer`
- **Description:** Get the latest round answer for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed

### getRoundAnswer

- **Action:** feedsActions.getRoundAnswer
- **Command:** `get-round-answer`
- **Description:** Get the round answer for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed
  - `roundId`: Round ID of Data Feed

### getLatestRoundData

- **Action:** feedsActions.getLatestRoundData
- **Command:** `get-latest-round-data`
- **Description:** Get the latest round data for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed

### getRoundData

- **Action:** feedsActions.getRoundData
- **Command:** `get-round-data`
- **Description:** Get the round data for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed
  - `roundId`: Round ID of Data Feed

### getDecimals

- **Action:** feedsActions.getDecimals
- **Command:** `get-decimals`
- **Description:** Get the decimals for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed

### getDescription

- **Action:** feedsActions.getDescription
- **Command:** `get-description`
- **Description:** Get the description for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed

### getAggregatorVersion

- **Action:** feedsActions.getAggregatorVersion
- **Command:** `get-aggregator-version`
- **Description:** Get the aggregator version for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed

### getAggregatorAddress

- **Action:** feedsActions.getAggregatorAddress
- **Command:** `get-aggregator-address`
- **Description:** Get the aggregator address for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed

### getAggregatorRoundId

- **Action:** feedsActions.getAggregatorRoundId
- **Command:** `get-aggregator-round-id`
- **Description:** Get the aggregator round ID for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed

### getPhaseId

- **Action:** feedsActions.getPhaseId
- **Command:** `get-phase-id`
- **Description:** Get Data Feed phase ID
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed

