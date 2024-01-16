import * as functionsToolkit from "@chainlink/functions-toolkit";

export const simulateRequest = async (
  source: string,
  secrets: Record<string, string>,
  args: string[],
  bytesArgs: string[]
): Promise<functionsToolkit.SimulationResult> => {
  return functionsToolkit.simulateScript({
    source,
    secrets,
    args,
    bytesArgs,
  });
};
