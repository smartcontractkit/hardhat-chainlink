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
  node?: {
    chain_id?: string;
    chain_name?: string;
    http_url?: string;
    ws_url?: string;
    cl_keystore_password?: string;
    cl_api_user?: string;
    cl_api_password?: string;
    pg_user?: string;
    pg_password?: string;
    pg_db?: string;
  };
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
    const { confirmations, node } = userConfig.chainlink ?? {};
    config.chainlink = {
      confirmations: confirmations || 1,
      node: {
        chain_id: node?.chain_id,
        chain_name: node?.chain_name,
        http_url: node?.http_url,
        ws_url: node?.ws_url,
        cl_keystore_password: node?.cl_keystore_password,
        cl_api_user: node?.cl_api_user,
        cl_api_password: node?.cl_api_password,
        pg_user: node?.pg_user,
        pg_password: node?.pg_password,
        pg_db: node?.pg_db,
      },
    };
  }
);

extendEnvironment((hre: HardhatRuntimeEnvironment) => {
  hre.chainlink = lazyObject(() => new HardhatChainlink(hre));
});

// DATA FEEDS
task(`${PACKAGE_NAME}:${Task.dataFeed}`, "Data Feeds Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.dataFeed, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.dataFeed}:subtasks`,
  "Data Feeds Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.dataFeed);
});

// DATA FEEDS PROXY
task(`${PACKAGE_NAME}:${Task.dataFeedProxy}`, "Data Feeds Proxy Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.dataFeedProxy, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.dataFeedProxy}:subtasks`,
  "Data Feeds Proxy Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.dataFeedProxy);
});

// DATA FEED REGISTRIES
task(`${PACKAGE_NAME}:${Task.feedRegistry}`, "Feed Registries Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.feedRegistry, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.feedRegistry}:subtasks`,
  "Feed Registries Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.feedRegistry);
});

// ENS FEEDS RESOLVER
task(`${PACKAGE_NAME}:${Task.ens}`, "ENS Feeds Resolver Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.ens, taskArgs);
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
    return resolveTask(hre, Task.l2Sequencer, taskArgs);
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
    return resolveTask(hre, Task.vrf, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.vrf}:subtasks`,
  "VRF Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.vrf);
});

// AUTOMATION REGISTRAR
task(
  `${PACKAGE_NAME}:${Task.automationRegistrar}`,
  "Automation Registrar Module"
)
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.automationRegistrar, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.automationRegistrar}:subtasks`,
  "Automation Registrar Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.automationRegistrar);
});

// AUTOMATION REGISTRY
task(`${PACKAGE_NAME}:${Task.automationRegistry}`, "Automation Registry Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.automationRegistry, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.automationRegistry}:subtasks`,
  "Automation Registry Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.automationRegistry);
});

// FUNCTIONS
task(`${PACKAGE_NAME}:${Task.functions}`, "Functions Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.functions, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.functions}:subtasks`,
  "Functions Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.functions);
});

// CCIP
task(`${PACKAGE_NAME}:${Task.ccip}`, "CCIP Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.ccip, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.ccip}:subtasks`,
  "CCIP Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.ccip);
});

// REGISTRIES
task(`${PACKAGE_NAME}:${Task.registries}`, "Plugin Registries Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.registries, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.registries}:subtasks`,
  "Plugin Registries Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.registries);
});

// NODE
task(`${PACKAGE_NAME}:${Task.node}`, "Chainlink Node Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.node, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.node}:subtasks`,
  "Chainlink Node Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.node);
});

// OPERATOR
task(`${PACKAGE_NAME}:${Task.operator}`, "Operator Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.operator, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.operator}:subtasks`,
  "Operator Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.operator);
});

// DIRECT REQUEST CONSUMER
task(`${PACKAGE_NAME}:${Task.directRequestConsumer}`, "Direct Request Consumer Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.directRequestConsumer, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.directRequestConsumer}:subtasks`,
  "Direct Request Consumer Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.directRequestConsumer);
});

// LINK TOKEN
task(`${PACKAGE_NAME}:${Task.linkToken}`, "Link Token Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.linkToken, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.linkToken}:subtasks`,
  "Link Token Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.linkToken);
});

// FUNCTIONS SIMULATION
task(
  `${PACKAGE_NAME}:${Task.functionsSimulation}`,
  "Functions Simulation Module"
)
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.functionsSimulation, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.functionsSimulation}:subtasks`,
  "Functions Simulation Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.functionsSimulation);
});

// UTILS
task(`${PACKAGE_NAME}:${Task.utils}`, "Plugin Utils Module")
  .addOptionalPositionalParam("subtask", "Subtask")
  .addOptionalParam("args", "Subtask args")
  .setAction(async (taskArgs, hre) => {
    return resolveTask(hre, Task.utils, taskArgs);
  });

task(
  `${PACKAGE_NAME}:${Task.utils}:subtasks`,
  "Plugin Utils Module: Subtasks List"
).setAction(async () => {
  printSubtasks(Task.utils);
});

registerSubtasks();
