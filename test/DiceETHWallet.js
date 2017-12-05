let chai = require('chai');
let expect = chai.expect;
let ETHWallet = require('../index').ETHWallet;
let HDWallet = require('../index').HDWallet;
let testMnemonic = "fatal zebra idea cable glad welcome omit minute alley cycle grass correct lounge file trip";
let testPassword = "test dice password";
let testPrivKey = "60262bff8a3a895921fe49901c54f90f72f9a6f4d817bf97496f6eb9e8e43016";
let testPubKey = "24be6c42db383ee18aa3fb3c2d62aa27759707d2de5c8a47300c753100aeca8edd5ab001e5c9f08b50172717699d7eabee8292ef9db119813095af631d879da2";
//let randWallet = new ETHWallet();
let privKeyWallet = new ETHWallet(testPrivKey);
let detHD = ETHWallet.getHDWallet(testMnemonic, testPassword);
describe('Wallet Tests - ETH', function() {
    this.timeout(15000);
    // it('random wallet should work', function() {
    //     console.log("address:", randWallet.getAddress().toString());
    //     console.log("prvKey:", randWallet.getPrivateKey().toString('hex'));
    //     console.log("pubKey:", randWallet.getPublicKey().toString('hex'));
    //
    //     expect(randWallet.getAddress()).to.be.a('string');
    //     expect(randWallet.getPrivateKey().toString('hex')).to.be.a('string');
    //     expect(randWallet.getPublicKey().toString('hex')).to.be.a('string');
    // });
    it('privKey wallet should work - ETH', function() {
        expect(privKeyWallet.getAddress()).to.equal("0x56f2dAbb3Dc2959175603007dc893701a1C1fa87");
        expect(privKeyWallet.getAddress()).to.equal(new ETHWallet(new Buffer(testPrivKey, 'hex')).getAddress());
        expect(privKeyWallet.getPublicKey().toString('hex')).to.equal(testPubKey);
    });
    it('hd derivation should work - ETH', function() {
        expect(detHD.getPath()).to.equal(HDWallet.paths.ETH);

        for (var i=0; i<1 ;i++) {
            console.log("=======" + i + "=========");
            console.log("["+i+"]address:", detHD.getWalletAt(i).getAddress().toString());
            console.log("["+i+"]prvKey:", detHD.getWalletAt(i).getPrivateKey().toString('hex'));
            console.log("["+i+"]pubKey:", detHD.getWalletAt(i).getPublicKey().toString('hex'));

            for(var j=0;j<2;j++) {
                var childWallet = new ETHWallet(new Buffer(detHD.getChildPrivKeyString(j), 'hex'));
                console.log("    Child["+j+"]address:", childWallet.getAddress());
                console.log("    Child["+j+"]prvKey:", childWallet.getPrivateKey().toString('hex'));
                console.log("    Child["+j+"]pubKey:", childWallet.getPublicKey().toString('hex'));
            }
        }
        // expect(detHD.getWalletAt(0).getAddress()).to.equal("0xAECbD4064D450f8AfA2ffD481306bf4085c83434");
        // expect(detHD.getWalletAt(4).getAddress()).to.equal("0xFc5314F11aef22018A99251127300BB65CE06811");
        // expect(detHD.getWalletAt(4).getPrivateKey().toString('hex')).to.equal("9e9244b706f8d3816e556ea53582c564eed37b17d57bc7a2ff623ca09d1fee1e");
        // expect(detHD.getWalletAt(0).getPrivateKey().toString('hex')).to.equal("b52da94fdc9a10bd2470a25d9d8061c1771edc7269a2db101d933c15e4115f77");
    });
});
