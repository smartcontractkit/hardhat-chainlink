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

## Denominations library

This plugin comes up with the predefined [Denominations library](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/Denominations.sol). This library is available for you to fetch currency identifiers that lack a canonical Ethereum address.

#### Example

```typescript
import { chainlink } from "hardhat";

const ethDenomination = chainlink.denominations.ETH; // 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
const usdDenomination = chainlink.denominations.USD; // 0x0000000000000000000000000000000000000348
```

Here is the list of all available currency identifiers available in the Denominations library:

<table>
  <thead>
    <th colspan="5">Currency identifiers</th>
  </thead>
  <tbody>
    <tr>
      <td>
        ETH<br/>
        BTC<br/>
        USD<br/>
        GBP<br/>
        EUR<br/>
      </td>
      <td>
        JPY<br/>
        KRW<br/>
        CNY<br/>
        AUD<br/>
        CAD<br/>
      </td>
      <td>
        CHF<br/>
        ARS<br/>
        PHP<br/>
        NZD<br/>
        SGD<br/>
      </td>
      <td>
        NGN<br/>
        ZAR<br/>
        RUB<br/>
        INR<br/>
        BRL<br/>
      </td>
    </tr>
  </tbody>
</table>

## Chainlink Functions

Chainlink Functions provides your smart contracts with access to a trust-minimized compute infrastructure. Your smart contract sends your code to a Decentralized Oracle Network (DON), and each DON’s oracle will run the same code in a serverless environment. Finally, the DON aggregates all the independent runs and returns the final result to your smart contract. Your code can be anything from a simple computation to fetching data from API providers.

Chainlink Functions do not require your consumer contracts to hold LINK tokens and send them to oracles when making requests. Instead, you must create a subscription account and fund it to pre-pay for your Chainlink Functions requests.

### Tasks

Run `npx hardhat` to see the full list of tasks. Run a specific task without arguments to see the expected arguments.

|Task name                          |Description                              |
|-----------------------------------|-----------------------------------------|
|`chainlink:functions-deploy-consumer-contract`|Deploys FunctionsConsumer contract |
|`chainlink:functions-generate-consumer-contract`| Generates a new `FunctionsConsumer.sol` contract in your `contracts` directory |
|`chainlink:functions-get-subscription-info`|Retrieve Functions subscription info |
|`chainlink:functions-simulate-request`|Simulates an end-to-end fulfillment locally for the FunctionsConsumer contract |
|`chainlink:functions-add-subscription-consumer`|Authorize a client contract address to consumer the subscription |
|`chainlink:functions-cancel-subscription`| Cancels a subscription and refunds to a specified address |
|`chainlink:functions-create-subscription`| Creates a new subscription |
|`chainlink:functions-fund-subscription` | Funds an existing subscription with the given amount of LINK |

### functionsGetSubscriptionInfo

Returns the Chainlink Functions Subscription details.

```typescript
public async functionsGetSubscriptionInfo(
    registryAddress: string,
    subscriptionId: number
  ): Promise<{
    balance: BigNumber;
    owner: string;
    consumers: string[];
  }>;
```

- Parameters:

  - `registryAddress` - Chainlink Functions Registry Address.
  - `subscriptionId` - The Chainlink Functions Subscription ID.

- Return values:
  - `balance` - The Chainlink Functions Subscription balance (LINK).
  - `owner` - The Chainlink Functions Subscription owner (address).
  - `consumers` - The list of authorized client contract addresses.

### functionsFundSubscription

```typescript
public async functionsFundSubscription(
    registryAddress: string,
    subscriptionId: number,
    linkAmount: string,
  ): Promise<BigNumber> 
```

- Parameters:

  - `registryAddress` - Chainlink Functions Registry Address.
  - `subscriptionId` - The Chainlink Functions Subscription ID.
  - `linkAmount` - Amount of LINK to add to the subscription balance.

- Return values:

  - `BigNumber` - The new subscription balance (LINK).

### functionsCancelSubscription

```typescript
public async functionsCancelSubscription(
    registryAddress: string,
    subscriptionId: number,
    refundAddress: string,
  ): Promise<void> 
```

- Parameters:

  - `registryAddress` - Chainlink Functions Registry Address.
  - `subscriptionId` - The Chainlink Functions Subscription ID.
  - `refundAddress` - A refund address (or keep empty for the subscription owner address).

### functionsAddSubscriptionConsumer

```typescript
public async functionsAddSubscriptionConsumer(
    registryAddress: string,
    subscriptionId: number,
    consumerAddress: string,
  ): Promise<void> 
```

- Parameters:

  - `registryAddress` - Chainlink Functions Registry Address.
  - `subscriptionId` - The Chainlink Functions Subscription ID.
  - `consumerAddress` - A consumer contract address.

## Chainlink Data Feeds

Chainlink Data Feeds are the quickest way to connect your smart contracts to the real-world data such as asset prices, reserve balances, and L2 sequencer health. Data feeds provide many different types of data for your applications:

