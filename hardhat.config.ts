import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import { HardhatUserConfig } from "hardhat/config";

const commonCompilerSettings = {
  optimizer: {
    enabled: true,
    runs: 200,
  },
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: commonCompilerSettings,
      },
      {
        version: "0.7.6",
        settings: commonCompilerSettings,
      },
      {
        version: "0.4.24",
        settings: commonCompilerSettings,
      },
    ],
  },
  typechain: {
    outDir: "./types",
    target: "ethers-v5",
    alwaysGenerateOverloads: false,
    externalArtifacts: [
      "./chainlink-artifacts/AggregatorProxyInterface.json",
      "./chainlink-artifacts/KeeperRegistry1_2.json",
      "./chainlink-artifacts/KeeperRegistry1_3.json",
      "./chainlink-artifacts/KeeperRegistry2_0.json",
      "./chainlink-artifacts/KeeperRegistrar.json",
      "./chainlink-artifacts/KeeperRegistrar2_0.json",
      "./chainlink-artifacts/LinkTokenInterface.json",
      "./chainlink-artifacts/AggregatorV2V3Interface.json",
      "./chainlink-artifacts/FeedRegistryInterface.json",
      "./chainlink-artifacts/TypeAndVersionInterface.json",
      "./chainlink-artifacts/OptimismSequencerUptimeFeed.json",
      "./chainlink-artifacts/VRFCoordinatorV2.json",
    ],
  },
};

export default config;
