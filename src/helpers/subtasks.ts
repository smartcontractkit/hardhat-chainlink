import { subtask } from "hardhat/config";

import { subtasksRegistry, Task } from "../registries";

import { PACKAGE_NAME } from "./constants";

export const registerSubtasks = () => {
  for (const taskName of Object.keys(Task)) {
    const subtasks = subtasksRegistry[taskName] ?? {};
    for (const subtaskName of Object.keys(subtasks)) {
      const subtaskProperties = subtasks[subtaskName];
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
