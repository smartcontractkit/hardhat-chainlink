import "@nomiclabs/hardhat-ethers";
import { BigNumber } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import * as sandbox from "../src/sandbox";

export class HardhatChainlink {
  public sandbox: Sandbox;
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
    this.sandbox = new Sandbox(this.hre);
  }
}

class Sandbox {
  private hre: HardhatRuntimeEnvironment;

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre;
  }

  public async deploy(): Promise<BigNumber> {
    return sandbox.deploy();
  }
}
