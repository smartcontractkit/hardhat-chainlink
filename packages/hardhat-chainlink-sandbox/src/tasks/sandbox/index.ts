import axios from "axios";
import * as compose from "docker-compose";
import { ActionType } from "hardhat/types";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

import { LinkToken__factory } from "../../../../../types/factories/v0.4/LinkToken__factory";
import OracleArtifact from "../../../artifacts/@chainlink/contracts/src/v0.4/Oracle.sol/Oracle.json";
import { login } from "../../sandbox/helpers/login";

export const deployOracle: ActionType<{
  nodeAddress: string;
  linkAddress: string;
}> = async (taskArgs, hre) => {
  const { nodeAddress, linkAddress } = taskArgs;

  const Oracle = await hre.ethers.getContractFactoryFromArtifact(
    OracleArtifact
  );
  const oracle = await Oracle.deploy(linkAddress);

  await oracle.deployed();

  // Set Fulfillment on Oracle
  await oracle.setFulfillmentPermission(nodeAddress, true);

  console.log(
    "All set on this end! If you've setup everything correctly, you can start getting external data from your smart contract"
  );

  console.table({ "Oracle Address": oracle.address });
};
export const deployLinkToken: ActionType<void> = async (taskArguments, hre) => {
  const [signer] = await hre.ethers.getSigners();
  LinkToken__factory.connect(signer).deployTransaction()
  
  const LinkToken = await hre.ethers.getContractFactoryFromArtifact(
    LinkTokenArtifact
  );
  const linkToken = await LinkToken.deploy();

  await linkToken.deployed();

  console.table({ "Link Token Address": linkToken.address });
};

export const runNode: ActionType<{ restartOnly: boolean }> = async (
  taskArgs
): Promise<void> => {
  const { restartOnly } = taskArgs;
  try {
    if (restartOnly) {
      await compose.restartAll({ cwd: join(__dirname), log: true });
    } else {
      await compose.down({ cwd: join(__dirname), log: true });
      await compose.upAll({ cwd: join(__dirname), log: true });
    }
    console.log("Node running");
  } catch (e) {
    console.log("Encountered errors when trying to run node");
    console.error(e);
  }
};
declare interface QueryResponse {
  errors?: {
    message: string;
  }[];
  data: any;
}

declare interface ResponseData {
  data: {
    ethKeys: {
      results: {
        address: string;
        ethBalance: string;
        chain: {
          id: string;
        };
      }[];
    };
  };
  errors?: {
    message: string;
    locations: any[];
  }[];
}

