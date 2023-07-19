import { subtask } from "hardhat/config";

import { subtasks } from "../";
import { PACKAGE_NAME, SUBTASK_PADDING } from "../../shared/constants";
import { Task } from "../../shared/enums";
import { SubtaskProperties } from "../interfaces";

export const registerSubtasks = () => {
  for (const taskName of Object.keys(Task)) {
    const taskSubtasks = subtasks[taskName] ?? {};
    for (const subtaskName of Object.keys(taskSubtasks)) {
      const subtaskProperties = taskSubtasks[subtaskName];
      const subtaskDefinition = subtask(
        `${PACKAGE_NAME}:${taskName}:${subtaskProperties.command}`
      );
      subtaskProperties.args.forEach((subtaskArg) => {
        subtaskDefinition.addParam(
          subtaskArg.name,
          subtaskArg.description,
          subtaskArg.defaultValue
        );
      });
      subtaskDefinition.setAction(subtaskProperties.action);
    }
  }
};
