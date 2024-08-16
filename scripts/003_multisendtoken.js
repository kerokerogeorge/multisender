const { ethers } = require("hardhat");
const toml = require('toml');
const fs = require('fs');
const path = require('path');
const Web3 = require("web3");

const network = process.env.HARDHAT_NETWORK;
const prvKey = network == 'testnet' ? process.env.PRIVATE_KEY_TESTNET : process.env.PRIVATE_KEY_MAINNET;

const configPath = network == 'testnet' ? path.resolve("configs", './multisendtoken.testnet.toml') : path.resolve("configs", './multisendtoken.mainnet.toml')
const config = toml.parse(fs.readFileSync(configPath, 'utf8'));

const web3 = new Web3(network == 'testnet' ? process.env.TESTNET_RPC_URL : process.env.MAINNET_RPC_URL);

async function main() {
  const tokenContractAddress = config.data.polygon.tokenContractAddress;
  const multisendAddress = config.data.polygon.multisendAddress;
  const Multisend = await ethers.getContractFactory("Multisend");
  const multisend = await Multisend.attach(multisendAddress)

  const account = web3.eth.accounts.privateKeyToAccount(prvKey);
  console.log("/*\n"," * ===================================================================================\n", ` * Account: ${account.address}`);

  const recipients = config.data.erc20.recipients.map(recipient => recipient.address);
  const values = config.data.erc20.recipients.map(recipient => web3.utils.toWei(recipient.tokenValue, 'ether'));

  const token = await ethers.getContractAt("IERC20", tokenContractAddress);

  const approveTx = await token.approve(multisendAddress, web3.utils.toWei(config.data.totalAmount, 'ether'));
  await approveTx.wait();

  const tx = await multisend.multisendToken(token, recipients, values);
  await tx.wait();

  console.log(`  * TOKEN sent successfully`);
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
  * ROND sent successfully
  * https://amoy.polygonscan.com/tx/0x4ac76dd205114d5a6ac33347aa10326c755838f0696f8c4a66ffcb5dc8cd77b2
  * ===================================================================================
*/