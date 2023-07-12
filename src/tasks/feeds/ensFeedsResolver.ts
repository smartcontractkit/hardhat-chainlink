import { ActionType } from "hardhat/types";

import * as feeds from "../../feeds";

export const resolveAggregatorAddress: ActionType<{
  baseTick: string;
  quoteTick: string;
}> = async (taskArgs, hre) => {
  return feeds.resolveAggregatorAddress(
    hre,
    taskArgs.baseTick,
    taskArgs.quoteTick
  );
};

export const resolveAggregatorAddressWithSubdomains: ActionType<{
  baseTick: string;
  quoteTick: string;
}> = async (taskArgs, hre) => {
  return feeds.resolveAggregatorAddressWithSubdomains(
    hre,
    taskArgs.baseTick,
    taskArgs.quoteTick
  );
};
