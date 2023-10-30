import { ActionType } from "hardhat/types";

import * as functionsSimulations from "../../../sandbox/functionsSimulations";

export const simulateRequest: ActionType<{
  source: string;
  args?: string;
  bytesArgs?: string;
}> = async (taskArgs, hre): Promise<string> => {
  const args = taskArgs.args
    ? taskArgs.args.split(",").map((value) => value.trim())
    : [];
  const bytesArgs = taskArgs.bytesArgs
    ? taskArgs.bytesArgs.split(",").map((value) => value.trim())
    : [];
  const decodedResult = await functionsSimulations.simulateRequest(
    hre,
    taskArgs.source,
    args,
    bytesArgs
  );
  return decodedResult.toString();
};
