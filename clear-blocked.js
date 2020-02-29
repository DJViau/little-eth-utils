const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = process.env.MNEMONIC
const INFURA_KEY = process.env.INFURA_KEY
const NETWORK = process.env.NETWORK
const USER_ADDRESS = process.env.USER_ADDRESS

const NONCE = process.argv[2]
const GAS_PRICE_IN_GWEI = process.argv[3]

if (!MNEMONIC || !INFURA_KEY || !NETWORK || !USER_ADDRESS) {
    console.error("Please use environment variables to set a mnemonic, infura key, network, and user address.")
    return
}

if (!NONCE || !GAS_PRICE_IN_GWEI) {
  console.error("Please use arguments to specify nonce and gas price in GWEI.")
  return
}

async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )
    let send = await web3Instance.eth.sendTransaction({
      from:USER_ADDRESS,
      to:USER_ADDRESS,
      nonce: NONCE,
      gasPrice: web3.utils.toWei(GAS_PRICE_IN_GWEI, 'gwei'),
      value: 0
    });
    console.log(
      `Attempting to replace tx with nonce ${NONCE}.
      Using gas price ${GAS_PRICE_IN_GWEI}.
      https://etherscan.io/tx/${send.transactionHash}`
    )
}

main().then(() => process.exit())