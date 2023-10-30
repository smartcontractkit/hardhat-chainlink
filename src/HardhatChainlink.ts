import { DecodedResult } from "@chainlink/functions-toolkit/dist/decodeResult";
import {
  CodeLanguage,
  FunctionsResponse,
  GatewayResponse,
  Location,
  RequestCommitment,
  ReturnType,
  ThresholdPublicKey,
} from "@chainlink/functions-toolkit/dist/types";
import "@nomiclabs/hardhat-ethers";
import { BigNumber, BigNumberish, BytesLike } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import * as automationRegistrar from "./automation/keepersRegistrar";
import * as automationRegistry from "./automation/keepersRegistry";
import * as dataFeed from "./feeds/dataFeed";
import * as dataFeedProxy from "./feeds/dataFeedProxy";
import * as ensFeedsResolver from "./feeds/ensFeedsResolver";
import * as feedRegistry from "./feeds/feedRegistry";
import * as l2FeedUptimeSequencer from "./feeds/l2FeedUptimeSequencer";
import * as functionsRouter from "./functions/functionsRouter";
import * as functionsUtils from "./functions/functionsUtils";
import * as registries from "./registries";
import * as drConsumer from "./sandbox/drConsumer";
import * as functionsConsumer from "./sandbox/functionsConsumer";
import * as functionsSimulations from "./sandbox/functionsSimulations";
import * as linkToken from "./sandbox/linkToken";
import * as node from "./sandbox/node";
import * as operator from "./sandbox/operator";
import {
  DockerOutput,
  FunctionsSubscriptionDetails,
  Overrides,
  VRFSubscriptionDetails,
} from "./shared/types";
import * as utils from "./utils";
import * as vrf from "./vrf";

export class HardhatChainlink {
  public registries: {
    dataFeeds: typeof registries.dataFeedsRegistry;
    l2Sequencers: typeof registries.l2SequencersRegistry;
    vrfCoordinators: typeof registries.vrfCoordinatorsRegistry;
    keeperRegistries: typeof registries.keeperRegistriesRegistry;
    functionsRouters: typeof registries.functionsRoutersRegistry;
    linkTokens: typeof registries.linkTokensRegistry;
    networks: typeof registries.networksRegistry;
    denominations: typeof registries.denominationsRegistry;
  };
  public dataFeed: DataFeed;
  public dataFeedProxy: DataFeedProxy;
  public feedRegistry: FeedRegistry;
  public ens: ENS;
  public l2Sequencer: L2Sequencer;
  public vrf: VRF;
  public automationRegistrar: AutomationRegistrar;
  public automationRegistry: AutomationRegistry;
  public functionsRouter: FunctionsRouter;
  public functionsUtils: FunctionsUtils;
  public utils: Utils;
  public sandbox: Sandbox;
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
    this.registries = {
      dataFeeds: registries.dataFeedsRegistry,
      l2Sequencers: registries.l2SequencersRegistry,
      vrfCoordinators: registries.vrfCoordinatorsRegistry,
      keeperRegistries: registries.keeperRegistriesRegistry,
      functionsRouters: registries.functionsRoutersRegistry,
      linkTokens: registries.linkTokensRegistry,
      networks: registries.networksRegistry,
      denominations: registries.denominationsRegistry,
    };
    this.dataFeed = new DataFeed(this.hre);
    this.dataFeedProxy = new DataFeedProxy(this.hre);
    this.feedRegistry = new FeedRegistry(this.hre);
    this.ens = new ENS(this.hre);
    this.l2Sequencer = new L2Sequencer(this.hre);
    this.vrf = new VRF(this.hre);
    this.automationRegistrar = new AutomationRegistrar(this.hre);
    this.automationRegistry = new AutomationRegistry(this.hre);
    this.functionsRouter = new FunctionsRouter(this.hre);
    this.functionsUtils = new FunctionsUtils(this.hre);
    this.utils = new Utils(this.hre);
    this.sandbox = new Sandbox(this.hre);
  }
}

class Sandbox {
  public node: Node;
  public operator: Operator;
  public drConsumer: DRConsumer;
  public linkToken: LinkToken;
  public functionsConsumer: FunctionsConsumer;
  public functionsSimulation: FunctionsSimulation;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.node = new Node(hre);
    this.operator = new Operator(hre);
    this.drConsumer = new DRConsumer(hre);
    this.linkToken = new LinkToken(hre);
    this.functionsConsumer = new FunctionsConsumer(hre);
    this.functionsSimulation = new FunctionsSimulation(hre);
  }
}

class DataFeed {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async getLatestRoundAnswer(
    dataFeedAddress: string
  ): Promise<BigNumber> {
    return dataFeed.getLatestRoundAnswer(this.hre, dataFeedAddress);
  }

