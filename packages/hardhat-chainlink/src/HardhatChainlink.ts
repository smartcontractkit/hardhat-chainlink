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
import * as registries from "./registries";
import * as utils from "./utils";
import * as vrf from "./vrf";

export class HardhatChainlink {
  public registries: {
    dataFeeds: typeof registries.dataFeedsRegistry;
    l2Sequencers: typeof registries.l2SequencersRegistry;
    vrfCoordinators: typeof registries.vrfCoordinatorsRegistry;
    keeperRegistries: typeof registries.keeperRegistriesRegistry;
    functionOracles: typeof registries.functionOraclesRegistry;
    linkTokens: typeof registries.linkTokensRegistry;
    networks: typeof registries.networksRegistry;
    denominations: typeof registries.denominationsRegistry;
  };
  public dataFeed: DataFeed;
  public dataFeedProxy: DataFeedProxy;
  public feedRegistry: FeedRegistry;
  public ens: ENS;
  public l2Sequenser: L2Sequencer;
  public vrf: VRF;
  public automationRegistrar: AutomationRegistrar;
  public automationRegistry: AutomationRegistry;
  public functionOracle: FunctionOracle;
  public utils: Utils;
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
    this.registries = {
      dataFeeds: registries.dataFeedsRegistry,
      l2Sequencers: registries.l2SequencersRegistry,
      vrfCoordinators: registries.vrfCoordinatorsRegistry,
      keeperRegistries: registries.keeperRegistriesRegistry,
      functionOracles: registries.functionOraclesRegistry,
      linkTokens: registries.linkTokensRegistry,
      networks: registries.networksRegistry,
      denominations: registries.denominationsRegistry,
    };
    this.dataFeed = new DataFeed(this.hre);
    this.dataFeedProxy = new DataFeedProxy(this.hre);
    this.feedRegistry = new FeedRegistry(this.hre);
    this.ens = new ENS(this.hre);
    this.l2Sequenser = new L2Sequencer(this.hre);
    this.vrf = new VRF(this.hre);
    this.automationRegistrar = new AutomationRegistrar(this.hre);
    this.automationRegistry = new AutomationRegistry(this.hre);
    this.functionOracle = new FunctionOracle(this.hre);
    this.utils = new Utils(this.hre);
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
    receivingWallet: string
  ): Promise<{ transactionHash: string }> {
    return vrf.cancelSubscription(
      this.hre,
      vrfCoordinatorAddress,
      subscriptionId,
      receivingWallet
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
  ): Promise<{
    balance: BigNumber;
    reqCount: BigNumber;
    owner: string;
    consumers: string[];
  }> {
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
    linkTokenAddress: string,
    keepersRegistrarAddress: string,
    amountInJuels: BigNumberish,
    upkeepName: string,
    encryptedEmail: BytesLike,
    upkeepContract: string,
    gasLimit: number,
    adminAddress: string,
    checkData: BytesLike,
    ocrConfig: BytesLike,
    source: number,
    sender: string
  ): Promise<{ transactionHash: string }> {
    return automationRegistrar.registerUpkeep(
      this.hre,
      linkTokenAddress,
      keepersRegistrarAddress,
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

  public async checkUpkeep(
    keeperRegistryAddress: string,
    upkeepId: BigNumberish,
    fromAddress: string
  ): Promise<
    | {
        performData: BytesLike;
        maxLinkPayment: BigNumber;
        gasLimit: BigNumber;
        adjustedGasWei: BigNumber;
        linkEth: BigNumber;
      }
    | {
        upkeepNeeded: boolean;
        performData: BytesLike;
        upkeepFailureReason: string;
        gasUsed: BigNumber;
        fastGasWei: BigNumber;
        linkNative: BigNumber;
      }
  > {
    return automationRegistry.checkUpkeep(
      this.hre,
      keeperRegistryAddress,
      upkeepId,
      fromAddress
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

  public async receiveUpkeeps(
    keeperRegistryAddress: string,
    encodedUpkeeps: BytesLike
  ): Promise<{ transactionHash: string }> {
    return automationRegistry.receiveUpkeeps(
      this.hre,
      keeperRegistryAddress,
      encodedUpkeeps
    );
  }

  public async withdrawPayment(
    keeperRegistryAddress: string,
    fromAddress: string,
    toAddress: string
  ): Promise<{ transactionHash: string }> {
    return automationRegistry.withdrawPayment(
      this.hre,
      keeperRegistryAddress,
      fromAddress,
      toAddress
    );
  }

  public async transferPayeeship(
    keeperRegistryAddress: string,
    keeper: string,
    proposed: string
  ): Promise<{ transactionHash: string }> {
    return automationRegistry.transferPayeeship(
      this.hre,
      keeperRegistryAddress,
      keeper,
      proposed
    );
  }

  public async acceptPayeeship(
    keeperRegistryAddress: string,
    keeper: string
  ): Promise<{ transactionHash: string }> {
    return automationRegistry.acceptPayeeship(
      this.hre,
      keeperRegistryAddress,
      keeper
    );
  }

  public async getKeeperInfo(
    keeperRegistryAddress: string,
    query: string
  ): Promise<{ payee: string; active: boolean; balance: BigNumber }> {
    return automationRegistry.getKeeperInfo(
      this.hre,
      keeperRegistryAddress,
      query
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
    automationNodes: string[] | undefined;
  }> {
    return automationRegistry.getState(this.hre, keeperRegistryAddress);
  }

  public async isPaused(keeperRegistryAddress: string): Promise<boolean> {
    return automationRegistry.isPaused(this.hre, keeperRegistryAddress);
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

class FunctionOracle {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }
}

class LinkToken {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
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
}
