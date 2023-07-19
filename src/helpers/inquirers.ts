import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import select from "@inquirer/select";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import * as registries from "../registries";
import { InquirableParameter, Task } from "../shared/enums";
import {
  Choice,
  DataFeedsRegistry,
  DenominationsRegistry,
  FeedRegistriesRegistry,
  FunctionOraclesRegistry,
  KeeperRegistriesRegistry,
  L2SequencersRegistry,
  LinkTokensRegistry,
  NetworksRegistry,
  VRFCoordinatorsRegistry,
} from "../shared/types";
import { subtasks } from "../subtasks";
import { SubtaskProperties } from "../subtasks/interfaces";

import { camelToFlat } from "./utils";

export const inquire = async (
  hre: HardhatRuntimeEnvironment,
  parameter: string
) => {
  switch (parameter) {
    case InquirableParameter.dataFeedAddress:
      return inquireDataFeedAddress(hre);
    case InquirableParameter.feedRegistryAddress:
      return inquireFeedRegistryAddress(hre);
    case InquirableParameter.vrfCoordinatorAddress:
      return inquireVRFCoordinatorAddress(hre);
    case InquirableParameter.linkTokenAddress:
      return inquireLinkTokenAddress(hre);
    case InquirableParameter.keeperRegistryAddress:
      return inquireKeeperRegistryAddress(hre);
    case InquirableParameter.keeperRegistrarAddress:
      return inquireKeeperRegistrarAddress(hre);
    case InquirableParameter.l2SequencerAddress:
      return inquireL2SequencerAddress(hre);
    case InquirableParameter.functionOracleAddress:
      return inquireFunctionOracleAddress(hre);
    case InquirableParameter.feedRegistryBaseTick:
      return inquireFeedRegistryBaseTick();
    case InquirableParameter.feedRegistryQuoteTick:
      return inquireFeedRegistryQuoteTick();
    default:
      return inquireInput(camelToFlat(parameter));
  }
};

export const inquireInput = async (parameter: string) => {
  return input({
    message: `Provide a ${parameter}`,
  });
};

export const inquireDataFeedAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const networksRegistry: NetworksRegistry =
    registries.networksRegistry as NetworksRegistry;

  const dataFeedsRegistry: DataFeedsRegistry =
    registries.dataFeedsRegistry as DataFeedsRegistry;

  let chainSlug = "";
  if (useHardhatNetwork) {
    const chainId = hre.network.config.chainId;
    if (!chainId) {
      console.log(
        "Could not identify network, chainId is not specified in hardhat.config."
      );
      return input({
        message: "Provide a valid Data Feed address",
      });
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(networksRegistry).reduce((agg, network) => {
        agg.push({
          name: network.name,
          value: network.chainSlug,
          description: network.name,
        });
        return agg;
      }, [] as Choice[]),
    });
  }

  if (!dataFeedsRegistry[chainSlug]) {
    console.log(
      `There is no Data Feeds in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return input({
      message: "Provide a valid Data Feed address",
    });
  }

  const answer: boolean = await confirm({
    message: "Do you want to select a Data Feed from the plugin registry?",
  });

  if (!answer) {
    return input({
      message: "Provide a valid Data Feed address",
    });
  }

  const baseTick: string = await select({
    message: "Select a base tick",
    choices: Object.keys(dataFeedsRegistry[chainSlug]).reduce((agg, key) => {
      agg.push({
        name: key,
        value: key,
        description: key,
      });
      return agg;
    }, [] as Choice[]),
  });

  const quoteTick: string = await select({
    message: "Select a quote tick",
    choices: Object.keys(dataFeedsRegistry[chainSlug][baseTick]).reduce(
      (agg, key) => {
        agg.push({
          name: key,
          value: key,
          description: key,
        });
        return agg;
      },
      [] as Choice[]
    ),
  });

  return dataFeedsRegistry[chainSlug][baseTick][quoteTick].contractAddress;
};

export const inquireFeedRegistryAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const networksRegistry: NetworksRegistry =
    registries.networksRegistry as NetworksRegistry;

  const feedRegistriesRegistry: FeedRegistriesRegistry =
    registries.feedRegistriesRegistry as FeedRegistriesRegistry;

  let chainSlug = "";
  if (useHardhatNetwork) {
    const chainId = hre.network.config.chainId;
    if (!chainId) {
      console.log(
        "Could not identify network, chainId is not specified in hardhat.config."
      );
      return input({
        message: "Provide a valid Feed Registry address",
      });
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(networksRegistry).reduce((agg, network) => {
        agg.push({
          name: network.name,
          value: network.chainSlug,
          description: network.name,
        });
        return agg;
      }, [] as Choice[]),
    });
  }

  if (!feedRegistriesRegistry[chainSlug]) {
    console.log(
      `There is no Feed Registry in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return input({
      message: "Provide a valid Feed Registry address",
    });
  }

  const feedRegistryAddress = feedRegistriesRegistry[chainSlug].contractAddress;

  const answer: boolean = await confirm({
    message: `Feed Registry found in the plugin registry: ${feedRegistryAddress}. Do you want to proceed with it?`,
  });

  if (!answer) {
    return input({
      message: "Provide a valid Feed Registry address",
    });
  }

  return feedRegistryAddress;
};

export const inquireVRFCoordinatorAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const networksRegistry: NetworksRegistry =
    registries.networksRegistry as NetworksRegistry;

  const vrfCoordinatorsRegistry: VRFCoordinatorsRegistry =
    registries.vrfCoordinatorsRegistry as VRFCoordinatorsRegistry;

  let chainSlug = "";
  if (useHardhatNetwork) {
    const chainId = hre.network.config.chainId;
    if (!chainId) {
      console.log(
        "Could not identify network, chainId is not specified in hardhat.config."
      );
      return input({
        message: "Provide a valid VRF coordinator address",
      });
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(networksRegistry).reduce((agg, network) => {
        agg.push({
          name: network.name,
          value: network.chainSlug,
          description: network.name,
        });
        return agg;
      }, [] as Choice[]),
    });
  }

  if (!vrfCoordinatorsRegistry[chainSlug]) {
    console.log(
      `There is no VRF coordinator in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return input({
      message: "Provide a valid VRF coordinator address",
    });
  }

  const vrfCoordinatorAddress =
    vrfCoordinatorsRegistry[chainSlug].contractAddress;

  const answer: boolean = await confirm({
    message: `VRF coordinator found in the plugin registry: ${vrfCoordinatorAddress}. Do you want to proceed with it?`,
  });

  if (!answer) {
    return input({
      message: "Provide a valid VRF coordinator address",
    });
  }

  return vrfCoordinatorAddress;
};

export const inquireLinkTokenAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const networksRegistry: NetworksRegistry =
    registries.networksRegistry as NetworksRegistry;

  const linkTokensRegistry: LinkTokensRegistry =
    registries.linkTokensRegistry as LinkTokensRegistry;

  let chainSlug = "";
  if (useHardhatNetwork) {
    const chainId = hre.network.config.chainId;
    if (!chainId) {
      console.log(
        "Could not identify network, chainId is not specified in hardhat.config."
      );
      return input({
        message: "Provide a valid Link Token address",
      });
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(networksRegistry).reduce((agg, network) => {
        agg.push({
          name: network.name,
          value: network.chainSlug,
          description: network.name,
        });
        return agg;
      }, [] as Choice[]),
    });
  }

  if (!linkTokensRegistry[chainSlug]) {
    console.log(
      `There is no Link Token in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return input({
      message: "Provide a valid Link Token address",
    });
  }

  const linkTokenAddress = linkTokensRegistry[chainSlug].contractAddress;

  const answer: boolean = await confirm({
    message: `Link Token found in the plugin registry: ${linkTokenAddress}. Do you want to proceed with it?`,
  });

  if (!answer) {
    return input({
      message: "Provide a valid Link Token address",
    });
  }

  return linkTokenAddress;
};

export const inquireKeeperRegistryAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const networksRegistry: NetworksRegistry =
    registries.networksRegistry as NetworksRegistry;

  const keeperRegistriesRegistry: KeeperRegistriesRegistry =
    registries.keeperRegistriesRegistry as KeeperRegistriesRegistry;

  let chainSlug = "";
  if (useHardhatNetwork) {
    const chainId = hre.network.config.chainId;
    if (!chainId) {
      console.log(
        "Could not identify network, chainId is not specified in hardhat.config."
      );
      return input({
        message: "Provide a valid Keeper Registry address",
      });
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(networksRegistry).reduce((agg, network) => {
        agg.push({
          name: network.name,
          value: network.chainSlug,
          description: network.name,
        });
        return agg;
      }, [] as Choice[]),
    });
  }

  if (!keeperRegistriesRegistry[chainSlug]) {
    console.log(
      `There is no Keeper Registry in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return input({
      message: "Provide a valid Keeper Registry address",
    });
  }

  const keeperRegistryAddress =
    keeperRegistriesRegistry[chainSlug].contractAddress;

  const answer: boolean = await confirm({
    message: `Keeper Registry found in the plugin registry: ${keeperRegistryAddress}. Do you want to proceed with it?`,
  });

  if (!answer) {
    return input({
      message: "Provide a valid Keeper Registry address",
    });
  }

  return keeperRegistryAddress;
};

export const inquireKeeperRegistrarAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const networksRegistry: NetworksRegistry =
    registries.networksRegistry as NetworksRegistry;

  const keeperRegistriesRegistry: KeeperRegistriesRegistry =
    registries.keeperRegistriesRegistry as KeeperRegistriesRegistry;

  let chainSlug = "";
  if (useHardhatNetwork) {
    const chainId = hre.network.config.chainId;
    if (!chainId) {
      console.log(
        "Could not identify network, chainId is not specified in hardhat.config."
      );
      return input({
        message: "Provide a valid Keeper Registrar address",
      });
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(networksRegistry).reduce((agg, network) => {
        agg.push({
          name: network.name,
          value: network.chainSlug,
          description: network.name,
        });
        return agg;
      }, [] as Choice[]),
    });
  }

  if (!keeperRegistriesRegistry[chainSlug]) {
    console.log(
      `There is no Keeper Registrar in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return input({
      message: "Provide a valid Keeper Registrar address",
    });
  }

  const keeperRegistrarAddress =
    keeperRegistriesRegistry[chainSlug].registrarAddress;

  const answer: boolean = await confirm({
    message: `Keeper Registrar found in the plugin registry: ${keeperRegistrarAddress}. Do you want to proceed with it?`,
  });

  if (!answer) {
    return input({
      message: "Provide a valid Keeper Registrar address",
    });
  }

  return keeperRegistrarAddress;
};