  public async getLatestRoundData(dataFeedAddress: string): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }> {
    return dataFeed.getLatestRoundData(this.hre, dataFeedAddress);
  }

  public async getRoundAnswer(
    dataFeedAddress: string,
    roundId: BigNumberish
  ): Promise<BigNumber> {
    return dataFeed.getRoundAnswer(this.hre, dataFeedAddress, roundId);
  }

  public async getRoundData(
    dataFeedAddress: string,
    roundId: BigNumberish
  ): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }> {
    return dataFeed.getRoundData(this.hre, dataFeedAddress, roundId);
  }

  public async getLatestRoundId(dataFeedAddress: string): Promise<BigNumber> {
    return dataFeed.getLatestRoundId(this.hre, dataFeedAddress);
  }

  public async getDecimals(dataFeedAddress: string): Promise<number> {
    return dataFeed.getDecimals(this.hre, dataFeedAddress);
  }

  public async getDescription(dataFeedAddress: string): Promise<string> {
    return dataFeed.getDescription(this.hre, dataFeedAddress);
  }

  public async getVersion(dataFeedAddress: string): Promise<BigNumber> {
    return dataFeed.getVersion(this.hre, dataFeedAddress);
  }
}

class DataFeedProxy {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async getLatestRoundAnswer(
    dataFeedProxyAddress: string
  ): Promise<BigNumber> {
    return dataFeedProxy.getLatestRoundAnswer(this.hre, dataFeedProxyAddress);
  }

  public async getLatestRoundData(dataFeedProxyAddress: string): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }> {
    return dataFeedProxy.getLatestRoundData(this.hre, dataFeedProxyAddress);
  }

  public async getRoundAnswer(
    dataFeedProxyAddress: string,
    roundId: BigNumberish
  ): Promise<BigNumber> {
    return dataFeedProxy.getRoundAnswer(
      this.hre,
      dataFeedProxyAddress,
      roundId
    );
  }

  public async getRoundData(
    dataFeedProxyAddress: string,
    roundId: BigNumberish
  ): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }> {
    return dataFeedProxy.getRoundData(this.hre, dataFeedProxyAddress, roundId);
  }

  public async getLatestRoundId(
    dataFeedProxyAddress: string
  ): Promise<BigNumber> {
    return dataFeedProxy.getLatestRoundId(this.hre, dataFeedProxyAddress);
  }

  public async getDecimals(dataFeedProxyAddress: string): Promise<number> {
    return dataFeedProxy.getDecimals(this.hre, dataFeedProxyAddress);
  }

  public async getDescription(dataFeedProxyAddress: string): Promise<string> {
    return dataFeedProxy.getDescription(this.hre, dataFeedProxyAddress);
  }

  public async getVersion(dataFeedProxyAddress: string): Promise<BigNumber> {
    return dataFeedProxy.getVersion(this.hre, dataFeedProxyAddress);
  }

  public async getAggregator(dataFeedProxyAddress: string): Promise<string> {
    return dataFeedProxy.getAggregator(this.hre, dataFeedProxyAddress);
  }

  public async getPhaseId(dataFeedProxyAddress: string): Promise<number> {
    return dataFeedProxy.getPhaseId(this.hre, dataFeedProxyAddress);
  }

  public async getPhaseAggregators(
    dataFeedProxyAddress: string,
    phaseId: BigNumberish
  ): Promise<string> {
    return dataFeedProxy.getPhaseAggregators(
      this.hre,
      dataFeedProxyAddress,
      phaseId
    );
  }
}

class FeedRegistry {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async getLatestRoundData(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string
  ): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }> {
    return feedRegistry.getLatestRoundData(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick
    );
  }

  public async getRoundData(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string,
    roundId: BigNumberish
  ): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }> {
    return feedRegistry.getRoundData(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick,
      roundId
    );
  }

  public async proposedGetLatestRoundData(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string
  ): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }> {
    return feedRegistry.proposedGetLatestRoundData(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick
    );
  }

  public async proposedGetRoundData(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string,
    roundId: BigNumberish
  ): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }> {
    return feedRegistry.proposedGetRoundData(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick,
      roundId
    );
  }

  public async getRoundFeed(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string,
    roundId: BigNumberish
  ): Promise<string> {
    return feedRegistry.getRoundFeed(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick,
      roundId
    );
  }

  public async getFeed(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string
  ): Promise<string> {
    return feedRegistry.getFeed(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick
    );
  }

  public async getProposedFeed(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string
  ): Promise<string> {
    return feedRegistry.getProposedFeed(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick
    );
  }

  public async isFeedEnabled(
    feedRegistryAddress: string,
    aggregatorAddress: string
  ): Promise<boolean> {
    return feedRegistry.isFeedEnabled(
      this.hre,
      feedRegistryAddress,
      aggregatorAddress
    );
  }

  public async getPreviousRoundId(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string,
    roundId: BigNumberish
  ): Promise<BigNumber> {
    return feedRegistry.getPreviousRoundId(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick,
      roundId
    );
  }

  public async getNextRoundId(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string,
    roundId: BigNumberish
  ): Promise<BigNumber> {
    return feedRegistry.getNextRoundId(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick,
      roundId
    );
  }

  public async getDecimals(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string
  ): Promise<number> {
    return feedRegistry.getDecimals(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick
    );
  }

  public async getDescription(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string
  ): Promise<string> {
    return feedRegistry.getDescription(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick
    );
  }

  public async getVersion(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string
  ): Promise<BigNumber> {
    return feedRegistry.getVersion(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick
    );
  }

  public async getPhase(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string,
    phaseId: BigNumberish
  ): Promise<{
    phaseId: number;
    startingAggregatorRoundId: BigNumber;
    endingAggregatorRoundId: BigNumber;
  }> {
    return feedRegistry.getPhase(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick,
      phaseId
    );
  }

  public async getPhaseFeed(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string,
    phaseId: BigNumberish
  ): Promise<string> {
    return feedRegistry.getPhaseFeed(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick,
      phaseId
    );
  }

  public async getPhaseRange(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string,
    phaseId: BigNumberish
  ): Promise<{
    startingRoundId: BigNumber;
    endingRoundId: BigNumber;
  }> {
    return feedRegistry.getPhaseRange(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick,
      phaseId
    );
  }

  public async getCurrentPhaseId(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string
  ): Promise<number> {
    return feedRegistry.getCurrentPhaseId(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick
    );
  }
}

