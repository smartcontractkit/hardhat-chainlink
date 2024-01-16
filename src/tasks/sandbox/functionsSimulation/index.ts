import { ActionType } from "hardhat/types";

import * as functionsSimulations from "../../../sandbox/functionsSimulations";

export const simulateRequest: ActionType<{
  source: string;
  secrets?: string;
  args?: string;
  bytesArgs?: string;
}> = async (taskArgs, hre): Promise<string> => {
  const secrets = taskArgs.secrets ? JSON.parse(taskArgs.secrets) : {};
  const args = taskArgs.args
    ? taskArgs.args.split(",").map((value) => value.trim())
    : [];
  const bytesArgs = taskArgs.bytesArgs
    ? taskArgs.bytesArgs.split(",").map((value) => value.trim())
    : [];
  const simulationResult = await functionsSimulations.simulateRequest(
    taskArgs.source,
    secrets,
    args,
    bytesArgs
  );
  return JSON.stringify(simulationResult);
};
