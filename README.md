# CoinCircle Coding Test

This test involves creating a full-stack application that allows you to compare historical DAI interest rates across the top 3 on-chain protocols that allow you to earn interest on DAI:

1. Compound Finance
2. The DAI Savings Rate
3. (choose your own for the 3rd!)

You will be judged on the following:

1. Code Quality / Readability / Maintainability / Architecture
2. Design UX/UI
3. Performance (speed)

The application must be written according to the following specifications:

1. The backend must be written in either node/express or golang.
2. The front-end must be written in React
3. If you use a database (which you probably will need to) it should use Postgres.
4. If you use a cache, use Redis.
5. The application must fully load quickly (less than 500ms). 
6. The UI must render a historical graph that live updates as the interest rates change.
7. For the current rate, rather than query each protocol independently, you must write a smart contract that queries each protocol, and returns three interest rates (one for each protocol).
8. Your web application should query your smart contract to get the current rates.
9. The application must show at least 2 months of historical data. For the historical data, your web application may query contracts besides your own as well as any other on-chain data.
10. The application must be containerized in a docker container.
11. The application should include a Makefile, and when we test it in a fresh enviornment, we should be able to run the application using a single command `make run` and the application should run at `http://localhost:3001`
12. As you are building, you should use github to push commits. The final app should be published on github, which is where we will find it. Name it something original that you think sounds cool.  Please be sure to NOT call it anything with the words CoinCircle or Coding Test or CoinCircle Coding Test or anything similar.  Once you have published it and tested that it can be downloaded and run from a new enviornment with `make run` please email us and let us know it's ready for us to try out. 

## Helpful Info

### Ethereum JSON RPC Provider

Feel free to use our node as a Ethereum JSON RPC Provider:

Ropsten: https://eth-testnet.coincircle.com
Mainnet: https://eth.coincircle.com

Also, note that you only need to get the lending (supply) rates. You don't need to worry about implementing the borrow rate.