class ENS {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async resolveAggregatorAddress(
    baseTick: string,
    quoteTick: string
  ): Promise<string> {
    return ensFeedsResolver.resolveAggregatorAddress(
      this.hre,
      baseTick,
      quoteTick
    );
  }

  public async resolveAggregatorAddressWithSubdomains(
    baseTick: string,
    quoteTick: string
  ): Promise<{
    proxy: string;
    underlyingAggregator: string;
    proposedAggregator: string;
  }> {
    return ensFeedsResolver.resolveAggregatorAddressWithSubdomains(
      this.hre,
      baseTick,
      quoteTick
    );
  }
}

class L2Sequencer {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async isL2SequencerUp(l2SequencerAddress: string): Promise<boolean> {
    return l2FeedUptimeSequencer.isL2SequencerUp(this.hre, l2SequencerAddress);
  }

  public async getTimeSinceL2SequencerIsUp(
    l2SequencerAddress: string,
    gracePeriodTime: BigNumberish = BigNumber.from(3600)
  ): Promise<{
    isSequencerUp: boolean;
    timeSinceUp: BigNumber;
    isGracePeriodOver: boolean;
  }> {
    return l2FeedUptimeSequencer.getTimeSinceL2SequencerIsUp(
      this.hre,
      l2SequencerAddress,
      gracePeriodTime
    );
  }
}

class VRF {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async createSubscription(
    vrfCoordinatorAddress: string
  ): Promise<{ subscriptionId: BigNumber; transactionHash: string }> {
    return vrf.createSubscription(this.hre, vrfCoordinatorAddress);
  }

  public async fundSubscription(
    vrfCoordinatorAddress: string,
    linkTokenAddress: string,
    amountInJuels: BigNumberish,
    subscriptionId: BigNumberish
  ): Promise<{ transactionHash: string }> {
    return vrf.fundSubscription(
      this.hre,
      vrfCoordinatorAddress,
      linkTokenAddress,
      amountInJuels,
      subscriptionId
    );
  }

  public async cancelSubscription(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumberish,
    receivingAddress: string
  ): Promise<{ transactionHash: string }> {
    return vrf.cancelSubscription(
      this.hre,
      vrfCoordinatorAddress,
      subscriptionId,
      receivingAddress
    );
  }

  public async addConsumer(
    vrfCoordinatorAddress: string,
    consumerAddress: string,
    subscriptionId: BigNumberish
  ): Promise<{ transactionHash: string }> {
    return vrf.addConsumer(
      this.hre,
      vrfCoordinatorAddress,
      consumerAddress,
      subscriptionId
    );
  }

  public async removeConsumer(
    vrfCoordinatorAddress: string,
    consumerAddress: string,
    subscriptionId: BigNumberish
  ): Promise<{ transactionHash: string }> {
    return vrf.removeConsumer(
      this.hre,
      vrfCoordinatorAddress,
      consumerAddress,
      subscriptionId
    );
  }

  public async requestRandomWords(
    vrfCoordinatorAddress: string,
    keyHash: BytesLike,
    subscriptionId: BigNumberish,
    requestConfirmations: BigNumberish,
    callbackGasLimit: BigNumberish,
    numWords: BigNumberish
  ): Promise<{ transactionHash: string }> {
    return vrf.requestRandomWords(
      this.hre,
      vrfCoordinatorAddress,
      keyHash,
      subscriptionId,
      requestConfirmations,
      callbackGasLimit,
      numWords
    );
  }

  public async getSubscriptionDetails(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumberish
  ): Promise<VRFSubscriptionDetails> {
    return vrf.getSubscriptionDetails(
      this.hre,
      vrfCoordinatorAddress,
      subscriptionId
    );
  }

  public async isPendingRequestExists(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumberish
  ): Promise<boolean> {
    return vrf.isPendingRequestExists(
      this.hre,
      vrfCoordinatorAddress,
      subscriptionId
    );
  }

