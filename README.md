# SimpleSwap-amm

## Steps to run the application on your local computer:-

* Clone this repo:
```text
git clone https://github.com/RyanZurrin/SimpleSwap
```
* Move in the `SimpleSwap` directory and install all the dependencies:
```text
npm install
```
* Run the application:
```text

npm start
// if you get error use this: export NODE_OPTIONS=--openssl-legacy-provider 
```
In browser connect to react app
```
http://localhost:3000
```
# Adding Avalanche C-AVAX test net tokens to Metamask

## Log in to MetaMask -> Click the Network drop-down -> Select Custom RPC

Network Name:
```text 
Avalanche FUJI C-Chain 
```

New RPC URL: 
```text
https://api.avax-test.network/ext/bc/C/rpc
```

ChainID: 
```text
43113
```

Symbol: 
```text
C-AVAX
```

Explorer: 
```text
https://cchain.explorer.avax-test.network
```

# Steps to use a new contract with the frontend

1. copy the SimpleSwapV1.sol contract located in the contracts folder and paste into a new file renamed to something different using the [Remix editor](http://remix.ethereum.org/)
2. Rename the contract to something different, usually one will use the same name for the file as is the name for the contract
3. Compile the contract, being sure that you have selected the contract you wish to comile, and not the safemath contract that is usually selected by defalut as this contract uses safemath for doing the math
4. After compiling you will need to deploy, being sure to connect your wallet as well as switch to injected web3, being sure that your contract is selected and not the safemath again
5. Once deployed you need to click on metamask and then click on the transaction and then again click on view on blockchain
6. once here you need to click on the to address, of where your contract was deployed to
7. click on the second tab named contracts, and on the top you will see a link that says verify and publish, click on this and follow the steps to publish your contract making it visible on the blockchain. You may need to use the Flattener plugin in remix to flatten your contract due to the fact that it uses safemath. todo this just click on the plugins and searh Flattener in Remix and install, after installed you need to compile your contract and then click the newly added Flattener button which will give you the option to copy the flattened contract to your clipboard, do this and copy this to the area in the verify and publish step asking for your contract code.
8. Once yoour contract has been published to the blockchain, you will need to copy the address of your contract and then in the src folder, there is a constants.js file, and at the very top of this file there is a place fop you to add the contract address. Change the address to your new contracts address and you will then be able to launch the frontend using a frest contract.
9. If you wish to change the token names from REZ and ABR to something else you will need to do a bit of extra work unfortunitly, as the code is hardcoded with these names so you would need to go into each of the react components and use the find and replace functionality to look up REZ and ABR and then replace to what ever token names you wish to use. You can also rename it something other then SimpleSwap too uisng the same method.
