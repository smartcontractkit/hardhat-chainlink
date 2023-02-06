import "@nomiclabs/hardhat-ethers";
import { BigNumber, BytesLike } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
  acceptKeeperPayeeship,
  cancelKeepersPendingRegistrationRequest,
  cancelUpkeep,
  checkUpkeep,
  fundUpkeep,
  getActiveUpkeepIDs,
  getKeeperInfo,
  getKeepersPendingRegistrationRequest,
  getKeepersRegistrarConfig,
  getKeepersRegistrarTypeAndVersion,
  getKeepersRegistryState,
  getKeepersRegistryTypeAndVersion,
  getKeepersRegistryUpkeepTranscoderVersion,
  getMinBalanceForUpkeep,
  getUpkeep,
  isKeepersRegistryPaused,
  keepersGetMaxPaymentForGas,
  migrateUpkeeps,
  receiveMigratedUpkeeps,
  registerUpkeep,
  transferKeeperPayeeship,
  withdrawFundsFromCanceledUpkeep,
  withdrawKeeperPayment,
} from "./automation";
import {
  addSubscriptionConsumer,
  cancelSubscription,
  fundSubscription,
  getSubscriptionInfo,
} from "./functions";
import {
  Denominations,
  getAggregatorAddress,
  getAggregatorRoundId,
  getCurrentPhaseId,
  getFeed,
  getFeedRegistryDecimals,
  getFeedRegistryDescription,
  getFeedRegistryLatestRoundData,
  getFeedRegistryProxyAggregatorVersion,
  getFeedRegistryRoundData,
  getHistoricalPrice,
  getHistoricalPriceFromAggregator,
  getLatestPrice,
  getLatestRoundData,
  getLatestRoundIdOfAggregator,
  getLatestTimestampOfAggregator,
  getNextRoundId,
  getPhase,
  getPhaseFeed,
  getPhaseId,
  getPhaseIdOfAggregator,
  getPhaseRange,
  getPreviousRoundId,
  getPriceFeedAggregatorVersion,
  getPriceFeedDecimals,
  getPriceFeedDescription,
  getRoundData,
  getRoundFeed,
  getRoundTimestampOfAggregator,
  getTimeSinceLayer2SequencerIsUp,
  getTypeAndVersionOfAggregator,
  isFeedEnabled,
  isLayer2SequencerUp,
  resolveEnsAggregatorAddress,
  resolveEnsAggregatorAddressWithSubdomains,
} from "./priceFeeds";
import {
  acceptVrfSubscriptionOwnerTransfer,
  addVrfConsumer,
  cancelVrfSubscription,
  createVrfSubscription,
  fundVrfSubscription,
  getMaxVrfConsumers,
  getMaxVrfNumberOfWords,
  getMaxVrfRequestConfirmations,
  getMaxVrfRequestGasLimit,
  getMinVrfRequestConfirmations,
  getVrfCommitment,
  getVrfCoordinatorConfig,
  getVrfCoordinatorTypeAndVersion,
  getVrfSubscriptionDetails,
  pendingVrfRequestExists,
  removeVrfConsumer,
  requestVrfSubscriptionOwnerTransfer,
} from "./vrf";

export class HardhatChainlink {
  public denominations;
  private env: HardhatRuntimeEnvironment;

  constructor(env: HardhatRuntimeEnvironment) {
    this.env = env;
    this.denominations = Denominations;
  }

  public async getLatestPrice(priceFeedAddress: string): Promise<BigNumber> {
    return getLatestPrice(this.env, priceFeedAddress);
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
    return getLatestRoundData(this.env, dataFeedAddress);
  }

  public async getPriceFeedDecimals(priceFeedAddress: string): Promise<number> {
    return getPriceFeedDecimals(this.env, priceFeedAddress);
  }

  public async getPriceFeedDescription(
    priceFeedAddress: string
  ): Promise<string> {
    return getPriceFeedDescription(this.env, priceFeedAddress);
  }

