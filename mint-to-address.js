const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = process.env.MNEMONIC
const INFURA_KEY = process.env.INFURA_KEY
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
const USER_ADDRESS = process.env.USER_ADDRESS
const NETWORK = process.env.NETWORK
const DEFAULT_NUM_TOKENS = 1

const RECIPIENT_ADDRESS = process.argv[2]
const numTokensToSend = process.argv[3] || DEFAULT_NUM_TOKENS

if (!MNEMONIC || !INFURA_KEY || !RECIPIENT_ADDRESS || !USER_ADDRESS || !NETWORK || !NFT_CONTRACT_ADDRESS) {
    console.error("Please set a mnemonic, infura key, recipient, user, network, and contract address.")
    return
}

const NFT_ABI = [{
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "mintTo",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}]

async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )

    if (NFT_CONTRACT_ADDRESS) {
        const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" })

        // Typo checking.  Remove if you're conscientious.
        if (numTokensToSend < 1 || numTokensToSend > 10) {
            return
        }
        // Creatures issued directly to the recipient.
        for (var i = 0; i < numTokensToSend; i++) {
            const result = await nftContract.methods.mintTo(RECIPIENT_ADDRESS).send({ from: USER_ADDRESS });
            console.log('Minted creature. Transaction: ', `https://etherscan.io/tx/${result.transactionHash}`)
        }
    }
}

main().then(() => process.exit())
