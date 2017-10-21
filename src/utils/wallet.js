var bitcoinjs = require('bitcoinjs-lib')
var bip32utils = require('bip32-utils')
var zencashjs = require('zencashjs')

// Hierarchical Deterministic wallet
function phraseToSecretItems (phraseStr) {
  // Seed key, make it fucking strong
  // phraseStr: string
  const seedHex = Buffer.from(phraseStr.slice(0, 64)).toString('hex')

  // chains
  const hdNode = bitcoinjs.HDNode.fromSeedHex(seedHex)
  var chain = new bip32utils.Chain(hdNode)

  // Creates 3 address from the same chain
  for (var k = 0; k < 2; k++) {
    chain.next()
  }

  // Get private keys from them
  var secretItems = chain.getAll().map(function (x) {
    // Get private key (WIF)
    const pkWIF = chain.derive(x).keyPair.toWIF()

    // Private key
    const privKey = zencashjs.address.WIFToPrivKey(pkWIF)

    // Public key
    const pubKey = zencashjs.address.privKeyToPubKey(privKey, true)

    // Address
    const address = zencashjs.address.pubKeyToAddr(pubKey)

    return {
      address,
      privateKey: pkWIF
    }
  })

  return secretItems
}

module.exports = {
  phraseToSecretItems: phraseToSecretItems
}
