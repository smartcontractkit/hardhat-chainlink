import {
  ResponseListener,
  SecretsManager,
  SubscriptionManager,
} from "@chainlink/functions-toolkit";
import {
  FunctionsResponse,
  GatewayResponse,
  RequestCommitment,
  ThresholdPublicKey,
} from "@chainlink/functions-toolkit/dist/types";
import { BigNumber, BigNumberish, providers, Signer } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { FunctionsSubscriptionDetails, Overrides } from "../shared/types";

// DIRECT METHOD CALLS

export const createSubscription = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  consumerAddress?: string,
  overrides?: Overrides
): Promise<{ subscriptionId: BigNumber }> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize({
    hre,
    functionsRouterAddress,
    overrides,
  });
  return functionsRouter.createSubscription(consumerAddress);
};

export const fundSubscription = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  linkTokenAddress: string,
  amountInJuels: BigNumberish,
  subscriptionId: BigNumberish,
  overrides?: Overrides
): Promise<{ transactionHash: string }> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize({
    hre,
    functionsRouterAddress,
    linkTokenAddress,
    overrides,
  });
  return functionsRouter.fundSubscription(amountInJuels, subscriptionId);
};

export const cancelSubscription = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  subscriptionId: BigNumberish,
  receivingAddress?: string,
  overrides?: Overrides
): Promise<{ transactionHash: string }> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize({
    hre,
    functionsRouterAddress,
    overrides,
  });
  return functionsRouter.cancelSubscription(subscriptionId, receivingAddress);
};

export const requestSubscriptionOwnerTransfer = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  subscriptionId: BigNumberish,
  newOwnerAddress: string,
  overrides?: Overrides
): Promise<{ transactionHash: string }> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize({
    hre,
    functionsRouterAddress,
    overrides,
  });
  return functionsRouter.requestSubscriptionOwnerTransfer(
    subscriptionId,
    newOwnerAddress
  );
};

export const acceptSubscriptionOwnerTransfer = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  subscriptionId: BigNumberish,
  overrides?: Overrides
): Promise<{ transactionHash: string }> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize({
    hre,
    functionsRouterAddress,
    overrides,
  });
  return functionsRouter.acceptSubscriptionOwnerTransfer(subscriptionId);
};

export const getSubscriptionDetails = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  subscriptionId: BigNumberish
): Promise<FunctionsSubscriptionDetails> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize({
    hre,
    functionsRouterAddress,
  });
  return functionsRouter.getSubscriptionDetails(subscriptionId);
};

export const addConsumer = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  consumerAddress: string,
  subscriptionId: BigNumberish,
  overrides?: Overrides
): Promise<{ transactionHash: string }> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize({
    hre,
    functionsRouterAddress,
    overrides,
  });
  return functionsRouter.addConsumer(subscriptionId, consumerAddress);
};

export const removeConsumer = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  consumerAddress: string,
  subscriptionId: BigNumberish,
  overrides?: Overrides
): Promise<{ transactionHash: string }> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize({
    hre,
    functionsRouterAddress,
    overrides,
  });
  return functionsRouter.removeConsumer(subscriptionId, consumerAddress);
};

export const timeoutRequests = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  requestCommitments: RequestCommitment[],
  overrides?: Overrides
): Promise<{ transactionHash: string }> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize({
    hre,
    functionsRouterAddress,
    overrides,
  });
  return functionsRouter.timeoutRequests(requestCommitments);
};

export const estimateRequestCost = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  donId: string,
  subscriptionId: BigNumberish,
  callbackGasLimit: number,
  gasPriceWei: BigNumberish,
  overrides?: Overrides
): Promise<BigInt> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize({
    hre,
    functionsRouterAddress,
    overrides,
  });
  return functionsRouter.estimateRequestCost(
    donId,
    subscriptionId,
    callbackGasLimit,
    gasPriceWei
  );
};

export const listenForResponse = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  requestId: string,
  timeout?: number
): Promise<FunctionsResponse> => {
  const functionsResponseListener = await FunctionsResponseListener.initialize({
    hre,
    functionsRouterAddress,
  });
  return functionsResponseListener.listenForResponse(requestId, timeout);
};

