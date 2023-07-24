import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  typechain: {
    outDir: "./types",
    target: "ethers-v5",
    alwaysGenerateOverloads: false,
    externalArtifacts: [
      "./node_modules/@chainlink/contracts/abi/v0.7/AggregatorProxyInterface.json",
      "./node_modules/@chainlink/contracts/abi/v0.8/KeeperRegistry1_3.json",
      "./node_modules/@chainlink/contracts/abi/v0.8/KeeperRegistrar.json",
      "./node_modules/@chainlink/contracts/abi/v0.8/LinkTokenInterface.json",
      "./node_modules/@chainlink/contracts/abi/v0.8/AggregatorV2V3Interface.json",
      "./node_modules/@chainlink/contracts/abi/v0.8/FeedRegistryInterface.json",
      "./node_modules/@chainlink/contracts/abi/v0.8/OptimismSequencerUptimeFeed.json",
      "./node_modules/@chainlink/contracts/abi/v0.8/VRFCoordinatorV2.json",
    ],
  },
};

export default config;
