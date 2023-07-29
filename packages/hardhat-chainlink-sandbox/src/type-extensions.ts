import "hardhat/types/config";
import "hardhat/types/runtime";

import { HardhatChainlink } from "./HardhatChainlink";

declare module "hardhat/types/config" {}

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    chainlink: HardhatChainlink;
  }
}
