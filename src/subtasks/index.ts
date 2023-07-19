import { camelToFlat, camelToKebab } from "../helpers/utils";
import {
  AutomationSubtask,
  DataFeedSubtask,
  ensFeedsResolverSubtask,
  FeedRegistrySubtask,
  L2SequencerSubtask,
  PluginRegistriesSubtask,
  Task,
  VRFSubtask,
} from "../shared/enums";
import { Subtasks } from "../shared/types";
import * as automationActions from "../tasks/automation";
import * as feedsActions from "../tasks/feeds";
import * as registriesActions from "../tasks/registries";
import * as vrfActions from "../tasks/vrf";

export const subtasks: Subtasks = {
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
    [FeedRegistrySubtask.getFeed]: {
      action: feedsActions.getFeed,
      command: camelToKebab(FeedRegistrySubtask.getFeed),
      description: camelToFlat(FeedRegistrySubtask.getFeed),
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
    [FeedRegistrySubtask.isFeedEnabled]: {
      action: feedsActions.isFeedEnabled,
      command: camelToKebab(FeedRegistrySubtask.isFeedEnabled),
      description: camelToFlat(FeedRegistrySubtask.isFeedEnabled),
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
    [FeedRegistrySubtask.getFeedRegistryDecimals]: {
      action: feedsActions.getFeedRegistryDecimals,
      command: camelToKebab(FeedRegistrySubtask.getFeedRegistryDecimals),
      description: camelToFlat(FeedRegistrySubtask.getFeedRegistryDecimals),
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
    [FeedRegistrySubtask.getFeedRegistryDescription]: {
      action: feedsActions.getFeedRegistryDescription,
      command: camelToKebab(FeedRegistrySubtask.getFeedRegistryDescription),
      description: camelToFlat(FeedRegistrySubtask.getFeedRegistryDescription),
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
    [FeedRegistrySubtask.getFeedRegistryAggregatorVersion]: {
      action: feedsActions.getFeedRegistryAggregatorVersion,
      command: camelToKebab(
        FeedRegistrySubtask.getFeedRegistryAggregatorVersion
      ),
      description: camelToFlat(
        FeedRegistrySubtask.getFeedRegistryAggregatorVersion
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
    [FeedRegistrySubtask.getFeedRegistryLatestRoundData]: {
      action: feedsActions.getFeedRegistryLatestRoundData,
      command: camelToKebab(FeedRegistrySubtask.getFeedRegistryLatestRoundData),
      description: camelToFlat(
        FeedRegistrySubtask.getFeedRegistryLatestRoundData
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
    [FeedRegistrySubtask.getFeedRegistryRoundData]: {
      action: feedsActions.getFeedRegistryRoundData,
      command: camelToKebab(FeedRegistrySubtask.getFeedRegistryRoundData),
      description: camelToFlat(FeedRegistrySubtask.getFeedRegistryRoundData),
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
    [FeedRegistrySubtask.getRoundFeed]: {
      action: feedsActions.getRoundFeed,
      command: camelToKebab(FeedRegistrySubtask.getRoundFeed),
      description: camelToFlat(FeedRegistrySubtask.getRoundFeed),
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
    [FeedRegistrySubtask.getPhase]: {
      action: feedsActions.getPhase,
      command: camelToKebab(FeedRegistrySubtask.getPhase),
      description: camelToFlat(FeedRegistrySubtask.getPhase),
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
    [FeedRegistrySubtask.getPhaseFeed]: {
      action: feedsActions.getPhaseFeed,
      command: camelToKebab(FeedRegistrySubtask.getPhaseFeed),
      description: camelToFlat(FeedRegistrySubtask.getPhaseFeed),
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
    [FeedRegistrySubtask.getPhaseRange]: {
      action: feedsActions.getPhaseRange,
      command: camelToKebab(FeedRegistrySubtask.getPhaseRange),
      description: camelToFlat(FeedRegistrySubtask.getPhaseRange),
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
    [FeedRegistrySubtask.getCurrentPhaseId]: {
      action: feedsActions.getCurrentPhaseId,
      command: camelToKebab(FeedRegistrySubtask.getCurrentPhaseId),
      description: camelToFlat(FeedRegistrySubtask.getCurrentPhaseId),
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
    [FeedRegistrySubtask.getPreviousRoundId]: {
      action: feedsActions.getPreviousRoundId,
      command: camelToKebab(FeedRegistrySubtask.getPreviousRoundId),
      description: camelToFlat(FeedRegistrySubtask.getPreviousRoundId),
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
    [FeedRegistrySubtask.getNextRoundId]: {
      action: feedsActions.getNextRoundId,
      command: camelToKebab(FeedRegistrySubtask.getNextRoundId),
      description: camelToFlat(FeedRegistrySubtask.getNextRoundId),
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
    [ensFeedsResolverSubtask.resolveAggregatorAddress]: {
      action: feedsActions.resolveAggregatorAddress,
      command: camelToKebab(ensFeedsResolverSubtask.resolveAggregatorAddress),
      description: camelToFlat(
        ensFeedsResolverSubtask.resolveAggregatorAddress
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
    [ensFeedsResolverSubtask.resolveAggregatorAddressWithSubdomains]: {
      action: feedsActions.resolveAggregatorAddressWithSubdomains,
      command: camelToKebab(
        ensFeedsResolverSubtask.resolveAggregatorAddressWithSubdomains
      ),
      description: camelToFlat(
        ensFeedsResolverSubtask.resolveAggregatorAddressWithSubdomains
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
    [L2SequencerSubtask.isL2SequencerUp]: {
      action: feedsActions.isL2SequencerUp,
      command: camelToKebab(L2SequencerSubtask.isL2SequencerUp),
      description: camelToFlat(L2SequencerSubtask.isL2SequencerUp),
      args: [
        {
          name: "l2SequencerAddress",
          description: "Address of Layer 2 Sequencer Uptime Status Feed",
        },
      ],
    },
    [L2SequencerSubtask.getTimeSinceL2SequencerIsUp]: {
      action: feedsActions.getTimeSinceL2SequencerIsUp,
      command: camelToKebab(L2SequencerSubtask.getTimeSinceL2SequencerIsUp),
      description: camelToFlat(L2SequencerSubtask.getTimeSinceL2SequencerIsUp),
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
    [VRFSubtask.createSubscription]: {
      action: vrfActions.createSubscription,
      command: camelToKebab(VRFSubtask.createSubscription),
      description: camelToFlat(VRFSubtask.createSubscription),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtask.fundSubscription]: {
      action: vrfActions.fundSubscription,
      command: camelToKebab(VRFSubtask.fundSubscription),
      description: camelToFlat(VRFSubtask.fundSubscription),
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
    [VRFSubtask.cancelSubscription]: {
      action: vrfActions.cancelSubscription,
      command: camelToKebab(VRFSubtask.cancelSubscription),
      description: camelToFlat(VRFSubtask.cancelSubscription),
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
    [VRFSubtask.addConsumer]: {
      action: vrfActions.addConsumer,
      command: camelToKebab(VRFSubtask.addConsumer),
      description: camelToFlat(VRFSubtask.addConsumer),
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
    [VRFSubtask.removeConsumer]: {
      action: vrfActions.removeConsumer,
      command: camelToKebab(VRFSubtask.removeConsumer),
      description: camelToFlat(VRFSubtask.removeConsumer),
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
    [VRFSubtask.getSubscriptionDetails]: {
      action: vrfActions.getSubscriptionDetails,
      command: camelToKebab(VRFSubtask.getSubscriptionDetails),
      description: camelToFlat(VRFSubtask.getSubscriptionDetails),
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
    [VRFSubtask.isPendingRequestExists]: {
      action: vrfActions.isPendingRequestExists,
      command: camelToKebab(VRFSubtask.isPendingRequestExists),
      description: camelToFlat(VRFSubtask.isPendingRequestExists),
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
    [VRFSubtask.requestSubscriptionOwnerTransfer]: {
      action: vrfActions.requestSubscriptionOwnerTransfer,
      command: camelToKebab(VRFSubtask.requestSubscriptionOwnerTransfer),
      description: camelToFlat(VRFSubtask.requestSubscriptionOwnerTransfer),
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
    [VRFSubtask.acceptSubscriptionOwnerTransfer]: {
      action: vrfActions.acceptSubscriptionOwnerTransfer,
      command: camelToKebab(VRFSubtask.acceptSubscriptionOwnerTransfer),
      description: camelToFlat(VRFSubtask.acceptSubscriptionOwnerTransfer),
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
    [VRFSubtask.getMaxConsumers]: {
      action: vrfActions.getMaxConsumers,
      command: camelToKebab(VRFSubtask.getMaxConsumers),
      description: camelToFlat(VRFSubtask.getMaxConsumers),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtask.getMaxNumberOfWords]: {
      action: vrfActions.getMaxNumberOfWords,
      command: camelToKebab(VRFSubtask.getMaxNumberOfWords),
      description: camelToFlat(VRFSubtask.getMaxNumberOfWords),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtask.getMaxRequestConfirmations]: {
      action: vrfActions.getMaxRequestConfirmations,
      command: camelToKebab(VRFSubtask.getMaxRequestConfirmations),
      description: camelToFlat(VRFSubtask.getMaxRequestConfirmations),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtask.getMinRequestConfirmations]: {
      action: vrfActions.getMinRequestConfirmations,
      command: camelToKebab(VRFSubtask.getMinRequestConfirmations),
      description: camelToFlat(VRFSubtask.getMinRequestConfirmations),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtask.getMaxRequestGasLimit]: {
      action: vrfActions.getMaxRequestGasLimit,
      command: camelToKebab(VRFSubtask.getMaxRequestGasLimit),
      description: camelToFlat(VRFSubtask.getMaxRequestGasLimit),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtask.getCommitment]: {
      action: vrfActions.getCommitment,
      command: camelToKebab(VRFSubtask.getCommitment),
      description: camelToFlat(VRFSubtask.getCommitment),
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
    [VRFSubtask.getCoordinatorConfig]: {
      action: vrfActions.getCoordinatorConfig,
      command: camelToKebab(VRFSubtask.getCoordinatorConfig),
      description: camelToFlat(VRFSubtask.getCoordinatorConfig),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtask.getCoordinatorTypeAndVersion]: {
      action: vrfActions.getCoordinatorTypeAndVersion,
      command: camelToKebab(VRFSubtask.getCoordinatorTypeAndVersion),
      description: camelToFlat(VRFSubtask.getCoordinatorTypeAndVersion),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
  },
  [Task.automation]: {
    [AutomationSubtask.registerUpkeep]: {
      action: automationActions.registerUpkeep,
      command: camelToKebab(AutomationSubtask.registerUpkeep),
      description: camelToFlat(AutomationSubtask.registerUpkeep),
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
    [AutomationSubtask.getPendingRegistrationRequest]: {
      action: automationActions.getPendingRegistrationRequest,
      command: camelToKebab(AutomationSubtask.getPendingRegistrationRequest),
      description: camelToFlat(AutomationSubtask.getPendingRegistrationRequest),
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
    [AutomationSubtask.cancelPendingRegistrationRequest]: {
      action: automationActions.cancelPendingRegistrationRequest,
      command: camelToKebab(AutomationSubtask.cancelPendingRegistrationRequest),
      description: camelToFlat(
        AutomationSubtask.cancelPendingRegistrationRequest
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
    [AutomationSubtask.getKeeperRegistrarConfig]: {
      action: automationActions.getKeeperRegistrarConfig,
      command: camelToKebab(AutomationSubtask.getKeeperRegistrarConfig),
      description: camelToFlat(AutomationSubtask.getKeeperRegistrarConfig),
      args: [
        {
          name: "keepersRegistrarAddress",
          description: "Address of Keeper Registrar",
        },
      ],
    },
    [AutomationSubtask.getKeepersRegistrarTypeAndVersion]: {
      action: automationActions.getKeepersRegistrarTypeAndVersion,
      command: camelToKebab(
        AutomationSubtask.getKeepersRegistrarTypeAndVersion
      ),
      description: camelToFlat(
        AutomationSubtask.getKeepersRegistrarTypeAndVersion
      ),
      args: [
        {
          name: "keepersRegistrarAddress",
          description: "Address of Keeper Registrar",
        },
      ],
    },
    [AutomationSubtask.fundUpkeep]: {
      action: automationActions.fundUpkeep,
      command: camelToKebab(AutomationSubtask.fundUpkeep),
      description: camelToFlat(AutomationSubtask.fundUpkeep),
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
    [AutomationSubtask.checkUpkeep]: {
      action: automationActions.checkUpkeep,
      command: camelToKebab(AutomationSubtask.checkUpkeep),
      description: camelToFlat(AutomationSubtask.checkUpkeep),
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
    [AutomationSubtask.cancelUpkeep]: {
      action: automationActions.cancelUpkeep,
      command: camelToKebab(AutomationSubtask.cancelUpkeep),
      description: camelToFlat(AutomationSubtask.cancelUpkeep),
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
    [AutomationSubtask.withdrawFunds]: {
      action: automationActions.withdrawFunds,
      command: camelToKebab(AutomationSubtask.withdrawFunds),
      description: camelToFlat(AutomationSubtask.withdrawFunds),
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
    [AutomationSubtask.getActiveUpkeepIDs]: {
      action: automationActions.getActiveUpkeepIDs,
      command: camelToKebab(AutomationSubtask.getActiveUpkeepIDs),
      description: camelToFlat(AutomationSubtask.getActiveUpkeepIDs),
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
    [AutomationSubtask.getUpkeep]: {
      action: automationActions.getUpkeep,
      command: camelToKebab(AutomationSubtask.getUpkeep),
      description: camelToFlat(AutomationSubtask.getUpkeep),
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
    [AutomationSubtask.migrateUpkeeps]: {
      action: automationActions.migrateUpkeeps,
      command: camelToKebab(AutomationSubtask.migrateUpkeeps),
      description: camelToFlat(AutomationSubtask.migrateUpkeeps),
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
    [AutomationSubtask.receiveUpkeeps]: {
      action: automationActions.receiveUpkeeps,
      command: camelToKebab(AutomationSubtask.receiveUpkeeps),
      description: camelToFlat(AutomationSubtask.receiveUpkeeps),
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
    [AutomationSubtask.withdrawKeeperPayment]: {
      action: automationActions.withdrawKeeperPayment,
      command: camelToKebab(AutomationSubtask.withdrawKeeperPayment),
      description: camelToFlat(AutomationSubtask.withdrawKeeperPayment),
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
    [AutomationSubtask.transferKeeperPayeeship]: {
      action: automationActions.transferKeeperPayeeship,
      command: camelToKebab(AutomationSubtask.transferKeeperPayeeship),
      description: camelToFlat(AutomationSubtask.transferKeeperPayeeship),
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
    [AutomationSubtask.acceptKeeperPayeeship]: {
      action: automationActions.acceptKeeperPayeeship,
      command: camelToKebab(AutomationSubtask.acceptKeeperPayeeship),
      description: camelToFlat(AutomationSubtask.acceptKeeperPayeeship),
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
    [AutomationSubtask.getKeeperInfo]: {
      action: automationActions.getKeeperInfo,
      command: camelToKebab(AutomationSubtask.getKeeperInfo),
      description: camelToFlat(AutomationSubtask.getKeeperInfo),
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
    [AutomationSubtask.getMaxPaymentForGas]: {
      action: automationActions.getMaxPaymentForGas,
      command: camelToKebab(AutomationSubtask.getMaxPaymentForGas),
      description: camelToFlat(AutomationSubtask.getMaxPaymentForGas),
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
    [AutomationSubtask.getMinBalanceForUpkeep]: {
      action: automationActions.getMinBalanceForUpkeep,
      command: camelToKebab(AutomationSubtask.getMinBalanceForUpkeep),
      description: camelToFlat(AutomationSubtask.getMinBalanceForUpkeep),
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
    [AutomationSubtask.getKeeperRegistryState]: {
      action: automationActions.getKeeperRegistryState,
      command: camelToKebab(AutomationSubtask.getKeeperRegistryState),
      description: camelToFlat(AutomationSubtask.getKeeperRegistryState),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
      ],
    },
    [AutomationSubtask.isKeeperRegistryPaused]: {
      action: automationActions.isKeeperRegistryPaused,
      command: camelToKebab(AutomationSubtask.isKeeperRegistryPaused),
      description: camelToFlat(AutomationSubtask.isKeeperRegistryPaused),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
      ],
    },
    [AutomationSubtask.getKeeperRegistryTypeAndVersion]: {
      action: automationActions.getKeeperRegistryTypeAndVersion,
      command: camelToKebab(AutomationSubtask.getKeeperRegistryTypeAndVersion),
      description: camelToFlat(
        AutomationSubtask.getKeeperRegistryTypeAndVersion
      ),
      args: [
        {
          name: "keepersRegistryAddress",
          description: "Address of Keeper Registry",
        },
      ],
    },
    [AutomationSubtask.getKeeperRegistryUpkeepTranscoderVersion]: {
      action: automationActions.getKeeperRegistryUpkeepTranscoderVersion,
      command: camelToKebab(
        AutomationSubtask.getKeeperRegistryUpkeepTranscoderVersion
      ),
      description: camelToFlat(
        AutomationSubtask.getKeeperRegistryUpkeepTranscoderVersion
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
    [PluginRegistriesSubtask.getDataFeedAddress]: {
      action: registriesActions.getDataFeedAddress,
      command: camelToKebab(PluginRegistriesSubtask.getDataFeedAddress),
      description: camelToFlat(PluginRegistriesSubtask.getDataFeedAddress),
      args: [],
    },
    [PluginRegistriesSubtask.getFeedRegistryAddress]: {
      action: registriesActions.getFeedRegistryAddress,
      command: camelToKebab(PluginRegistriesSubtask.getFeedRegistryAddress),
      description: camelToFlat(PluginRegistriesSubtask.getFeedRegistryAddress),
      args: [],
    },
    [PluginRegistriesSubtask.getVRFCoordinatorAddress]: {
      action: registriesActions.getVRFCoordinatorAddress,
      command: camelToKebab(PluginRegistriesSubtask.getVRFCoordinatorAddress),
      description: camelToFlat(
        PluginRegistriesSubtask.getVRFCoordinatorAddress
      ),
      args: [],
    },
    [PluginRegistriesSubtask.getLinkTokenAddress]: {
      action: registriesActions.getLinkTokenAddress,
      command: camelToKebab(PluginRegistriesSubtask.getLinkTokenAddress),
      description: camelToFlat(PluginRegistriesSubtask.getLinkTokenAddress),
      args: [],
    },
    [PluginRegistriesSubtask.getKeeperRegistryAddress]: {
      action: registriesActions.getKeeperRegistryAddress,
      command: camelToKebab(PluginRegistriesSubtask.getKeeperRegistryAddress),
      description: camelToFlat(
        PluginRegistriesSubtask.getKeeperRegistryAddress
      ),
      args: [],
    },
    [PluginRegistriesSubtask.getKeeperRegistrarAddress]: {
      action: registriesActions.getKeeperRegistrarAddress,
      command: camelToKebab(PluginRegistriesSubtask.getKeeperRegistrarAddress),
      description: camelToFlat(
        PluginRegistriesSubtask.getKeeperRegistrarAddress
      ),
      args: [],
    },
    [PluginRegistriesSubtask.getL2SequencerAddress]: {
      action: registriesActions.getL2SequencerAddress,
      command: camelToKebab(PluginRegistriesSubtask.getL2SequencerAddress),
      description: camelToFlat(PluginRegistriesSubtask.getL2SequencerAddress),
      args: [],
    },
    [PluginRegistriesSubtask.getFunctionOracleAddress]: {
      action: registriesActions.getFunctionOracleAddress,
      command: camelToKebab(PluginRegistriesSubtask.getFunctionOracleAddress),
      description: camelToFlat(
        PluginRegistriesSubtask.getFunctionOracleAddress
      ),
      args: [],
    },
    [PluginRegistriesSubtask.getDenomination]: {
      action: registriesActions.getDenomination,
      command: camelToKebab(PluginRegistriesSubtask.getDenomination),
      description: camelToFlat(PluginRegistriesSubtask.getDenomination),
      args: [],
    },
  },
};
