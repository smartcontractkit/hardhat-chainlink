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
  const [subtaskName, subtaskProperties] = await (async () => {
    if (taskArgs.subtask) {
      return [taskArgs.subtask, subtasks[taskName][taskArgs.subtask]];
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
    `${PACKAGE_NAME}:${taskName}:${subtaskName}`,
    subtaskArgs
  );
  printResult(result);
  return result;
};