  public async requestSubscriptionOwnerTransfer(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumberish,
    newOwnerAddress: string
  ): Promise<{ transactionHash: string }> {
    return vrf.requestSubscriptionOwnerTransfer(
      this.hre,
      vrfCoordinatorAddress,
      subscriptionId,
      newOwnerAddress
    );
  }

  public async acceptSubscriptionOwnerTransfer(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumberish
  ): Promise<{ transactionHash: string }> {
    return vrf.acceptSubscriptionOwnerTransfer(
      this.hre,
      vrfCoordinatorAddress,
      subscriptionId
    );
  }

  public async getCommitment(
    vrfCoordinatorAddress: string,
    requestId: BigNumberish
  ): Promise<BytesLike> {
    return vrf.getCommitment(this.hre, vrfCoordinatorAddress, requestId);
  }

  public async getMaxConsumers(vrfCoordinatorAddress: string): Promise<number> {
    return vrf.getMaxConsumers(this.hre, vrfCoordinatorAddress);
  }

  public async getMaxNumberOfWords(
    vrfCoordinatorAddress: string
  ): Promise<number> {
    return vrf.getMaxNumberOfWords(this.hre, vrfCoordinatorAddress);
  }

  public async getMaxRequestConfirmations(
    vrfCoordinatorAddress: string
  ): Promise<number> {
    return vrf.getMaxRequestConfirmations(this.hre, vrfCoordinatorAddress);
  }

  public async getMinRequestConfirmations(
    vrfCoordinatorAddress: string
  ): Promise<number> {
    return vrf.getMinRequestConfirmations(this.hre, vrfCoordinatorAddress);
  }

  public async getMaxRequestGasLimit(
    vrfCoordinatorAddress: string
  ): Promise<number> {
    return vrf.getMaxRequestGasLimit(this.hre, vrfCoordinatorAddress);
  }

  public async getConfig(vrfCoordinatorAddress: string): Promise<{
    minimumRequestConfirmations: number;
    maxGasLimit: number;
    stalenessSeconds: number;
    gasAfterPaymentCalculation: number;
  }> {
    return vrf.getConfig(this.hre, vrfCoordinatorAddress);
  }

  public async getTypeAndVersion(
    vrfCoordinatorAddress: string
  ): Promise<string> {
    return vrf.getTypeAndVersion(this.hre, vrfCoordinatorAddress);
  }
}

class AutomationRegistrar {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async registerUpkeep(
    keepersRegistrarAddress: string,
    linkTokenAddress: string,
    amountInJuels: BigNumberish,
    upkeepName: string,
    encryptedEmail: BytesLike,
    upkeepContract: string,
    gasLimit: BigNumberish,
    adminAddress: string,
    checkData: BytesLike,
    ocrConfig: BytesLike | undefined,
    source: BigNumberish | undefined,
    sender: string
  ): Promise<{
    transactionHash: string;
    requestHash: string;
    upkeepId: BigNumber;
  }> {
    return automationRegistrar.registerUpkeep(
      this.hre,
      keepersRegistrarAddress,
      linkTokenAddress,
      amountInJuels,
      upkeepName,
      encryptedEmail,
      upkeepContract,
      gasLimit,
      adminAddress,
      checkData,
      ocrConfig,
      source,
      sender
    );
  }

  public async getPendingRequest(
    keepersRegistrarAddress: string,
    requestHash: BytesLike
  ): Promise<{
    adminAddress: string;
    balance: BigNumber;
  }> {
    return automationRegistrar.getPendingRequest(
      this.hre,
      keepersRegistrarAddress,
      requestHash
    );
  }

  public async cancelRequest(
    keepersRegistrarAddress: string,
    requestHash: BytesLike
  ): Promise<{ transactionHash: string }> {
    return automationRegistrar.cancelRequest(
      this.hre,
      keepersRegistrarAddress,
      requestHash
    );
  }

  public async getRegistrationConfig(keepersRegistrarAddress: string): Promise<{
    autoApproveConfigType: number;
    autoApproveMaxAllowed: number;
    approvedCount: number;
    keeperRegistry: string;
    minLINKJuels: BigNumber;
  }> {
    return automationRegistrar.getRegistrationConfig(
      this.hre,
      keepersRegistrarAddress
    );
  }

  public async getTypeAndVersion(
    keepersRegistrarAddress: string
  ): Promise<string> {
    return automationRegistrar.getTypeAndVersion(
      this.hre,
      keepersRegistrarAddress
    );
  }
}

class AutomationRegistry {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async getState(keeperRegistryAddress: string): Promise<{
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
  }> {
    return automationRegistry.getState(this.hre, keeperRegistryAddress);
  }

  public async getActiveUpkeepIDs(
    keeperRegistryAddress: string,
    startIndex: BigNumberish,
    maxCount: BigNumberish
  ): Promise<BigNumber[]> {
    return automationRegistry.getActiveUpkeepIDs(
      this.hre,
      keeperRegistryAddress,
      startIndex,
      maxCount
    );
  }

