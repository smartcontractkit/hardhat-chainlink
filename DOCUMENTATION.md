# Hardhat Chainlink Plugin Documentation
This document provides detailed information about each Chainlink service module and its related methods available in the Hardhat Chainlink plugin.

To use these methods please ensure that your Hardhat environment is configured according to the [README](README.md).

<!-- TOC -->
* [Hardhat Chainlink Plugin Documentation](#hardhat-chainlink-plugin-documentation)
  * [Data Feeds Services](#data-feeds-services)
    * [Service alias: `dataFeed`](#service-alias-datafeed)
      * [Get Latest Round Answer](#get-latest-round-answer)
      * [Get Round Answer](#get-round-answer)
      * [Get Latest Round Data](#get-latest-round-data)
      * [Get Round Data](#get-round-data)
      * [Get LatestRoundId](#get-latestroundid)
      * [Get Decimals](#get-decimals)
      * [Get Description](#get-description)
      * [Get Version](#get-version)
    * [Service alias: `dataFeedProxy`](#service-alias-datafeedproxy)
      * [Get Latest Round Answer](#get-latest-round-answer-1)
      * [Get Round Answer](#get-round-answer-1)
      * [Get Latest Round Data](#get-latest-round-data-1)
      * [Get Round Data](#get-round-data-1)
      * [Get Latest RoundId](#get-latest-roundid)
      * [Get Decimals](#get-decimals-1)
      * [Get Description](#get-description-1)
      * [Get Version](#get-version-1)
      * [Get Aggregator](#get-aggregator)
      * [Get PhaseId](#get-phaseid)
      * [Get Phase Aggregators](#get-phase-aggregators)
    * [Service alias: `feedRegistry`](#service-alias-feedregistry)
      * [Get Latest Round Data](#get-latest-round-data-2)
      * [Get Round Data](#get-round-data-2)
      * [Get Latest Round Data of Proposed Feed](#get-latest-round-data-of-proposed-feed)
      * [Get Round Data of Proposed Feed](#get-round-data-of-proposed-feed)
      * [Get Round Feed](#get-round-feed)
      * [Get Feed](#get-feed)
      * [Get Proposed Feed](#get-proposed-feed)
      * [Is Feed Enabled](#is-feed-enabled)
      * [Get Previous Round ID](#get-previous-round-id)
      * [Get Next Round ID](#get-next-round-id)
      * [Get Decimals](#get-decimals-2)
      * [Get Description](#get-description-2)
      * [Get Version](#get-version-2)
      * [Get Phase](#get-phase)
      * [Get Phase Feed](#get-phase-feed)
      * [Get Phase Range](#get-phase-range)
      * [Get Current Phase ID](#get-current-phase-id)
    * [Service alias: `l2Sequencer`](#service-alias-l2sequencer)
      * [Is L2 Sequencer Up](#is-l2-sequencer-up)
      * [Get Time Since L2 Sequencer Is Up](#get-time-since-l2-sequencer-is-up)
    * [Service alias: `ens`](#service-alias-ens)
      * [Resolve Aggregator Address](#resolve-aggregator-address)
      * [Resolve Aggregator Address With Subdomains](#resolve-aggregator-address-with-subdomains)
  * [VRF Service](#vrf-service)
    * [Service alias: `vrf`](#service-alias-vrf)
      * [Create Subscription](#create-subscription)
      * [Fund Subscription](#fund-subscription)
      * [Cancel Subscription](#cancel-subscription)
      * [Add Consumer](#add-consumer)
      * [Remove Consumer](#remove-consumer)
      * [Get Subscription Details](#get-subscription-details)
      * [Request Random Words](#request-random-words)
      * [Check Pending Request](#check-pending-request)
      * [Request Subscription Owner Transfer](#request-subscription-owner-transfer)
      * [Accept Subscription Owner Transfer](#accept-subscription-owner-transfer)
      * [Get Maximum Consumers](#get-maximum-consumers)
      * [Get Maximum Number of Words](#get-maximum-number-of-words)
      * [Get Maximum Request Confirmations](#get-maximum-request-confirmations)
      * [Get Minimum Request Confirmations](#get-minimum-request-confirmations)
      * [Get Maximum Request Gas Limit](#get-maximum-request-gas-limit)
      * [Get Commitment](#get-commitment)
      * [Get Configuration](#get-configuration)
      * [Get Type and Version](#get-type-and-version)
  * [Automation Services](#automation-services)
    * [Service alias: `automationRegistrar`](#service-alias-automationregistrar)
      * [Register Upkeep](#register-upkeep)
      * [Get Pending Request](#get-pending-request)
      * [Cancel Request](#cancel-request)
      * [Get Registration Config](#get-registration-config)
      * [Get Type And Version](#get-type-and-version-1)
    * [Service alias: `automationRegistry`](#service-alias-automationregistry)
      * [Get State](#get-state)
      * [Get Active Upkeep IDs](#get-active-upkeep-ids)
      * [Get Max Payment For Gas](#get-max-payment-for-gas)
      * [Is Paused](#is-paused)
      * [Get Upkeep](#get-upkeep)
      * [Get Min Balance For Upkeep](#get-min-balance-for-upkeep)
      * [Fund Upkeep](#fund-upkeep)
      * [Cancel Upkeep](#cancel-upkeep)
      * [Withdraw Funds](#withdraw-funds)
      * [Migrate Upkeeps](#migrate-upkeeps)
      * [Get Keeper Info](#get-keeper-info)
      * [Get Type And Version](#get-type-and-version-2)
      * [Get Upkeep Transcoder Version](#get-upkeep-transcoder-version)
  * [Functions Service](#functions-service)
    * [Service alias: `functions`](#service-alias-functions)
      * [Create subscription](#create-subscription-1)
      * [Fund subscription](#fund-subscription-1)
      * [Cancel subscription](#cancel-subscription-1)
      * [Get subscription details](#get-subscription-details-1)
      * [Request subscription owner transfer](#request-subscription-owner-transfer-1)
      * [Accept subscription owner transfer](#accept-subscription-owner-transfer-1)
      * [Add subscription consumer](#add-subscription-consumer)
      * [Remove subscription consumer](#remove-subscription-consumer)
      * [Timeout requests](#timeout-requests)
        * [Task/Subtask/CLI](#tasksubtaskcli)
        * [HRE](#hre)
      * [Estimate the cost of a request](#estimate-the-cost-of-a-request)
      * [Initialize SubscriptionManager class](#initialize-subscriptionmanager-class)
      * [Initialize ResponseListener class](#initialize-responselistener-class)
      * [Initialize SecretsManager class](#initialize-secretsmanager-class)
      * [Listen for a response for single Functions request](#listen-for-a-response-for-single-functions-request)
      * [Listen for a response for single Functions request (from transaction)](#listen-for-a-response-for-single-functions-request-from-transaction)
      * [Listen for responses](#listen-for-responses)
      * [Stop response listener](#stop-response-listener)
      * [Fetch DON public keys](#fetch-don-public-keys)
      * [Encrypt Off-Chain secrets URLs](#encrypt-off-chain-secrets-urls)
      * [Verify Off-Chain secrets URLs](#verify-off-chain-secrets-urls)
      * [Encrypt secrets](#encrypt-secrets)
      * [Upload encrypted secrets to DON](#upload-encrypted-secrets-to-don)
      * [List DON hosted encrypted secrets](#list-don-hosted-encrypted-secrets)
      * [Build DON hosted encrypted secrets reference](#build-don-hosted-encrypted-secrets-reference)
      * [Fetch Request Commitments](#fetch-request-commitments)
  * [Utilities](#utilities)
    * [Service alias: `utils`](#service-alias-utils)
      * [Get Data Feed Proxy/Registry Round ID](#get-data-feed-proxyregistry-round-id)
      * [Parse Data Feed Proxy/Registry Round ID](#parse-data-feed-proxyregistry-round-id)
      * [Transfer ETH](#transfer-eth)
      * [Create GitHub gist](#create-github-gist)
      * [Delete GitHub gist](#delete-github-gist)
      * [Build CBOR for Functions request](#build-cbor-for-functions-request)
      * [Decode HEX String](#decode-hex-string)
<!-- TOC -->

## Data Feeds Services

Chainlink [Data Feeds](https://docs.chain.link/data-feeds) are decentralized oracles that provide reliable off-chain data to smart contracts on the blockchain.
Using this service, developers can access the latest round answer and other relevant information from the Data Feeds,
enabling them to fetch real-world data in their web3 projects.

### Service alias: [`dataFeed`](src%2Ffeeds%2FdataFeed.ts)
```typescript
const dataFeed = hre.chainlink.dataFeed;
```
This section provides methods and functionalities designed to interact with the OffchainAggregator smart contract, 
which serves as the core component of Chainlink Data Feeds.

#### Get Latest Round Answer

- **Method:** getLatestRoundAnswer
- **Description:** Get the latest round answer for a Data Feed
- **Arguments:** `(dataFeedAddress: string)`
  - `dataFeedAddress`: Address of Data Feed
- **Returns:** `(roundAnswer: BigNumber)`
  - `roundAnswer`: Latest round answer for a Data Feed
- **Usage:**
  ```typescript
  const dataFeedAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const roundAnswer = await dataFeed.getLatestRoundAnswer(dataFeedAddress);
  ```

#### Get Round Answer

- **Method:** getRoundAnswer
- **Description:** Get the round answer for a Data Feed
- **Arguments:** `(dataFeedAddress: string, roundId: BigNumberish)`
  - `dataFeedAddress`: Address of Data Feed
  - `roundId`: Round ID of Data Feed
- **Returns:** `(roundAnswer: BigNumber)`
  - `roundAnswer`: Round answer for a Data Feed
- **Usage:**
  ```typescript
  const dataFeedAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const roundId = 1;
  const roundAnswer = await dataFeed.getRoundAnswer(dataFeedAddress, roundId);
  ```

#### Get Latest Round Data

- **Method:** getLatestRoundData
- **Description:** Get the latest round data for a Data Feed
- **Arguments:** `(dataFeedAddress: string)`
  - `dataFeedAddress`: Address of Data Feed
- **Returns:** `(roundData: {
  roundId: BigNumber;  
  answer: BigNumber;  
  startedAt: BigNumber;  
  updatedAt: BigNumber;  
  answeredInRound: BigNumber;  
})`
  - `roundId`: Round ID of Data Feed
  - `answer`: Round answer for a Data Feed
  - `startedAt`: Timestamp of when the round started
  - `updatedAt`: Timestamp of when the round was updated
  - `answeredInRound`: Round ID of the round in which the answer was computed
- **Usage:**
  ```typescript
  const dataFeedAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const roundData = await dataFeed.getLatestRoundData(dataFeedAddress);
  ```

#### Get Round Data

- **Method:** getRoundData
- **Description:** Get the round data for a Data Feed
- **Arguments:** `(dataFeedAddress: string, roundId: BigNumberish)`
  - `dataFeedAddress`: Address of Data Feed
  - `roundId`: Round ID of Data Feed
- **Returns:** `(roundData: {
  roundId: BigNumber;  
  answer: BigNumber;  
  startedAt: BigNumber;  
  updatedAt: BigNumber;  
  answeredInRound: BigNumber;  
})`
  - `roundId`: Round ID of Data Feed
  - `answer`: Round answer for a Data Feed
  - `startedAt`: Timestamp of when the round started
  - `updatedAt`: Timestamp of when the round was updated
  - `answeredInRound`: Round ID of the round in which the answer was computed
- **Usage:**
  ```typescript
  const dataFeedAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const roundId = 1;
  const roundData = await dataFeed.getRoundData(dataFeedAddress, roundId);
  ```

#### Get LatestRoundId

- **Method:** getLatestRoundId
- **Description:** Get the latest round ID
- **Arguments:** `(dataFeedAddress: string)`
  - `dataFeedAddress`: Address of Data Feed
  - `roundId`: Round ID of Data Feed
- **Returns:** `(roundId: BigNumber)`
  - `roundId`: Latest round ID of a Data Feed
- **Usage:**
  ```typescript
  const dataFeedAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const roundId = await dataFeed.getLatestRoundId(dataFeedAddress);
  ```

#### Get Decimals

- **Method:** getDecimals
- **Description:** Get the decimals for a Data Feed
- **Arguments:** `(dataFeedAddress: string)`
  - `dataFeedAddress`: Address of Data Feed
- **Returns:** `(decimals: number)`
  - `decimals`: Decimals for a Data Feed
- **Usage:**
  ```typescript
  const dataFeedAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const decimals = await dataFeed.getDecimals(dataFeedAddress);
  ```

#### Get Description

- **Method:** getDescription
- **Description:** Get the description for a Data Feed
- **Arguments:** `(dataFeedAddress: string)`
  - `dataFeedAddress`: Address of Data Feed
- **Returns:** `(description: string)`
  - `description`: Description for a Data Feed
- **Usage:**
  ```typescript
  const dataFeedAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const description = await dataFeed.getDescription(dataFeedAddress);
  ```

#### Get Version

- **Method:** getAggregatorVersion
- **Description:** Get the version for a Data Feed
- **Arguments:** `(dataFeedAddress: string)`
  - `dataFeedAddress`: Address of Data Feed
- **Returns:** `(version: BigNumber)`
  - `version`: Version for a Data Feed
- **Usage:**
  ```typescript
  const dataFeedAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const version = await dataFeed.getVersion(dataFeedAddress);
  ```

### Service alias: [`dataFeedProxy`](src%2Ffeeds%2FdataFeedProxy.ts)
```typescript
const dataFeedProxy = hre.chainlink.dataFeedProxy;
```
This section provides methods and functionalities designed to interact with the EACAggregatorProxy smart contract, 
which acts as a proxy for Chainlink Data Feeds.

#### Get Latest Round Answer

- **Method:** getLatestRoundAnswer
- **Description:** Get the latest round answer for a current Data Feed via proxy
- **Arguments:** `(dataFeedProxyAddress: string)`
  - `dataFeedProxyAddress`: Address of Data Feed Proxy
- **Returns:** `(roundAnswer: BigNumber)`
  - `roundAnswer`: Latest round answer for a current Data Feed via proxy
- **Usage:**
  ```typescript
  const dataFeedProxyAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const roundAnswer = await dataFeedProxy.getLatestRoundAnswer(dataFeedProxyAddress);
  ```

#### Get Round Answer

- **Method:** getRoundAnswer
- **Description:** Get round answer for a current Data Feed via proxy
- **Arguments:** `(dataFeedProxyAddress: string, roundId: BigNumberish)`
  - `dataFeedProxyAddress`: Address of Data Feed Proxy
  - `roundId`: Round ID of Data Feed Proxy
- **Returns:** `(roundAnswer: BigNumber)`
  - `roundAnswer`: Round answer for a current Data Feed via proxy
- **Usage:**
  ```typescript
  const dataFeedProxyAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const roundId = 1;
  const roundAnswer = await dataFeedProxy.getRoundAnswer(dataFeedProxyAddress, roundId);
  ```

#### Get Latest Round Data

- **Method:** getLatestRoundData
- **Description:** Get the latest round data for a current Data Feed via proxy
- **Arguments:** `(dataFeedProxyAddress: string)`
  - `dataFeedProxyAddress`: Address of Data Feed Proxy
- **Returns:** `(roundData: {
  roundId: BigNumber;  
  answer: BigNumber;  
  startedAt: BigNumber;  
  updatedAt: BigNumber;  
  answeredInRound: BigNumber;  
})`
  - `roundId`: Round ID of Data Feed Proxy
  - `answer`: Round answer for current Data Feed
  - `startedAt`: Timestamp of when the round started
  - `updatedAt`: Timestamp of when the round was updated
  - `answeredInRound`: Round ID of the round in which the answer was computed
- **Usage:**
  ```typescript
  const dataFeedProxyAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const roundData = await dataFeedProxy.getLatestRoundData(dataFeedProxyAddress);
  ```

#### Get Round Data

- **Method:** getRoundData
- **Description:** Get round data for a current Data Feed via proxy
- **Arguments:** `(dataFeedProxyAddress: string, roundId: BigNumberish)`
  - `dataFeedProxyAddress`: Address of Data Feed
  - `roundId`: Round ID of Data Feed Proxy
- **Returns:** `(roundData: {
  roundId: BigNumber;  
  answer: BigNumber;  
  startedAt: BigNumber;  
  updatedAt: BigNumber;  
  answeredInRound: BigNumber;  
})`
  - `roundId`: Round ID of Data Feed Proxy
  - `answer`: Round answer for current Data Feed
  - `startedAt`: Timestamp of when the round started
  - `updatedAt`: Timestamp of when the round was updated
  - `answeredInRound`: Round ID of the round in which the answer was computed
- **Usage:**
  ```typescript
  const dataFeedProxyAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const roundId = 1;
  const roundData = await dataFeedProxy.getRoundData(dataFeedProxyAddress, roundId);
  ```

#### Get Latest RoundId

- **Method:** getLatestRoundId
- **Description:** Get the latest round ID of a proxy
- **Arguments:** `(dataFeedProxyAddress: string)`
  - `dataFeedProxyAddress`: Address of Data Feed Proxy
- **Returns:** `(roundId: BigNumber)`
  - `roundId`: Latest round ID of a Data Feed Proxy
- **Usage:**
  ```typescript
  const dataFeedProxyAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const roundId = await dataFeedProxy.getLatestRoundId(dataFeedProxyAddress);
  ```

#### Get Decimals

- **Method:** getDecimals
- **Description:** Get decimals for current Data Feed
- **Arguments:** `(dataFeedProxyAddress: string)`
  - `dataFeedProxyAddress`: Address of Data Feed Proxy
- **Returns:** `(decimals: number)`
  - `decimals`: Decimals for a Data Feed
- **Usage:**
  ```typescript
  const dataFeedProxyAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const decimals = await dataFeedProxy.getDecimals(dataFeedProxyAddress);
  ```

#### Get Description

- **Method:** getDescription
- **Description:** Get description for a current Data Feed via proxy
- **Arguments:** `(dataFeedProxyAddress: string)`
  - `dataFeedProxyAddress`: Address of Data Feed Proxy
- **Returns:** `(description: string)`
  - `description`: Description for a Data Feed
- **Usage:**
  ```typescript
  const dataFeedProxyAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const description = await dataFeedProxy.getDescription(dataFeedProxyAddress);
  ```

#### Get Version

- **Method:** getVersion
- **Description:** Get version for a current Data Feed via proxy
- **Arguments:** `(dataFeedProxyAddress: string)`
  - `dataFeedProxyAddress`: Address of Data Feed Proxy
- **Returns:** `(version: BigNumber)`
  - `version`: Version for a Data Feed
- **Usage:**
  ```typescript
  const dataFeedProxyAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const version = await dataFeedProxy.getVersion(dataFeedProxyAddress);
  ```

#### Get Aggregator

- **Method:** getAggregator
- **Description:** Get current Data Feed address via proxy
- **Arguments:** `(dataFeedProxyAddress: string)`
  - `dataFeedProxyAddress`: Address of Data Feed Proxy
- **Returns:** `(aggregatorAddress: string)`
  - `aggregatorAddress`: Address of current Data Feed Offchain Aggregator
- **Usage:**
  ```typescript
  const dataFeedProxyAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const aggregatorAddress = await dataFeedProxy.getAggregator(dataFeedProxyAddress);
  ```

#### Get PhaseId

- **Method:** getPhaseId
- **Description:** Get current phase ID of a proxy
- **Arguments:** `(dataFeedProxyAddress: string)`
  - `dataFeedProxyAddress`: Address of Data Feed Proxy
- **Returns:** `(phaseId: BigNumber)`
  - `phaseId`: Current phase ID of a Data Feed proxy
- **Usage:**
  ```typescript
  const dataFeedProxyAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const phaseId = await dataFeedProxy.getPhaseId(dataFeedProxyAddress);
  ```

#### Get Phase Aggregators

- **Method:** getPhaseAggregators
- **Description:** Get Data Feed address related to a phase ID of a proxy
- **Arguments:** `(dataFeedProxyAddress: string, phaseId: BigNumberish)`
  - `dataFeedProxyAddress`: Address of Data Feed Proxy
  - `phaseId`: Phase ID of Data Feed Proxy
- **Returns:** `(aggregatorAddress: string)`
  - `aggregatorAddress`: Address of Data Feed Offchain Aggregator related to a phase ID of a proxy
- **Usage:**
  ```typescript
  const dataFeedProxyAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const phaseId = 1;
  const aggregatorAddress = await dataFeedProxy.getPhaseAggregators(dataFeedProxyAddress, phaseId);
  ```

### Service alias: [`feedRegistry`](src%2Ffeeds%2FfeedRegistry.ts)
```typescript
const feedRegistry = hre.chainlink.feedRegistry;
```
This section provides methods and functionalities designed to interact with the [Feed Registry](https://docs.chain.link/data-feeds/feed-registry) smart contracts,
which acts is an on-chain mapping of assets to Data Feeds.

> **Note**
>  Chainlink Feed Registry is exclusively available on the Ethereum mainnet.

#### Get Latest Round Data

- **Method:** `getLatestRoundData`
- **Description:** Get the latest round data for a specific Data Feed from the Feed Registry
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
- **Returns:** `(roundData: {
  roundId: BigNumber;  
  answer: BigNumber;  
  startedAt: BigNumber;  
  updatedAt: BigNumber;  
  answeredInRound: BigNumber;  
})`
  - `roundId`: Round ID of Data Feed
  - `answer`: Round answer for a Data Feed
  - `startedAt`: Timestamp of when the round started
  - `updatedAt`: Timestamp of when the round was updated
  - `answeredInRound`: Round ID of the round in which the answer was computed
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const roundData = await feedRegistry.getLatestRoundData(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick);
  ```

#### Get Round Data

- **Method:** `getRoundData`
- **Description:** Get the round data for a specific Data Feed from the Feed Registry based on the provided round ID
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string, roundId: BigNumberish)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `roundId`: Feed Registry Round ID
- **Returns:** `(roundData: {
  roundId: BigNumber;  
  answer: BigNumber;  
  startedAt: BigNumber;  
  updatedAt: BigNumber;  
  answeredInRound: BigNumber;  
})`
  - `roundId`: Round ID of Data Feed
  - `answer`: Round answer for a Data Feed
  - `startedAt`: Timestamp of when the round started
  - `updatedAt`: Timestamp of when the round was updated
  - `answeredInRound`: Round ID of the round in which the answer was computed
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const roundId = 1;  
  const roundData = await feedRegistry.getRoundData(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick, roundId);
  ```

#### Get Latest Round Data of Proposed Feed

- **Method:** `proposedGetLatestRoundData`
- **Description:** Get the latest round data for a proposed Data Feed from the Feed Registry
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
- **Returns:** `(roundData: {
  roundId: BigNumber;  
  answer: BigNumber;  
  startedAt: BigNumber;  
  updatedAt: BigNumber;  
  answeredInRound: BigNumber;  
})`
  - `roundId`: Round ID of Data Feed
  - `answer`: Round answer for a Data Feed
  - `startedAt`: Timestamp of when the round started
  - `updatedAt`: Timestamp of when the round was updated
  - `answeredInRound`: Round ID of the round in which the answer was computed
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const roundData = await feedRegistry.proposedGetLatestRoundData(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick);
  ```

#### Get Round Data of Proposed Feed

- **Method:** `proposedGetRoundData`
- **Description:** Get the round data for a proposed Data Feed from the Feed Registry based on the provided round ID
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string, roundId: BigNumberish)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `roundId`: Data Feed Round ID
- **Returns:** `(roundData: {
  roundId: BigNumber;  
  answer: BigNumber;  
  startedAt: BigNumber;  
  updatedAt: BigNumber;  
  answeredInRound: BigNumber;  
})`
  - `roundId`: Round ID of Data Feed
  - `answer`: Round answer for a Data Feed
  - `startedAt`: Timestamp of when the round started
  - `updatedAt`: Timestamp of when the round was updated
  - `answeredInRound`: Round ID of the round in which the answer was computed
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const roundId = 1;  
  const roundData = await feedRegistry.proposedGetRoundData(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick, roundId);
  ```

#### Get Round Feed

- **Method:** `getRoundFeed`
- **Description:** Get the Data Feed address for a specific Data Feed from the Feed Registry based on the provided round ID
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string, roundId: BigNumberish)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `roundId`: Feed Registry Round ID
- **Returns:** `(aggregatorAddress: string)`
  - `aggregatorAddress`: Address of Data Feed Offchain Aggregator
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const roundId = 1;  
  const aggregatorAddress = await feedRegistry.getRoundFeed(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick, roundId);
  ```

#### Get Feed

- **Method:** `getFeed`
- **Description:** Get current Data Feed address for a specific token pair from the Feed Registry
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
- **Returns:** `(aggregatorAddress: string)`
  - `aggregatorAddress`: Address of Data Feed Offchain Aggregator
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const aggregatorAddress = await feedRegistry.getFeed(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick);
  ```

#### Get Proposed Feed

- **Method:** `getProposedFeed`
- **Description:** Get the proposed Data Feed address for a specific token pair from the Feed Registry
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
- **Returns:** `(aggregatorAddress: string)`
  - `aggregatorAddress`: Address of Data Feed Offchain Aggregator
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const aggregatorAddress = await feedRegistry.getProposedFeed(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick);
  ```

#### Is Feed Enabled

- **Method:** `isFeedEnabled`
- **Description:** Check if a specific Data Feed is enabled in the Feed Registry
- **Arguments:** `(feedRegistryAddress: string, aggregatorAddress: string)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `aggregatorAddress`: Address of a Data Feed Offchain Aggregator
- **Returns:** `(isEnabled: boolean)`
  - `isEnabled`: Boolean value indicating if the Data Feed is enabled in the Feed Registry
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const aggregatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const isEnabled = await feedRegistry.isFeedEnabled(feedRegistryAddress, aggregatorAddress);
  ```

#### Get Previous Round ID

- **Method:** `getPreviousRoundId`
- **Description:** Get previous round ID for a specific Data Feed from the Feed Registry based on the provided round ID
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string, roundId: BigNumberish)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `roundId`: Feed Registry Round ID
- **Returns:** `(roundId: BigNumber)`
  - `roundId`: Previous round ID for a specific Data Feed from the Feed Registry based on the provided round ID
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const roundId = 1;  
  const previousRoundId = await feedRegistry.getPreviousRoundId(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick, roundId);
  ```

#### Get Next Round ID

- **Method:** `getNextRoundId`
- **Description:** Get next round ID for a specific Data Feed from the Feed Registry based on the provided round ID
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string, roundId: BigNumberish)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `roundId`: Feed Registry Round ID
- **Returns:** `(roundId: BigNumber)`
  - `roundId`: Next round ID for a specific Data Feed from the Feed Registry based on the provided round ID
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const roundId = 1;  
  const nextRoundId = await feedRegistry.getNextRoundId(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick, roundId);
  ```

#### Get Decimals

- **Method:** `getDecimals`
- **Description:** Get the decimals of a specific Data Feed from the Feed Registry
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
- **Returns:** `(decimals: number)`
  - `decimals`: Decimals of a specific Data Feed from the Feed Registry
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const decimals = await feedRegistry.getDecimals(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick);
  ```

#### Get Description

- **Method:** `getDescription`
- **Description:** Get the description of a specific Data Feed from the Feed Registry
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
- **Returns:** `(description: string)`
  - `description`: Description of a specific Data Feed from the Feed Registry
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const description = await feedRegistry.getDescription(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick);
  ```

#### Get Version

- **Method:** `getVersion`
- **Description:** Get the version of a specific Data Feed from the Feed Registry
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
- **Returns:** `(version: BigNumber)`
  - `version`: Version of a specific Data Feed from the Feed Registry
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const version = await feedRegistry.getVersion(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick);
  ```

#### Get Phase

- **Method:** `getPhase`
- **Description:** Get phase data for a specific Data Feed from the Feed Registry based on the provided phase ID
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string, phaseId: BigNumberish)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `phaseId`: Feed Registry Phase ID
- **Returns:** `(phaseData: {
  phaseId: BigNumber;  
  startingAggregatorRoundId: BigNumber;  
  endingAggregatorRoundId: BigNumber;  
})`
  - `phaseId`: Feed Registry Phase ID
  - `startingAggregatorRoundId`: Starting round ID of the phase
  - `endingAggregatorRoundId`: Ending round ID of the phase
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const phaseId = 1;  
  const phaseData = await feedRegistry.getPhase(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick, phaseId);
  ```

#### Get Phase Feed

- **Method:** `getPhaseFeed`
- **Description:** Get Data Feed address for a specific token pair from the Feed Registry based on the provided phase ID
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string, phaseId: BigNumberish)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `phaseId`: Feed Registry Phase ID
- **Returns:** `(aggregatorAddress: string)`
  - `aggregatorAddress`: Address of Data Feed Offchain Aggregator
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const phaseId = 1;  
  const aggregatorAddress = await feedRegistry.getPhaseFeed(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick, phaseId);
  ```

#### Get Phase Range

- **Method:** `getPhaseRange`
- **Description:** Get the phase range data for a specific Data Feed from the Feed Registry based on the provided phase ID
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string, phaseId: BigNumberish)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `phaseId`: Feed Registry Phase ID
- **Returns:** `(phaseRangeData: {
  startingRoundId: BigNumber;  
  endingRoundId: BigNumber;  
})`
  - `startingRoundId`: Starting round ID of the phase
  - `endingRoundId`: Ending round ID of the phase
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const phaseId = 1;  
  const phaseRangeData = await feedRegistry.getPhaseRange(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick, phaseId);
  ```

#### Get Current Phase ID

- **Method:** `getCurrentPhaseId`
- **Description:** Get current phase ID for a specific Data Feed from the Feed Registry
- **Arguments:** `(feedRegistryAddress: string, feedRegistryBaseTick: string, feedRegistryQuoteTick: string)`
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
- **Returns:** `(phaseId: BigNumber)`
  - `phaseId`: Current phase ID for a specific Data Feed from the Feed Registry
- **Usage:**
  ```typescript
  const feedRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const feedRegistryBaseTick = 'ETH';  
  const feedRegistryQuoteTick = 'USD';  
  const phaseId = await feedRegistry.getCurrentPhaseId(feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick);
  ```

### Service alias: [`l2Sequencer`](src%2Ffeeds%2Fl2FeedUptimeSequencer.ts)
```typescript
const l2Sequencer = hre.chainlink.l2Sequencer;
```
This section provides methods and functionalities designed to interact with the L2 Sequencer Uptime Feeds, 
which acts as data feeds that track the availability status of the sequencer in Layer 2 (L2) networks, specifically in optimistic rollup protocols.

> **Note**
> L2 Sequencer Uptime Feeds are available only on specific networks, 
> including Arbitrum mainnet, Arbitrum Goerli testnet, Optimism mainnet, 
> Optimism Goerli testnet, and Metis mainnet (Andromeda)

#### Is L2 Sequencer Up

- **Method:** `isL2SequencerUp`
- **Description:** Checks the availability status of the Layer 2 (L2) Sequencer using the provided address of the Layer 2 Sequencer Uptime Status Feed
- **Arguments:** `(l2SequencerAddress: string)`
  - `l2SequencerAddress`: Address of the Layer 2 Sequencer Uptime Status Feed
- **Returns:** `(isUp: boolean)`
  - `isUp`: Boolean value indicating if the Layer 2 Sequencer is up and operational
- **Usage:**
  ```typescript
  const l2SequencerAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const isUp = await l2Sequencer.isL2SequencerUp(l2SequencerAddress);
  ```

#### Get Time Since L2 Sequencer Is Up

- **Method:** `getTimeSinceL2SequencerIsUp`
- **Description:** Retrieves the time elapsed since the Layer 2 (L2) Sequencer has been up and operational, based on the provided address of the Layer 2 Sequencer Uptime Status Feed
- **Arguments:** `(l2SequencerAddress: string, gracePeriodTime: BigNumberish)`
  - `l2SequencerAddress`: Address of the Layer 2 Sequencer Uptime Status Feed
  - `gracePeriodTime`: Grace period duration in which the Sequencer is allowed to not return results
- **Returns:** `(l2SequencerData: {
  isSequencerUp: boolean;
  timeSinceUp: BigNumber;
  isGracePeriodOver: boolean;
})`
  - `isSequencerUp`: Boolean value indicating if the Layer 2 Sequencer is up and operational
  - `timeSinceUp`: Time elapsed since the Layer 2 Sequencer has been up and operational
  - `isGracePeriodOver`: Boolean value indicating if the grace period is over
- **Usage:**
  ```typescript
  const l2SequencerAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const gracePeriodTime = 3600;  
  const l2SequencerData = await l2Sequencer.getTimeSinceL2SequencerIsUp(l2SequencerAddress, gracePeriodTime);
  ```

### Service alias: [`ens`](src%2Ffeeds%2FensFeedsResolver.ts)
```typescript
const ens = hre.chainlink.ens;
```
This section provides methods and functionalities designed to interact with the [Chainlink ENS Resolver](https://docs.chain.link/data-feeds/ens).

> **Note**
>  Chainlink ENS is exclusively available on the Ethereum mainnet.

#### Resolve Aggregator Address

- **Method:** `resolveAggregatorAddress`
- **Description:** Resolve Data Feed address for a token pair using the Chainlink ENS Resolver
- **Arguments:** `(baseTick: string, quoteTick: string)`
  - `baseTick`: Base tick of the token pair
  - `quoteTick`: Quote tick of the token pair
- **Returns:** `(aggregatorAddress: string)`
  - `aggregatorAddress`: Address of Data Feed Offchain Aggregator
- **Usage:**
  ```typescript
  const baseTick = 'ETH';  
  const quoteTick = 'USD';  
  const aggregatorAddress = await ens.resolveAggregatorAddress(baseTick, quoteTick);
  ```

#### Resolve Aggregator Address With Subdomains

- **Method:** `resolveAggregatorAddressWithSubdomains`
- **Description:** Resolve Data Feed address for a token pair using the Chainlink ENS Resolver with subdomains
- **Arguments:** `(baseTick: string, quoteTick: string)`
  - `baseTick`: Base tick of the token pair
  - `quoteTick`: Quote tick of the token pair
- **Returns:** `(subdomainsData: {
  proxy: string;
  underlyingAggregator: string;
  proposedAggregator: string;
})`
  - `proxy`: Address of Data Feed Proxy
  - `underlyingAggregator`: Address of Data Feed Offchain Aggregator
  - `proposedAggregator`: Address of proposed Data Feed Offchain Aggregator
- **Usage:**
  ```typescript
  const baseTick = 'ETH';  
  const quoteTick = 'USD';  
  const subdomainsData = await ens.resolveAggregatorAddressWithSubdomains(baseTick, quoteTick);
  ```

## VRF Service

Chainlink [VRF](https://docs.chain.link/vrf/v2/introduction) (Verifiable Random Function) service is a critical component
provided by Chainlink that enables smart contracts on the blockchain to securely and transparently access cryptographically secure and unpredictable randomness.

### Service alias: [`vrf`](src%2Fvrf%2FvrfCoordinator.ts)
```typescript
const vrf = hre.chainlink.vrf;
```
This section provides methods and functionalities designed to interact with the VRF Coordinator smart contract,
which serves as the intermediary between smart contracts on the blockchain and the VRF service.

#### Create Subscription

- **Method:** createSubscription
- **Description:** Create a new subscription to the VRF service
- **Arguments:** `(vrfCoordinatorAddress: string)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
- **Returns:** `(txData: {
  subscriptionId: BigNumber;
  transactionHash: string;
})`
  - `subscriptionId`: VRF Subscription ID
  - `transactionHash`: Transaction hash of the transaction that created the subscription
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const txData = await vrf.createSubscription(vrfCoordinatorAddress);
  ```

#### Fund Subscription

- **Method:** fundSubscription
- **Description:** Fund a subscription to the VRF service with LINK tokens
- **Arguments:** `(vrfCoordinatorAddress: string, linkTokenAddress: string, amountInJuels: BigNumberish, subscriptionId: BigNumberish)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `linkTokenAddress`: Address of the LINK token contract
  - `amountInJuels`: Amount of LINK tokens to be sent (in Juels)
  - `subscriptionId`: VRF Subscription ID
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that funded the subscription
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const linkTokenAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const amountInJuels = 1000000000000000000;
  const subscriptionId = 1;
  const txData = await vrf.fundSubscription(vrfCoordinatorAddress, linkTokenAddress, amountInJuels, subscriptionId);
  ```

#### Cancel Subscription

- **Method:** cancelSubscription
- **Description:** Cancel a subscription to the VRF service and receive the remaining balance
- **Arguments:** `(vrfCoordinatorAddress: string, subscriptionId: BigNumberish, receivingAddress: string)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `subscriptionId`: VRF Subscription ID
  - `receivingAddress`: Address to receive the balance of the subscription
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that canceled the subscription
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const subscriptionId = 1;
  const receivingAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const txData = await vrf.cancelSubscription(vrfCoordinatorAddress, subscriptionId, receivingAddress);
  ```

#### Add Consumer

- **Method:** addConsumer
- **Description:** Add a new consumer to an existing VRF subscription
- **Arguments:** `(vrfCoordinatorAddress: string, consumerAddress: string, subscriptionId: BigNumberish)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `consumerAddress`: Address of the consumer
  - `subscriptionId`: VRF Subscription ID
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that added the consumer
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const consumerAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const subscriptionId = 1;
  const txData = await vrf.addConsumer(vrfCoordinatorAddress, consumerAddress, subscriptionId);
  ```

#### Remove Consumer

- **Method:** removeConsumer
- **Description:** Remove a consumer from an existing VRF subscription
- **Arguments:** `(vrfCoordinatorAddress: string, consumerAddress: string, subscriptionId: BigNumberish)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `consumerAddress`: Address of the consumer
  - `subscriptionId`: VRF Subscription ID
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that removed the consumer
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const consumerAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const subscriptionId = 1;
  const txData = await vrf.removeConsumer(vrfCoordinatorAddress, consumerAddress, subscriptionId);
  ```

#### Get Subscription Details

- **Method:** getSubscriptionDetails
- **Description:** Get details of an existing VRF subscription
- **Arguments:** `(vrfCoordinatorAddress: string, subscriptionId: BigNumberish)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `subscriptionId`: VRF Subscription ID
- **Returns:** `(vrfSubscriptionDetails: {
  balance: BigNumber;
  reqCount: BigNumber;
  owner: string;
  consumers: string[];
})`
  - `balance`: Balance of the subscription
  - `reqCount`: Number of requests made to the subscription
  - `owner`: Address of the subscription owner
  - `consumers`: List of addresses of the consumers
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const subscriptionId = 1;
  const vrfSubscriptionDetails = await vrf.getSubscriptionDetails(vrfCoordinatorAddress, subscriptionId);
  ```

#### Request Random Words

- **Method:** requestRandomWords
- **Description:** Request random words from the VRF service
- **Arguments:** `(vrfCoordinatorAddress: string, keyHash: BytesLike, subscriptionId: BigNumberish, requestConfirmations: BigNumberish, callbackGasLimit: BigNumberish, numWords: BigNumberish)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `keyHash`: Key hash related to maxGasPrice of a VRF. Different keyHashes have different gas prices
  - `subscriptionId`: VRF Subscription ID. Must be funded with the minimum subscription balance required for the selected keyHash
  - `requestConfirmations`: How many blocks you'd like the oracle to wait before responding to the request
  - `callbackGasLimit`: How much gas you allow for fulfillRandomWords callback
  - `numWords`: The number of random values you'd like to receive in fulfillRandomWords callback
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that requested the random words
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const keyHash = '0x89630569c9567e43c4fe7b1633258df9f2531b62f2352fa721cf3162ee4ecb46';
  const subscriptionId = 1;
  const requestConfirmations = 10;
  const callbackGasLimit = 2500000;
  const numWords = 3;
  const txData = await vrf.requestRandomWords(vrfCoordinatorAddress, keyHash, subscriptionId, requestConfirmations, callbackGasLimit, numWords);
  ```

#### Check Pending Request

- **Method:** isPendingRequestExists
- **Description:** Check if there is a pending request for an existing VRF subscription
- **Arguments:** `(vrfCoordinatorAddress: string, subscriptionId: BigNumberish)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `subscriptionId`: VRF Subscription ID
- **Returns:** `(isPendingRequestExists: boolean)`
  - `isPendingRequestExists`: Boolean value indicating if there is a pending request for the VRF subscription
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const subscriptionId = 1;
  const isPendingRequestExists = await vrf.isPendingRequestExists(vrfCoordinatorAddress, subscriptionId);
  ```

#### Request Subscription Owner Transfer

- **Method:** requestSubscriptionOwnerTransfer
- **Description:** Request to transfer ownership of a VRF subscription to a new owner
- **Arguments:** `(vrfCoordinatorAddress: string, subscriptionId: BigNumberish, newOwnerAddress: string)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `subscriptionId`: VRF Subscription ID
  - `newOwnerAddress`: Address of the new subscription owner
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that requested the subscription owner transfer
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const subscriptionId = 1;
  const newOwnerAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const txData = await vrf.requestSubscriptionOwnerTransfer(vrfCoordinatorAddress, subscriptionId, newOwnerAddress);
  ```

#### Accept Subscription Owner Transfer

- **Method:** acceptSubscriptionOwnerTransfer
- **Description:** Accept the transfer of ownership of a VRF subscription
- **Arguments:** `(vrfCoordinatorAddress: string, subscriptionId: BigNumberish)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `subscriptionId`: VRF Subscription ID
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that accepted the subscription owner transfer
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const subscriptionId = 1;
  const txData = await vrf.acceptSubscriptionOwnerTransfer(vrfCoordinatorAddress, subscriptionId);
  ```

#### Get Maximum Consumers

- **Method:** getMaxConsumers
- **Description:** Get the maximum number of consumers that can be added to a VRF subscription
- **Arguments:** `(vrfCoordinatorAddress: string)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
- **Returns:** `(maxConsumers: number)`
  - `maxConsumers`: Maximum number of consumers that can be added to a VRF subscription
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const maxConsumers = await vrf.getMaxConsumers(vrfCoordinatorAddress);
  ```

#### Get Maximum Number of Words

- **Method:** getMaxNumberOfWords
- **Description:** Get the maximum number of random words that can be requested from the VRF service
- **Arguments:** `(vrfCoordinatorAddress: string)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
- **Returns:** `(maxNumberOfWords: number)`
  - `maxNumberOfWords`: Maximum number of random words that can be requested from the VRF service
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const maxNumberOfWords = await vrf.getMaxNumberOfWords(vrfCoordinatorAddress);
  ```

#### Get Maximum Request Confirmations

- **Method:** getMaxRequestConfirmations
- **Description:** Get the maximum number of confirmations allowed for a VRF request
- **Arguments:** `(vrfCoordinatorAddress: string)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
- **Returns:** `(maxRequestConfirmations: number)`
  - `maxRequestConfirmations`: Maximum number of confirmations allowed for a VRF request
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const maxRequestConfirmations = await vrf.getMaxRequestConfirmations(vrfCoordinatorAddress);
  ```

#### Get Minimum Request Confirmations

- **Method:** getMinRequestConfirmations
- **Description:** Get the minimum number of confirmations required for a VRF request
- **Arguments:** `(vrfCoordinatorAddress: string)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
- **Returns:** `(minRequestConfirmations: number)`
  - `minRequestConfirmations`: Minimum number of confirmations required for a VRF request
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const minRequestConfirmations = await vrf.getMinRequestConfirmations(vrfCoordinatorAddress);
  ```

#### Get Maximum Request Gas Limit

- **Method:** getMaxRequestGasLimit
- **Description:** Get the maximum gas limit for a VRF request
- **Arguments:** `(vrfCoordinatorAddress: string)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
- **Returns:** `(maxRequestGasLimit: number)`
  - `maxRequestGasLimit`: Maximum gas limit for a VRF request
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const maxRequestGasLimit = await vrf.getMaxRequestGasLimit(vrfCoordinatorAddress);
  ```

#### Get Commitment

- **Method:** getCommitment
- **Description:** Get the commitment data for a VRF request
- **Arguments:** `(vrfCoordinatorAddress: string, requestId: BigNumberish)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `requestId`: Request ID
- **Returns:** `(commitmentData: BytesLike)`
  - `commitmentData`: Commitment data for a VRF request
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const requestId = 1;
  const commitmentData = await vrf.getCommitment(vrfCoordinatorAddress, requestId);
  ```

#### Get Configuration

- **Method:** getConfig
- **Description:** Get the configuration details of VRF Coordinator
- **Arguments:** `(vrfCoordinatorAddress: string)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
- **Returns:** `(configData: {
  minimumRequestConfirmations: number;
  maxGasLimit: number;
  stalenessSeconds: number;
  gasAfterPaymentCalculation: number;
})`
- `minimumRequestConfirmations`: Minimum number of confirmations required for a VRF request
- `maxGasLimit`: Maximum gas limit for a VRF request
- `stalenessSeconds`: Number of seconds after which a VRF request is considered stale
- `gasAfterPaymentCalculation`: Gas used in doing accounting for a VRF request after gas measurement

#### Get Type and Version

- **Method:** getTypeAndVersion
- **Description:** Get the type and version details of VRF Coordinator
- **Arguments:** `(vrfCoordinatorAddress: string)`
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
- **Returns:** `(typeAndVersion: string)`
  - `typeAndVersion`: Type and version details of VRF Coordinator
- **Usage:**
  ```typescript
  const vrfCoordinatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const typeAndVersion = await vrf.getTypeAndVersion(vrfCoordinatorAddress);
  ```

## Automation Services

Chainlink [Automation](https://docs.chain.link/vrf/v2/introduction) service enables conditional execution 
of your smart contracts functions through a hyper-reliable and decentralized automation platform.

### Service alias: [`automationRegistrar`](src%2Fautomation%2FkeepersRegistrar.ts)
```typescript
const automationRegistrar = hre.chainlink.automationRegistrar;
```
This section provides methods and functionalities designed to interact with the KeeperRegistrar smart contract.
Supported versions of Keeper Registrar are v1.2, v2.0.

#### Register Upkeep

- **Method:** registerUpkeep
- **Description:** Register an upkeep task for Chainlink Keepers to perform on a specified contract
- **Arguments:** `(keeperRegistrarAddress: string, linkTokenAddress: string, amountInJuels: BigNumberish, upkeepName: string, encryptedEmail: string, upkeepContract: string, gasLimit: BigNumberish, adminAddress: string, checkData: BytesLike, ocrConfig: BytesLike, source: BigNumberish, sender: string)`
  - `keeperRegistrarAddress`: Address of Keeper Registrar
  - `linkTokenAddress`: Address of Link Token
  - `amountInJuels`: Amount of LINK in juels to fund the upkeep
  - `upkeepName`: Upkeep name to be registered
  - `encryptedEmail`: Encrypted email address of upkeep contact
  - `upkeepContract`: Upkeep contract address to perform task on
  - `gasLimit`: Limit of gas to provide the target contract when performing upkeep
  - `adminAddress`: Address to cancel upkeep and withdraw remaining funds
  - `checkData`: Data passed to the contract when checking upkeep
  - `ocrConfig`: OffchainConfig for upkeep in bytes [Keeper Registrar v2_0 ONLY], default value: "0x"
  - `source`: ID of the application sending this request [Keeper Registrar v1_1 ONLY], default value: "0"
  - `sender`: Address of the sender making the request
- **Returns:** `(txData: {
  transactionHash: string;
  requestHash: string;
  upkeepId: BigNumber;
})`
  - `transactionHash`: Transaction hash of the transaction that registered the upkeep
  - `requestHash`: Hash of the registration request
  - `upkeepId`: Upkeep ID
- **Usage:**
  ```typescript
  const keeperRegistrarAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const linkTokenAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const amountInJuels = 1000000000000000000;
  const upkeepName = 'upkeepName';
  const encryptedEmail = '0x';
  const upkeepContract = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const gasLimit = 2500000;
  const adminAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const checkData = '0x';
  const ocrConfig = '0x';
  const source = 1;
  const sender = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const txData = await automationRegistrar.registerUpkeep(keeperRegistrarAddress, linkTokenAddress, amountInJuels, upkeepName, encryptedEmail, upkeepContract, gasLimit, adminAddress, checkData, ocrConfig, source, sender);
  ```

#### Get Pending Request

- **Method:** getPendingRequest
- **Description:** Get information about a pending registration request for an upkeep task
- **Arguments:** `(keeperRegistrarAddress: string, requestHash: BytesLike)`
  - `keeperRegistrarAddress`: Address of Keeper Registrar
  - `requestHash`: Hash of the registration request
- **Returns:** `(pendingRequestData: {
  adminAddress: string;
  balance: BigNumber;
})`
  - `adminAddress`: Address to cancel upkeep and withdraw remaining funds
  - `balance`: Balance of the upkeep
- **Usage:**
  ```typescript
  const keeperRegistrarAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const requestHash = '0x';
  const pendingRequestData = await automationRegistrar.getPendingRequest(keeperRegistrarAddress, requestHash);
  ```

#### Cancel Request

- **Method:** cancelRequest
- **Description:** Cancel a pending registration request for an upkeep task
- **Arguments:** `(keeperRegistrarAddress: string, requestHash: BytesLike)`
  - `keeperRegistrarAddress`: Address of Keeper Registrar
  - `requestHash`: Hash of the registration request
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that canceled the request
- **Usage:**
  ```typescript
  const keeperRegistrarAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const requestHash = '0x';
  const txData = await automationRegistrar.cancelRequest(keeperRegistrarAddress, requestHash);
  ```

#### Get Registration Config

- **Method:** getRegistrationConfig
- **Description:** Get the registration configuration for upkeep tasks from the Keeper Registrar
- **Arguments:** `(keeperRegistrarAddress: string)`
  - `keeperRegistrarAddress`: Address of Keeper Registrar
- **Returns:** `(registrationConfig: {
  autoApproveConfigType: number;
  autoApproveMaxAllowed: number;
  approvedCount: number;
  keeperRegistry: string;
  minLINKJuels: BigNumber;
})`
  - `autoApproveConfigType`: Auto approve configuration type
  - `autoApproveMaxAllowed`: Maximum number of upkeep tasks that can be auto approved
  - `approvedCount`: Number of upkeep tasks that have been auto approved
  - `keeperRegistry`: Address of Keeper Registry
  - `minLINKJuels`: Minimum amount of LINK in juels required to register an upkeep
- **Usage:**
  ```typescript
  const keeperRegistrarAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const registrationConfig = await automationRegistrar.getRegistrationConfig(keeperRegistrarAddress);
  ```

#### Get Type And Version

- **Method:** getTypeAndVersion
- **Description:** Get the type and version for the Keeper Registrar
- **Arguments:** `(keeperRegistrarAddress: string)`
  - `keeperRegistrarAddress`: Address of Keeper Registrar
- **Returns:** `(typeAndVersion: string)`
  - `typeAndVersion`: Type and version for the Keeper Registrar
- **Usage:**
  ```typescript
  const keeperRegistrarAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const typeAndVersion = await automationRegistrar.getTypeAndVersion(keeperRegistrarAddress);
  ```

### Service alias: [`automationRegistry`](src%2Fautomation%2FkeepersRegistry.ts)
```typescript
const automationRegistry = hre.chainlink.automationRegistry;
```
This section provides methods and functionalities designed to interact with the KeeperRegistry smart contract.
Supported versions of Keeper Registry are v1.2, v1.3, v2.0.

#### Get State

- **Method:** getState
- **Description:** Get the current state of Keeper Registry
- **Arguments:** `(keeperRegistryAddress: string)`
  - `keeperRegistryAddress`: Address of Keeper Registry
- **Returns:** `(stateData: {
  nonce: number;
  ownerLinkBalance: BigNumber;
  expectedLinkBalance: BigNumber;
  numUpkeeps: BigNumber;
  paymentPremiumPPB: number;
  flatFeeMicroLink: number;
  blockCountPerTurn: number | undefined;
  checkGasLimit: number;
  stalenessSeconds: number;
  gasCeilingMultiplier: number;
  minUpkeepSpend: BigNumber;
  maxPerformGas: number;
  fallbackGasPrice: BigNumber;
  fallbackLinkPrice: BigNumber;
  transcoder: string;
  registrar: string;
  keepers: string[] | undefined;
})`
  - `nonce`: Nonce of the Keeper Registry
  - `ownerLinkBalance`: LINK balance of the owner
  - `expectedLinkBalance`: Expected LINK balance of the owner
  - `numUpkeeps`: Number of upkeep tasks registered
  - `paymentPremiumPPB`: Payment premium rate oracles receive on top of being reimbursed for gas, measured in parts per billion
  - `flatFeeMicroLink`: Flat fee paid to oracles for performing upkeeps in micro LINK
  - `blockCountPerTurn`: Number of blocks per turn [Keeper Registry v1_2, v1_3 ONLY]
  - `checkGasLimit`: Gas limit when checking for upkeep
  - `stalenessSeconds`: Number of seconds after which a Keeper is considered stale
  - `gasCeilingMultiplier`: Multiplier for gas ceiling
  - `minUpkeepSpend`: Minimum amount of LINK in juels an upkeep must spend before cancelling
  - `maxPerformGas`: Maximum amount of gas allowed for an upkeep to perform on this registry
  - `fallbackGasPrice`: Fallback gas price
  - `fallbackLinkPrice`: Fallback LINK price
  - `transcoder`: Address of the transcoder
  - `registrar`: Address of the registrar
  - `keepers`: List of addresses of the keepers [Keeper Registry v2_0 ONLY]
- **Usage:**
  ```typescript
  const keeperRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const stateData = await automationRegistry.getState(keeperRegistryAddress);
  ```

#### Get Active Upkeep IDs

- **Method:** getActiveUpkeepIDs
- **Description:** Get a list of active upkeep IDs from Keeper Registry
- **Arguments:** `(keeperRegistryAddress: string, startIndex: BigNumberish, maxCount: BigNumberish)`
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `startIndex`: Starting index of Upkeeps to get
  - `maxCount`: Quantity of Upkeeps to get
- **Returns:** `(activeUpkeepIds: BigNumber[])`
  - `activeUpkeepIds`: List of active upkeep IDs
- **Usage:**
  ```typescript
  const keeperRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const startIndex = 0;
  const maxCount = 10;
  const activeUpkeepIds = await automationRegistry.getActiveUpkeepIDs(keeperRegistryAddress, startIndex, maxCount);
  ```

#### Get Max Payment For Gas

- **Method:** getMaxPaymentForGas
- **Description:** Get maximum payment for the gas limit, calculated using the Keeper Registry parameters
- **Arguments:** `(keeperRegistryAddress: string, gasLimit: BigNumberish)`
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `gasLimit`: Gas limit
- **Returns:** `(maxPaymentForGas: BigNumber)`
  - `maxPaymentForGas`: Maximum payment for a given gas limit
- **Usage:**
  ```typescript
  const keeperRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const gasLimit = 2500000;
  const maxPaymentForGas = await automationRegistry.getMaxPaymentForGas(keeperRegistryAddress, gasLimit);
  ```

#### Is Paused

- **Method:** isPaused
- **Description:** Check if the Keeper Registry is currently paused
- **Arguments:** `(keeperRegistryAddress: string)`
  - `keeperRegistryAddress`: Address of Keeper Registry
- **Returns:** `(isPaused: boolean)`
  - `isPaused`: Boolean value indicating if the Keeper Registry is currently paused
- **Usage:**
  ```typescript
  const keeperRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const isPaused = await automationRegistry.isPaused(keeperRegistryAddress);
  ```

#### Get Upkeep

- **Method:** getUpkeep
- **Description:** Get information about a specific upkeep from the Keeper Registry
- **Arguments:** `(keeperRegistryAddress: string, upkeepId: BigNumberish)`
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `upkeepId`: Upkeep ID
- **Returns:** `(upkeepData: {
  target: string;
  executeGas: number;
  checkData: BytesLike;
  balance: BigNumber;
  lastKeeper: string | undefined;
  admin: string;
  maxValidBlocknumber: BigNumber;
  amountSpent: BigNumber;
})`
  - `target`: Address of the contract to perform upkeep on
  - `executeGas`: Gas limit to provide the target contract when performing upkeep
  - `checkData`: Data passed to the contract when checking upkeep
  - `balance`: Balance of the upkeep
  - `lastKeeper`: Keeper which last performs the upkeep [Keeper Registry v1_2, v1_3 ONLY]
  - `admin`: Address of upkeep admin
  - `maxValidBlocknumber`: Maximum block number for the upkeep to be performed
  - `amountSpent`: Amount of LINK in juels spent on the upkeep
- **Usage:**
  ```typescript
  const keeperRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const upkeepId = 1;
  const upkeepData = await automationRegistry.getUpkeep(keeperRegistryAddress, upkeepId);
  ```

#### Get Min Balance For Upkeep

- **Method:** getMinBalanceForUpkeep
- **Description:** Get the minimum required balance for upkeep from the Keeper Registry
- **Arguments:** `(keeperRegistryAddress: string, upkeepId: BigNumberish)`
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `upkeepId`: Upkeep ID
- **Returns:** `(minBalanceForUpkeep: BigNumber)`
  - `minBalanceForUpkeep`: Minimum required balance for upkeep
- **Usage:**
  ```typescript
  const keeperRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const upkeepId = 1;
  const minBalanceForUpkeep = await automationRegistry.getMinBalanceForUpkeep(keeperRegistryAddress, upkeepId);
  ```

#### Fund Upkeep

- **Method:** fundUpkeep
- **Description:** Fund an upkeep task with a specified amount of LINK in Juels
- **Arguments:** `(keeperRegistryAddress: string, upkeepId: BigNumberish, amountInJuels: BigNumberish)`
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `upkeepId`: Upkeep ID
  - `amountInJuels`: Amount of LINK in Juels to fund upkeep
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that funded the upkeep
- **Usage:**
  ```typescript
  const keeperRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const upkeepId = 1;
  const amountInJuels = 1000000000000000000;
  const txData = await automationRegistry.fundUpkeep(keeperRegistryAddress, upkeepId, amountInJuels);
  ```

#### Cancel Upkeep

- **Method:** cancelUpkeep
- **Description:** Cancel an upkeep task in Keeper Registry
- **Arguments:** `(keeperRegistryAddress: string, upkeepId: BigNumberish)`
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `upkeepId`: Upkeep ID
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that canceled the upkeep
- **Usage:**
  ```typescript
  const keeperRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const upkeepId = 1;
  const txData = await automationRegistry.cancelUpkeep(keeperRegistryAddress, upkeepId);
  ```

#### Withdraw Funds

- **Method:** withdrawFunds
- **Description:** Withdraw funds from an upkeep task in Keeper Registry
- **Arguments:** `(keeperRegistryAddress: string, upkeepId: BigNumberish, receivingAddress: string)`
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `upkeepId`: Upkeep ID
  - `receivingAddress`: Address to withdraw funds
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that withdrew the funds
- **Usage:**
  ```typescript
  const keeperRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const upkeepId = 1;
  const receivingAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const txData = await automationRegistry.withdrawFunds(keeperRegistryAddress, upkeepId, receivingAddress);
  ```

#### Migrate Upkeeps

- **Method:** migrateUpkeeps
- **Description:** Migrate multiple upkeep tasks to another Keeper Registry
- **Arguments:** `(keeperRegistryAddress: string, upkeepIds: BigNumberish[], destination: string)`
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `upkeepIds`: Upkeep IDs to migrate
  - `destination`: Address of destination Keeper Registry
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that migrated the upkeeps
- **Usage:**
  ```typescript
  const keeperRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const upkeepIds = [1, 2, 3];
  const destination = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const txData = await automationRegistry.migrateUpkeeps(keeperRegistryAddress, upkeepIds, destination);
  ```

#### Get Keeper Info

- **Method:** getKeeperInfo
- **Description:** Get information about a specific keeper from Keeper Registry
- **Arguments:** `(keeperRegistryAddress: string, keeperAddress: string)`
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `keeperAddress`: Keeper address
- **Returns:** `(keeperInfo: {
  payee: string;
  active: boolean;
  balance: BigNumber;
})`
  - `payee`: Address of the payee
  - `active`: Boolean value indicating if the keeper is active
  - `balance`: Balance of the keeper
- **Usage:**
  ```typescript
  const keeperRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const keeperAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const keeperInfo = await automationRegistry.getKeeperInfo(keeperRegistryAddress, keeperAddress);
  ```

#### Get Type And Version

- **Method:** getTypeAndVersion
- **Description:** Get the type and version for Keeper Registry
- **Arguments:** `(keeperRegistryAddress: string)`
  - `keeperRegistryAddress`: Address of Keeper Registry
- **Returns:** `(typeAndVersion: string)`
  - `typeAndVersion`: Type and version for Keeper Registry
- **Usage:**
  ```typescript
  const keeperRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const typeAndVersion = await automationRegistry.getTypeAndVersion(keeperRegistryAddress);
  ```

#### Get Upkeep Transcoder Version

- **Method:** getUpkeepTranscoderVersion
- **Description:** Get the upkeep transcoder version from Keeper Registry
- **Arguments:** `(keeperRegistryAddress: string)`
  - `keeperRegistryAddress`: Address of Keeper Registry
- **Returns:** `(upkeepTranscoderVersion: string)`
  - `upkeepTranscoderVersion`: Upkeep transcoder version from Keeper Registry
- **Usage:**
  ```typescript
  const keeperRegistryAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const upkeepTranscoderVersion = await automationRegistry.getUpkeepTranscoderVersion(keeperRegistryAddress);
  ```

## Functions Service

Chainlink [Functions](https://docs.chain.link/chainlink-functions) service provides your smart contracts access to 
trust-minimized compute infrastructure, allowing you to fetch data from APIs and perform custom computation.

> **Note**  
> Most of the methods under this section are thin wrappers for the methods provided by 
> the [functions-toolkit](https://github.com/smartcontractkit/functions-toolkit) NPM package.

### Service alias: [`functions`](src%2Ffunctions%2Findex.ts)
```typescript
const functions = hre.chainlink.functions;
```
This section provides methods and functionalities designed to interact with the Functions service.

#### Create subscription

- **Method:** createSubscription
- **Description:** Create Functions subscription
- **Arguments:** `(functionsRouterAddress: string, consumerAddress: string)`
  - `functionsRouterAddress`: Address of Functions Router
  - `consumerAddress`: Address of Functions Consumer (Default: "")
- **Returns:** `(subscriptionId: BigNumber)`
  - `subscriptionId`: Subscription ID
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const consumerAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const subscriptionId = await functions.createSubscription(functionsRouterAddress, consumerAddress);
  ```

#### Fund subscription

- **Method:** fundSubscription
- **Description:** Fund Functions subscription
- **Arguments:** `(functionsRouterAddress: string, linkTokenAddress: string, amountInJuels: BigNumberish, subscriptionId: BigNumberish)`
  - `functionsRouterAddress`: Address of Functions Router
  - `linkTokenAddress`: Address of Link Token
  - `amountInJuels`: Amount of LINK in Juels to fund Subscription
  - `subscriptionId`: Subscription ID
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that funded the subscription
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const linkTokenAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const amountInJuels = 1000000000000000000;
  const subscriptionId = 1;
  const txData = await functions.fundSubscription(functionsRouterAddress, linkTokenAddress, amountInJuels, subscriptionId);
  ```

#### Cancel subscription

- **Method:** cancelSubscription
- **Description:** Cancel Functions subscription
- **Arguments:** `(functionsRouterAddress: string, subscriptionId: BigNumberish, receivingAddress: string)`
  - `functionsRouterAddress`: Address of Functions Router
  - `subscriptionId`: Subscription ID
  - `receivingAddress`: Address to receive the balance of Subscription (Default: "")
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that canceled the subscription
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const subscriptionId = 1;
  const receivingAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const txData = await functions.cancelSubscription(functionsRouterAddress, subscriptionId, receivingAddress);
  ```

#### Get subscription details

- **Method:** getSubscriptionDetails
- **Description:** Get subscription details
- **Arguments:** `(functionsRouterAddress: string, subscriptionId: BigNumberish)`
  - `functionsRouterAddress`: Address of Functions Router
  - `subscriptionId`: Subscription ID
- **Returns:** `(subscriptionDetails: {
  balance: BigNumber;
  owner: string;
  blockedBalance: BigNumber;
  proposedOwner: string;
  consumers: string[];
  flags: string;
})`
  - `balance`: Balance of the subscription
  - `owner`: Address of the subscription owner
  - `blockedBalance`: Blocked balance of the subscription
  - `proposedOwner`: Address of the proposed subscription owner
  - `consumers`: List of addresses of the consumers
  - `flags`: Subscription flags
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const subscriptionId = 1;
  const subscriptionDetails = await functions.getSubscriptionDetails(functionsRouterAddress, subscriptionId);
  ```

#### Request subscription owner transfer

- **Method:** requestSubscriptionOwnerTransfer
- **Description:** Request subscription owner transfer
- **Arguments:** `(functionsRouterAddress: string, subscriptionId: BigNumberish, newOwnerAddress: string)`
  - `functionsRouterAddress`: Address of Functions Router
  - `subscriptionId`: Subscription ID
  - `newOwnerAddress`: Address of new owner of Subscription
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that requested the subscription owner transfer
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const subscriptionId = 1;
  const newOwnerAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const txData = await functions.requestSubscriptionOwnerTransfer(functionsRouterAddress, subscriptionId, newOwnerAddress);
  ```

#### Accept subscription owner transfer

- **Method:** acceptSubscriptionOwnerTransfer
- **Description:** Accept subscription owner transfer
- **Arguments:** `(functionsRouterAddress: string, subscriptionId: BigNumberish)`
  - `functionsRouterAddress`: Address of Functions Router
  - `subscriptionId`: Subscription ID
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that accepted the subscription owner transfer
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const subscriptionId = 1;
  const txData = await functions.acceptSubscriptionOwnerTransfer(functionsRouterAddress, subscriptionId);
  ```

#### Add subscription consumer

- **Method:** addConsumer
- **Description:** Add subscription consumer
- **Arguments:** `(functionsRouterAddress: string, consumerAddress: string, subscriptionId: BigNumberish)`
  - `functionsRouterAddress`: Address of Functions Router
  - `consumerAddress`: Address of Functions Consumer
  - `subscriptionId`: Subscription ID
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that added the consumer
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const consumerAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const subscriptionId = 1;
  const txData = await functions.addConsumer(functionsRouterAddress, consumerAddress, subscriptionId);
  ```

#### Remove subscription consumer

- **Method:** removeConsumer
- **Description:** Remove subscription consumer
- **Arguments:** `(functionsRouterAddress: string, consumerAddress: string, subscriptionId: BigNumberish)`
  - `functionsRouterAddress`: Address of Functions Router
  - `consumerAddress`: Address of Functions Consumer
  - `subscriptionId`: Subscription ID
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that removed the consumer
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const consumerAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const subscriptionId = 1;
  const txData = await functions.removeConsumer(functionsRouterAddress, consumerAddress, subscriptionId);
  ```

#### Timeout requests

##### Task/Subtask/CLI
- **Method:** timeoutRequests
- **Description:** Timeout pending Functions request
- **Arguments:** `(functionsRouterAddress: string, requestIdsString: string, donId: string, toBlock: string, pastBlocksToSearch: string)`
  - `functionsRouterAddress`: Address of Functions Router
  - `requestIdsString`: Comma-separated requests IDs
  - `donId`: ID of the DON where Functions requests has been sent
  - `toBlock`: End block in search range (Default: "latest")
  - `pastBlocksToSearch`: Number of blocks to search (before toBlock) (Default: "1000")
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that timed out the requests

##### HRE
- **Method:** timeoutRequests
- **Description:** Timeout pending Functions request
- **Arguments:** `(functionsRouterAddress: string, requestCommitments: RequestCommitment[])`
  - `functionsRouterAddress`: Address of Functions Router
  - `requestCommitments`: Array of RequestCommitment objects
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that timed out the requests
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const requestCommitments = [];
  const txData = await functions.timeoutRequests(functionsRouterAddress, requestCommitments);
  ```

#### Estimate the cost of a request
- **Method:** estimateRequestCost
- **Description:** Estimate the cost of a request
- **Arguments:** `(functionsRouterAddress: string, donId: string, subscriptionId: BigNumberish, callbackGasLimit: number, gasPriceWei: BigNumberish)`
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to which the Functions request will be sent
  - `subscriptionId`: Subscription ID
  - `callbackGasLimit`: Total gas used by the consumer contract's callback
  - `gasPriceWei`: Gas price in wei
- **Returns:** `(requestCost: BigInt)`
  - `requestCost`: Cost of the request
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const donId = '1';
  const subscriptionId = 1;
  const callbackGasLimit = 2500000;
  const gasPriceWei = 1000000000;
  const requestCost = await functions.estimateRequestCost(functionsRouterAddress, donId, subscriptionId, callbackGasLimit, gasPriceWei);
  ```

> **Note**
> The following are methods that are available only in HRE

#### Initialize SubscriptionManager class
- **Method:** initializeSubscriptionManager
- **Description:** Initialize [SubscriptionManager class](https://github.com/smartcontractkit/functions-toolkit#functions-billing-subscription-management)
- **Arguments:** `(functionsRouterAddress: string, linkTokenAddress: string)`
  - `functionsRouterAddress`: Address of Functions Router
  - `linkTokenAddress`: Address of Link Token
- **Returns:** `(subscriptionManager: FunctionsSubscriptionManager)`
  - `subscriptionManager`: SubscriptionManager class instance
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const linkTokenAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const subscriptionManager = await functions.initializeSubscriptionManager(functionsRouterAddress, linkTokenAddress);
  ```

#### Initialize ResponseListener class
- **Method:** initializeResponseListener
- **Description:** Initialize [ResponseListener class](https://github.com/smartcontractkit/functions-toolkit#functions-response-listener)
- **Arguments:** `(functionsRouterAddress: string)`
  - `functionsRouterAddress`: Address of Functions Router
- **Returns:** `(responseListener: FunctionsResponseListener)`
  - `responseListener`: ResponseListener class instance
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const responseListener = await functions.initializeResponseListener(functionsRouterAddress);
  ```

#### Initialize SecretsManager class
- **Method:** initializeSecretsManager
- **Description:** Initialize [SecretsManager class](https://github.com/smartcontractkit/functions-toolkit#functions-encrypted-secrets-management)
- **Arguments:** `(functionsRouterAddress: string, donId: string)`
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to work with
- **Returns:** `(secretsManager: FunctionsSecretsManager)`
  - `secretsManager`: SecretsManager class instance
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const donId = '1';
  const secretsManager = await functions.initializeSecretsManager(functionsRouterAddress, donId);
  ```

#### Listen for a response for single Functions request
- **Method:** listenForResponse
- **Description:** Listen for a response for single Functions request
- **Arguments:** `(functionsRouterAddress: string, requestId: BigNumberish, timeout: number)`
  - `functionsRouterAddress`: Address of Functions Router
  - `requestId`: Request ID
  - `timeout`: Subscription ID (Default: 300_000)
- **Returns:** `(response: FunctionsResponse)`
  - `response`: Response of the request
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const requestId = 1;
  const timeout = 300000;
  const response = await functions.listenForResponse(functionsRouterAddress, requestId, timeout);
  ```

#### Listen for a response for single Functions request (from transaction)
- **Method:** listenForResponseFromTransaction
- **Description:** Listen for a response for single Functions request (from transaction)
- **Arguments:** `(functionsRouterAddress: string, transactionHash: string, timeout: number, confirmations: number, checkInterval: number)`
  - `functionsRouterAddress`: Address of Functions Router
  - `transactionHash`: Transaction hash to start listen from
  - `timeout`: Listener timeout (Default: 300000)
  - `confirmations`: Number of block confirmations (Default: 2)
  - `checkInterval`: Frequency of checking for a response to appear on-chain (Default: 2000)
- **Returns:** `(response: FunctionsResponse)`
  - `response`: Response of the request
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const transactionHash = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const timeout = 300000;
  const confirmations = 2;
  const checkInterval = 2000;
  const response = await functions.listenForResponseFromTransaction(functionsRouterAddress, transactionHash, timeout, confirmations, checkInterval);
  ```

#### Listen for responses
- **Method:** listenForResponses
- **Description:** Listen for multiple Functions responses
- **Arguments:** `(functionsRouterAddress: string, subscriptionId: BigNumberish, callback: (response: FunctionsResponse) => any)`
  - `functionsRouterAddress`: Address of Functions Router
  - `subscriptionId`: Subscription ID
  - `callback`: Callback to be called when responses are fulfilled
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const subscriptionId = 1;
  const callback = (response: FunctionsResponse) => {
    console.log(response);
  };
  await functions.listenForResponses(functionsRouterAddress, subscriptionId, callback);
  ```

#### Stop response listener
- **Method:** stopListeningForResponses
- **Description:** Stop response listener
- **Arguments:** `(functionsRouterAddress: string)`
  - `functionsRouterAddress`: Address of Functions Router
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  await functions.stopListeningForResponses(functionsRouterAddress);
  ```

#### Fetch DON public keys
- **Method:** fetchKeys
- **Description:** Fetch DON public keys
- **Arguments:** `(functionsRouterAddress: string, donId: string)`
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to fetch keys from
- **Returns:** `(keys: {
  thresholdPublicKey: ThresholdPublicKey;
  donPublicKey: string;
})`
  - `thresholdPublicKey`: Threshold public key
  - `donPublicKey`: DON public key
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const donId = '1';
  const keys = await functions.fetchKeys(functionsRouterAddress, donId);
  ```

#### Encrypt Off-Chain secrets URLs
- **Method:** encryptSecretsUrls
- **Description:** Encrypt Off-Chain Secrets URLs with DON public key to produce encryptedSecretsReference
- **Arguments:** `(functionsRouterAddress: string, donId: string, secretsUrls: string[])`
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to fetch keys from
  - `secretsUrls`: URLs of secrets
- **Returns:** `(encryptedSecretsReference: string)`
  - `encryptedSecretsReference`: HEX string of encrypted secrets
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const donId = '1';
  const secretsUrls = ['https://gist.github.com/username/secret'];
  const encryptedSecretsReference = await functions.encryptSecretsUrls(functionsRouterAddress, donId, secretsUrls);
  ```

#### Verify Off-Chain secrets URLs
- **Method:** verifyOffchainSecrets
- **Description:** Verify if provided Gists secret URLs are valid
- **Arguments:** `(functionsRouterAddress: string, donId: string, secretsUrls: string[])`
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to fetch keys from
  - `secretsUrls`: URLs of secrets
- **Returns:** `(isValid: boolean)`
  - `isValid`: True if all secrets URLs are valid
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const donId = '1';
  const secretsUrls = ['https://gist.github.com/username/secret'];
  const isValid = await functions.verifyOffchainSecrets(functionsRouterAddress, donId, secretsUrls);
  ```

#### Encrypt secrets
- **Method:** encryptSecrets
- **Description:** Encrypt secrets with DON public key to produce encryptedSecretsHexstring
- **Arguments:** `(functionsRouterAddress: string, donId: string, secrets: string)`
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to work with
  - `secrets`: String key/value pairs of secrets
- **Returns:** `(encryptedSecretsData: {
  encryptedSecrets: string;
})`
  - `encryptedSecrets`: HEX string of encrypted secrets
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const donId = '1';
  const secrets = {'test': 'test'};
  const encryptedSecretsData = await functions.encryptSecrets(functionsRouterAddress, donId, secrets);
  ```

#### Upload encrypted secrets to DON
- **Method:** uploadEncryptedSecretsToDON
- **Description:** Upload encrypted secrets to DON
- **Arguments:** `(functionsRouterAddress: string, donId: string, encryptedSecretsHexstring: string, gatewayUrls: string[], slotId: number, minutesUntilExpiration: number)`
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to work with
  - `encryptedSecretsHexstring`: HEX string of encrypted secrets. Result of encryptSecrets() method
  - `gatewayUrls`: DON gateway URLs
  - `slotId`: Storage slot ID, can be any integer value of zero or greater
  - `minutesUntilExpiration`: Minutes after secrets will be deleted from all DON nodes
- **Returns:** `(uploadDetails: {
  version: number;
  success: boolean;
})`
  - `version`: Version of the uploaded secrets
  - `success`: True if secrets were uploaded successfully
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const donId = '1';
  const encryptedSecretsHexstring = '0x89630569c9567e43c4fe7b1633258df9f2531b62f2352fa721cf3162ee4ecb46';
  const gatewayUrls = ['https://gateway.don.dev'];
  const slotId = 1;
  const minutesUntilExpiration = 60;
  const uploadDetails = await functions.uploadEncryptedSecretsToDON(functionsRouterAddress, donId, encryptedSecretsHexstring, gatewayUrls, slotId, minutesUntilExpiration);
  ```

#### List DON hosted encrypted secrets
- **Method:** listDONHostedEncryptedSecrets
- **Description:** Get list of DON hosted encrypted secrets
- **Arguments:** `(functionsRouterAddress: string, donId: string, gatewayUrls: string[])`
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to work with
  - `gatewayUrls`: DON gateway URLs
- **Returns:** `(secretsList: {
  result: GatewayResponse;
  error?: string;
})`
  - `result`: Gateway response 
  - `error`: Error message
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const donId = '1';
  const gatewayUrls = ['https://gateway.don.dev'];
  const secretsList = await functions.listDONHostedEncryptedSecrets(functionsRouterAddress, donId, gatewayUrls);
  ```

#### Build DON hosted encrypted secrets reference
- **Method:** buildDONHostedEncryptedSecretsReference
- **Description:** Build DON hosted encrypted secrets reference (encryptedSecretsReference)
- **Arguments:** `(functionsRouterAddress: string, donId: string, slotId: number, version: number)`
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to work with
  - `slotId`: Storage slot ID, can be any integer value of zero or greater
  - `version`: Reference version, any integer value of zero or greater
- **Returns:** `(encryptedSecretsReference: string)`
  - `encryptedSecretsReference`: HEX string of encrypted secrets reference
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const donId = '1';
  const slotId = 1;
  const version = 1;
  const encryptedSecretsReference = await functions.buildDONHostedEncryptedSecretsReference(functionsRouterAddress, donId, slotId, version);
  ```

#### Fetch Request Commitments
- **Method:** fetchRequestCommitment
- **Description:** Fetch Commitments for Function request
- **Arguments:** `(functionsRouterAddress: string, donId: string, requestId: string, toBlock: number, pastBlocksToSearch: number)`
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to work with
  - `requestId`: Request ID
  - `toBlock`: Ending block number to search for the request commitment
  - `pastBlocksToSearch`: Number of blocks from the ending block to search for the request commitment
- **Returns:** `(requestCommitment: RequestCommitment)`
  - `requestCommitment`: RequestCommitment object
- **Usage:**
  ```typescript
  const functionsRouterAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';  
  const donId = '1';
  const requestId = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const toBlock = 1000000;
  const pastBlocksToSearch = 1000;
  const requestCommitment = await functions.fetchRequestCommitment(functionsRouterAddress, donId, requestId, toBlock, pastBlocksToSearch);
  ```

## Utilities

The plugin utility methods.

### Service alias: [`utils`](src%2Futils%2Findex.ts)
```typescript
const utils = hre.chainlink.utils;
```

#### Get Data Feed Proxy/Registry Round ID

- **Method:** getRoundId
- **Description:** Obtain the Data Feed Proxy/Registry round ID using the provided phase ID and aggregator round ID
- **Arguments:** `(phaseId: BigNumberish, aggregatorRoundId: BigNumberish)`
  - `phaseId`: Data Feed Proxy/Registry phase ID
  - `aggregatorRoundId`: Data Feed round ID
- **Returns:** `(roundId: BigNumber)`
  - `roundId`: Data Feed Proxy/Registry round ID
- **Usage:**
  ```typescript
  const phaseId = 1;
  const aggregatorRoundId = 1;
  const roundId = await utils.getRoundId(phaseId, aggregatorRoundId);
  ```

#### Parse Data Feed Proxy/Registry Round ID

- **Method:** parseRoundId
- **Description:** Parse the given Data Feed Proxy/Registry round ID to extract relevant information
- **Arguments:** `(roundId: BigNumberish)`
  - `roundId`: Data Feed Proxy/Registry round ID
- **Returns:** `(roundIdData: {
  phaseId: BigNumber;
  aggregatorRoundId: BigNumber;
})`
  - `phaseId`: Data Feed Proxy/Registry phase ID
  - `aggregatorRoundId`: Data Feed round ID
- **Usage:**
  ```typescript
  const roundId = 1;
  const roundIdData = await utils.parseRoundId(roundId);
  ```

#### Transfer ETH

- **Method:** transferETH
- **Description:** Transfer ETH to recipient
- **Arguments:** `(recipient: string, amount: BigNumberish)`
  - `recipient`: Recipient address
  - `amount`: Amount of ETH in wei
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that transferred ETH
- **Usage:**
  ```typescript
  const recipient = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const amount = 1000000000000000000;
  const txData = await utils.transferETH(recipient, amount);
  ```

#### Create GitHub gist

- **Method:** createGist
- **Description:** Create private GitHub gist
- **Arguments:** `(githubApiToken: string, content: string)`
  - `githubApiToken`: GitHub API token
  - `content`: Gist content
- **Returns:** `(gistId: string)`
  - `gistId`: Gist ID
- **Usage:**
  ```typescript
  const githubApiToken = '8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const content = 'test';
  const gistId = await utils.createGist(githubApiToken, content);
  ```

#### Delete GitHub gist

- **Method:** deleteGist
- **Description:** Delete private GitHub gist
- **Arguments:** `(githubApiToken: string, gistURL: string)`
  - `githubApiToken`: GitHub API token
  - `gistURL`: Gist URL
- **Returns:** `(success: boolean)`
  - `success`: True if gist was deleted successfully
- **Usage:**
  ```typescript
  const githubApiToken = '8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const gistURL = 'https://gist.github.com/username/secret';
  const success = await utils.deleteGist(githubApiToken, gistURL);
  ```

> **Note**
> The following are methods that are available only in HRE

#### Build CBOR for Functions request

- **Method:** buildFunctionsRequestCBOR
- **Description:** Build CBOR for Functions request
- **Arguments:** `(codeLocation: number, codeLanguage: number, source: string, secretsLocation: number, encryptedSecretsReference: string, args: string[], bytesArgs: string[])`
  - `codeLocation`: Inline = 0 | Remote = 1 | DONHosted = 2
  - `codeLanguage`: JavaScript = 0
  - `source`: Functions request source code
  - `secretsLocation`: Inline = 0 | Remote = 1 | DONHosted = 2
  - `encryptedSecretsReference`: HEX string, result of buildDONHostedEncryptedSecretsReference method
  - `args`: Functions request args
  - `bytesArgs`: Functions request bytes args
- **Returns:** `(cbor: string)`
  - `cbor`: HEX string of CBOR
- **Usage:**
  ```typescript
  const codeLocation = 0;
  const codeLanguage = 0;
  const source = 'return true;';
  const secretsLocation = 0;
  const encryptedSecretsReference = '0x89630569c9567e43c4fe7b1633258df9f2531b62f2352fa721cf3162ee4ecb46';
  const args = [];
  const bytesArgs = [];
  const cbor = await utils.buildFunctionsRequestCBOR(codeLocation, codeLanguage, source, secretsLocation, encryptedSecretsReference, args, bytesArgs);
  ```

#### Decode HEX String

- **Method:** decodeHexString
- **Description:** Decode HEX String
- **Arguments:** `(resultHexString: string, expectedReturnType: ReturnType)`
  - `resultHexString`: HEX string to decode
  - `expectedReturnType`: ReturnType
- **Returns:** `(result: DecodedResult)`
  - `result`: Decoded result
- **Usage:**
  ```typescript
  const resultHexString = '0x89630569c9567e43c4fe7b1633258df9f2531b62f2352fa721cf3162ee4ecb46';
  const expectedReturnType = ReturnType.string;
  const result = await utils.decodeHexString(resultHexString, expectedReturnType);
  ```