export const createJob: ActionType<{
  oracleAddress: string;
  jobType: string;
}> = async (taskArgs, env, runSuper) => {
  const direct = "direct";
  const cron = "cron";

  const { oracleAddress, jobType } = taskArgs;

  const authenticationToken = await login();
  const externalID = uuidv4();
  const jobName = `Get > Uint256: ${new Date().getMilliseconds()}`;
  const defaultJob = `{"operationName":"CreateJob","variables":{"input":{"TOML":"type = \\"directrequest\\"\\nschemaVersion = 1\\nname = \\"${jobName}\\"\\n# Optional External Job ID: Automatically generated if unspecified\\n externalJobID = \\"${externalID}\\"\\ncontractAddress = \\"${oracleAddress}\\"\\nmaxTaskDuration = \\"0s\\"\\nobservationSource = \\"\\"\\"\\n    decode_log   [type=\\"ethabidecodelog\\"\\n                  abi=\\"OracleRequest(bytes32 indexed specId, address requester, bytes32 requestId, uint256 payment, address callbackAddr, bytes4 callbackFunctionId, uint256 cancelExpiration, uint256 dataVersion, bytes data)\\"\\n                  data=\\"$(jobRun.logData)\\"\\n                  topics=\\"$(jobRun.logTopics)\\"]\\n\\n    decode_cbor  [type=\\"cborparse\\" data=\\"$(decode_log.data)\\"]\\n    fetch        [type=\\"http\\" method=GET url=\\"$(decode_cbor.get)\\" allowUnrestrictedNetworkAccess=\\"true\\"]\\n    parse        [type=\\"jsonparse\\" path=\\"$(decode_cbor.path)\\" data=\\"$(fetch)\\"]\\n    multiply     [type=\\"multiply\\" input=\\"$(parse)\\" times=100]\\n    encode_data  [type=\\"ethabiencode\\" abi=\\"(uint256 value)\\" data=\\"{ \\\\\\\\\\"value\\\\\\\\\\": $(multiply) }\\"]\\n    encode_tx    [type=\\"ethabiencode\\"\\n                  abi=\\"fulfillOracleRequest(bytes32 requestId, uint256 payment, address callbackAddress, bytes4 callbackFunctionId, uint256 expiration, bytes32 data)\\"\\n                  data=\\"{\\\\\\\\\\"requestId\\\\\\\\\\": $(decode_log.requestId), \\\\\\\\\\"payment\\\\\\\\\\": $(decode_log.payment), \\\\\\\\\\"callbackAddress\\\\\\\\\\": $(decode_log.callbackAddr), \\\\\\\\\\"callbackFunctionId\\\\\\\\\\": $(decode_log.callbackFunctionId), \\\\\\\\\\"expiration\\\\\\\\\\": $(decode_log.cancelExpiration), \\\\\\\\\\"data\\\\\\\\\\": $(encode_data)}\\"\\n                 ]\\n    submit_tx    [type=\\"ethtx\\" to=\\"${oracleAddress}\\" data=\\"$(encode_tx)\\"]\\n\\n    decode_log -> decode_cbor -> fetch -> parse -> multiply -> encode_data -> encode_tx -> submit_tx\\n\\"\\"\\"\\n"}},"query":"mutation CreateJob($input: CreateJobInput!) {\\n  createJob(input: $input) {\\n    ... on CreateJobSuccess {\\n      job {\\n        id\\n        __typename\\n      }\\n      __typename\\n    }\\n    ... on InputErrors {\\n      errors {\\n        path\\n        message\\n        code\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}`;

  let jobDesc;

  switch (jobType) {
    case direct:
      jobDesc = defaultJob;
      break;
    case cron:
      jobDesc = `{"operationName":"CreateJob","variables":{"input":{"TOML":"type = \\"cron\\"\\nschemaVersion = 1\\nname = \\"${jobName}\\"\\nexternalJobID = \\"${externalID}\\"\\ncontractAddress = \\"${oracleAddress}\\"\\nmaxTaskDuration = \\"0s\\"\\nschedule = \\"CRON_TZ=UTC * */20 * * * *\\"\\nobservationSource = \\"\\"\\"\\n    fetch    [type=\\"http\\" method=GET url=\\"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD\\"]\\n    parse    [type=\\"jsonparse\\" path=\\"RAW,ETH,USD,PRICE\\"]\\n    multiply [type=\\"multiply\\" times=100]\\n\\n    fetch -> parse -> multiply\\n\\"\\"\\""}},"query":"mutation CreateJob($input: CreateJobInput!) {\\n  createJob(input: $input) {\\n    ... on CreateJobSuccess {\\n      job {\\n        id\\n        __typename\\n      }\\n      __typename\\n    }\\n    ... on InputErrors {\\n      errors {\\n        path\\n        message\\n        code\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}`;
      break;
    default:
      jobDesc = defaultJob;
  }

  try {
    console.info("\nCreating Job...\n");

    const data = await axios.request<any, QueryResponse>({
      url: "http://127.0.0.1:6688/query",
      headers: {
        "content-type": "application/json",
        cookie: `blocalauth=localapibe315fd0c14b5e47:; isNotIncognito=true; _ga=GA1.1.2055974768.1644792885; ${authenticationToken}`,
        Referer: "http://127.0.0.1:6688/jobs/new",
      },
      method: "POST",
      data: jobDesc,
    });

    console.table({
      Status: "Success",
      Error: data.errors != null ? data?.errors[0]?.message : null,
      JobID: data?.data?.data?.createJob?.job?.id,
      ExternalID: externalID,
    });
  } catch (e) {
    console.log("Could not create job");
    console.error(e);
  }
};

