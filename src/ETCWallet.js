var ETHWallet = require('./ETHWallet')
var ETCWallet = Object.assign({}, ETHWallet)
var HDWallet = require('./HDWallet')
ETCWallet.getHDWallet = function (_mnemonic, _password) {
  if (!_mnemonic) throw new Error('no mneumonic')
  var _hd = new HDWallet(HDWallet.paths.ETC, _mnemonic, _password)
  _hd.setWallet(ETHWallet)
  return _hd
}
module.exports = ETCWallet
