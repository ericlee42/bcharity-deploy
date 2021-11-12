import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

if (!process.env.MNEMONIC) {
  throw new Error("No mnemonic setted");
}

const config: HardhatUserConfig = {
  solidity: "0.6.12",
  networks: {
    metis: {
      url: "https://stardust.metis.io/?owner=588",
      accounts: { mnemonic: process.env.MNEMONIC },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: { default: 0 },
    dev: { default: 1 },
    vault: { default: 2 },
    fee: { default: 3 },
  },
};

export default config;
