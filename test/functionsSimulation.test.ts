import { expect } from "chai";

import { PACKAGE_NAME } from "../src/shared/constants";
import { FunctionsSimulationSubtask, Task } from "../src/shared/enums";

import { useEnvironment } from "./helpers";

const isGithubActions = !!process.env.GITHUB_ACTIONS;

describe("Test chainlink:sandbox:functionsSimulation module [SKIP FOR GITHUB ACTIONS]", function () {
  useEnvironment("hardhat");

  describe("Run methods as hre methods", function () {
    it("Run functions simulation", async function () {
      if (isGithubActions) this.skip();

      const result =
        await this.hre.chainlink.sandbox.functionsSimulation.simulateRequest(
          'return Functions.encodeString(secrets.test + " " + args[0] + " " + args[1] + bytesArgs[0] + bytesArgs[1])',
          ["hello", "world"],
          ["0x1234", "0x5678"]
        );

      expect(result).to.eq("hello world hello world0x12340x5678");
    });
  });

  describe("Run methods as hre subtasks", function () {
    it("Run functions simulation", async function () {
      if (isGithubActions) this.skip();

      const result = await this.hre.run(
        `${PACKAGE_NAME}:${Task.functionsSimulation}:${FunctionsSimulationSubtask.simulateRequest}`,
        {
          source:
            'return Functions.encodeString(secrets.test + " " + args[0] + " " + args[1] + bytesArgs[0] + bytesArgs[1])',
          args: "hello, world",
          bytesArgs: "0x1234, 0x5678",
        }
      );

      expect(result).to.eq("hello world hello world0x12340x5678");
    });
  });

  describe("Run methods as subtasks of a hre task", function () {
    it("Run functions simulation", async function () {
      if (isGithubActions) this.skip();

      const result = await this.hre.run(
        `${PACKAGE_NAME}:${Task.functionsSimulation}`,
        {
          subtask: FunctionsSimulationSubtask.simulateRequest,
          args: JSON.stringify({
            source:
              'return Functions.encodeString(secrets.test + " " + args[0] + " " + args[1] + bytesArgs[0] + bytesArgs[1])',
            args: "hello, world",
            bytesArgs: "0x1234, 0x5678",
          }),
        }
      );

      expect(result).to.eq("hello world hello world0x12340x5678");
    });
  });
});