export const listenForResponseFromTransaction = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  requestId: string,
  timeout?: number,
  confirmations?: number,
  checkInterval?: number
): Promise<FunctionsResponse> => {
  const functionsResponseListener = await FunctionsResponseListener.initialize({
    hre,
    functionsRouterAddress,
  });
  return functionsResponseListener.listenForResponseFromTransaction(
    requestId,
    timeout,
    confirmations,
    checkInterval
  );
};

export const listenForResponses = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  subscriptionId: string,
  callback: (functionsResponse: FunctionsResponse) => any
): Promise<void> => {
  const functionsResponseListener = await FunctionsResponseListener.initialize({
    hre,
    functionsRouterAddress,
  });
  return functionsResponseListener.listenForResponses(subscriptionId, callback);
};

export const stopListeningForResponses = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string
): Promise<void> => {
  const functionsResponseListener = await FunctionsResponseListener.initialize({
    hre,
    functionsRouterAddress,
  });
  return functionsResponseListener.stopListeningForResponses();
};

export const fetchKeys = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  donId: string
): Promise<{
  thresholdPublicKey: ThresholdPublicKey;
  donPublicKey: string;
}> => {
  const functionsSecretsManager = await FunctionsSecretsManager.initialize({
    hre,
    functionsRouterAddress,
    donId,
  });
  return functionsSecretsManager.fetchKeys();
};

export const encryptSecretsUrls = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  donId: string,
  secretsUrls: string[]
): Promise<string> => {
  const functionsSecretsManager = await FunctionsSecretsManager.initialize({
    hre,
    functionsRouterAddress,
    donId,
  });
  return functionsSecretsManager.encryptSecretsUrls(secretsUrls);
};

export const verifyOffchainSecrets = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  donId: string,
  secretsUrls: string[]
): Promise<boolean> => {
  const functionsSecretsManager = await FunctionsSecretsManager.initialize({
    hre,
    functionsRouterAddress,
    donId,
  });
  return functionsSecretsManager.verifyOffchainSecrets(secretsUrls);
};

export const encryptSecrets = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  donId: string,
  secrets?: Record<string, string>
): Promise<{
  encryptedSecrets: string;
}> => {
  const functionsSecretsManager = await FunctionsSecretsManager.initialize({
    hre,
    functionsRouterAddress,
    donId,
  });
  return functionsSecretsManager.encryptSecrets(secrets);
};

export const uploadEncryptedSecretsToDON = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  donId: string,
  encryptedSecretsHexstring: string,
  gatewayUrls: string[],
  slotId: number,
  minutesUntilExpiration: number
): Promise<{
  version: number;
  success: boolean;
}> => {
  const functionsSecretsManager = await FunctionsSecretsManager.initialize({
    hre,
    functionsRouterAddress,
    donId,
  });
  return functionsSecretsManager.uploadEncryptedSecretsToDON(
    encryptedSecretsHexstring,
    gatewayUrls,
    slotId,
    minutesUntilExpiration
  );
};

export const listDONHostedEncryptedSecrets = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  donId: string,
  gatewayUrls: string[]
): Promise<{
  result: GatewayResponse;
  error?: string;
}> => {
  const functionsSecretsManager = await FunctionsSecretsManager.initialize({
    hre,
    functionsRouterAddress,
    donId,
  });
  return functionsSecretsManager.listDONHostedEncryptedSecrets(gatewayUrls);
};

export const buildDONHostedEncryptedSecretsReference = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  donId: string,
  slotId: number,
  version: number
): Promise<string> => {
  const functionsSecretsManager = await FunctionsSecretsManager.initialize({
    hre,
    functionsRouterAddress,
    donId,
  });
  return functionsSecretsManager.buildDONHostedEncryptedSecretsReference(
    slotId,
    version
  );
};

export class FunctionsSubscriptionManager {
  private hre: HardhatRuntimeEnvironment;
  private subscriptionManager: SubscriptionManager;

  private constructor(
    hre: HardhatRuntimeEnvironment,
    signer: Signer,
    functionsRouterAddress: string,
    linkTokenAddress?: string
  ) {
    this.hre = hre;
    this.subscriptionManager = new SubscriptionManager({
      signer,
      functionsRouterAddress,
      linkTokenAddress: linkTokenAddress || "",
    });
  }

