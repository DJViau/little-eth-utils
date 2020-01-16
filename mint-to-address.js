const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = process.env.MNEMONIC
const INFURA_KEY = process.env.INFURA_KEY
const BEST_CREATURE_ADDRESS = process.env.BEST_CREATURE_ADDRESS
const USER_ADDRESS = process.env.USER_ADDRESS
const NETWORK = process.env.NETWORK
const NUM_CREATURES = 1

const RECIPIENT_ADDRESS = process.argv[2]
const numCreaturesToSend = process.argv[3] || NUM_CREATURES
// const numCreaturesToSend = 1

if (!MNEMONIC || !INFURA_KEY || !RECIPIENT_ADDRESS || !USER_ADDRESS || !NETWORK) {
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

    if (BEST_CREATURE_ADDRESS) {
        const nftContract = new web3Instance.eth.Contract(NFT_ABI, BEST_CREATURE_ADDRESS, { gasLimit: "1000000" })

        // Creatures issued directly to the recipient.
        if (numCreaturesToSend < 1 || numCreaturesToSend > 10) {
            return
        }
        for (var i = 0; i < numCreaturesToSend; i++) {
            const result = await nftContract.methods.mintTo(RECIPIENT_ADDRESS).send({ from: USER_ADDRESS });
            console.log('Minted creature. Transaction: ', `https://etherscan.io/tx/${result.transactionHash}`)
        }
    }
}

main().then(() => process.exit())
