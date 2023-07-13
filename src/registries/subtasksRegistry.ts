import { camelToFlat, camelToKebab } from "../helpers/utils";
import * as automationActions from "../tasks/automation";
import * as feedsActions from "../tasks/feeds";
import * as registriesActions from "../tasks/registries";
import * as vrfActions from "../tasks/vrf";

import { SubtaskProperties } from "./interfaces";

export enum Task {
  dataFeeds = "dataFeeds",
  feedRegistries = "feedRegistries",
  l2Sequencer = "l2Sequencer",
  ens = "ens",
  automation = "automation",
  vrf = "vrf",
  sandbox = "sandbox",
  functions = "functions",
  registries = "registries",
}

enum DataFeedSubtask {
  getLatestRoundAnswer = "getLatestRoundAnswer",
  getRoundAnswer = "getRoundAnswer",
  getLatestRoundData = "getLatestRoundData",
  getRoundData = "getRoundData",
  getDecimals = "getDecimals",
  getDescription = "getDescription",
  getAggregatorVersion = "getAggregatorVersion",
  getAggregatorAddress = "getAggregatorAddress",
  getAggregatorRoundId = "getAggregatorRoundId",
  getPhaseId = "getPhaseId",
}

enum FeedRegistrySubtasks {
  getFeed = "getFeed",
  isFeedEnabled = "isFeedEnabled",
  getFeedRegistryDecimals = "getFeedRegistryDecimals",
  getFeedRegistryDescription = "getFeedRegistryDescription",
  getFeedRegistryAggregatorVersion = "getFeedRegistryAggregatorVersion",
  getFeedRegistryLatestRoundData = "getFeedRegistryLatestRoundData",
  getFeedRegistryRoundData = "getFeedRegistryRoundData",
  getRoundFeed = "getRoundFeed",
  getPhase = "getPhase",
  getPhaseFeed = "getPhaseFeed",
  getPhaseRange = "getPhaseRange",
  getCurrentPhaseId = "getCurrentPhaseId",
  getPreviousRoundId = "getPreviousRoundId",
  getNextRoundId = "getNextRoundId",
}

enum L2SequencerSubtasks {
  isL2SequencerUp = "isL2SequencerUp",
  getTimeSinceL2SequencerIsUp = "getTimeSinceL2SequencerIsUp",
}

enum ensFeedsResolverSubtasks {
  resolveAggregatorAddress = "resolveAggregatorAddress",
  resolveAggregatorAddressWithSubdomains = "resolveAggregatorAddressWithSubdomains",
}

enum VRFSubtasks {
  createSubscription = "createSubscription",
  fundSubscription = "fundSubscription",
  cancelSubscription = "cancelSubscription",
  addConsumer = "addConsumer",
  removeConsumer = "removeConsumer",
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
  getCoordinatorConfig = "getCoordinatorConfig",
  getCoordinatorTypeAndVersion = "getCoordinatorTypeAndVersion",
}