  public async getRoundData(
    priceFeedAddress: string,
    roundId: BigNumber
  ): Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
  }> {
    return getRoundData(this.env, priceFeedAddress, roundId);
  }

  public async getAggregatorAddress(priceFeedAddress: string): Promise<string> {
    return getAggregatorAddress(this.env, priceFeedAddress);
  }

  public async getAggregatorRoundId(
    priceFeedAddress: string
  ): Promise<BigNumber> {
    return getAggregatorRoundId(this.env, priceFeedAddress);
  }

  public async getPhaseId(priceFeedAddress: string): Promise<BigNumber> {
    return getPhaseId(this.env, priceFeedAddress);
  }

  public async getHistoricalPrice(
    priceFeedAddress: string,
    roundId: BigNumber
  ): Promise<BigNumber> {
    return getHistoricalPrice(this.env, priceFeedAddress, roundId);
  }

  public async getPriceFeedAggregatorVersion(
    priceFeedAddress: string
  ): Promise<BigNumber> {
    return getPriceFeedAggregatorVersion(this.env, priceFeedAddress);
  }

  public async resolveEnsAggregatorAddress(
    baseTick: string,
    quoteTick: string
  ): Promise<string> {
    return resolveEnsAggregatorAddress(this.env, baseTick, quoteTick);
  }

  public async resolveEnsAggregatorAddressWithSubdomains(
    baseTick: string,
    quoteTick: string
  ): Promise<{
    proxy: string;
    underlyingAggregator: string;
    proposedAggregator: string;
  }> {
    return resolveEnsAggregatorAddressWithSubdomains(
      this.env,
      baseTick,
      quoteTick
    );
  }

  public async getFeedRegistryDecimals(
    feedRegistryAddress: string,
    base: string,
    quote: string
  ): Promise<number> {
    return getFeedRegistryDecimals(this.env, feedRegistryAddress, base, quote);
  }

  public async getFeedRegistryDescription(
    feedRegistryAddress: string,
    base: string,
    quote: string
  ): Promise<string> {
    return getFeedRegistryDescription(
      this.env,
      feedRegistryAddress,
      base,
      quote
    );
  }

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
  }> {
    return getFeedRegistryRoundData(
      this.env,
      feedRegistryAddress,
      base,
      quote,
      roundId
    );
  }

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
  }> {
    return getFeedRegistryLatestRoundData(
      this.env,
      feedRegistryAddress,
      base,
      quote
    );
  }

  public async getFeedRegistryProxyAggregatorVersion(
    feedRegistryAddress: string,
    base: string,
    quote: string
  ): Promise<BigNumber> {
    return getFeedRegistryProxyAggregatorVersion(
      this.env,
      feedRegistryAddress,
      base,
      quote
    );
  }

  public async getFeed(
    feedRegistryAddress: string,
    base: string,
    quote: string
  ): Promise<string> {
    return getFeed(this.env, feedRegistryAddress, base, quote);
  }

  public async getPhaseFeed(
    feedRegistryAddress: string,
    base: string,
    quote: string,
    phaseId: BigNumber
  ): Promise<string> {
    return getPhaseFeed(this.env, feedRegistryAddress, base, quote, phaseId);
  }

  public async isFeedEnabled(
    feedRegistryAddress: string,
    aggregatorAddress: string
  ): Promise<boolean> {
    return isFeedEnabled(this.env, feedRegistryAddress, aggregatorAddress);
  }

  public async getPhase(
    feedRegistryAddress: string,
    base: string,
    quote: string,
    phaseId: BigNumber
  ): Promise<{
    phaseId: number;
    startingAggregatorRoundId: BigNumber;
    endingAggregatorRoundId: BigNumber;
  }> {
    return getPhase(this.env, feedRegistryAddress, base, quote, phaseId);
  }

  public async getRoundFeed(
    feedRegistryAddress: string,
    base: string,
    quote: string,
    roundId: BigNumber
  ): Promise<string> {
    return getRoundFeed(this.env, feedRegistryAddress, base, quote, roundId);
  }

  public async getPhaseRange(
    feedRegistryAddress: string,
    base: string,
    quote: string,
    phaseId: BigNumber
  ): Promise<{
    startingRoundId: BigNumber;
    endingRoundId: BigNumber;
  }> {
    return getPhaseRange(this.env, feedRegistryAddress, base, quote, phaseId);
  }

  public async getPreviousRoundId(
    feedRegistryAddress: string,
    base: string,
    quote: string,
    roundId: BigNumber
  ): Promise<BigNumber> {
    return getPreviousRoundId(
      this.env,
      feedRegistryAddress,
      base,
      quote,
      roundId
    );
  }

  public async getNextRoundId(
    feedRegistryAddress: string,
    base: string,
    quote: string,
    roundId: BigNumber
  ): Promise<BigNumber> {
    return getNextRoundId(this.env, feedRegistryAddress, base, quote, roundId);
  }

  public async getCurrentPhaseId(
    feedRegistryAddress: string,
    base: string,
    quote: string
  ): Promise<number> {
    return getCurrentPhaseId(this.env, feedRegistryAddress, base, quote);
  }

  public async getHistoricalPriceFromAggregator(
    aggregatorAddress: string,
    aggregatorRoundId: BigNumber
  ): Promise<BigNumber> {
    return getHistoricalPriceFromAggregator(
      this.env,
      aggregatorAddress,
      aggregatorRoundId
    );
  }

  // DEPRECATED
  // public async getRoundTimestampOfAggregator(
  //   aggregatorAddress: string,
  //   aggregatorRoundId: BigNumber
  // ): Promise<BigNumber> {
  //   return getRoundTimestampOfAggregator(
  //     this.env,
  //     aggregatorAddress,
  //     aggregatorRoundId
  //   );
  // }

  // DEPRECATED
  // public async getLatestTimestampOfAggregator(
  //   aggregatorAddress: string
  // ): Promise<BigNumber> {
  //   return getLatestTimestampOfAggregator(this.env, aggregatorAddress);
  // }

  // DEPRECATED
  // public async getLatestRoundIdOfAggregator(
  //   aggregatorAddress: string
  // ): Promise<BigNumber> {
  //   return getLatestRoundIdOfAggregator(this.env, aggregatorAddress);
  // }

  public async getTypeAndVersionOfAggregator(
    aggregatorAddress: string
  ): Promise<string> {
    return getTypeAndVersionOfAggregator(this.env, aggregatorAddress);
  }

  public async getPhaseIdOfAggregator(
    aggregatorAddress: string
  ): Promise<BigNumber> {
    return getPhaseIdOfAggregator(this.env, aggregatorAddress);
  }

  public async isLayer2SequencerUp(
    sequencerUptimeFeedAddress: string
  ): Promise<boolean> {
    return isLayer2SequencerUp(this.env, sequencerUptimeFeedAddress);
  }

  public async getTimeSinceLayer2SequencerIsUp(
    sequencerUptimeFeedAddress: string,
    gracePeriodTime = BigNumber.from(3600)
  ): Promise<{
    isSequencerUp: boolean;
    timeSinceUp: BigNumber;
    isGracePeriodOver: boolean;
  }> {
    return getTimeSinceLayer2SequencerIsUp(
      this.env,
      sequencerUptimeFeedAddress,
      gracePeriodTime
    );
  }

  public async createVrfSubscription(
    vrfCoordinatorAddress: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ subscriptionId: BigNumber; transactionHash: string }> {
    return createVrfSubscription(
      this.env,
      vrfCoordinatorAddress,
      waitNumberOfConfirmations
    );
  }

  public async fundVrfSubscription(
    vrfCoordinatorAddress: string,
    linkTokenAddress: string,
    amountInJuels: BigNumber,
    subscriptionId: BigNumber,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return fundVrfSubscription(
      this.env,
      vrfCoordinatorAddress,
      linkTokenAddress,
      amountInJuels,
      subscriptionId,
      waitNumberOfConfirmations
    );
  }

  public async addVrfConsumer(
    vrfCoordinatorAddress: string,
    consumerAddress: string,
    subscriptionId: BigNumber,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return addVrfConsumer(
      this.env,
      vrfCoordinatorAddress,
      consumerAddress,
      subscriptionId,
      waitNumberOfConfirmations
    );
  }

  public async removeVrfConsumer(
    vrfCoordinatorAddress: string,
    consumerAddress: string,
    subscriptionId: BigNumber,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return removeVrfConsumer(
      this.env,
      vrfCoordinatorAddress,
      consumerAddress,
      subscriptionId,
      waitNumberOfConfirmations
    );
  }

  public async cancelVrfSubscription(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumber,
    receivingWallet: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return cancelVrfSubscription(
      this.env,
      vrfCoordinatorAddress,
      subscriptionId,
      receivingWallet,
      waitNumberOfConfirmations
    );
  }

  public async getVrfSubscriptionDetails(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumber
  ): Promise<{
    balance: BigNumber;
    reqCount: BigNumber;
    owner: string;
    consumers: string[];
  }> {
    return getVrfSubscriptionDetails(
      this.env,
      vrfCoordinatorAddress,
      subscriptionId
    );
  }

  public async pendingVrfRequestExists(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumber
  ): Promise<boolean> {
    return pendingVrfRequestExists(
      this.env,
      vrfCoordinatorAddress,
      subscriptionId
    );
  }

  public async requestVrfSubscriptionOwnerTransfer(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumber,
    newOwnerAddress: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return requestVrfSubscriptionOwnerTransfer(
      this.env,
      vrfCoordinatorAddress,
      subscriptionId,
      newOwnerAddress,
      waitNumberOfConfirmations
    );
  }

  public async acceptVrfSubscriptionOwnerTransfer(
    vrfCoordinatorAddress: string,
    subscriptionId: BigNumber,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return acceptVrfSubscriptionOwnerTransfer(
      this.env,
      vrfCoordinatorAddress,
      subscriptionId,
      waitNumberOfConfirmations
    );
  }

  public async getMaxVrfConsumers(
    vrfCoordinatorAddress: string
  ): Promise<number> {
    return getMaxVrfConsumers(this.env, vrfCoordinatorAddress);
  }

  public async getMaxVrfNumberOfWords(
    vrfCoordinatorAddress: string
  ): Promise<number> {
    return getMaxVrfNumberOfWords(this.env, vrfCoordinatorAddress);
  }

  public async getMaxVrfRequestConfirmations(
    vrfCoordinatorAddress: string
  ): Promise<number> {
    return getMaxVrfRequestConfirmations(this.env, vrfCoordinatorAddress);
  }

  public async getMinVrfRequestConfirmations(
    vrfCoordinatorAddress: string
  ): Promise<number> {
    return getMinVrfRequestConfirmations(this.env, vrfCoordinatorAddress);
  }

  public async getMaxVrfRequestGasLimit(
    vrfCoordinatorAddress: string
  ): Promise<number> {
    return getMaxVrfRequestGasLimit(this.env, vrfCoordinatorAddress);
  }

  public async getVrfCommitment(
    vrfCoordinatorAddress: string,
    requestId: BigNumber
  ): Promise<BytesLike> {
    return getVrfCommitment(this.env, vrfCoordinatorAddress, requestId);
  }

  public async getVrfCoordinatorConfig(
    vrfCoordinatorAddress: string
  ): Promise<{
    minimumRequestConfirmations: number;
    maxGasLimit: number;
    stalenessSeconds: number;
    gasAfterPaymentCalculation: number;
  }> {
    return getVrfCoordinatorConfig(this.env, vrfCoordinatorAddress);
  }

  public async getVrfCoordinatorTypeAndVersion(
    vrfCoordinatorAddress: string
  ): Promise<string> {
    return getVrfCoordinatorTypeAndVersion(this.env, vrfCoordinatorAddress);
  }

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
  ): Promise<{ transactionHash: string }> {
    return registerUpkeep(
      this.env,
      linkTokenAddress,
      automationRegistrarAddress,
      amountInJuels,
      name,
      encryptedEmail,
      upkeepContract,
      gasLimit,
      adminAddress,
      checkData,
      source,
      sender,
      waitNumberOfConfirmations
    );
  }

  public async getAutomationPendingRegistrationRequest(
    automationRegistrarAddress: string,
    hash: BytesLike
  ): Promise<{
    adminAddress: string;
    balance: BigNumber;
  }> {
    return getKeepersPendingRegistrationRequest(
      this.env,
      automationRegistrarAddress,
      hash
    );
  }

  public async cancelAutomationPendingRegistrationRequest(
    automationRegistrarAddress: string,
    hash: BytesLike,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return cancelKeepersPendingRegistrationRequest(
      this.env,
      automationRegistrarAddress,
      hash,
      waitNumberOfConfirmations
    );
  }

  public async getAutomationRegistrarConfig(
    automationRegistrarAddress: string
  ): Promise<{
    autoApproveConfigType: number;
    autoApproveMaxAllowed: number;
    approvedCount: number;
    automationRegistry: string;
    minLINKJuels: BigNumber;
  }> {
    return getKeepersRegistrarConfig(this.env, automationRegistrarAddress);
  }

  public async getAutomationRegistrarTypeAndVersion(
    automationRegistrarAddress: string
  ): Promise<string> {
    return getKeepersRegistrarTypeAndVersion(
      this.env,
      automationRegistrarAddress
    );
  }

  public async fundUpkeep(
    automationRegistryAddress: string,
    id: BigNumber,
    amountInJuels: BigNumber,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return fundUpkeep(
      this.env,
      automationRegistryAddress,
      id,
      amountInJuels,
      waitNumberOfConfirmations
    );
  }

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
  }> {
    return checkUpkeep(this.env, automationRegistryAddress, id, address);
  }

  public async migrateUpkeeps(
    automationRegistryAddress: string,
    ids: BigNumber[],
    destination: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return migrateUpkeeps(
      this.env,
      automationRegistryAddress,
      ids,
      destination,
      waitNumberOfConfirmations
    );
  }

  public async receiveMigratedUpkeeps(
    automationRegistryAddress: string,
    encodedUpkeeps: BytesLike,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return receiveMigratedUpkeeps(
      this.env,
      automationRegistryAddress,
      encodedUpkeeps,
      waitNumberOfConfirmations
    );
  }

  public async cancelUpkeep(
    automationRegistryAddress: string,
    id: BigNumber,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return cancelUpkeep(
      this.env,
      automationRegistryAddress,
      id,
      waitNumberOfConfirmations
    );
  }

  public async withdrawFundsFromCanceledUpkeep(
    automationRegistryAddress: string,
    id: BigNumber,
    to: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return withdrawFundsFromCanceledUpkeep(
      this.env,
      automationRegistryAddress,
      id,
      to,
      waitNumberOfConfirmations
    );
  }

  public async transferAutomationPayeeship(
    automationRegistryAddress: string,
    automationNode: string,
    proposed: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return transferKeeperPayeeship(
      this.env,
      automationRegistryAddress,
      automationNode,
      proposed,
      waitNumberOfConfirmations
    );
  }

  public async acceptAutomationPayeeship(
    automationRegistryAddress: string,
    automationNode: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return acceptKeeperPayeeship(
      this.env,
      automationRegistryAddress,
      automationNode,
      waitNumberOfConfirmations
    );
  }

  public async withdrawAutomationPayment(
    automationRegistryAddress: string,
    from: string,
    to: string,
    waitNumberOfConfirmations: number = 1
  ): Promise<{ transactionHash: string }> {
    return withdrawKeeperPayment(
      this.env,
      automationRegistryAddress,
      from,
      to,
      waitNumberOfConfirmations
    );
  }

  public async getActiveUpkeepIDs(
    automationRegistryAddress: string,
    startIndex: BigNumber,
    maxCount: BigNumber
  ): Promise<BigNumber[]> {
    return getActiveUpkeepIDs(
      this.env,
      automationRegistryAddress,
      startIndex,
      maxCount
    );
  }

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
  }> {
    return getUpkeep(this.env, automationRegistryAddress, id);
  }

  public async getAutomationNodeInfo(
    automationRegistryAddress: string,
    query: string
  ): Promise<{ payee: string; active: boolean; balance: BigNumber }> {
    return getKeeperInfo(this.env, automationRegistryAddress, query);
  }

  public async automationGetMaxPaymentForGas(
    automationRegistryAddress: string,
    gasLimit: BigNumber
  ): Promise<BigNumber> {
    return keepersGetMaxPaymentForGas(
      this.env,
      automationRegistryAddress,
      gasLimit
    );
  }

  public async getMinBalanceForUpkeep(
    automationRegistryAddress: string,
    id: BigNumber
  ): Promise<BigNumber> {
    return getMinBalanceForUpkeep(this.env, automationRegistryAddress, id);
  }

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
  }> {
    return getKeepersRegistryState(this.env, automationRegistryAddress);
  }

  public async isAutomationRegistryPaused(
    automationRegistryAddress: string
  ): Promise<boolean> {
    return isKeepersRegistryPaused(this.env, automationRegistryAddress);
  }

  public async getAutomationRegistryTypeAndVersion(
    automationRegistryAddress: string
  ): Promise<string> {
    return getKeepersRegistryTypeAndVersion(
      this.env,
      automationRegistryAddress
    );
  }

  public async getAutomationRegistryUpkeepTranscoderVersion(
    automationRegistryAddress: string
  ): Promise<number> {
    return getKeepersRegistryUpkeepTranscoderVersion(
      this.env,
      automationRegistryAddress
    );
  }

  // --- Functions ---

  public async functionsGetSubscriptionInfo(
    registryAddress: string,
    subscriptionId: number
  ): Promise<{
    balance: BigNumber;
    owner: string;
    consumers: string[];
  }> {
    return getSubscriptionInfo(this.env, registryAddress, subscriptionId);
  }

  public async functionsFundSubscription(
    registryAddress: string,
    subscriptionId: number,
    linkAmount: string
  ): Promise<BigNumber> {
    return fundSubscription(
      this.env,
      registryAddress,
      subscriptionId,
      linkAmount
    );
  }

  public async functionsCancelSubscription(
    registryAddress: string,
    subscriptionId: number,
    refundAddress: string
  ): Promise<void> {
    return cancelSubscription(
      this.env,
      registryAddress,
      subscriptionId,
      refundAddress
    );
  }

  public async functionsAddSubscriptionConsumer(
    registryAddress: string,
    subscriptionId: number,
    consumerAddress: string
  ): Promise<void> {
    return addSubscriptionConsumer(
      this.env,
      registryAddress,
      subscriptionId,
      consumerAddress
    );
  }
}
