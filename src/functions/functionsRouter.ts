import {
  ResponseListener,
  SecretsManager,
  SubscriptionManager,
} from "@chainlink/functions-toolkit";
import {
  FunctionsResponse,
  GatewayResponse,
  RequestCommitment,
  SubscriptionInfo,
  ThresholdPublicKey,
} from "@chainlink/functions-toolkit/dist/types";
import { ContractReceipt, Signer } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

// DIRECT METHOD CALLS

export const createSubscription = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  functionsRouterAddress: string,
  consumerAddress?: string
): Promise<number> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize(
    hre,
    linkTokenAddress,
    functionsRouterAddress
  );
  return functionsRouter.createSubscription(consumerAddress);
};

export const fundSubscription = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  functionsRouterAddress: string,
  juelsAmount: string,
  subscriptionId: string
): Promise<string> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize(
    hre,
    linkTokenAddress,
    functionsRouterAddress
  );
  const tx = await functionsRouter.fundSubscription(
    juelsAmount,
    subscriptionId
  );

  return tx.transactionHash;
};

export const getSubscriptionInfo = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  functionsRouterAddress: string,
  subscriptionId: string
): Promise<SubscriptionInfo> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize(
    hre,
    linkTokenAddress,
    functionsRouterAddress
  );
  return functionsRouter.getSubscriptionInfo(subscriptionId);
};

export const cancelSubscription = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  functionsRouterAddress: string,
  subscriptionId: string,
  refundAddress: string
): Promise<string> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize(
    hre,
    linkTokenAddress,
    functionsRouterAddress
  );
  const tx = await functionsRouter.cancelSubscription(
    subscriptionId,
    refundAddress
  );

  return tx.transactionHash;
};

export const requestSubscriptionTransfer = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  functionsRouterAddress: string,
  subscriptionId: string,
  newOwner: string
): Promise<string> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize(
    hre,
    linkTokenAddress,
    functionsRouterAddress
  );
  const tx = await functionsRouter.requestSubscriptionTransfer(
    subscriptionId,
    newOwner
  );

  return tx.transactionHash;
};

export const acceptSubscriptionTransfer = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  functionsRouterAddress: string,
  subscriptionId: string
): Promise<string> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize(
    hre,
    linkTokenAddress,
    functionsRouterAddress
  );
  const tx = await functionsRouter.acceptSubscriptionTransfer(subscriptionId);

  return tx.transactionHash;
};

export const addConsumer = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  functionsRouterAddress: string,
  subscriptionId: string,
  consumerAddress: string
): Promise<string> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize(
    hre,
    linkTokenAddress,
    functionsRouterAddress
  );
  const tx = await functionsRouter.addConsumer(subscriptionId, consumerAddress);

  return tx.transactionHash;
};

export const removeConsumer = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  functionsRouterAddress: string,
  subscriptionId: string,
  consumerAddress: string
): Promise<string> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize(
    hre,
    linkTokenAddress,
    functionsRouterAddress
  );
  const tx = await functionsRouter.removeConsumer(
    subscriptionId,
    consumerAddress
  );

  return tx.transactionHash;
};

export const timeoutRequests = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  functionsRouterAddress: string,
  requestCommitments: RequestCommitment[]
): Promise<string> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize(
    hre,
    linkTokenAddress,
    functionsRouterAddress
  );
  const tx = await functionsRouter.timeoutRequests(requestCommitments);

  return tx.transactionHash;
};

export const estimateRequestCost = async (
  hre: HardhatRuntimeEnvironment,
  linkTokenAddress: string,
  functionsRouterAddress: string,
  donId: string,
  subscriptionId: string,
  callbackGasLimit: number,
  gasPriceWei: string
): Promise<BigInt> => {
  const functionsRouter = await FunctionsSubscriptionManager.initialize(
    hre,
    linkTokenAddress,
    functionsRouterAddress
  );
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
  const functionsResponseListener = await FunctionsResponseListener.initialize(
    hre,
    functionsRouterAddress
  );
  return functionsResponseListener.listenForResponse(requestId, timeout);
};

export const listenForResponses = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  subscriptionId: string,
  callback: (functionsResponse: FunctionsResponse) => any
): Promise<void> => {
  const functionsResponseListener = await FunctionsResponseListener.initialize(
    hre,
    functionsRouterAddress
  );
  return functionsResponseListener.listenForResponses(subscriptionId, callback);
};

export const stopListeningForResponses = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string
): Promise<void> => {
  const functionsResponseListener = await FunctionsResponseListener.initialize(
    hre,
    functionsRouterAddress
  );
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
  const functionsSecretsManager = await FunctionsSecretsManager.initialize(
    hre,
    functionsRouterAddress,
    donId
  );
  return functionsSecretsManager.fetchKeys();
};

export const encryptSecretsUrls = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  donId: string,
  secretsUrls: string[]
): Promise<string> => {
  const functionsSecretsManager = await FunctionsSecretsManager.initialize(
    hre,
    functionsRouterAddress,
    donId
  );
  return functionsSecretsManager.encryptSecretsUrls(secretsUrls);
};