  // static async class factory
  static async initialize(args: {
    hre: HardhatRuntimeEnvironment;
    functionsRouterAddress: string;
    linkTokenAddress?: string;
    overrides?: Overrides;
  }): Promise<FunctionsSubscriptionManager> {
    const { hre, functionsRouterAddress, linkTokenAddress, overrides } = args;
    const accounts = await hre.ethers.getSigners();
    const functionsSubscriptionManager = new FunctionsSubscriptionManager(
      hre,
      overrides?.signer || accounts[0],
      functionsRouterAddress,
      linkTokenAddress
    );
    await functionsSubscriptionManager.subscriptionManager.initialize();
    return functionsSubscriptionManager;
  }

  async createSubscription(
    consumerAddress?: string
  ): Promise<{ subscriptionId: BigNumber }> {
    const subscriptionId = await this.subscriptionManager.createSubscription({
      consumerAddress,
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });
    return {
      subscriptionId: BigNumber.from(subscriptionId),
    };
  }

  async fundSubscription(
    amountInJuels: BigNumberish,
    subscriptionId: BigNumberish
  ): Promise<{ transactionHash: string }> {
    const tx = await this.subscriptionManager.fundSubscription({
      juelsAmount: amountInJuels.toString(),
      subscriptionId: subscriptionId.toString(),
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });

    return {
      transactionHash: tx.transactionHash,
    };
  }

  async getSubscriptionDetails(
    subscriptionId: BigNumberish
  ): Promise<FunctionsSubscriptionDetails> {
    const result = await this.subscriptionManager.getSubscriptionInfo(
      subscriptionId.toString()
    );
    return {
      balance: BigNumber.from(result.balance),
      owner: result.owner,
      blockedBalance: BigNumber.from(result.blockedBalance),
      proposedOwner: result.proposedOwner,
      consumers: result.consumers,
      flags: result.flags,
    };
  }

  async cancelSubscription(
    subscriptionId: BigNumberish,
    receivingAddress?: string
  ): Promise<{ transactionHash: string }> {
    const tx = await this.subscriptionManager.cancelSubscription({
      subscriptionId: subscriptionId.toString(),
      refundAddress: receivingAddress,
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });

    return {
      transactionHash: tx.transactionHash,
    };
  }

  async requestSubscriptionOwnerTransfer(
    subscriptionId: BigNumberish,
    newOwnerAddress: string
  ): Promise<{ transactionHash: string }> {
    const tx = await this.subscriptionManager.requestSubscriptionTransfer({
      subscriptionId: subscriptionId.toString(),
      newOwner: newOwnerAddress,
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });
    return {
      transactionHash: tx.transactionHash,
    };
  }

  async acceptSubscriptionOwnerTransfer(
    subscriptionId: BigNumberish
  ): Promise<{ transactionHash: string }> {
    const tx = await this.subscriptionManager.acceptSubTransfer({
      subscriptionId: subscriptionId.toString(),
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });
    return {
      transactionHash: tx.transactionHash,
    };
  }

  async addConsumer(
    subscriptionId: BigNumberish,
    consumerAddress: string
  ): Promise<{ transactionHash: string }> {
    const tx = await this.subscriptionManager.addConsumer({
      subscriptionId: subscriptionId.toString(),
      consumerAddress,
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });
    return {
      transactionHash: tx.transactionHash,
    };
  }

  async removeConsumer(
    subscriptionId: BigNumberish,
    consumerAddress: string
  ): Promise<{ transactionHash: string }> {
    const tx = await this.subscriptionManager.removeConsumer({
      subscriptionId: subscriptionId.toString(),
      consumerAddress,
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });
    return {
      transactionHash: tx.transactionHash,
    };
  }
  async timeoutRequests(
    requestCommitments: RequestCommitment[]
  ): Promise<{ transactionHash: string }> {
    const tx = await this.subscriptionManager.timeoutRequests({
      requestCommitments,
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });
    return {
      transactionHash: tx.transactionHash,
    };
  }

  estimateRequestCost(
    donId: string,
    subscriptionId: BigNumberish,
    callbackGasLimit: number,
    gasPriceWei: BigNumberish
  ): Promise<BigInt> {
    return this.subscriptionManager.estimateFunctionsRequestCost({
      donId,
      subscriptionId: subscriptionId.toString(),
      callbackGasLimit,
      gasPriceWei: BigInt(gasPriceWei.toString()),
    });
  }
}

