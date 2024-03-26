import {
  CodeLanguage,
  Location,
} from "@chainlink/functions-toolkit/dist/types";
import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import select from "@inquirer/select";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import * as registries from "../registries";
import { InquirableParameter, Task } from "../shared/enums";
import {
  CCIPRoutersRegistry,
  Choice,
  DataFeedsRegistry,
  DenominationsRegistry,
  FeedRegistriesRegistry,
  FunctionsRoutersRegistry,
  KeeperRegistriesRegistry,
  L2SequencersRegistry,
  LinkTokensRegistry,
  NetworksRegistry,
  VRFCoordinatorsRegistry,
} from "../shared/types";
import { subtasks } from "../subtasks";
import { SubtaskProperties } from "../subtasks/interfaces";

import { camelToFlat, kebabToCamelCase } from "./utils";

export const inquire = async (
  hre: HardhatRuntimeEnvironment,
  parameterName: string,
  defaultValue: any,
  isBoolean: boolean = false
) => {
  switch (parameterName) {
    case InquirableParameter.dataFeedAddress:
      return inquireDataFeedAddress(hre);
    case InquirableParameter.dataFeedProxyAddress:
      return inquireDataFeedProxyAddress(hre);
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
    case InquirableParameter.functionsRouterAddress:
      return inquireFunctionsRouterAddress(hre);
    case InquirableParameter.ccipRouterAddress:
      return inquireCCIPRouterAddress(hre);
    case InquirableParameter.donId:
      return inquireDonId(hre);
    case InquirableParameter.codeLocation:
    case InquirableParameter.secretsLocation:
      return inquireLocation();
    case InquirableParameter.codeLanguage:
      return inquireCodeLanguage();
    case InquirableParameter.feedRegistryBaseTick:
      return inquireFeedRegistryBaseTick();
    case InquirableParameter.feedRegistryQuoteTick:
      return inquireFeedRegistryQuoteTick();
    default:
      return inquireInput(camelToFlat(parameterName), defaultValue, isBoolean);
  }
};

export const inquireInput = async (
  parameterName: string,
  defaultValue: any,
  isBoolean: boolean = false
) => {
  if (isBoolean) {
    const result = await confirm({
      message: `${parameterName}`,
    });

    return result.toString();
  }
  return input({
    message: `Provide a ${parameterName}`,
    default: defaultValue,
  });
};

export const inquireDataFeed = async (
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
      return undefined;
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(Object.keys(dataFeedsRegistry)).reduce(
        (agg, networkName) => {
          agg.push({
            name: networksRegistry[networkName].name,
            value: kebabToCamelCase(networksRegistry[networkName].chainSlug),
            description: networksRegistry[networkName].name,
          });
          return agg;
        },
        [] as Choice[]
      ),
    });
  }

  if (!dataFeedsRegistry[chainSlug]) {
    console.log(
      `There is no Data Feeds in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return undefined;
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

  return dataFeedsRegistry[chainSlug][baseTick][quoteTick];
};

export const inquireDataFeedAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  let answer: boolean = await confirm({
    message:
      "Do you want to select Data Feed address from the plugin registry?",
  });

  if (!answer) {
    return input({
      message: "Provide a valid Data Feed address",
    });
  }

  const dataFeed = await inquireDataFeed(hre, useHardhatNetwork);
  if (!dataFeed) {
    return input({
      message: "Provide a valid Data Feed address",
    });
  }

  const dataFeedAddress = dataFeed.contractAddress;

  answer = await confirm({
    message: `Data Feed found in the plugin registry: ${dataFeedAddress}. Do you want to proceed with it?`,
  });

  if (!answer) {
    return input({
      message: "Provide a valid Data Feed address",
    });
  }

  return dataFeedAddress;
};

export const inquireDataFeedProxyAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  let answer: boolean = await confirm({
    message:
      "Do you want to select Data Feed Proxy address from the plugin registry?",
  });

  if (!answer) {
    return input({
      message: "Provide a valid Data Feed Proxy address",
    });
  }

  const dataFeed = await inquireDataFeed(hre, useHardhatNetwork);
  if (!dataFeed) {
    return input({
      message: "Provide a valid Data Feed Proxy address",
    });
  }

  const dataFeedProxyAddress = dataFeed.proxyAddress;

  answer = await confirm({
    message: `Data Feed Proxy found in the plugin registry: ${dataFeedProxyAddress}. Do you want to proceed with it?`,
  });

  if (!answer) {
    return input({
      message: "Provide a valid Data Feed Proxy address",
    });
  }

  return dataFeedProxyAddress;
};

export const inquireFeedRegistry = async (
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
      return undefined;
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(Object.keys(feedRegistriesRegistry)).reduce(
        (agg, networkName) => {
          agg.push({
            name: networksRegistry[networkName].name,
            value: kebabToCamelCase(networksRegistry[networkName].chainSlug),
            description: networksRegistry[networkName].name,
          });
          return agg;
        },
        [] as Choice[]
      ),
    });
  }

  if (!feedRegistriesRegistry[chainSlug]) {
    console.log(
      `There is no Feed Registry in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return undefined;
  }

  return feedRegistriesRegistry[chainSlug];
};