enum AutomationSubtasks {
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

enum PluginRegistriesSubtasks {
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

export const subtasksRegistry: Record<
  string,
  Record<string, SubtaskProperties>
> = {
  [Task.dataFeeds]: {
    [DataFeedSubtask.getLatestRoundAnswer]: {
      action: feedsActions.getLatestRoundAnswer,
      command: camelToKebab(DataFeedSubtask.getLatestRoundAnswer),
      description: camelToFlat(DataFeedSubtask.getLatestRoundAnswer),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
      ],
    },
    [DataFeedSubtask.getRoundAnswer]: {
      action: feedsActions.getRoundAnswer,
      command: camelToKebab(DataFeedSubtask.getRoundAnswer),
      description: camelToFlat(DataFeedSubtask.getRoundAnswer),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
        {
          name: "roundId",
          description: "Round ID of Data Feed",
        },
      ],
    },
    [DataFeedSubtask.getLatestRoundData]: {
      action: feedsActions.getLatestRoundData,
      command: camelToKebab(DataFeedSubtask.getLatestRoundData),
      description: camelToFlat(DataFeedSubtask.getLatestRoundData),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
      ],
    },
    [DataFeedSubtask.getRoundData]: {
      action: feedsActions.getRoundData,
      command: camelToKebab(DataFeedSubtask.getRoundData),
      description: camelToFlat(DataFeedSubtask.getRoundData),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
        {
          name: "roundId",
          description: "Round ID of Data Feed",
        },
      ],
    },
    [DataFeedSubtask.getDecimals]: {
      action: feedsActions.getDecimals,
      command: camelToKebab(DataFeedSubtask.getDecimals),
      description: camelToFlat(DataFeedSubtask.getDecimals),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
      ],
    },
    [DataFeedSubtask.getDescription]: {
      action: feedsActions.getDescription,
      command: camelToKebab(DataFeedSubtask.getDescription),
      description: camelToFlat(DataFeedSubtask.getDescription),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
      ],
    },
    [DataFeedSubtask.getAggregatorVersion]: {
      action: feedsActions.getAggregatorVersion,
      command: camelToKebab(DataFeedSubtask.getAggregatorVersion),
      description: camelToFlat(DataFeedSubtask.getAggregatorVersion),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
      ],
    },
    [DataFeedSubtask.getAggregatorAddress]: {
      action: feedsActions.getAggregatorAddress,
      command: camelToKebab(DataFeedSubtask.getAggregatorAddress),
      description: camelToFlat(DataFeedSubtask.getAggregatorAddress),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
      ],
    },
    [DataFeedSubtask.getAggregatorRoundId]: {
      action: feedsActions.getAggregatorRoundId,
      command: camelToKebab(DataFeedSubtask.getAggregatorRoundId),
      description: camelToFlat(DataFeedSubtask.getAggregatorRoundId),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
      ],
    },
    [DataFeedSubtask.getPhaseId]: {
      action: feedsActions.getPhaseId,
      command: camelToKebab(DataFeedSubtask.getPhaseId),
      description: "Get Data Feed phase ID",
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
      ],
    },
  },
  [Task.feedRegistries]: {
    [FeedRegistrySubtasks.getFeed]: {
      action: feedsActions.getFeed,
      command: camelToKebab(FeedRegistrySubtasks.getFeed),
      description: camelToFlat(FeedRegistrySubtasks.getFeed),
      args: [
        {
          name: "feedRegistryAddress",
          description: "Address of Feed Registry",
        },
        {
          name: "feedRegistryBaseTick",
          description: "Address or denomination of base tick in a token pair",
        },
        {
          name: "feedRegistryQuoteTick",
          description: "Address or denomination of quote tick in a token pair",
        },
      ],
    },
    [FeedRegistrySubtasks.isFeedEnabled]: {
      action: feedsActions.isFeedEnabled,
      command: camelToKebab(FeedRegistrySubtasks.isFeedEnabled),
      description: camelToFlat(FeedRegistrySubtasks.isFeedEnabled),
      args: [
        {
          name: "feedRegistryAddress",
          description: "Address of Feed Registry",
        },
        {
          name: "aggregatorAddress",
          description: "Address or a Data Feed Offchain Aggregator",
        },
      ],
    },
    [FeedRegistrySubtasks.getFeedRegistryDecimals]: {
      action: feedsActions.getFeedRegistryDecimals,
      command: camelToKebab(FeedRegistrySubtasks.getFeedRegistryDecimals),
      description: camelToFlat(FeedRegistrySubtasks.getFeedRegistryDecimals),
      args: [
        {
          name: "feedRegistryAddress",
          description: "Address of Feed Registry",
        },
        {
          name: "feedRegistryBaseTick",
          description: "Address or denomination of base tick in a token pair",
        },
        {
          name: "feedRegistryQuoteTick",
          description: "Address or denomination of quote tick in a token pair",
        },
      ],
    },
    [FeedRegistrySubtasks.getFeedRegistryDescription]: {
      action: feedsActions.getFeedRegistryDescription,
      command: camelToKebab(FeedRegistrySubtasks.getFeedRegistryDescription),
      description: camelToFlat(FeedRegistrySubtasks.getFeedRegistryDescription),
      args: [
        {
          name: "feedRegistryAddress",
          description: "Address of Feed Registry",
        },
        {
          name: "feedRegistryBaseTick",
          description: "Address or denomination of base tick in a token pair",
        },
        {
          name: "feedRegistryQuoteTick",
          description: "Address or denomination of quote tick in a token pair",
        },
      ],
    },
    [FeedRegistrySubtasks.getFeedRegistryAggregatorVersion]: {
      action: feedsActions.getFeedRegistryAggregatorVersion,
      command: camelToKebab(
        FeedRegistrySubtasks.getFeedRegistryAggregatorVersion
      ),
      description: camelToFlat(
        FeedRegistrySubtasks.getFeedRegistryAggregatorVersion
      ),
      args: [
        {
          name: "feedRegistryAddress",
          description: "Address of Feed Registry",
        },
        {
          name: "feedRegistryBaseTick",
          description: "Address or denomination of base tick in a token pair",
        },
        {
          name: "feedRegistryQuoteTick",
          description: "Address or denomination of quote tick in a token pair",
        },
      ],
    },
    [FeedRegistrySubtasks.getFeedRegistryLatestRoundData]: {
      action: feedsActions.getFeedRegistryLatestRoundData,
      command: camelToKebab(
        FeedRegistrySubtasks.getFeedRegistryLatestRoundData
      ),
      description: camelToFlat(
        FeedRegistrySubtasks.getFeedRegistryLatestRoundData
      ),
      args: [
        {
          name: "feedRegistryAddress",
          description: "Address of Feed Registry",
        },
        {
          name: "feedRegistryBaseTick",
          description: "Address or denomination of base tick in a token pair",
        },
        {
          name: "feedRegistryQuoteTick",
          description: "Address or denomination of quote tick in a token pair",
        },
      ],
    },
    [FeedRegistrySubtasks.getFeedRegistryRoundData]: {
      action: feedsActions.getFeedRegistryRoundData,
      command: camelToKebab(FeedRegistrySubtasks.getFeedRegistryRoundData),
      description: camelToFlat(FeedRegistrySubtasks.getFeedRegistryRoundData),
      args: [
        {
          name: "feedRegistryAddress",
          description: "Address of Feed Registry",
        },
        {
          name: "feedRegistryBaseTick",
          description: "Address or denomination of base tick in a token pair",
        },
        {
          name: "feedRegistryQuoteTick",
          description: "Address or denomination of quote tick in a token pair",
        },
        {
          name: "roundId",
          description: "Data Feed Round ID",
        },
      ],
    },
    [FeedRegistrySubtasks.getRoundFeed]: {
      action: feedsActions.getRoundFeed,
      command: camelToKebab(FeedRegistrySubtasks.getRoundFeed),
      description: camelToFlat(FeedRegistrySubtasks.getRoundFeed),
      args: [
        {
          name: "feedRegistryAddress",
          description: "Address of Feed Registry",
        },
        {
          name: "feedRegistryBaseTick",
          description: "Address or denomination of base tick in a token pair",
        },
        {
          name: "feedRegistryQuoteTick",
          description: "Address or denomination of quote tick in a token pair",
        },
        {
          name: "roundId",
          description: "Data Feed Round ID",
        },
      ],
    },
    [FeedRegistrySubtasks.getPhase]: {
      action: feedsActions.getPhase,
      command: camelToKebab(FeedRegistrySubtasks.getPhase),
      description: camelToFlat(FeedRegistrySubtasks.getPhase),
      args: [
        {
          name: "feedRegistryAddress",
          description: "Address of Feed Registry",
        },
        {
          name: "feedRegistryBaseTick",
          description: "Address or denomination of base tick in a token pair",
        },
        {
          name: "feedRegistryQuoteTick",
          description: "Address or denomination of quote tick in a token pair",
        },
        {
          name: "phaseId",
          description: "Feed Registry Phase ID",
        },
      ],
    },
    [FeedRegistrySubtasks.getPhaseFeed]: {
      action: feedsActions.getPhaseFeed,
      command: camelToKebab(FeedRegistrySubtasks.getPhaseFeed),
      description: camelToFlat(FeedRegistrySubtasks.getPhaseFeed),
      args: [
        {
          name: "feedRegistryAddress",
          description: "Address of Feed Registry",
        },
        {
          name: "feedRegistryBaseTick",
          description: "Address or denomination of base tick in a token pair",
        },
        {
          name: "feedRegistryQuoteTick",
          description: "Address or denomination of quote tick in a token pair",
        },
        {
          name: "phaseId",
          description: "Feed Registry Phase ID",
        },
      ],
    },
    [FeedRegistrySubtasks.getPhaseRange]: {
      action: feedsActions.getPhaseRange,
      command: camelToKebab(FeedRegistrySubtasks.getPhaseRange),
      description: camelToFlat(FeedRegistrySubtasks.getPhaseRange),
      args: [
        {
          name: "feedRegistryAddress",
          description: "Address of Feed Registry",
        },
        {
          name: "feedRegistryBaseTick",
          description: "Address or denomination of base tick in a token pair",
        },
        {
          name: "feedRegistryQuoteTick",
          description: "Address or denomination of quote tick in a token pair",
        },
        {
          name: "phaseId",
          description: "Feed Registry Phase ID",
        },
      ],
    },
    [FeedRegistrySubtasks.getCurrentPhaseId]: {
      action: feedsActions.getCurrentPhaseId,
      command: camelToKebab(FeedRegistrySubtasks.getCurrentPhaseId),
      description: camelToFlat(FeedRegistrySubtasks.getCurrentPhaseId),
      args: [
        {
          name: "feedRegistryAddress",
          description: "Address of Feed Registry",
        },
        {
          name: "feedRegistryBaseTick",
          description: "Address or denomination of base tick in a token pair",
        },
        {
          name: "feedRegistryQuoteTick",
          description: "Address or denomination of quote tick in a token pair",
        },
        {
          name: "phaseId",
          description: "Feed Registry Phase ID",
        },
      ],
    },
    [FeedRegistrySubtasks.getPreviousRoundId]: {
      action: feedsActions.getPreviousRoundId,
      command: camelToKebab(FeedRegistrySubtasks.getPreviousRoundId),
      description: camelToFlat(FeedRegistrySubtasks.getPreviousRoundId),
      args: [
        {
          name: "feedRegistryAddress",
          description: "Address of Feed Registry",
        },
        {
          name: "feedRegistryBaseTick",
          description: "Address or denomination of base tick in a token pair",
        },
        {
          name: "feedRegistryQuoteTick",
          description: "Address or denomination of quote tick in a token pair",
        },
        {
          name: "roundId",
          description: "Data Feed Round ID",
        },
      ],
    },
    [FeedRegistrySubtasks.getNextRoundId]: {
      action: feedsActions.getNextRoundId,
      command: camelToKebab(FeedRegistrySubtasks.getNextRoundId),
      description: camelToFlat(FeedRegistrySubtasks.getNextRoundId),
      args: [
        {
          name: "feedRegistryAddress",
          description: "Address of Feed Registry",
        },
        {
          name: "feedRegistryBaseTick",
          description: "Address or denomination of base tick in a token pair",
        },
        {
          name: "feedRegistryQuoteTick",
          description: "Address or denomination of quote tick in a token pair",
        },
        {
          name: "roundId",
          description: "Data Feed Round ID",
        },
      ],
    },
  },
  [Task.ens]: {
    [ensFeedsResolverSubtasks.resolveAggregatorAddress]: {
      action: feedsActions.resolveAggregatorAddress,
      command: camelToKebab(ensFeedsResolverSubtasks.resolveAggregatorAddress),
      description: camelToFlat(
        ensFeedsResolverSubtasks.resolveAggregatorAddress
      ),
      args: [
        {
          name: "baseTick",
          description: "Base tick of token pair",
        },
        {
          name: "quoteTick",
          description: "Quote tick of token pair",
        },
      ],
    },
    [ensFeedsResolverSubtasks.resolveAggregatorAddressWithSubdomains]: {
      action: feedsActions.resolveAggregatorAddressWithSubdomains,
      command: camelToKebab(
        ensFeedsResolverSubtasks.resolveAggregatorAddressWithSubdomains
      ),
      description: camelToFlat(
        ensFeedsResolverSubtasks.resolveAggregatorAddressWithSubdomains
      ),
      args: [
        {
          name: "baseTick",
          description: "Base tick of token pair",
        },
        {
          name: "quoteTick",
          description: "Quote tick of token pair",
        },
      ],
    },
  },
  [Task.l2Sequencer]: {
    [L2SequencerSubtasks.isL2SequencerUp]: {
      action: feedsActions.isL2SequencerUp,
      command: camelToKebab(L2SequencerSubtasks.isL2SequencerUp),
      description: camelToFlat(L2SequencerSubtasks.isL2SequencerUp),
      args: [
        {
          name: "l2SequencerAddress",
          description: "Address of Layer 2 Sequencer Uptime Status Feed",
        },
      ],
    },
    [L2SequencerSubtasks.getTimeSinceL2SequencerIsUp]: {
      action: feedsActions.getTimeSinceL2SequencerIsUp,
      command: camelToKebab(L2SequencerSubtasks.getTimeSinceL2SequencerIsUp),
      description: camelToFlat(L2SequencerSubtasks.getTimeSinceL2SequencerIsUp),
      args: [
        {
          name: "l2SequencerAddress",
          description: "Address of Layer 2 Sequencer Uptime Status Feed",
        },
        {
          name: "gracePeriodTime",
          description: "Grace period for a Sequencer to be up",
        },
      ],
    },
  },
  [Task.vrf]: {
    [VRFSubtasks.createSubscription]: {
      action: vrfActions.createSubscription,
      command: camelToKebab(VRFSubtasks.createSubscription),
      description: camelToFlat(VRFSubtasks.createSubscription),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtasks.fundSubscription]: {
      action: vrfActions.fundSubscription,
      command: camelToKebab(VRFSubtasks.fundSubscription),
      description: camelToFlat(VRFSubtasks.fundSubscription),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
        {
          name: "linkTokenAddress",
          description: "Address of Link Token",
        },
        {
          name: "amountInJuels",
          description: "Amount of LINKs to be sent (in Juels)",
        },
        {
          name: "subscriptionId",
          description: "VRF Subscription ID",
        },
      ],
    },
    [VRFSubtasks.cancelSubscription]: {
      action: vrfActions.cancelSubscription,
      command: camelToKebab(VRFSubtasks.cancelSubscription),
      description: camelToFlat(VRFSubtasks.cancelSubscription),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
        {
          name: "subscriptionId",
          description: "VRF Subscription ID",
        },
        {
          name: "receivingAddress",
          description: "Address to receive the balance of Subscription",
        },
      ],
    },
    [VRFSubtasks.addConsumer]: {
      action: vrfActions.addConsumer,
      command: camelToKebab(VRFSubtasks.addConsumer),
      description: camelToFlat(VRFSubtasks.addConsumer),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
        {
          name: "consumerAddress",
          description: "Address of Consumer",
        },
        {
          name: "subscriptionId",
          description: "VRF Subscription ID",
        },
      ],
    },
    [VRFSubtasks.removeConsumer]: {
      action: vrfActions.removeConsumer,
      command: camelToKebab(VRFSubtasks.removeConsumer),
      description: camelToFlat(VRFSubtasks.removeConsumer),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
        {
          name: "consumerAddress",
          description: "Address of Consumer",
        },
        {
          name: "subscriptionId",
          description: "VRF Subscription ID",
        },
      ],
    },
    [VRFSubtasks.getSubscriptionDetails]: {
      action: vrfActions.getSubscriptionDetails,
      command: camelToKebab(VRFSubtasks.getSubscriptionDetails),
      description: camelToFlat(VRFSubtasks.getSubscriptionDetails),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
        {
          name: "subscriptionId",
          description: "VRF Subscription ID",
        },
      ],
    },
    [VRFSubtasks.isPendingRequestExists]: {
      action: vrfActions.isPendingRequestExists,
      command: camelToKebab(VRFSubtasks.isPendingRequestExists),
      description: camelToFlat(VRFSubtasks.isPendingRequestExists),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
        {
          name: "subscriptionId",
          description: "VRF Subscription ID",
        },
      ],
    },
    [VRFSubtasks.requestSubscriptionOwnerTransfer]: {
      action: vrfActions.requestSubscriptionOwnerTransfer,
      command: camelToKebab(VRFSubtasks.requestSubscriptionOwnerTransfer),
      description: camelToFlat(VRFSubtasks.requestSubscriptionOwnerTransfer),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
        {
          name: "subscriptionId",
          description: "VRF Subscription ID",
        },
        {
          name: "newOwnerAddress",
          description: "Address of new Subscription owner",
        },
      ],
    },
    [VRFSubtasks.acceptSubscriptionOwnerTransfer]: {
      action: vrfActions.acceptSubscriptionOwnerTransfer,
      command: camelToKebab(VRFSubtasks.acceptSubscriptionOwnerTransfer),
      description: camelToFlat(VRFSubtasks.acceptSubscriptionOwnerTransfer),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
        {
          name: "subscriptionId",
          description: "VRF Subscription ID",
        },
      ],
    },
    [VRFSubtasks.getMaxConsumers]: {
      action: vrfActions.getMaxConsumers,
      command: camelToKebab(VRFSubtasks.getMaxConsumers),
      description: camelToFlat(VRFSubtasks.getMaxConsumers),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtasks.getMaxNumberOfWords]: {
      action: vrfActions.getMaxNumberOfWords,
      command: camelToKebab(VRFSubtasks.getMaxNumberOfWords),
      description: camelToFlat(VRFSubtasks.getMaxNumberOfWords),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtasks.getMaxRequestConfirmations]: {
      action: vrfActions.getMaxRequestConfirmations,
      command: camelToKebab(VRFSubtasks.getMaxRequestConfirmations),
      description: camelToFlat(VRFSubtasks.getMaxRequestConfirmations),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtasks.getMinRequestConfirmations]: {
      action: vrfActions.getMinRequestConfirmations,
      command: camelToKebab(VRFSubtasks.getMinRequestConfirmations),
      description: camelToFlat(VRFSubtasks.getMinRequestConfirmations),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtasks.getMaxRequestGasLimit]: {
      action: vrfActions.getMaxRequestGasLimit,
      command: camelToKebab(VRFSubtasks.getMaxRequestGasLimit),
      description: camelToFlat(VRFSubtasks.getMaxRequestGasLimit),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtasks.getCommitment]: {
      action: vrfActions.getCommitment,
      command: camelToKebab(VRFSubtasks.getCommitment),
      description: camelToFlat(VRFSubtasks.getCommitment),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
        {
          name: "requestId",
          description: "Request ID",
        },
      ],
    },
    [VRFSubtasks.getCoordinatorConfig]: {
      action: vrfActions.getCoordinatorConfig,
      command: camelToKebab(VRFSubtasks.getCoordinatorConfig),
      description: camelToFlat(VRFSubtasks.getCoordinatorConfig),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtasks.getCoordinatorTypeAndVersion]: {
      action: vrfActions.getCoordinatorTypeAndVersion,
      command: camelToKebab(VRFSubtasks.getCoordinatorTypeAndVersion),
      description: camelToFlat(VRFSubtasks.getCoordinatorTypeAndVersion),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
  },
  [Task.automation]: {
    [AutomationSubtasks.registerUpkeep]: {
      action: automationActions.registerUpkeep,
      command: camelToKebab(AutomationSubtasks.registerUpkeep),
      description: camelToFlat(AutomationSubtasks.registerUpkeep),
      args: [
        {
          name: "linkTokenAddress",
          description: "Address of Link Token",
        },
        {
          name: "keepersRegistrarAddress",
          description: "Address of Keeper Registrar",
        },
        {
          name: "amountInJuels",
          description: "Amount of LINK in juels to fund upkeep",
        },
        {
          name: "upkeepName",
          description: "Upkeep name to be registered",
        },
        {
          name: "encryptedEmail",
          description: "Encrypted email address of upkeep contact",
        },
        {
          name: "upkeepContract",
          description: "Upkeep contract address to perform upkeep on",
        },
        {
          name: "gasLimit",
          description:
            "Amount of gas to provide the target contract when performing upkeep",
        },
        {
          name: "adminAddress",
          description: "Address to cancel upkeep and withdraw remaining funds",
        },
        {
          name: "checkData",
          description: "Data passed to the contract when checking for upkeep",
        },
        {
          name: "source",
          description: "ID of the application sending this request",
        },
        {
          name: "sender",
          description: "Address of the sender making the request",
        },
      ],
    },
    [AutomationSubtasks.getPendingRegistrationRequest]: {
      action: automationActions.getPendingRegistrationRequest,
      command: camelToKebab(AutomationSubtasks.getPendingRegistrationRequest),
      description: camelToFlat(
        AutomationSubtasks.getPendingRegistrationRequest
      ),
      args: [
        {
          name: "keepersRegistrarAddress",
          description: "Address of Keeper Registrar",
        },
        {
          name: "requestHash",
          description: "Hash of registration request",
        },
      ],
    },
    [AutomationSubtasks.cancelPendingRegistrationRequest]: {
      action: automationActions.cancelPendingRegistrationRequest,
      command: camelToKebab(
        AutomationSubtasks.cancelPendingRegistrationRequest
      ),
      description: camelToFlat(
        AutomationSubtasks.cancelPendingRegistrationRequest
      ),
      args: [
        {
          name: "keepersRegistrarAddress",
          description: "Address of Keeper Registrar",
        },
        {
          name: "requestHash",
          description: "Hash of registration request",
        },
      ],
    },
    [AutomationSubtasks.getKeeperRegistrarConfig]: {
      action: automationActions.getKeeperRegistrarConfig,
      command: camelToKebab(AutomationSubtasks.getKeeperRegistrarConfig),
      description: camelToFlat(AutomationSubtasks.getKeeperRegistrarConfig),
      args: [
        {
          name: "keepersRegistrarAddress",
          description: "Address of Keeper Registrar",
        },
      ],
    },
    [AutomationSubtasks.getKeepersRegistrarTypeAndVersion]: {
      action: automationActions.getKeepersRegistrarTypeAndVersion,
      command: camelToKebab(
        AutomationSubtasks.getKeepersRegistrarTypeAndVersion
      ),
      description: camelToFlat(
        AutomationSubtasks.getKeepersRegistrarTypeAndVersion
      ),
      args: [
        {
          name: "keepersRegistrarAddress",
          description: "Address of Keeper Registrar",
        },
      ],
    },
    [AutomationSubtasks.fundUpkeep]: {
      action: automationActions.fundUpkeep,
      command: camelToKebab(AutomationSubtasks.fundUpkeep),
      description: camelToFlat(AutomationSubtasks.fundUpkeep),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "upkeepId",
          description: "Upkeep ID",
        },
        {
          name: "amountInJuels",
          description: "Amount of LINK in Juels to fund Upkeep",
        },
      ],
    },
    [AutomationSubtasks.checkUpkeep]: {
      action: automationActions.checkUpkeep,
      command: camelToKebab(AutomationSubtasks.checkUpkeep),
      description: camelToFlat(AutomationSubtasks.checkUpkeep),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "upkeepId",
          description: "Upkeep ID",
        },
        {
          name: "fromAddress",
          description: "Address to perform check",
        },
      ],
    },
    [AutomationSubtasks.cancelUpkeep]: {
      action: automationActions.cancelUpkeep,
      command: camelToKebab(AutomationSubtasks.cancelUpkeep),
      description: camelToFlat(AutomationSubtasks.cancelUpkeep),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "upkeepId",
          description: "Upkeep ID",
        },
      ],
    },
    [AutomationSubtasks.withdrawFunds]: {
      action: automationActions.withdrawFunds,
      command: camelToKebab(AutomationSubtasks.withdrawFunds),
      description: camelToFlat(AutomationSubtasks.withdrawFunds),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "upkeepId",
          description: "Upkeep ID",
        },
        {
          name: "receivingAddress",
          description: "Address to withdraw funds",
        },
      ],
    },
    [AutomationSubtasks.getActiveUpkeepIDs]: {
      action: automationActions.getActiveUpkeepIDs,
      command: camelToKebab(AutomationSubtasks.getActiveUpkeepIDs),
      description: camelToFlat(AutomationSubtasks.getActiveUpkeepIDs),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "startIndex",
          description: "Starting index of Upkeeps to get",
        },
        {
          name: "maxCount",
          description: "Quantity of Upkeeps to get",
        },
      ],
    },
    [AutomationSubtasks.getUpkeep]: {
      action: automationActions.getUpkeep,
      command: camelToKebab(AutomationSubtasks.getUpkeep),
      description: camelToFlat(AutomationSubtasks.getUpkeep),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "upkeepId",
          description: "Upkeep ID",
        },
      ],
    },
    [AutomationSubtasks.migrateUpkeeps]: {
      action: automationActions.migrateUpkeeps,
      command: camelToKebab(AutomationSubtasks.migrateUpkeeps),
      description: camelToFlat(AutomationSubtasks.migrateUpkeeps),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "upkeepIds",
          description: "Upkeep IDs to migrate",
        },
        {
          name: "destination",
          description: "Migration destination",
        },
      ],
    },
    [AutomationSubtasks.receiveUpkeeps]: {
      action: automationActions.receiveUpkeeps,
      command: camelToKebab(AutomationSubtasks.receiveUpkeeps),
      description: camelToFlat(AutomationSubtasks.receiveUpkeeps),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "encodedUpkeeps",
          description: "Encoded Upkeeps to receive",
        },
      ],
    },
    [AutomationSubtasks.withdrawKeeperPayment]: {
      action: automationActions.withdrawKeeperPayment,
      command: camelToKebab(AutomationSubtasks.withdrawKeeperPayment),
      description: camelToFlat(AutomationSubtasks.withdrawKeeperPayment),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "fromAddress",
          description: "Address to withdraw",
        },
        {
          name: "toAddress",
          description: "Address to fund",
        },
      ],
    },
    [AutomationSubtasks.transferKeeperPayeeship]: {
      action: automationActions.transferKeeperPayeeship,
      command: camelToKebab(AutomationSubtasks.transferKeeperPayeeship),
      description: camelToFlat(AutomationSubtasks.transferKeeperPayeeship),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "keeper",
          description: "Keeper address",
        },
        {
          name: "proposed",
          description: "Proposed Payee",
        },
      ],
    },
    [AutomationSubtasks.acceptKeeperPayeeship]: {
      action: automationActions.acceptKeeperPayeeship,
      command: camelToKebab(AutomationSubtasks.acceptKeeperPayeeship),
      description: camelToFlat(AutomationSubtasks.acceptKeeperPayeeship),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "keeper",
          description: "Keeper address",
        },
      ],
    },
    [AutomationSubtasks.getKeeperInfo]: {
      action: automationActions.getKeeperInfo,
      command: camelToKebab(AutomationSubtasks.getKeeperInfo),
      description: camelToFlat(AutomationSubtasks.getKeeperInfo),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "query",
          description: "Keeper info to get",
        },
      ],
    },
    [AutomationSubtasks.getMaxPaymentForGas]: {
      action: automationActions.getMaxPaymentForGas,
      command: camelToKebab(AutomationSubtasks.getMaxPaymentForGas),
      description: camelToFlat(AutomationSubtasks.getMaxPaymentForGas),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "gasLimit",
          description: "Gas limit",
        },
      ],
    },
    [AutomationSubtasks.getMinBalanceForUpkeep]: {
      action: automationActions.getMinBalanceForUpkeep,
      command: camelToKebab(AutomationSubtasks.getMinBalanceForUpkeep),
      description: camelToFlat(AutomationSubtasks.getMinBalanceForUpkeep),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "upkeepId",
          description: "Upkeep ID",
        },
      ],
    },
    [AutomationSubtasks.getKeeperRegistryState]: {
      action: automationActions.getKeeperRegistryState,
      command: camelToKebab(AutomationSubtasks.getKeeperRegistryState),
      description: camelToFlat(AutomationSubtasks.getKeeperRegistryState),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
      ],
    },
    [AutomationSubtasks.isKeeperRegistryPaused]: {
      action: automationActions.isKeeperRegistryPaused,
      command: camelToKebab(AutomationSubtasks.isKeeperRegistryPaused),
      description: camelToFlat(AutomationSubtasks.isKeeperRegistryPaused),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
      ],
    },
    [AutomationSubtasks.getKeeperRegistryTypeAndVersion]: {
      action: automationActions.getKeeperRegistryTypeAndVersion,
      command: camelToKebab(AutomationSubtasks.getKeeperRegistryTypeAndVersion),
      description: camelToFlat(
        AutomationSubtasks.getKeeperRegistryTypeAndVersion
      ),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
      ],
    },
    [AutomationSubtasks.getKeeperRegistryUpkeepTranscoderVersion]: {
      action: automationActions.getKeeperRegistryUpkeepTranscoderVersion,
      command: camelToKebab(
        AutomationSubtasks.getKeeperRegistryUpkeepTranscoderVersion
      ),
      description: camelToFlat(
        AutomationSubtasks.getKeeperRegistryUpkeepTranscoderVersion
      ),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
      ],
    },
  },
  [Task.functions]: {},
  [Task.sandbox]: {},
  [Task.registries]: {
    [PluginRegistriesSubtasks.getDataFeedAddress]: {
      action: registriesActions.getDataFeedAddress,
      command: camelToKebab(PluginRegistriesSubtasks.getDataFeedAddress),
      description: camelToFlat(PluginRegistriesSubtasks.getDataFeedAddress),
      args: [],
    },
    [PluginRegistriesSubtasks.getFeedRegistryAddress]: {
      action: registriesActions.getFeedRegistryAddress,
      command: camelToKebab(PluginRegistriesSubtasks.getFeedRegistryAddress),
      description: camelToFlat(PluginRegistriesSubtasks.getFeedRegistryAddress),
      args: [],
    },
    [PluginRegistriesSubtasks.getVRFCoordinatorAddress]: {
      action: registriesActions.getVRFCoordinatorAddress,
      command: camelToKebab(PluginRegistriesSubtasks.getVRFCoordinatorAddress),
      description: camelToFlat(
        PluginRegistriesSubtasks.getVRFCoordinatorAddress
      ),
      args: [],
    },
    [PluginRegistriesSubtasks.getLinkTokenAddress]: {
      action: registriesActions.getLinkTokenAddress,
      command: camelToKebab(PluginRegistriesSubtasks.getLinkTokenAddress),
      description: camelToFlat(PluginRegistriesSubtasks.getLinkTokenAddress),
      args: [],
    },
    [PluginRegistriesSubtasks.getKeeperRegistryAddress]: {
      action: registriesActions.getKeeperRegistryAddress,
      command: camelToKebab(PluginRegistriesSubtasks.getKeeperRegistryAddress),
      description: camelToFlat(
        PluginRegistriesSubtasks.getKeeperRegistryAddress
      ),
      args: [],
    },
    [PluginRegistriesSubtasks.getKeeperRegistrarAddress]: {
      action: registriesActions.getKeeperRegistrarAddress,
      command: camelToKebab(PluginRegistriesSubtasks.getKeeperRegistrarAddress),
      description: camelToFlat(
        PluginRegistriesSubtasks.getKeeperRegistrarAddress
      ),
      args: [],
    },
    [PluginRegistriesSubtasks.getL2SequencerAddress]: {
      action: registriesActions.getL2SequencerAddress,
      command: camelToKebab(PluginRegistriesSubtasks.getL2SequencerAddress),
      description: camelToFlat(PluginRegistriesSubtasks.getL2SequencerAddress),
      args: [],
    },
    [PluginRegistriesSubtasks.getFunctionOracleAddress]: {
      action: registriesActions.getFunctionOracleAddress,
      command: camelToKebab(PluginRegistriesSubtasks.getFunctionOracleAddress),
      description: camelToFlat(
        PluginRegistriesSubtasks.getFunctionOracleAddress
      ),
      args: [],
    },
    [PluginRegistriesSubtasks.getDenomination]: {
      action: registriesActions.getDenomination,
      command: camelToKebab(PluginRegistriesSubtasks.getDenomination),
      description: camelToFlat(PluginRegistriesSubtasks.getDenomination),
      args: [],
    },
  },
};
