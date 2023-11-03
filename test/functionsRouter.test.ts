import { deployFunctionsOracle } from "@chainlink/functions-toolkit";
import { expect } from "chai";
import { BigNumber, Contract, Wallet } from "ethers";

import { PACKAGE_NAME } from "../src/shared/constants";
import { FunctionsSubtask, Task } from "../src/shared/enums";

import { useEnvironment } from "./helpers";

describe("Test chainlink:functionsRouter module", function () {
  const LINK_AMOUNT_TO_TRANSFER = "1000000000000000000";
  const LINK_AMOUNT_TO_FUND = "1000000000000";
  const ETH_AMOUNT_TO_FUND = "100";
  const CALLBACK_GAS_LIMIT = 300_000;
  const GAS_PRICE_WEI = BigNumber.from("100000000000");
  const ESTIMATED_COST_JUELS = BigInt("38923000000000000000");

  let wallet: Wallet;
  let donId: string;
  let linkTokenContract: Contract;
  let functionsRouterContract: Contract;
  let functionsConsumerContract: Contract;

  function beforeShared() {
    return async function (this: Mocha.Context) {
      const [account] = await this.hre.ethers.getSigners();
      const amountInWei = this.hre.ethers.utils.parseEther(ETH_AMOUNT_TO_FUND);

      wallet = new this.hre.ethers.Wallet(
        this.hre.ethers.Wallet.createRandom().privateKey,
        this.hre.ethers.provider
      );
      await account.sendTransaction({
        to: wallet.address,
        value: amountInWei,
      });
      const deployment = await deployFunctionsOracle(wallet);
      donId = deployment.donId;
      linkTokenContract = deployment.linkTokenContract;
      functionsRouterContract = deployment.functionsRouterContract;
      functionsConsumerContract = await (
        await this.hre.ethers.getContractFactory("FunctionsConsumer")
      )
        .connect(account)
        .deploy(
          functionsRouterContract.address,
          this.hre.ethers.utils.formatBytes32String(donId)
        );

      await linkTokenContract
        .connect(wallet)
        .transfer(account.address, LINK_AMOUNT_TO_TRANSFER);
    };
  }

  describe("Run methods as hre methods", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Create Subscription", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );

      expect(subscriptionId.toNumber()).gt(0);
    });

    it("Fund Subscription", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.chainlink.functions.fundSubscription(
        functionsRouterContract.address,
        linkTokenContract.address,
        LINK_AMOUNT_TO_FUND,
        subscriptionId
      );

      const subscriptionDetails =
        await this.hre.chainlink.functions.getSubscriptionDetails(
          functionsRouterContract.address,
          subscriptionId
        );

      expect(subscriptionDetails.balance.toNumber()).gte(10000000);
    });

    it("Cancel Subscription", async function () {
      const [account] = await this.hre.ethers.getSigners();
      const balanceInitial = await linkTokenContract.balanceOf(account.address);

      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.chainlink.functions.fundSubscription(
        functionsRouterContract.address,
        linkTokenContract.address,
        LINK_AMOUNT_TO_FUND,
        subscriptionId
      );
      await this.hre.chainlink.functions.cancelSubscription(
        functionsRouterContract.address,
        subscriptionId
      );

      const balance = await linkTokenContract.balanceOf(account.address);
      expect(balance.toString()).eq(balanceInitial.toString());
    });

    it("Add Subscription Consumer", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.chainlink.functions.addConsumer(
        functionsRouterContract.address,
        functionsConsumerContract.address,
        subscriptionId
      );

      const subscriptionDetails =
        await this.hre.chainlink.functions.getSubscriptionDetails(
          functionsRouterContract.address,
          subscriptionId
        );

      expect(
        subscriptionDetails.consumers.includes(
          functionsConsumerContract.address
        )
      ).to.be.true;
    });

    it("Remove Subscription Consumer", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.chainlink.functions.addConsumer(
        functionsRouterContract.address,
        functionsConsumerContract.address,
        subscriptionId
      );
      await this.hre.chainlink.functions.removeConsumer(
        functionsRouterContract.address,
        functionsConsumerContract.address,
        subscriptionId
      );

      const subscriptionDetails =
        await this.hre.chainlink.functions.getSubscriptionDetails(
          functionsRouterContract.address,
          subscriptionId
        );

      expect(
        subscriptionDetails.consumers.includes(
          functionsConsumerContract.address
        )
      ).to.be.false;
    });

    it("Transfer Subscription Ownership", async function () {
      const [_, receiver] = await this.hre.ethers.getSigners();
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.chainlink.functions.requestSubscriptionOwnerTransfer(
        functionsRouterContract.address,
        subscriptionId,
        receiver.address
      );
      await this.hre.chainlink.functions.acceptSubscriptionOwnerTransfer(
        functionsRouterContract.address,
        subscriptionId,
        {
          signer: receiver,
        }
      );

      const subscriptionDetails =
        await this.hre.chainlink.functions.getSubscriptionDetails(
          functionsRouterContract.address,
          subscriptionId
        );

      expect(subscriptionDetails.owner).eq(receiver.address);
    });

    it("Timeout Requests", async function () {
      try {
        await this.hre.chainlink.functions.timeoutRequests(
          functionsRouterContract.address,
          []
        );
      } catch (err: any) {
        expect(err.message).to.eq(
          "Must provide at least one request commitment"
        );
      }
    });

    it("Estimate Request Cost", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      const estimatedCost =
        await this.hre.chainlink.functions.estimateRequestCost(
          functionsRouterContract.address,
          donId,
          subscriptionId,
          CALLBACK_GAS_LIMIT,
          GAS_PRICE_WEI
        );

      expect(estimatedCost.toString()).eq(ESTIMATED_COST_JUELS.toString());
    });
  });

  describe("Run methods as hre subtasks", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Create Subscription", async function () {
      const { subscriptionId } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.functions}:${FunctionsSubtask.createSubscription}`,
        {
          functionsRouterAddress: functionsRouterContract.address,
        }
      );

      expect(subscriptionId.toNumber()).gt(0);
    });

    it("Fund Subscription", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.run(
        `${PACKAGE_NAME}:${Task.functions}:${FunctionsSubtask.fundSubscription}`,
        {
          functionsRouterAddress: functionsRouterContract.address,
          linkTokenAddress: linkTokenContract.address,
          amountInJuels: LINK_AMOUNT_TO_FUND,
          subscriptionId: subscriptionId.toString(),
        }
      );

      const subscriptionDetails =
        await this.hre.chainlink.functions.getSubscriptionDetails(
          functionsRouterContract.address,
          subscriptionId
        );

      expect(subscriptionDetails.balance.toNumber()).gte(10000000);
    });

    it("Cancel Subscription", async function () {
      const [account] = await this.hre.ethers.getSigners();
      const balanceInitial = await linkTokenContract.balanceOf(account.address);

      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.chainlink.functions.fundSubscription(
        functionsRouterContract.address,
        linkTokenContract.address,
        LINK_AMOUNT_TO_FUND,
        subscriptionId
      );
      await this.hre.run(
        `${PACKAGE_NAME}:${Task.functions}:${FunctionsSubtask.cancelSubscription}`,
        {
          functionsRouterAddress: functionsRouterContract.address,
          subscriptionId: subscriptionId.toString(),
        }
      );

      const balance = await linkTokenContract.balanceOf(account.address);
      expect(balance.toString()).eq(balanceInitial.toString());
    });

    it("Add Subscription Consumer", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.run(
        `${PACKAGE_NAME}:${Task.functions}:${FunctionsSubtask.addConsumer}`,
        {
          functionsRouterAddress: functionsRouterContract.address,
          consumerAddress: functionsConsumerContract.address,
          subscriptionId: subscriptionId.toString(),
        }
      );

      const subscriptionDetails =
        await this.hre.chainlink.functions.getSubscriptionDetails(
          functionsRouterContract.address,
          subscriptionId
        );

      expect(
        subscriptionDetails.consumers.includes(
          functionsConsumerContract.address
        )
      ).to.be.true;
    });

    it("Remove Subscription Consumer", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.chainlink.functions.addConsumer(
        functionsRouterContract.address,
        functionsConsumerContract.address,
        subscriptionId
      );
      await this.hre.run(
        `${PACKAGE_NAME}:${Task.functions}:${FunctionsSubtask.removeConsumer}`,
        {
          functionsRouterAddress: functionsRouterContract.address,
          consumerAddress: functionsConsumerContract.address,
          subscriptionId: subscriptionId.toString(),
        }
      );

      const subscriptionDetails =
        await this.hre.chainlink.functions.getSubscriptionDetails(
          functionsRouterContract.address,
          subscriptionId
        );

      expect(
        subscriptionDetails.consumers.includes(
          functionsConsumerContract.address
        )
      ).to.be.false;
    });

    it("Request Subscription Ownership Transfer", async function () {
      const [_, receiver] = await this.hre.ethers.getSigners();
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.run(
        `${PACKAGE_NAME}:${Task.functions}:${FunctionsSubtask.requestSubscriptionOwnerTransfer}`,
        {
          functionsRouterAddress: functionsRouterContract.address,
          subscriptionId: subscriptionId.toString(),
          newOwnerAddress: receiver.address,
        }
      );
      await this.hre.chainlink.functions.acceptSubscriptionOwnerTransfer(
        functionsRouterContract.address,
        subscriptionId,
        {
          signer: receiver,
        }
      );

      const subscriptionDetails =
        await this.hre.chainlink.functions.getSubscriptionDetails(
          functionsRouterContract.address,
          subscriptionId
        );

      expect(subscriptionDetails.owner).eq(receiver.address);
    });

    it("Accept Subscription Ownership Transfer", async function () {
      const [receiver, owner] = await this.hre.ethers.getSigners();
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address,
          "",
          {
            signer: owner,
          }
        );
      await this.hre.chainlink.functions.requestSubscriptionOwnerTransfer(
        functionsRouterContract.address,
        subscriptionId,
        receiver.address,
        {
          signer: owner,
        }
      );
      await this.hre.run(
        `${PACKAGE_NAME}:${Task.functions}:${FunctionsSubtask.acceptSubscriptionOwnerTransfer}`,
        {
          functionsRouterAddress: functionsRouterContract.address,
          subscriptionId: subscriptionId.toString(),
        }
      );

      const subscriptionDetails =
        await this.hre.chainlink.functions.getSubscriptionDetails(
          functionsRouterContract.address,
          subscriptionId
        );

      expect(subscriptionDetails.owner).eq(receiver.address);
    });
  });

  describe("Run methods as subtasks of a hre task", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Create Subscription", async function () {
      const { subscriptionId } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.functions}`,
        {
          subtask: FunctionsSubtask.createSubscription,
          args: JSON.stringify({
            functionsRouterAddress: functionsRouterContract.address,
            consumerAddress: "",
          }),
        }
      );

      expect(subscriptionId.toNumber()).gt(0);
    });

    it("Fund Subscription", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.run(`${PACKAGE_NAME}:${Task.functions}`, {
        subtask: FunctionsSubtask.fundSubscription,
        args: JSON.stringify({
          functionsRouterAddress: functionsRouterContract.address,
          linkTokenAddress: linkTokenContract.address,
          amountInJuels: LINK_AMOUNT_TO_FUND,
          subscriptionId: subscriptionId.toString(),
        }),
      });

      const subscriptionDetails =
        await this.hre.chainlink.functions.getSubscriptionDetails(
          functionsRouterContract.address,
          subscriptionId
        );

      expect(subscriptionDetails.balance.toNumber()).gte(10000000);
    });

    it("Cancel Subscription", async function () {
      const [account] = await this.hre.ethers.getSigners();
      const balanceInitial = await linkTokenContract.balanceOf(account.address);

      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.chainlink.functions.fundSubscription(
        functionsRouterContract.address,
        linkTokenContract.address,
        LINK_AMOUNT_TO_FUND,
        subscriptionId
      );
      await this.hre.run(`${PACKAGE_NAME}:${Task.functions}`, {
        subtask: FunctionsSubtask.cancelSubscription,
        args: JSON.stringify({
          functionsRouterAddress: functionsRouterContract.address,
          subscriptionId: subscriptionId.toString(),
          receivingAddress: "",
        }),
      });

      const balance = await linkTokenContract.balanceOf(account.address);
      expect(balance.toString()).eq(balanceInitial.toString());
    });

    it("Add Subscription Consumer", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.run(`${PACKAGE_NAME}:${Task.functions}`, {
        subtask: FunctionsSubtask.addConsumer,
        args: JSON.stringify({
          functionsRouterAddress: functionsRouterContract.address,
          consumerAddress: functionsConsumerContract.address,
          subscriptionId: subscriptionId.toString(),
        }),
      });

      const subscriptionDetails =
        await this.hre.chainlink.functions.getSubscriptionDetails(
          functionsRouterContract.address,
          subscriptionId
        );

      expect(
        subscriptionDetails.consumers.includes(
          functionsConsumerContract.address
        )
      ).to.be.true;
    });

    it("Remove Subscription Consumer", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.chainlink.functions.addConsumer(
        functionsRouterContract.address,
        functionsConsumerContract.address,
        subscriptionId
      );
      await this.hre.run(`${PACKAGE_NAME}:${Task.functions}`, {
        subtask: FunctionsSubtask.removeConsumer,
        args: JSON.stringify({
          functionsRouterAddress: functionsRouterContract.address,
          consumerAddress: functionsConsumerContract.address,
          subscriptionId: subscriptionId.toString(),
        }),
      });

      const subscriptionDetails =
        await this.hre.chainlink.functions.getSubscriptionDetails(
          functionsRouterContract.address,
          subscriptionId
        );

      expect(
        subscriptionDetails.consumers.includes(
          functionsConsumerContract.address
        )
      ).to.be.false;
    });

    it("Request Subscription Ownership Transfer", async function () {
      const [_, receiver] = await this.hre.ethers.getSigners();
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address
        );
      await this.hre.run(`${PACKAGE_NAME}:${Task.functions}`, {
        subtask: FunctionsSubtask.requestSubscriptionOwnerTransfer,
        args: JSON.stringify({
          functionsRouterAddress: functionsRouterContract.address,
          subscriptionId: subscriptionId.toString(),
          newOwnerAddress: receiver.address,
        }),
      });
      await this.hre.chainlink.functions.acceptSubscriptionOwnerTransfer(
        functionsRouterContract.address,
        subscriptionId,
        {
          signer: receiver,
        }
      );

      const subscriptionDetails =
        await this.hre.chainlink.functions.getSubscriptionDetails(
          functionsRouterContract.address,
          subscriptionId
        );

      expect(subscriptionDetails.owner).eq(receiver.address);
    });

    it("Accept Subscription Ownership Transfer", async function () {
      const [receiver, owner] = await this.hre.ethers.getSigners();
      const { subscriptionId } =
        await this.hre.chainlink.functions.createSubscription(
          functionsRouterContract.address,
          "",
          {
            signer: owner,
          }
        );
      await this.hre.chainlink.functions.requestSubscriptionOwnerTransfer(
        functionsRouterContract.address,
        subscriptionId,
        receiver.address,
        {
          signer: owner,
        }
      );
      await this.hre.run(`${PACKAGE_NAME}:${Task.functions}`, {
        subtask: FunctionsSubtask.acceptSubscriptionOwnerTransfer,
        args: JSON.stringify({
          functionsRouterAddress: functionsRouterContract.address,
          subscriptionId: subscriptionId.toString(),
        }),
      });

      const subscriptionDetails =
        await this.hre.chainlink.functions.getSubscriptionDetails(
          functionsRouterContract.address,
          subscriptionId
        );

      expect(subscriptionDetails.owner).eq(receiver.address);
    });
  });
});
