const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = process.env.MNEMONIC
const INFURA_KEY = process.env.INFURA_KEY
const NETWORK = process.env.NETWORK

const NFT_CONTRACT_ADDRESS = process.argv[2]
const TOKEN_ID = process.argv[3] || '1'

if (!MNEMONIC || !INFURA_KEY || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}

const NFT_ABI = [{
    "constant": true,
    "inputs": [
        {
            "name": "_tokenId",
            "type": "uint256"
        }
    ],
    "name": "tokenURI",
    "outputs": [
        {
            "name": "",
            "type": "string"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [
    ],
    "name": "symbol",
    "outputs": [
        {
            "name": "",
            "type": "string"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [
    ],
    "name": "name",
    "outputs": [
        {
            "name": "",
            "type": "string"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}]


async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )

    if (NFT_CONTRACT_ADDRESS && TOKEN_ID) {
        const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" })
        // const result = await nftContract.methods.tokenURI(TOKEN_ID)
        await nftContract.methods.tokenURI(TOKEN_ID).call({})
            .then((result) => {
                console.log(result)
            });
        await nftContract.methods.symbol().call({})
            .then((result) => {
                console.log(result)
            });
        await nftContract.methods.name().call({})
            .then((result) => {
                console.log(result)
            });
    }
}

main().then(() => process.exit())
