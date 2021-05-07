# CoinCircle Coding Test

This is a 2-part test:

The first part involves creating a very simple full-stack application that
allows you to compare historical DAI interest rates across the top 3 on-chain
protocols that allow you to earn interest on DAI:

1. Compound Finance
2. The DAI Savings Rate
3. (choose your own for the 3rd!)

Part 2 is a simple solidity contract that queries the current interest rate
from all 3 of those procotols

You will be judged on the following:

1. Code Quality / Readability / Maintainability / Architecture
2. Design UX/UI
3. Performance (speed)

**The full-stack application must be written according to the following specifications:**

1. The backend must be written in either node/express or golang.
2. The front-end must be written in React
3. If you use a database (which you probably will need to) it should use Postgres.
4. If you use a cache, use Redis.
5. The application must fully load quickly (less than 500ms).
6. The UI must render a historical graph that live updates as the interest rates change.
7. The application must show at least 128 blocks. For the historical data, your web application may query contracts besides your own as well as any other on-chain data.
8. The application must be containerized in a docker container.
9. The application should include a Makefile, and when we test it in a fresh enviornment, we should be able to run the application using a single command `make run` and the application should run at `http://localhost:3001`
10. As you are building, you should use github to push commits. The final app should be published on github, which is where we will find it. Name it something original that you think sounds cool.  Please be sure to NOT call it anything with the words CoinCircle or Coding Test or CoinCircle Coding Test or anything similar.  Once you have published it and tested that it can be downloaded and run from a new enviornment with `make run` please email us and let us know it's ready for us to try out.

**The solidity contract should be written according to the following specifications:**

1. Should be deployed on the Ropsten Network.
2. Implements a single function `getRates()` that returns the current interest
rate for the 3 protocols

More helpful info regarding the smart contract portion is mentioned below.

## Getting Started

1. Clone this repo - do NOT fork it.
2. Create a new, public github repo using this repo as a starting point. If you
prefer, you can upload a private repo so long as you also give access to the
following Github accounts: `erickmiller`, `coopermaruyama`.
3. Complete this test in your new repo.
4. At any time, if you have questions, email one of us.

<br>

# Writing Your Smart Contract

The easiest way to do this part is using [Remix](https://remix.ethereum.org/).

You will also need [MetaMask](https://metamask.io/).

Also, you will need some test Ether to deploy your contract. Here are 2 faucets
you can use that will give you free Ropsten ETH:

 * [Ropsten Faucet](https://faucet.ropsten.be/)
 * [MetaMask Ropsten Faucet](https://faucet.metamask.io/)

You can find the contract addresses for compound's Ropsten contracts here:
https://compound.finance/docs#networks

Here are the Ropsten contract addresses and ABI's for DAI:
https://changelog.makerdao.com/releases/ropsten/1.0.4/index.html

Here is a guide on getting the DAI Savings Rate:
https://github.com/makerdao/developerguides/blob/master/dai/dsr-integration-guide/dsr-integration-guide.md#how-to-calculate-rates-and-savings

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