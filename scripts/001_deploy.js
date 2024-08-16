const { ethers } = require("hardhat");
const toml = require('toml');
const fs = require('fs');
const path = require('path');

const network = process.env.HARDHAT_NETWORK;
const prvKey = network == 'testnet' ? process.env.PRIVATE_KEY_TESTNET : process.env.PRIVATE_KEY_MAINNET;

const configPath = network == 'testnet' ? path.resolve("configs", './deploy.testnet.toml') : path.resolve("configs", './deploy.mainnet.toml')
const config = toml.parse(fs.readFileSync(configPath, 'utf8'));

async function main() {
  const account = web3.eth.accounts.privateKeyToAccount(prvKey);
  console.log("/*\n"," * ===================================================================================\n", ` * Deploying contracts with the account: ${account.address}`);
  const multisendContract = await ethers.deployContract("Multisend");
  await multisendContract.waitForDeployment();

  const address = await multisendContract.getAddress();
  console.log("  * Contract address:", address);
  console.log(`  * ${config.data.polygon.explorer}/address/${address}`);
  console.log("  * ===================================================================================")
  console.log("*/")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Result
/*
  * ===================================================================================
  * Deploying contracts with the account: 0xfAB329393Cf587Eafc3Bb733ce3F9E56B01788b6
  * Contract address: 0xCa7e5Ebf205271c5a1dfe37F89bC8C67f395bC91
  * https://amoy.polygonscan.com/address/0xCa7e5Ebf205271c5a1dfe37F89bC8C67f395bC91
  * ===================================================================================
*/