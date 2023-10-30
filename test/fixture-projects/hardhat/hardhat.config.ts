import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/types";

import "../../../src/index";

const config: HardhatUserConfig = {
  chainlink: {
    functions_simulation: {
      secrets: { test: "hello world" },
    },
  },
};

export default config;