  public async getMaxPaymentForGas(
    keeperRegistryAddress: string,
    gasLimit: BigNumberish
  ): Promise<BigNumber> {
    return automationRegistry.getMaxPaymentForGas(
      this.hre,
      keeperRegistryAddress,
      gasLimit
    );
  }

  public async isPaused(keeperRegistryAddress: string): Promise<boolean> {
    return automationRegistry.isPaused(this.hre, keeperRegistryAddress);
  }

  public async getUpkeep(
    keeperRegistryAddress: string,
    upkeepId: BigNumberish
  ): Promise<{
    target: string;
    executeGas: number;
    checkData: BytesLike;
    balance: BigNumber;
    lastAutomationNode: string | undefined;
    admin: string;
    maxValidBlocknumber: BigNumber;
    amountSpent: BigNumber;
  }> {
    return automationRegistry.getUpkeep(
      this.hre,
      keeperRegistryAddress,
      upkeepId
    );
  }

  public async fundUpkeep(
    keeperRegistryAddress: string,
    upkeepId: BigNumberish,
    amountInJuels: BigNumberish
  ): Promise<{ transactionHash: string }> {
    return automationRegistry.fundUpkeep(
      this.hre,
      keeperRegistryAddress,
      upkeepId,
      amountInJuels
    );
  }

  public async getMinBalanceForUpkeep(
    keeperRegistryAddress: string,
    upkeepId: BigNumberish
  ): Promise<BigNumber> {
    return automationRegistry.getMinBalanceForUpkeep(
      this.hre,
      keeperRegistryAddress,
      upkeepId
    );
  }

  public async cancelUpkeep(
    keeperRegistryAddress: string,
    upkeepId: BigNumberish
  ): Promise<{ transactionHash: string }> {
    return automationRegistry.cancelUpkeep(
      this.hre,
      keeperRegistryAddress,
      upkeepId
    );
  }

  public async withdrawFunds(
    keeperRegistryAddress: string,
    upkeepId: BigNumberish,
    receivingAddress: string
  ): Promise<{ transactionHash: string }> {
    return automationRegistry.withdrawFunds(
      this.hre,
      keeperRegistryAddress,
      upkeepId,
      receivingAddress
    );
  }

  public async migrateUpkeeps(
    keeperRegistryAddress: string,
    upkeepIds: BigNumberish[],
    destination: string
  ): Promise<{ transactionHash: string }> {
    return automationRegistry.migrateUpkeeps(
      this.hre,
      keeperRegistryAddress,
      upkeepIds,
      destination
    );
  }

  public async getKeeperInfo(
    keeperRegistryAddress: string,
    keeperAddress: string
  ): Promise<{ payee: string; active: boolean; balance: BigNumber }> {
    return automationRegistry.getKeeperInfo(
      this.hre,
      keeperRegistryAddress,
      keeperAddress
    );
  }

  public async getTypeAndVersion(
    keeperRegistryAddress: string
  ): Promise<string> {
    return automationRegistry.getTypeAndVersion(
      this.hre,
      keeperRegistryAddress
    );
  }

  public async getUpkeepTranscoderVersion(
    keeperRegistryAddress: string
  ): Promise<number> {
    return automationRegistry.getUpkeepTranscoderVersion(
      this.hre,
      keeperRegistryAddress
    );
  }
}

class FunctionsRouter {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public initializeFunctionsSubscriptionManager(
    functionsRouterAddress: string,
    linkTokenAddress: string,
    overrides?: Overrides
  ): Promise<functionsRouter.FunctionsSubscriptionManager> {
    return functionsRouter.FunctionsSubscriptionManager.initialize({
      hre: this.hre,
      functionsRouterAddress,
      linkTokenAddress,
      overrides,
    });
  }

  public initializeFunctionsResponseListener(
    functionsRouterAddress: string,
    overrides?: Overrides
  ): Promise<functionsRouter.FunctionsResponseListener> {
    return functionsRouter.FunctionsResponseListener.initialize({
      hre: this.hre,
      functionsRouterAddress,
      overrides,
    });
  }

  public initializeFunctionsSecretsManager(
    functionsRouterAddress: string,
    donId: string,
    overrides?: Overrides
  ): Promise<functionsRouter.FunctionsSecretsManager> {
    return functionsRouter.FunctionsSecretsManager.initialize({
      hre: this.hre,
      functionsRouterAddress,
      donId,
      overrides,
    });
  }

  // Subscription Manager

  public createSubscription(
    functionsRouterAddress: string,
    consumerAddress?: string,
    overrides?: Overrides
  ): Promise<{ subscriptionId: BigNumber }> {
    return functionsRouter.createSubscription(
      this.hre,
      functionsRouterAddress,
      consumerAddress,
      overrides
    );
  }

  public fundSubscription(
    functionsRouterAddress: string,
    linkTokenAddress: string,
    amountInJuels: BigNumberish,
    subscriptionId: BigNumberish,
    overrides?: Overrides
  ): Promise<{ transactionHash: string }> {
    return functionsRouter.fundSubscription(
      this.hre,
      functionsRouterAddress,
      linkTokenAddress,
      amountInJuels,
      subscriptionId,
      overrides
    );
  }

