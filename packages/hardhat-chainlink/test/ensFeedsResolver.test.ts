import { expect } from "chai";

import { PACKAGE_NAME } from "../src/shared/constants";
import { ENSFeedsResolverSubtask, Task } from "../src/shared/enums";

import { useEnvironment } from "./helpers";

const isGithubActions = !!process.env.GITHUB_ACTIONS;

describe("Test chainlink:ens module [SKIP]", function () {
  useEnvironment("hardhat-chainlink-ethereum");

  beforeEach(async function () {
    this.baseTick = "ETH";
    this.quoteTick = "USD";
    this.dataFeed = this.hre.chainlink.registries.dataFeeds.ethereum.ETH.USD;
  });

  describe("Run methods as hre methods", function () {
    it("Resolves aggregator address", async function () {
      if (isGithubActions) this.skip();

      const aggregator = await this.hre.chainlink.ens.resolveAggregatorAddress(
        this.baseTick,
        this.quoteTick
      );

      expect(aggregator).to.eq(
        this.hre.ethers.utils.getAddress(this.dataFeed.proxyAddress)
      );
    });

    it("Resolves aggregator address with subdomains", async function () {
      if (isGithubActions) this.skip();

      const { proxy, underlyingAggregator, proposedAggregator } =
        await this.hre.chainlink.ens.resolveAggregatorAddressWithSubdomains(
          this.baseTick,
          this.quoteTick
        );

      expect(proxy).to.eq(
        this.hre.ethers.utils.getAddress(this.dataFeed.proxyAddress)
      );
      expect(underlyingAggregator).to.eq(
        this.hre.ethers.utils.getAddress(this.dataFeed.contractAddress)
      );
      expect(this.hre.ethers.utils.isAddress(proposedAggregator)).to.eq(true);
    });
  });

  describe("Run methods as hre subtasks", function () {
    it("Resolves aggregator address", async function () {
      if (isGithubActions) this.skip();

      const aggregator = await this.hre.run(
        `${PACKAGE_NAME}:${Task.ens}:${ENSFeedsResolverSubtask.resolveAggregatorAddress}`,
        {
          baseTick: this.baseTick,
          quoteTick: this.quoteTick,
        }
      );

      expect(aggregator).to.eq(
        this.hre.ethers.utils.getAddress(this.dataFeed.proxyAddress)
      );
    });

    it("Resolves aggregator address with subdomains", async function () {
      if (isGithubActions) this.skip();

      const { proxy, underlyingAggregator, proposedAggregator } =
        await this.hre.run(
          `${PACKAGE_NAME}:${Task.ens}:${ENSFeedsResolverSubtask.resolveAggregatorAddressWithSubdomains}`,
          {
            baseTick: this.baseTick,
            quoteTick: this.quoteTick,
          }
        );

      expect(proxy).to.eq(
        this.hre.ethers.utils.getAddress(this.dataFeed.proxyAddress)
      );
      expect(underlyingAggregator).to.eq(
        this.hre.ethers.utils.getAddress(this.dataFeed.contractAddress)
      );
      expect(this.hre.ethers.utils.isAddress(proposedAggregator)).to.eq(true);
    });
  });

  describe("Run methods as subtasks of a hre task", function () {
    it("Resolves aggregator address", async function () {
      if (isGithubActions) this.skip();

      const aggregator = await this.hre.run(`${PACKAGE_NAME}:${Task.ens}`, {
        subtask: ENSFeedsResolverSubtask.resolveAggregatorAddress,
        args: JSON.stringify({
          baseTick: this.baseTick,
          quoteTick: this.quoteTick,
        }),
      });

      expect(aggregator).to.eq(
        this.hre.ethers.utils.getAddress(this.dataFeed.proxyAddress)
      );
    });

    it("Resolves aggregator address with subdomains", async function () {
      if (isGithubActions) this.skip();

      const { proxy, underlyingAggregator, proposedAggregator } =
        await this.hre.run(`${PACKAGE_NAME}:${Task.ens}`, {
          subtask:
            ENSFeedsResolverSubtask.resolveAggregatorAddressWithSubdomains,
          args: JSON.stringify({
            baseTick: this.baseTick,
            quoteTick: this.quoteTick,
          }),
        });

      expect(proxy).to.eq(
        this.hre.ethers.utils.getAddress(this.dataFeed.proxyAddress)
      );
      expect(underlyingAggregator).to.eq(
        this.hre.ethers.utils.getAddress(this.dataFeed.contractAddress)
      );
      expect(this.hre.ethers.utils.isAddress(proposedAggregator)).to.eq(true);
    });
  });
});
