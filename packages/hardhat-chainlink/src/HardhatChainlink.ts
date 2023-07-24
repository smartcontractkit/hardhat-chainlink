import "@nomiclabs/hardhat-ethers";
import { BigNumber, BigNumberish, BytesLike } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import * as automation from "./automation";
import * as dataFeed from "./feeds/dataFeed";
import * as dataFeedProxy from "./feeds/dataFeedProxy";
import * as ensFeedsResolver from "./feeds/ensFeedsResolver";
import * as feedRegistry from "./feeds/feedRegistry";
import * as l2FeedUptimeSequencer from "./feeds/l2FeedUptimeSequencer";
import * as registries from "./registries";
import {
  DataFeedsRegistry,
  DenominationsRegistry,
  FunctionOraclesRegistry,
  KeeperRegistriesRegistry,
  LinkTokensRegistry,
  NetworksRegistry,
  VRFCoordinatorsRegistry,
} from "./shared/types";
import * as vrf from "./vrf";

export class HardhatChainlink {
  public registries: {
    dataFeeds: DataFeedsRegistry;
    vrfCoordinators: VRFCoordinatorsRegistry;
    keeperRegistries: KeeperRegistriesRegistry;
    functionOracles: FunctionOraclesRegistry;
    linkTokens: LinkTokensRegistry;
    networks: NetworksRegistry;
    denominations: DenominationsRegistry;
  };
  public dataFeed: DataFeed;
  public dataFeedProxy: DataFeedProxy;
  public feedRegistry: FeedRegistry;
  public ens: ENS;
  public l2Sequenser: L2Sequencer;
  public vrf: VRF;
  public automation: Automation;
  public functionOracle: FunctionOracle;
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
    this.registries = {
      dataFeeds: registries.dataFeedsRegistry,
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
    this.automation = new Automation(this.hre);
    this.functionOracle = new FunctionOracle(this.hre);
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

  public getRoundId(
    phaseId: BigNumberish,
    aggregatorRoundId: BigNumberish
  ): BigNumber {
    return dataFeedProxy.getRoundId(phaseId, aggregatorRoundId);
  }

  public parseRoundId(roundId: BigNumberish): {
    phaseId: BigNumber;
    aggregatorRoundId: BigNumber;
  } {
    return dataFeedProxy.parseRoundId(roundId);
  }
}

class FeedRegistry {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
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

