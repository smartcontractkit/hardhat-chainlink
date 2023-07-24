import fs from "fs";

import {
  DataFeedsRegistry,
  FeedRegistriesRegistry,
  FunctionOraclesRegistry,
  KeeperRegistriesRegistry,
  L2SequencersRegistry,
  LinkTokensRegistry,
  NetworksRegistry,
  VRFCoordinatorsRegistry,
} from "../../shared/types";
import {
  DataFeed,
  FeedRegistry,
  FunctionOracle,
  KeeperRegistry,
  L2Sequencer,
  LinkToken,
  Network,
  VRFCoordinator,
} from "../interfaces";
import dataFeedsJSON from "../json/DataFeeds.json";
import feedRegistriesJSON from "../json/FeedRegistries.json";
import functionOraclesJSON from "../json/FunctionOracles.json";
import keeperRegistriesJSON from "../json/KeeperRegistries.json";
import l2SequencersJson from "../json/L2Sequencers.json";
import linkTokensJSON from "../json/LinkTokens.json";
import networksJSON from "../json/Networks.json";
import vrfCoordinatorsJSON from "../json/VRFCoordinators.json";

const dataFeeds: DataFeed[] = dataFeedsJSON as DataFeed[];
const feedRegistries: FeedRegistry[] = feedRegistriesJSON as FeedRegistry[];
const networks: Network[] = networksJSON as Network[];
const vrfCoordinators: VRFCoordinator[] =
  vrfCoordinatorsJSON as VRFCoordinator[];
const functionOracles: FunctionOracle[] =
  functionOraclesJSON as FunctionOracle[];
const linkTokens: LinkToken[] = linkTokensJSON as LinkToken[];
const keeperRegistries: KeeperRegistry[] =
  keeperRegistriesJSON as KeeperRegistry[];
const l2Sequencers: L2Sequencer[] = l2SequencersJson as L2Sequencer[];

const networksMap: NetworksRegistry = {};
const dataFeedsMap: DataFeedsRegistry = {};
const feedRegistriesMap: FeedRegistriesRegistry = {};
const vrfCoordinatorsMap: VRFCoordinatorsRegistry = {};
const functionOraclesMap: FunctionOraclesRegistry = {};
const linkTokensMap: LinkTokensRegistry = {};
const keeperRegistriesMap: KeeperRegistriesRegistry = {};
const l2SequencersMap: L2SequencersRegistry = {};

networks.forEach((network: Network) => {
  networksMap[network.chainId] = network;
  networksMap[network.chainSlug] = network;
});

dataFeeds.forEach((priceFeed: DataFeed) => {
  const pair = priceFeed.name.split(" / ");
  const chainSlug = networksMap[priceFeed.chainId].chainSlug;
  if (!dataFeedsMap[chainSlug]) {
    dataFeedsMap[chainSlug] = {};
  }
  if (!dataFeedsMap[chainSlug][pair[0]]) {
    dataFeedsMap[chainSlug][pair[0]] = {};
  }
  dataFeedsMap[chainSlug][pair[0]][pair[1]] = priceFeed;
});

feedRegistries.forEach((feedRegistry: FeedRegistry) => {
  const chainSlug = networksMap[feedRegistry.chainId].chainSlug;
  feedRegistriesMap[chainSlug] = feedRegistry;
});

vrfCoordinators.forEach((vrfCoordinator: VRFCoordinator) => {
  const chainSlug = networksMap[vrfCoordinator.chainId].chainSlug;
  vrfCoordinatorsMap[chainSlug] = vrfCoordinator;
});

functionOracles.forEach((functionOracle: FunctionOracle) => {
  const chainSlug = networksMap[functionOracle.chainId].chainSlug;
  functionOraclesMap[chainSlug] = functionOracle;
});

linkTokens.forEach((linkToken: LinkToken) => {
  const chainSlug = networksMap[linkToken.chainId].chainSlug;
  linkTokensMap[chainSlug] = linkToken;
});

keeperRegistries.forEach((keeperRegistry: KeeperRegistry) => {
  const chainSlug = networksMap[keeperRegistry.chainId].chainSlug;
  keeperRegistriesMap[chainSlug] = keeperRegistry;
});

l2Sequencers.forEach((l2Sequencer: L2Sequencer) => {
  const chainSlug = networksMap[l2Sequencer.chainId].chainSlug;
  l2SequencersMap[chainSlug] = l2Sequencer;
});

const tsCodeNetworks = `export const networksRegistry = ${JSON.stringify(
  networksMap
)};`;
const tsCodeDataFeeds = `export const dataFeedsRegistry = ${JSON.stringify(
  dataFeedsMap
)};`;
const tsCodeFeedRegistries = `export const feedRegistriesRegistry = ${JSON.stringify(
  feedRegistriesMap
)};`;
const tsCodeVRFCoordinators = `export const vrfCoordinatorsRegistry = ${JSON.stringify(
  vrfCoordinatorsMap
)};`;
const tsCodeFunctionOracles = `export const functionOraclesRegistry = ${JSON.stringify(
  functionOraclesMap
)};`;
const tsCodeLinkTokens = `export const linkTokensRegistry = ${JSON.stringify(
  linkTokensMap
)};`;
const tsCodeKeeperRegistries = `export const keeperRegistriesRegistry = ${JSON.stringify(
  keeperRegistriesMap
)};`;
const tsCodeL2Sequencers = `export const l2SequencersRegistry = ${JSON.stringify(
  l2SequencersMap
)};`;

fs.writeFileSync("../networksRegistry.ts", tsCodeNetworks);
fs.writeFileSync("../dataFeedsRegistry.ts", tsCodeDataFeeds);
fs.writeFileSync("../feedRegistriesRegistry.ts", tsCodeFeedRegistries);
fs.writeFileSync("../vrfCoordinatorsRegistry.ts", tsCodeVRFCoordinators);
fs.writeFileSync("../functionOraclesRegistry.ts", tsCodeFunctionOracles);
fs.writeFileSync("../linkTokensRegistry.ts", tsCodeLinkTokens);
fs.writeFileSync("../keeperRegistriesRegistry.ts", tsCodeKeeperRegistries);
fs.writeFileSync("../l2SequencersRegistry.ts", tsCodeL2Sequencers);
