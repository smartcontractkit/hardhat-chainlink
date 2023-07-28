import { expect } from "chai";

import { PACKAGE_NAME } from "../src/shared/constants";
import { L2SequencerSubtask, Task } from "../src/shared/enums";

import { useEnvironment } from "./helpers";

const isGithubActions = !!process.env.GITHUB_ACTIONS;

describe("Test chainlink:l2Sequencer module [SKIP FOR GITHUB ACTIONS]", function () {
  // Actually, all the sequencers are down
  useEnvironment("hardhat-chainlink-arbitrum-goerli");

  before(async function () {
    this.l2SequencerAddress =
      this.hre.chainlink.registries.l2Sequencers.arbitrumGoerli.contractAddress;
  });

  describe("Run methods as hre methods", function () {
    it("Check if L2 sequencer is up", async function () {
      if (isGithubActions) this.skip();

      const isSequencerUp =
        await this.hre.chainlink.l2Sequenser.isL2SequencerUp(
          this.l2SequencerAddress
        );

      expect(isSequencerUp).to.eq(false);
    });

    it("Gets L2 sequencer health data", async function () {
      if (isGithubActions) this.skip();

      const { isSequencerUp, timeSinceUp, isGracePeriodOver } =
        await this.hre.chainlink.l2Sequenser.getTimeSinceL2SequencerIsUp(
          this.l2SequencerAddress
        );

      expect(isSequencerUp).to.eq(false);
      expect(timeSinceUp.toNumber()).to.gte(0);
      expect(isGracePeriodOver).to.eq(false);
    });
  });

  describe("Run methods as hre subtasks", function () {
    it("Check if L2 sequencer is up", async function () {
      if (isGithubActions) this.skip();

      const isSequencerUp = await this.hre.run(
        `${PACKAGE_NAME}:${Task.l2Sequencer}:${L2SequencerSubtask.isL2SequencerUp}`,
        {
          l2SequencerAddress: this.l2SequencerAddress,
        }
      );

      expect(isSequencerUp).to.eq(false);
    });

    it("Gets L2 sequencer health data", async function () {
      if (isGithubActions) this.skip();

      const { isSequencerUp, timeSinceUp, isGracePeriodOver } =
        await this.hre.run(
          `${PACKAGE_NAME}:${Task.l2Sequencer}:${L2SequencerSubtask.getTimeSinceL2SequencerIsUp}`,
          {
            l2SequencerAddress: this.l2SequencerAddress,
            gracePeriodTime: "3600",
          }
        );

      expect(isSequencerUp).to.eq(false);
      expect(timeSinceUp.toNumber()).to.gte(0);
      expect(isGracePeriodOver).to.eq(false);
    });
  });

  describe("Run methods as subtasks of a hre task", function () {
    it("Check if L2 sequencer is up", async function () {
      if (isGithubActions) this.skip();

      const isSequencerUp = await this.hre.run(
        `${PACKAGE_NAME}:${Task.l2Sequencer}`,
        {
          subtask: L2SequencerSubtask.isL2SequencerUp,
          args: JSON.stringify({
            l2SequencerAddress: this.l2SequencerAddress,
          }),
        }
      );

      expect(isSequencerUp).to.eq(false);
    });

    it("Gets L2 sequencer health data", async function () {
      if (isGithubActions) this.skip();

      const { isSequencerUp, timeSinceUp, isGracePeriodOver } =
        await this.hre.run(`${PACKAGE_NAME}:${Task.l2Sequencer}`, {
          subtask: L2SequencerSubtask.getTimeSinceL2SequencerIsUp,
          args: JSON.stringify({
            l2SequencerAddress: this.l2SequencerAddress,
            gracePeriodTime: "3600",
          }),
        });

      expect(isSequencerUp).to.eq(false);
      expect(timeSinceUp.toNumber()).to.gte(0);
      expect(isGracePeriodOver).to.eq(false);
    });
  });
});
