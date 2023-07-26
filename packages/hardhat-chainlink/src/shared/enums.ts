export enum Task {
  dataFeed = "dataFeed",
  dataFeedProxy = "dataFeedProxy",
  feedRegistry = "feedRegistry",
  l2Sequencer = "l2Sequencer",
  ens = "ens",
  automation = "automation",
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

export enum AutomationSubtask {
  registerUpkeep = "registerUpkeep",
  getPendingRegistrationRequest = "getPendingRegistrationRequest",
  cancelPendingRegistrationRequest = "cancelPendingRegistrationRequest",
  getKeeperRegistrarConfig = "getKeeperRegistrarConfig",
  getKeepersRegistrarTypeAndVersion = "getKeepersRegistrarTypeAndVersion",
  fundUpkeep = "fundUpkeep",
  checkUpkeep = "checkUpkeep",
  migrateUpkeeps = "migrateUpkeeps",
  receiveUpkeeps = "receiveUpkeeps",
  cancelUpkeep = "cancelUpkeep",
  withdrawFunds = "withdrawFunds",
  transferKeeperPayeeship = "transferKeeperPayeeship",
  acceptKeeperPayeeship = "acceptKeeperPayeeship",
  withdrawKeeperPayment = "withdrawKeeperPayment",
  getActiveUpkeepIDs = "getActiveUpkeepIDs",
  getUpkeep = "getUpkeep",
  getKeeperInfo = "getKeeperInfo",
  getMaxPaymentForGas = "getMaxPaymentForGas",
  getMinBalanceForUpkeep = "getMinBalanceForUpkeep",
  getKeeperRegistryState = "getKeeperRegistryState  ",
  isKeeperRegistryPaused = "isKeeperRegistryPaused",
  getKeeperRegistryTypeAndVersion = "getKeeperRegistryTypeAndVersion",
  getKeeperRegistryUpkeepTranscoderVersion = "getKeeperRegistryUpkeepTranscoderVersion",
}

export enum PluginRegistriesSubtask {
  getDataFeedAddress = "getDataFeedAddress",
  getFeedRegistryAddress = "getFeedRegistryAddress",
  getVRFCoordinatorAddress = "getVRFCoordinatorAddress",
  getLinkTokenAddress = "getLinkTokenAddress",
  getKeeperRegistryAddress = "getKeeperRegistryAddress",
  getKeeperRegistrarAddress = "getKeeperRegistrarAddress",
  getL2SequencerAddress = "getL2SequencerAddress",
  getFunctionOracleAddress = "getFunctionOracleAddress",
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
