import { ActionType } from "hardhat/types";
import { FunctionsBillingRegistry__factory } from "../../../types";
import { fundSubscription, addSubscriptionConsumer } from "../../functions";

export const createSubscriptionAction: ActionType<{
  registryAddress: string;
  clientContractAddress: string;
  linkAmount: string;
}> = async (taskArgs, hre) => {
  const { linkAmount, clientContractAddress, registryAddress } = taskArgs

  const accounts = await hre.ethers.getSigners()
  const signer = accounts[0]

  console.log(`Creating a new subscription with registry ${registryAddress}...`);
  const registry = FunctionsBillingRegistry__factory.connect(registryAddress, signer)
  const createSubscriptionTx = await registry.createSubscription()
  const createSubscriptionReceipt = await createSubscriptionTx.wait()
  if (!createSubscriptionReceipt || !createSubscriptionReceipt.events || !createSubscriptionReceipt.events[0].args) {
    throw Error("Failed to create a new subscription")
  }
  const subscriptionId = createSubscriptionReceipt.events[0].args["subscriptionId"].toNumber()
  console.table({ "Subscription ID": subscriptionId })

  if (linkAmount) {
    console.log(`Funding with subscription ${subscriptionId} with ${linkAmount} LINK...`);

    const newBalance = await fundSubscription(hre, registryAddress, subscriptionId, linkAmount);

    console.log(`Subscription ${subscriptionId} new balance: ${hre.ethers.utils.formatEther(newBalance)} LINK`)
  }

  if (clientContractAddress) {
    console.log(`Adding subscription ${subscriptionId} consumer ${clientContractAddress}...`);

    await addSubscriptionConsumer(hre, registryAddress, subscriptionId, clientContractAddress);

    console.log(`Client ${clientContractAddress} has been authorized with subscription: ${subscriptionId}`)
  }
};
