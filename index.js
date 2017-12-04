'use strict'
var HDWallet = require('./src/HDWallet')
var ETHWallet = require('./src/ETHWallet')
var ETCWallet = require('./src/ETCWallet')
    /* var cnUtil = require('./lib/monero/cnUtil')
     var crypto = require('crypto')
     var cn = new cnUtil();
     var seed = crypto.randomBytes(32).toString('hex');
     console.log(seed)
     console.log(cn.create_address(seed)); */
module.exports = {
    HDWallet: HDWallet,
    ETHWallet: ETHWallet,
    ETCWallet: ETCWallet
}
