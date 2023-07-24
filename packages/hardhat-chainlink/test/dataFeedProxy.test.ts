import { expect } from "chai";
import { BigNumber } from "ethers";

import { PACKAGE_NAME } from "../src/shared/constants";
import { DataFeedProxySubtask, Task } from "../src/shared/enums";

import { useEnvironment } from "./helpers";

describe("Test chainlink:dataFeedProxy module", function () {
  useEnvironment("hardhat-chainlink");

  const DECIMALS = 18;
  const INITIAL_ROUND = 1;
  const LATEST_ROUND = 2;
  const INITIAL_ANSWER = 1_000;
  const LATEST_ANSWER = 2_000;
  const CURRENT_PHASE_ID = 1;
  const DESCRIPTION = "v0.8/tests/MockV3Aggregator.sol";
  const VERSION = BigNumber.from(0);

  beforeEach(async function () {
    const ethers = this.hre.ethers;
    this.dataFeed = await (
      await ethers.getContractFactory("MockV3Aggregator")
    ).deploy(DECIMALS, INITIAL_ANSWER);
    await this.dataFeed.updateAnswer(LATEST_ANSWER);
    this.dataFeedProxy = await (
      await ethers.getContractFactory("AggregatorProxy")
    ).deploy(this.dataFeed.address);
  });

  describe("Run methods as hre methods", function () {
    it("Gets latest round data", async function () {
      const roundData =
        await this.hre.chainlink.dataFeedProxy.getLatestRoundData(
          this.dataFeedProxy.address
        );

      const roundId = this.hre.chainlink.dataFeedProxy.getRoundId(
        CURRENT_PHASE_ID,
        LATEST_ROUND
      );

      expect(roundData.roundId.toString()).to.eq(roundId.toString());
      expect(roundData.answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round data", async function () {
      const roundId = this.hre.chainlink.dataFeedProxy.getRoundId(
        CURRENT_PHASE_ID,
        INITIAL_ROUND
      );

      const roundData = await this.hre.chainlink.dataFeedProxy.getRoundData(
        this.dataFeedProxy.address,
        roundId
      );

      expect(roundData.roundId.toString()).to.eq(roundId.toString());
      expect(roundData.answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets latest round answer", async function () {
      const answer =
        await this.hre.chainlink.dataFeedProxy.getLatestRoundAnswer(
          this.dataFeedProxy.address
        );

      expect(answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round answer", async function () {
      const roundId = this.hre.chainlink.dataFeedProxy.getRoundId(
        CURRENT_PHASE_ID,
        INITIAL_ROUND
      );

      const answer = await this.hre.chainlink.dataFeedProxy.getRoundAnswer(
        this.dataFeedProxy.address,
        roundId
      );

      expect(answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets latest round id", async function () {
      const roundId = await this.hre.chainlink.dataFeedProxy.getLatestRoundId(
        this.dataFeedProxy.address
      );

      const { phaseId, aggregatorRoundId } =
        this.hre.chainlink.dataFeedProxy.parseRoundId(roundId);

      expect(phaseId.toString()).to.eq(CURRENT_PHASE_ID.toString());
      expect(aggregatorRoundId.toString()).to.eq(LATEST_ROUND.toString());
    });

    it("Gets phase id", async function () {
      const phaseId = await this.hre.chainlink.dataFeedProxy.getPhaseId(
        this.dataFeedProxy.address
      );

      expect(phaseId.toString()).to.eq(CURRENT_PHASE_ID.toString());
    });

    it("Gets phase aggregators", async function () {
      const aggregatorAddress =
        await this.hre.chainlink.dataFeedProxy.getPhaseAggregators(
          this.dataFeedProxy.address,
          CURRENT_PHASE_ID
        );

      expect(aggregatorAddress).to.eq(this.dataFeed.address);
    });

    it("Gets decimals", async function () {
      const decimals = await this.hre.chainlink.dataFeedProxy.getDecimals(
        this.dataFeedProxy.address
      );

      expect(decimals).to.eq(DECIMALS);
    });

    it("Gets description", async function () {
      const description = await this.hre.chainlink.dataFeedProxy.getDescription(
        this.dataFeedProxy.address
      );

      expect(description).to.eq(DESCRIPTION);
    });

    it("Gets version", async function () {
      const version = await this.hre.chainlink.dataFeedProxy.getVersion(
        this.dataFeedProxy.address
      );

      expect(version.toString()).to.eq(VERSION.toString());
    });
  });

  describe("Run methods as hre subtasks", function () {
    it("Gets latest round data", async function () {
      const roundData = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}:${DataFeedProxySubtask.getLatestRoundData}`,
        {
          dataFeedProxyAddress: this.dataFeedProxy.address,
        }
      );

      const roundId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}:${DataFeedProxySubtask.getRoundId}`,
        {
          phaseId: CURRENT_PHASE_ID.toString(),
          aggregatorRoundId: LATEST_ROUND.toString(),
        }
      );

      expect(roundData.roundId.toString()).to.eq(roundId.toString());
      expect(roundData.answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round data", async function () {
      const roundId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}:${DataFeedProxySubtask.getRoundId}`,
        {
          phaseId: CURRENT_PHASE_ID.toString(),
          aggregatorRoundId: INITIAL_ROUND.toString(),
        }
      );

      const roundData = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}:${DataFeedProxySubtask.getRoundData}`,
        {
          dataFeedProxyAddress: this.dataFeedProxy.address,
          roundId: roundId.toString(),
        }
      );

      expect(roundData.roundId.toString()).to.eq(roundId.toString());
      expect(roundData.answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets latest round answer", async function () {
      const answer = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}:${DataFeedProxySubtask.getLatestRoundAnswer}`,
        {
          dataFeedProxyAddress: this.dataFeedProxy.address,
        }
      );

      expect(answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round answer", async function () {
      const roundId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}:${DataFeedProxySubtask.getRoundId}`,
        {
          phaseId: CURRENT_PHASE_ID.toString(),
          aggregatorRoundId: INITIAL_ROUND.toString(),
        }
      );

      const answer = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}:${DataFeedProxySubtask.getRoundAnswer}`,
        {
          dataFeedProxyAddress: this.dataFeedProxy.address,
          roundId: roundId.toString(),
        }
      );

      expect(answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets latest round id", async function () {
      const roundId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}:${DataFeedProxySubtask.getLatestRoundId}`,
        {
          dataFeedProxyAddress: this.dataFeedProxy.address,
        }
      );

      const { phaseId, aggregatorRoundId } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}:${DataFeedProxySubtask.parseRoundId}`,
        {
          roundId: roundId.toString(),
        }
      );

      expect(phaseId.toString()).to.eq(CURRENT_PHASE_ID.toString());
      expect(aggregatorRoundId.toString()).to.eq(LATEST_ROUND.toString());
    });

    it("Gets phase id", async function () {
      const phaseId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}:${DataFeedProxySubtask.getPhaseId}`,
        {
          dataFeedProxyAddress: this.dataFeedProxy.address,
        }
      );

      expect(phaseId).to.eq(CURRENT_PHASE_ID);
    });

    it("Gets phase aggregators", async function () {
      const aggregatorAddress = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}:${DataFeedProxySubtask.getPhaseAggregators}`,
        {
          dataFeedProxyAddress: this.dataFeedProxy.address,
          phaseId: CURRENT_PHASE_ID.toString(),
        }
      );

      expect(aggregatorAddress).to.eq(this.dataFeed.address);
    });

    it("Gets decimals", async function () {
      const decimals = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}:${DataFeedProxySubtask.getDecimals}`,
        {
          dataFeedProxyAddress: this.dataFeedProxy.address,
        }
      );

      expect(decimals).to.eq(DECIMALS);
    });

    it("Gets description", async function () {
      const description = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}:${DataFeedProxySubtask.getDescription}`,
        {
          dataFeedProxyAddress: this.dataFeedProxy.address,
        }
      );

      expect(description).to.eq(DESCRIPTION);
    });

    it("Gets version", async function () {
      const version = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}:${DataFeedProxySubtask.getVersion}`,
        {
          dataFeedProxyAddress: this.dataFeedProxy.address,
        }
      );

      expect(version.toString()).to.eq(VERSION.toString());
    });
  });

  describe("Run methods as subtasks of a hre task", function () {
    it("Gets latest round data", async function () {
      const roundData = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}`,
        {
          subtask: DataFeedProxySubtask.getLatestRoundData,
          args: JSON.stringify({
            dataFeedProxyAddress: this.dataFeedProxy.address,
          }),
        }
      );

      const roundId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}`,
        {
          subtask: DataFeedProxySubtask.getRoundId,
          args: JSON.stringify({
            phaseId: CURRENT_PHASE_ID.toString(),
            aggregatorRoundId: LATEST_ROUND.toString(),
          }),
        }
      );

      expect(roundData.roundId.toString()).to.eq(roundId.toString());
      expect(roundData.answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round data", async function () {
      const roundId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}`,
        {
          subtask: DataFeedProxySubtask.getRoundId,
          args: JSON.stringify({
            phaseId: CURRENT_PHASE_ID.toString(),
            aggregatorRoundId: INITIAL_ROUND.toString(),
          }),
        }
      );

      const roundData = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}`,
        {
          subtask: DataFeedProxySubtask.getRoundData,
          args: JSON.stringify({
            dataFeedProxyAddress: this.dataFeedProxy.address,
            roundId: roundId.toString(),
          }),
        }
      );

      expect(roundData.roundId.toString()).to.eq(roundId.toString());
      expect(roundData.answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets latest round answer", async function () {
      const answer = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}`,
        {
          subtask: DataFeedProxySubtask.getLatestRoundAnswer,
          args: JSON.stringify({
            dataFeedProxyAddress: this.dataFeedProxy.address,
          }),
        }
      );

      expect(answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round answer", async function () {
      const roundId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}`,
        {
          subtask: DataFeedProxySubtask.getRoundId,
          args: JSON.stringify({
            phaseId: CURRENT_PHASE_ID.toString(),
            aggregatorRoundId: INITIAL_ROUND.toString(),
          }),
        }
      );

      const answer = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}`,
        {
          subtask: DataFeedProxySubtask.getRoundAnswer,
          args: JSON.stringify({
            dataFeedProxyAddress: this.dataFeedProxy.address,
            roundId: roundId.toString(),
          }),
        }
      );

      expect(answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets latest round id", async function () {
      const roundId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}`,
        {
          subtask: DataFeedProxySubtask.getLatestRoundId,
          args: JSON.stringify({
            dataFeedProxyAddress: this.dataFeedProxy.address,
          }),
        }
      );

      const { phaseId, aggregatorRoundId } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}`,
        {
          subtask: DataFeedProxySubtask.parseRoundId,
          args: JSON.stringify({
            roundId: roundId.toString(),
          }),
        }
      );

      expect(phaseId.toString()).to.eq(CURRENT_PHASE_ID.toString());
      expect(aggregatorRoundId.toString()).to.eq(LATEST_ROUND.toString());
    });

    it("Gets phase id", async function () {
      const phaseId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}`,
        {
          subtask: DataFeedProxySubtask.getPhaseId,
          args: JSON.stringify({
            dataFeedProxyAddress: this.dataFeedProxy.address,
          }),
        }
      );

      expect(phaseId).to.eq(CURRENT_PHASE_ID);
    });

    it("Gets phase aggregators", async function () {
      const aggregatorAddress = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}`,
        {
          subtask: DataFeedProxySubtask.getPhaseAggregators,
          args: JSON.stringify({
            dataFeedProxyAddress: this.dataFeedProxy.address,
            phaseId: CURRENT_PHASE_ID.toString(),
          }),
        }
      );

      expect(aggregatorAddress).to.eq(this.dataFeed.address);
    });

    it("Gets decimals", async function () {
      const decimals = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}`,
        {
          subtask: DataFeedProxySubtask.getDecimals,
          args: JSON.stringify({
            dataFeedProxyAddress: this.dataFeedProxy.address,
          }),
        }
      );

      expect(decimals).to.eq(DECIMALS);
    });

    it("Gets description", async function () {
      const description = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}`,
        {
          subtask: DataFeedProxySubtask.getDescription,
          args: JSON.stringify({
            dataFeedProxyAddress: this.dataFeedProxy.address,
          }),
        }
      );

      expect(description).to.eq(DESCRIPTION);
    });

    it("Gets version", async function () {
      const version = await this.hre.run(
        `${PACKAGE_NAME}:${Task.dataFeedProxy}`,
        {
          subtask: DataFeedProxySubtask.getVersion,
          args: JSON.stringify({
            dataFeedProxyAddress: this.dataFeedProxy.address,
          }),
        }
      );

      expect(version.toString()).to.eq(VERSION.toString());
    });
  });
});