export const fundEth: ActionType<{
  nodeAddress: string;
  amount: string;
}> = async (taskArgs, hre, runSuper) => {
  const { nodeAddress, amount } = taskArgs;
  const { ethers } = hre;

  const fundAmount = hre.ethers.utils.parseEther(amount ?? "10");

  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // Hardhat wallet are deterministic and the same across al hardhat users
    provider
  );

  console.log("Node Address: ", nodeAddress);
  await wallet.sendTransaction({
    to: nodeAddress,
    value: fundAmount,
  });

  const balance = await provider.getBalance(nodeAddress);
  const balanceToETH = hre.ethers.utils.formatEther(balance);

  console.log(
    `Success! Funded ${nodeAddress} with ${amount} ETH. New Node Balance: ${balanceToETH}`
  );
};

export const fundLink: ActionType<{
  contractAddress: string;
  linkAddress: string;
}> = async (taskArgs, hre) => {
  const { linkAddress, contractAddress } = taskArgs;
  const { ethers } = hre;
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const wallet = new ethers.Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // Hardhat wallet are deterministic and the same across al hardhat users
    provider
  );

  const LinkToken = await hre.ethers.getContractFactory("LinkToken", wallet);
  const linkToken = LinkToken.attach(linkAddress);

  // Give LINK Token to pay oracle for request to consumer contract
  try {
    await linkToken.transfer(
      contractAddress,
      hre.ethers.utils.parseEther("100"),
      {
        from: wallet.address,
      }
    );

    const newBalance = await linkToken.balanceOf(contractAddress);

    console.table({
      "Contract Address": contractAddress,
      "Link Token Address": linkAddress,
      "Link Token Balance": ethers.utils.formatEther(newBalance),
    });
  } catch (error) {
    console.error(
      `\nCannot fund contract ${contractAddress} due to :\n\n`,
      error
    );

    throw error;
  }
};
const getInfo = async (authToken: string): Promise<ResponseData> => {
  const response = await axios.request({
    url: "http://127.0.0.1:6688/query",
    headers: {
      "content-type": "application/json",
      cookie: `blocalauth=localapibe315fd0c14b5e47:; isNotIncognito=true; _ga=GA1.1.2055974768.1644792885; ${authToken}`,
      Referer: "http://127.0.0.1:6688/jobs/new",
    },
    data: '{"operationName":"FetchAccountBalances","variables":{},"query":"fragment AccountBalancesPayload_ResultsFields on EthKey {\\n  address\\n  chain {\\n    id\\n    __typename\\n  }\\n  ethBalance\\n  linkBalance\\n  __typename\\n}\\n\\nquery FetchAccountBalances {\\n  ethKeys {\\n    results {\\n      ...AccountBalancesPayload_ResultsFields\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}',
    method: "POST",
  });

  return response.data;
};

export const nodeInfo = async (): Promise<void> => {
  const authenticationToken = await login();

  try {
    const info = await getInfo(authenticationToken);
    if (info.errors != null) {
      console.log("Errors found when trying to get node info:\n");
      console.log(
        info.errors.reduce((acc, error) => {
          acc += `\t${error.message}\n`;
          return acc;
        }, "\t")
      );
    } else {
      console.table({
        Address: info.data?.ethKeys?.results[0]?.address,
        Balance: info.data?.ethKeys?.results[0]?.ethBalance,
        ChainID: info.data?.ethKeys?.results[0]?.chain?.id,
      });
    }
  } catch (error) {
    console.log("Could not get Node address reason: ", error);
  }
};