export const inquireFeedRegistryAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const feedRegistry = await inquireFeedRegistry(hre, useHardhatNetwork);
  if (!feedRegistry) {
    return input({
      message: "Provide a valid Feed Registry address",
    });
  }

  const feedRegistryAddress = feedRegistry.contractAddress;

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

export const inquireVRFCoordinator = async (
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
      return undefined;
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(Object.keys(vrfCoordinatorsRegistry)).reduce(
        (agg, networkName) => {
          agg.push({
            name: networksRegistry[networkName].name,
            value: kebabToCamelCase(networksRegistry[networkName].chainSlug),
            description: networksRegistry[networkName].name,
          });
          return agg;
        },
        [] as Choice[]
      ),
    });
  }

  if (!vrfCoordinatorsRegistry[chainSlug]) {
    console.log(
      `There is no VRF coordinator in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return undefined;
  }

  return vrfCoordinatorsRegistry[chainSlug];
};

export const inquireVRFCoordinatorAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const vrfCoordinator = await inquireVRFCoordinator(hre, useHardhatNetwork);
  if (!vrfCoordinator) {
    return input({
      message: "Provide a valid VRF coordinator address",
    });
  }

  const vrfCoordinatorAddress = vrfCoordinator.contractAddress;

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

export const inquireLinkToken = async (
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
      return undefined;
    }

    chainSlug = networksRegistry[chainId]?.chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(Object.keys(linkTokensRegistry)).reduce(
        (agg, networkName) => {
          agg.push({
            name: networksRegistry[networkName].name,
            value: kebabToCamelCase(networksRegistry[networkName].chainSlug),
            description: networksRegistry[networkName].name,
          });
          return agg;
        },
        [] as Choice[]
      ),
    });
  }

  if (!linkTokensRegistry[chainSlug]) {
    console.log(
      `There is no Link Token in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return undefined;
  }

  return linkTokensRegistry[chainSlug];
};

export const inquireLinkTokenAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const linkToken = await inquireLinkToken(hre, useHardhatNetwork);
  if (!linkToken) {
    return input({
      message: "Provide a valid Link Token address",
    });
  }

  const linkTokenAddress = linkToken.contractAddress;

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

export const inquireKeeperRegistry = async (
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
      return undefined;
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(Object.keys(keeperRegistriesRegistry)).reduce(
        (agg, networkName) => {
          agg.push({
            name: networksRegistry[networkName].name,
            value: kebabToCamelCase(networksRegistry[networkName].chainSlug),
            description: networksRegistry[networkName].name,
          });
          return agg;
        },
        [] as Choice[]
      ),
    });
  }

  if (!keeperRegistriesRegistry[chainSlug]) {
    console.log(
      `There is no Keeper Registry in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return undefined;
  }

  return keeperRegistriesRegistry[chainSlug];
};

export const inquireKeeperRegistryAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const keeperRegistry = await inquireKeeperRegistry(hre, useHardhatNetwork);
  if (!keeperRegistry) {
    return input({
      message: "Provide a valid Keeper Registry address",
    });
  }

  const keeperRegistryAddress = keeperRegistry.contractAddress;

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
  const keeperRegistrar = await inquireKeeperRegistry(hre, useHardhatNetwork);
  if (!keeperRegistrar) {
    return input({
      message: "Provide a valid Keeper Registrar address",
    });
  }

  const keeperRegistrarAddress = keeperRegistrar.registrarAddress;

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

export const inquireL2Sequencer = async (
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
      return undefined;
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(Object.keys(l2SequencersRegistry)).reduce(
        (agg, networkName) => {
          agg.push({
            name: networksRegistry[networkName].name,
            value: kebabToCamelCase(networksRegistry[networkName].chainSlug),
            description: networksRegistry[networkName].name,
          });
          return agg;
        },
        [] as Choice[]
      ),
    });
  }

  if (!l2SequencersRegistry[chainSlug]) {
    console.log(
      `There is no L2 Sequencer in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return undefined;
  }

  return l2SequencersRegistry[chainSlug];
};

export const inquireL2SequencerAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const l2Sequencer = await inquireL2Sequencer(hre, useHardhatNetwork);
  if (!l2Sequencer) {
    return input({
      message: "Provide a valid L2 Sequencer address",
    });
  }

  const l2SequencerAddress = l2Sequencer.contractAddress;

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