- **Price Feeds**
  Chainlink Data Feeds are the quickest way to connect your smart contracts to the real-world market prices of assets. List of Price Feed Contract Addresses is available [here](https://docs.chain.link/data-feeds/price-feeds/addresses).

- **Proof of Reserve Feeds**
  Proof of Reserves feeds provide the status of reserves for stablecoins, wrapped assets, and real world assets. Proof of Reserve Feeds operate similarly to Price Feeds, but provide answers in units of measurement such as ounces (oz) or number of tokens. List of Proof of Reserve Feed Addresses is available [here](https://docs.chain.link/data-feeds/proof-of-reserve/addresses).

- **NFT Floor Pricing Feeds**
  NFT Floor Pricing Feeds provide the price of the lowest priced NFT available in a collection. List of NFT Floor Pricing Feed Addresses is available [here](https://docs.chain.link/data-feeds/nft-floor-price/addresses).

- **L2 Sequencer Uptime Feeds**
  L2 sequencer feeds track the last known status of the sequencer on an L2 network at a given point in time. This helps you prevent mass liquidations by providing a grace period to allow customers to react to these events. List of L2 Sequencer Uptime Feeds is available [here](https://docs.chain.link/data-feeds/l2-sequencer-feeds).

### getLatestPrice

Returns the latest price of an asset.

```typescript
public async getLatestPrice(priceFeedAddress: string): Promise<BigNumber>;
```

- Parameters:

  - `priceFeedAddress` - Data Feed address
    -  [Price Feed contract addresses](https://docs.chain.link/data-feeds/price-feeds/addresses)
    -  [Proof of Reserve feed addresses](https://docs.chain.link/data-feeds/proof-of-reserve/addresses)
    -  [NFT Floor Pricing feed addresses](https://docs.chain.link/data-feeds/nft-floor-price/addresses)

- `RETURN`: The latest price

### getLatestRoundData

Returns the latest round data of an asset.

```typescript
public async getLatestRoundData(
    dataFeedAddress: string
  ): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }>;
```

- Parameters:

  - `dataFeedAddress` - Data Feed address

- Return values:
  - `roundId` - The round ID.
  - `answer` - The price.
  - `startedAt` - Timestamp of when the round started.
  - `updatedAt` - Timestamp of when the round was updated.
  - `answeredInRound` - The round ID of the round in which the answer was computed.

### getPriceFeedDecimals

Returns the number of decimals present in the response value.

```typescript
public async getPriceFeedDecimals(priceFeedAddress: string): Promise<number>
```

- Parameters:

  - `priceFeedAddress` - Data Feed address

- `RETURN`: The number of decimals.

### getPriceFeedDescription

Returns the description of the underlying aggregator that the proxy points to.

```typescript
public async getPriceFeedDescription(
    priceFeedAddress: string
  ): Promise<string>;
```

- Parameters:

  - `priceFeedAddress` - Data Feed address

- `RETURN`: The description of the underlying aggregator.

### getRoundData

Returns data about a specific round.

```typescript
public async getRoundData(
    priceFeedAddress: string,
    roundId: BigNumber
  ): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }>;
```

- Parameters:

  - `priceFeedAddress` - Data Feed Address.
  - `roundId` - The round ID.

- Return values:
  - `roundId` - The round ID.
  - `answer` - The answer for this round.
  - `startedAt` - Timestamp of when the round started.
  - `updatedAt` - Timestamp of when the round was updated.
  - `answeredInRound` - The round ID of the round in which the answer was computed.

### getAggregatorAddress

Returns the actual contract address of the underlying aggregator that the proxy points to.

```typescript
 public async getAggregatorAddress(priceFeedAddress: string): Promise<string>;
```

- Parameters:

  - `priceFeedAddress` - Data Feed Address.

- `RETURN`: The address of the underlying aggregator.

### getAggregatorRoundId

Returns the Round ID of the underlying aggregator that the proxy points to.

```typescript
 public async getAggregatorRoundId(priceFeedAddress: string): Promise<BigNumber>;
```

- Parameters:

  - `priceFeedAddress` - Data Feed Address.

- `RETURN`: The Round ID of the underlying aggregator.

### getPhaseId

Returns the Phase ID of the underlying aggregator that the proxy points to.

```typescript
 public async getPhaseId(priceFeedAddress: string): Promise<BigNumber>;
```

- Parameters:

  - `priceFeedAddress` - Data Feed Address.

- `RETURN`: The Phase ID of the underlying aggregator.

### getHistoricalPrice

Returns the price of asset in a specific round. Learn more about Historical Price Data [here](https://docs.chain.link/data-feeds/price-feeds/historical-data).

```typescript
public async getHistoricalPrice(
    priceFeedAddress: string,
    roundId: BigNumber
  ): Promise<BigNumber>;
```

- Parameters:

  - `priceFeedAddress` - Data Feed Address.
  - `roundId` - The round ID.

- `RETURN`: The historical price.

### getPriceFeedAggregatorVersion

Returns the current version of the underlying aggregator that the proxy points to.

```typescript
public async getPriceFeedAggregatorVersion(priceFeedAddress: string): Promise<BigNumber>;
```

- Parameters:

  - `priceFeedAddress` - Data Feed Address.

- `RETURN`: The current version of the underlying aggregator.

### resolveEnsAggregatorAddress

Returns specific Proxy Feed address using [Chainlink ENS Resolver](https://app.ens.domains/address/0x122eb74f9d0F1a5ed587F43D120C1c2BbDb9360B). For each network, there is a single Chainlink resolver, which does not change. Chainlink data feeds fall under the `data.eth` naming suffix. Reverse lookup is not supported. Learn more [here](https://docs.chain.link/data-feeds/ens).

```typescript
public async resolveEnsAggregatorAddress(
    baseTick: string,
    quoteTick: string
  ): Promise<string>;
```

- Parameters:

  - `baseTick` - Tick of a Base Asset of a Data Feed. For example, in a ETH / USD Data Feed ETH is a Base Asset.
  - `quoteTick` - Tick of a Quote Asset of a Data Feed. For example, in a ETH / USD Data Feed USD is a Quote Asset.

- `RETURN`: The Data Feed Address.

#### Example

To get an ETH / USD Aggregator address on Ethereum Mainnet using Chainlink ENS Resolver, type:

```typescript
const aggregatorAddress = await chainlink.resolveEnsAggregatorAddress(
  `ETH`,
  `USD`
);
```

### resolveEnsAggregatorAddressWithSubdomains

Returns all Subdomain Addresses using [Chainlink ENS Resolver](https://app.ens.domains/address/0x122eb74f9d0F1a5ed587F43D120C1c2BbDb9360B). When a new Aggregator is deployed for a specific Data Feed, it is first proposed, and when accepted becomes the Aggregator for that Feed. During this process, the Proposed and Aggregator subdomains for that Feed will change. The above `resolveEnsAggregatorAddress` function returns only the Proxy address for particular Data Feed, while this one returns Underlying Aggregator and Proposed Aggregator addresses as well. Learn more [here](https://docs.chain.link/data-feeds/ens).

```typescript
public async resolveEnsAggregatorAddressWithSubdomains(
    baseTick: string,
    quoteTick: string
  ): Promise<{
    proxy: string;
    underlyingAggregator: string;
    proposedAggregator: string;
  }>;
```

- Parameters:

  - `baseTick` - Tick of a Base Asset of a Data Feed. For example, in a ETH / USD Data Feed ETH is a Base Asset.
  - `quoteTick` - Tick of a Quote Asset of a Data Feed. For example, in a ETH / USD Data Feed USD is a Quote Asset.

- Return values:
  - `proxy` - The Proxy Data Feed Address.
  - `underlyingAggregator` - The Underlying Aggregator Address.
  - `proposedAggregator` - The Proposed Aggregator Address.

### getFeedRegistryDecimals

Returns the number of decimals present in the response value from Chainlink’s Feed Registry.

The Chainlink Feed Registry is an on-chain mapping of assets to feeds. It enables you to query Chainlink data feeds from asset addresses directly, without needing to know the feed contract addresses. They enable smart contracts to get the latest price of an asset in a single call, from a single contract.

```typescript
public async getFeedRegistryDecimals(
    feedRegistryAddress: string,
    base: string,
    quote: string
  ): Promise<number>;
```

- Parameters:

  - `feedRegistryAddress` - The Address of [Chainlink's Feed Registry](https://docs.chain.link/data-feeds/feed-registry/) Contract.
  - `base` - The Base Asset Address.
  - `quote` - The Quote Asset Address.

- `RETURN`: The number of decimals present in the response value from Chainlink’s Feed Registry.

### getFeedRegistryDescription

Returns the description of the underlying aggregator that the proxy points to.

The Chainlink Feed Registry is an on-chain mapping of assets to feeds. It enables you to query Chainlink data feeds from asset addresses directly, without needing to know the feed contract addresses. They enable smart contracts to get the latest price of an asset in a single call, from a single contract.

```typescript
public async getFeedRegistryDescription(
    feedRegistryAddress: string,
    base: string,
    quote: string
  ): Promise<string>;
```

- Parameters:

  - `feedRegistryAddress` - The Address of [Chainlink's Feed Registry](https://docs.chain.link/data-feeds/feed-registry/) Contract.
  - `base` - The Base Asset Address.
  - `quote` - The Quote Asset Address.

- `RETURN`: The description of the underlying aggregator that the proxy points to.

### getFeedRegistryRoundData

Returns data about a specific round, using the `roundId` and Chainlink’s Feed Registry.

The Chainlink Feed Registry is an on-chain mapping of assets to feeds. It enables you to query Chainlink data feeds from asset addresses directly, without needing to know the feed contract addresses. They enable smart contracts to get the latest price of an asset in a single call, from a single contract.

```typescript
public async getFeedRegistryRoundData(
    feedRegistryAddress: string,
    base: string,
    quote: string,
    roundId: BigNumber
  ): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }>;
```

- Parameters:

  - `feedRegistryAddress` - The Address of [Chainlink's Feed Registry](https://docs.chain.link/data-feeds/feed-registry/) Contract.
  - `base` - The Base Asset Address.
  - `quote` - The Quote Asset Address.
  - `roundId` - The round ID.

- Return values:
  - `roundId` - The round ID.
  - `answer` - The price.
  - `startedAt` - Timestamp of when the round started.
  - `updatedAt` - Timestamp of when the round was updated.
  - `answeredInRound` - The round ID of the round in which the answer was computed.

### getFeedRegistryLatestRoundData

Returns the price from the latest round using Chainlink’s Feed Registry.

The Chainlink Feed Registry is an on-chain mapping of assets to feeds. It enables you to query Chainlink data feeds from asset addresses directly, without needing to know the feed contract addresses. They enable smart contracts to get the latest price of an asset in a single call, from a single contract.

```typescript
public async getFeedRegistryLatestRoundData(
    feedRegistryAddress: string,
    base: string,
    quote: string
  ): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }>;
```

- Parameters:

  - `feedRegistryAddress` - The Address of [Chainlink's Feed Registry](https://docs.chain.link/data-feeds/feed-registry/) Contract.
  - `base` - The Base Asset Address.
  - `quote` - The Quote Asset Address.

- Return values:
  - `roundId` - The round ID.
  - `answer` - The price.
  - `startedAt` - Timestamp of when the round started.
  - `updatedAt` - Timestamp of when the round was updated.
  - `answeredInRound` - The round ID of the round in which the answer was computed.

### getFeedRegistryProxyAggregatorVersion

Returns the version representing the type of aggregator the proxy points to.

The Chainlink Feed Registry is an on-chain mapping of assets to feeds. It enables you to query Chainlink data feeds from asset addresses directly, without needing to know the feed contract addresses. They enable smart contracts to get the latest price of an asset in a single call, from a single contract.

```typescript
public async getFeedRegistryProxyAggregatorVersion(
    feedRegistryAddress: string,
    base: string,
    quote: string
  ): Promise<BigNumber>;
```

- Parameters:

  - `feedRegistryAddress` - The Address of [Chainlink's Feed Registry](https://docs.chain.link/data-feeds/feed-registry/) Contract.
  - `base` - The Base Asset Address.
  - `quote` - The Quote Asset Address.

- `RETURN`: The version representing the type of aggregator the proxy points to.

### getFeed

Returns the primary aggregator address of a base/quote pair. Note that on-chain contracts cannot read from aggregators directly, only through Feed Registry or Proxy contracts.

The Chainlink Feed Registry is an on-chain mapping of assets to feeds. It enables you to query Chainlink data feeds from asset addresses directly, without needing to know the feed contract addresses. They enable smart contracts to get the latest price of an asset in a single call, from a single contract.

```typescript
public async getFeed(
    feedRegistryAddress: string,
    base: string,
    quote: string
  ): Promise<string>;
```

- Parameters:

  - `feedRegistryAddress` - The Address of [Chainlink's Feed Registry](https://docs.chain.link/data-feeds/feed-registry/) Contract.
  - `base` - The Base Asset Address.
  - `quote` - The Quote Asset Address.

- `RETURN`: The primary aggregator address of a base/quote pair.

### getCurrentPhaseId

Returns the current phase id of a base/quote pair using Chainlink's Feed Registry.

The Chainlink Feed Registry is an on-chain mapping of assets to feeds. It enables you to query Chainlink data feeds from asset addresses directly, without needing to know the feed contract addresses. They enable smart contracts to get the latest price of an asset in a single call, from a single contract.

```typescript
public async getCurrentPhaseId(
    feedRegistryAddress: string,
    base: string,
    quote: string
  ): Promise<number>;
```

- Parameters:

  - `feedRegistryAddress` - The Address of [Chainlink's Feed Registry](https://docs.chain.link/data-feeds/feed-registry/) Contract.
  - `base` - The Base Asset Address.
  - `quote` - The Quote Asset Address.

- `RETURN`: The current phase id of a base/quote pair.

### getPhaseFeed

Returns the underlying aggregator address of a base/quote pair at a specified phase. Note that on-chain contracts cannot read from aggregators directly, only through Feed Registry or Proxy contracts. Phase ids start at `1`. You can get the current Phase by calling the `getCurrentPhaseId()` function of this plugin.

The Chainlink Feed Registry is an on-chain mapping of assets to feeds. It enables you to query Chainlink data feeds from asset addresses directly, without needing to know the feed contract addresses. They enable smart contracts to get the latest price of an asset in a single call, from a single contract.

```typescript
public async getPhaseFeed(
    feedRegistryAddress: string,
    base: string,
    quote: string,
    phaseId: BigNumber
  ): Promise<string>;
```

- Parameters:

  - `feedRegistryAddress` - The Address of [Chainlink's Feed Registry](https://docs.chain.link/data-feeds/feed-registry/) Contract.
  - `base` - The Base Asset Address.
  - `quote` - The Quote Asset Address.
  - `phaseId` - The Phase ID.

- `RETURN`: The underlying aggregator address of a base/quote pair at a specified phase.

### isFeedEnabled

Returns true if an Aggregator is enabled as primary on the Chainlink's Feed Registry. This is useful to check if you should index events from an aggregator contract, because you want to only index events of primary aggregators.

The Chainlink Feed Registry is an on-chain mapping of assets to feeds. It enables you to query Chainlink data feeds from asset addresses directly, without needing to know the feed contract addresses. They enable smart contracts to get the latest price of an asset in a single call, from a single contract.

```typescript
public async isFeedEnabled(
    feedRegistryAddress: string,
    aggregatorAddress: string
  ): Promise<boolean>;
```

- Parameters:

  - `feedRegistryAddress` - The Address of [Chainlink's Feed Registry](https://docs.chain.link/data-feeds/feed-registry/) Contract.
  - `aggregatorAddress` - The Address of an Aggregator Data Feed.

- `RETURN`: `true` if an Aggregator is enabled as primary on the Chainlink's Feed Registry, `false` otherwise.

### getPhase

Returns the starting and ending aggregator round ids of a base/quote pair using Chainlink's Feed Registry.

The Chainlink Feed Registry is an on-chain mapping of assets to feeds. It enables you to query Chainlink data feeds from asset addresses directly, without needing to know the feed contract addresses. They enable smart contracts to get the latest price of an asset in a single call, from a single contract.

```typescript
public async getPhase(
    feedRegistryAddress: string,
    base: string,
    quote: string,
    phaseId: BigNumber
  ): Promise<{
    phaseId: number;
    startingAggregatorRoundId: BigNumber;
    endingAggregatorRoundId: BigNumber;
  }>;
```

- Parameters:

  - `feedRegistryAddress` - The Address of [Chainlink's Feed Registry](https://docs.chain.link/data-feeds/feed-registry/) Contract.
  - `base` - The Base Asset Address.
  - `quote` - The Quote Asset Address.
  - `phaseId` - The Phase ID.

- Return values:
  - `phaseId` - The Phase ID.
  - `startingAggregatorRoundId` - The ID of the aggregator when the phase started.
  - `endingAggregatorRoundId` - The ID of the aggregator when the phase ended.

### getRoundFeed

Returns the underlying aggregator address of a base/quote pair at a specified round. Note that on-chain contracts cannot read from aggregators directly, only through Feed Registry or Proxy contracts.

The Chainlink Feed Registry is an on-chain mapping of assets to feeds. It enables you to query Chainlink data feeds from asset addresses directly, without needing to know the feed contract addresses. They enable smart contracts to get the latest price of an asset in a single call, from a single contract.

```typescript
public async getRoundFeed(
    feedRegistryAddress: string,
    base: string,
    quote: string,
    roundId: BigNumber
  ): Promise<string>;
```

- Parameters:

  - `feedRegistryAddress` - The Address of [Chainlink's Feed Registry](https://docs.chain.link/data-feeds/feed-registry/) Contract.
  - `base` - The Base Asset Address.
  - `quote` - The Quote Asset Address.
  - `phaseId` - The Phase ID.

- `RETURN`: The underlying aggregator address of a base/quote pair at a specified round.

### getPhaseRange

Returns the starting and ending round ids of a base/quote pair at a specified phase. Please note that this `roundId` is calculated from the phase id and the underlying aggregator’s round id. To get the raw aggregator round ids of a phase for indexing purposes, please use the `getPhase()` function of this plugin.

The Chainlink Feed Registry is an on-chain mapping of assets to feeds. It enables you to query Chainlink data feeds from asset addresses directly, without needing to know the feed contract addresses. They enable smart contracts to get the latest price of an asset in a single call, from a single contract.

```typescript
public async getPhaseRange(
    feedRegistryAddress: string,
    base: string,
    quote: string,
    phaseId: BigNumber
  ): Promise<{
    startingRoundId: BigNumber;
    endingRoundId: BigNumber;
  }>;
```

- Parameters:

  - `feedRegistryAddress` - The Address of [Chainlink's Feed Registry](https://docs.chain.link/data-feeds/feed-registry/) Contract.
  - `base` - The Base Asset Address.
  - `quote` - The Quote Asset Address.
  - `phaseId` - The Phase ID.

- Return values:
  - `phaseId` - The Phase ID.
  - `startingRoundId` - The Round ID when the phase started.
  - `endingRoundId` - The Round ID when the phase ended.

### getPreviousRoundId

Returns the previous round id of a base/quote pair given a specified round using Chainlink's Feed Registry. Note that rounds are non-monotonic across phases.

The Chainlink Feed Registry is an on-chain mapping of assets to feeds. It enables you to query Chainlink data feeds from asset addresses directly, without needing to know the feed contract addresses. They enable smart contracts to get the latest price of an asset in a single call, from a single contract.

```typescript
public async getPreviousRoundId(
    feedRegistryAddress: string,
    base: string,
    quote: string,
    roundId: BigNumber
  ): Promise<BigNumber>;
```

- Parameters:

  - `feedRegistryAddress` - The Address of [Chainlink's Feed Registry](https://docs.chain.link/data-feeds/feed-registry/) Contract.
  - `base` - The Base Asset Address.
  - `quote` - The Quote Asset Address.
  - `roundId` - The Round ID.

- `RETURN`: The previous round id of a base/quote pair.

### getNextRoundId

Returns the next round id of a base/quote pair given a specified round using Chainlink's Feed Registry. Note that rounds are non-monotonic across phases.

The Chainlink Feed Registry is an on-chain mapping of assets to feeds. It enables you to query Chainlink data feeds from asset addresses directly, without needing to know the feed contract addresses. They enable smart contracts to get the latest price of an asset in a single call, from a single contract.

```typescript
public async getNextRoundId(
    feedRegistryAddress: string,
    base: string,
    quote: string,
    roundId: BigNumber
  ): Promise<BigNumber>;
```

- Parameters:

  - `feedRegistryAddress` - The Address of [Chainlink's Feed Registry](https://docs.chain.link/data-feeds/feed-registry/) Contract.
  - `base` - The Base Asset Address.
  - `quote` - The Quote Asset Address.
  - `roundId` - The Round ID.

- `RETURN`: The next round id of a base/quote pair.

### getHistoricalPriceFromAggregator

Returns the historical price of an asset directly from the `AccessControlledOffchainAggregator` contract. Note that you should read the aggregator contract only if you need functions that are not available in the proxy.

There are two parameters that can cause Chainlink nodes to update:

1. **Deviation Threshold** - Chainlink nodes are monitoring data off-chain. The deviation of the real-world data beyond a certain interval triggers all the nodes to update.
2. **Heartbeat Threshold** - If the data values stay within the deviation parameters, it will only trigger an update every X minutes/hours.

```typescript
public async getHistoricalPriceFromAggregator(
    aggregatorAddress: string,
    aggregatorRoundId: BigNumber
  ): Promise<BigNumber>;
```

- Parameters:

  - `aggregatorAddress` - The [AccessControlledOffchainAggregator](https://docs.chain.link/data-feeds/price-feeds/api-reference#accesscontrolledoffchainaggregator) contract address.
  - `aggregatorRoundId` - The Round ID of the AccessControlledOffchainAggregator contract.

- `RETURN`: The price of an asset at the given Round ID.

### getTypeAndVersionOfAggregator

Returns the aggregator type and version. Many aggregators are `AccessControlledOffchainAggregator 2.0.0`, but there are other variants in production. The version is for the type of aggregator, and different from the contract `version`.

```typescript
public async getTypeAndVersionOfAggregator(
    aggregatorAddress: string
  ): Promise<string>;
```

- Parameters:

  - `aggregatorAddress` - The [AccessControlledOffchainAggregator](https://docs.chain.link/data-feeds/price-feeds/api-reference#accesscontrolledoffchainaggregator) contract address.

- `RETURN`: The aggregator type and version.

### getPhaseIdOfAggregator

Returns the contract version. This is different from the `getTypeAndVersionOfAggregator`.

```typescript
public async getPhaseIdOfAggregator(
    aggregatorAddress: string
  ): Promise<BigNumber>;
```

- Parameters:

  - `aggregatorAddress` - The [AccessControlledOffchainAggregator](https://docs.chain.link/data-feeds/price-feeds/api-reference#accesscontrolledoffchainaggregator) contract address.

- `RETURN`: The aggregator contract version, widely known as Phase ID.

### isLayer2SequencerUp

Returns `false` if a Layer 2 Sequencer is currently unavailable, `true` otherwise. More info [here](https://docs.chain.link/data-feeds/l2-sequencer-feeds).

```typescript
public async isLayer2SequencerUp(
    sequencerUptimeFeedAddress: string
  ): Promise<boolean>;
```

- Parameters:

  - `sequencerUptimeFeedAddress` - The Address of a [Sequencer Uptime Feed Contract](https://docs.chain.link/data-feeds/l2-sequencer-feeds#available-networks).

- `RETURN`: `false` if Layer 2 Sequencer is currently unavailable, `true` otherwise.

### getTimeSinceLayer2SequencerIsUp

Returns the number of seconds (Unix timestamp format) since a Layer 2 Sequencer became available. More info [here](https://docs.chain.link/data-feeds/l2-sequencer-feeds).

```typescript
public async getTimeSinceLayer2SequencerIsUp(
    sequencerUptimeFeedAddress: string,
    gracePeriodTime = BigNumber.from(3600)
  ): Promise<{
    isSequencerUp: boolean;
    timeSinceUp: BigNumber;
    isGracePeriodOver: boolean;
  }>;
```

- Parameters:

  - `sequencerUptimeFeedAddress` - The Address of a [Sequencer Uptime Feed Contract](https://docs.chain.link/data-feeds/l2-sequencer-feeds#available-networks).
  - `gracePeriodTime` - Number of seconds to wait after the Layer 2 Sequencer became available before accepting answers from the price data feed. Optional parameter. If not provided, the default value is 3600 seconds.

- Return values:
  - `isSequencerUp` - `false` if Layer 2 Sequencer is currently unavailable, `true` otherwise.
  - `timeSinceUp` - The number of seconds since the Layer 2 Sequencer became available.
  - `isGracePeriodOver` - `true` if more seconds since the Layer 2 Sequencer became available than `gracePeriodTime` passed, `false` otherwise.

## Chainlink VRF (Verifiable Random Function)

Chainlink VRF (Verifiable Random Function) is a provably fair and verifiable random number generator (RNG) that enables smart contracts to access random values without compromising security or usability. For each request, Chainlink VRF generates one or more random values and cryptographic proof of how those values were determined. The proof is published and verified on-chain before any consuming applications can use it. This process ensures that results cannot be tampered with or manipulated by any single entity including oracle operators, miners, users, or smart contract developers.

### createVrfSubscription

Creates new VRF Subscription programmatically. This is a replacement for managing VRF Subscriptions through [Subscription Manager User Interface](https://docs.chain.link/vrf/v2/subscription/ui).

> **Note**
>
> Calling this function costs gas.

```typescript
public async createVrfSubscription(
    vrfCoordinatorAddress: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ subscriptionId: BigNumber; transactionHash: string }>;
```

- Parameters:
  `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, the execution continues after this function immediately.

- Return values:
  - `subscriptionId` - The ID of newly created VRF Subscription.
  - `transactionHash` - The transaction hash.

### fundVrfSubscription

Funds your VRF Subscription. This is a replacement for managing VRF Subscriptions through [Subscription Manager User Interface](https://docs.chain.link/vrf/v2/subscription/ui).

> **Note**
>
> Calling this function costs gas. Reverts if you don't have enough LINK tokens provided as a function argument.

```typescript
public async fundVrfSubscription(
    vrfCoordinatorAddress: string,
    linkTokenAddress: string,
    amountInJuels: BigNumber,
    subscriptionId: BigNumber,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.
  `linkTokenAddress` - The [Address of a LINK token](https://docs.chain.link/resources/link-token-contracts) smart contract.
  `amountInJuels` - The Amount of LINK tokens for funding in Juels. The smallest denomination of LINK is called a Juel, and 1,000,000,000,000,000,000 (1e18) Juels are equal to 1 LINK. This is similar to Wei, which is the smallest denomination of ETH.
  `subscriptionId` - The VRF Subscription ID.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, and the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### addVrfConsumer

Adds new consumer smart contract to your VRF Subscription. This is a replacement for managing VRF Subscriptions through [Subscription Manager User Interface](https://docs.chain.link/vrf/v2/subscription/ui).

> **Note**
>
> Calling this function costs gas.

```typescript
public async addVrfConsumer(
    vrfCoordinatorAddress: string,
    consumerAddress: string,
    subscriptionId: BigNumber,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.
  `consumerAddress` - The Address of your consumer smart contract.
  `subscriptionId` - The VRF Subscription ID.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, and the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### removeVrfConsumer

Removes consumer smart contract from your VRF Subscription. This is a replacement for managing VRF Subscriptions through [Subscription Manager User Interface](https://docs.chain.link/vrf/v2/subscription/ui).

> **Note**
>
> Calling this function costs gas.

```typescript
public async removeVrfConsumer(
    vrfCoordinatorAddress: string,
    consumerAddress: string,
    subscriptionId: BigNumber,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.
  `consumerAddress` - The Address of your consumer smart contract.
  `subscriptionId` - The VRF Subscription ID.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, and the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### cancelVrfSubscription

Cancels your VRF Subscription. Sends the remaining funds to provided wallet address. This is a replacement for managing VRF Subscriptions through [Subscription Manager User Interface](https://docs.chain.link/vrf/v2/subscription/ui).

> **Note**
>
> Calling this function costs gas.

```typescript
public async cancelVrfSubscription(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumber,
    receivingWallet: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.
  `subscriptionId` - The VRF Subscription ID.
  `receivingWallet` - The wallet address to send the remaining funds to.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, and the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### getVrfSubscriptionDetails

Returns details about the specific VRF Subscription.

```typescript
public async getVrfSubscriptionDetails(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumber
  ): Promise<{
    balance: BigNumber;
    reqCount: BigNumber;
    owner: string;
    consumers: string[];
  }>;
```

- Parameters:

  - `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.
  - `subscriptionId` - The VRF Subscription ID.

- Return values:
  - `balance` - The current balance of LINK tokens available for a VRF Subscription to consume for requests.
  - `reqCount` - The VRF requests counter.
  - `owner` - The Address of a VRF Subscription owner. By default, it's a VRF Subscription creator.
  - `consumers` - The array of consumer smart contracts addresses.

### pendingVrfRequestExists

Checks if there is an outgoing VRF request that is not fulfilled yet.

```typescript
public async pendingVrfRequestExists(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumber
  ): Promise<boolean>;
```

- Parameters:

  - `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.
  - `subscriptionId` - The VRF Subscription ID.

- `RETURN`: `true` if there is an outgoing VRF request that is not fulfilled yet, `false` otherwise.

### requestVrfSubscriptionOwnerTransfer

Requests the transfer of ownership of VRF Subscription.

> **Note**
>
> Calling this function costs gas.

```typescript
public async requestVrfSubscriptionOwnerTransfer(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumber,
    newOwnerAddress: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.
  `subscriptionId` - The VRF Subscription ID.
  `newOwnerAddress` - The Address of a new owner. It needs to call `acceptVrfSubscriptionOwnerTransfer` function afteward.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, and the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### acceptVrfSubscriptionOwnerTransfer

Accepts the transfer of ownership of VRF Subscription.

> **Note**
>
> Calling this function costs gas.

```typescript
public async acceptVrfSubscriptionOwnerTransfer(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumber,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.
  `subscriptionId` - The VRF Subscription ID.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, and the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### getMaxVrfConsumers

Returns the maximum number of consumer smart contracts that can be added to a VRF Subscription.

```typescript
public async getMaxVrfConsumers(vrfCoordinatorAddress: string): Promise<number>;
```

- Parameters:

  - `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.

- `RETURN`: The maximum number of consumer smart contracts that can be added to a VRF Subscription.

### getMaxVrfNumberOfWords

Returns the maximum number of 32bytes words that can be requested from a Chainlink VRF Coordinator. Since `uint256` Solidity data type is a 32byte word, this function will return the maximum number of `uint256` values that can be requested from a Chainlink VRF Coordinator.

```typescript
public async getMaxVrfNumberOfWords(vrfCoordinatorAddress: string): Promise<number>;
```

- Parameters:

  - `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.

- `RETURN`: The maximum number of 32bytes words that can be requested from a Chainlink VRF Coordinator.

### getMaxVrfRequestConfirmations

Returns the maximum possible number of VRF Request Confirmations.

```typescript
public async getMaxVrfRequestConfirmations(vrfCoordinatorAddress: string): Promise<number>;
```

- Parameters:

  - `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.

- `RETURN`: The maximum possible number of VRF Request Confirmations.

### getMinVrfRequestConfirmations

Returns the minimum possible number of VRF Request Confirmations.

```typescript
public async getMinVrfRequestConfirmations(vrfCoordinatorAddress: string): Promise<number>;
```

- Parameters:

  - `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.

- `RETURN`: The minimum possible number of VRF Request Confirmations.

### getMaxVrfRequestGasLimit

Returns the maximum gas limit for a single VRF Request.

```typescript
public async getMaxVrfRequestGasLimit(vrfCoordinatorAddress: string): Promise<number>;
```

- Parameters:

  - `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.

- `RETURN`: The maximum gas limit for a single VRF Request.

### getVrfCommitment

Returns the VRF cryptographic commitment scheme of a given VRF Request.

```typescript
public async getVrfCommitment(
    vrfCoordinatorAddress: string,
    requestId: BigNumber
  ): Promise<BytesLike>;
```

- Parameters:

  - `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.
  - `requestId` - The VRF Request ID.

- `RETURN`: The VRF cryptographic commitment scheme of a given VRF Request.

### getVrfCoordinatorConfig

Returns the VRF Coordinator smart contract configuration details.

```typescript
public async getVrfCoordinatorConfig(
    vrfCoordinatorAddress: string
  ): Promise<{
    minimumRequestConfirmations: number;
    maxGasLimit: number;
    stalenessSeconds: number;
    gasAfterPaymentCalculation: number;
  }>;
```

- Parameters:

  - `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.

- Return values:
  - `minimumRequestConfirmations` - The minimum possible number of VRF Request Confirmations.
  - `maxGasLimit` - The maximum gas limit for a single VRF Request.
  - `stalenessSeconds` - The number of seconds before the feed price can be considered stale.
  - `gasAfterPaymentCalculation` - The gas to cover the oracle payment after calculations.

### getVrfCoordinatorTypeAndVersion

Returns the Type and Version of a VRF Coordinator smart contract.

```typescript
public async getVrfCoordinatorTypeAndVersion(vrfCoordinatorAddress: string): Promise<string>;
```

- Parameters:

  - `vrfCoordinatorAddress` - The Address of a [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) smart contract.

- `RETURN`: The Type and Version of a VRF Coordinator smart contract.

## Chainlink Automation

Smart contracts can't trigger or initiate their own functions at arbitrary times or under arbitrary conditions. State changes will only occur when another account initiates a transaction (such as a user, oracle, or contract). [Chainlink Automation](https://docs.chain.link/docs/chainlink-automation/introduction/) enables conditional execution of your smart contracts functions through a hyper-reliable and decentralized automation platform that uses the same external network of node operators that secures billions in value.

### registerUpkeep

Registers new Automation Upkeep.

> **Note**
>
> Calling this function costs gas.

```typescript
public async registerUpkeep(
    linkTokenAddress: string,
    automationRegistrarAddress: string,
    amountInJuels: BigNumber,
    name: string,
    encryptedEmail: BytesLike,
    upkeepContract: string,
    gasLimit: number,
    adminAddress: string,
    checkData: BytesLike,
    source: number,
    sender: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `linkTokenAddress` - The [Address of a LINK token](https://docs.chain.link/resources/link-token-contracts) smart contract.
  `automationRegistrarAddress` - The Address of the [Automation Registrar contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that accepts requests for upkeep registrations.
  `amountInJuels` - The Amount of LINK tokens for funding in Juels. The smallest denomination of LINK is called a Juel, and 1,000,000,000,000,000,000 (1e18) Juels are equal to 1 LINK. This is similar to Wei, which is the smallest denomination of ETH. The minimum amount is 5 LINK. To fund 5 LINK please set this to `5000000000000000000`
  `name` - The Name of the Upkeep.
  `encryptedEmail` - Not in use in programmatic registration. Please specify with `0x`
  `upkeepContract` - The Address of the Automation-compatible contract that will be automated.
  `gasLimit` - The maximum amount of gas that will be used to execute your function on-chain.
  `adminAddress` - The Address for the Upkeep administrator. The Upkeep administrator can fund the contract.
  `checkData` - ABI-encoded fixed and specified at Upkeep registration and used in every checkUpkeep. Can be empty (`0x`)
  `source` - Not in use in programmatic registration. Please specify with `0`.
  `sender` - The Address of the sender making the request.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, and the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### getAutomationPendingRegistrationRequest

Returns the Admin Address and the current balance of an Automation Upkeep Registration Request.

```typescript
public async getAutomationPendingRegistrationRequest(
    automationRegistrarAddress: string,
    hash: BytesLike
  ): Promise<{
    adminAddress: string;
    balance: BigNumber;
  }>;
```

- Parameters:

  - `automationRegistrarAddress` - The Address of the [Automation Registrar contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that accepts requests for upkeep registrations.
  - `hash` - The Keccak256 hash of ABI encoded values: `upkeepContract`, `gasLimit`, `adminAddress`, `checkData`

- Return values:
  - `adminAddress` - The Address of the Upkeep Registration Request administrator.
  - `balance` - The current balance of the Upkeep Registration Request.

### cancelAutomationPendingRegistrationRequest

Cancels the pending Automation Upkeep Registration Request.

> **Note**
>
> Calling this function costs gas.

```typescript
public async cancelAutomationPendingRegistrationRequest(
    automationRegistrarAddress: string,
    hash: BytesLike,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `automationRegistrarAddress` - The Address of the [Automation Registrar contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that accepts requests for upkeep registrations.
  `hash` - The Keccak256 hash of ABI encoded values: `upkeepContract`, `gasLimit`, `adminAddress`, `checkData`
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, and the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### getAutomationRegistrarConfig

Returns the configuration parameters of the [Automation Registrar](https://docs.chain.link/chainlink-automation/supported-networks/) smart contract. This is a contract that accepts requests for upkeep registrations.

```typescript
public async getAutomationRegistrarConfig(
    automationRegistrarAddress: string
  ): Promise<{
    autoApproveConfigType: number;
    autoApproveMaxAllowed: number;
    approvedCount: number;
    automationRegistry: string;
    minLINKJuels: BigNumber;
  }>;
```

- Parameters:

  - `automationRegistrarAddress` - The Address of the [Automation Registrar contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that accepts requests for upkeep registrations.

- Return values:
  - `autoApproveConfigType` - The setting for auto-approve registrations. It can be DISABLED (No auto approvals, all new upkeeps should be approved manually), ENABLED_SENDER_ALLOWLIST (Auto approvals for allowed senders subject to max allowed. Manual for rest), or ENABLED_ALL (Auto approvals for all new upkeeps subject to max allowed).
  - `autoApproveMaxAllowed` - The maximum number of registrations that can be auto-approved.
  - `approvedCount` - The current number of auto-approved registrations.
  - `automationRegistry` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  - `minLINKJuels` - The minimum amount of LINK token in Juels that new registrations should fund their upkeep with. The smallest denomination of LINK is called a Juel, and 1,000,000,000,000,000,000 (1e18) Juels are equal to 1 LINK. This is similar to Wei, which is the smallest denomination of ETH.

### getAutomationRegistrarTypeAndVersion

Returns the Type and Version of an [Automation Registrar contract](https://docs.chain.link/chainlink-automation/supported-networks/).

```typescript
public async getAutomationRegistrarTypeAndVersion(automationRegistrarAddress: string): Promise<string>;
```

- Parameters:

  - `automationRegistrarAddress` - The Address of the [Automation Registrar contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that accepts requests for upkeep registrations.

- `RETURN`: The Type and Version of an Automation Registrar contract.

### fundUpkeep

Funds Automation Upkeep with LINK tokens.

> **Note**
>
> Calling this function costs gas.

```typescript
public async fundUpkeep(
    automationRegistryAddress: string,
    id: BigNumber,
    amountInJuels: BigNumber,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  `id` - The Upkeep ID.
  `amountInJuels` - The Amount of LINK tokens for funding in Juels. The smallest denomination of LINK is called a Juel, and 1,000,000,000,000,000,000 (1e18) Juels are equal to 1 LINK. This is similar to Wei, which is the smallest denomination of ETH.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### checkUpkeep

Checks if Upkeep on an Automation-compatible contract needs to be performed or not. Simulated by Automation Nodes via `eth_call`. If Upkeep is needed, the call then simulates the `performUpkeep` function to ensure it succeeds. Finally, it returns the success status along with payment information and the perform data payload. Reverts if Upkeep is not needed.

> **Note**
>
> Calling this function costs gas.

```typescript
public async checkUpkeep(
    automationRegistryAddress: string,
    id: BigNumber,
    address: string
  ): Promise<{
    performData: BytesLike;
    maxLinkPayment: BigNumber;
    gasLimit: BigNumber;
    adjustedGasWei: BigNumber;
    linkEth: BigNumber;
  }>;
```

- Parameters:
  `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  `id` - The Upkeep ID.
  `address` - The Address to simulate performing the Upkeep from.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, the execution continues after this function immediately.

- Return values:
  - `performData` - The calldata parameter to be passed to the target Upkeep.
  - `maxLinkPayment` - The maximum amount of LINK tokens to be spent for payment for a given gas limit.
  - `gasLimit` - The amount of gas to provide the target contract when performing Upkeep.
  - `adjustedGasWei` - The adjusted gas price in Wei needed for performing the Upkeep.
  - `linkEth` - The amount of LINK in terms of Wei needed for a gas received from the Chainlink Fast Gas Data Feed

### migrateUpkeeps

Migrate Upkeeps from one Automation Registry to another, including LINK and Upkeep parameters. Only callable by the Upkeep Admin. Can only migrate active Upkeeps.

> **Note**
>
> Calling this function costs gas.

```typescript
public async migrateUpkeeps(
    automationRegistryAddress: string,
    ids: BigNumber[],
    destination: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  `ids` - The list of IDs of Upkeeps to migrate.
  `destination` - The Address of the Registry to migrate to.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### receiveMigratedUpkeeps

Receives migrated Upkeeps. Called by other Registries when migrating Upkeeps.

> **Note**
>
> Calling this function costs gas.

```typescript
public async receiveMigratedUpkeeps(
    automationRegistryAddress: string,
    encodedUpkeeps: BytesLike,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  `encodedUpkeeps` - The ABI encoding of Upkeeps to import - decoded by the Transcoder.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### cancelUpkeep

Cancels an active Upkeep. Prevents an Upkeep from being performed in the future.

> **Note**
>
> Calling this function costs gas.

```typescript
public async cancelUpkeep(
    automationRegistryAddress: string,
    id: BigNumber,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  `id` - The Upkeep ID.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### withdrawFundsFromCanceledUpkeep

Withdraws any remaining funds from a canceled Upkeep.

> **Note**
>
> Calling this function costs gas.

```typescript
public async withdrawFundsFromCanceledUpkeep(
    automationRegistryAddress: string,
    id: BigNumber,
    to: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  `id` - The Upkeep ID.
  `to` - The destination Address for sending the remaining funds.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### transferAutomationPayeeship

Proposes the safe transfer of an Automation Node's Payee to another Address.

> **Note**
>
> Calling this function costs gas.

```typescript
public async transferAutomationPayeeship(
    automationRegistryAddress: string,
    automationNode: string,
    proposed: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  `automationNode` - The Address of the Automation Node to transfer the Payee role.
  `proposed` - The Address to nominate for the next Payeeship.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### acceptAutomationPayeeship

Accepts the safe transfer of the Payee role for an Automation Node.

> **Note**
>
> Calling this function costs gas.

```typescript
public async acceptAutomationPayeeship(
    automationRegistryAddress: string,
    automationNode: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  `automationNode` - The Address of the Automation Node address to accept the Payee role.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### withdrawAutomationPayment

Withdraws an Automation Node's payment. Callable only by the Automation Node's Payee.

> **Note**
>
> Calling this function costs gas.

```typescript
public async withdrawAutomationPayment(
    automationRegistryAddress: string,
    from: string,
    to: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }>;
```

- Parameters:
  `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  `from` - The Automation Node Address.
  `to` - The Address to send the payment to.
  `waitNumberOfConfirmations` - The number of block confirmations to wait before continuing with the execution. Optional parameter. If not provided, the default value is 1, the execution continues after this function immediately.

- `RETURN`: The transaction hash.

### getActiveUpkeepIDs

Returns the list of IDs of all currently active Upkeeps. The order of IDs in the list is **not guaranteed**, therefore, if making successive calls, one should consider keeping the `blockheight` constant to ensure a wholistic picture of the contract state.

```typescript
public async getActiveUpkeepIDs(
    automationRegistryAddress: string,
    startIndex: BigNumber,
    maxCount: BigNumber
  ): Promise<BigNumber[]> ;
```

- Parameters:

  - `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  - `startIndex` - The starting index in the list.
  - `maxCount` - The maximum count to retrieve, starting from 0 to unlimited.

- `RETURN`: The list of IDs of all currently active Upkeeps.

### getUpkeep

Returns all of the details about an Upkeep.

```typescript
public async getUpkeep(
    automationRegistryAddress: string,
    id: BigNumber
  ): Promise<{
    target: string;
    executeGas: number;
    checkData: BytesLike;
    balance: BigNumber;
    lastAutomationNode: string;
    admin: string;
    maxValidBlocknumber: BigNumber;
    amountSpent: BigNumber;
  }> ;
```

- Parameters:

  - `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  - `id` - The Upkeep ID.

- Return values:
  - `target` - The address of a target contract to perform an Upkeep on.
  - `executeGas` - The amount of gas specified for performing a single Upkeep.
  - `checkData` - The data passed to the contract when checking for an Upkeep.
  - `balance` - The current amount of LINK of Upkeep. To top up, call the `fundUpkeep` function of this plugin.
  - `lastAutomationNode` - The Address of an Automation Node that performed the last Upkeep.
  - `admin` - The address of an Upkeep Admin.
  - `maxValidBlocknumber` - The Maximum Valid Block Number.
  - `amountSpent`- The total amount of LINK spent for performing this Upkeep.

### getAutomationNodeInfo

Returns the current info about any Automation Node Address.

```typescript
public async getAutomationNodeInfo(
    automationRegistryAddress: string,
    query: string
  ): Promise<{ payee: string; active: boolean; balance: BigNumber }> ;
```

- Parameters:

  - `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  - `query` - The Address of an Automation Node to query information details for.

- Return values:
  - `payee` - The Address of the Payee.
  - `active` - `true` if an Automation Node is currently active, `false` otherwise.
  - `balance` - The current balance of LINK tokens of an Automation Node.

### automationGetMaxPaymentForGas

Calculates the maximum payment for a given gas limit.

```typescript
public async automationGetMaxPaymentForGas(
    automationRegistryAddress: string,
    gasLimit: BigNumber
  ): Promise<BigNumber>;
```

- Parameters:

  - `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  - `gasLimit` - The amount of gas to calculate the payment for.

- `RETURN` - The maximum payment for a given gas limit.

### getMinBalanceForUpkeep

Calculates the minimum balance required for an Upkeep to remain eligible.

```typescript
public async getMinBalanceForUpkeep(
    automationRegistryAddress: string,
    id: BigNumber
  ): Promise<BigNumber>;
```

- Parameters:

  - `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.
  - `id` - The Upkeep ID.

- `RETURN` - The minimum balance required for an Upkeep to remain eligible.

### getAutomationRegistryState

Returns the current state of the Automation Registry smart contract.

```typescript
public async getAutomationRegistryState(
    automationRegistryAddress: string
  ): Promise<{
    nonce: number;
    ownerLinkBalance: BigNumber;
    expectedLinkBalance: BigNumber;
    numUpkeeps: BigNumber;
    paymentPremiumPPB: number;
    flatFeeMicroLink: number;
    blockCountPerTurn: number;
    checkGasLimit: number;
    stalenessSeconds: number;
    gasCeilingMultiplier: number;
    minUpkeepSpend: BigNumber;
    maxPerformGas: number;
    fallbackGasPrice: BigNumber;
    fallbackLinkPrice: BigNumber;
    transcoder: string;
    registrar: string;
    automationNodes: string[];
  }>;
```

- Parameters:

  - `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.

- Return values:
  - `nonce` - The number that increments for each newly created Upkeep. Serves as one of the parameters for generating the unique Upkeep ID.
  - `ownerLinkBalance` - The amount of LINK funds collected through cancellation fees. This is the withdrawable balance of LINK by the contract owner.
  - `expectedLinkBalance` - The expected amount of LINK tokens of a Registry.
  - `numUpkeeps` - The number of active Upkeeps on a Registry.
  - `paymentPremiumPPB` - The payment premium rate oracles receive on top of being reimbursed for gas, measured in parts per billion.
  - `flatFeeMicroLink` - The flat fee paid to oracles for performing Upkeeps, priced in MicroLink; can be used in conjunction with or independently of `paymentPremiumPPB`.
  - `blockCountPerTurn` - The number of blocks each oracle has during their turn to perform upkeep before it will be the next Automation Node's turn to submit.
  - `checkGasLimit` - The gas limit when checking for Upkeep.
  - `stalenessSeconds` - The number of seconds that is allowed for feed data to be stale before switching to the fallback pricing.
  - `gasCeilingMultiplier` - The multiplier to apply to the fast gas feed price when calculating the payment ceiling for Automation Nodes.
  - `minUpkeepSpend` - The minimum amount of LINK tokens that an Upkeep must spend before canceling.
  - `maxPerformGas` - The maximum `executeGas` allowed for an Upkeep on this Registry.
  - `fallbackGasPrice` - The gas price used if the Fast Gas Data Feed is stale.
  - `fallbackLinkPrice` - The LINK price used if the LINK Data Feed is stale.
  - `transcoder` - The Address of the Transcoder contract.
  - `registrar` - The Address of the Automation Registrar contract.
  - `automationNodes` - The list of Automation Nodes addresses.

### isAutomationRegistryPaused

Returns `true` if the Automation Registry contract is currently paused, `false` otherwise.

```typescript
public async isAutomationRegistryPaused(automationRegistryAddress: string): Promise<boolean>;
```

- Parameters:

  - `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.

- `RETURN`: `true` if the Automation Registry contract is currently paused, `false` otherwise.

### getAutomationRegistryTypeAndVersion

Returns the type and version of an Automation Registry smart contract.

```typescript
public async getAutomationRegistryTypeAndVersion(automationRegistryAddress: string): Promise<string>;
```

- Parameters:

  - `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.

- `RETURN`: The type and version of an Automation Registry smart contract.

### getAutomationRegistryUpkeepTranscoderVersion

Returns the version of the Transcoder smart contract on the Automation Registry smart contract.

```typescript
public async getAutomationRegistryUpkeepTranscoderVersion(
    automationRegistryAddress: string
  ): Promise<number>;
```

- Parameters:

  - `automationRegistryAddress` - The Address of the [Automation Registry contract](https://docs.chain.link/chainlink-automation/supported-networks/). This is a contract that adds work for Chainlink Automation to perform on the registered Automation-compatible contracts.

- `RETURN`: The version of the Transcoder smart contract on the Automation Registry smart contract.

## Running a Chainlink Node on a Hardhat Network

Operating a Chainlink node allows you to be part of the Chainlink Network, helping developers build hybrid smart contracts, giving them access to real-world data and services. Using a set of Hardhat tasks from this plugin, you can easily spin up a Chainlink Node locally and test your smart contracts against it.

#### Prerequisites

- [node](https://nodejs.org/en/) version > 16.X
- [npm](https://www.npmjs.com/) version > 7
- [Docker](https://www.docker.com/)

To view the list of all available tasks, enter the following command:

```console
npx hardhat
```

### chainlink:run-node

Open the Docker Desktop and run the Hardhat node by typing `npx hardhat node`.

Spins up a Chainlink node, which will set-up some predefined env variables. Please do not start it from the Docker Desktop.

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

### chainlink:node-info

Open the Docker Desktop and run the Hardhat node by typing `npx hardhat node`.

Returns the Node Information.

```console
npx hardhat chainlink:node-info --network localhost
```

The output will look like this:

```console
┌─────────┬──────────────────────────────────────────────┐
│ (index) │                    Values                    │
├─────────┼──────────────────────────────────────────────┤
│ Address │ '0x786729C810294D47E935aE636F66f6cE35E9B99d' │
│ Balance │            '0.000000000000000000'            │
│ ChainID │                   '31337'                    │
└─────────┴──────────────────────────────────────────────┘
```

### chainlink:fund-eth

Open the Docker Desktop and run the Hardhat node by typing `npx hardhat node`.

Funds the Chainlink Node with ETH to fulfill requests.

```console
npx hardhat chainlink:fund-eth <node_address> <eth_amount> --network localhost
```

- Input parameters:
  `node_address` - The Address of a Chainlink Node on a Hardhat Network.
  `eth_amount` - The amount of Hardhat's Network ETH.

#### Example

```console
npx hardhat chainlink:fund-eth 0x786729C810294D47E935aE636F66f6cE35E9B99d 20 --network localhost
```

Now recheck the Node info again, to see the updated balance.

```console
npx hardhat chainlink:node-info --network localhost
```

The output will look like this:

```console
┌─────────┬──────────────────────────────────────────────┐
│ (index) │                    Values                    │
├─────────┼──────────────────────────────────────────────┤
│ Address │ '0x786729C810294D47E935aE636F66f6cE35E9B99d' │
│ Balance │            '20.000000000000000000'           │
│ ChainID │                   '31337'                    │
└─────────┴──────────────────────────────────────────────┘
```

### chainlink:deploy-link

Open the Docker Desktop and run the Hardhat node by typing `npx hardhat node`.

Deploys the LINK token smart contract on a Hardhat Network. LINK token will be used by the Consumer contract to pay for Oracle requests.

```console
npx hardhat chainlink:deploy-link --network localhost
```

The output will look like this:

```console
┌────────────────────┬──────────────────────────────────────────────┐
│      (index)       │                    Values                    │
├────────────────────┼──────────────────────────────────────────────┤
│ Link Token Address │ '0x5FbDB2315678afecb367f032d93F642f64180aa3' │
└────────────────────┴──────────────────────────────────────────────┘
```

### chainlink:deploy-oracle

Open the Docker Desktop and run the Hardhat node by typing `npx hardhat node`.

Deploys the Oracle contract.

```console
npx hardhat chainlink:deploy-oracle <node_address> <link_address> --network localhost
```

- Input parameters:
  `node_address` - The Address of a Chainlink Node on a Hardhat Network.
  `link_address` - The Address of a LINK token smart contract on a Hardhat Network.

#### Example

```console
npx hardhat chainlink:deploy-oracle 0x786729C810294D47E935aE636F66f6cE35E9B99d 0x5FbDB2315678afecb367f032d93F642f64180aa3 --network localhost
```

The output will look like this:

```console
┌────────────────┬──────────────────────────────────────────────┐
│    (index)     │                    Values                    │
├────────────────┼──────────────────────────────────────────────┤
│ Oracle Address │ '0xBe576260A47175829f250732421522B7ec204D06' │
└────────────────┴──────────────────────────────────────────────┘
```

### chainlink:create-job

Open the Docker Desktop and run the Hardhat node by typing `npx hardhat node`.

Creates a Chainlink Job.

```console
npx hardhat chainlink:create-job <oracle_address> <job_type>{cron | direct}
```

- Input parameters:
  `oracle_address` - The Address of an Oracle smart contract on a Hardhat Network.
  `job_type` - The Chainlink Job type. It can be either `cron` or `direct`.

#### Example

```console
npx hardhat chainlink:create-job 0x5FbDB2315678afecb367f032d93F642f64180aa3 direct
```

The output will look like this:

```console
┌────────────┬────────────────────────────────────────┐
│  (index)   │                 Values                 │
├────────────┼────────────────────────────────────────┤
│   Status   │               'Success'                │
│   Error    │                  null                  │
│   JobID    │                  '1'                   │
│ ExternalID │ '95cd6192-8dc8-4e1d-903d-3e7b885bc9d5' │
└────────────┴────────────────────────────────────────┘
```

### TROUBLESHOOTING

If you turn off the hardhat node all history will get wiped. In that case, you will also need to run the chainlink node again using the `chainlink:run-node` command.

If the chainlink node becomes out of sync (info not updating) then you can run `chainlink:run-node true` which will restart the node without destroying the containers.

Take note of the External ID of the Job.
