import { HardhatRuntimeEnvironment } from "hardhat/types";

import { subtasksRegistry, Task } from "../registries";
import { inquire, inquireSubtask } from "../registries/helpers";

import { PACKAGE_NAME } from "./constants";
import { printResult } from "./utils";

export const resolveTask = async (
  hre: HardhatRuntimeEnvironment,
  taskName: Task,
  taskArgs: any
) => {
  const subtaskProperties = await (async () => {
    if (taskArgs.subtask) {
      return subtasksRegistry[taskName][taskArgs.subtask];
    }
    return inquireSubtask(taskName);
  })();

  if (!subtaskProperties) {
    console.log("Subtask not provided or not found. Stop");
    return;
  }

  const args: Record<string, string> = {};
  for (const subtaskArg of subtaskProperties.args) {
    if (taskArgs[subtaskArg.name] === undefined) {
      args[subtaskArg.name] = await inquire(hre, subtaskArg.name);
    } else {
      args[subtaskArg.name] = taskArgs[subtaskArg.name];
    }
  }

  const result = await hre.run(
    `${PACKAGE_NAME}:${taskName}:${subtaskProperties.command}`,
    args
  );
  printResult(result);
};
