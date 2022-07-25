// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";
import { HardhatChainlink } from "../src/HardhatChainlink";
import { useEnvironment } from "./helpers";

describe("Hardhat Chainlink Tests", function () {
  useEnvironment("hardhat-chainlink");

  it("Should add the example field", function () {
    assert.instanceOf(this.hre.chainlink, HardhatChainlink);
  });
});
