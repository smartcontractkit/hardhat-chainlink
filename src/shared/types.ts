import { BigNumber, providers, Signer } from "ethers";

import {
  CCIPRouter,
  DataFeed,
  FeedRegistry,
  FunctionsRouter,
  KeeperRegistry,
  L2Sequencer,
  LinkToken,
  Network,
  VRFCoordinator,
} from "../registries/interfaces";
import { SubtaskProperties } from "../subtasks/interfaces";

export type NetworksRegistry = Record<string, Network>;
export type DataFeedsRegistry = Record<
  string,
  Record<string, Record<string, DataFeed>>
>;
export type FeedRegistriesRegistry = Record<string, FeedRegistry>;
export type VRFCoordinatorsRegistry = Record<string, VRFCoordinator>;
export type LinkTokensRegistry = Record<string, LinkToken>;
export type KeeperRegistriesRegistry = Record<string, KeeperRegistry>;
export type L2SequencersRegistry = Record<string, L2Sequencer>;
export type DenominationsRegistry = Record<string, string>;
export type FunctionsRoutersRegistry = Record<string, FunctionsRouter>;
export type CCIPRoutersRegistry = Record<string, CCIPRouter>;

export type Subtasks = Record<string, Record<string, SubtaskProperties>>;

export type Choice = {
  value: string;
  name?: string;
  description?: string;
  disabled?: boolean | string;
  type?: never;
};

export type DockerOutput = {
  exitCode: number | null;
  err: string;
};

export type FunctionsSubscriptionDetails = {
  balance: BigNumber;
  owner: string;
  blockedBalance: BigNumber;
  proposedOwner: string;
  consumers: string[];
  flags: string;
};

export type VRFSubscriptionDetails = {
  balance: BigNumber;
  reqCount: BigNumber;
  owner: string;
  consumers: string[];
};

export type Overrides = {
  signer?: Signer;
  provider?: providers.JsonRpcProvider;
};

export type CCIPMessage = {
  messageId: string;
  sourceChainSelector: string;
  sender: string;
  data: string;
  destTokenAmounts: { token: string; amount: string }[];
};

export type GasEstimationOptions = {
  destinationChainRpcUrl?: string;
  destinationChainBlockId?: string;
  isForking?: boolean;
};
