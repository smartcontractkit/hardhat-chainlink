import { expect } from "chai";
import { BigNumber } from "ethers";

import { PACKAGE_NAME } from "../src/shared/constants";
import {
  AutomationRegistrySubtask,
  KeeperRegistryVersion,
  Task,
} from "../src/shared/enums";

import { useEnvironment } from "./helpers";

enum MigrationPermission {
  NONE,
  OUTGOING,
  INCOMING,
  BIDIRECTIONAL,
}

describe("Test chainlink:automationRegistry module", function () {
  const DECIMALS = 18;
  const INITIAL_ANSWER = 10;
  const GAS_LIMIT = 500_000;
  const EMPTY_BYTES = "0x";
  const LINK_JUELS_ALLOWANCE = "100000000000000000000";
  const LINK_JUELS_TO_FUND = "100000000000000000";
  const REGISTRY_CONFIG = {
    paymentPremiumPPB: 250000000, // uint32
    flatFeeMicroLink: 0, // uint32
    blockCountPerTurn: 1, // uint24
    checkGasLimit: GAS_LIMIT, // uint32
    stalenessSeconds: 3600, // uint24
    gasCeilingMultiplier: 1, // uint16
    minUpkeepSpend: 0, // uint96
    maxPerformGas: GAS_LIMIT, // uint32
    fallbackGasPrice: 100, // uint256
    fallbackLinkPrice: 200000000, // uint256
  };
  const UINT32_MAX = BigNumber.from("0xffffffff");
  const MAX_PAYMENT_FOR_GAS_EXPECTED = "625001250000000000000000";
  const MIN_BALANCE_FOR_UPKEEP_EXPECTED = "625001250000000000000000";
  const TRANSCODER_VERSION = 1;

  function beforeShared() {
    return async function (this: Mocha.Context) {
      const ethers = this.hre.ethers;
      const [signer, registrar, keeper1, keeper2, payee1, payee2] =
        await this.hre.ethers.getSigners();

      this.dataFeed = await (
        await ethers.getContractFactory("MockV3Aggregator")
      ).deploy(DECIMALS, INITIAL_ANSWER);

      this.linkToken = await (
        await ethers.getContractFactory("LinkToken")
      ).deploy();

      this.upkeepTranscoder = await (
        await ethers.getContractFactory("UpkeepTranscoder")
      ).deploy();

      this.upkeep = await (
        await ethers.getContractFactory("UpkeepMock")
      ).deploy();
      await this.upkeep.setShouldRevertCheck(false);
      await this.upkeep.setCanCheck(true);
      await this.upkeep.setCanPerform(true);

      this.keeperRegistryBase = await (
        await ethers.getContractFactory("KeeperRegistryLogic1_3")
      ).deploy(
        0,
        1,
        this.linkToken.address,
        this.dataFeed.address,
        this.dataFeed.address
      );

      this.keeperRegistry = await (
        await ethers.getContractFactory("KeeperRegistry1_3")
      ).deploy(this.keeperRegistryBase.address, {
        ...REGISTRY_CONFIG,
        transcoder: this.upkeepTranscoder.address,
        registrar: registrar.address,
      });
      this.keeperRegistryDestination = await (
        await ethers.getContractFactory("KeeperRegistry1_3")
      ).deploy(this.keeperRegistryBase.address, {
        ...REGISTRY_CONFIG,
        transcoder: this.upkeepTranscoder.address,
        registrar: registrar.address,
      });

      await this.keeperRegistry.setPeerRegistryMigrationPermission(
        this.keeperRegistryDestination.address,
        MigrationPermission.BIDIRECTIONAL
      );
      await this.keeperRegistryDestination.setPeerRegistryMigrationPermission(
        this.keeperRegistry.address,
        MigrationPermission.BIDIRECTIONAL
      );

      await this.keeperRegistry.setKeepers(
        [keeper1.address, keeper2.address],
        [payee1.address, payee2.address]
      );

      const tx = await this.keeperRegistry.registerUpkeep(
        this.upkeep.address,
        GAS_LIMIT,
        signer.address,
        EMPTY_BYTES
      );
      const txReceipt = await tx.wait(this.hre.config.chainlink.confirmations);
      this.upkeepId = BigNumber.from(txReceipt.events[0].topics[1]);

      await this.linkToken.approve(
        this.keeperRegistry.address,
        LINK_JUELS_ALLOWANCE
      );
    };
  }

  describe("Run methods as hre methods", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Gets state", async function () {
      const [, registrarAccount, keeper1, keeper2] =
        await this.hre.ethers.getSigners();
      const {
        nonce,
        ownerLinkBalance,
        expectedLinkBalance,
        numUpkeeps,
        paymentPremiumPPB,
        flatFeeMicroLink,
        blockCountPerTurn,
        checkGasLimit,
        stalenessSeconds,
        gasCeilingMultiplier,
        minUpkeepSpend,
        maxPerformGas,
        fallbackGasPrice,
        fallbackLinkPrice,
        transcoder,
        registrar,
        keepers,
      } = await this.hre.chainlink.automationRegistry.getState(
        this.keeperRegistry.address
      );

      expect(nonce).to.eq(1);
      expect(ownerLinkBalance.toNumber()).to.eq(0);
      expect(expectedLinkBalance.toNumber()).to.eq(0);
      expect(numUpkeeps.toNumber()).to.eq(1);
      expect(paymentPremiumPPB).to.eq(REGISTRY_CONFIG.paymentPremiumPPB);
      expect(flatFeeMicroLink).to.eq(REGISTRY_CONFIG.flatFeeMicroLink);
      expect(blockCountPerTurn).to.eq(REGISTRY_CONFIG.blockCountPerTurn);
      expect(checkGasLimit).to.eq(REGISTRY_CONFIG.checkGasLimit);
      expect(stalenessSeconds).to.eq(REGISTRY_CONFIG.stalenessSeconds);
      expect(gasCeilingMultiplier).to.eq(REGISTRY_CONFIG.gasCeilingMultiplier);
      expect(minUpkeepSpend.toNumber()).to.eq(REGISTRY_CONFIG.minUpkeepSpend);
      expect(maxPerformGas).to.eq(REGISTRY_CONFIG.maxPerformGas);
      expect(fallbackGasPrice.toNumber()).to.eq(
        REGISTRY_CONFIG.fallbackGasPrice
      );
      expect(fallbackLinkPrice.toNumber()).to.eq(
        REGISTRY_CONFIG.fallbackLinkPrice
      );
      expect(transcoder).to.eq(this.upkeepTranscoder.address);
      expect(registrar).to.eq(registrarAccount.address);
      expect(keepers).to.have.ordered.members([
        keeper1.address,
        keeper2.address,
      ]);
    });

    it("Gets active upkeep ids", async function () {
      const [upkeepId] =
        await this.hre.chainlink.automationRegistry.getActiveUpkeepIDs(
          this.keeperRegistry.address,
          0,
          1
        );
      expect(upkeepId.toString()).to.eq(this.upkeepId.toString());
    });

    it("Gets max payment for gas", async function () {
      const maxPaymentForGas =
        await this.hre.chainlink.automationRegistry.getMaxPaymentForGas(
          this.keeperRegistry.address,
          GAS_LIMIT
        );
      expect(maxPaymentForGas.toString()).to.eq(MAX_PAYMENT_FOR_GAS_EXPECTED);
    });

    it("Check if paused", async function () {
      const isPaused = await this.hre.chainlink.automationRegistry.isPaused(
        this.keeperRegistry.address
      );
      expect(isPaused).to.eq(false);
    });

    it("Gets upkeep", async function () {
      const [signer] = await this.hre.ethers.getSigners();
      const {
        target,
        balance,
        lastAutomationNode,
        admin,
        maxValidBlocknumber,
        amountSpent,
        checkData,
        executeGas,
      } = await this.hre.chainlink.automationRegistry.getUpkeep(
        this.keeperRegistry.address,
        this.upkeepId
      );

      expect(target).to.eq(this.upkeep.address);
      expect(balance.toNumber()).to.eq(0);
      expect(lastAutomationNode).to.eq(this.hre.ethers.constants.AddressZero);
      expect(admin).to.eq(signer.address);
      expect(maxValidBlocknumber.toString()).to.eq(UINT32_MAX.toString());
      expect(amountSpent.toNumber()).to.eq(0);
      expect(checkData).to.eq(EMPTY_BYTES);
      expect(executeGas).to.eq(GAS_LIMIT);
    });

    it("Gets min balance for upkeep", async function () {
      const minBalanceForUpkeep =
        await this.hre.chainlink.automationRegistry.getMinBalanceForUpkeep(
          this.keeperRegistry.address,
          this.upkeepId
        );
      expect(minBalanceForUpkeep.toString()).to.eq(
        MIN_BALANCE_FOR_UPKEEP_EXPECTED
      );
    });

    it("Funds upkeep", async function () {
      const { transactionHash } =
        await this.hre.chainlink.automationRegistry.fundUpkeep(
          this.keeperRegistry.address,
          this.upkeepId,
          LINK_JUELS_TO_FUND
        );
      const { balance } = await this.hre.chainlink.automationRegistry.getUpkeep(
        this.keeperRegistry.address,
        this.upkeepId
      );

      expect(transactionHash).not.to.be.undefined;
      expect(balance.toString()).to.eq(LINK_JUELS_TO_FUND);
    });

    it("Migrates upkeeps", async function () {
      const { transactionHash } =
        await this.hre.chainlink.automationRegistry.migrateUpkeeps(
          this.keeperRegistry.address,
          [this.upkeepId],
          this.keeperRegistryDestination.address
        );

      const [upkeepId] =
        await this.hre.chainlink.automationRegistry.getActiveUpkeepIDs(
          this.keeperRegistryDestination.address,
          0,
          1
        );

      expect(transactionHash).not.to.be.undefined;
      expect(upkeepId.toString()).to.eq(this.upkeepId.toString());

      await this.hre.chainlink.automationRegistry.migrateUpkeeps(
        this.keeperRegistryDestination.address,
        [this.upkeepId],
        this.keeperRegistry.address
      );
    });

    it("Cancels upkeep", async function () {
      const { transactionHash } =
        await this.hre.chainlink.automationRegistry.cancelUpkeep(
          this.keeperRegistry.address,
          this.upkeepId
        );
      const { numUpkeeps } =
        await this.hre.chainlink.automationRegistry.getState(
          this.keeperRegistry.address
        );

      expect(transactionHash).not.to.be.undefined;
      expect(numUpkeeps.toNumber()).to.eq(0);
    });

    it("Withdraws funds", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { maxValidBlocknumber } =
        await this.hre.chainlink.automationRegistry.getUpkeep(
          this.keeperRegistry.address,
          this.upkeepId
        );

      if (maxValidBlocknumber.eq(UINT32_MAX)) {
        await this.hre.chainlink.automationRegistry.cancelUpkeep(
          this.keeperRegistry.address,
          this.upkeepId
        );
      }
      const { transactionHash } =
        await this.hre.chainlink.automationRegistry.withdrawFunds(
          this.keeperRegistry.address,
          this.upkeepId,
          signer.address
        );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Gets keeper info", async function () {
      const [, , keeper1, , payee1] = await this.hre.ethers.getSigners();
      const { payee, active, balance } =
        await this.hre.chainlink.automationRegistry.getKeeperInfo(
          this.keeperRegistry.address,
          keeper1.address
        );

      expect(payee).to.eq(payee1.address);
      expect(active).to.eq(true);
      expect(balance.toNumber()).to.eq(0);
    });

    it("Gets upkeep transcoder type and version", async function () {
      const typeAndVersion =
        await this.hre.chainlink.automationRegistry.getUpkeepTranscoderVersion(
          this.keeperRegistry.address
        );
      expect(typeAndVersion).to.eq(TRANSCODER_VERSION);
    });

    it("Gets type and version", async function () {
      const typeAndVersion =
        await this.hre.chainlink.automationRegistry.getTypeAndVersion(
          this.keeperRegistry.address
        );
      expect(typeAndVersion).to.eq(KeeperRegistryVersion.registry1_3);
    });
  });

  describe("Run methods as hre subtasks", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Gets state", async function () {
      const [, registrarAccount, keeper1, keeper2] =
        await this.hre.ethers.getSigners();
      const {
        nonce,
        ownerLinkBalance,
        expectedLinkBalance,
        numUpkeeps,
        paymentPremiumPPB,
        flatFeeMicroLink,
        blockCountPerTurn,
        checkGasLimit,
        stalenessSeconds,
        gasCeilingMultiplier,
        minUpkeepSpend,
        maxPerformGas,
        fallbackGasPrice,
        fallbackLinkPrice,
        transcoder,
        registrar,
        keepers,
      } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}:${AutomationRegistrySubtask.getState}`,
        {
          keeperRegistryAddress: this.keeperRegistry.address,
        }
      );

      expect(nonce).to.eq(1);
      expect(ownerLinkBalance.toNumber()).to.eq(0);
      expect(expectedLinkBalance.toNumber()).to.eq(0);
      expect(numUpkeeps.toNumber()).to.eq(1);
      expect(paymentPremiumPPB).to.eq(REGISTRY_CONFIG.paymentPremiumPPB);
      expect(flatFeeMicroLink).to.eq(REGISTRY_CONFIG.flatFeeMicroLink);
      expect(blockCountPerTurn).to.eq(REGISTRY_CONFIG.blockCountPerTurn);
      expect(checkGasLimit).to.eq(REGISTRY_CONFIG.checkGasLimit);
      expect(stalenessSeconds).to.eq(REGISTRY_CONFIG.stalenessSeconds);
      expect(gasCeilingMultiplier).to.eq(REGISTRY_CONFIG.gasCeilingMultiplier);
      expect(minUpkeepSpend.toNumber()).to.eq(REGISTRY_CONFIG.minUpkeepSpend);
      expect(maxPerformGas).to.eq(REGISTRY_CONFIG.maxPerformGas);
      expect(fallbackGasPrice.toNumber()).to.eq(
        REGISTRY_CONFIG.fallbackGasPrice
      );
      expect(fallbackLinkPrice.toNumber()).to.eq(
        REGISTRY_CONFIG.fallbackLinkPrice
      );
      expect(transcoder).to.eq(this.upkeepTranscoder.address);
      expect(registrar).to.eq(registrarAccount.address);
      expect(keepers).to.have.ordered.members([
        keeper1.address,
        keeper2.address,
      ]);
    });

    it("Gets active upkeep ids", async function () {
      const [upkeepId] = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}:${AutomationRegistrySubtask.getActiveUpkeepIDs}`,
        {
          keeperRegistryAddress: this.keeperRegistry.address,
          startIndex: "0",
          maxCount: "1",
        }
      );
      expect(upkeepId.toString()).to.eq(this.upkeepId.toString());
    });

    it("Gets max payment for gas", async function () {
      const maxPaymentForGas = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}:${AutomationRegistrySubtask.getMaxPaymentForGas}`,
        {
          keeperRegistryAddress: this.keeperRegistry.address,
          gasLimit: GAS_LIMIT.toString(),
        }
      );
      expect(maxPaymentForGas.toString()).to.eq(MAX_PAYMENT_FOR_GAS_EXPECTED);
    });

    it("Check if paused", async function () {
      const isPaused = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}:${AutomationRegistrySubtask.isPaused}`,
        {
          keeperRegistryAddress: this.keeperRegistry.address,
        }
      );
      expect(isPaused).to.eq(false);
    });

    it("Gets upkeep", async function () {
      const [signer] = await this.hre.ethers.getSigners();
      const {
        target,
        balance,
        lastAutomationNode,
        admin,
        maxValidBlocknumber,
        amountSpent,
        checkData,
        executeGas,
      } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}:${AutomationRegistrySubtask.getUpkeep}`,
        {
          keeperRegistryAddress: this.keeperRegistry.address,
          upkeepId: this.upkeepId.toString(),
        }
      );

      expect(target).to.eq(this.upkeep.address);
      expect(balance.toNumber()).to.eq(0);
      expect(lastAutomationNode).to.eq(this.hre.ethers.constants.AddressZero);
      expect(admin).to.eq(signer.address);
      expect(maxValidBlocknumber.toString()).to.eq(UINT32_MAX.toString());
      expect(amountSpent.toNumber()).to.eq(0);
      expect(checkData).to.eq(EMPTY_BYTES);
      expect(executeGas).to.eq(GAS_LIMIT);
    });

    it("Gets min balance for upkeep", async function () {
      const minBalanceForUpkeep = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}:${AutomationRegistrySubtask.getMinBalanceForUpkeep}`,
        {
          keeperRegistryAddress: this.keeperRegistry.address,
          upkeepId: this.upkeepId.toString(),
        }
      );
      expect(minBalanceForUpkeep.toString()).to.eq(
        MIN_BALANCE_FOR_UPKEEP_EXPECTED
      );
    });

    it("Funds upkeep", async function () {
      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}:${AutomationRegistrySubtask.fundUpkeep}`,
        {
          keeperRegistryAddress: this.keeperRegistry.address,
          upkeepId: this.upkeepId.toString(),
          amountInJuels: LINK_JUELS_TO_FUND,
        }
      );
      const { balance } = await this.hre.chainlink.automationRegistry.getUpkeep(
        this.keeperRegistry.address,
        this.upkeepId
      );

      expect(transactionHash).not.to.be.undefined;
      expect(balance.toString()).to.eq(LINK_JUELS_TO_FUND);
    });

    it("Migrates upkeeps", async function () {
      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}:${AutomationRegistrySubtask.migrateUpkeeps}`,
        {
          keeperRegistryAddress: this.keeperRegistry.address,
          upkeepIds: [this.upkeepId.toString()].join(","),
          destination: this.keeperRegistryDestination.address,
        }
      );

      const [upkeepId] =
        await this.hre.chainlink.automationRegistry.getActiveUpkeepIDs(
          this.keeperRegistryDestination.address,
          0,
          1
        );

      expect(transactionHash).not.to.be.undefined;
      expect(upkeepId.toString()).to.eq(this.upkeepId.toString());

      await this.hre.chainlink.automationRegistry.migrateUpkeeps(
        this.keeperRegistryDestination.address,
        [this.upkeepId],
        this.keeperRegistry.address
      );
    });

    it("Cancels upkeep", async function () {
      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}:${AutomationRegistrySubtask.cancelUpkeep}`,
        {
          keeperRegistryAddress: this.keeperRegistry.address,
          upkeepId: this.upkeepId.toString(),
        }
      );
      const { numUpkeeps } =
        await this.hre.chainlink.automationRegistry.getState(
          this.keeperRegistry.address
        );

      expect(transactionHash).not.to.be.undefined;
      expect(numUpkeeps.toNumber()).to.eq(0);
    });

    it("Withdraws funds", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { maxValidBlocknumber } =
        await this.hre.chainlink.automationRegistry.getUpkeep(
          this.keeperRegistry.address,
          this.upkeepId
        );

      if (maxValidBlocknumber.eq(UINT32_MAX)) {
        await this.hre.chainlink.automationRegistry.cancelUpkeep(
          this.keeperRegistry.address,
          this.upkeepId
        );
      }
      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}:${AutomationRegistrySubtask.withdrawFunds}`,
        {
          keeperRegistryAddress: this.keeperRegistry.address,
          upkeepId: this.upkeepId.toString(),
          receivingAddress: signer.address,
        }
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Gets keeper info", async function () {
      const [, , keeper1, , payee1] = await this.hre.ethers.getSigners();
      const { payee, active, balance } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}:${AutomationRegistrySubtask.getKeeperInfo}`,
        {
          keeperRegistryAddress: this.keeperRegistry.address,
          keeperAddress: keeper1.address,
        }
      );

      expect(payee).to.eq(payee1.address);
      expect(active).to.eq(true);
      expect(balance.toNumber()).to.eq(0);
    });

    it("Gets upkeep transcoder type and version", async function () {
      const typeAndVersion = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}:${AutomationRegistrySubtask.getUpkeepTranscoderVersion}`,
        {
          keeperRegistryAddress: this.keeperRegistry.address,
        }
      );
      expect(typeAndVersion).to.eq(TRANSCODER_VERSION);
    });

    it("Gets type and version", async function () {
      const typeAndVersion = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}:${AutomationRegistrySubtask.getTypeAndVersion}`,
        {
          keeperRegistryAddress: this.keeperRegistry.address,
        }
      );
      expect(typeAndVersion).to.eq(KeeperRegistryVersion.registry1_3);
    });
  });

  describe("Run methods as subtasks of a hre task", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Gets state", async function () {
      const [, registrarAccount, keeper1, keeper2] =
        await this.hre.ethers.getSigners();
      const {
        nonce,
        ownerLinkBalance,
        expectedLinkBalance,
        numUpkeeps,
        paymentPremiumPPB,
        flatFeeMicroLink,
        blockCountPerTurn,
        checkGasLimit,
        stalenessSeconds,
        gasCeilingMultiplier,
        minUpkeepSpend,
        maxPerformGas,
        fallbackGasPrice,
        fallbackLinkPrice,
        transcoder,
        registrar,
        keepers,
      } = await this.hre.run(`${PACKAGE_NAME}:${Task.automationRegistry}`, {
        subtask: AutomationRegistrySubtask.getState,
        args: JSON.stringify({
          keeperRegistryAddress: this.keeperRegistry.address,
        }),
      });

      expect(nonce).to.eq(1);
      expect(ownerLinkBalance.toNumber()).to.eq(0);
      expect(expectedLinkBalance.toNumber()).to.eq(0);
      expect(numUpkeeps.toNumber()).to.eq(1);
      expect(paymentPremiumPPB).to.eq(REGISTRY_CONFIG.paymentPremiumPPB);
      expect(flatFeeMicroLink).to.eq(REGISTRY_CONFIG.flatFeeMicroLink);
      expect(blockCountPerTurn).to.eq(REGISTRY_CONFIG.blockCountPerTurn);
      expect(checkGasLimit).to.eq(REGISTRY_CONFIG.checkGasLimit);
      expect(stalenessSeconds).to.eq(REGISTRY_CONFIG.stalenessSeconds);
      expect(gasCeilingMultiplier).to.eq(REGISTRY_CONFIG.gasCeilingMultiplier);
      expect(minUpkeepSpend.toNumber()).to.eq(REGISTRY_CONFIG.minUpkeepSpend);
      expect(maxPerformGas).to.eq(REGISTRY_CONFIG.maxPerformGas);
      expect(fallbackGasPrice.toNumber()).to.eq(
        REGISTRY_CONFIG.fallbackGasPrice
      );
      expect(fallbackLinkPrice.toNumber()).to.eq(
        REGISTRY_CONFIG.fallbackLinkPrice
      );
      expect(transcoder).to.eq(this.upkeepTranscoder.address);
      expect(registrar).to.eq(registrarAccount.address);
      expect(keepers).to.have.ordered.members([
        keeper1.address,
        keeper2.address,
      ]);
    });

    it("Gets active upkeep ids", async function () {
      const [upkeepId] = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}`,
        {
          subtask: AutomationRegistrySubtask.getActiveUpkeepIDs,
          args: JSON.stringify({
            keeperRegistryAddress: this.keeperRegistry.address,
            startIndex: "0",
            maxCount: "1",
          }),
        }
      );
      expect(upkeepId.toString()).to.eq(this.upkeepId.toString());
    });

    it("Gets max payment for gas", async function () {
      const maxPaymentForGas = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}`,
        {
          subtask: AutomationRegistrySubtask.getMaxPaymentForGas,
          args: JSON.stringify({
            keeperRegistryAddress: this.keeperRegistry.address,
            gasLimit: GAS_LIMIT.toString(),
          }),
        }
      );
      expect(maxPaymentForGas.toString()).to.eq(MAX_PAYMENT_FOR_GAS_EXPECTED);
    });

    it("Check if paused", async function () {
      const isPaused = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}`,
        {
          subtask: AutomationRegistrySubtask.isPaused,
          args: JSON.stringify({
            keeperRegistryAddress: this.keeperRegistry.address,
          }),
        }
      );
      expect(isPaused).to.eq(false);
    });

    it("Gets upkeep", async function () {
      const [signer] = await this.hre.ethers.getSigners();
      const {
        target,
        balance,
        lastAutomationNode,
        admin,
        maxValidBlocknumber,
        amountSpent,
        checkData,
        executeGas,
      } = await this.hre.run(`${PACKAGE_NAME}:${Task.automationRegistry}`, {
        subtask: AutomationRegistrySubtask.getUpkeep,
        args: JSON.stringify({
          keeperRegistryAddress: this.keeperRegistry.address,
          upkeepId: this.upkeepId.toString(),
        }),
      });

      expect(target).to.eq(this.upkeep.address);
      expect(balance.toNumber()).to.eq(0);
      expect(lastAutomationNode).to.eq(this.hre.ethers.constants.AddressZero);
      expect(admin).to.eq(signer.address);
      expect(maxValidBlocknumber.toString()).to.eq(UINT32_MAX.toString());
      expect(amountSpent.toNumber()).to.eq(0);
      expect(checkData).to.eq(EMPTY_BYTES);
      expect(executeGas).to.eq(GAS_LIMIT);
    });

    it("Gets min balance for upkeep", async function () {
      const minBalanceForUpkeep = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}`,
        {
          subtask: AutomationRegistrySubtask.getMinBalanceForUpkeep,
          args: JSON.stringify({
            keeperRegistryAddress: this.keeperRegistry.address,
            upkeepId: this.upkeepId.toString(),
          }),
        }
      );
      expect(minBalanceForUpkeep.toString()).to.eq(
        MIN_BALANCE_FOR_UPKEEP_EXPECTED
      );
    });

    it("Funds upkeep", async function () {
      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}`,
        {
          subtask: AutomationRegistrySubtask.fundUpkeep,
          args: JSON.stringify({
            keeperRegistryAddress: this.keeperRegistry.address,
            upkeepId: this.upkeepId.toString(),
            amountInJuels: LINK_JUELS_TO_FUND,
          }),
        }
      );
      const { balance } = await this.hre.chainlink.automationRegistry.getUpkeep(
        this.keeperRegistry.address,
        this.upkeepId
      );

      expect(transactionHash).not.to.be.undefined;
      expect(balance.toString()).to.eq(LINK_JUELS_TO_FUND);
    });

    it("Migrates upkeeps", async function () {
      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}`,
        {
          subtask: AutomationRegistrySubtask.migrateUpkeeps,
          args: JSON.stringify({
            keeperRegistryAddress: this.keeperRegistry.address,
            upkeepIds: [this.upkeepId.toString()].join(","),
            destination: this.keeperRegistryDestination.address,
          }),
        }
      );

      const [upkeepId] =
        await this.hre.chainlink.automationRegistry.getActiveUpkeepIDs(
          this.keeperRegistryDestination.address,
          0,
          1
        );

      expect(transactionHash).not.to.be.undefined;
      expect(upkeepId.toString()).to.eq(this.upkeepId.toString());

      await this.hre.chainlink.automationRegistry.migrateUpkeeps(
        this.keeperRegistryDestination.address,
        [this.upkeepId],
        this.keeperRegistry.address
      );
    });

    it("Cancels upkeep", async function () {
      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}`,
        {
          subtask: AutomationRegistrySubtask.cancelUpkeep,
          args: JSON.stringify({
            keeperRegistryAddress: this.keeperRegistry.address,
            upkeepId: this.upkeepId.toString(),
          }),
        }
      );
      const { numUpkeeps } =
        await this.hre.chainlink.automationRegistry.getState(
          this.keeperRegistry.address
        );

      expect(transactionHash).not.to.be.undefined;
      expect(numUpkeeps.toNumber()).to.eq(0);
    });

    it("Withdraws funds", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      const { maxValidBlocknumber } =
        await this.hre.chainlink.automationRegistry.getUpkeep(
          this.keeperRegistry.address,
          this.upkeepId
        );

      if (maxValidBlocknumber.eq(UINT32_MAX)) {
        await this.hre.chainlink.automationRegistry.cancelUpkeep(
          this.keeperRegistry.address,
          this.upkeepId
        );
      }
      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}`,
        {
          subtask: AutomationRegistrySubtask.withdrawFunds,
          args: JSON.stringify({
            keeperRegistryAddress: this.keeperRegistry.address,
            upkeepId: this.upkeepId.toString(),
            receivingAddress: signer.address,
          }),
        }
      );

      expect(transactionHash).not.to.be.undefined;
    });

    it("Gets keeper info", async function () {
      const [, , keeper1, , payee1] = await this.hre.ethers.getSigners();
      const { payee, active, balance } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}`,
        {
          subtask: AutomationRegistrySubtask.getKeeperInfo,
          args: JSON.stringify({
            keeperRegistryAddress: this.keeperRegistry.address,
            keeperAddress: keeper1.address,
          }),
        }
      );

      expect(payee).to.eq(payee1.address);
      expect(active).to.eq(true);
      expect(balance.toNumber()).to.eq(0);
    });

    it("Gets upkeep transcoder type and version", async function () {
      const typeAndVersion = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}`,
        {
          subtask: AutomationRegistrySubtask.getUpkeepTranscoderVersion,
          args: JSON.stringify({
            keeperRegistryAddress: this.keeperRegistry.address,
          }),
        }
      );
      expect(typeAndVersion).to.eq(TRANSCODER_VERSION);
    });

    it("Gets type and version", async function () {
      const typeAndVersion = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistry}`,
        {
          subtask: AutomationRegistrySubtask.getTypeAndVersion,
          args: JSON.stringify({
            keeperRegistryAddress: this.keeperRegistry.address,
          }),
        }
      );
      expect(typeAndVersion).to.eq(KeeperRegistryVersion.registry1_3);
    });
  });
});
