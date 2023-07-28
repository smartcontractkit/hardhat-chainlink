import { expect } from "chai";

import { PACKAGE_NAME } from "../src/shared/constants";
import { FeedRegistrySubtask, Task } from "../src/shared/enums";

import { useEnvironment } from "./helpers";

describe("Test chainlink:feedRegistry module", function () {
  useEnvironment("hardhat-chainlink");

  const DECIMALS = 18;
  const INITIAL_ROUND = 1;
  const LATEST_ROUND = 2;
  const INITIAL_ANSWER = 1_000;
  const LATEST_ANSWER = 2_000;
  const CURRENT_PHASE_ID = 1;
  const DESCRIPTION = "v0.8/tests/MockV3Aggregator.sol";
  const VERSION = 0;

  before(async function () {
    this.ETH = this.hre.chainlink.registries.denominations.ETH;
    this.USD = this.hre.chainlink.registries.denominations.USD;
  });

  function beforeShared() {
    return async function (this: Mocha.Context) {
      const ethers = this.hre.ethers;

      this.dataFeedETHUSD = await (
        await ethers.getContractFactory("MockV3Aggregator")
      ).deploy(DECIMALS, INITIAL_ANSWER);
      await this.dataFeedETHUSD.updateAnswer(LATEST_ANSWER);

      this.dataFeedETHUSDProposed = await (
        await ethers.getContractFactory("MockV3Aggregator")
      ).deploy(DECIMALS, INITIAL_ANSWER);
      await this.dataFeedETHUSDProposed.updateAnswer(LATEST_ANSWER);

      this.feedRegistry = await (
        await ethers.getContractFactory("FeedRegistry")
      ).deploy();
      await this.feedRegistry.proposeFeed(
        this.ETH,
        this.USD,
        this.dataFeedETHUSD.address
      );
      await this.feedRegistry.confirmFeed(
        this.ETH,
        this.USD,
        this.dataFeedETHUSD.address
      );
      await this.feedRegistry.proposeFeed(
        this.ETH,
        this.USD,
        this.dataFeedETHUSDProposed.address
      );
    };
  }

  describe("Run methods as hre methods", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Gets latest round data", async function () {
      const roundData =
        await this.hre.chainlink.feedRegistry.getLatestRoundData(
          this.feedRegistry.address,
          this.ETH,
          this.USD
        );

      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        LATEST_ROUND
      );

      expect(roundData.roundId.toString()).to.eq(roundId.toString());
      expect(roundData.answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round data", async function () {
      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        INITIAL_ROUND
      );

      const roundData = await this.hre.chainlink.feedRegistry.getRoundData(
        this.feedRegistry.address,
        this.ETH,
        this.USD,
        roundId
      );

      expect(roundData.roundId.toString()).to.eq(roundId.toString());
      expect(roundData.answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets proposed latest round data", async function () {
      const roundData =
        await this.hre.chainlink.feedRegistry.proposedGetLatestRoundData(
          this.feedRegistry.address,
          this.ETH,
          this.USD
        );

      expect(roundData.roundId.toString()).to.eq(LATEST_ROUND.toString());
      expect(roundData.answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets proposed round data", async function () {
      const roundData =
        await this.hre.chainlink.feedRegistry.proposedGetRoundData(
          this.feedRegistry.address,
          this.ETH,
          this.USD,
          INITIAL_ROUND
        );

      expect(roundData.roundId.toString()).to.eq(INITIAL_ROUND.toString());
      expect(roundData.answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets round feed", async function () {
      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        LATEST_ROUND
      );

      const aggregator = await this.hre.chainlink.feedRegistry.getRoundFeed(
        this.feedRegistry.address,
        this.ETH,
        this.USD,
        roundId
      );

      expect(aggregator).to.eq(this.dataFeedETHUSD.address);
    });

    it("Gets data feed", async function () {
      const dataFeed = await this.hre.chainlink.feedRegistry.getFeed(
        this.feedRegistry.address,
        this.ETH,
        this.USD
      );

      expect(dataFeed).to.eq(this.dataFeedETHUSD.address);
    });

    it("Gets proposed data feed", async function () {
      const proposedDataFeed =
        await this.hre.chainlink.feedRegistry.getProposedFeed(
          this.feedRegistry.address,
          this.ETH,
          this.USD
        );

      expect(proposedDataFeed).to.eq(this.dataFeedETHUSDProposed.address);
    });

    it("Checks if data feed is enabled", async function () {
      const isFeedEnabled = await this.hre.chainlink.feedRegistry.isFeedEnabled(
        this.feedRegistry.address,
        this.dataFeedETHUSDProposed.address
      );

      expect(isFeedEnabled).to.eq(false);
    });

    it("Checks if data feed is disabled", async function () {
      const isFeedEnabled = await this.hre.chainlink.feedRegistry.isFeedEnabled(
        this.feedRegistry.address,
        this.dataFeedETHUSD.address
      );

      expect(isFeedEnabled).to.eq(true);
    });

    it("Gets previous round id", async function () {
      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        INITIAL_ROUND
      );

      const previousRoundId =
        await this.hre.chainlink.feedRegistry.getPreviousRoundId(
          this.feedRegistry.address,
          this.ETH,
          this.USD,
          roundId
        );

      // Behaviour is not properly described in the Feed Registry smart contract
      expect(previousRoundId.toString()).to.eq("0");
    });

    it("Gets next round id", async function () {
      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        INITIAL_ROUND
      );

      const nextRoundId = await this.hre.chainlink.feedRegistry.getNextRoundId(
        this.feedRegistry.address,
        this.ETH,
        this.USD,
        roundId
      );

      const expectedRoundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        LATEST_ROUND
      );

      expect(nextRoundId.toString()).to.eq(expectedRoundId.toString());
    });

    it("Gets decimals", async function () {
      const decimals = await this.hre.chainlink.feedRegistry.getDecimals(
        this.feedRegistry.address,
        this.ETH,
        this.USD
      );

      expect(decimals).to.eq(DECIMALS);
    });

    it("Gets description", async function () {
      const description = await this.hre.chainlink.feedRegistry.getDescription(
        this.feedRegistry.address,
        this.ETH,
        this.USD
      );

      expect(description).to.eq(DESCRIPTION);
    });

    it("Gets version", async function () {
      const version = await this.hre.chainlink.feedRegistry.getVersion(
        this.feedRegistry.address,
        this.ETH,
        this.USD
      );

      expect(version.toString()).to.eq(VERSION.toString());
    });

    it("Gets phase", async function () {
      const { phaseId, startingAggregatorRoundId, endingAggregatorRoundId } =
        await this.hre.chainlink.feedRegistry.getPhase(
          this.feedRegistry.address,
          this.ETH,
          this.USD,
          CURRENT_PHASE_ID
        );

      expect(phaseId).to.eq(CURRENT_PHASE_ID);
      expect(startingAggregatorRoundId.toString()).to.eq(
        LATEST_ROUND.toString()
      );
      expect(endingAggregatorRoundId.toString()).to.eq("0");
    });

    it("Gets phase feed", async function () {
      const aggregator = await this.hre.chainlink.feedRegistry.getPhaseFeed(
        this.feedRegistry.address,
        this.ETH,
        this.USD,
        CURRENT_PHASE_ID
      );

      expect(aggregator).to.eq(this.dataFeedETHUSD.address);
    });

    it("Gets phase range", async function () {
      const { startingRoundId, endingRoundId } =
        await this.hre.chainlink.feedRegistry.getPhaseRange(
          this.feedRegistry.address,
          this.ETH,
          this.USD,
          CURRENT_PHASE_ID
        );

      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        LATEST_ROUND
      );

      expect(startingRoundId.toString()).to.eq(roundId.toString());
      expect(endingRoundId.toString()).to.eq(roundId.toString());
    });

    it("Gets current phase id", async function () {
      const currentPhaseId =
        await this.hre.chainlink.feedRegistry.getCurrentPhaseId(
          this.feedRegistry.address,
          this.ETH,
          this.USD
        );

      expect(currentPhaseId).to.eq(CURRENT_PHASE_ID);
    });
  });

  describe("Run methods as hre subtasks", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Gets latest round data", async function () {
      const roundData = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.getLatestRoundData}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
        }
      );

      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        LATEST_ROUND
      );

      expect(roundData.roundId.toString()).to.eq(roundId.toString());
      expect(roundData.answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round data", async function () {
      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        INITIAL_ROUND
      );

      const roundData = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.getRoundData}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
          roundId: roundId.toString(),
        }
      );

      expect(roundData.roundId.toString()).to.eq(roundId.toString());
      expect(roundData.answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets proposed latest round data", async function () {
      const roundData = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.proposedGetLatestRoundData}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
        }
      );

      expect(roundData.roundId.toString()).to.eq(LATEST_ROUND.toString());
      expect(roundData.answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets proposed round data", async function () {
      const roundData = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.proposedGetRoundData}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
          roundId: INITIAL_ROUND.toString(),
        }
      );

      expect(roundData.roundId.toString()).to.eq(INITIAL_ROUND.toString());
      expect(roundData.answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets round feed", async function () {
      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        LATEST_ROUND
      );

      const aggregator = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.getRoundFeed}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
          roundId: roundId.toString(),
        }
      );

      expect(aggregator).to.eq(this.dataFeedETHUSD.address);
    });

    it("Gets data feed", async function () {
      const dataFeed = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.getFeed}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
        }
      );

      expect(dataFeed).to.eq(this.dataFeedETHUSD.address);
    });

    it("Gets proposed data feed", async function () {
      const proposedDataFeed = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.getProposedFeed}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
        }
      );

      expect(proposedDataFeed).to.eq(this.dataFeedETHUSDProposed.address);
    });

    it("Checks if data feed is enabled", async function () {
      const isFeedEnabled = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.isFeedEnabled}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          aggregatorAddress: this.dataFeedETHUSDProposed.address,
        }
      );

      expect(isFeedEnabled).to.eq(false);
    });

    it("Checks if data feed is disabled", async function () {
      const isFeedEnabled = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.isFeedEnabled}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          aggregatorAddress: this.dataFeedETHUSD.address,
        }
      );

      expect(isFeedEnabled).to.eq(true);
    });

    it("Gets previous round id", async function () {
      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        INITIAL_ROUND
      );

      const previousRoundId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.getPreviousRoundId}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
          roundId: roundId.toString(),
        }
      );

      // Behaviour is not properly described in the Feed Registry smart contract
      expect(previousRoundId.toString()).to.eq("0");
    });

    it("Gets next round id", async function () {
      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        INITIAL_ROUND
      );

      const nextRoundId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.getNextRoundId}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
          roundId: roundId.toString(),
        }
      );

      const expectedRoundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        LATEST_ROUND
      );

      expect(nextRoundId.toString()).to.eq(expectedRoundId.toString());
    });

    it("Gets decimals", async function () {
      const decimals = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.getDecimals}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
        }
      );

      expect(decimals).to.eq(DECIMALS);
    });

    it("Gets description", async function () {
      const description = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.getDescription}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
        }
      );

      expect(description).to.eq(DESCRIPTION);
    });

    it("Gets version", async function () {
      const version = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.getVersion}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
        }
      );

      expect(version.toString()).to.eq(VERSION.toString());
    });

    it("Gets phase", async function () {
      const { phaseId, startingAggregatorRoundId, endingAggregatorRoundId } =
        await this.hre.run(
          `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.getPhase}`,
          {
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
            phaseId: CURRENT_PHASE_ID.toString(),
          }
        );

      expect(phaseId).to.eq(CURRENT_PHASE_ID);
      expect(startingAggregatorRoundId.toString()).to.eq(
        LATEST_ROUND.toString()
      );
      expect(endingAggregatorRoundId.toString()).to.eq("0");
    });

    it("Gets phase feed", async function () {
      const aggregator = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.getPhaseFeed}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
          phaseId: CURRENT_PHASE_ID.toString(),
        }
      );

      expect(aggregator).to.eq(this.dataFeedETHUSD.address);
    });

    it("Gets phase range", async function () {
      const { startingRoundId, endingRoundId } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.getPhaseRange}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
          phaseId: CURRENT_PHASE_ID.toString(),
        }
      );

      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        LATEST_ROUND
      );

      expect(startingRoundId.toString()).to.eq(roundId.toString());
      expect(endingRoundId.toString()).to.eq(roundId.toString());
    });

    it("Gets current phase id", async function () {
      const currentPhaseId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}:${FeedRegistrySubtask.getCurrentPhaseId}`,
        {
          feedRegistryAddress: this.feedRegistry.address,
          feedRegistryBaseTick: this.ETH,
          feedRegistryQuoteTick: this.USD,
        }
      );

      expect(currentPhaseId).to.eq(CURRENT_PHASE_ID);
    });
  });

  describe("Run methods as subtasks of a hre task", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Gets latest round data", async function () {
      const roundData = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.getLatestRoundData,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
          }),
        }
      );

      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        LATEST_ROUND
      );

      expect(roundData.roundId.toString()).to.eq(roundId.toString());
      expect(roundData.answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets round data", async function () {
      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        INITIAL_ROUND
      );

      const roundData = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.getRoundData,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
            roundId: roundId.toString(),
          }),
        }
      );

      expect(roundData.roundId.toString()).to.eq(roundId.toString());
      expect(roundData.answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets proposed latest round data", async function () {
      const roundData = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.proposedGetLatestRoundData,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
          }),
        }
      );

      expect(roundData.roundId.toString()).to.eq(LATEST_ROUND.toString());
      expect(roundData.answer.toString()).to.eq(LATEST_ANSWER.toString());
    });

    it("Gets proposed round data", async function () {
      const roundData = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.proposedGetRoundData,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
            roundId: INITIAL_ROUND.toString(),
          }),
        }
      );

      expect(roundData.roundId.toString()).to.eq(INITIAL_ROUND.toString());
      expect(roundData.answer.toString()).to.eq(INITIAL_ANSWER.toString());
    });

    it("Gets round feed", async function () {
      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        LATEST_ROUND
      );

      const aggregator = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.getRoundFeed,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
            roundId: roundId.toString(),
          }),
        }
      );

      expect(aggregator).to.eq(this.dataFeedETHUSD.address);
    });

    it("Gets data feed", async function () {
      const dataFeed = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.getFeed,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
          }),
        }
      );

      expect(dataFeed).to.eq(this.dataFeedETHUSD.address);
    });

    it("Gets proposed data feed", async function () {
      const proposedDataFeed = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.getProposedFeed,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
          }),
        }
      );

      expect(proposedDataFeed).to.eq(this.dataFeedETHUSDProposed.address);
    });

    it("Checks if data feed is enabled", async function () {
      const isFeedEnabled = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.isFeedEnabled,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            aggregatorAddress: this.dataFeedETHUSDProposed.address,
          }),
        }
      );

      expect(isFeedEnabled).to.eq(false);
    });

    it("Checks if data feed is disabled", async function () {
      const isFeedEnabled = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.isFeedEnabled,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            aggregatorAddress: this.dataFeedETHUSD.address,
          }),
        }
      );

      expect(isFeedEnabled).to.eq(true);
    });

    it("Gets previous round id", async function () {
      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        INITIAL_ROUND
      );

      const previousRoundId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.getPreviousRoundId,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
            roundId: roundId.toString(),
          }),
        }
      );

      // Behaviour is not properly described in the Feed Registry smart contract
      expect(previousRoundId.toString()).to.eq("0");
    });

    it("Gets next round id", async function () {
      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        INITIAL_ROUND
      );

      const nextRoundId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.getNextRoundId,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
            roundId: roundId.toString(),
          }),
        }
      );

      const expectedRoundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        LATEST_ROUND
      );

      expect(nextRoundId.toString()).to.eq(expectedRoundId.toString());
    });

    it("Gets decimals", async function () {
      const decimals = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.getDecimals,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
          }),
        }
      );

      expect(decimals).to.eq(DECIMALS);
    });

    it("Gets description", async function () {
      const description = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.getDescription,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
          }),
        }
      );

      expect(description).to.eq(DESCRIPTION);
    });

    it("Gets version", async function () {
      const version = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.getVersion,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
          }),
        }
      );

      expect(version.toString()).to.eq(VERSION.toString());
    });

    it("Gets phase", async function () {
      const { phaseId, startingAggregatorRoundId, endingAggregatorRoundId } =
        await this.hre.run(`${PACKAGE_NAME}:${Task.feedRegistry}`, {
          subtask: FeedRegistrySubtask.getPhase,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
            phaseId: CURRENT_PHASE_ID.toString(),
          }),
        });

      expect(phaseId).to.eq(CURRENT_PHASE_ID);
      expect(startingAggregatorRoundId.toString()).to.eq(
        LATEST_ROUND.toString()
      );
      expect(endingAggregatorRoundId.toString()).to.eq("0");
    });

    it("Gets phase feed", async function () {
      const aggregator = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.getPhaseFeed,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
            phaseId: CURRENT_PHASE_ID.toString(),
          }),
        }
      );

      expect(aggregator).to.eq(this.dataFeedETHUSD.address);
    });

    it("Gets phase range", async function () {
      const { startingRoundId, endingRoundId } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.getPhaseRange,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
            phaseId: CURRENT_PHASE_ID.toString(),
          }),
        }
      );

      const roundId = this.hre.chainlink.utils.getRoundId(
        CURRENT_PHASE_ID,
        LATEST_ROUND
      );

      expect(startingRoundId.toString()).to.eq(roundId.toString());
      expect(endingRoundId.toString()).to.eq(roundId.toString());
    });

    it("Gets current phase id", async function () {
      const currentPhaseId = await this.hre.run(
        `${PACKAGE_NAME}:${Task.feedRegistry}`,
        {
          subtask: FeedRegistrySubtask.getCurrentPhaseId,
          args: JSON.stringify({
            feedRegistryAddress: this.feedRegistry.address,
            feedRegistryBaseTick: this.ETH,
            feedRegistryQuoteTick: this.USD,
          }),
        }
      );

      expect(currentPhaseId).to.eq(CURRENT_PHASE_ID);
    });
  });
});