export const inquireFunctionsRouter = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const networksRegistry: NetworksRegistry =
    registries.networksRegistry as NetworksRegistry;

  const functionsRoutersRegistry: FunctionsRoutersRegistry =
    registries.functionsRoutersRegistry as FunctionsRoutersRegistry;

  let chainSlug = "";
  if (useHardhatNetwork) {
    const chainId = hre.network.config.chainId;
    if (!chainId) {
      console.log(
        "Could not identify network, chainId is not specified in hardhat.config."
      );
      return undefined;
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(Object.keys(functionsRoutersRegistry)).reduce(
        (agg, networkName) => {
          agg.push({
            name: networksRegistry[networkName].name,
            value: kebabToCamelCase(networksRegistry[networkName].chainSlug),
            description: networksRegistry[networkName].name,
          });
          return agg;
        },
        [] as Choice[]
      ),
    });
  }

  if (!functionsRoutersRegistry[chainSlug]) {
    console.log(
      `There is no Function Router in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return undefined;
  }

  return functionsRoutersRegistry[chainSlug];
};

export const inquireFunctionsRouterAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const functionsRouter = await inquireFunctionsRouter(hre, useHardhatNetwork);
  if (!functionsRouter) {
    return input({
      message: "Provide a valid Functions Router address",
    });
  }

  const functionsRouterAddress = functionsRouter.contractAddress;

  const answer: boolean = await confirm({
    message: `Functions Router found in the plugin registry: ${functionsRouterAddress}. Do you want to proceed with it?`,
  });

  if (!answer) {
    return input({
      message: "Provide a valid Functions Router address",
    });
  }

  return functionsRouterAddress;
};

export const inquireCCIPRouter = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const networksRegistry: NetworksRegistry =
    registries.networksRegistry as NetworksRegistry;

  const ccipRoutersRegistry: CCIPRoutersRegistry =
    registries.ccipRoutersRegistry as CCIPRoutersRegistry;

  let chainSlug = "";
  if (useHardhatNetwork) {
    const chainId = hre.network.config.chainId;
    if (!chainId) {
      console.log(
        "Could not identify network, chainId is not specified in hardhat.config."
      );
      return undefined;
    }

    chainSlug = networksRegistry[chainId].chainSlug;
  } else {
    chainSlug = await select({
      message: "Select a network",
      choices: Object.values(Object.keys(ccipRoutersRegistry)).reduce(
        (agg, networkName) => {
          agg.push({
            name: networksRegistry[networkName].name,
            value: kebabToCamelCase(networksRegistry[networkName].chainSlug),
            description: networksRegistry[networkName].name,
          });
          return agg;
        },
        [] as Choice[]
      ),
    });
  }

  if (!ccipRoutersRegistry[chainSlug]) {
    console.log(
      `There is no CCIP Router in the plugin registry for the selected chain: ${hre.network.name}`
    );
    return undefined;
  }

  return ccipRoutersRegistry[chainSlug];
};

export const inquireCCIPRouterAddress = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const ccipRouter = await inquireCCIPRouter(hre, useHardhatNetwork);
  if (!ccipRouter) {
    return input({
      message: "Provide a valid CCIP Router address",
    });
  }

  const ccipRouterAddress = ccipRouter.contractAddress;

  const answer: boolean = await confirm({
    message: `CCIP Router found in the plugin registry: ${ccipRouterAddress}. Do you want to proceed with it?`,
  });

  if (!answer) {
    return input({
      message: "Provide a valid CCIP Router address",
    });
  }

  return ccipRouterAddress;
};

export const inquireDonId = async (
  hre: HardhatRuntimeEnvironment,
  useHardhatNetwork: boolean = true
) => {
  const functionsRouter = await inquireFunctionsRouter(hre, useHardhatNetwork);
  if (!functionsRouter) {
    return input({
      message: "Provide a valid Functions Router address",
    });
  }

  const donId = functionsRouter.donId;

  const answer: boolean = await confirm({
    message: `DON ID found in the plugin registry: ${donId}. Do you want to proceed with it?`,
  });

  if (!answer) {
    return input({
      message: "Provide a valid DON ID",
    });
  }

  return donId;
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

export const inquireLocation = async () => {
  const keys = Object.keys(Location);
  const values = Object.values(Location);
  return select({
    message: "Select a location",
    choices: keys.reduce((agg, _, currentIndex) => {
      agg.push({
        name: keys[currentIndex],
        value: values[currentIndex].toString(),
        description: keys[currentIndex],
      });
      return agg;
    }, [] as Choice[]),
  });
};

export const inquireCodeLanguage = async () => {
  const keys = Object.keys(CodeLanguage);
  const values = Object.values(CodeLanguage);
  return select({
    message: "Select a code language",
    choices: keys.reduce((agg, _, currentIndex) => {
      agg.push({
        name: keys[currentIndex],
        value: values[currentIndex].toString(),
        description: keys[currentIndex],
      });
      return agg;
    }, [] as Choice[]),
  });
};

export const inquireSubtaskProperties = async (
  task: Task
): Promise<[string, SubtaskProperties]> => {
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
  return [subtaskName, subtasks[task][subtaskName]];
};