  public async getDecimals(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string
  ): Promise<number> {
    return feedRegistry.getFeedRegistryDecimals(
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
    return feedRegistry.getFeedRegistryDescription(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick
    );
  }

  public async getAggregatorVersion(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string
  ): Promise<BigNumber> {
    return feedRegistry.getFeedRegistryAggregatorVersion(
      this.hre,
      feedRegistryAddress,
      feedRegistryBaseTick,
      feedRegistryQuoteTick
    );
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
    return feedRegistry.getFeedRegistryLatestRoundData(
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
    return feedRegistry.getFeedRegistryRoundData(
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

  public async getCommitment(
    vrfCoordinatorAddress: string,
    requestId: BigNumberish
  ): Promise<BytesLike> {
    return vrf.getCommitment(this.hre, vrfCoordinatorAddress, requestId);
  }

  public async getCoordinatorConfig(vrfCoordinatorAddress: string): Promise<{
    minimumRequestConfirmations: number;
    maxGasLimit: number;
    stalenessSeconds: number;
    gasAfterPaymentCalculation: number;
  }> {
    return vrf.getCoordinatorConfig(this.hre, vrfCoordinatorAddress);
  }

  public async getCoordinatorTypeAndVersion(
    vrfCoordinatorAddress: string
  ): Promise<string> {
    return vrf.getCoordinatorTypeAndVersion(this.hre, vrfCoordinatorAddress);
  }
}

class Automation {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  // KEEPER REGISTRAR
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
    source: number,
    sender: string
  ): Promise<{ transactionHash: string }> {
    return automation.registerUpkeep(
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
      source,
      sender
    );
  }

  public async getPendingRegistrationRequest(
    keepersRegistrarAddress: string,
    requestHash: BytesLike
  ): Promise<{
    adminAddress: string;
    balance: BigNumber;
  }> {
    return automation.getPendingRegistrationRequest(
      this.hre,
      keepersRegistrarAddress,
      requestHash
    );
  }

  public async cancelPendingRegistrationRequest(
    keepersRegistrarAddress: string,
    requestHash: BytesLike
  ): Promise<{ transactionHash: string }> {
    return automation.cancelPendingRegistrationRequest(
      this.hre,
      keepersRegistrarAddress,
      requestHash
    );
  }

  public async getKeeperRegistrarConfig(
    keepersRegistrarAddress: string
  ): Promise<{
    autoApproveConfigType: number;
    autoApproveMaxAllowed: number;
    approvedCount: number;
    keeperRegistry: string;
    minLINKJuels: BigNumber;
  }> {
    return automation.getKeeperRegistrarConfig(
      this.hre,
      keepersRegistrarAddress
    );
  }

  public async getKeepersRegistrarTypeAndVersion(
    keepersRegistrarAddress: string
  ): Promise<string> {
    return automation.getKeepersRegistrarTypeAndVersion(
      this.hre,
      keepersRegistrarAddress
    );
  }

  // KEEPER REGISTRY
  public async fundUpkeep(
    keepersRegistryAddress: string,
    upkeepId: BigNumberish,
    amountInJuels: BigNumberish
  ): Promise<{ transactionHash: string }> {
    return automation.fundUpkeep(
      this.hre,
      keepersRegistryAddress,
      upkeepId,
      amountInJuels
    );
  }

  public async checkUpkeep(
    keepersRegistryAddress: string,
    upkeepId: BigNumberish,
    fromAddress: string
  ): Promise<{
    performData: BytesLike;
    maxLinkPayment: BigNumber;
    gasLimit: BigNumber;
    adjustedGasWei: BigNumber;
    linkEth: BigNumber;
  }> {
    return automation.checkUpkeep(
      this.hre,
      keepersRegistryAddress,
      upkeepId,
      fromAddress
    );
  }

  public async cancelUpkeep(
    keepersRegistryAddress: string,
    upkeepId: BigNumberish
  ): Promise<{ transactionHash: string }> {
    return automation.cancelUpkeep(this.hre, keepersRegistryAddress, upkeepId);
  }

  public async withdrawFundsFromCanceledUpkeep(
    keepersRegistryAddress: string,
    upkeepId: BigNumberish,
    receivingAddress: string
  ): Promise<{ transactionHash: string }> {
    return automation.withdrawFunds(
      this.hre,
      keepersRegistryAddress,
      upkeepId,
      receivingAddress
    );
  }

  public async getActiveUpkeepIDs(
    keepersRegistryAddress: string,
    startIndex: BigNumberish,
    maxCount: BigNumberish
  ): Promise<BigNumber[]> {
    return automation.getActiveUpkeepIDs(
      this.hre,
      keepersRegistryAddress,
      startIndex,
      maxCount
    );
  }

  public async getUpkeep(
    keepersRegistryAddress: string,
    upkeepId: BigNumberish
  ): Promise<{
    target: string;
    executeGas: number;
    checkData: BytesLike;
    balance: BigNumber;
    lastAutomationNode: string;
    admin: string;
    maxValidBlocknumber: BigNumber;
    amountSpent: BigNumber;
  }> {
    return automation.getUpkeep(this.hre, keepersRegistryAddress, upkeepId);
  }

  public async migrateUpkeeps(
    keepersRegistryAddress: string,
    upkeepIds: BigNumberish[],
    destination: string
  ): Promise<{ transactionHash: string }> {
    return automation.migrateUpkeeps(
      this.hre,
      keepersRegistryAddress,
      upkeepIds,
      destination
    );
  }

  public async receiveUpkeeps(
    keepersRegistryAddress: string,
    encodedUpkeeps: BytesLike
  ): Promise<{ transactionHash: string }> {
    return automation.receiveUpkeeps(
      this.hre,
      keepersRegistryAddress,
      encodedUpkeeps
    );
  }

  public async withdrawKeeperPayment(
    keepersRegistryAddress: string,
    fromAddress: string,
    toAddress: string
  ): Promise<{ transactionHash: string }> {
    return automation.withdrawKeeperPayment(
      this.hre,
      keepersRegistryAddress,
      fromAddress,
      toAddress
    );
  }

  public async transferKeeperPayeeship(
    keepersRegistryAddress: string,
    keeper: string,
    proposed: string
  ): Promise<{ transactionHash: string }> {
    return automation.transferKeeperPayeeship(
      this.hre,
      keepersRegistryAddress,
      keeper,
      proposed
    );
  }

  public async acceptKeeperPayeeship(
    keepersRegistryAddress: string,
    keeper: string
  ): Promise<{ transactionHash: string }> {
    return automation.acceptKeeperPayeeship(
      this.hre,
      keepersRegistryAddress,
      keeper
    );
  }

  public async getKeeperInfo(
    keepersRegistryAddress: string,
    query: string
  ): Promise<{ payee: string; active: boolean; balance: BigNumber }> {
    return automation.getKeeperInfo(this.hre, keepersRegistryAddress, query);
  }

  public async getMaxPaymentForGas(
    keepersRegistryAddress: string,
    gasLimit: BigNumberish
  ): Promise<BigNumber> {
    return automation.getMaxPaymentForGas(
      this.hre,
      keepersRegistryAddress,
      gasLimit
    );
  }

  public async getMinBalanceForUpkeep(
    keepersRegistryAddress: string,
    upkeepId: BigNumberish
  ): Promise<BigNumber> {
    return automation.getMinBalanceForUpkeep(
      this.hre,
      keepersRegistryAddress,
      upkeepId
    );
  }

  public async getKeepersRegistryState(
    keepersRegistryAddress: string
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
  }> {
    return automation.getKeeperRegistryState(this.hre, keepersRegistryAddress);
  }

  public async isKeepersRegistryPaused(
    keepersRegistryAddress: string
  ): Promise<boolean> {
    return automation.isKeeperRegistryPaused(this.hre, keepersRegistryAddress);
  }

  public async getKeepersRegistryTypeAndVersion(
    keepersRegistryAddress: string
  ): Promise<string> {
    return automation.getKeeperRegistryTypeAndVersion(
      this.hre,
      keepersRegistryAddress
    );
  }

  public async getKeepersRegistryUpkeepTranscoderVersion(
    keepersRegistryAddress: string
  ): Promise<number> {
    return automation.getKeeperRegistryUpkeepTranscoderVersion(
      this.hre,
      keepersRegistryAddress
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
