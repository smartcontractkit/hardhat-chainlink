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

// DATA FEEDS
task(`${PACKAGE_NAME}:${Task.dataFeeds}`, "Data Feeds Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    await resolveTask(hre, Task.dataFeeds, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.dataFeeds}:subtasks`,
  "Data Feeds Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.dataFeeds);
});

// DATA FEEDS
task(`${PACKAGE_NAME}:${Task.feedRegistries}`, "Feed Registries Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    await resolveTask(hre, Task.feedRegistries, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.feedRegistries}:subtasks`,
  "Feed Registries Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.feedRegistries);
});

// ENS FEEDS RESOLVER
task(`${PACKAGE_NAME}:${Task.ens}`, "ENS Feeds Resolver Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    await resolveTask(hre, Task.ens, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.ens}:subtasks`,
  "ENS Feeds Resolver Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.ens);
});

// LAYER 2 FEED UPTIME SEQUENCER
task(`${PACKAGE_NAME}:${Task.l2Sequencer}`, "L2 Feeds Uptime Sequencers Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    await resolveTask(hre, Task.l2Sequencer, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.l2Sequencer}:subtasks`,
  "L2 Feeds Uptime Sequencers Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.l2Sequencer);
});

// VRF
task(`${PACKAGE_NAME}:${Task.vrf}`, "VRF Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    await resolveTask(hre, Task.vrf, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.vrf}:subtasks`,
  "VRF Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.vrf);
});

// AUTOMATION
task(`${PACKAGE_NAME}:${Task.automation}`, "Automation Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    await resolveTask(hre, Task.automation, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.automation}:subtasks`,
  "Automation Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.automation);
});

// SANDBOX
task(`${PACKAGE_NAME}:${Task.sandbox}`, "Sandbox Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    await resolveTask(hre, Task.sandbox, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.sandbox}:subtasks`,
  "Sandbox Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.sandbox);
});

// REGISTRIES
task(`${PACKAGE_NAME}:${Task.registries}`, "Plugin Registries Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    await resolveTask(hre, Task.registries, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.registries}:subtasks`,
  "Plugin Registries Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.registries);
});

registerSubtasks();
