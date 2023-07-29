import chalk from "chalk";
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
        `${PACKAGE_NAME}:${taskName}:${subtaskName}`
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

export const printSubtasks = (task: Task) => {
  console.log(
    `${chalk.red.bold("Usage:")} npx hardhat ${chalk.blue(
      PACKAGE_NAME
    )}:${chalk.cyan(task)} ${chalk.bold("[subtask]")} ${chalk.bold("[--args]")}`
  );
  console.log("");
  console.log(`${chalk.bold("[subtask]")}    Specify the subtask to execute.`);
  console.log(
    `${chalk.bold("[--args]")}     ${chalk.greenBright(
      "Optional."
    )} Provide additional arguments as a valid JSON string, e.g '{"name":"value"}'.`
  );
  console.log("");
  console.log(`${chalk.red.bold("AVAILABLE SUBTASKS:")}`);
  console.log("");
  for (const [subtaskName, subtaskProperties] of Object.entries(
    subtasks[task]
  )) {
    printSubtaskProperties(subtaskName, subtaskProperties);
  }
};

export const printSubtaskProperties = (
  subtaskName: string,
  subtaskProperties: SubtaskProperties
) => {
  if (subtaskName.length < SUBTASK_PADDING) {
    console.log(
      `  ${chalk.bold(subtaskName.padEnd(SUBTASK_PADDING))}${chalk.italic(
        subtaskProperties.description
      )}`
    );
  } else {
    console.log(`  ${chalk.bold(subtaskName)}`);
    console.log(
      `  ${"".padEnd(SUBTASK_PADDING)}${chalk.italic(
        subtaskProperties.description
      )}`
    );
  }
  subtaskProperties.args.forEach((arg) => {
    console.log(
      `  ${"".padEnd(SUBTASK_PADDING)}- ${chalk.greenBright(arg.name)} ${
        arg.description
      } ${arg.defaultValue ? `default: ${arg.defaultValue}` : ""}`
    );
  });
  console.log("");
};
