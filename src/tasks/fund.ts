import { ActionType } from "hardhat/types";

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
