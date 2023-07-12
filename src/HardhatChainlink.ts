import "@nomiclabs/hardhat-ethers";
import {BigNumber, BigNumberish, BytesLike} from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import * as automation from "./automation";
import * as registries from "./registries";
import * as feeds from "./feeds";
import * as vrf from "./vrf";
import * as net from "net";
import {
  DataFeedsRegistry,
  KeeperRegistriesRegistry,
  LinkTokensRegistry,
  FunctionOraclesRegistry,
  VRFCoordinatorsRegistry,
  NetworksRegistry,
  DenominationsRegistry
} from "./registries/helpers";
import { FeedRegistryInterface } from "../types";
import { getFeed } from "./feeds";
import { getKeeperRegistrarConfig, getPendingRegistrationRequest } from "./automation";

export class HardhatChainlink {
  public registries: {
    dataFeeds: DataFeedsRegistry,
    vrfCoordinators: VRFCoordinatorsRegistry,
    keeperRegistries: KeeperRegistriesRegistry,
    functionOracles: FunctionOraclesRegistry,
    linkTokens: LinkTokensRegistry,
    networks: NetworksRegistry,
    denominations: DenominationsRegistry,
  };
  public dataFeed: DataFeed;
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

  public async getLatestRoundAnswer(dataFeedAddress: string): Promise<BigNumber> {
    return feeds.getLatestRoundAnswer(this.hre, dataFeedAddress);
  }

