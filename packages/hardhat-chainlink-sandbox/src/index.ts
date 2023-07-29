import { extendConfig, extendEnvironment, task } from "hardhat/config";
import { lazyObject } from "hardhat/plugins";
import {
  HardhatConfig,
  HardhatRuntimeEnvironment,
  HardhatUserConfig,
} from "hardhat/types";

import { HardhatChainlink } from "./HardhatChainlink";
import { PACKAGE_NAME } from "./shared/constants";
import { Task } from "./shared/enums";
import { printSubtasks, registerSubtasks } from "./subtasks/helpers";
import { resolveTask } from "./tasks/helpers";
import "./type-extensions";

export interface ChainlinkUserConfig {
  confirmations?: number;
}

// Add our types to the Hardhat config
declare module "hardhat/types/config" {
  interface HardhatUserConfig {
    chainlink?: ChainlinkUserConfig;
  }

  interface HardhatConfig {
    chainlink: ChainlinkUserConfig;
  }
}

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    const { confirmations } = userConfig.chainlink ?? {};
    config.chainlink = {
      confirmations: confirmations || 1,
    };
  }
);

extendEnvironment((hre: HardhatRuntimeEnvironment) => {
  hre.chainlink = lazyObject(() => new HardhatChainlink(hre));
});

// SANDBOX
task(`${PACKAGE_NAME}:${Task.sandbox}`, "Sandbox Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.sandbox, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.sandbox}:subtasks`,
  "Sandbox Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.sandbox);
});

registerSubtasks();
