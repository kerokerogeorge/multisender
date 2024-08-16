const { ethers } = require("hardhat");
const toml = require('toml');
const fs = require('fs');
const path = require('path');
const Web3 = require("web3");

const network = process.env.HARDHAT_NETWORK;
const prvKey = network == 'testnet' ? process.env.PRIVATE_KEY_TESTNET : process.env.PRIVATE_KEY_MAINNET;

const configPath = network == 'testnet' ? path.resolve("configs", './multisendether.testnet.toml') : path.resolve("configs", './multisendether.mainnet.toml')
const config = toml.parse(fs.readFileSync(configPath, 'utf8'));

const web3 = new Web3(network == 'testnet' ? process.env.TESTNET_RPC_URL : process.env.MAINNET_RPC_URL);

async function main() {
  const multisendAddress = config.data.polygon.multisendAddress;
  const Multisend = await ethers.getContractFactory("Multisend");
  const multisend = await Multisend.attach(multisendAddress)

  const account = web3.eth.accounts.privateKeyToAccount(prvKey);
  console.log("/*\n"," * ===================================================================================\n", ` * Account: ${account.address}`);

  const recipients = config.data.matic.recipients.map(recipient => recipient.address);
  const values = config.data.matic.recipients.map(recipient => web3.utils.toWei(recipient.ethvalue, 'ether'));

  const tx = await multisend.multisendEther(recipients, values, { value: web3.utils.toWei(config.data.totalAmount, 'ether') });
  await tx.wait();

  console.log("  * Matic sent successfully");
  console.log(`  * ${config.data.polygon.explorer}/tx/${tx.hash}`);
  console.log("  * ===================================================================================")
  console.log("*/")

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


/*
  * ===================================================================================
  * Account: 0xfAB329393Cf587Eafc3Bb733ce3F9E56B01788b6
  * Matic sent successfully
  * https://amoy.polygonscan.com/tx/0xd1bae7b561b04caaf209e98706ba92e8700eb2b7d2ed4a414bfe1f386318c982
  * ===================================================================================
*/