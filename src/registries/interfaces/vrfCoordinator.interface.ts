interface MaxGasPrice {
  keyHash: string;
  maxGasPrice: string;
}
export interface VRFCoordinator {
  contractAddress: string;
  chainId: string;
  maxGasPrices: MaxGasPrice[];
}
