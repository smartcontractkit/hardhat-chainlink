import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/types";

import "../../../src/index";

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
        version: "0.8.6",
        settings: commonCompilerSettings,
      },
      {
        version: "0.7.6",
        settings: commonCompilerSettings,
      },
      {
        version: "0.6.6",
        settings: commonCompilerSettings,
      },
      {
        version: "0.4.24",
        settings: commonCompilerSettings,
      },
    ],
  },
};

export default config;
