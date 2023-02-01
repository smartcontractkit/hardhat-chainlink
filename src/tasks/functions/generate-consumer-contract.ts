import { ActionType } from "hardhat/types";
import fs from "fs";

export const generateConsumerContract: ActionType<{
}> = async (taskArgs, hre) => {
    const src = `${hre.config.paths.root}/node_modules/@chainlink/hardhat-chainlink/contracts/FunctionsConsumer.sol`;
    const dst = `${hre.config.paths.root}/contracts/FunctionsConsumer.sol`;
    fs.copyFileSync(src, dst);
    console.log(`FunctionsConsumer.sol has to be saved as ${dst}`);
    await hre.run("compile");
}
