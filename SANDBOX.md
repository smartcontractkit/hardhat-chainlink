# Sandbox Documentation
This document provides a description of the suite of services available in the 'Sandbox' module (alias: sandbox) of the Hardhat Chainlink plugin.  
These services facilitate spinning up and managing a Chainlink node, as well as configuring Chainlink jobs.

<!-- TOC -->
* [Sandbox Documentation](#sandbox-documentation)
    * [Service alias: `functionsSimulation`](#service-alias-functionssimulation)
      * [Simulate Functions Request](#simulate-functions-request)
    * [Service alias: `node`](#service-alias-node)
      * [Run Chainlink node](#run-chainlink-node)
      * [Restart Chainlink node](#restart-chainlink-node)
      * [Stop Chainlink node](#stop-chainlink-node)
      * [Get ETH keys](#get-eth-keys)
      * [Get P2P keys](#get-p2p-keys)
      * [Get OCR keys](#get-ocr-keys)
      * [Get jobs](#get-jobs)
      * [Create Direct Request job](#create-direct-request-job)
    * [Service alias: `linkToken`](#service-alias-linktoken)
      * [Deploy contract](#deploy-contract)
      * [Transfer](#transfer)
      * [Get allowance](#get-allowance)
      * [Increase approval](#increase-approval)
      * [Decrease approval](#decrease-approval)
    * [Service alias: `operator`](#service-alias-operator)
      * [Deploy contract](#deploy-contract-1)
      * [Set authorized sender](#set-authorized-sender)
    * [Service alias: `drConsumer`](#service-alias-drconsumer)
      * [Deploy contract](#deploy-contract-2)
      * [Request data](#request-data)
      * [Get latest answer](#get-latest-answer)
    * [Set up a Direct Request job with plugin](#set-up-a-direct-request-job-with-plugin)
<!-- TOC -->

### Service alias: [`functionsSimulation`](src%2Fsandbox%2FfunctionsSimulations%2Findex.ts)
```typescript
const functionsSimulation = hre.chainlink.sandbox.functionsSimulation;
```
This section provides methods and functionalities designed to run Functions request simulations.

#### Simulate Functions Request

- **Method:** simulateRequest
- **Description:** Simulate Functions request
- **Arguments:** `(source: string, args: string[], bytesArgs: string[])`
  - `source`: Source code to execute
  - `args`: Request args
  - `bytesArgs`: Request bytes args
- **Returns:** `(decodedResult: DecodedResult)`
  - `decodedResult`: Decoded result of the request
- **Usage:**
  ```typescript
  const source = `
    return 0
  `;
  const args = [];
  const bytesArgs = [];
  const decodedResult = await functionsSimulation.simulateRequest(source, args, bytesArgs);
  ```

### Service alias: [`node`](src%2Fsandbox%2Fnode%2Findex.ts)
```typescript
const node = hre.chainlink.sandbox.node;
```
This section provides methods and functionalities designed to spin up and manage a Chainlink node.

#### Run Chainlink node

- **Method:** run
- **Description:** Run local Chainlink node
- **Usage:**
  ```typescript
  await node.run();
  ```

#### Restart Chainlink node

- **Method:** restart
- **Description:** Restart local Chainlink node
- **Usage:**
  ```typescript
  await node.restart();
  ```

#### Stop Chainlink node

- **Method:** stop
- **Description:** Stop local Chainlink node
- **Usage:**
  ```typescript
  await node.stop();
  ```

#### Get ETH keys

- **Method:** getETHKeys
- **Description:** Get list of Chainlink node's ETH keys
- **Returns:** `(ethKeys: string)`
  - `ethKeys`: List of Chainlink node's ETH keys
- **Usage:**
  ```typescript
  const ethKeys = await node.getETHKeys();
  ```

#### Get P2P keys

- **Method:** getP2PKeys
- **Description:** Get list of Chainlink node's P2P keys
- **Returns:** `(p2pKeys: string)`
  - `p2pKeys`: List of Chainlink node's P2P keys
- **Usage:**
  ```typescript
  const p2pKeys = await node.getP2PKeys();
  ```

#### Get OCR keys

- **Method:** getOCRKeys
- **Description:** Get list of Chainlink node's OCR keys
- **Returns:** `(ocrKeys: string)`
  - `ocrKeys`: List of Chainlink node's OCR keys
- **Usage:**
  ```typescript
  const ocrKeys = await node.getOCRKeys();
  ```

#### Get jobs

- **Method:** getJobs
- **Description:** Get list of Chainlink node's jobs
- **Returns:** `(jobs: string)`
  - `jobs`: List of Chainlink node's jobs
- **Usage:**
  ```typescript
  const jobs = await node.getJobs();
  ```

#### Create Direct Request job

- **Method:** createDirectRequestJob
- **Description:** Set up Direct Request job for local Chainlink node
- **Arguments:** `(operatorAddress: string)`
  - `operatorAddress`: Operator contract address
- **Usage:**
  ```typescript
  const operatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  await node.createDirectRequestJob(operatorAddress);
  ```

### Service alias: [`linkToken`](src%2Fsandbox%2FlinkToken%2Findex.ts)
```typescript
const linkToken = hre.chainlink.sandbox.linkToken;
```
This section provides methods and functionalities designed to interact with the [Link Token](contracts%2FLinkToken.sol).

#### Deploy contract

- **Method:** deploy
- **Description:** Deploy Link Token contract
- **Returns:** `(linkTokenAddress: string)`
  - `linkTokenAddress`: Link Token address
- **Usage:**
  ```typescript
  const linkTokenAddress = await linkToken.deploy();
  ```

#### Transfer

- **Method:** transfer
- **Description:** Transfer Link Tokens to recipient
- **Arguments:** `(linkTokenAddress: string, recipient: string, amount: BigNumberish)`
  - `linkTokenAddress`: Link Token address
  - `recipient`: Account to which Link Tokens will be transferred
  - `amount`: Amount of Link Tokens to be transferred
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that transferred the funds
- **Usage:**
  ```typescript
  const linkTokenAddress = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
  const recipient = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const amount = ethers.utils.parseEther('100');
  const txData = await linkToken.transfer(linkTokenAddress, recipient, amount);
  ```

#### Get allowance

- **Method:** getAllowance
- **Description:** Get Link Token allowance
- **Arguments:** `(linkTokenAddress: string, owner: string, spender: string)`
  - `linkTokenAddress`: Link Token address
  - `owner`: Link Tokens owner
  - `spender`: Owner's Link Tokens spender
- **Returns:** `(allowance: BigNumber)`
  - `allowance`: Link Token allowance
- **Usage:**
  ```typescript
  const linkTokenAddress = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
  const owner = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const spender = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const allowance = await linkToken.getAllowance(linkTokenAddress, owner, spender);
  ```

#### Increase approval

- **Method:** increaseApproval
- **Description:** Increase Link Token approval
- **Arguments:** `(linkTokenAddress: string, spender: string, addedValue: BigNumberish)`
  - `linkTokenAddress`: Link Token address
  - `spender`: Account for which Link Token approval will be increased
  - `addedValue`: Amount of Link Tokens to be added
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that increased the approval
- **Usage:**
  ```typescript
  const linkTokenAddress = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
  const spender = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const addedValue = '10000000000';
  const txData = await linkToken.increaseApproval(linkTokenAddress, spender, addedValue);
  ```

#### Decrease approval

- **Method:** decreaseApproval
- **Description:** Decrease Link Token approval
- **Arguments:** `(linkTokenAddress: string, spender: string, subtractedValue: BigNumberish)`
  - `linkTokenAddress`: Link Token address
  - `spender`: Account for which Link Token approval will be decreased
  - `subtractedValue`: Amount of Link Tokens to be decreased
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that decreased the approval
- **Usage:**
  ```typescript
  const linkTokenAddress = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
  const spender = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const subtractedValue = '10000000000';
  const txData = await linkToken.decreaseApproval(linkTokenAddress, spender, subtractedValue);
  ```

### Service alias: [`operator`](src%2Fsandbox%2Foperator%2Findex.ts)
```typescript
const operator = hre.chainlink.sandbox.operator;
```
This section provides methods and functionalities designed to interact with the [Operator](contracts%2FOperator.sol).

#### Deploy contract

- **Method:** deploy
- **Description:** Deploy Operator contract
- **Arguments:** `(linkTokenAddress: string)`
  - `linkTokenAddress`: Link Token address
- **Returns:** `(operatorAddress: string)`
  - `operatorAddress`: Operator address
- **Usage:**
  ```typescript
  const linkTokenAddress = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
  const operatorAddress = await operator.deploy(linkTokenAddress);
  ```

#### Set authorized sender

- **Method:** setAuthorizedSender
- **Description:** Set authorized sender
- **Arguments:** `(operatorAddress: string, sender: string)`
  - `operatorAddress`: Operator address
  - `sender`: Address to be authorized
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that set the authorized sender
- **Usage:**
  ```typescript
  const operatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const sender = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const txData = await operator.setAuthorizedSender(operatorAddress, sender);
  ```

### Service alias: [`drConsumer`](src%2Fsandbox%2FdrConsumer%2Findex.ts)
```typescript
const drConsumer = hre.chainlink.sandbox.drConsumer;
```
This section provides methods and functionalities designed to interact with the [Direct Request Consumer](contracts%2FChainlinkDirectRequestConsumer.sol).

#### Deploy contract

- **Method:** deploy
- **Description:** Deploy Direct Request Consumer contract
- **Arguments:** `(linkTokenAddress: string)`
  - `linkTokenAddress`: Link Token address
- **Returns:** `(drConsumerAddress: string)`
  - `drConsumerAddress`: Direct Request Consumer address
- **Usage:**
  ```typescript
  const linkTokenAddress = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
  const drConsumerAddress = await drConsumer.deploy(linkTokenAddress);
  ```

#### Request data

- **Method:** requestData
- **Description:** Request data to be fulfilled with Direct Request job
- **Arguments:** `(drConsumerAddress: string, operatorAddress: string, externalJobID: string, observationURL: string, pathToData: string, multiplyTimes: string)`
  - `drConsumerAddress`: Direct Request Consumer address
  - `operatorAddress`: Operator address
  - `externalJobID`: Direct Request External Job ID
  - `observationURL`: URL to retrieve data
  - `pathToData`: JSON path to data in observation URL response, e.g. "ethereum,usd"
  - `multiplyTimes`: Multiplier for the received answer
- **Returns:** `(txData: {
  transactionHash: string;
})`
  - `transactionHash`: Transaction hash of the transaction that requested data
- **Usage:**
  ```typescript
  const drConsumerAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const operatorAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const externalJobID = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const observationURL = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';
  const pathToData = 'USD';
  const multiplyTimes = '100';
  const txData = await drConsumer.requestData(drConsumerAddress, operatorAddress, externalJobID, observationURL, pathToData, multiplyTimes);
  ```

#### Get latest answer

- **Method:** getLatestAnswer
- **Description:** Get latest answer
- **Arguments:** `(drConsumerAddress: string)`
  - `drConsumerAddress`: Direct Request Consumer address
- **Returns:** `(latestAnswer: BigNumber)`
  - `latestAnswer`: Latest answer
- **Usage:**
  ```typescript
  const drConsumerAddress = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const latestAnswer = await drConsumer.getLatestAnswer(drConsumerAddress);
  ```

### Set up a Direct Request job with plugin

Once Chainlink node is started, Direct Request job could be set up. It can be used for testing, learning and other purposes.  
The process of setting up a Direct Request job is as follows:
1. [Deploy Link Token contract](SANDBOX.md#deploy-contract)
2. [Deploy Operator contract](SANDBOX.md#deploy-contract-1)
3. [Deploy Direct Request Consumer contract](SANDBOX.md#deploy-contract-1)
4. [Get Chainlink node ETH accounts](SANDBOX.md#get-eth-keys) and choose one of them
5. [Fund chosen Chainlink ETH account](DOCUMENTATION.md#transfer-eth) with reasonable amount of ETH
6. [Fund Direct Request Consumer contract with Link tokens](SANDBOX.md#transfer) (at least 1 token)
7. [Set chosen Chainlink ETH account to Operator contract as Authorized Sender](SANDBOX.md#set-authorized-sender)
8. [Create Direct Request job](SANDBOX.md#create-direct-request-job)
9. [Request data with Direct Request job](SANDBOX.md#request-data)
10. [Check if answer in Direct Request consumer was updated](SANDBOX.md#get-latest-answer)

Check Direct Request job configuration template: [direct-request-job_template.toml](src%2Fsandbox%2Fnode%2Fsetup%2Fclroot%2Fjobs%2Fdirect-request-job_template.toml).  
More on Direct Request job: https://docs.chain.link/chainlink-nodes/oracle-jobs/all-jobs#direct-request-jobs.  
