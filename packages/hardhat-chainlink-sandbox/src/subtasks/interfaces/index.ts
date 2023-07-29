import { ActionType } from "hardhat/types";

interface SubtaskArg {
  name: string;
  description?: string;
  defaultValue?: any;
}

export interface SubtaskProperties {
  action: ActionType<any>;
  command: string;
  args: SubtaskArg[];
  description: string;
}
