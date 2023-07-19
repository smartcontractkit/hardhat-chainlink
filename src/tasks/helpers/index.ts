import { HardhatRuntimeEnvironment } from "hardhat/types";

import { inquire, inquireSubtaskProperties } from "../../helpers/inquirers";
import { printResult } from "../../helpers/utils";
import { PACKAGE_NAME } from "../../shared/constants";
import { Task } from "../../shared/enums";
import { subtasks } from "../../subtasks";

export const resolveTask = async (
  hre: HardhatRuntimeEnvironment,
  taskName: Task,
  taskArgs: any
) => {
  const subtaskProperties = await (async () => {
    if (taskArgs.subtask) {
      return subtasks[taskName][taskArgs.subtask];
    }
    return inquireSubtaskProperties(taskName);
  })();

  if (!subtaskProperties) {
    console.log("Subtask not provided or not found. Stop");
    return;
  }

  const subtaskArgs: Record<string, string> = JSON.parse(taskArgs.args || "{}");
  for (const subtaskArg of subtaskProperties.args) {
    if (subtaskArgs[subtaskArg.name] === undefined) {
      subtaskArgs[subtaskArg.name] = await inquire(hre, subtaskArg.name);
    }
  }

  const result = await hre.run(
    `${PACKAGE_NAME}:${taskName}:${subtaskProperties.command}`,
    subtaskArgs
  );
  printResult(result);
};
