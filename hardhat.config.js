require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({ path: '.env' })
const PRIVATE_KEY = process.env.PRIVATE_KEY
const TESTNET_RPC_URL = process.env.TESTNET_RPC_URL
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL

module.exports = {
  solidity: "0.8.0",
  networks: {
    testnet: {
      url: TESTNET_RPC_URL,
      accounts: [PRIVATE_KEY]
    },
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
