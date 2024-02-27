import { camelToFlat } from "../helpers/utils";
import {
  AutomationRegistrarSubtask,
  AutomationRegistrySubtask,
  CCIPSubtask,
  DataFeedProxySubtask,
  DataFeedSubtask,
  DirectRequestConsumerSubtask,
  ENSFeedsResolverSubtask,
  FeedRegistrySubtask,
  FunctionsSimulationSubtask,
  FunctionsSubtask,
  L2SequencerSubtask,
  LinkTokenSubtask,
  NodeSubtask,
  OperatorSubtask,
  PluginRegistriesSubtask,
  Task,
  UtilsSubtask,
  VRFSubtask,
} from "../shared/enums";
import { Subtasks } from "../shared/types";
import * as automationRegistrarActions from "../tasks/automation/keeperRegistrar";
import * as automationRegistryActions from "../tasks/automation/keeperRegistry";
import * as ccipActions from "../tasks/ccip";
import * as dataFeedActions from "../tasks/feeds/dataFeed";
import * as dataFeedProxyActions from "../tasks/feeds/dataFeedProxy";
import * as ensFeedsResolverActions from "../tasks/feeds/ensFeedsResolver";
import * as feedRegistryActions from "../tasks/feeds/feedRegistry";
import * as l2FeedUptimeSequencerActions from "../tasks/feeds/l2FeedUptimeSequencer";
import * as functionsActions from "../tasks/functions";
import * as registriesActions from "../tasks/registries";
import * as directRequestConsumerActions from "../tasks/sandbox/directRequestConsumer";
import * as functionsSimulationActions from "../tasks/sandbox/functionsSimulation";
import * as linkTokenActions from "../tasks/sandbox/linkToken";
import * as nodeActions from "../tasks/sandbox/node";
import * as operatorActions from "../tasks/sandbox/operator";
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
          description: "Address of new owner of Subscription",
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
          name: "keeperRegistrarAddress",
          description: "Address of Keeper Registrar",
        },
        {
          name: "linkTokenAddress",
          description: "Address of Link Token",
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
          defaultValue: "0x",
        },
        {
          name: "source",
          description: "ID of the application sending this request [v1_1 ONLY]",
          defaultValue: "0",
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
          name: "keeperRegistrarAddress",
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
          name: "keeperRegistrarAddress",
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
          name: "keeperRegistrarAddress",
          description: "Address of Keeper Registrar",
        },
      ],
    },
    [AutomationRegistrarSubtask.getTypeAndVersion]: {
      action: automationRegistrarActions.getTypeAndVersion,
      description: camelToFlat(AutomationRegistrarSubtask.getTypeAndVersion),
      args: [
        {
          name: "keeperRegistrarAddress",
          description: "Address of Keeper Registrar",
        },
      ],
    },
  },
  [Task.automationRegistry]: {
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
          description: "Comma-separated upkeep IDs to migrate",
        },
        {
          name: "destination",
          description: "Address of destination Keeper Registry",
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
          name: "keeperAddress",
          description: "Keeper address",
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
  [Task.functions]: {
    [FunctionsSubtask.createSubscription]: {
      action: functionsActions.createSubscription,
      description: camelToFlat(FunctionsSubtask.createSubscription),
      args: [
        {
          name: "functionsRouterAddress",
          description: "Address of Functions Router",
        },
        {
          name: "consumerAddress",
          description: "Address of Functions Consumer",
          defaultValue: "",
        },
      ],
    },
    [FunctionsSubtask.fundSubscription]: {
      action: functionsActions.fundSubscription,
      description: camelToFlat(FunctionsSubtask.fundSubscription),
      args: [
        {
          name: "functionsRouterAddress",
          description: "Address of Functions Router",
        },
        {
          name: "linkTokenAddress",
          description: "Address of Link Token",
        },
        {
          name: "amountInJuels",
          description: "Amount of LINK in Juels to fund Subscription",
        },
        {
          name: "subscriptionId",
          description: "Subscription ID",
        },
      ],
    },
    [FunctionsSubtask.cancelSubscription]: {
      action: functionsActions.cancelSubscription,
      description: camelToFlat(FunctionsSubtask.cancelSubscription),
      args: [
        {
          name: "functionsRouterAddress",
          description: "Address of Functions Router",
        },
        {
          name: "subscriptionId",
          description: "Subscription ID",
        },
        {
          name: "receivingAddress",
          description: "Address to receive the balance of Subscription",
          defaultValue: "",
        },
      ],
    },
    [FunctionsSubtask.getSubscriptionDetails]: {
      action: functionsActions.getSubscriptionDetails,
      description: camelToFlat(FunctionsSubtask.getSubscriptionDetails),
      args: [
        {
          name: "functionsRouterAddress",
          description: "Address of Functions Router",
        },
        {
          name: "subscriptionId",
          description: "Subscription ID",
        },
      ],
    },
    [FunctionsSubtask.requestSubscriptionOwnerTransfer]: {
      action: functionsActions.requestSubscriptionOwnerTransfer,
      description: camelToFlat(
        FunctionsSubtask.requestSubscriptionOwnerTransfer
      ),
      args: [
        {
          name: "functionsRouterAddress",
          description: "Address of Functions Router",
        },
        {
          name: "subscriptionId",
          description: "Subscription ID",
        },
        {
          name: "newOwnerAddress",
          description: "Address of new owner of Subscription ",
        },
      ],
    },
    [FunctionsSubtask.acceptSubscriptionOwnerTransfer]: {
      action: functionsActions.acceptSubscriptionOwnerTransfer,
      description: camelToFlat(
        FunctionsSubtask.acceptSubscriptionOwnerTransfer
      ),
      args: [
        {
          name: "functionsRouterAddress",
          description: "Address of Functions Router",
        },
        {
          name: "subscriptionId",
          description: "Subscription ID",
        },
      ],
    },
    [FunctionsSubtask.addConsumer]: {
      action: functionsActions.addConsumer,
      description: camelToFlat(FunctionsSubtask.addConsumer),
      args: [
        {
          name: "functionsRouterAddress",
          description: "Address of Functions Router",
        },
        {
          name: "consumerAddress",
          description: "Address of Functions Consumer",
        },
        {
          name: "subscriptionId",
          description: "Subscription ID",
        },
      ],
    },
    [FunctionsSubtask.removeConsumer]: {
      action: functionsActions.removeConsumer,
      description: camelToFlat(FunctionsSubtask.removeConsumer),
      args: [
        {
          name: "functionsRouterAddress",
          description: "Address of Functions Router",
        },
        {
          name: "consumerAddress",
          description: "Address of Functions Consumer",
        },
        {
          name: "subscriptionId",
          description: "Subscription ID",
        },
      ],
    },
    [FunctionsSubtask.timeoutRequests]: {
      action: functionsActions.timeoutRequests,
      description: camelToFlat(FunctionsSubtask.timeoutRequests),
      args: [
        {
          name: "functionsRouterAddress",
          description: "Address of Functions Router",
        },
        {
          name: "requestIdsString",
          description: "Comma-separated requests IDs",
        },
        {
          name: "donId",
          description: "ID of the DON where Functions requests has been sent",
        },
        {
          name: "toBlock",
          description: "End block in search range",
          defaultValue: "latest",
        },
        {
          name: "pastBlocksToSearch",
          description: "Number of blocks to search (before toBlock)",
          defaultValue: "1000",
        },
      ],
    },
    [FunctionsSubtask.estimateRequestCost]: {
      action: functionsActions.estimateRequestCost,
      description: camelToFlat(FunctionsSubtask.estimateRequestCost),
      args: [
        {
          name: "functionsRouterAddress",
          description: "Address of Functions Router",
        },
        {
          name: "donId",
          description:
            "ID of the DON to which the Functions request will be sent",
        },
        {
          name: "subscriptionId",
          description: "Subscription ID",
        },
        {
          name: "callbackGasLimit",
          description: "Total gas used by the consumer contract's callback",
        },
        {
          name: "gasPriceWei",
          description: "Gas price in wei",
        },
      ],
    },
  },
  [Task.ccip]: {
    [CCIPSubtask.getSupportedTokens]: {
      action: ccipActions.getSupportedTokens,
      description: camelToFlat(CCIPSubtask.getSupportedTokens),
      args: [
        {
          name: "ccipRouterAddress",
          description: "Address of CCIP Router",
        },
        {
          name: "chainSelector",
          description: "CCIP chain selector",
        },
      ],
    },
    [CCIPSubtask.isChainSupported]: {
      action: ccipActions.isChainSupported,
      description: camelToFlat(CCIPSubtask.isChainSupported),
      args: [
        {
          name: "ccipRouterAddress",
          description: "Address of CCIP Router",
        },
        {
          name: "chainSelector",
          description: "CCIP chain selector",
        },
      ],
    },
    [CCIPSubtask.getOnRamp]: {
      action: ccipActions.getOnRamp,
      description: camelToFlat(CCIPSubtask.getOnRamp),
      args: [
        {
          name: "ccipRouterAddress",
          description: "Address of CCIP Router",
        },
        {
          name: "chainSelector",
          description: "CCIP chain selector",
        },
      ],
    },
    [CCIPSubtask.isOffRamp]: {
      action: ccipActions.isOffRamp,
      description: camelToFlat(CCIPSubtask.isOffRamp),
      args: [
        {
          name: "ccipRouterAddress",
          description: "Address of CCIP Router",
        },
        {
          name: "sourceChainSelector",
          description: "CCIP source chain selector",
        },
        {
          name: "offRampAddress",
          description: "Address of a contract to be checked",
        },
      ],
    },
    [CCIPSubtask.getWrappedNative]: {
      action: ccipActions.getWrappedNative,
      description: camelToFlat(CCIPSubtask.getWrappedNative),
      args: [
        {
          name: "ccipRouterAddress",
          description: "Address of CCIP Router",
        },
      ],
    },
    [CCIPSubtask.getTypeAndVersion]: {
      action: ccipActions.getTypeAndVersion,
      description: camelToFlat(CCIPSubtask.getTypeAndVersion),
      args: [
        {
          name: "ccipRouterAddress",
          description: "Address of CCIP Router",
        },
      ],
    },
  },
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
    [PluginRegistriesSubtask.getFunctionRouter]: {
      action: registriesActions.getFunctionRouter,
      description: camelToFlat(PluginRegistriesSubtask.getFunctionRouter),
      args: [],
    },
    [PluginRegistriesSubtask.getCCIPRouter]: {
      action: registriesActions.getCCIPRouter,
      description: camelToFlat(PluginRegistriesSubtask.getCCIPRouter),
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
    [UtilsSubtask.transferETH]: {
      action: utilsActions.transferETH,
      description: "Transfer ETH to recipient",
      args: [
        {
          name: "recipient",
          description: "Recipient address",
        },
        {
          name: "amount",
          description: "Amount of ETH in wei",
          defaultValue: "1000000000000000000",
        },
      ],
    },
    [UtilsSubtask.createGist]: {
      action: utilsActions.createGist,
      description: "Create private GitHub gist",
      args: [
        {
          name: "githubApiToken",
          description: "GitHub API Token",
        },
        {
          name: "content",
          description: "Gist content",
        },
      ],
    },
    [UtilsSubtask.deleteGist]: {
      action: utilsActions.deleteGist,
      description: "Delete private GitHub gist",
      args: [
        {
          name: "githubApiToken",
          description: "GitHub API Token",
        },
        {
          name: "gistURL",
          description: "Gist URL",
        },
      ],
    },
  },
  [Task.node]: {
    [NodeSubtask.run]: {
      action: nodeActions.run,
      description: "Run local Chainlink node",
      args: [],
    },
    [NodeSubtask.restart]: {
      action: nodeActions.restart,
      description: "Restart local Chainlink node",
      args: [],
    },
    [NodeSubtask.stop]: {
      action: nodeActions.stop,
      description: "Stop local Chainlink node",
      args: [],
    },
    [NodeSubtask.getETHKeys]: {
      action: nodeActions.getETHKeys,
      description: "Get list of Chainlink node's ETH keys",
      args: [],
    },
    [NodeSubtask.getP2PKeys]: {
      action: nodeActions.getP2PKeys,
      description: "Get list of Chainlink node's P2P keys",
      args: [],
    },
    [NodeSubtask.getOCRKeys]: {
      action: nodeActions.getOCRKeys,
      description: "Get list of Chainlink node's OCR keys",
      args: [],
    },
    [NodeSubtask.getJobs]: {
      action: nodeActions.getJobs,
      description: "Get list of Chainlink node's jobs",
      args: [],
    },
    [NodeSubtask.createDirectRequestJob]: {
      action: nodeActions.createDirectRequestJob,
      description: "Create Direct Request job",
      args: [
        {
          name: "operatorAddress",
          description: "Operator address",
        },
      ],
    },
  },
  [Task.linkToken]: {
    [LinkTokenSubtask.deploy]: {
      action: linkTokenActions.deploy,
      description: "Deploy Link Token contract",
      args: [],
    },
    [LinkTokenSubtask.transfer]: {
      action: linkTokenActions.transfer,
      description: "Transfer Link Tokens",
      args: [
        {
          name: "linkTokenAddress",
          description: "Link Token address",
        },
        {
          name: "recipient",
          description: "Account to which Link Tokens will be transferred",
        },
        {
          name: "amount",
          description: "Amount of Link Tokens to be transferred",
        },
      ],
    },
    [LinkTokenSubtask.getAllowance]: {
      action: linkTokenActions.getAllowance,
      description: "Get Link Token allowance",
      args: [
        {
          name: "linkTokenAddress",
          description: "Link Token address",
        },
        {
          name: "owner",
          description: "Link Tokens owner",
        },
        {
          name: "spender",
          description: "Owner's Link Tokens spender",
        },
      ],
    },
    [LinkTokenSubtask.increaseApproval]: {
      action: linkTokenActions.increaseApproval,
      description: "Increase Link Token approval",
      args: [
        {
          name: "linkTokenAddress",
          description: "Link Token address",
        },
        {
          name: "spender",
          description:
            "Account for which Link Token approval will be increased",
        },
        {
          name: "addedValue",
          description: "Amount of Link Tokens to be added",
        },
      ],
    },
    [LinkTokenSubtask.decreaseApproval]: {
      action: linkTokenActions.decreaseApproval,
      description: "Decrease Link Token approval",
      args: [
        {
          name: "linkTokenAddress",
          description: "Link Token address",
        },
        {
          name: "spender",
          description:
            "Account for which Link Token approval will be decreased",
        },
        {
          name: "subtractedValue",
          description: "Amount of Link Tokens to be decreased",
        },
      ],
    },
  },
  [Task.operator]: {
    [OperatorSubtask.deploy]: {
      action: operatorActions.deploy,
      description: "Deploy Operator contract",
      args: [
        {
          name: "linkTokenAddress",
          description: "Link Token address",
        },
      ],
    },
    [OperatorSubtask.setAuthorizedSender]: {
      action: operatorActions.setAuthorizedSender,
      description: "Set authorized sender",
      args: [
        {
          name: "operatorAddress",
          description: "Operator address",
        },
        {
          name: "sender",
          description: "Address to be authorized",
        },
      ],
    },
  },
  [Task.directRequestConsumer]: {
    [DirectRequestConsumerSubtask.deploy]: {
      action: directRequestConsumerActions.deploy,
      description: "Deploy Direct Request Consumer",
      args: [
        {
          name: "linkTokenAddress",
          description: "Link Token address",
        },
      ],
    },
    [DirectRequestConsumerSubtask.requestData]: {
      action: directRequestConsumerActions.requestData,
      description: "Request Data with Direct Request",
      args: [
        {
          name: "directRequestConsumerAddress",
          description: "Direct Request Consumer address",
        },
        {
          name: "operatorAddress",
          description: "Operator address",
        },
        {
          name: "externalJobID",
          description: "Direct Request External Job ID",
        },
        {
          name: "observationURL",
          description: "URL to retrieve data",
        },
        {
          name: "pathToData",
          description: "JSON path to data in observation URL response",
        },
        {
          name: "multiplyTimes",
          description: "Multiplier for the received answer",
          defaultValue: "1",
        },
      ],
    },
    [DirectRequestConsumerSubtask.getLatestAnswer]: {
      action: directRequestConsumerActions.getLatestAnswer,
      description: "Get latest answer",
      args: [
        {
          name: "directRequestConsumerAddress",
          description: "Direct Request Consumer address",
        },
      ],
    },
  },
  [Task.functionsSimulation]: {
    [FunctionsSimulationSubtask.simulateRequest]: {
      action: functionsSimulationActions.simulateRequest,
      description: "Simulate Functions request",
      args: [
        {
          name: "source",
          description: "Source code to execute",
        },
        {
          name: "args",
          description: "Comma-separated request args",
          defaultValue: "",
        },
        {
          name: "bytesArgs",
          description: "Comma-separated request bytes args",
          defaultValue: "",
        },
      ],
    },
  },
};
