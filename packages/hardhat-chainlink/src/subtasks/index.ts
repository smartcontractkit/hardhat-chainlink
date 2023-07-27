import { camelToFlat } from "../helpers/utils";
import {
  AutomationRegistrarSubtask,
  AutomationRegistrySubtask,
  DataFeedProxySubtask,
  DataFeedSubtask,
  ENSFeedsResolverSubtask,
  FeedRegistrySubtask,
  L2SequencerSubtask,
  PluginRegistriesSubtask,
  Task,
  UtilsSubtask,
  VRFSubtask,
} from "../shared/enums";
import { Subtasks } from "../shared/types";
import * as automationRegistrarActions from "../tasks/automation/keeperRegistrar";
import * as automationRegistryActions from "../tasks/automation/keeperRegistry";
import * as dataFeedActions from "../tasks/feeds/dataFeed";
import * as dataFeedProxyActions from "../tasks/feeds/dataFeedProxy";
import * as ensFeedsResolverActions from "../tasks/feeds/ensFeedsResolver";
import * as feedRegistryActions from "../tasks/feeds/feedRegistry";
import * as l2FeedUptimeSequencerActions from "../tasks/feeds/l2FeedUptimeSequencer";
import * as registriesActions from "../tasks/registries";
import * as utilsActions from "../tasks/utils";
import * as vrfActions from "../tasks/vrf";

