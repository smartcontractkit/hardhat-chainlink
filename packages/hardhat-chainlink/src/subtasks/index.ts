import { camelToFlat } from "../helpers/utils";
import {
  AutomationSubtask,
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
import * as automationActions from "../tasks/automation";
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
  [Task.automation]: {
    [AutomationSubtask.registerUpkeep]: {
      action: automationActions.registerUpkeep,
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