  public async getLatestRoundData(
    dataFeedAddress: string
  ): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }> {
    return feeds.getLatestRoundData(this.hre, dataFeedAddress);
  }

  public async getRoundAnswer(
    dataFeedAddress: string,
    roundId: BigNumber
  ): Promise<BigNumber> {
    return feeds.getRoundAnswer(this.hre, dataFeedAddress, roundId);
  }

  public async getRoundData(
    dataFeedAddress: string,
    roundId: BigNumber
  ): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }> {
    return feeds.getRoundData(this.hre, dataFeedAddress, roundId);
  }

  public async getDecimals(dataFeedAddress: string): Promise<number> {
    return feeds.getDecimals(this.hre, dataFeedAddress);
  }

  public async getDescription(
    dataFeedAddress: string
  ): Promise<string> {
    return feeds.getDescription(this.hre, dataFeedAddress);
  }

  public async getAggregatorVersion(
    dataFeedAddress: string
  ): Promise<BigNumber> {
    return feeds.getAggregatorVersion(this.hre, dataFeedAddress);
  }

  public async getAggregatorAddress(dataFeedAddress: string): Promise<string> {
    return feeds.getAggregatorAddress(this.hre, dataFeedAddress);
  }

  public async getAggregatorRoundId(
    dataFeedAddress: string
  ): Promise<BigNumber> {
    return feeds.getAggregatorRoundId(this.hre, dataFeedAddress);
  }

  public async getPhaseId(dataFeedAddress: string): Promise<BigNumber> {
    return feeds.getPhaseId(this.hre, dataFeedAddress);
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
    return feeds.getFeed(this.hre, feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick);
  }

  public async isFeedEnabled(
    feedRegistryAddress: string,
    aggregatorAddress: string
  ): Promise<boolean> {
    return feeds.isFeedEnabled(this.hre, feedRegistryAddress, aggregatorAddress);
  }

  public async getDecimals(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string
  ): Promise<number> {
    return feeds.getFeedRegistryDecimals(this.hre, feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick);
  }

  public async getDescription(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string
  ): Promise<string> {
    return feeds.getFeedRegistryDescription(
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
    return feeds.getFeedRegistryAggregatorVersion(
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
    return feeds.getFeedRegistryLatestRoundData(
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
    roundId: BigNumber
  ): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }> {
    return feeds.getFeedRegistryRoundData(
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
    roundId: BigNumber
  ): Promise<string> {
    return feeds.getRoundFeed(this.hre, feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick, roundId);
  }

  public async getPhase(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string,
    phaseId: BigNumber
  ): Promise<{
    phaseId: number;
    startingAggregatorRoundId: BigNumber;
    endingAggregatorRoundId: BigNumber;
  }> {
    return feeds.getPhase(this.hre, feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick, phaseId);
  }

  public async getPhaseFeed(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string,
    phaseId: BigNumber
  ): Promise<string> {
    return feeds.getPhaseFeed(this.hre, feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick, phaseId);
  }

  public async getPhaseRange(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string,
    phaseId: BigNumber
  ): Promise<{
    startingRoundId: BigNumber;
    endingRoundId: BigNumber;
  }> {
    return feeds.getPhaseRange(this.hre, feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick, phaseId);
  }

  public async getCurrentPhaseId(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string
  ): Promise<number> {
    return feeds.getCurrentPhaseId(this.hre, feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick);
  }

  public async getPreviousRoundId(
    feedRegistryAddress: string,
    feedRegistryBaseTick: string,
    feedRegistryQuoteTick: string,
    roundId: BigNumber
  ): Promise<BigNumber> {
    return feeds.getPreviousRoundId(
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
    roundId: BigNumber
  ): Promise<BigNumber> {
    return feeds.getNextRoundId(this.hre, feedRegistryAddress, feedRegistryBaseTick, feedRegistryQuoteTick, roundId);
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
    return feeds.resolveAggregatorAddress(this.hre, baseTick, quoteTick);
  }

  public async resolveAggregatorAddressWithSubdomains(
    baseTick: string,
    quoteTick: string
  ): Promise<{
    proxy: string;
    underlyingAggregator: string;
    proposedAggregator: string;
  }> {
    return feeds.resolveAggregatorAddressWithSubdomains(
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

  public async isL2SequencerUp(
    l2SequencerAddress: string
  ): Promise<boolean> {
    return feeds.isL2SequencerUp(this.hre, l2SequencerAddress);
  }

  public async getTimeSinceL2SequencerIsUp(
    l2SequencerAddress: string,
    gracePeriodTime: BigNumberish = BigNumber.from(3600)
  ): Promise<{
    isSequencerUp: boolean;
    timeSinceUp: BigNumber;
    isGracePeriodOver: boolean;
  }> {
    return feeds.getTimeSinceL2SequencerIsUp(
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
    vrfCoordinatorAddress: string,
  ): Promise<{ subscriptionId: BigNumber; transactionHash: string }> {
    return vrf.createSubscription(
      this.hre,
      vrfCoordinatorAddress,
    );
  }

  public async fundSubscription(
    vrfCoordinatorAddress: string,
    linkTokenAddress: string,
    amountInJuels: BigNumber,
    subscriptionId: BigNumber,
  ): Promise<{ transactionHash: string }> {
    return vrf.fundSubscription(
      this.hre,
      vrfCoordinatorAddress,
      linkTokenAddress,
      amountInJuels,
      subscriptionId,
    );
  }

  public async cancelSubscription(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumber,
    receivingWallet: string,
  ): Promise<{ transactionHash: string }> {
    return vrf.cancelSubscription(
      this.hre,
      vrfCoordinatorAddress,
      subscriptionId,
      receivingWallet,
    );
  }

  public async addConsumer(
    vrfCoordinatorAddress: string,
    consumerAddress: string,
    subscriptionId: BigNumber,
  ): Promise<{ transactionHash: string }> {
    return vrf.addConsumer(
      this.hre,
      vrfCoordinatorAddress,
      consumerAddress,
      subscriptionId,
    );
  }

  public async removeConsumer(
    vrfCoordinatorAddress: string,
    consumerAddress: string,
    subscriptionId: BigNumber,
  ): Promise<{ transactionHash: string }> {
    return vrf.removeConsumer(
      this.hre,
      vrfCoordinatorAddress,
      consumerAddress,
      subscriptionId,
    );
  }

  public async getSubscriptionDetails(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumber
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
    subscriptionId: BigNumber
  ): Promise<boolean> {
    return vrf.isPendingRequestExists(
      this.hre,
      vrfCoordinatorAddress,
      subscriptionId
    );
  }

  public async requestSubscriptionOwnerTransfer(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumber,
    newOwnerAddress: string,
  ): Promise<{ transactionHash: string }> {
    return vrf.requestSubscriptionOwnerTransfer(
      this.hre,
      vrfCoordinatorAddress,
      subscriptionId,
      newOwnerAddress,
    );
  }

  public async acceptSubscriptionOwnerTransfer(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumber,
  ): Promise<{ transactionHash: string }> {
    return vrf.acceptSubscriptionOwnerTransfer(
      this.hre,
      vrfCoordinatorAddress,
      subscriptionId,
    );
  }

  public async getMaxConsumers(
    vrfCoordinatorAddress: string
  ): Promise<number> {
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
    requestId: BigNumber
  ): Promise<BytesLike> {
    return vrf.getCommitment(this.hre, vrfCoordinatorAddress, requestId);
  }

  public async getCoordinatorConfig(
    vrfCoordinatorAddress: string
  ): Promise<{
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
    amountInJuels: BigNumber,
    upkeepName: string,
    encryptedEmail: BytesLike,
    upkeepContract: string,
    gasLimit: number,
    adminAddress: string,
    checkData: BytesLike,
    source: number,
    sender: string,
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
      sender,
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
    requestHash: BytesLike,
  ): Promise<{ transactionHash: string }> {
    return automation.cancelPendingRegistrationRequest(
      this.hre,
      keepersRegistrarAddress,
      requestHash,
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
    return automation.getKeeperRegistrarConfig(this.hre, keepersRegistrarAddress);
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
    upkeepId: BigNumber,
    amountInJuels: BigNumber,
  ): Promise<{ transactionHash: string }> {
    return automation.fundUpkeep(
      this.hre,
      keepersRegistryAddress,
      upkeepId,
      amountInJuels,
    );
  }

  public async checkUpkeep(
    keepersRegistryAddress: string,
    upkeepId: BigNumber,
    fromAddress: string
  ): Promise<{
    performData: BytesLike;
    maxLinkPayment: BigNumber;
    gasLimit: BigNumber;
    adjustedGasWei: BigNumber;
    linkEth: BigNumber;
  }> {
    return automation.checkUpkeep(this.hre, keepersRegistryAddress, upkeepId, fromAddress);
  }

  public async cancelUpkeep(
    keepersRegistryAddress: string,
    upkeepId: BigNumber,
  ): Promise<{ transactionHash: string }> {
    return automation.cancelUpkeep(
      this.hre,
      keepersRegistryAddress,
      upkeepId,
    );
  }

  public async withdrawFundsFromCanceledUpkeep(
    keepersRegistryAddress: string,
    upkeepId: BigNumber,
    receivingAddress: string,
  ): Promise<{ transactionHash: string }> {
    return automation.withdrawFunds(
      this.hre,
      keepersRegistryAddress,
      upkeepId,
      receivingAddress,
    );
  }

  public async getActiveUpkeepIDs(
    keepersRegistryAddress: string,
    startIndex: BigNumber,
    maxCount: BigNumber
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
    upkeepId: BigNumber
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
    upkeepIds: BigNumber[],
    destination: string,
  ): Promise<{ transactionHash: string }> {
    return automation.migrateUpkeeps(
      this.hre,
      keepersRegistryAddress,
      upkeepIds,
      destination,
    );
  }

  public async receiveUpkeeps(
    keepersRegistryAddress: string,
    encodedUpkeeps: BytesLike,
  ): Promise<{ transactionHash: string }> {
    return automation.receiveUpkeeps(
      this.hre,
      keepersRegistryAddress,
      encodedUpkeeps,
    );
  }

  public async withdrawKeeperPayment(
    keepersRegistryAddress: string,
    fromAddress: string,
    toAddress: string,
  ): Promise<{ transactionHash: string }> {
    return automation.withdrawKeeperPayment(
      this.hre,
      keepersRegistryAddress,
      fromAddress,
      toAddress,
    );
  }

  public async transferKeeperPayeeship(
    keepersRegistryAddress: string,
    keeper: string,
    proposed: string,
  ): Promise<{ transactionHash: string }> {
    return automation.transferKeeperPayeeship(
      this.hre,
      keepersRegistryAddress,
      keeper,
      proposed,
    );
  }

  public async acceptKeeperPayeeship(
    keepersRegistryAddress: string,
    keeper: string,
  ): Promise<{ transactionHash: string }> {
    return automation.acceptKeeperPayeeship(
      this.hre,
      keepersRegistryAddress,
      keeper,
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
    gasLimit: BigNumber
  ): Promise<BigNumber> {
    return automation.getMaxPaymentForGas(
      this.hre,
      keepersRegistryAddress,
      gasLimit
    );
  }

  public async getMinBalanceForUpkeep(
    keepersRegistryAddress: string,
    upkeepId: BigNumber
  ): Promise<BigNumber> {
    return automation.getMinBalanceForUpkeep(this.hre, keepersRegistryAddress, upkeepId);
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