export const subtasks: Subtasks = {
  [Task.dataFeed]: {
    [DataFeedSubtask.getLatestRoundAnswer]: {
      action: dataFeedActions.getLatestRoundAnswer,
      description: camelToFlat(DataFeedSubtask.getLatestRoundAnswer),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
      ],
    },
    [DataFeedSubtask.getRoundAnswer]: {
      action: dataFeedActions.getRoundAnswer,
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
      action: dataFeedActions.getLatestRoundData,
      description: camelToFlat(DataFeedSubtask.getLatestRoundData),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
      ],
    },
    [DataFeedSubtask.getRoundData]: {
      action: dataFeedActions.getRoundData,
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
    [DataFeedSubtask.getLatestRoundId]: {
      action: dataFeedActions.getLatestRoundId,
      description: camelToFlat(DataFeedSubtask.getLatestRoundId),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
      ],
    },
    [DataFeedSubtask.getDecimals]: {
      action: dataFeedActions.getDecimals,
      description: camelToFlat(DataFeedSubtask.getDecimals),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
      ],
    },
    [DataFeedSubtask.getDescription]: {
      action: dataFeedActions.getDescription,
      description: camelToFlat(DataFeedSubtask.getDescription),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
      ],
    },
    [DataFeedSubtask.getVersion]: {
      action: dataFeedActions.getVersion,
      description: camelToFlat(DataFeedSubtask.getVersion),
      args: [
        {
          name: "dataFeedAddress",
          description: "Address of Data Feed",
        },
      ],
    },
  },
  [Task.dataFeedProxy]: {
    [DataFeedProxySubtask.getLatestRoundAnswer]: {
      action: dataFeedProxyActions.getLatestRoundAnswer,
      description: camelToFlat(DataFeedProxySubtask.getLatestRoundAnswer),
      args: [
        {
          name: "dataFeedProxyAddress",
          description: "Address of Data Feed Proxy",
        },
      ],
    },
    [DataFeedProxySubtask.getRoundAnswer]: {
      action: dataFeedProxyActions.getRoundAnswer,
      description: camelToFlat(DataFeedProxySubtask.getRoundAnswer),
      args: [
        {
          name: "dataFeedProxyAddress",
          description: "Address of Data Feed Proxy",
        },
        {
          name: "roundId",
          description: "Round ID of Data Feed Proxy",
        },
      ],
    },
    [DataFeedProxySubtask.getLatestRoundData]: {
      action: dataFeedProxyActions.getLatestRoundData,
      description: camelToFlat(DataFeedProxySubtask.getLatestRoundData),
      args: [
        {
          name: "dataFeedProxyAddress",
          description: "Address of Data Feed Proxy",
        },
      ],
    },
    [DataFeedProxySubtask.getRoundData]: {
      action: dataFeedProxyActions.getRoundData,
      description: camelToFlat(DataFeedProxySubtask.getRoundData),
      args: [
        {
          name: "dataFeedProxyAddress",
          description: "Address of Data Feed Proxy",
        },
        {
          name: "roundId",
          description: "Round ID of Data Feed Proxy",
        },
      ],
    },
    [DataFeedProxySubtask.getLatestRoundId]: {
      action: dataFeedProxyActions.getLatestRoundId,
      description: camelToFlat(DataFeedProxySubtask.getLatestRoundId),
      args: [
        {
          name: "dataFeedProxyAddress",
          description: "Address of Data Feed Proxy",
        },
      ],
    },
    [DataFeedProxySubtask.getDecimals]: {
      action: dataFeedProxyActions.getDecimals,
      description: camelToFlat(DataFeedProxySubtask.getDecimals),
      args: [
        {
          name: "dataFeedProxyAddress",
          description: "Address of Data Feed Proxy",
        },
      ],
    },
    [DataFeedProxySubtask.getDescription]: {
      action: dataFeedProxyActions.getDescription,
      description: camelToFlat(DataFeedProxySubtask.getDescription),
      args: [
        {
          name: "dataFeedProxyAddress",
          description: "Address of Data Feed Proxy",
        },
      ],
    },
    [DataFeedProxySubtask.getVersion]: {
      action: dataFeedProxyActions.getVersion,
      description: camelToFlat(DataFeedProxySubtask.getVersion),
      args: [
        {
          name: "dataFeedProxyAddress",
          description: "Address of Data Feed Proxy",
        },
      ],
    },
    [DataFeedProxySubtask.getAggregator]: {
      action: dataFeedProxyActions.getAggregator,
      description: "Get address of current phase Aggregator",
      args: [
        {
          name: "dataFeedProxyAddress",
          description: "Address of Data Feed Proxy",
        },
      ],
    },
    [DataFeedProxySubtask.getPhaseId]: {
      action: dataFeedProxyActions.getPhaseId,
      description: "Get Data Feed Proxy phase ID",
      args: [
        {
          name: "dataFeedProxyAddress",
          description: "Address of Data Feed Proxy",
        },
      ],
    },
    [DataFeedProxySubtask.getPhaseAggregators]: {
      action: dataFeedProxyActions.getPhaseAggregators,
      description: "Get Data Feed Proxy phase Aggregator",
      args: [
        {
          name: "dataFeedProxyAddress",
          description: "Address of Data Feed Proxy",
        },
        {
          name: "phaseId",
          description: "Data Feed Proxy phase ID",
        },
      ],
    },
  },
  [Task.feedRegistry]: {
    [FeedRegistrySubtask.getLatestRoundData]: {
      action: feedRegistryActions.getLatestRoundData,
      description: camelToFlat(FeedRegistrySubtask.getLatestRoundData),
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
    [FeedRegistrySubtask.getRoundData]: {
      action: feedRegistryActions.getRoundData,
      description: camelToFlat(FeedRegistrySubtask.getRoundData),
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
    [FeedRegistrySubtask.proposedGetLatestRoundData]: {
      action: feedRegistryActions.proposedGetLatestRoundData,
      description: camelToFlat(FeedRegistrySubtask.proposedGetLatestRoundData),
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
    [FeedRegistrySubtask.proposedGetRoundData]: {
      action: feedRegistryActions.proposedGetRoundData,
      description: camelToFlat(FeedRegistrySubtask.proposedGetRoundData),
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
      action: feedRegistryActions.getRoundFeed,
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
    [FeedRegistrySubtask.getFeed]: {
      action: feedRegistryActions.getFeed,
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
    [FeedRegistrySubtask.getProposedFeed]: {
      action: feedRegistryActions.getProposedFeed,
      description: camelToFlat(FeedRegistrySubtask.getProposedFeed),
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
      action: feedRegistryActions.isFeedEnabled,
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
    [FeedRegistrySubtask.getPreviousRoundId]: {
      action: feedRegistryActions.getPreviousRoundId,
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
      action: feedRegistryActions.getNextRoundId,
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
    [FeedRegistrySubtask.getDecimals]: {
      action: feedRegistryActions.getDecimals,
      description: camelToFlat(FeedRegistrySubtask.getDecimals),
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
    [FeedRegistrySubtask.getDescription]: {
      action: feedRegistryActions.getDescription,
      description: camelToFlat(FeedRegistrySubtask.getDescription),
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
    [FeedRegistrySubtask.getVersion]: {
      action: feedRegistryActions.getVersion,
      description: camelToFlat(FeedRegistrySubtask.getVersion),
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
    [FeedRegistrySubtask.getPhase]: {
      action: feedRegistryActions.getPhase,
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
      action: feedRegistryActions.getPhaseFeed,
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
      action: feedRegistryActions.getPhaseRange,
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
      action: feedRegistryActions.getCurrentPhaseId,
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
      ],
    },
  },
  [Task.ens]: {
    [ENSFeedsResolverSubtask.resolveAggregatorAddress]: {
      action: ensFeedsResolverActions.resolveAggregatorAddress,
      description: camelToFlat(
        ENSFeedsResolverSubtask.resolveAggregatorAddress
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
    [ENSFeedsResolverSubtask.resolveAggregatorAddressWithSubdomains]: {
      action: ensFeedsResolverActions.resolveAggregatorAddressWithSubdomains,
      description: camelToFlat(
        ENSFeedsResolverSubtask.resolveAggregatorAddressWithSubdomains
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
      action: l2FeedUptimeSequencerActions.isL2SequencerUp,
      description: camelToFlat(L2SequencerSubtask.isL2SequencerUp),
      args: [
        {
          name: "l2SequencerAddress",
          description: "Address of Layer 2 Sequencer Uptime Status Feed",
        },
      ],
    },
    [L2SequencerSubtask.getTimeSinceL2SequencerIsUp]: {
      action: l2FeedUptimeSequencerActions.getTimeSinceL2SequencerIsUp,
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
    [VRFSubtask.requestRandomWords]: {
      action: vrfActions.requestRandomWords,
      description: camelToFlat(VRFSubtask.requestRandomWords),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
        {
          name: "keyHash",
          description:
            "Key hash related to maxGasPrice of a VRF. Different keyHash's have different gas price.",
        },
        {
          name: "subscriptionId",
          description:
            "VRF Subscription ID. Must be funded with the minimum subscription balance required for the selected keyHash.",
        },
        {
          name: "requestConfirmations",
          description:
            "How many blocks you'd like the oracle to wait before responding to the request.",
        },
        {
          name: "callbackGasLimit",
          description:
            "How much gas you'd like to receive in your fulfillRandomWords callback.",
        },
        {
          name: "numWords",
          description:
            "The number of uint256 random values you'd like to receive in your fulfillRandomWords callback.",
        },
      ],
    },
    [VRFSubtask.isPendingRequestExists]: {
      action: vrfActions.isPendingRequestExists,
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
    [VRFSubtask.getConfig]: {
      action: vrfActions.getConfig,
      description: camelToFlat(VRFSubtask.getConfig),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
    [VRFSubtask.getTypeAndVersion]: {
      action: vrfActions.getTypeAndVersion,
      description: camelToFlat(VRFSubtask.getTypeAndVersion),
      args: [
        {
          name: "vrfCoordinatorAddress",
          description: "Address of VRF Coordinator",
        },
      ],
    },
  },
  [Task.automationRegistrar]: {
    [AutomationRegistrarSubtask.registerUpkeep]: {
      action: automationRegistrarActions.registerUpkeep,
      description: camelToFlat(AutomationRegistrarSubtask.registerUpkeep),
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
          name: "ocrConfig",
          description: "OffchainConfig for upkeep in bytes [v2_0 ONLY]",
        },
        {
          name: "source",
          description: "ID of the application sending this request [v1_1 ONLY]",
        },
        {
          name: "sender",
          description: "Address of the sender making the request",
        },
      ],
    },
    [AutomationRegistrarSubtask.getPendingRequest]: {
      action: automationRegistrarActions.getPendingRequest,
      description: camelToFlat(AutomationRegistrarSubtask.getPendingRequest),
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
    [AutomationRegistrarSubtask.cancelRequest]: {
      action: automationRegistrarActions.cancelRequest,
      description: camelToFlat(AutomationRegistrarSubtask.cancelRequest),
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
    [AutomationRegistrarSubtask.getRegistrationConfig]: {
      action: automationRegistrarActions.getRegistrationConfig,
      description: camelToFlat(
        AutomationRegistrarSubtask.getRegistrationConfig
      ),
      args: [
        {
          name: "keepersRegistrarAddress",
          description: "Address of Keeper Registrar",
        },
      ],
    },
    [AutomationRegistrarSubtask.getTypeAndVersion]: {
      action: automationRegistrarActions.getTypeAndVersion,
      description: camelToFlat(AutomationRegistrarSubtask.getTypeAndVersion),
      args: [
        {
          name: "keepersRegistrarAddress",
          description: "Address of Keeper Registrar",
        },
      ],
    },
  },
  [Task.automationRegistry]: {
    [AutomationRegistrySubtask.fundUpkeep]: {
      action: automationRegistryActions.fundUpkeep,
      description: camelToFlat(AutomationRegistrySubtask.fundUpkeep),
      args: [
        {
          name: "keeperRegistryAddress",
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
    [AutomationRegistrySubtask.checkUpkeep]: {
      action: automationRegistryActions.checkUpkeep,
      description: camelToFlat(AutomationRegistrySubtask.checkUpkeep),
      args: [
        {
          name: "keeperRegistryAddress",
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
    [AutomationRegistrySubtask.cancelUpkeep]: {
      action: automationRegistryActions.cancelUpkeep,
      description: camelToFlat(AutomationRegistrySubtask.cancelUpkeep),
      args: [
        {
          name: "keeperRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "upkeepId",
          description: "Upkeep ID",
        },
      ],
    },
    [AutomationRegistrySubtask.withdrawFunds]: {
      action: automationRegistryActions.withdrawFunds,
      description: camelToFlat(AutomationRegistrySubtask.withdrawFunds),
      args: [
        {
          name: "keeperRegistryAddress",
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
    [AutomationRegistrySubtask.getActiveUpkeepIDs]: {
      action: automationRegistryActions.getActiveUpkeepIDs,
      description: camelToFlat(AutomationRegistrySubtask.getActiveUpkeepIDs),
      args: [
        {
          name: "keeperRegistryAddress",
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
    [AutomationRegistrySubtask.getUpkeep]: {
      action: automationRegistryActions.getUpkeep,
      description: camelToFlat(AutomationRegistrySubtask.getUpkeep),
      args: [
        {
          name: "keeperRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "upkeepId",
          description: "Upkeep ID",
        },
      ],
    },
    [AutomationRegistrySubtask.migrateUpkeeps]: {
      action: automationRegistryActions.migrateUpkeeps,
      description: camelToFlat(AutomationRegistrySubtask.migrateUpkeeps),
      args: [
        {
          name: "keeperRegistryAddress",
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
    [AutomationRegistrySubtask.receiveUpkeeps]: {
      action: automationRegistryActions.receiveUpkeeps,
      description: camelToFlat(AutomationRegistrySubtask.receiveUpkeeps),
      args: [
        {
          name: "keeperRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "encodedUpkeeps",
          description: "Encoded Upkeeps to receive",
        },
      ],
    },
    [AutomationRegistrySubtask.withdrawPayment]: {
      action: automationRegistryActions.withdrawPayment,
      description: camelToFlat(AutomationRegistrySubtask.withdrawPayment),
      args: [
        {
          name: "keeperRegistryAddress",
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
    [AutomationRegistrySubtask.transferPayeeship]: {
      action: automationRegistryActions.transferPayeeship,
      description: camelToFlat(AutomationRegistrySubtask.transferPayeeship),
      args: [
        {
          name: "keeperRegistryAddress",
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
    [AutomationRegistrySubtask.acceptPayeeship]: {
      action: automationRegistryActions.acceptPayeeship,
      description: camelToFlat(AutomationRegistrySubtask.acceptPayeeship),
      args: [
        {
          name: "keeperRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "keeper",
          description: "Keeper address",
        },
      ],
    },
    [AutomationRegistrySubtask.getKeeperInfo]: {
      action: automationRegistryActions.getKeeperInfo,
      description: camelToFlat(AutomationRegistrySubtask.getKeeperInfo),
      args: [
        {
          name: "keeperRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "query",
          description: "Keeper info to get",
        },
      ],
    },
    [AutomationRegistrySubtask.getMaxPaymentForGas]: {
      action: automationRegistryActions.getMaxPaymentForGas,
      description: camelToFlat(AutomationRegistrySubtask.getMaxPaymentForGas),
      args: [
        {
          name: "keeperRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "gasLimit",
          description: "Gas limit",
        },
      ],
    },
    [AutomationRegistrySubtask.getMinBalanceForUpkeep]: {
      action: automationRegistryActions.getMinBalanceForUpkeep,
      description: camelToFlat(
        AutomationRegistrySubtask.getMinBalanceForUpkeep
      ),
      args: [
        {
          name: "keeperRegistryAddress",
          description: "Address of Keeper Registry",
        },
        {
          name: "upkeepId",
          description: "Upkeep ID",
        },
      ],
    },
    [AutomationRegistrySubtask.getState]: {
      action: automationRegistryActions.getState,
      description: camelToFlat(AutomationRegistrySubtask.getState),
      args: [
        {
          name: "keeperRegistryAddress",
          description: "Address of Keeper Registry",
        },
      ],
    },
    [AutomationRegistrySubtask.isPaused]: {
      action: automationRegistryActions.isPaused,
      description: camelToFlat(AutomationRegistrySubtask.isPaused),
      args: [
        {
          name: "keeperRegistryAddress",
          description: "Address of Keeper Registry",
        },
      ],
    },
    [AutomationRegistrySubtask.getTypeAndVersion]: {
      action: automationRegistryActions.getTypeAndVersion,
      description: camelToFlat(AutomationRegistrySubtask.getTypeAndVersion),
      args: [
        {
          name: "keeperRegistryAddress",
          description: "Address of Keeper Registry",
        },
      ],
    },
    [AutomationRegistrySubtask.getUpkeepTranscoderVersion]: {
      action: automationRegistryActions.getUpkeepTranscoderVersion,
      description: camelToFlat(
        AutomationRegistrySubtask.getUpkeepTranscoderVersion
      ),
      args: [
        {
          name: "keeperRegistryAddress",
          description: "Address of Keeper Registry",
        },
      ],
    },
  },
  [Task.functions]: {},
  [Task.sandbox]: {},
  [Task.registries]: {
    [PluginRegistriesSubtask.getDataFeed]: {
      action: registriesActions.getDataFeed,
      description: camelToFlat(PluginRegistriesSubtask.getDataFeed),
      args: [],
    },
    [PluginRegistriesSubtask.getFeedRegistry]: {
      action: registriesActions.getFeedRegistry,
      description: camelToFlat(PluginRegistriesSubtask.getFeedRegistry),
      args: [],
    },
    [PluginRegistriesSubtask.getVRFCoordinator]: {
      action: registriesActions.getVRFCoordinator,
      description: camelToFlat(PluginRegistriesSubtask.getVRFCoordinator),
      args: [],
    },
    [PluginRegistriesSubtask.getLinkToken]: {
      action: registriesActions.getLinkToken,
      description: camelToFlat(PluginRegistriesSubtask.getLinkToken),
      args: [],
    },
    [PluginRegistriesSubtask.getKeeperRegistry]: {
      action: registriesActions.getKeeperRegistry,
      description: camelToFlat(PluginRegistriesSubtask.getKeeperRegistry),
      args: [],
    },
    [PluginRegistriesSubtask.getL2Sequencer]: {
      action: registriesActions.getL2Sequencer,
      description: camelToFlat(PluginRegistriesSubtask.getL2Sequencer),
      args: [],
    },
    [PluginRegistriesSubtask.getFunctionOracle]: {
      action: registriesActions.getFunctionOracle,
      description: camelToFlat(PluginRegistriesSubtask.getFunctionOracle),
      args: [],
    },
    [PluginRegistriesSubtask.getDenomination]: {
      action: registriesActions.getDenomination,
      description: camelToFlat(PluginRegistriesSubtask.getDenomination),
      args: [],
    },
  },
  [Task.utils]: {
    [UtilsSubtask.getRoundId]: {
      action: utilsActions.getRoundId,
      description: "Get Data Feed Proxy/Registry round ID",
      args: [
        {
          name: "phaseId",
          description: "Data Feed Proxy/Registry phase ID",
        },
        {
          name: "aggregatorRoundId",
          description: "Aggregator round ID",
        },
      ],
    },
    [UtilsSubtask.parseRoundId]: {
      action: utilsActions.parseRoundId,
      description: "Parse Data Feed Proxy/Registry round ID",
      args: [
        {
          name: "roundId",
          description: "Data Feed Proxy/Registry round ID",
        },
      ],
    },
  },
};
