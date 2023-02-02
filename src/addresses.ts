// Returns LINK token contract address for the specified chain.
export function getLinkTokenAddress(chainID: number): string {
    switch (chainID) {
        case 1: // Ethereum Mainnet
            return "0x514910771AF9Ca656af840dff83E8264EcF986CA"
        case 5: // Goerli
            return "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
        case 11155111: // Sepolia
            return "0x779877A7B0D9E8603169DdbD7836e478b4624789"
        case 80001: // Mumbai
            return "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
    }
    throw "Unknown chainID"
}

// Returns LINK/ETH price feed contract address for the specified chain.
export function getLinkEthPriceFeedAddress(chainID: number): string {
    switch (chainID) {
        case 1: // Ethereum Mainnet
            return "0xDC530D9457755926550b59e8ECcdaE7624181557"
        case 5: // Goerli
            return "0xb4c4a493AB6356497713A78FFA6c60FB53517c63"
        case 11155111: // Sepolia
            return "0x42585eD362B3f1BCa95c640FdFf35Ef899212734"
        case 80001: // Mumbai
            return "0x12162c3E810393dEC01362aBf156D7ecf6159528"
    }
    throw "Unknown chainID"
}