  public cancelSubscription(
    functionsRouterAddress: string,
    subscriptionId: BigNumberish,
    receivingAddress?: string,
    overrides?: Overrides
  ): Promise<{ transactionHash: string }> {
    return functionsRouter.cancelSubscription(
      this.hre,
      functionsRouterAddress,
      subscriptionId,
      receivingAddress,
      overrides
    );
  }

  public requestSubscriptionOwnerTransfer(
    functionsRouterAddress: string,
    subscriptionId: BigNumberish,
    newOwnerAddress: string,
    overrides?: Overrides
  ): Promise<{ transactionHash: string }> {
    return functionsRouter.requestSubscriptionOwnerTransfer(
      this.hre,
      functionsRouterAddress,
      subscriptionId,
      newOwnerAddress,
      overrides
    );
  }

  public acceptSubscriptionOwnerTransfer(
    functionsRouterAddress: string,
    subscriptionId: BigNumberish,
    overrides?: Overrides
  ): Promise<{ transactionHash: string }> {
    return functionsRouter.acceptSubscriptionOwnerTransfer(
      this.hre,
      functionsRouterAddress,
      subscriptionId,
      overrides
    );
  }

  public getSubscriptionDetails(
    functionsRouterAddress: string,
    subscriptionId: BigNumberish
  ): Promise<FunctionsSubscriptionDetails> {
    return functionsRouter.getSubscriptionDetails(
      this.hre,
      functionsRouterAddress,
      subscriptionId
    );
  }

  public addConsumer(
    functionsRouterAddress: string,
    consumerAddress: string,
    subscriptionId: BigNumberish,
    overrides?: Overrides
  ): Promise<{ transactionHash: string }> {
    return functionsRouter.addConsumer(
      this.hre,
      functionsRouterAddress,
      consumerAddress,
      subscriptionId,
      overrides
    );
  }

  public removeConsumer(
    functionsRouterAddress: string,
    consumerAddress: string,
    subscriptionId: BigNumberish,
    overrides?: Overrides
  ): Promise<{ transactionHash: string }> {
    return functionsRouter.removeConsumer(
      this.hre,
      functionsRouterAddress,
      consumerAddress,
      subscriptionId,
      overrides
    );
  }

  public timeoutRequests(
    functionsRouterAddress: string,
    requestCommitments: RequestCommitment[],
    overrides?: Overrides
  ): Promise<{ transactionHash: string }> {
    return functionsRouter.timeoutRequests(
      this.hre,
      functionsRouterAddress,
      requestCommitments,
      overrides
    );
  }

  public estimateRequestCost(
    functionsRouterAddress: string,
    donId: string,
    subscriptionId: BigNumberish,
    callbackGasLimit: number,
    gasPriceWei: BigNumberish,
    overrides?: Overrides
  ): Promise<BigInt> {
    return functionsRouter.estimateRequestCost(
      this.hre,
      functionsRouterAddress,
      donId,
      subscriptionId,
      callbackGasLimit,
      gasPriceWei,
      overrides
    );
  }

  // Response Listener

  public listenForResponse(
    functionsRouterAddress: string,
    requestId: string,
    timeout?: number
  ): Promise<FunctionsResponse> {
    return functionsRouter.listenForResponse(
      this.hre,
      functionsRouterAddress,
      requestId,
      timeout
    );
  }

  public listenForResponseFromTransaction(
    functionsRouterAddress: string,
    transactionHash: string,
    timeout?: number,
    confirmations?: number,
    checkInterval?: number
  ): Promise<FunctionsResponse> {
    return functionsRouter.listenForResponseFromTransaction(
      this.hre,
      functionsRouterAddress,
      transactionHash,
      timeout,
      confirmations,
      checkInterval
    );
  }

  public listenForResponses(
    functionsRouterAddress: string,
    subscriptionId: string,
    callback: (functionsResponse: FunctionsResponse) => any
  ): Promise<void> {
    return functionsRouter.listenForResponses(
      this.hre,
      functionsRouterAddress,
      subscriptionId,
      callback
    );
  }

  public stopListeningForResponses(
    functionsRouterAddress: string
  ): Promise<void> {
    return functionsRouter.stopListeningForResponses(
      this.hre,
      functionsRouterAddress
    );
  }

  // Secrets Manager

  public fetchKeys(
    functionsRouterAddress: string,
    donId: string
  ): Promise<{
    thresholdPublicKey: ThresholdPublicKey;
    donPublicKey: string;
  }> {
    return functionsRouter.fetchKeys(this.hre, functionsRouterAddress, donId);
  }

  public encryptSecretsUrls(
    functionsRouterAddress: string,
    donId: string,
    secretsUrls: string[]
  ): Promise<string> {
    return functionsRouter.encryptSecretsUrls(
      this.hre,
      functionsRouterAddress,
      donId,
      secretsUrls
    );
  }

