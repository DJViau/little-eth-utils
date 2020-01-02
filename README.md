
# How to set up

1 - Clone this repo (`git clone git@github.com:DJViau/little-eth-utils.git`) this makes a copy of this folder on your computer

>1a - Alternative, possibly easier, approach: click `Clone or download` on github, click `Download ZIP`, and unzip the file onto your desktop.

2 - Open up the terminal and navigate to the folder. (Something like `cd ~/Desktop/little-eth-utils/` will be the command for this).

3 - Set up a .env file with contents like this:

```
export INFURA_KEY="63a4a18cc0f1234f9fef5cc1f56c6e01"
export MNEMONIC="bla bla bla bla your meta mask seed phrase here"
export USER_ADDRESS="0xab5801a7d398351b8be11c439e05c5b3259aec9b"
export NETWORK="mainnet"
```

4 - Run `nvm use 8.11.2`.  You might need to install nvm first.

>4a You might have to install some stuff like npm and node before this will work.

>2b Get Homebrew (type `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` into the command line and press enter). To install node and npm, type `brew update` into the terminal and press enter, then type `brew install node` into the terminal and press enter.  If everything goes well, you'll have all the fundamental tools.

5 - Run `npm install`

This will take a little while to run.  It's OK if you get warnings, but if you get errors, you should ask someone about them.


# How to use

## Logging a tokenURI to the console

Source your .env file by entering `. .env`

Type `node log-token-uri.js <asset_contract_address> <token_id>` and press enter.  Wait a few seconds, and the tokenURI, if there is one, will print out.

Example command: `node log-token-uri.js 0x79986af15539de2db9a5086382daeda917a9cf0c 20`

Expected output: https://www.cryptovoxels.com/p/20 

Then go to the link that gets logged to see the asset's metadata.

Use `alias l='cd ~/Desktop/stuff/little-eth-utils; source .env; node log-token-uri.js'` in your bash profile for extra convenience.  Then, you can just open a terminal window, type `l <address> <id>` and press enter.


## Clearing a blocked transaction

Source your .env file by entering `. .env`

Type `node clear-blocked.js <nonce_of_stuck_tx> <gas_price_in_gwei>` and press enter.  You can find the nonce of the stuck transaction on [Etherscan](https://etherscan.io/).  Use a gas price that's higher than the standard price on [https://ethgasstation.info/](https://ethgasstation.info/) for best results.  

Example command: `node clear-blocked.js 2434 15`

Expected output: `SENT https://etherscan.io/tx/<transaction_hash>`

Then go to the link that gets logged to verify that the replacement transaction has been mined.  The original stuck transaction should show that it was dropped and replaced.


## Minting a creature to a user

Source your .env file by entering `. .env`

Type `node mint-to-address.js <recipient_address>`

Expected output: `Minted creature. Transaction: https://etherscan.io/tx/<transaction_hash>`

Use `alias send='cd ~/Desktop/stuff/little-eth-utils; source .env; node mint-to-address.js'` in your bash profile for extra convenience.  Then, you can just open a terminal window, type `send <address>` and press enter.