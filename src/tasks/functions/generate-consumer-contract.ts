import { ActionType } from "hardhat/types";
import fs from "fs";

export const generateConsumerContract: ActionType<{
}> = async (taskArgs, hre) => {
    const dstDir = `${hre.config.paths.root}/contracts`
    const dst = `${dstDir}/FunctionsConsumer.sol`;

    if (!fs.existsSync(dstDir)) {
        fs.mkdirSync(dstDir);
    }
    if (fs.existsSync(dst)) {
        throw "Contract file exists: " + dst
    }

    const src = `${hre.config.paths.root}/node_modules/@chainlink/hardhat-chainlink/contracts/FunctionsConsumer.sol`;    
    fs.copyFileSync(src, dst);
    
    console.log(`FunctionsConsumer.sol is saved as ${dst}, now compiling...`);
    await hre.run("compile");
}
