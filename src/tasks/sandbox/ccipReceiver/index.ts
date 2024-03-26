import fs from "fs";
import { ActionType } from "hardhat/types";
import path from "path";

import * as ccipReceiver from "../../../sandbox/ccipReceiver";
import { CCIPMessage } from "../../../shared/types";

export const deploy: ActionType<{
  ccipRouterAddress: string;
}> = async (taskArgs, hre): Promise<string> => {
  return ccipReceiver.deploy(hre, taskArgs.ccipRouterAddress);
};

export const getRouterAddress: ActionType<{
  ccipReceiverAddress: string;
}> = async (taskArgs, hre): Promise<string> => {
  return ccipReceiver.getRouterAddress(hre, taskArgs.ccipReceiverAddress);
};

export const estimateGas: ActionType<{
  ccipReceiverAddress: string;
  ccipMessageJsonPath: string;
  destinationChainRpcUrl: string;
  destinationChainBlockId: string;
  isForking: string;
}> = async (taskArgs, hre): Promise<string> => {
  const ccipMessageRaw = fs.readFileSync(
    path.resolve(taskArgs.ccipMessageJsonPath)
  );
  const ccipMessage: CCIPMessage = JSON.parse(ccipMessageRaw.toString());
  const result = await ccipReceiver.estimateGas(
    hre,
    taskArgs.ccipReceiverAddress,
    ccipMessage,
    {
      destinationChainRpcUrl:
        taskArgs.destinationChainRpcUrl === ""
          ? undefined
          : taskArgs.destinationChainRpcUrl,
      destinationChainBlockId:
        taskArgs.destinationChainBlockId === ""
          ? undefined
          : taskArgs.destinationChainBlockId,
      isForking: taskArgs.isForking === "true",
    }
  );
  return result.toString();
};