  public verifyOffchainSecrets(
    functionsRouterAddress: string,
    donId: string,
    secretsUrls: string[]
  ): Promise<boolean> {
    return functionsRouter.verifyOffchainSecrets(
      this.hre,
      functionsRouterAddress,
      donId,
      secretsUrls
    );
  }

  public encryptSecrets(
    functionsRouterAddress: string,
    donId: string,
    secrets?: Record<string, string>
  ): Promise<{
    encryptedSecrets: string;
  }> {
    return functionsRouter.encryptSecrets(
      this.hre,
      functionsRouterAddress,
      donId,
      secrets
    );
  }

  public uploadEncryptedSecretsToDON(
    functionsRouterAddress: string,
    donId: string,
    encryptedSecretsHexstring: string,
    gatewayUrls: string[],
    slotId: number,
    minutesUntilExpiration: number
  ): Promise<{
    version: number;
    success: boolean;
  }> {
    return functionsRouter.uploadEncryptedSecretsToDON(
      this.hre,
      functionsRouterAddress,
      donId,
      encryptedSecretsHexstring,
      gatewayUrls,
      slotId,
      minutesUntilExpiration
    );
  }

  public listDONHostedEncryptedSecrets(
    functionsRouterAddress: string,
    donId: string,
    gatewayUrls: string[]
  ): Promise<{
    result: GatewayResponse;
    error?: string;
  }> {
    return functionsRouter.listDONHostedEncryptedSecrets(
      this.hre,
      functionsRouterAddress,
      donId,
      gatewayUrls
    );
  }

  public buildDONHostedEncryptedSecretsReference(
    functionsRouterAddress: string,
    donId: string,
    slotId: number,
    version: number
  ): Promise<string> {
    return functionsRouter.buildDONHostedEncryptedSecretsReference(
      this.hre,
      functionsRouterAddress,
      donId,
      slotId,
      version
    );
  }
}

class FunctionsUtils {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public buildRequestCBOR(
    codeLocation: Location,
    codeLanguage: CodeLanguage,
    source: string,
    secretsLocation?: Location,
    encryptedSecretsReference?: string,
    args?: string[],
    bytesArgs?: string[]
  ): Promise<string> {
    return functionsUtils.buildRequestCBOR({
      codeLocation,
      codeLanguage,
      source,
      secretsLocation,
      encryptedSecretsReference,
      args,
      bytesArgs,
    });
  }

  public fetchRequestCommitment(
    functionsRouterAddress: string,
    requestId: string,
    donId: string,
    toBlock?: number | "latest",
    pastBlocksToSearch?: number
  ): Promise<RequestCommitment> {
    return functionsUtils.fetchRequestCommitment(
      this.hre,
      functionsRouterAddress,
      requestId,
      donId,
      toBlock,
      pastBlocksToSearch
    );
  }

  public decodeResult(
    resultHexstring: string,
    expectedReturnType: ReturnType
  ): Promise<DecodedResult> {
    return functionsUtils.decodeResult(resultHexstring, expectedReturnType);
  }
}

class Utils {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public getRoundId(
    phaseId: BigNumberish,
    aggregatorRoundId: BigNumberish
  ): BigNumber {
    return utils.getRoundId(phaseId, aggregatorRoundId);
  }

  public parseRoundId(roundId: BigNumberish): {
    phaseId: BigNumber;
    aggregatorRoundId: BigNumber;
  } {
    return utils.parseRoundId(roundId);
  }

  public async transferETH(
    recipient: string,
    amount: BigNumberish
  ): Promise<{
    transactionHash: string;
  }> {
    return utils.transferETH(this.hre, recipient, amount);
  }

  public async createGist(
    githubApiToken: string,
    content: string
  ): Promise<string> {
    return utils.createGist(githubApiToken, content);
  }

  public async deleteGist(
    githubApiToken: string,
    content: string
  ): Promise<boolean> {
    return utils.deleteGist(githubApiToken, content);
  }
}

// SANDBOX

class Node {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async run(): Promise<DockerOutput> {
    return node.run(this.hre);
  }

  public async restart(): Promise<DockerOutput> {
    return node.restart(this.hre);
  }

  public async stop(): Promise<DockerOutput> {
    return node.stop(this.hre);
  }

  public async getETHKeys(): Promise<string> {
    return node.getETHKeys(this.hre);
  }

  public async getP2PKeys(): Promise<string> {
    return node.getP2PKeys(this.hre);
  }

  public async getVRFKeys(): Promise<string> {
    return node.getVRFKeys(this.hre);
  }

  public async getJobs(): Promise<string> {
    return node.getJobs(this.hre);
  }

  public async createDirectRequestJob(operatorAddress: string): Promise<void> {
    return node.createDirectRequestJob(this.hre, operatorAddress);
  }
}

class Operator {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async deploy(linkTokenAddress: string): Promise<string> {
    return operator.deploy(this.hre, linkTokenAddress);
  }

  public async setAuthorizedSender(
    operatorAddress: string,
    sender: string
  ): Promise<{ transactionHash: string }> {
    return operator.setAuthorizedSender(this.hre, operatorAddress, sender);
  }
}

