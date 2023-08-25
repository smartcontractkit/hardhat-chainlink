import { expect } from "chai";

import { PACKAGE_NAME } from "../src/shared/constants";
import {
  AutomationRegistrarSubtask,
  KeeperRegistrarVersion,
  Task,
} from "../src/shared/enums";

import { useEnvironment } from "./helpers";

enum AutoApproveType {
  DISABLED,
  ENABLED_SENDER_ALLOWLIST,
  ENABLED_ALL,
}

enum PaymentModel {
  DEFAULT,
  ARBITRUM,
  OPTIMISM,
}

describe("Test chainlink:automationRegistrar module", function () {
  const DECIMALS = 18;
  const INITIAL_ANSWER = 10;
  const GAS_LIMIT = 500_000;
  const EMPTY_BYTES = "0x";
  const LINK_JUELS_ALLOWANCE = "100000000000000000000";
  const LINK_JUELS_TO_FUND = "100000000000000000";
  const MIN_LINK_JUELS = "500000000000";
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
  const UPKEEP_NAME = "AutomationTest";
  const REGISTRATION_SOURCE = 0;
  const REGISTRY_GAS_OVERHEAD = 0;
  const AUTO_APPROVE_MAX_ALLOWED = 10_000;

  function beforeShared() {
    return async function (this: Mocha.Context) {
      const ethers = this.hre.ethers;
      const [, , keeper1, keeper2, payee1, payee2] =
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
        PaymentModel.DEFAULT,
        REGISTRY_GAS_OVERHEAD,
        this.linkToken.address,
        this.dataFeed.address,
        this.dataFeed.address
      );

      this.keeperRegistrar = await (
        await ethers.getContractFactory("KeeperRegistrar")
      ).deploy(
        this.linkToken.address,
        AutoApproveType.ENABLED_ALL,
        AUTO_APPROVE_MAX_ALLOWED,
        this.hre.ethers.constants.AddressZero,
        MIN_LINK_JUELS
      );

      this.keeperRegistry = await (
        await ethers.getContractFactory("KeeperRegistry1_3")
      ).deploy(this.keeperRegistryBase.address, {
        ...REGISTRY_CONFIG,
        transcoder: this.upkeepTranscoder.address,
        registrar: this.keeperRegistrar.address,
      });

      await this.keeperRegistrar.setRegistrationConfig(
        AutoApproveType.ENABLED_ALL,
        AUTO_APPROVE_MAX_ALLOWED,
        this.keeperRegistry.address,
        MIN_LINK_JUELS
      );

      await this.keeperRegistry.setKeepers(
        [keeper1.address, keeper2.address],
        [payee1.address, payee2.address]
      );

      await this.linkToken.approve(
        this.keeperRegistry.address,
        LINK_JUELS_ALLOWANCE
      );
    };
  }

  describe("Run methods as hre methods", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Gets registration config", async function () {
      const {
        autoApproveConfigType,
        autoApproveMaxAllowed,
        approvedCount,
        keeperRegistry,
        minLINKJuels,
      } = await this.hre.chainlink.automationRegistrar.getRegistrationConfig(
        this.keeperRegistrar.address
      );

      expect(autoApproveConfigType).to.eq(AutoApproveType.ENABLED_ALL);
      expect(autoApproveMaxAllowed).to.eq(AUTO_APPROVE_MAX_ALLOWED);
      expect(approvedCount).to.eq(0);
      expect(keeperRegistry).to.eq(this.keeperRegistry.address);
      expect(minLINKJuels.toString()).to.eq(MIN_LINK_JUELS);
    });

    it("Registers upkeep", async function () {
      const [signer] = await this.hre.ethers.getSigners();
      const { transactionHash, upkeepId } =
        await this.hre.chainlink.automationRegistrar.registerUpkeep(
          this.keeperRegistrar.address,
          this.linkToken.address,
          LINK_JUELS_TO_FUND,
          UPKEEP_NAME,
          EMPTY_BYTES,
          this.upkeep.address,
          GAS_LIMIT,
          signer.address,
          EMPTY_BYTES,
          undefined,
          REGISTRATION_SOURCE,
          signer.address
        );

      const [upkeepIdRegistry] =
        await this.hre.chainlink.automationRegistry.getActiveUpkeepIDs(
          this.keeperRegistry.address,
          0,
          1
        );

      expect(transactionHash).not.be.undefined;
      expect(upkeepIdRegistry.toString()).to.eq(upkeepId.toString());
    });

    it("Gets pending request", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      await this.keeperRegistrar.setRegistrationConfig(
        AutoApproveType.DISABLED,
        AUTO_APPROVE_MAX_ALLOWED,
        this.keeperRegistry.address,
        MIN_LINK_JUELS
      );

      const { transactionHash, requestHash } =
        await this.hre.chainlink.automationRegistrar.registerUpkeep(
          this.keeperRegistrar.address,
          this.linkToken.address,
          LINK_JUELS_TO_FUND,
          UPKEEP_NAME,
          EMPTY_BYTES,
          this.upkeep.address,
          GAS_LIMIT,
          signer.address,
          EMPTY_BYTES,
          undefined,
          REGISTRATION_SOURCE,
          signer.address
        );

      const { adminAddress, balance } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistrar}:${AutomationRegistrarSubtask.getPendingRequest}`,
        {
          keeperRegistrarAddress: this.keeperRegistrar.address,
          requestHash,
        }
      );

      expect(transactionHash).not.be.undefined;
      expect(adminAddress).to.eq(signer.address);
      expect(balance.toString()).to.eq(LINK_JUELS_TO_FUND);

      await this.keeperRegistrar.setRegistrationConfig(
        AutoApproveType.ENABLED_ALL,
        AUTO_APPROVE_MAX_ALLOWED,
        this.keeperRegistry.address,
        MIN_LINK_JUELS
      );
    });

    it("Cancels pending request", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      await this.keeperRegistrar.setRegistrationConfig(
        AutoApproveType.DISABLED,
        AUTO_APPROVE_MAX_ALLOWED,
        this.keeperRegistry.address,
        MIN_LINK_JUELS
      );

      const { requestHash } =
        await this.hre.chainlink.automationRegistrar.registerUpkeep(
          this.keeperRegistrar.address,
          this.linkToken.address,
          LINK_JUELS_TO_FUND,
          UPKEEP_NAME,
          EMPTY_BYTES,
          this.upkeep.address,
          GAS_LIMIT,
          signer.address,
          EMPTY_BYTES,
          undefined,
          REGISTRATION_SOURCE,
          signer.address
        );

      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistrar}:${AutomationRegistrarSubtask.cancelRequest}`,
        {
          keeperRegistrarAddress: this.keeperRegistrar.address,
          requestHash,
        }
      );

      const { adminAddress, balance } =
        await this.hre.chainlink.automationRegistrar.getPendingRequest(
          this.keeperRegistrar.address,
          requestHash
        );

      expect(transactionHash).not.be.undefined;
      expect(adminAddress).to.eq(this.hre.ethers.constants.AddressZero);
      expect(balance.toNumber()).to.eq(0);

      await this.keeperRegistrar.setRegistrationConfig(
        AutoApproveType.ENABLED_ALL,
        AUTO_APPROVE_MAX_ALLOWED,
        this.keeperRegistry.address,
        MIN_LINK_JUELS
      );
    });

    it("Gets type and version", async function () {
      const typeAndVersion = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistrar}:${AutomationRegistrarSubtask.getTypeAndVersion}`,
        {
          keeperRegistrarAddress: this.keeperRegistrar.address,
        }
      );
      expect(typeAndVersion).to.eq(KeeperRegistrarVersion.registrar1_1);
    });
  });

  describe("Run methods as hre subtasks", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Gets registration config", async function () {
      const {
        autoApproveConfigType,
        autoApproveMaxAllowed,
        approvedCount,
        keeperRegistry,
        minLINKJuels,
      } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistrar}:${AutomationRegistrarSubtask.getRegistrationConfig}`,
        {
          keeperRegistrarAddress: this.keeperRegistrar.address,
        }
      );

      expect(autoApproveConfigType).to.eq(AutoApproveType.ENABLED_ALL);
      expect(autoApproveMaxAllowed).to.eq(AUTO_APPROVE_MAX_ALLOWED);
      expect(approvedCount).to.eq(0);
      expect(keeperRegistry).to.eq(this.keeperRegistry.address);
      expect(minLINKJuels.toString()).to.eq(MIN_LINK_JUELS);
    });

    it("Registers upkeep", async function () {
      const [signer] = await this.hre.ethers.getSigners();
      const { transactionHash, upkeepId } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistrar}:${AutomationRegistrarSubtask.registerUpkeep}`,
        {
          keeperRegistrarAddress: this.keeperRegistrar.address,
          linkTokenAddress: this.linkToken.address,
          amountInJuels: LINK_JUELS_TO_FUND,
          upkeepName: UPKEEP_NAME,
          encryptedEmail: EMPTY_BYTES,
          upkeepContract: this.upkeep.address,
          gasLimit: GAS_LIMIT.toString(),
          adminAddress: signer.address,
          checkData: EMPTY_BYTES,
          source: REGISTRATION_SOURCE.toString(),
          sender: signer.address,
        }
      );

      const [upkeepIdRegistry] =
        await this.hre.chainlink.automationRegistry.getActiveUpkeepIDs(
          this.keeperRegistry.address,
          0,
          1
        );

      expect(transactionHash).not.be.undefined;
      expect(upkeepIdRegistry.toString()).to.eq(upkeepId.toString());
    });

    it("Gets pending request", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      await this.keeperRegistrar.setRegistrationConfig(
        AutoApproveType.DISABLED,
        AUTO_APPROVE_MAX_ALLOWED,
        this.keeperRegistry.address,
        MIN_LINK_JUELS
      );

      const { transactionHash, requestHash } =
        await this.hre.chainlink.automationRegistrar.registerUpkeep(
          this.keeperRegistrar.address,
          this.linkToken.address,
          LINK_JUELS_TO_FUND,
          UPKEEP_NAME,
          EMPTY_BYTES,
          this.upkeep.address,
          GAS_LIMIT,
          signer.address,
          EMPTY_BYTES,
          undefined,
          REGISTRATION_SOURCE,
          signer.address
        );

      const { adminAddress, balance } =
        await this.hre.chainlink.automationRegistrar.getPendingRequest(
          this.keeperRegistrar.address,
          requestHash
        );

      expect(transactionHash).not.be.undefined;
      expect(adminAddress).to.eq(signer.address);
      expect(balance.toString()).to.eq(LINK_JUELS_TO_FUND);

      await this.keeperRegistrar.setRegistrationConfig(
        AutoApproveType.ENABLED_ALL,
        AUTO_APPROVE_MAX_ALLOWED,
        this.keeperRegistry.address,
        MIN_LINK_JUELS
      );
    });

    it("Cancels pending request", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      await this.keeperRegistrar.setRegistrationConfig(
        AutoApproveType.DISABLED,
        AUTO_APPROVE_MAX_ALLOWED,
        this.keeperRegistry.address,
        MIN_LINK_JUELS
      );

      const { requestHash } =
        await this.hre.chainlink.automationRegistrar.registerUpkeep(
          this.keeperRegistrar.address,
          this.linkToken.address,
          LINK_JUELS_TO_FUND,
          UPKEEP_NAME,
          EMPTY_BYTES,
          this.upkeep.address,
          GAS_LIMIT,
          signer.address,
          EMPTY_BYTES,
          undefined,
          REGISTRATION_SOURCE,
          signer.address
        );

      const { transactionHash } =
        await this.hre.chainlink.automationRegistrar.cancelRequest(
          this.keeperRegistrar.address,
          requestHash
        );

      const { adminAddress, balance } =
        await this.hre.chainlink.automationRegistrar.getPendingRequest(
          this.keeperRegistrar.address,
          requestHash
        );

      expect(transactionHash).not.be.undefined;
      expect(adminAddress).to.eq(this.hre.ethers.constants.AddressZero);
      expect(balance.toNumber()).to.eq(0);

      await this.keeperRegistrar.setRegistrationConfig(
        AutoApproveType.ENABLED_ALL,
        AUTO_APPROVE_MAX_ALLOWED,
        this.keeperRegistry.address,
        MIN_LINK_JUELS
      );
    });

    it("Gets type and version", async function () {
      const typeAndVersion =
        await this.hre.chainlink.automationRegistrar.getTypeAndVersion(
          this.keeperRegistrar.address
        );
      expect(typeAndVersion).to.eq(KeeperRegistrarVersion.registrar1_1);
    });
  });

  describe("Run methods as subtasks of a hre task", function () {
    useEnvironment("hardhat-chainlink");

    before(beforeShared());

    it("Gets registration config", async function () {
      const {
        autoApproveConfigType,
        autoApproveMaxAllowed,
        approvedCount,
        keeperRegistry,
        minLINKJuels,
      } = await this.hre.run(`${PACKAGE_NAME}:${Task.automationRegistrar}`, {
        subtask: AutomationRegistrarSubtask.getRegistrationConfig,
        args: JSON.stringify({
          keeperRegistrarAddress: this.keeperRegistrar.address,
        }),
      });

      expect(autoApproveConfigType).to.eq(AutoApproveType.ENABLED_ALL);
      expect(autoApproveMaxAllowed).to.eq(AUTO_APPROVE_MAX_ALLOWED);
      expect(approvedCount).to.eq(0);
      expect(keeperRegistry).to.eq(this.keeperRegistry.address);
      expect(minLINKJuels.toString()).to.eq(MIN_LINK_JUELS);
    });

    it("Registers upkeep", async function () {
      const [signer] = await this.hre.ethers.getSigners();
      const { transactionHash, upkeepId } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistrar}`,
        {
          subtask: AutomationRegistrarSubtask.registerUpkeep,
          args: JSON.stringify({
            keeperRegistrarAddress: this.keeperRegistrar.address,
            linkTokenAddress: this.linkToken.address,
            amountInJuels: LINK_JUELS_TO_FUND,
            upkeepName: UPKEEP_NAME,
            encryptedEmail: EMPTY_BYTES,
            upkeepContract: this.upkeep.address,
            gasLimit: GAS_LIMIT.toString(),
            adminAddress: signer.address,
            checkData: EMPTY_BYTES,
            ocrConfig: EMPTY_BYTES,
            source: REGISTRATION_SOURCE.toString(),
            sender: signer.address,
          }),
        }
      );

      const [upkeepIdRegistry] =
        await this.hre.chainlink.automationRegistry.getActiveUpkeepIDs(
          this.keeperRegistry.address,
          0,
          1
        );

      expect(transactionHash).not.be.undefined;
      expect(upkeepIdRegistry.toString()).to.eq(upkeepId.toString());
    });

    it("Gets pending request", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      await this.keeperRegistrar.setRegistrationConfig(
        AutoApproveType.DISABLED,
        AUTO_APPROVE_MAX_ALLOWED,
        this.keeperRegistry.address,
        MIN_LINK_JUELS
      );

      const { transactionHash, requestHash } =
        await this.hre.chainlink.automationRegistrar.registerUpkeep(
          this.keeperRegistrar.address,
          this.linkToken.address,
          LINK_JUELS_TO_FUND,
          UPKEEP_NAME,
          EMPTY_BYTES,
          this.upkeep.address,
          GAS_LIMIT,
          signer.address,
          EMPTY_BYTES,
          undefined,
          REGISTRATION_SOURCE,
          signer.address
        );

      const { adminAddress, balance } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistrar}`,
        {
          subtask: AutomationRegistrarSubtask.getPendingRequest,
          args: JSON.stringify({
            keeperRegistrarAddress: this.keeperRegistrar.address,
            requestHash,
          }),
        }
      );

      expect(transactionHash).not.be.undefined;
      expect(adminAddress).to.eq(signer.address);
      expect(balance.toString()).to.eq(LINK_JUELS_TO_FUND);

      await this.keeperRegistrar.setRegistrationConfig(
        AutoApproveType.ENABLED_ALL,
        AUTO_APPROVE_MAX_ALLOWED,
        this.keeperRegistry.address,
        MIN_LINK_JUELS
      );
    });

    it("Cancels pending request", async function () {
      const [signer] = await this.hre.ethers.getSigners();

      await this.keeperRegistrar.setRegistrationConfig(
        AutoApproveType.DISABLED,
        AUTO_APPROVE_MAX_ALLOWED,
        this.keeperRegistry.address,
        MIN_LINK_JUELS
      );

      const { requestHash } =
        await this.hre.chainlink.automationRegistrar.registerUpkeep(
          this.keeperRegistrar.address,
          this.linkToken.address,
          LINK_JUELS_TO_FUND,
          UPKEEP_NAME,
          EMPTY_BYTES,
          this.upkeep.address,
          GAS_LIMIT,
          signer.address,
          EMPTY_BYTES,
          undefined,
          REGISTRATION_SOURCE,
          signer.address
        );

      const { transactionHash } = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistrar}`,
        {
          subtask: AutomationRegistrarSubtask.cancelRequest,
          args: JSON.stringify({
            keeperRegistrarAddress: this.keeperRegistrar.address,
            requestHash,
          }),
        }
      );

      const { adminAddress, balance } =
        await this.hre.chainlink.automationRegistrar.getPendingRequest(
          this.keeperRegistrar.address,
          requestHash
        );

      expect(transactionHash).not.be.undefined;
      expect(adminAddress).to.eq(this.hre.ethers.constants.AddressZero);
      expect(balance.toNumber()).to.eq(0);

      await this.keeperRegistrar.setRegistrationConfig(
        AutoApproveType.ENABLED_ALL,
        AUTO_APPROVE_MAX_ALLOWED,
        this.keeperRegistry.address,
        MIN_LINK_JUELS
      );
    });

    it("Gets type and version", async function () {
      const typeAndVersion = await this.hre.run(
        `${PACKAGE_NAME}:${Task.automationRegistrar}`,
        {
          subtask: AutomationRegistrarSubtask.getTypeAndVersion,
          args: JSON.stringify({
            keeperRegistrarAddress: this.keeperRegistrar.address,
          }),
        }
      );
      expect(typeAndVersion).to.eq(KeeperRegistrarVersion.registrar1_1);
    });
  });
});
