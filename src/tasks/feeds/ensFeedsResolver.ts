import { ActionType } from "hardhat/types";

import * as ensFeedsResolver from "../../feeds/ensFeedsResolver";

export const resolveAggregatorAddress: ActionType<{
  baseTick: string;
  quoteTick: string;
}> = async (taskArgs, hre) => {
  return ensFeedsResolver.resolveAggregatorAddress(
    hre,
    taskArgs.baseTick,
    taskArgs.quoteTick
  );
};

export const resolveAggregatorAddressWithSubdomains: ActionType<{
  baseTick: string;
  quoteTick: string;
}> = async (taskArgs, hre) => {
  return ensFeedsResolver.resolveAggregatorAddressWithSubdomains(
    hre,
    taskArgs.baseTick,
    taskArgs.quoteTick
  );
};