class DRConsumer {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async deploy(linkTokenAddress: string): Promise<string> {
    return drConsumer.deploy(this.hre, linkTokenAddress);
  }

  public async requestData(
    directRequestConsumerAddress: string,
    operatorAddress: string,
    externalJobID: string,
    observationURL: string,
    pathToData: string,
    multiplyTimes: string
  ): Promise<{ transactionHash: string }> {
    return drConsumer.requestData(
      this.hre,
      directRequestConsumerAddress,
      operatorAddress,
      externalJobID,
      observationURL,
      pathToData,
      multiplyTimes
    );
  }

  public async getLatestAnswer(
    directRequestConsumerAddress: string
  ): Promise<BigNumber> {
    return drConsumer.getLatestAnswer(this.hre, directRequestConsumerAddress);
  }
}

class LinkToken {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async deploy(): Promise<string> {
    return linkToken.deploy(this.hre);
  }

  public async transfer(
    linkTokenAddress: string,
    recipient: string,
    addedValue: BigNumberish
  ): Promise<{ transactionHash: string }> {
    return linkToken.transfer(
      this.hre,
      linkTokenAddress,
      recipient,
      addedValue
    );
  }

  public async getAllowance(
    linkTokenAddress: string,
    owner: string,
    spender: string
  ): Promise<BigNumber> {
    return linkToken.getAllowance(this.hre, linkTokenAddress, owner, spender);
  }

  public async increaseApproval(
    linkTokenAddress: string,
    spender: string,
    addedValue: BigNumberish
  ): Promise<{ transactionHash: string }> {
    return linkToken.increaseApproval(
      this.hre,
      linkTokenAddress,
      spender,
      addedValue
    );
  }

  public async decreaseApproval(
    linkTokenAddress: string,
    spender: string,
    subtractedValue: BigNumberish
  ): Promise<{ transactionHash: string }> {
    return linkToken.decreaseApproval(
      this.hre,
      linkTokenAddress,
      spender,
      subtractedValue
    );
  }
}

class FunctionsConsumer {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async deploy(
    functionsRouterAddress: string,
    donId: string,
    overrides?: Overrides
  ): Promise<string> {
    return functionsConsumer.deploy(
      this.hre,
      functionsRouterAddress,
      donId,
      overrides
    );
  }

  public async initializeFunctionsConsumer(
    functionsConsumerAddress: string,
    overrides?: Overrides
  ): Promise<functionsConsumer.FunctionsConsumer> {
    return functionsConsumer.FunctionsConsumer.initialize({
      hre: this.hre,
      functionsConsumerAddress,
      overrides,
    });
  }

  public async sendRequest(
    functionsConsumerAddress: string,
    subscriptionId: BigNumberish,
    source: string,
    encryptedSecretsReference: string,
    secretsLocation: Location,
    args?: string[],
    bytesArgs?: string[],
    callbackGasLimit?: BigNumberish,
    overrides?: Overrides
  ): Promise<{ transactionHash: string }> {
    return functionsConsumer.sendRequest(
      this.hre,
      functionsConsumerAddress,
      subscriptionId,
      source,
      encryptedSecretsReference,
      secretsLocation,
      args,
      bytesArgs,
      callbackGasLimit,
      overrides
    );
  }

  public async sendEncodedRequest(
    functionsConsumerAddress: string,
    subscriptionId: BigNumberish,
    encodedRequest: string,
    callbackGasLimit: BigNumberish,
    overrides?: Overrides
  ): Promise<{ transactionHash: string }> {
    return functionsConsumer.sendEncodedRequest(
      this.hre,
      functionsConsumerAddress,
      subscriptionId,
      encodedRequest,
      callbackGasLimit,
      overrides
    );
  }

  public async setDonId(
    functionsConsumerAddress: string,
    donId: string,
    overrides?: Overrides
  ): Promise<{ transactionHash: string }> {
    return functionsConsumer.setDonId(
      this.hre,
      functionsConsumerAddress,
      donId,
      overrides
    );
  }

  public async getDonId(functionsConsumerAddress: string): Promise<string> {
    return functionsConsumer.getDonId(this.hre, functionsConsumerAddress);
  }

  public async getLastRequestId(
    functionsConsumerAddress: string
  ): Promise<string> {
    return functionsConsumer.getLastRequestId(
      this.hre,
      functionsConsumerAddress
    );
  }

  public async getLastResponse(
    functionsConsumerAddress: string
  ): Promise<string> {
    return functionsConsumer.getLastResponse(
      this.hre,
      functionsConsumerAddress
    );
  }

  public async getLastError(functionsConsumerAddress: string): Promise<string> {
    return functionsConsumer.getLastError(this.hre, functionsConsumerAddress);
  }
}

class FunctionsSimulation {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async simulateRequest(
    source: string,
    args?: string[],
    bytesArgs?: string[]
  ): Promise<DecodedResult> {
    return functionsSimulations.simulateRequest(
      this.hre,
      source,
      args,
      bytesArgs
    );
  }
}
