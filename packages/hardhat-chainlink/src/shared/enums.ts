export enum Task {
  dataFeed = "dataFeed",
  dataFeedProxy = "dataFeedProxy",
  feedRegistry = "feedRegistry",
  l2Sequencer = "l2Sequencer",
  ens = "ens",
  automationRegistry = "automationRegistry",
  automationRegistrar = "automationRegistrar",
  vrf = "vrf",
  sandbox = "sandbox",
  functions = "functions",
  registries = "registries",
  utils = "utils",
}

export enum DataFeedSubtask {
  getLatestRoundAnswer = "getLatestRoundAnswer",
  getRoundAnswer = "getRoundAnswer",
  getLatestRoundData = "getLatestRoundData",
  getRoundData = "getRoundData",
  getLatestRoundId = "getLatestRoundId",
  getDecimals = "getDecimals",
  getDescription = "getDescription",
  getVersion = "getVersion",
}

export enum DataFeedProxySubtask {
  getLatestRoundAnswer = "getLatestRoundAnswer",
  getRoundAnswer = "getRoundAnswer",
  getLatestRoundData = "getLatestRoundData",
  getRoundData = "getRoundData",
  getLatestRoundId = "getLatestRoundId",
  getDecimals = "getDecimals",
  getDescription = "getDescription",
  getVersion = "getVersion",
  getAggregator = "getAggregator",
  getPhaseId = "getPhaseId",
  getPhaseAggregators = "getPhaseAggregators",
}

export enum FeedRegistrySubtask {
  getLatestRoundData = "getLatestRoundData",
  getRoundData = "getRoundData",
  proposedGetLatestRoundData = "proposedGetLatestRoundData",
  proposedGetRoundData = "proposedGetRoundData",
  getRoundFeed = "getRoundFeed",
  getFeed = "getFeed",
  getProposedFeed = "getProposedFeed",
  isFeedEnabled = "isFeedEnabled",
  getPreviousRoundId = "getPreviousRoundId",
  getNextRoundId = "getNextRoundId",
  getDecimals = "getDecimals",
  getDescription = "getDescription",
  getVersion = "getVersion",
  getPhase = "getPhase",
  getPhaseFeed = "getPhaseFeed",
  getPhaseRange = "getPhaseRange",
  getCurrentPhaseId = "getCurrentPhaseId",
}

export enum L2SequencerSubtask {
  isL2SequencerUp = "isL2SequencerUp",
  getTimeSinceL2SequencerIsUp = "getTimeSinceL2SequencerIsUp",
}

export enum ENSFeedsResolverSubtask {
  resolveAggregatorAddress = "resolveAggregatorAddress",
  resolveAggregatorAddressWithSubdomains = "resolveAggregatorAddressWithSubdomains",
}

export enum VRFSubtask {
  createSubscription = "createSubscription",
  fundSubscription = "fundSubscription",
  cancelSubscription = "cancelSubscription",
  addConsumer = "addConsumer",
  removeConsumer = "removeConsumer",
  requestRandomWords = "requestRandomWords",
  getSubscriptionDetails = "getSubscriptionDetails",
  isPendingRequestExists = "isPendingRequestExists",
  requestSubscriptionOwnerTransfer = "requestSubscriptionOwnerTransfer",
  acceptSubscriptionOwnerTransfer = "acceptSubscriptionOwnerTransfer",
  getMaxConsumers = "getMaxConsumers",
  getMaxNumberOfWords = "getMaxNumberOfWords",
  getMaxRequestConfirmations = "getMaxRequestConfirmations",
  getMinRequestConfirmations = "getMinRequestConfirmations",
  getMaxRequestGasLimit = "getMaxRequestGasLimit",
  getCommitment = "getCommitment",
  getConfig = "getConfig",
  getTypeAndVersion = "getTypeAndVersion",
}

export enum AutomationRegistrySubtask {
  getState = "getKeeperRegistryState  ",
  getActiveUpkeepIDs = "getActiveUpkeepIDs",
  getMaxPaymentForGas = "getMaxPaymentForGas",
  isPaused = "isPaused",
  getUpkeep = "getUpkeep",
  getMinBalanceForUpkeep = "getMinBalanceForUpkeep",
  fundUpkeep = "fundUpkeep",
  cancelUpkeep = "cancelUpkeep",
  withdrawFunds = "withdrawFunds",
  migrateUpkeeps = "migrateUpkeeps",
  getKeeperInfo = "getKeeperInfo",
  getTypeAndVersion = "getTypeAndVersion",
  getUpkeepTranscoderVersion = "getUpkeepTranscoderVersion",
}

export enum AutomationRegistrarSubtask {
  registerUpkeep = "registerUpkeep",
  getPendingRequest = "getPendingRequest",
  cancelRequest = "cancelRequest",
  getRegistrationConfig = "getRegistrationConfig",
  getTypeAndVersion = "getTypeAndVersion",
}

export enum PluginRegistriesSubtask {
  getDataFeed = "getDataFeed",
  getFeedRegistry = "getFeedRegistry",
  getVRFCoordinator = "getVRFCoordinator",
  getLinkToken = "getLinkToken",
  getKeeperRegistry = "getKeeperRegistry",
  getL2Sequencer = "getL2Sequencer",
  getFunctionOracle = "getFunctionOracle",
  getDenomination = "getDenomination",
}

export enum UtilsSubtask {
  getRoundId = "getRoundId",
  parseRoundId = "parseRoundId",
}

export const enum InquirableParameter {
  dataFeedAddress = "dataFeedAddress",
  dataFeedProxyAddress = "dataFeedProxyAddress",
  feedRegistryAddress = "feedRegistryAddress",
  vrfCoordinatorAddress = "vrfCoordinatorAddress",
  linkTokenAddress = "linkTokenAddress",
  keeperRegistryAddress = "keeperRegistryAddress",
  keeperRegistrarAddress = "keeperRegistrarAddress",
  l2SequencerAddress = "l2SequencerAddress",
  functionOracleAddress = "functionOracleAddress",
  feedRegistryBaseTick = "feedRegistryBaseTick",
  feedRegistryQuoteTick = "feedRegistryQuoteTick",
}

export const enum KeeperRegistryVersion {
  registry1_2 = "KeeperRegistry 1.2.0",
  registry1_3 = "KeeperRegistry 1.3.0",
  registry2_0 = "KeeperRegistry 2.0.0",
}

export const enum KeeperRegistrarVersion {
  registrar1_1 = "KeeperRegistrar 1.1.0",
  registrar2_0 = "KeeperRegistrar 2.0.0",
}
