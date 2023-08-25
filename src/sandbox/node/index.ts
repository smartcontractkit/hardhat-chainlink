import { randomUUID } from "crypto";
import * as compose from "docker-compose";
import * as fs from "fs";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { join } from "path";

import { CHAINLINK_NODE_CONTAINER } from "../../shared/constants";
import { NodeStartType } from "../../shared/enums";
import { DockerOutput } from "../../shared/types";

const login = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  await compose.exec(
    CHAINLINK_NODE_CONTAINER,
    ["chainlink", "admin", "login", "-f", "/clroot/api-credentials"],
    {
      cwd: join("./"),
      composeOptions: ["-f", "docker-compose-chainlink-hardhat.yaml"],
      log: true,
    }
  );
};

const up = async (
  hre: HardhatRuntimeEnvironment,
  nodeStartType: NodeStartType
): Promise<DockerOutput> => {
  // Read variables from Hardhat config
  const { node } = hre.config.chainlink;

  if (!fs.existsSync("clroot")) {
    fs.mkdirSync("clroot");
  }

  // Read the config template TOML file
  const configTemplate = fs.readFileSync(
    join(__dirname, "/setup/clroot/config_template.toml"),
    "utf8"
  );

  // Replace placeholders with values
  const config = configTemplate
    .replace("{{CHAIN_ID}}", node.chain_id)
    .replace("{{CHAIN_NAME}}", node.chain_name)
    .replace("{{CHAIN_WSURL}}", node.ws_url)
    .replace("{{CHAIN_HTTPURL}}", node.http_url);

  // Write the replaced content to a new TOML file
  try {
    fs.writeFileSync(join("./clroot/config.toml"), config, "utf8");
  } catch (e: any) {
    throw new Error(e);
  }

  // Read the docker-compose template YAML file
  const dockerComposeTemplate = fs.readFileSync(
    join(__dirname, "/setup/docker-compose_template.yaml"),
    "utf8"
  );

  // Replace placeholders with values
  const dockerCompose = dockerComposeTemplate
    .replace("{{PG_USER}}", node.pg_user)
    .replace("{{PG_USER}}", node.pg_user)
    .replace("{{PG_USER}}", node.pg_user)
    .replace("{{PG_PASSWORD}}", node.pg_password)
    .replace("{{PG_PASSWORD}}", node.pg_password)
    .replace("{{PG_DB}}", node.pg_db)
    .replace("{{PG_DB}}", node.pg_db)
    .replace("{{CL_PASSWORD_KEYSTORE}}", node.cl_keystore_password);

  // Write the replaced content to a new YAML file
  try {
    await fs.writeFileSync(
      join("./docker-compose-chainlink-hardhat.yaml"),
      dockerCompose,
      "utf8"
    );
  } catch (e: any) {
    throw new Error(e);
  }

  // Combine the strings with a line break
  const apiCredentials = `${node.cl_api_user}\n${node.cl_api_password}`;

  // Write the content to a file
  try {
    await fs.writeFileSync(
      join("./clroot/api-credentials"),
      apiCredentials,
      "utf8"
    );
  } catch (e: any) {
    throw new Error(e);
  }

  let result;

  switch (nodeStartType) {
    case NodeStartType.run:
      result = await compose.upAll({
        cwd: join("./"),
        composeOptions: ["-f", "docker-compose-chainlink-hardhat.yaml"],
        log: true,
      });
      break;
    case NodeStartType.restart:
      await compose.down({
        cwd: join("./"),
        composeOptions: ["-f", "docker-compose-chainlink-hardhat.yaml"],
        log: true,
      });
      result = await compose.upAll({
        cwd: join("./"),
        composeOptions: ["-f", "docker-compose-chainlink-hardhat.yaml"],
        log: true,
      });
      break;
    case NodeStartType.stop:
      result = await compose.stop({
        cwd: join("./"),
        composeOptions: ["-f", "docker-compose-chainlink-hardhat.yaml"],
        log: true,
      });
      break;
    default:
      throw new Error("Unknown Chainlink node start type");
  }

  return {
    exitCode: result.exitCode,
    err: result.exitCode !== 0 ? result.err : "",
  };
};

export const run = async (
  hre: HardhatRuntimeEnvironment
): Promise<DockerOutput> => {
  return up(hre, NodeStartType.run);
};

export const restart = async (
  hre: HardhatRuntimeEnvironment
): Promise<DockerOutput> => {
  return up(hre, NodeStartType.restart);
};

export const stop = async (
  hre: HardhatRuntimeEnvironment
): Promise<DockerOutput> => {
  return up(hre, NodeStartType.stop);
};

export const getETHKeys = async (
  hre: HardhatRuntimeEnvironment
): Promise<string> => {
  await login(hre);
  const result = await compose.exec(
    CHAINLINK_NODE_CONTAINER,
    ["chainlink", "-j", "keys", "eth", "list"],
    {
      cwd: join("./"),
      composeOptions: ["-f", "docker-compose-chainlink-hardhat.yaml"],
    }
  );
  return result.out;
};

export const getP2PKeys = async (
  hre: HardhatRuntimeEnvironment
): Promise<string> => {
  await login(hre);
  const result = await compose.exec(
    CHAINLINK_NODE_CONTAINER,
    ["chainlink", "-j", "keys", "p2p", "list"],
    {
      cwd: join("./"),
      composeOptions: ["-f", "docker-compose-chainlink-hardhat.yaml"],
    }
  );
  return result.out;
};

export const getOCRKeys = async (
  hre: HardhatRuntimeEnvironment
): Promise<string> => {
  await login(hre);
  const result = await compose.exec(
    CHAINLINK_NODE_CONTAINER,
    ["chainlink", "-j", "keys", "ocr", "list"],
    {
      cwd: join("./"),
      composeOptions: ["-f", "docker-compose-chainlink-hardhat.yaml"],
    }
  );
  return result.out;
};

export const getJobs = async (
  hre: HardhatRuntimeEnvironment
): Promise<string> => {
  await login(hre);
  const result = await compose.exec(
    CHAINLINK_NODE_CONTAINER,
    ["chainlink", "-j", "jobs", "list"],
    {
      cwd: join("./"),
      composeOptions: ["-f", "docker-compose-chainlink-hardhat.yaml"],
    }
  );
  return result.out;
};

export const createDirectRequestJob = async (
  hre: HardhatRuntimeEnvironment,
  operatorAddress: string
): Promise<void> => {
  // Read the config template TOML file
  const directRequestJobTemplate = fs.readFileSync(
    join(__dirname, "/setup/clroot/jobs/direct-request-job_template.toml"),
    "utf8"
  );

  // Replace placeholders with values
  const directRequestJob = directRequestJobTemplate
    .replace("{{OPERATOR_ADDRESS}}", operatorAddress)
    .replace("{{OPERATOR_ADDRESS}}", operatorAddress)
    .replace("{{OPERATOR_ADDRESS}}", operatorAddress)
    .replace("{{UUID}}", randomUUID());

  // Write the replaced content to a new TOML file
  try {
    fs.writeFileSync(
      join("./clroot/jobs/direct-request-job.toml"),
      directRequestJob,
      "utf8"
    );
  } catch (e: any) {
    throw new Error(e);
  }

  await login(hre);

  await compose.exec(
    CHAINLINK_NODE_CONTAINER,
    ["chainlink", "jobs", "create", "/clroot/jobs/direct-request-job.toml"],
    {
      cwd: join("./"),
      composeOptions: ["-f", "docker-compose-chainlink-hardhat.yaml"],
      log: true,
    }
  );
};
