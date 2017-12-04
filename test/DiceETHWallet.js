let chai = require('chai');
let expect = chai.expect;
let ETHWallet = require('../index').ETHWallet;
let HDWallet = require('../index').HDWallet;
let testMnemonic = "noise sun announce usage lift task rocket flavor cube impact sample budget";
let testPassword = "test password";
let testPrivKey = "fc4bf939f44b26472029d5e06c73908a543f46d66a7d69c92ac07193b376ca0f";
let testPubKey = "5f419c06bade9ff3b4a2ddb68e86ceb1a6ffe0c8a6547cba6bb5819107ba4434e66c40ff9cf11e1339bbce2ad05aff615cffc606b7605975a0ff824d2e7c60e9";
let randWallet = new ETHWallet();
let privKeyWallet = new ETHWallet(testPrivKey);
let detHD = ETHWallet.getHDWallet(testMnemonic, testPassword);
describe('Wallet Tests - ETH', function() {
    this.timeout(15000);
    it('random wallet should work', function() {
        expect(randWallet.getAddress()).to.be.a('string');
        expect(randWallet.getPrivateKey().toString('hex')).to.be.a('string');
        expect(randWallet.getPublicKey().toString('hex')).to.be.a('string');
    });
    it('privKey wallet should work - ETH', function() {
        expect(privKeyWallet.getAddress()).to.equal("0x68FF2BD4cacc0E7eF5D909a116d39318794409d5");
        expect(privKeyWallet.getAddress()).to.equal(new ETHWallet(new Buffer(testPrivKey, 'hex')).getAddress());
        expect(privKeyWallet.getPublicKey().toString('hex')).to.equal(testPubKey);
    });
    it('hd derivation should work - ETH', function() {
        expect(detHD.getPath()).to.equal(HDWallet.paths.ETH);
        expect(detHD.getWalletAt(0).getAddress()).to.equal("0xAECbD4064D450f8AfA2ffD481306bf4085c83434");
        expect(detHD.getWalletAt(4).getAddress()).to.equal("0xFc5314F11aef22018A99251127300BB65CE06811");
        expect(detHD.getWalletAt(4).getPrivateKey().toString('hex')).to.equal("9e9244b706f8d3816e556ea53582c564eed37b17d57bc7a2ff623ca09d1fee1e");
        expect(detHD.getWalletAt(0).getPrivateKey().toString('hex')).to.equal("b52da94fdc9a10bd2470a25d9d8061c1771edc7269a2db101d933c15e4115f77");
    });
});
