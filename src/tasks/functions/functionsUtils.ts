import { DecodedResult } from "@chainlink/functions-toolkit/dist/decodeResult";
import {
  FunctionsRequestParams,
  RequestCommitment,
  ReturnType,
} from "@chainlink/functions-toolkit/dist/types";
import { ActionType } from "hardhat/types";

import * as functionsUtils from "../../functions/functionsUtils";

export const buildRequestCBOR: ActionType<{
  requestParams: FunctionsRequestParams;
}> = async (taskArgs, _): Promise<string> => {
  return functionsUtils.buildRequestCBOR(taskArgs.requestParams);
};

export const fetchRequestCommitment: ActionType<{
  functionsRouterAddress: string;
  requestId: string;
  donId: string;
  toBlock?: number;
  pastBlocksToSearch?: number;
}> = async (taskArgs, hre): Promise<RequestCommitment> => {
  return functionsUtils.fetchRequestCommitment(
    hre,
    taskArgs.functionsRouterAddress,
    taskArgs.requestId,
    taskArgs.donId,
    taskArgs.toBlock,
    taskArgs.pastBlocksToSearch
  );
};

export const decodeResult: ActionType<{
  resultHexstring: string;
  expectedReturnType: ReturnType;
}> = async (taskArgs, _): Promise<DecodedResult> => {
  return functionsUtils.decodeResult(
    taskArgs.resultHexstring,
    taskArgs.expectedReturnType
  );
};
