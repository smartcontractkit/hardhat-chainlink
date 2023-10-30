# Hardhat Chainlink Plugin Documentation
This document provides detailed information about each service module and its related methods available in the Hardhat Chainlink plugin.


<!-- TOC -->
* [Hardhat Chainlink Plugin Documentation](#hardhat-chainlink-plugin-documentation)
  * [Data Feed Services](#data-feed-services)
    * [Service alias: `dataFeed`](#service-alias-datafeed)
    * [Methods](#methods)
      * [Get Latest RoundAnswer](#get-latest-roundanswer)
      * [Get Round Answer](#get-round-answer)
      * [Get Latest Round Data](#get-latest-round-data)
      * [Get Round Data](#get-round-data)
      * [Get LatestRoundId](#get-latestroundid)
      * [Get Decimals](#get-decimals)
      * [Get Description](#get-description)
      * [Get Version](#get-version)
    * [Service alias: `dataFeedProxy`](#service-alias-datafeedproxy)
    * [Methods](#methods-1)
      * [Get Latest Round Answer](#get-latest-round-answer)
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
    * [Methods](#methods-2)
      * [Get Latest Round Data](#get-latest-round-data-2)
      * [Get Round Data](#get-round-data-2)
      * [Get Proposed Latest Round Data](#get-proposed-latest-round-data)
      * [Get Proposed Round Data](#get-proposed-round-data)
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
    * [Methods](#methods-3)
      * [Is L2 Sequencer Up](#is-l2-sequencer-up)
      * [Get Time Since L2 Sequencer Is Up](#get-time-since-l2-sequencer-is-up)
    * [Service alias: `ens`](#service-alias-ens)
    * [Methods](#methods-4)
      * [Resolve Aggregator Address](#resolve-aggregator-address)
      * [Resolve Aggregator Address With Subdomains](#resolve-aggregator-address-with-subdomains)
  * [VRF Service](#vrf-service)
    * [Service alias: `vrf`](#service-alias-vrf)
    * [Methods](#methods-5)
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
    * [Methods](#methods-6)
      * [Register Upkeep](#register-upkeep)
      * [Get Pending Request](#get-pending-request)
      * [Cancel Request](#cancel-request)
      * [Get Registration Config](#get-registration-config)
      * [Get Type And Version](#get-type-and-version-1)
    * [Service alias: `automationRegistry`](#service-alias-automationregistry)
    * [Methods](#methods-7)
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
  * [Functions Services](#functions-services)
    * [Service alias: `functionsRouter`](#service-alias-functionsrouter)
    * [Methods](#methods-8)
      * [Create subscription](#create-subscription-1)
      * [Fund subscription](#fund-subscription-1)
      * [Cancel subscription](#cancel-subscription-1)
      * [Get subscription details](#get-subscription-details-1)
      * [Request subscription owner transfer](#request-subscription-owner-transfer-1)
      * [Accept subscription owner transfer](#accept-subscription-owner-transfer-1)
      * [Add subscription consumer](#add-subscription-consumer)
      * [Remove subscription consumer](#remove-subscription-consumer)
      * [Timeout requests](#timeout-requests)
        * [Task/Subtask](#tasksubtask)
        * [HRE](#hre)
      * [Estimate the cost of a request](#estimate-the-cost-of-a-request)
      * [Initialize SubscriptionManager class](#initialize-subscriptionmanager-class)
      * [Initialize ResponseListener class](#initialize-responselistener-class)
      * [Initialize SecretsManager class](#initialize-secretsmanager-class)
      * [Listen for a response for single Functions request](#listen-for-a-response-for-single-functions-request)
      * [Listen for a response for single Functions request (from transaction)](#listen-for-a-response-for-single-functions-request-from-transaction)
      * [Listen for responses](#listen-for-responses)
      * [Stop responses listener](#stop-responses-listener)
      * [Stop responses listener](#stop-responses-listener-1)
      * [Fetch DON public keys](#fetch-don-public-keys)
      * [Encrypt Gist URLs](#encrypt-gist-urls)
      * [Verify Gists secret URLs](#verify-gists-secret-urls)
      * [Encrypt secrets](#encrypt-secrets)
      * [Upload encrypted secrets to DON](#upload-encrypted-secrets-to-don)
      * [List DON hosted encrypted secrets](#list-don-hosted-encrypted-secrets)
      * [Build DON hosted encrypted secrets reference](#build-don-hosted-encrypted-secrets-reference)
  * [Utilities](#utilities)
    * [Service alias: `utils`](#service-alias-utils)
    * [Methods](#methods-9)
      * [Get Data Feed Proxy/Registry Round ID](#get-data-feed-proxyregistry-round-id)
      * [Parse Data Feed Proxy/Registry Round ID](#parse-data-feed-proxyregistry-round-id)
      * [Transfer ETH](#transfer-eth)
      * [Create GitHub gist](#create-github-gist)
      * [Delete GitHub gist](#delete-github-gist)
  * [Sandbox `sandbox`](#sandbox-sandbox)
    * [Service alias: `functionsSimulation`](#service-alias-functionssimulation)
    * [Methods](#methods-10)
      * [Simulate Functions Request](#simulate-functions-request)
    * [Service alias: `node`](#service-alias-node)
    * [Methods](#methods-11)
      * [Run Chainlink node](#run-chainlink-node)
      * [Restart Chainlink node](#restart-chainlink-node)
      * [Stop Chainlink node](#stop-chainlink-node)
      * [Get ETH keys](#get-eth-keys)
      * [Get P2P keys](#get-p2p-keys)
      * [Get OCR keys](#get-ocr-keys)
      * [Get jobs](#get-jobs)
      * [Create Direct Request job](#create-direct-request-job)
    * [Service alias: `linkToken`](#service-alias-linktoken)
    * [Methods](#methods-12)
      * [Deploy contract](#deploy-contract)
      * [Transfer](#transfer)
      * [Get allowance](#get-allowance)
      * [Increase approval](#increase-approval)
      * [Decrease approval](#decrease-approval)
    * [Service alias: `operator`](#service-alias-operator)
    * [Methods](#methods-13)
      * [Deploy contract](#deploy-contract-1)
      * [Set authorized sender](#set-authorized-sender)
    * [Service alias: `drConsumer`](#service-alias-drconsumer)
    * [Methods](#methods-14)
      * [Deploy contract](#deploy-contract-2)
      * [Request data](#request-data)
      * [Get latest answer](#get-latest-answer)
    * [Service alias: `functionsConsumer`](#service-alias-functionsconsumer)
    * [Methods](#methods-15)
      * [Deploy contract](#deploy-contract-3)
      * [Send Functions request](#send-functions-request)
      * [Send Encoded Functions request](#send-encoded-functions-request)
      * [Set DON ID](#set-don-id)
      * [Get DON ID](#get-don-id)
      * [Get last request ID](#get-last-request-id)
      * [Get last response](#get-last-response)
      * [Get last error](#get-last-error)
<!-- TOC -->

## Data Feed Services

Chainlink [Data Feeds](https://docs.chain.link/data-feeds) are decentralized oracles that provide reliable off-chain data to smart contracts on the blockchain.
Using this service, developers can access the latest round answer and other relevant information from the Data Feeds,
enabling them to fetch real-world data in their web3 projects.

### Service alias: `dataFeed`

This section provides methods and functionalities designed to interact with the OffchainAggregator smart contract, 
which serves as the core component of Chainlink Data Feeds.

### Methods

#### Get Latest RoundAnswer

- **Method:** getLatestRoundAnswer
- **Description:** Get the latest round answer for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed

#### Get Round Answer

- **Method:** getRoundAnswer
- **Description:** Get the round answer for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed
  - `roundId`: Round ID of Data Feed

#### Get Latest Round Data

- **Method:** getLatestRoundData
- **Description:** Get the latest round data for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed

#### Get Round Data

- **Method:** getRoundData
- **Description:** Get the round data for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed
  - `roundId`: Round ID of Data Feed

#### Get LatestRoundId

- **Method:** getLatestRoundId
- **Description:** Get the latest round ID
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed
  - `roundId`: Round ID of Data Feed

#### Get Decimals

- **Method:** getDecimals
- **Description:** Get the decimals for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed

#### Get Description

- **Method:** getDescription
- **Description:** Get the description for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed

#### Get Version

- **Method:** getAggregatorVersion
- **Description:** Get the version for a data feed
- **Arguments:**
  - `dataFeedAddress`: Address of Data Feed


### Service alias: `dataFeedProxy`

This section provides methods and functionalities designed to interact with the EACAggregatorProxy smart contract, 
which acts as a proxy for Chainlink Data Feeds.

### Methods

#### Get Latest Round Answer

- **Method:** getLatestRoundAnswer
- **Description:** Get the latest round answer for a current data feed via proxy
- **Arguments:**
  - `dataFeedProxyAddress`: Address of Data Feed Proxy

#### Get Round Answer

- **Method:** getRoundAnswer
- **Description:** Get round answer for a current data feed via proxy
- **Arguments:**
  - `dataFeedProxyAddress`: Address of Data Feed Proxy
  - `roundId`: Round ID of Data Feed Proxy

#### Get Latest Round Data

- **Method:** getLatestRoundData
- **Description:** Get the latest round data for a current data feed via proxy
- **Arguments:**
  - `dataFeedProxyAddress`: Address of Data Feed Proxy

#### Get Round Data

- **Method:** getRoundData
- **Description:** Get round data for a current data feed via proxy
- **Arguments:**
  - `dataFeedProxyAddress`: Address of Data Feed
  - `roundId`: Round ID of Data Feed Proxy

#### Get Latest RoundId

- **Method:** getLatestRoundId
- **Description:** Get the latest round ID of a proxy
- **Arguments:**
  - `dataFeedProxyAddress`: Address of Data Feed Proxy
  - `roundId`: Round ID of Data Feed Proxy

#### Get Decimals

- **Method:** getDecimals
- **Description:** Get decimals for a data feed
- **Arguments:**
  - `dataFeedProxyAddress`: Address of Data Feed Proxy

#### Get Description

- **Method:** getDescription
- **Description:** Get description for a current data feed via proxy
- **Arguments:**
  - `dataFeedProxyAddress`: Address of Data Feed Proxy

#### Get Version

- **Method:** getVersion
- **Description:** Get version for a current data feed via proxy
- **Arguments:**
  - `dataFeedProxyAddress`: Address of Data Feed Proxy

#### Get Aggregator

- **Method:** getAggregator
- **Description:** Get current data feed address via proxy
- **Arguments:**
  - `dataFeedProxyAddress`: Address of Data Feed Proxy

#### Get PhaseId

- **Method:** getPhaseId
- **Description:** Get current phase ID of a proxy
- **Arguments:**
  - `dataFeedProxyAddress`: Address of Data Feed Proxy

#### Get Phase Aggregators

- **Method:** getPhaseAggregators
- **Description:** Get data feed address related to a phase ID of a proxy
- **Arguments:**
  - `dataFeedProxyAddress`: Address of Data Feed Proxy
  - `phaseId`: Phase ID of Data Feed Proxy


### Service alias: `feedRegistry`

This section provides methods and functionalities designed to interact with the [Feed Registry](https://docs.chain.link/data-feeds/feed-registry) smart contracts,
which acts is an on-chain mapping of assets to Data Feeds.

> **Note**
>  Chainlink Feed Registry is exclusively available on the Ethereum mainnet.

### Methods

#### Get Latest Round Data

- **Method:** `getLatestRoundData`
- **Description:** Get the latest round data for a specific data feed from the Feed Registry
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair

#### Get Round Data

- **Method:** `getRoundData`
- **Description:** Get the round data for a specific data feed from the Feed Registry based on the provided round ID
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `roundId`: Feed Registry Round ID

#### Get Proposed Latest Round Data

- **Method:** `proposedGetLatestRoundData`
- **Description:** Get the latest round data (proposed) for a specific data feed from the Feed Registry
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair

#### Get Proposed Round Data

- **Method:** `proposedGetRoundData`
- **Description:** Get the round data (proposed) for a specific data feed from the Feed Registry based on the provided round ID
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `roundId`: Data Feed Round ID

#### Get Round Feed

- **Method:** `getRoundFeed`
- **Description:** Get the data feed address for a specific data feed from the Feed Registry based on the provided round ID
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `roundId`: Feed Registry Round ID

#### Get Feed

- **Method:** `getFeed`
- **Description:** Get current data feed address for a specific token pair from the Feed Registry
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair

#### Get Proposed Feed

- **Method:** `getProposedFeed`
- **Description:** Get the proposed data feed address for a specific token pair from the Feed Registry
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair

#### Is Feed Enabled

- **Method:** `isFeedEnabled`
- **Description:** Check if a specific data feed is enabled in the Feed Registry
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `aggregatorAddress`: Address of a Data Feed Offchain Aggregator

#### Get Previous Round ID

- **Method:** `getPreviousRoundId`
- **Description:** Get previous round ID for a specific data feed from the Feed Registry based on the provided round ID
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `roundId`: Feed Registry Round ID

#### Get Next Round ID

- **Method:** `getNextRoundId`
- **Description:** Get next round ID for a specific data feed from the Feed Registry based on the provided round ID
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `roundId`: Feed Registry Round ID

#### Get Decimals

- **Method:** `getDecimals`
- **Description:** Get the decimals of a specific data feed from the Feed Registry
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair

#### Get Description

- **Method:** `getDescription`
- **Description:** Get the description of a specific data feed from the Feed Registry
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair

#### Get Version

- **Method:** `getVersion`
- **Description:** Get the version of a specific data feed from the Feed Registry
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair

#### Get Phase

- **Method:** `getPhase`
- **Description:** Get phase data for a specific data feed from the Feed Registry based on the provided phase ID
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `phaseId`: Feed Registry Phase ID

#### Get Phase Feed

- **Method:** `getPhaseFeed`
- **Description:** Get data feed address for a specific token pair from the Feed Registry based on the provided phase ID
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `phaseId`: Feed Registry Phase ID

#### Get Phase Range

- **Method:** `getPhaseRange`
- **Description:** Get the phase range data for a specific data feed from the Feed Registry based on the provided phase ID
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair
  - `phaseId`: Feed Registry Phase ID

#### Get Current Phase ID

- **Method:** `getCurrentPhaseId`
- **Description:** Get current phase ID for a specific data feed from the Feed Registry
- **Arguments:**
  - `feedRegistryAddress`: Address of Feed Registry
  - `feedRegistryBaseTick`: Address or denomination of the base tick in a token pair
  - `feedRegistryQuoteTick`: Address or denomination of the quote tick in a token pair


### Service alias: `l2Sequencer`

This section provides methods and functionalities designed to interact with the L2 Sequencer Uptime Feeds, 
which acts as data feeds that track the availability status of the sequencer in Layer 2 (L2) networks, specifically in optimistic rollup protocols.

> **Note**
> L2 Sequencer Uptime Feeds are available only on specific networks, 
> including Arbitrum mainnet, Arbitrum Goerli testnet, Optimism mainnet, 
> Optimism Goerli testnet, and Metis mainnet (Andromeda)

### Methods

#### Is L2 Sequencer Up

- **Method:** `isL2SequencerUp`
- **Description:** Checks the availability status of the Layer 2 (L2) Sequencer using the provided address of the Layer 2 Sequencer Uptime Status Feed
- **Arguments:**
  - `l2SequencerAddress`: Address of the Layer 2 Sequencer Uptime Status Feed

#### Get Time Since L2 Sequencer Is Up

- **Method:** `getTimeSinceL2SequencerIsUp`
- **Description:** Retrieves the time elapsed since the Layer 2 (L2) Sequencer has been up and operational, based on the provided address of the Layer 2 Sequencer Uptime Status Feed
- **Arguments:**
  - `l2SequencerAddress`: Address of the Layer 2 Sequencer Uptime Status Feed
  - `gracePeriodTime`: Grace period duration in which the Sequencer is allowed to not return results

### Service alias: `ens`

This section provides methods and functionalities designed to interact with the [Chainlink ENS Resolver](https://docs.chain.link/data-feeds/ens).

> **Note**
>  Chainlink ENS is exclusively available on the Ethereum mainnet.

### Methods

#### Resolve Aggregator Address

- **Method:** `resolveAggregatorAddress`
- **Description:** Resolve Data Feed address for a token pair using the Chainlink ENS Resolver
- **Arguments:**
  - `baseTick`: Base tick of the token pair
  - `quoteTick`: Quote tick of the token pair

#### Resolve Aggregator Address With Subdomains

- **Method:** `resolveAggregatorAddressWithSubdomains`
- **Description:** Resolve Data Feed address for a token pair using the Chainlink ENS Resolver with subdomains
- **Arguments:**
  - `baseTick`: Base tick of the token pair.
  - `quoteTick`: Quote tick of the token pair.

## VRF Service

Chainlink [VRF](https://docs.chain.link/vrf/v2/introduction) (Verifiable Random Function) service is a critical component
provided by Chainlink that enables smart contracts on the blockchain to securely and transparently access cryptographically secure and unpredictable randomness.

### Service alias: `vrf`

This section provides methods and functionalities designed to interact with the VRFCoordinator smart contract,
which serves as the intermediary between smart contracts on the blockchain and the VRF service.

### Methods

#### Create Subscription

- **Method:** createSubscription
- **Description:** Create a new subscription to the VRF service
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract

#### Fund Subscription

- **Method:** fundSubscription
- **Description:** Fund a subscription to the VRF service with LINK tokens
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `linkTokenAddress`: Address of the LINK token contract
  - `amountInJuels`: Amount of LINK tokens to be sent (in Juels)
  - `subscriptionId`: VRF Subscription ID

#### Cancel Subscription

- **Method:** cancelSubscription
- **Description:** Cancel a subscription to the VRF service and receive the remaining balance
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `subscriptionId`: VRF Subscription ID
  - `receivingAddress`: Address to receive the balance of the subscription

#### Add Consumer

- **Method:** addConsumer
- **Description:** Add a new consumer to an existing VRF subscription
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `consumerAddress`: Address of the consumer
  - `subscriptionId`: VRF Subscription ID

#### Remove Consumer

- **Method:** removeConsumer
- **Description:** Remove a consumer from an existing VRF subscription
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `consumerAddress`: Address of the consumer
  - `subscriptionId`: VRF Subscription ID

#### Get Subscription Details

- **Method:** getSubscriptionDetails
- **Description:** Get details of an existing VRF subscription
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `subscriptionId`: VRF Subscription ID

#### Request Random Words

- **Method:** requestRandomWords
- **Description:** Request random words from the VRF service
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `keyHash`: Key hash related to maxGasPrice of a VRF. Different keyHashes have different gas prices
  - `subscriptionId`: VRF Subscription ID. Must be funded with the minimum subscription balance required for the selected keyHash
  - `requestConfirmations`: How many blocks you'd like the oracle to wait before responding to the request
  - `callbackGasLimit`: How much gas you allow for fulfillRandomWords callback
  - `numWords`: The number of random values you'd like to receive in fulfillRandomWords callback

#### Check Pending Request

- **Method:** isPendingRequestExists
- **Description:** Check if there is a pending request for an existing VRF subscription
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `subscriptionId`: VRF Subscription ID

#### Request Subscription Owner Transfer

- **Method:** requestSubscriptionOwnerTransfer
- **Description:** Request to transfer ownership of a VRF subscription to a new owner
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `subscriptionId`: VRF Subscription ID
  - `newOwnerAddress`: Address of the new subscription owner

#### Accept Subscription Owner Transfer

- **Method:** acceptSubscriptionOwnerTransfer
- **Description:** Accept the transfer of ownership of a VRF subscription
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `subscriptionId`: VRF Subscription ID

#### Get Maximum Consumers

- **Method:** getMaxConsumers
- **Description:** Get the maximum number of consumers that can be added to a VRF subscription
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract

#### Get Maximum Number of Words

- **Method:** getMaxNumberOfWords
- **Description:** Get the maximum number of random words that can be requested from the VRF service
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract

#### Get Maximum Request Confirmations

- **Method:** getMaxRequestConfirmations
- **Description:** Get the maximum number of block confirmations allowed for a VRF request
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract

#### Get Minimum Request Confirmations

- **Method:** getMinRequestConfirmations
- **Description:** Get the minimum number of block confirmations required for a VRF request
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract

#### Get Maximum Request Gas Limit

- **Method:** getMaxRequestGasLimit
- **Description:** Get the maximum gas limit for a VRF request
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract

#### Get Commitment

- **Method:** getCommitment
- **Description:** Get the commitment data for a VRF request
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract
  - `requestId`: Request ID

#### Get Configuration

- **Method:** getConfig
- **Description:** Get the configuration details of VRF Coordinator
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract

#### Get Type and Version

- **Method:** getTypeAndVersion
- **Description:** Get the type and version details of VRF Coordinator
- **Arguments:**
  - `vrfCoordinatorAddress`: Address of VRF Coordinator contract

## Automation Services

Chainlink [Automation](https://docs.chain.link/vrf/v2/introduction) service enables conditional execution 
of your smart contracts functions through a hyper-reliable and decentralized automation platform.

### Service alias: `automationRegistrar`

This section provides methods and functionalities designed to interact with the KeeperRegistrar smart contract,
which accepts requests for upkeep registrations.

### Methods

#### Register Upkeep

- **Method:** registerUpkeep
- **Description:** Register an upkeep task for Chainlink Keepers to perform on a specified contract
- **Arguments:**
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

#### Get Pending Request

- **Method:** getPendingRequest
- **Description:** Get information about a pending registration request for an upkeep task
- **Arguments:**
  - `keeperRegistrarAddress`: Address of Keeper Registrar
  - `requestHash`: Hash of the registration request

#### Cancel Request

- **Method:** cancelRequest
- **Description:** Cancel a pending registration request for an upkeep task
- **Arguments:**
  - `keeperRegistrarAddress`: Address of Keeper Registrar
  - `requestHash`: Hash of the registration request

#### Get Registration Config

- **Method:** getRegistrationConfig
- **Description:** Get the registration configuration for upkeep tasks from the Keeper Registrar
- **Arguments:**
  - `keeperRegistrarAddress`: Address of Keeper Registrar

#### Get Type And Version

- **Method:** getTypeAndVersion
- **Description:** Get the type and version for the Keeper Registrar
- **Arguments:**
  - `keeperRegistrarAddress`: Address of Keeper Registrar

### Service alias: `automationRegistry`

This section provides methods and functionalities designed to interact with the KeeperRegistry smart contract,
which serves to add tasks for Chainlink Keepers to perform on client contracts.

### Methods

#### Get State

- **Method:** getState
- **Description:** Get the current state of Keeper Registry
- **Arguments:**
  - `keeperRegistryAddress`: Address of Keeper Registry

#### Get Active Upkeep IDs

- **Method:** getActiveUpkeepIDs
- **Description:** Get a list of active upkeep IDs from Keeper Registry
- **Arguments:**
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `startIndex`: Starting index of Upkeeps to get
  - `maxCount`: Quantity of Upkeeps to get

#### Get Max Payment For Gas

- **Method:** getMaxPaymentForGas
- **Description:** Get maximum payment for the gas limit, calculated using the Keeper Registry parameters
- **Arguments:**
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `gasLimit`: Gas limit

#### Is Paused

- **Method:** isPaused
- **Description:** Check if the Keeper Registry is currently paused
- **Arguments:**
  - `keeperRegistryAddress`: Address of Keeper Registry

#### Get Upkeep

- **Method:** getUpkeep
- **Description:** Get information about a specific upkeep from the Keeper Registry
- **Arguments:**
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `upkeepId`: Upkeep ID

#### Get Min Balance For Upkeep

- **Method:** getMinBalanceForUpkeep
- **Description:** Get the minimum required balance for upkeep from the Keeper Registry
- **Arguments:**
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `upkeepId`: Upkeep ID

#### Fund Upkeep

- **Method:** fundUpkeep
- **Description:** Fund an upkeep task with a specified amount of LINK in Juels
- **Arguments:**
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `upkeepId`: Upkeep ID
  - `amountInJuels`: Amount of LINK in Juels to fund upkeep

#### Cancel Upkeep

- **Method:** cancelUpkeep
- **Description:** Cancel an upkeep task in Keeper Registry
- **Arguments:**
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `upkeepId`: Upkeep ID

#### Withdraw Funds

- **Method:** withdrawFunds
- **Description:** Withdraw funds from an upkeep task in Keeper Registry
- **Arguments:**
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `upkeepId`: Upkeep ID
  - `receivingAddress`: Address to withdraw funds

#### Migrate Upkeeps

- **Method:** migrateUpkeeps
- **Description:** Migrate multiple upkeep tasks to another Keeper Registry
- **Arguments:**
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `upkeepIds`: Upkeep IDs to migrate
  - `destination`: Address of destination Keeper Registry

#### Get Keeper Info

- **Method:** getKeeperInfo
- **Description:** Get information about a specific keeper from Keeper Registry
- **Arguments:**
  - `keeperRegistryAddress`: Address of Keeper Registry
  - `keeperAddress`: Keeper address

#### Get Type And Version

- **Method:** getTypeAndVersion
- **Description:** Get the type and version for Keeper Registry
- **Arguments:**
  - `keeperRegistryAddress`: Address of Keeper Registry

#### Get Upkeep Transcoder Version

- **Method:** getUpkeepTranscoderVersion
- **Description:** Get the upkeep transcoder version from Keeper Registry
- **Arguments:**
  - `keeperRegistryAddress`: Address of Keeper Registry

## Functions Services

Chainlink [Functions](https://docs.chain.link/chainlink-functions) service provides your smart contracts access to 
trust-minimized compute infrastructure, allowing you to fetch data from APIs and perform custom computation.

> **Note**  
> Most of the methods under this section are thin wrappers for the methods provided by 
> the [functions-toolkit](https://github.com/smartcontractkit/functions-toolkit) NPM package.

### Service alias: `functionsRouter`

This section provides methods and functionalities designed to interact with the Functions Router smart contract.

### Methods

#### Create subscription

- **Method:** createSubscription
- **Description:** Create Functions subscription
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `consumerAddress`: Address of Functions Consumer (Default: "")

#### Fund subscription

- **Method:** fundSubscription
- **Description:** Fund Functions subscription
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `linkTokenAddress`: Address of Link Token
  - `amountInJuels`: Amount of LINK in Juels to fund Subscription
  - `subscriptionId`: Subscription ID

#### Cancel subscription

- **Method:** cancelSubscription
- **Description:** Cancel Functions subscription
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `subscriptionId`: Subscription ID
  - `receivingAddress`: Address to receive the balance of Subscription (Default: "")

#### Get subscription details

- **Method:** getSubscriptionDetails
- **Description:** Get subscription details
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `subscriptionId`: Subscription ID

#### Request subscription owner transfer

- **Method:** requestSubscriptionOwnerTransfer
- **Description:** Request subscription owner transfer
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `subscriptionId`: Subscription ID
  - `newOwnerAddress`: Address of new owner of Subscription

#### Accept subscription owner transfer

- **Method:** acceptSubscriptionOwnerTransfer
- **Description:** Accept subscription owner transfer
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `subscriptionId`: Subscription ID

#### Add subscription consumer

- **Method:** addConsumer
- **Description:** Add subscription consumer
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `consumerAddress`: Address of Functions Consumer
  - `subscriptionId`: Subscription ID

#### Remove subscription consumer

- **Method:** removeConsumer
- **Description:** Remove subscription consumer
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `consumerAddress`: Address of Functions Consumer
  - `subscriptionId`: Subscription ID

#### Timeout requests

##### Task/Subtask
- **Method:** timeoutRequests
- **Description:** Timeout pending Functions request
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `requestIdsString`: Comma-separated requests IDs
  - `donId`: ID of the DON where Functions requests has been sent
  - `toBlock`: End block in search range (Default: "latest")
  - `pastBlocksToSearch`: Number of blocks to search (before toBlock) (Default: "1000")

##### HRE
- **Method:** timeoutRequests
- **Description:** Timeout pending Functions request
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `requestCommitments`: Array of RequestCommitment objects

#### Estimate the cost of a request
- **Method:** estimateRequestCost
- **Description:** Estimate the cost of a request
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to which the Functions request will be sent
  - `subscriptionId`: Subscription ID
  - `callbackGasLimit`: Total gas used by the consumer contract's callback
  - `gasPriceWei`: Gas price in wei

> **Note**
> The following are methods that are available only in HRE

#### Initialize SubscriptionManager class
- **Method:** initializeFunctionsSubscriptionManager
- **Description:** Initialize [SubscriptionManager class](https://github.com/smartcontractkit/functions-toolkit#functions-billing-subscription-management)
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `linkTokenAddress`: Address of Link Token

#### Initialize ResponseListener class
- **Method:** initializeFunctionsResponseListener
- **Description:** Initialize [ResponseListener class](https://github.com/smartcontractkit/functions-toolkit#functions-response-listener)
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router

#### Initialize SecretsManager class
- **Method:** initializeFunctionsSecretsManager
- **Description:** Initialize [SecretsManager class](https://github.com/smartcontractkit/functions-toolkit#functions-encrypted-secrets-management)
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to work with

#### Listen for a response for single Functions request
- **Method:** listenForResponse
- **Description:** Listen for a response for single Functions request
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `requestId`: ID of the DON to which the Functions request will be sent
  - `timeout`: Subscription ID (Default: 300_000)

#### Listen for a response for single Functions request (from transaction)
- **Method:** listenForResponseFromTransaction
- **Description:** Listen for a response for single Functions request (from transaction)
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `transactionHash`: Transaction hash to start listen from
  - `timeout`: Listener timeout (Default: 300000)
  - `confirmations`: Number of block confirmations (Default: 2)
  - `checkInterval`: Frequency of checking for a response to appear on-chain (Default: 2000)

#### Listen for responses
- **Method:** listenForResponses
- **Description:** Listen for multiple Functions responses
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `subscriptionId`: Subscription ID
  - `callback`: Callback to be called when responses are fulfilled

#### Stop responses listener
- **Method:** stopListeningForResponses
- **Description:** Stop responses listener
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router

#### Stop responses listener
- **Method:** stopListeningForResponses
- **Description:** Stop responses listener
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router

#### Fetch DON public keys
- **Method:** fetchKeys
- **Description:** Fetch DON public keys
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to fetch keys from

#### Encrypt Gist URLs
- **Method:** encryptSecretsUrls
- **Description:** Encrypt Gists URLs with DON public key to produce encryptedSecretsReference
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to fetch keys from

#### Verify Gists secret URLs
- **Method:** verifyOffchainSecrets
- **Description:** Verify if provided Gists secret URLs are valid
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to fetch keys from
  - `secretsUrls`: URLs of secrets

#### Encrypt secrets
- **Method:** encryptSecrets
- **Description:** Encrypt secrets for Functions
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to work with
  - `secrets`: String key/value pairs of secrets

#### Upload encrypted secrets to DON
- **Method:** uploadEncryptedSecretsToDON
- **Description:** Upload encrypted secrets to DON
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to work with
  - `encryptedSecretsHexstring`: HEX string of encrypted secrets. Result of encryptSecrets() method
  - `gatewayUrls`: DON gateway URLs
  - `slotId`: Storage slot ID, can be any integer value of zero or greater
  - `minutesUntilExpiration`: Minutes after secrets will be deleted from all DON nodes

#### List DON hosted encrypted secrets
- **Method:** listDONHostedEncryptedSecrets
- **Description:** Get list of DON hosted encrypted secrets
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to work with
  - `gatewayUrls`: DON gateway URLs

#### Build DON hosted encrypted secrets reference
- **Method:** buildDONHostedEncryptedSecretsReference
- **Description:** Build DON hosted encrypted secrets reference (encryptedSecretsReference)
- **Arguments:**
  - `functionsRouterAddress`: Address of Functions Router
  - `donId`: ID of the DON to work with
  - `slotId`: Storage slot ID, can be any integer value of zero or greater
  - `version`: Reference version, any integer value of zero or greater

## Utilities

The plugin utility methods.

### Service alias: `utils`

### Methods

#### Get Data Feed Proxy/Registry Round ID

- **Method:** getRoundId
- **Description:** Obtain the Data Feed Proxy/Registry round ID using the provided phase ID and aggregator round ID
- **Arguments:**
  - `phaseId`: Data Feed Proxy/Registry phase ID
  - `aggregatorRoundId`: Data Feed round ID

#### Parse Data Feed Proxy/Registry Round ID

- **Method:** parseRoundId
- **Description:** Parse the given Data Feed Proxy/Registry round ID to extract relevant information
- **Arguments:**
  - `roundId`: Data Feed Proxy/Registry round ID

#### Transfer ETH

- **Method:** transferETH
- **Description:** Transfer ETH to recipient
- **Arguments:**
  - `recipient`: Recipient address
  - `amount`: Amount of ETH in wei

#### Create GitHub gist

- **Method:** createGist
- **Description:** Create private GitHub gist
- **Arguments:**
  - `githubApiToken`: GitHub API token
  - `content`: Gist content

#### Delete GitHub gist

- **Method:** deleteGist
- **Description:** Delete private GitHub gist
- **Arguments:**
  - `githubApiToken`: GitHub API token
  - `content`: Gist content

## Sandbox `sandbox`

This module contains a group of services for starting and managing a Chainlink node and setting up Chainlink jobs.

### Service alias: `functionsSimulation`

This section provides methods and functionalities designed to run Functions request simulations.

### Methods

#### Simulate Functions Request

- **Method:** simulateRequest
- **Description:** Simulate Functions request
- **Arguments:**
  - `source`: Source code to execute
  - `args`: Comma-separated request args
  - `bytesArgs`: Comma-separated request bytes args

### Service alias: `node`

This section provides methods and functionalities designed to spin up and manage Chainlink node.

### Methods

#### Run Chainlink node

- **Method:** run
- **Description:** Run local Chainlink node

#### Restart Chainlink node

- **Method:** restart
- **Description:** Restart local Chainlink node

#### Stop Chainlink node

- **Method:** stop
- **Description:** Stop local Chainlink node

#### Get ETH keys

- **Method:** getETHKeys
- **Description:** Get list of Chainlink node's ETH keys

#### Get P2P keys

- **Method:** getP2PKeys
- **Description:** Get list of Chainlink node's P2P keys

#### Get OCR keys

- **Method:** getOCRKeys
- **Description:** Get list of Chainlink node's OCR keys

#### Get jobs

- **Method:** getJobs
- **Description:** Get list of Chainlink node's jobs

#### Create Direct Request job

- **Method:** createDirectRequestJob
- **Description:** Set up Direct Request job for local Chainlink node
- **Arguments:**
  - `operatorAddress`: Operator contract address

Check Direct Request job configuration template: [direct-request-job_template.toml](src%2Fsandbox%2Fnode%2Fsetup%2Fclroot%2Fjobs%2Fdirect-request-job_template.toml). 

### Service alias: `linkToken`

This section provides methods and functionalities designed to interact with the [Link Token](contracts%2FLinkToken.sol).

### Methods

#### Deploy contract

- **Method:** deploy
- **Description:** Deploy Link Token contract

#### Transfer

- **Method:** transfer
- **Description:** Transfer Link Tokens to recipient
- **Arguments:**
  - `linkTokenAddress`: Link Token address
  - `recipient`: Account to which Link Tokens will be transferred
  - `amount`: Amount of Link Tokens to be transferred

#### Get allowance

- **Method:** getAllowance
- **Description:** Get Link Token allowance
- **Arguments:**
  - `linkTokenAddress`: Link Token address
  - `owner`: Link Tokens owner
  - `spender`: Owner's Link Tokens spender

#### Increase approval

- **Method:** increaseApproval
- **Description:** Increase Link Token approval
- **Arguments:**
  - `linkTokenAddress`: Link Token address
  - `spender`: Account for which Link Token approval will be increased
  - `addedValue`: Amount of Link Tokens to be added

#### Decrease approval

- **Method:** decreaseApproval
- **Description:** Decrease Link Token approval
- **Arguments:**
  - `linkTokenAddress`: Link Token address
  - `spender`: Account for which Link Token approval will be decreased
  - `subtractedValue`: Amount of Link Tokens to be decreased

### Service alias: `operator`

This section provides methods and functionalities designed to interact with the [Operator](contracts%2FOperator.sol).

### Methods

#### Deploy contract

- **Method:** deploy
- **Description:** Deploy Operator contract
- **Arguments:**
  - `linkTokenAddress`: Link Token address

#### Set authorized sender

- **Method:** setAuthorizedSender
- **Description:** Set authorized sender
- **Arguments:**
  - `operatorAddress`: Operator address
  - `sender`: Address to be authorized

### Service alias: `drConsumer`

This section provides methods and functionalities designed to interact with the [Direct Request Consumer](contracts%2FChainlinkDirectRequestConsumer.sol).

### Methods

#### Deploy contract

- **Method:** deploy
- **Description:** Deploy Direct Request Consumer contract
- **Arguments:**
  - `linkTokenAddress`: Link Token address

#### Request data

- **Method:** requestData
- **Description:** Request data to be fulfilled with Direct Request job
- **Arguments:**
  - `directRequestConsumerAddress`: Direct Request Consumer address
  - `operatorAddress`: Operator address
  - `externalJobID`: Direct Request External Job ID
  - `observationURL`: URL to retrieve data
  - `pathToData`: JSON path to data in observation URL response, e.g. "ethereum,usd"
  - `multiplyTimes`: Multiplier for the received answer

#### Get latest answer

- **Method:** getLatestAnswer
- **Description:** Get latest answer
- **Arguments:**
  - `directRequestConsumerAddress`: Direct Request Consumer address



### Service alias: `functionsConsumer`

This section provides methods and functionalities designed to interact with the [FunctionsConsumer.sol](contracts%2FFunctionsConsumer.sol).

### Methods

#### Deploy contract

- **Method:** deploy
- **Description:** Deploy Functions Consumer contract
- **Arguments:**
  - `functionsRouterAddress`: Functions Router address
  - `donId`: ID of the DON where Functions requests will be sent

#### Send Functions request

- **Method:** sendRequest
- **Description:** Send Functions Request
- **Arguments:**
  - `functionsRouterAddress`: Functions Router address
  - `subscriptionId`: Subscription ID
  - `source`: Source code to execute
  - `secretsLocation`: Location of secrets
  - `encryptedSecretsReference`: Encrypted secrets reference
  - `args`: Comma-separated request args (Default: "")
  - `bytesArgs`: Comma-separated request bytes args (Default: "")
  - `callbackGasLimit`: Callback gas limit (Default: "100000")

#### Send Encoded Functions request

- **Method:** sendEncodedRequest
- **Description:** Send Encoded Functions Request
- **Arguments:**
  - `functionsRouterAddress`: Functions Router address
  - `subscriptionId`: Subscription ID
  - `encodedRequest`: Encoded Functions request
  - `callbackGasLimit`: Callback gas limit (Default: "100000")

#### Set DON ID

- **Method:** setDonId
- **Description:** Set ID of the DON where Functions requests will be sent
- **Arguments:**
  - `functionsRouterAddress`: Functions Router address
  - `donId`: ID of the DON where Functions requests will be sent

#### Get DON ID

- **Method:** getDonId
- **Description:** Get current DON ID

#### Get last request ID

- **Method:** getLastRequestId
- **Description:** Get ID of the last request

#### Get last response

- **Method:** getLastResponse
- **Description:** Get last response

#### Get last error

- **Method:** getLastError
- **Description:** Get last error