export class FunctionsResponseListener {
  private responseListener: ResponseListener;

  private constructor(
    functionsRouterAddress: string,
    provider: providers.JsonRpcProvider
  ) {
    this.responseListener = new ResponseListener({
      provider,
      functionsRouterAddress,
    });
  }

  // static async class factory
  static async initialize(args: {
    hre: HardhatRuntimeEnvironment;
    functionsRouterAddress: string;
    overrides?: Overrides;
  }): Promise<FunctionsResponseListener> {
    const { hre, functionsRouterAddress, overrides } = args;
    const provider = overrides?.provider || hre.ethers.provider;
    return new FunctionsResponseListener(functionsRouterAddress, provider);
  }

  listenForResponse(
    requestId: string,
    timeout?: number
  ): Promise<FunctionsResponse> {
    return this.responseListener.listenForResponse(requestId, timeout);
  }

  listenForResponseFromTransaction(
    requestId: string,
    timeout?: number,
    confirmations?: number,
    checkInterval?: number
  ): Promise<FunctionsResponse> {
    return this.responseListener.listenForResponseFromTransaction(
      requestId,
      timeout,
      confirmations,
      checkInterval
    );
  }

  listenForResponses(
    subscriptionId: number | string,
    callback: (functionsResponse: FunctionsResponse) => any
  ): void {
    return this.responseListener.listenForResponses(subscriptionId, callback);
  }

  stopListeningForResponses(): void {
    return this.responseListener.stopListeningForResponses();
  }
}

export class FunctionsSecretsManager {
  private secretsManager: SecretsManager;

  private constructor(
    signer: Signer,
    functionsRouterAddress: string,
    donId: string
  ) {
    this.secretsManager = new SecretsManager({
      signer,
      functionsRouterAddress,
      donId,
    });
  }

  // static async class factory
  static async initialize(args: {
    hre: HardhatRuntimeEnvironment;
    functionsRouterAddress: string;
    donId: string;
    overrides?: Overrides;
  }): Promise<FunctionsSecretsManager> {
    const { hre, functionsRouterAddress, donId, overrides } = args;
    const account = await hre.ethers.getSigners();
    const signer = overrides?.signer || account[0];
    const functionsSecretsManager = new FunctionsSecretsManager(
      signer,
      functionsRouterAddress,
      donId
    );
    await functionsSecretsManager.secretsManager.initialize();

    return functionsSecretsManager;
  }

  fetchKeys(): Promise<{
    thresholdPublicKey: ThresholdPublicKey;
    donPublicKey: string;
  }> {
    return this.secretsManager.fetchKeys();
  }

  encryptSecretsUrls(secretsUrls: string[]): Promise<string> {
    return this.secretsManager.encryptSecretsUrls(secretsUrls);
  }

  verifyOffchainSecrets(secretsUrls: string[]): Promise<boolean> {
    return this.secretsManager.verifyOffchainSecrets(secretsUrls);
  }

  encryptSecrets(secrets?: Record<string, string>): Promise<{
    encryptedSecrets: string;
  }> {
    return this.secretsManager.encryptSecrets(secrets);
  }

  uploadEncryptedSecretsToDON(
    encryptedSecretsHexstring: string,
    gatewayUrls: string[],
    slotId: number,
    minutesUntilExpiration: number
  ): Promise<{
    version: number;
    success: boolean;
  }> {
    return this.secretsManager.uploadEncryptedSecretsToDON({
      encryptedSecretsHexstring,
      gatewayUrls,
      slotId,
      minutesUntilExpiration,
    });
  }

  listDONHostedEncryptedSecrets(gatewayUrls: string[]): Promise<{
    result: GatewayResponse;
    error?: string;
  }> {
    return this.secretsManager.listDONHostedEncryptedSecrets(gatewayUrls);
  }

  buildDONHostedEncryptedSecretsReference(
    slotId: number,
    version: number
  ): string {
    return this.secretsManager.buildDONHostedEncryptedSecretsReference({
      slotId,
      version,
    });
  }
}
