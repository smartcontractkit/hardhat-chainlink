import {
  ResponseListener,
  SubscriptionManager,
} from "@chainlink/functions-toolkit";
import {
  FunctionsResponse,
  RequestCommitment,
  SubscriptionInfo,
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
  const functionsResponseListener = new FunctionsResponseListener(
    hre,
    functionsRouterAddress
  );
  return functionsResponseListener.listenForResponse(requestId, timeout);
};

export const listenForResponses = (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string,
  subscriptionId: number | string,
  callback: (functionsResponse: FunctionsResponse) => any
): void => {
  const functionsResponseListener = new FunctionsResponseListener(
    hre,
    functionsRouterAddress
  );
  return functionsResponseListener.listenForResponses(subscriptionId, callback);
};

export const stopListeningForResponses = (
  hre: HardhatRuntimeEnvironment,
  functionsRouterAddress: string
): void => {
  const functionsResponseListener = new FunctionsResponseListener(
    hre,
    functionsRouterAddress
  );
  return functionsResponseListener.stopListeningForResponses();
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
  ) {
    const [signer] = await hre.ethers.getSigners();
    const functionsRouter = new FunctionsSubscriptionManager(
      hre,
      signer,
      linkTokenAddress,
      functionsRouterAddress
    );
    await functionsRouter.subscriptionManager.initialize();
    return functionsRouter;
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

  constructor(hre: HardhatRuntimeEnvironment, functionsRouterAddress: string) {
    this.responseListener = new ResponseListener({
      provider: hre.ethers.provider,
      functionsRouterAddress,
    });
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
