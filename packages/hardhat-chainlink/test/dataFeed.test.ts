import { expect } from "chai";

import { PACKAGE_NAME } from "../src/shared/constants";
import { DataFeedSubtask, Task } from "../src/shared/enums";

import { useEnvironment } from "./helpers";

describe("Test chainlink:dataFeed module", function () {
  useEnvironment("hardhat-chainlink");

  const DECIMALS = 18;
  const INITIAL_ROUND = 1;
  const LATEST_ROUND = 2;
  const INITIAL_ANSWER = 1_000;
  const LATEST_ANSWER = 2_000;
  const DESCRIPTION = "v0.8/tests/MockV3Aggregator.sol";
  const VERSION = 0;

  beforeEach(async function () {
    const ethers = this.hre.ethers;
    this.dataFeed = await (
      await ethers.getContractFactory("MockV3Aggregator")
    ).deploy(DECIMALS, INITIAL_ANSWER);
    await this.dataFeed.updateAnswer(LATEST_ANSWER);
  });

  describe("Run methods as hre methods", function () {
    it("Gets latest round data", async function () {
      const roundData = await this.hre.chainlink.dataFeed.getLatestRoundData(
        this.dataFeed.address
      );

      expect(roundData.roundId.toString()).to.eq(LATEST_ROUND.toString());
      expect(roundData.answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round data", async function () {
      const roundData = await this.hre.chainlink.dataFeed.getRoundData(
        this.dataFeed.address,
        INITIAL_ROUND
      );

      expect(roundData.roundId.toString()).to.eq(INITIAL_ROUND.toString());
      expect(roundData.answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets latest round answer", async function () {
      const answer = await this.hre.chainlink.dataFeed.getLatestRoundAnswer(
        this.dataFeed.address
      );

      expect(answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round answer", async function () {
      const answer = await this.hre.chainlink.dataFeed.getRoundAnswer(
        this.dataFeed.address,
        INITIAL_ROUND
      );

      expect(answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets latest round id", async function () {
      const roundId = await this.hre.chainlink.dataFeed.getLatestRoundId(
        this.dataFeed.address
      );

      expect(roundId.toString()).to.eq(LATEST_ROUND.toString());
    });

    it("Gets decimals", async function () {
      const decimals = await this.hre.chainlink.dataFeed.getDecimals(
        this.dataFeed.address
      );

      expect(decimals).to.eq(DECIMALS);
    });

    it("Gets description", async function () {
      const description = await this.hre.chainlink.dataFeed.getDescription(
        this.dataFeed.address
      );

      expect(description).to.eq(DESCRIPTION);
    });

    it("Gets version", async function () {
      const version = await this.hre.chainlink.dataFeed.getVersion(
        this.dataFeed.address
      );

      expect(version.toString()).to.eq(VERSION.toString());
    });
  });

  describe("Run methods as hre subtasks", function () {
    it("Gets latest round data", async function () {
      const roundData = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeed}:${DataFeedSubtask.getLatestRoundData}`,
        {
          dataFeedAddress: this.dataFeed.address,
        }
      );

      expect(roundData.roundId.toString()).to.eq(LATEST_ROUND.toString());
      expect(roundData.answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round data", async function () {
      const roundData = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeed}:${DataFeedSubtask.getRoundData}`,
        {
          dataFeedAddress: this.dataFeed.address,
          roundId: INITIAL_ROUND.toString(),
        }
      );

      expect(roundData.roundId.toString()).to.eq(INITIAL_ROUND.toString());
      expect(roundData.answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets latest round answer", async function () {
      const answer = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeed}:${DataFeedSubtask.getLatestRoundAnswer}`,
        {
          dataFeedAddress: this.dataFeed.address,
        }
      );

      expect(answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round answer", async function () {
      const answer = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeed}:${DataFeedSubtask.getRoundAnswer}`,
        {
          dataFeedAddress: this.dataFeed.address,
          roundId: INITIAL_ROUND.toString(),
        }
      );

      expect(answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets latest round id", async function () {
      const roundId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeed}:${DataFeedSubtask.getLatestRoundId}`,
        {
          dataFeedAddress: this.dataFeed.address,
        }
      );

      expect(roundId.toString()).to.eq(LATEST_ROUND.toString());
    });

    it("Gets decimals", async function () {
      const decimals = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeed}:${DataFeedSubtask.getDecimals}`,
        {
          dataFeedAddress: this.dataFeed.address,
        }
      );

      expect(decimals).to.eq(DECIMALS);
    });

    it("Gets description", async function () {
      const description = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeed}:${DataFeedSubtask.getDescription}`,
        {
          dataFeedAddress: this.dataFeed.address,
        }
      );

      expect(description).to.eq(DESCRIPTION);
    });

    it("Gets version", async function () {
      const version = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeed}:${DataFeedSubtask.getVersion}`,
        {
          dataFeedAddress: this.dataFeed.address,
        }
      );

      expect(version.toString()).to.eq(VERSION.toString());
    });
  });

  describe("Run methods as subtasks of a hre task", function () {
    it("Gets latest round data", async function () {
      const roundData = await this.hre.run(`${PACKAGE_NAME}:${Task.dataFeed}`, {
        subtask: DataFeedSubtask.getLatestRoundData,
        args: JSON.stringify({
          dataFeedAddress: this.dataFeed.address,
        }),
      });

      expect(roundData.roundId.toString()).to.eq(LATEST_ROUND.toString());
      expect(roundData.answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round data", async function () {
      const roundData = await this.hre.run(`${PACKAGE_NAME}:${Task.dataFeed}`, {
        subtask: DataFeedSubtask.getRoundData,
        args: JSON.stringify({
          dataFeedAddress: this.dataFeed.address,
          roundId: INITIAL_ROUND.toString(),
        }),
      });

      expect(roundData.roundId.toString()).to.eq(INITIAL_ROUND.toString());
      expect(roundData.answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets latest round answer", async function () {
      const answer = await this.hre.run(`${PACKAGE_NAME}:${Task.dataFeed}`, {
        subtask: DataFeedSubtask.getLatestRoundAnswer,
        args: JSON.stringify({
          dataFeedAddress: this.dataFeed.address,
        }),
      });

      expect(answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round answer", async function () {
      const answer = await this.hre.run(`${PACKAGE_NAME}:${Task.dataFeed}`, {
        subtask: DataFeedSubtask.getRoundAnswer,
        args: JSON.stringify({
          dataFeedAddress: this.dataFeed.address,
          roundId: INITIAL_ROUND.toString(),
        }),
      });

      expect(answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets latest round id", async function () {
      const roundId = await this.hre.run(`${PACKAGE_NAME}:${Task.dataFeed}`, {
        subtask: DataFeedSubtask.getLatestRoundId,
        args: JSON.stringify({
          dataFeedAddress: this.dataFeed.address,
        }),
      });

      expect(roundId.toString()).to.eq(LATEST_ROUND.toString());
    });

    it("Gets decimals", async function () {
      const decimals = await this.hre.run(`${PACKAGE_NAME}:${Task.dataFeed}`, {
        subtask: DataFeedSubtask.getDecimals,
        args: JSON.stringify({
          dataFeedAddress: this.dataFeed.address,
        }),
      });

      expect(decimals).to.eq(DECIMALS);
    });

    it("Gets description", async function () {
      const description = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeed}`,
        {
          subtask: DataFeedSubtask.getDescription,
          args: JSON.stringify({
            dataFeedAddress: this.dataFeed.address,
          }),
        }
      );

      expect(description).to.eq(DESCRIPTION);
    });

    it("Gets version", async function () {
      const version = await this.hre.run(`${PACKAGE_NAME}:${Task.dataFeed}`, {
        subtask: DataFeedSubtask.getVersion,
        args: JSON.stringify({
          dataFeedAddress: this.dataFeed.address,
        }),
      });

      expect(version.toString()).to.eq(VERSION.toString());
    });
  });
});