export const verifyOffchainSecrets = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  donId: string,
  secretsUrls: string[]
): Promise<boolean> => {
  const functionsSecretsManager = await FunctionsSecretsManager.initialize(
    hre,
    functionsRouterAddress,
    donId
  );
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
  const functionsSecretsManager = await FunctionsSecretsManager.initialize(
    hre,
    functionsRouterAddress,
    donId
  );
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
  const functionsSecretsManager = await FunctionsSecretsManager.initialize(
    hre,
    functionsRouterAddress,
    donId
  );
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
  const functionsSecretsManager = await FunctionsSecretsManager.initialize(
    hre,
    functionsRouterAddress,
    donId
  );
  return functionsSecretsManager.listDONHostedEncryptedSecrets(gatewayUrls);
};

export const buildDONHostedEncryptedSecretsReference = async (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  donId: string,
  slotId: number,
  version: number
): Promise<string> => {
  const functionsSecretsManager = await FunctionsSecretsManager.initialize(
    hre,
    functionsRouterAddress,
    donId
  );
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
    linkTokenAddress: string,
    functionsRouterAddress: string
  ) {
    this.hre = hre;
    this.subscriptionManager = new SubscriptionManager({
      signer,
      linkTokenAddress,
      functionsRouterAddress,
    });
  }

  // static async class factory
  static async initialize(
    hre: HardhatRuntimeEnvironment,
    linkTokenAddress: string,
    functionsRouterAddress: string
  ): Promise<FunctionsSubscriptionManager> {
    const [signer] = await hre.ethers.getSigners();
    const functionsSubscriptionManager = new FunctionsSubscriptionManager(
      hre,
      signer,
      linkTokenAddress,
      functionsRouterAddress
    );
    await functionsSubscriptionManager.subscriptionManager.initialize();
    return functionsSubscriptionManager;
  }

  createSubscription(consumerAddress?: string): Promise<number> {
    return this.subscriptionManager.createSubscription({
      consumerAddress,
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });
  }

  fundSubscription(
    juelsAmount: string,
    subscriptionId: string
  ): Promise<ContractReceipt> {
    return this.subscriptionManager.fundSubscription({
      juelsAmount,
      subscriptionId,
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });
  }

  getSubscriptionInfo(subscriptionId: string): Promise<SubscriptionInfo> {
    return this.subscriptionManager.getSubscriptionInfo(subscriptionId);
  }

  cancelSubscription(
    subscriptionId: string,
    refundAddress: string
  ): Promise<ContractReceipt> {
    return this.subscriptionManager.cancelSubscription({
      subscriptionId,
      refundAddress,
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });
  }

  requestSubscriptionTransfer(
    subscriptionId: string,
    newOwner: string
  ): Promise<ContractReceipt> {
    return this.subscriptionManager.requestSubscriptionTransfer({
      subscriptionId,
      newOwner,
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });
  }

  acceptSubscriptionTransfer(subscriptionId: string): Promise<ContractReceipt> {
    return this.subscriptionManager.acceptSubTransfer({
      subscriptionId,
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });
  }

  addConsumer(
    subscriptionId: string,
    consumerAddress: string
  ): Promise<ContractReceipt> {
    return this.subscriptionManager.addConsumer({
      subscriptionId,
      consumerAddress,
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });
  }

  removeConsumer(
    subscriptionId: string,
    consumerAddress: string
  ): Promise<ContractReceipt> {
    return this.subscriptionManager.removeConsumer({
      subscriptionId,
      consumerAddress,
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });
  }

  timeoutRequests(
    requestCommitments: RequestCommitment[]
  ): Promise<ContractReceipt> {
    return this.subscriptionManager.timeoutRequests({
      requestCommitments,
      txOptions: {
        confirmations: this.hre.config.chainlink.confirmations,
      },
    });
  }

  estimateRequestCost(
    donId: string,
    subscriptionId: string,
    callbackGasLimit: number,
    gasPriceWei: string
  ): Promise<BigInt> {
    return this.subscriptionManager.estimateFunctionsRequestCost({
      donId,
      subscriptionId,
      callbackGasLimit,
      gasPriceWei: BigInt(gasPriceWei),
    });
  }
}

export class FunctionsResponseListener {
  private responseListener: ResponseListener;

  private constructor(
    hre: HardhatRuntimeEnvironment,
    functionsRouterAddress: string
  ) {
    this.responseListener = new ResponseListener({
      provider: hre.ethers.provider,
      functionsRouterAddress,
    });
  }

  static async initialize(
    hre: HardhatRuntimeEnvironment,
    functionsRouterAddress: string
  ): Promise<FunctionsResponseListener> {
    return new FunctionsResponseListener(hre, functionsRouterAddress);
  }

  listenForResponse(
    requestId: string,
    timeout?: number
  ): Promise<FunctionsResponse> {
    return this.responseListener.listenForResponse(requestId, timeout);
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
  private hre: HardhatRuntimeEnvironment;

  private constructor(
    hre: HardhatRuntimeEnvironment,
    signer: Signer,
    functionsRouterAddress: string,
    donId: string
  ) {
    this.hre = hre;
    this.secretsManager = new SecretsManager({
      signer,
      functionsRouterAddress,
      donId,
    });
  }

  static async initialize(
    hre: HardhatRuntimeEnvironment,
    functionsRouterAddress: string,
    donId: string
  ): Promise<FunctionsSecretsManager> {
    const [signer] = await hre.ethers.getSigners();
    const functionsSecretsManager = new FunctionsSecretsManager(
      hre,
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
