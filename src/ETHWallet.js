var crypto = require('crypto')
var ethUtil = require('ethereumjs-util')
var HDWallet = require('./HDWallet')
    /**
     * Initialize Ethereum based wallet
     * @param {string} [_privKey = randomBytes] privatekey in hex format or buffer
     * @param {string} [_mneumonic=''] mneumonic phrase
     * @param {string} [_password=''] for the mneumonic
     * @returns {object} new ethereumwallet object
     * @example
     * var ethWallet = new ETHWallet();
     * //returns EthereumWallet {} for ETH
     */
var ETHWallet = function (_privKey = crypto.randomBytes(32)) {
  _privKey = Buffer.isBuffer(_privKey) ? _privKey : new Buffer(_privKey, 'hex')
  if (!ethUtil.isValidPrivate(_privKey)) throw new Error('Private key does not satisfy the curve requirements (ie. it is invalid)')
  this.privKey = _privKey
  this.pubKey = ethUtil.privateToPublic(this.privKey)
}
    /**
     * Get private key
     * @returns {buffer} private key
     */
ETHWallet.prototype.getPrivateKey = function () {
  return this.privKey
}
    /**
     * Get public key
     * @returns {buffer} public key
     */
ETHWallet.prototype.getPublicKey = function () {
  return this.pubKey
}
    /**
     * Get wallet address
     * @returns {string} wallet address
     */
ETHWallet.prototype.getAddress = function () {
  return ethUtil.toChecksumAddress(ethUtil.bufferToHex(ethUtil.publicToAddress(this.pubKey)))
}
    /**
     * Get hd wallet instance
     * @param {string} _mnemonic mneumonic phrase
     * @param {string} [_password=''] for the mneumonic
     * @returns {object} new HDWallet object
     * @example
     * var hd = ETHWallet.getHDWallet("noise sun announce usage lift task rocket flavor cube impact sample budget","test");
     * //returns HDWallet for {} for ETH
     */
ETHWallet.getHDWallet = function (_mnemonic, _password) {
  if (!_mnemonic) throw new Error('no mneumonic')
  var _hd = new HDWallet(HDWallet.paths.ETH, _mnemonic, _password)
  _hd.setWallet(ETHWallet)
  return _hd
}
module.exports = ETHWallet
