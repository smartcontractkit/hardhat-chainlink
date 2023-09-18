import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { randomBytes } from "crypto";
import { BigNumber } from "ethers";

import { PACKAGE_NAME } from "../src/shared/constants";
import { Task, VRFSubtask } from "../src/shared/enums";

import { useEnvironment } from "./helpers";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Test chainlink:vrf module", function () {
  const TYPE_AND_VERSION = "VRFCoordinatorV2 1.0.0";
  const MAX_CONSUMERS = 100;
  const MAX_REQUEST_CONFIRMATIONS = 200;
  const MAX_NUM_WORDS = 500;
  const MINIMUM_REQUEST_CONFIRMATIONS = 3;
  const MAX_GAS_LIMIT = 2_500_000;
  const STALENESS_SECONDS = 2_700;
  const GAS_AFTER_PAYMENT_CALCULATION = 33_285;
  const MIN_REQUEST_CONFIRMATIONS = 3;
  const MAX_REQUEST_GAS_LIMIT = 2_500_000;
  const FALLBACK_WEI_PER_UNIT_LINK = 1_000;
  const FULFILLMENT_FLAT_FEE_LINK_PPM_TIER = 250_000;
  const REQS_FOR_TIER = 0;
  const SUBSCRIPTION_BALANCE = 50_000;
  const KEY_HASH = randomBytes(32);
  const DECIMALS = 18;
  const INITIAL_ANSWER = 1_000;

  function beforeShared() {
    return async function (this: Mocha.Context) {
      const ethers = this.hre.ethers;
      this.linkToken = await (
        await ethers.getContractFactory("LinkToken")
      ).deploy();
      this.blockhashStore = await (
        await ethers.getContractFactory("BlockhashStore")
      ).deploy();
      this.dataFeed = await (
        await ethers.getContractFactory("MockV3Aggregator")
      ).deploy(DECIMALS, INITIAL_ANSWER);
      this.vrf = await (
        await ethers.getContractFactory("VRFCoordinatorV2")
      ).deploy(
        this.linkToken.address,
        this.dataFeed.address,
        this.blockhashStore.address
      );
      await this.vrf.setConfig(
        MINIMUM_REQUEST_CONFIRMATIONS,
        MAX_GAS_LIMIT,
        STALENESS_SECONDS,
        GAS_AFTER_PAYMENT_CALCULATION,
        FALLBACK_WEI_PER_UNIT_LINK,
        {
          fulfillmentFlatFeeLinkPPMTier1: FULFILLMENT_FLAT_FEE_LINK_PPM_TIER,
          fulfillmentFlatFeeLinkPPMTier2: FULFILLMENT_FLAT_FEE_LINK_PPM_TIER,
          fulfillmentFlatFeeLinkPPMTier3: FULFILLMENT_FLAT_FEE_LINK_PPM_TIER,
          fulfillmentFlatFeeLinkPPMTier4: FULFILLMENT_FLAT_FEE_LINK_PPM_TIER,
          fulfillmentFlatFeeLinkPPMTier5: FULFILLMENT_FLAT_FEE_LINK_PPM_TIER,
          reqsForTier2: REQS_FOR_TIER,
          reqsForTier3: REQS_FOR_TIER,
          reqsForTier4: REQS_FOR_TIER,
          reqsForTier5: REQS_FOR_TIER,
        }
      );
    };
  }

  describe("Run methods as hre methods", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Creates subscription", async function () {
      const { subscriptionId, transactionHash } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      expect(transactionHash).not.to.be.undefined;
      expect(subscriptionId.toString()).to.eq("1");
    });

    it("Funds subscription", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      const { transactionHash } = await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Cancels subscription", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      const { transactionHash } =
        await this.hre.chainlink.vrf.cancelSubscription(
          this.vrf.address,
          subscriptionId,
          signer.address
        );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Adds consumer", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      const { transactionHash } = await this.hre.chainlink.vrf.addConsumer(
        this.vrf.address,
        signer.address,
        subscriptionId
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Removes consumer", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      await this.hre.chainlink.vrf.addConsumer(
        this.vrf.address,
        signer.address,
        subscriptionId
      );

      const { transactionHash } = await this.hre.chainlink.vrf.removeConsumer(
        this.vrf.address,
        signer.address,
        subscriptionId
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Requests random words", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      await this.hre.chainlink.vrf.addConsumer(
        this.vrf.address,
        signer.address,
        subscriptionId
      );

      const { transactionHash } =
        await this.hre.chainlink.vrf.requestRandomWords(
          this.vrf.address,
          KEY_HASH,
          subscriptionId,
          MAX_REQUEST_CONFIRMATIONS,
          MAX_GAS_LIMIT,
          MAX_NUM_WORDS
        );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Checks if pending request not exists", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      const isPendingRequestExists =
        await this.hre.chainlink.vrf.isPendingRequestExists(
          this.vrf.address,
          subscriptionId
        );

      expect(isPendingRequestExists).to.eq(false);
    });

    it("Gets subscription details", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      await this.hre.chainlink.vrf.addConsumer(
        this.vrf.address,
        signer.address,
        subscriptionId
      );

      const { balance, reqCount, owner, consumers } =
        await this.hre.chainlink.vrf.getSubscriptionDetails(
          this.vrf.address,
          subscriptionId
        );

      expect(balance.toString()).to.eq(SUBSCRIPTION_BALANCE.toString());
      expect(reqCount.toString()).to.eq("0".toString());
      expect(owner).to.eq(signer.address);
      expect(consumers.length).to.eq(1);
      expect(consumers[0]).to.eq(signer.address);
    });

    it("Requests subscriptions owner transfer", async function () {
      const [_, newOwner] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.requestSubscriptionOwnerTransfer(
        this.vrf.address,
        subscriptionId,
        newOwner.address
      );

      await this.vrf
        .connect(newOwner)
        .acceptSubscriptionOwnerTransfer(subscriptionId);

      const { owner: subscriptionOwner } =
        await this.hre.chainlink.vrf.getSubscriptionDetails(
          this.vrf.address,
          subscriptionId
        );

      expect(subscriptionOwner).to.eq(newOwner.address);
    });

    it("Accepts subscriptions owner transfer", async function () {
      const [newOwner, owner] = await this.hre.ethers.getSigners();

      const tx = await this.vrf.connect(owner).createSubscription();
      const txReceipt = await tx.wait(this.hre.config.chainlink.confirmations);
      const subscriptionId = BigNumber.from(txReceipt.events[0].topics[1]);

      await this.vrf
        .connect(owner)
        .requestSubscriptionOwnerTransfer(
          subscriptionId.toString(),
          newOwner.address
        );

      await this.hre.chainlink.vrf.acceptSubscriptionOwnerTransfer(
        this.vrf.address,
        subscriptionId
      );

      const { owner: subscriptionOwner } =
        await this.hre.chainlink.vrf.getSubscriptionDetails(
          this.vrf.address,
          subscriptionId
        );

      expect(subscriptionOwner).to.eq(newOwner.address);
    });

    it("Gets config", async function () {
      const {
        minimumRequestConfirmations,
        maxGasLimit,
        stalenessSeconds,
        gasAfterPaymentCalculation,
      } = await this.hre.chainlink.vrf.getConfig(this.vrf.address);

      expect(minimumRequestConfirmations).to.eq(MINIMUM_REQUEST_CONFIRMATIONS);
      expect(maxGasLimit).to.eq(MAX_GAS_LIMIT);
      expect(stalenessSeconds).to.eq(STALENESS_SECONDS);
      expect(gasAfterPaymentCalculation).to.eq(GAS_AFTER_PAYMENT_CALCULATION);
    });

    it("Gets min request confirmations", async function () {
      const minRequestConfirmations =
        await this.hre.chainlink.vrf.getMinRequestConfirmations(
          this.vrf.address
        );

      expect(minRequestConfirmations).to.eq(MIN_REQUEST_CONFIRMATIONS);
    });

    it("Gets max request gas limit", async function () {
      const maxRequestGasLimit =
        await this.hre.chainlink.vrf.getMaxRequestGasLimit(this.vrf.address);

      expect(maxRequestGasLimit).to.eq(MAX_REQUEST_GAS_LIMIT);
    });

    it("Gets max consumers", async function () {
      const maxConsumers = await this.hre.chainlink.vrf.getMaxConsumers(
        this.vrf.address
      );

      expect(maxConsumers).to.eq(MAX_CONSUMERS);
    });

    it("Gets max number of words", async function () {
      const maxNumberOfWords = await this.hre.chainlink.vrf.getMaxNumberOfWords(
        this.vrf.address
      );

      expect(maxNumberOfWords).to.eq(MAX_NUM_WORDS);
    });

    it("Gets max request confirmations", async function () {
      const maxRequestConfirmations =
        await this.hre.chainlink.vrf.getMaxRequestConfirmations(
          this.vrf.address
        );

      expect(maxRequestConfirmations).to.eq(MAX_REQUEST_CONFIRMATIONS);
    });

    it("Gets type and version", async function () {
      const typeAndVersion = await this.hre.chainlink.vrf.getTypeAndVersion(
        this.vrf.address
      );

      expect(typeAndVersion).to.eq(TYPE_AND_VERSION);
    });
  });

  describe("Run methods as hre subtasks", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Creates subscription", async function () {
      const { transactionHash, subscriptionId } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.createSubscription}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
        }
      );

      expect(transactionHash).not.to.be.undefined;
      expect(subscriptionId.toString()).to.eq("1");
    });

    it("Funds subscription", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.fundSubscription}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
          linkTokenAddress: this.linkToken.address,
          amountInJuels: SUBSCRIPTION_BALANCE.toString(),
          subscriptionId: subscriptionId.toString(),
        }
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Cancels subscription", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.cancelSubscription}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
          subscriptionId: subscriptionId.toString(),
          receivingAddress: signer.address,
        }
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Adds consumer", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.addConsumer}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
          consumerAddress: signer.address,
          subscriptionId: subscriptionId.toString(),
        }
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Removes consumer", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      await this.hre.chainlink.vrf.addConsumer(
        this.vrf.address,
        signer.address,
        subscriptionId
      );

      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.removeConsumer}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
          consumerAddress: signer.address,
          subscriptionId: subscriptionId.toString(),
        }
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Requests random words", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      await this.hre.chainlink.vrf.addConsumer(
        this.vrf.address,
        signer.address,
        subscriptionId
      );

      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.requestRandomWords}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
          keyHash: `0x${KEY_HASH.toString("hex")}`,
          subscriptionId: subscriptionId.toString(),
          requestConfirmations: MAX_REQUEST_CONFIRMATIONS.toString(),
          callbackGasLimit: MAX_GAS_LIMIT.toString(),
          numWords: MAX_NUM_WORDS.toString(),
        }
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Checks if pending request not exists", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      const isPendingRequestExists = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.isPendingRequestExists}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
          subscriptionId: subscriptionId.toString(),
        }
      );

      expect(isPendingRequestExists).to.eq(false);
    });

    it("Gets subscription details", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      await this.hre.chainlink.vrf.addConsumer(
        this.vrf.address,
        signer.address,
        subscriptionId
      );

      const { balance, reqCount, owner, consumers } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.getSubscriptionDetails}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
          subscriptionId: subscriptionId.toString(),
        }
      );

      expect(balance.toString()).to.eq(SUBSCRIPTION_BALANCE.toString());
      expect(reqCount.toString()).to.eq("0".toString());
      expect(owner).to.eq(signer.address);
      expect(consumers.length).to.eq(1);
      expect(consumers[0]).to.eq(signer.address);
    });

    it("Requests subscriptions owner transfer", async function () {
      const [_, newOwner] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.requestSubscriptionOwnerTransfer}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
          subscriptionId: subscriptionId.toString(),
          newOwnerAddress: newOwner.address,
        }
      );

      await this.vrf
        .connect(newOwner)
        .acceptSubscriptionOwnerTransfer(subscriptionId);

      const { owner: subscriptionOwner } =
        await this.hre.chainlink.vrf.getSubscriptionDetails(
          this.vrf.address,
          subscriptionId
        );

      expect(subscriptionOwner).to.eq(newOwner.address);
    });

    it("Accepts subscriptions owner transfer", async function () {
      const [newOwner, owner] = await this.hre.ethers.getSigners();

      const tx = await this.vrf.connect(owner).createSubscription();
      const txReceipt = await tx.wait(this.hre.config.chainlink.confirmations);
      const subscriptionId = BigNumber.from(txReceipt.events[0].topics[1]);

      await this.vrf
        .connect(owner)
        .requestSubscriptionOwnerTransfer(
          subscriptionId.toString(),
          newOwner.address
        );

      await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.acceptSubscriptionOwnerTransfer}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
          subscriptionId: subscriptionId.toString(),
        }
      );

      const { owner: subscriptionOwner } =
        await this.hre.chainlink.vrf.getSubscriptionDetails(
          this.vrf.address,
          subscriptionId
        );

      expect(subscriptionOwner).to.eq(newOwner.address);
    });

    it("Gets config", async function () {
      const {
        minimumRequestConfirmations,
        maxGasLimit,
        stalenessSeconds,
        gasAfterPaymentCalculation,
      } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.getConfig}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
        }
      );

      expect(minimumRequestConfirmations).to.eq(MINIMUM_REQUEST_CONFIRMATIONS);
      expect(maxGasLimit).to.eq(MAX_GAS_LIMIT);
      expect(stalenessSeconds).to.eq(STALENESS_SECONDS);
      expect(gasAfterPaymentCalculation).to.eq(GAS_AFTER_PAYMENT_CALCULATION);
    });

    it("Gets min request confirmations", async function () {
      const minRequestConfirmations = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.getMinRequestConfirmations}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
        }
      );

      expect(minRequestConfirmations).to.eq(MIN_REQUEST_CONFIRMATIONS);
    });

    it("Gets max request gas limit", async function () {
      const maxRequestGasLimit = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.getMaxRequestGasLimit}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
        }
      );

      expect(maxRequestGasLimit).to.eq(MAX_REQUEST_GAS_LIMIT);
    });

    it("Gets max consumers", async function () {
      const maxConsumers = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.getMaxConsumers}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
        }
      );

      expect(maxConsumers).to.eq(MAX_CONSUMERS);
    });

    it("Gets max number of words", async function () {
      const maxNumberOfWords = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.getMaxNumberOfWords}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
        }
      );

      expect(maxNumberOfWords).to.eq(MAX_NUM_WORDS);
    });

    it("Gets max request confirmations", async function () {
      const maxRequestConfirmations = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.getMaxRequestConfirmations}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
        }
      );

      expect(maxRequestConfirmations).to.eq(MAX_REQUEST_CONFIRMATIONS);
    });

    it("Gets type and version", async function () {
      const typeAndVersion = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}:${VRFSubtask.getTypeAndVersion}`,
        {
          vrfCoordinatorAddress: this.vrf.address,
        }
      );

      expect(typeAndVersion).to.eq(TYPE_AND_VERSION);
    });
  });

  describe("Run methods as subtasks of a hre task", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Creates subscription", async function () {
      const { transactionHash, subscriptionId } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}`,
        {
          subtask: VRFSubtask.createSubscription,
          args: JSON.stringify({
            vrfCoordinatorAddress: this.vrf.address,
          }),
        }
      );

      expect(transactionHash).not.to.be.undefined;
      expect(subscriptionId.toString()).to.eq("1");
    });

    it("Funds subscription", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}`,
        {
          subtask: VRFSubtask.fundSubscription,
          args: JSON.stringify({
            vrfCoordinatorAddress: this.vrf.address,
            linkTokenAddress: this.linkToken.address,
            amountInJuels: SUBSCRIPTION_BALANCE.toString(),
            subscriptionId: subscriptionId.toString(),
          }),
        }
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Cancels subscription", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}`,
        {
          subtask: VRFSubtask.cancelSubscription,
          args: JSON.stringify({
            vrfCoordinatorAddress: this.vrf.address,
            subscriptionId: subscriptionId.toString(),
            receivingAddress: signer.address,
          }),
        }
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Adds consumer", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}`,
        {
          subtask: VRFSubtask.addConsumer,
          args: JSON.stringify({
            vrfCoordinatorAddress: this.vrf.address,
            consumerAddress: signer.address,
            subscriptionId: subscriptionId.toString(),
          }),
        }
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Removes consumer", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      await this.hre.chainlink.vrf.addConsumer(
        this.vrf.address,
        signer.address,
        subscriptionId
      );

      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}`,
        {
          subtask: VRFSubtask.removeConsumer,
          args: JSON.stringify({
            vrfCoordinatorAddress: this.vrf.address,
            consumerAddress: signer.address,
            subscriptionId: subscriptionId.toString(),
          }),
        }
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Requests random words", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      await this.hre.chainlink.vrf.addConsumer(
        this.vrf.address,
        signer.address,
        subscriptionId
      );

      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}`,
        {
          subtask: VRFSubtask.requestRandomWords,
          args: JSON.stringify({
            vrfCoordinatorAddress: this.vrf.address,
            keyHash: `0x${KEY_HASH.toString("hex")}`,
            subscriptionId: subscriptionId.toString(),
            requestConfirmations: MAX_REQUEST_CONFIRMATIONS.toString(),
            callbackGasLimit: MAX_GAS_LIMIT.toString(),
            numWords: MAX_NUM_WORDS.toString(),
          }),
        }
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Checks if pending request not exists", async function () {
      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      const isPendingRequestExists = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}`,
        {
          subtask: VRFSubtask.isPendingRequestExists,
          args: JSON.stringify({
            vrfCoordinatorAddress: this.vrf.address,
            subscriptionId: subscriptionId.toString(),
          }),
        }
      );

      expect(isPendingRequestExists).to.eq(false);
    });

    it("Gets subscription details", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.chainlink.vrf.fundSubscription(
        this.vrf.address,
        this.linkToken.address,
        SUBSCRIPTION_BALANCE,
        subscriptionId
      );

      await this.hre.chainlink.vrf.addConsumer(
        this.vrf.address,
        signer.address,
        subscriptionId
      );

      const { balance, reqCount, owner, consumers } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}`,
        {
          subtask: VRFSubtask.getSubscriptionDetails,
          args: JSON.stringify({
            vrfCoordinatorAddress: this.vrf.address,
            subscriptionId: subscriptionId.toString(),
          }),
        }
      );

      expect(balance.toString()).to.eq(SUBSCRIPTION_BALANCE.toString());
      expect(reqCount.toString()).to.eq("0".toString());
      expect(owner).to.eq(signer.address);
      expect(consumers.length).to.eq(1);
      expect(consumers[0]).to.eq(signer.address);
    });

    it("Requests subscriptions owner transfer", async function () {
      const [_, newOwner] = await this.hre.ethers.getSigners();

      const { subscriptionId } =
        await this.hre.chainlink.vrf.createSubscription(this.vrf.address);

      await this.hre.run(`${PACKAGE_NAME}:${Task.vrf}`, {
        subtask: VRFSubtask.requestSubscriptionOwnerTransfer,
        args: JSON.stringify({
          vrfCoordinatorAddress: this.vrf.address,
          subscriptionId: subscriptionId.toString(),
          newOwnerAddress: newOwner.address,
        }),
      });

      await this.vrf
        .connect(newOwner)
        .acceptSubscriptionOwnerTransfer(subscriptionId);

      const { owner: subscriptionOwner } =
        await this.hre.chainlink.vrf.getSubscriptionDetails(
          this.vrf.address,
          subscriptionId
        );

      expect(subscriptionOwner).to.eq(newOwner.address);
    });

    it("Accepts subscriptions owner transfer", async function () {
      const [newOwner, owner] = await this.hre.ethers.getSigners();

      const tx = await this.vrf.connect(owner).createSubscription();
      const txReceipt = await tx.wait(this.hre.config.chainlink.confirmations);
      const subscriptionId = BigNumber.from(txReceipt.events[0].topics[1]);

      await this.vrf
        .connect(owner)
        .requestSubscriptionOwnerTransfer(
          subscriptionId.toString(),
          newOwner.address
        );

      await this.hre.run(`${PACKAGE_NAME}:${Task.vrf}`, {
        subtask: VRFSubtask.acceptSubscriptionOwnerTransfer,
        args: JSON.stringify({
          vrfCoordinatorAddress: this.vrf.address,
          subscriptionId: subscriptionId.toString(),
        }),
      });

      const { owner: subscriptionOwner } =
        await this.hre.chainlink.vrf.getSubscriptionDetails(
          this.vrf.address,
          subscriptionId
        );

      expect(subscriptionOwner).to.eq(newOwner.address);
    });

    it("Gets config", async function () {
      const {
        minimumRequestConfirmations,
        maxGasLimit,
        stalenessSeconds,
        gasAfterPaymentCalculation,
      } = await this.hre.run(`${PACKAGE_NAME}:${Task.vrf}`, {
        subtask: VRFSubtask.getConfig,
        args: JSON.stringify({
          vrfCoordinatorAddress: this.vrf.address,
        }),
      });

      expect(minimumRequestConfirmations).to.eq(MINIMUM_REQUEST_CONFIRMATIONS);
      expect(maxGasLimit).to.eq(MAX_GAS_LIMIT);
      expect(stalenessSeconds).to.eq(STALENESS_SECONDS);
      expect(gasAfterPaymentCalculation).to.eq(GAS_AFTER_PAYMENT_CALCULATION);
    });

    it("Gets min request confirmations", async function () {
      const minRequestConfirmations = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}`,
        {
          subtask: VRFSubtask.getMinRequestConfirmations,
          args: JSON.stringify({
            vrfCoordinatorAddress: this.vrf.address,
          }),
        }
      );

      expect(minRequestConfirmations).to.eq(MIN_REQUEST_CONFIRMATIONS);
    });

    it("Gets max request gas limit", async function () {
      const maxRequestGasLimit = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}`,
        {
          subtask: VRFSubtask.getMaxRequestGasLimit,
          args: JSON.stringify({
            vrfCoordinatorAddress: this.vrf.address,
          }),
        }
      );

      expect(maxRequestGasLimit).to.eq(MAX_REQUEST_GAS_LIMIT);
    });

    it("Gets max consumers", async function () {
      const maxConsumers = await this.hre.run(`${PACKAGE_NAME}:${Task.vrf}`, {
        subtask: VRFSubtask.getMaxConsumers,
        args: JSON.stringify({
          vrfCoordinatorAddress: this.vrf.address,
        }),
      });

      expect(maxConsumers).to.eq(MAX_CONSUMERS);
    });

    it("Gets max number of words", async function () {
      const maxNumberOfWords = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}`,
        {
          subtask: VRFSubtask.getMaxNumberOfWords,
          args: JSON.stringify({
            vrfCoordinatorAddress: this.vrf.address,
          }),
        }
      );

      expect(maxNumberOfWords).to.eq(MAX_NUM_WORDS);
    });

    it("Gets max request confirmations", async function () {
      const maxRequestConfirmations = await this.hre.run(
        `${PACKAGE_NAME}:${Task.vrf}`,
        {
          subtask: VRFSubtask.getMaxRequestConfirmations,
          args: JSON.stringify({
            vrfCoordinatorAddress: this.vrf.address,
          }),
        }
      );

      expect(maxRequestConfirmations).to.eq(MAX_REQUEST_CONFIRMATIONS);
    });

    it("Gets type and version", async function () {
      const typeAndVersion = await this.hre.run(`${PACKAGE_NAME}:${Task.vrf}`, {
        subtask: VRFSubtask.getTypeAndVersion,
        args: JSON.stringify({
          vrfCoordinatorAddress: this.vrf.address,
        }),
      });

      expect(typeAndVersion).to.eq(TYPE_AND_VERSION);
    });
  });
});
