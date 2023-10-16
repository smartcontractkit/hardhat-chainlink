import * as functionsToolkit from "@chainlink/functions-toolkit";
import {
  FunctionsRequestParams,
  RequestCommitment,
  ReturnType,
} from "@chainlink/functions-toolkit/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export const buildRequestCBOR = async (
  requestParams: FunctionsRequestParams
): Promise<string> => {
  return functionsToolkit.buildRequestCBOR(requestParams);
};

export const fetchRequestCommitment = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  requestId: string,
  donId: string,
  toBlock?: number | "latest",
  pastBlocksToSearch?: number
): Promise<RequestCommitment> => {
  return functionsToolkit.fetchRequestCommitment({
    requestId,
    provider: hre.ethers.provider,
    functionsRouterAddress,
    donId,
    toBlock,
    pastBlocksToSearch,
  });
};

export const decodeResult = async (
  resultHexstring: string,
  expectedReturnType: ReturnType
) => {
  return functionsToolkit.decodeResult(resultHexstring, expectedReturnType);
};