export const inquireL2SequencerAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const networksRegistry: NetworksRegistry =
    registries.networksRegistry as NetworksRegistry;

  const l2SequencersRegistry: L2SequencersRegistry =
    registries.l2SequencersRegistry as L2SequencersRegistry;

  let chainSlug = "";
  if (useHardhatNetwork) {
    const chainId = hre.network.config.chainId;
    if (!chainId) {
      console.log(
        "Could not identify network, chainId is not specified in hardhat.config."
      );
      return input({
        message: "Provide a valid L2 Sequencer address",
      });
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(networksRegistry).reduce((agg, network) => {
        agg.push({
          name: network.name,
          value: network.chainSlug,
          description: network.name,
        });
        return agg;
      }, [] as Choice[]),
    });
  }

  if (!l2SequencersRegistry[chainSlug]) {
    console.log(
      `There is no L2 Sequencer in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return input({
      message: "Provide a valid L2 Sequencer address",
    });
  }

  const l2SequencerAddress = l2SequencersRegistry[chainSlug].contractAddress;

  const answer: boolean = await confirm({
    message: `L2 Sequencer found in the plugin registry: ${l2SequencerAddress}. Do you want to proceed with it?`,
  });

  if (!answer) {
    return input({
      message: "Provide a valid L2 Sequencer address",
    });
  }

  return l2SequencerAddress;
};

export const inquireFunctionOracleAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const networksRegistry: NetworksRegistry =
    registries.networksRegistry as NetworksRegistry;

  const functionOraclesRegistry: FunctionOraclesRegistry =
    registries.functionOraclesRegistry as FunctionOraclesRegistry;

  let chainSlug = "";
  if (useHardhatNetwork) {
    const chainId = hre.network.config.chainId;
    if (!chainId) {
      console.log(
        "Could not identify network, chainId is not specified in hardhat.config."
      );
      return input({
        message: "Provide a valid Function Oracle address",
      });
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(networksRegistry).reduce((agg, network) => {
        agg.push({
          name: network.name,
          value: network.chainSlug,
          description: network.name,
        });
        return agg;
      }, [] as Choice[]),
    });
  }

  if (!functionOraclesRegistry[chainSlug]) {
    console.log(
      `There is no Function Oracle in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return input({
      message: "Provide a valid Function Oracle address",
    });
  }

  const functionOracleAddress =
    functionOraclesRegistry[chainSlug].contractAddress;

  const answer: boolean = await confirm({
    message: `Function Oracle found in the plugin registry: ${functionOracleAddress}. Do you want to proceed with it?`,
  });

  if (!answer) {
    return input({
      message: "Provide a valid Function Oracle address",
    });
  }

  return functionOracleAddress;
};

export const inquireFeedRegistryBaseTick = async () => {
  const answer: boolean = await confirm({
    message:
      "Do you want to select a Denomination as base tick from the plugin registry?",
  });

  if (answer) {
    return inquireDenomination();
  } else {
    return input({
      message: "Provide a valid base tick address",
    });
  }
};

export const inquireFeedRegistryQuoteTick = async () => {
  const answer: boolean = await confirm({
    message:
      "Do you want to select a Denomination as quote tick from the plugin registry?",
  });

  if (answer) {
    return inquireDenomination();
  } else {
    return input({
      message: "Provide a valid quote tick address",
    });
  }
};

export const inquireDenomination = async () => {
  const denominationsRegistry: DenominationsRegistry =
    registries.denominationsRegistry as DenominationsRegistry;
  const denomination: string = await select({
    message: "Select a quote tick denomination",
    choices: Object.keys(denominationsRegistry).reduce((agg, key: string) => {
      agg.push({
        name: key,
        value: denominationsRegistry[key],
        description: key,
      });
      return agg;
    }, [] as Choice[]),
  });
  return denomination;
};

export const inquireSubtaskProperties = async (
  task: Task
): Promise<SubtaskProperties> => {
  const subtasksAvailable = subtasks[task];
  const subtaskName = await select({
    message: "Select a subtask",
    choices: Object.keys(subtasksAvailable).reduce((agg, key) => {
      agg.push({
        name: key,
        value: key,
        description: subtasksAvailable[key].description,
      });
      return agg;
    }, [] as Choice[]),
  });
  return subtasks[task][subtaskName];
};
