## Setup

- Install dependencies

recommended version

- node: v18.17.1
- npm: v9.6.7
- compiler version: v0.8.4+commit.c7e474f2
- solidity version: 0.8.0

```bash
$ npm install
```

- create .env

Set the PrivateKey and RPC urls

```bash
$ cp .env.sample .env
```

### Multisender Contract Deployment

1. Set config values

   - deployerAddress: address of the deployer
   - explorer: explorer url

1. Execute javascript file

```bash
$ npx hardhat run scripts/001_deploy.js --network testnet
```

result

```jsx
/*
 * ===================================================================================
 * Deploying contracts with the account: 0xfAB329393Cf587Eafc3Bb733ce3F9E56B01788b6
 * Contract address: 0xCa7e5Ebf205271c5a1dfe37F89bC8C67f395bC91
 * https://amoy.polygonscan.com/address/0xCa7e5Ebf205271c5a1dfe37F89bC8C67f395bC91
 * ===================================================================================
 */
```

### Multisendeth

1. Configure the values in the multisendether.{env}.toml file

```toml
    [data]
    deployerAddress = "0xfAB329393Cf587Eafc3Bb733ce3F9E56B01788b6"
    totalAmount = "0.3" // total amount of the ethvalue in data.matic.recipients array

    [data.polygon]
    explorer = "https://amoy.polygonscan.com/"
    multisendAddress = "0x908CB22757181f7da59B7e1D73e06E491b4e576B"

    [[data.matic.recipients]]
    address = "0x3389F460CDD2198d2D3124B33b936F513C1540f7"
    ethvalue = "0.1"

    [[data.matic.recipients]]
    address = "0x16F2AbF3b5fE2cEBE725255E54062906b405c16a"
    ethvalue = "0.2"
```

2.Execute javascript file

```bash
$ npx hardhat run scripts/002_multisendether.js --network testnet
```

result

```jsx
/*
 * ===================================================================================
 * Account: 0xfAB329393Cf587Eafc3Bb733ce3F9E56B01788b6
 * Matic sent successfully
 * https://amoy.polygonscan.com/tx/0xd1bae7b561b04caaf209e98706ba92e8700eb2b7d2ed4a414bfe1f386318c982
 * ===================================================================================
 */
```

### Multisendtoken

1. Configure the values in the multisendtoken.{env}.toml file

```toml
    [data]
    deployerAddress = "0xfAB329393Cf587Eafc3Bb733ce3F9E56B01788b6"
    totalAmount = "3"

    [data.polygon]
    explorer = "https://amoy.polygonscan.com"
    multisendAddress = "0xCa7e5Ebf205271c5a1dfe37F89bC8C67f395bC91"
    tokenContractAddress = "0xEf65A25787C958C45ce2652475660877878d64Ee"

    [[data.erc20.recipients]]
    address = "0x3389F460CDD2198d2D3124B33b936F513C1540f7"
    ethvalue = "1"

    [[data.erc20.recipients]]
    address = "0x16F2AbF3b5fE2cEBE725255E54062906b405c16a"
    ethvalue = "2"
```

2. Execute javascript file

```bash
$ npx hardhat run scripts/003_multisendtoken.js --network testnet
```

result

```jsx
/*
 * ===================================================================================
 * Account: 0xfAB329393Cf587Eafc3Bb733ce3F9E56B01788b6
 * Matic sent successfully
 * https://amoy.polygonscan.com/tx/0x4ac76dd205114d5a6ac33347aa10326c755838f0696f8c4a66ffcb5dc8cd77b2
 * ===================================================================================
 */
```
