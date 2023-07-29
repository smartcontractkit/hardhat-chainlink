import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/types";

import "../../../src/index";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
  },
};

export default config;
