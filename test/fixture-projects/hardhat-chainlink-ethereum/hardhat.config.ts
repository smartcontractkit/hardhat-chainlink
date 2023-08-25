import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/types";

import "../../../src/index";

const config: HardhatUserConfig = {
  defaultNetwork: "ethereum",
  networks: {
    ethereum: {
      url: "https://ethereum.publicnode.com", // Public RPC node, skipping tests using it in Github Actions
      accounts: [
        "ffd78ff52b10e30f9d9b61dc7d0f44ceb5727b9383d28c9d19983a6df6c6ceaf", // Random PK
      ],
      chainId: 1,
    },
  },
  solidity: "0.8.18",
};

export default config;
