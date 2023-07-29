import { HardhatRuntimeEnvironment } from "hardhat/types";

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
    return [undefined, undefined];
  })();

  if (!subtaskProperties) {
    console.log("Subtask not provided or not found. Stop");
    return;
  }

  const subtaskArgs: Record<string, string> = JSON.parse(taskArgs.args || "{}");

  const result = await hre.run(
    `${PACKAGE_NAME}:${taskName}:${subtaskName}`,
    subtaskArgs
  );
  printResult(result);
  return result;
};
