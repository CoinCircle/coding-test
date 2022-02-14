# CoinCircle Coding Test

<hr>

**1. The test involves creating a very simple full-stack application that
allows you to compare historical DAI interest rates across the top on-chain
protocols that allow you to earn interest on DAI:**

1. [Compound Finance](https://compound.finance)
2. Choose your own for the 2nd! (for example The DAI Savings Rate). Some examples:
   * [DAI Savings Rate](https://makerdao.world/en/learn/Dai/dsr/)
   * [Aave](https://aave.com)

If you're unfamiliar with DAI, you can read about it here: https://docs.makerdao.com/smart-contract-modules/dai-module

DAI is a type of cryptocurrency called a "stable coin" that maintains a value of $1. The protocols above are implementations of blockchain
applications that allow you to lend DAI to others, and earn interest on it in a completely decentralized, autonomous way
without having to interact with a bank, middleman, or even a web server.

You will be judged on the following:

1. Code Quality / Readability / Maintainability / Architecture
2. Design UX/UI
3. Performance (speed)

The full-stack application must be written according to the following specifications:

1. The application must fully load quickly (less than 500ms).
2. The UI must render a historical graph that live updates as the interest rates change.
3. The application must show at least 128 blocks. For the historical data, your web application may query contracts besides your own as well as any other on-chain data.
4. As you are building, you should use github to push commits. The final app should be published on github, which is where we will find it. Name it something original that you think sounds cool.  Please be sure to NOT call it anything with the words CoinCircle or Coding Test or CoinCircle Coding Test or anything similar.  Once you have published it and tested that it can be downloaded and run from a new enviornment with `make run` please email us and let us know it's ready for us to try out.
5. Use the main ethereum mainnet to query the interest rates, rather than the testnet. The reason for this is because there is not much activity on the testnets as compared to the mainnet, so you will end up with a flat graph if you use testnet.

<hr>


## Boilerplate

A NodeJS / Express / React boilerplate is already created for you in this repo.

To get started running it:

1. Run `yarn install` to install dependencies
2. Install docker if you don't have it already, and start the containers with `docker compose up -d`
3. In terminal #1, run `npm run build:watch` to generate webpack bundle
4. In terminal #2, run `make serve` to start the express server, which is available at `localhost:3001`.

The following ports are mapped for you for development/debugging purposes:

* Node debugger: Port 9230
* Redis: Port 6377
* Postgres
  * Port: 5430
  * Username: pguser
  * Password: password
  * Database: app

<br>


# Helpful Info

## Ethereum JSON RPC Provider

Feel free to use our node as a Ethereum JSON RPC Provider:

Ropsten: https://eth-testnet.coincircle.com
Mainnet: https://eth.coincircle.com

Also, note that you only need to get the lending (supply) rates. You don't need to worry about implementing the borrow rate.

## Regarding Historical Data

When querying an Ethereum node via RPC, you can pass in a block number in the
past so long as it is within 128 blocks of the current block. this is why the
historical data requirement is set to 128 blocks, which is a little more than
30 minutes worth of data.

Therefore, when we run your app, we expect to see at least 30 minutes of historical data,
with new data being appended as it comes in.

More info on querying past blocks here (see overrides.blockTag):

https://docs.ethers.io/v5/api/contract/contract/#Contract-functionsCall

## More Useful Links

* Compound cToken Solidity Interface: https://github.com/compound-finance/compound-protocol/blob/master/contracts/CTokenInterfaces.sol
* Etherscan cDAI contract (mainnet): https://etherscan.io/token/0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643#readContract
