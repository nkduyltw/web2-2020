const speakeasy = require('speakeasy');
const qrocde = require('qrcode');
const History = require('../../services/transactionHistory');
var asciii = '';
var secret = '';
module.exports.get = async(req, res) => {
    const curentUser = req.curentUser;

    secret = speakeasy.generateSecret({
        name: curentUser.name
    })
    qrocde.toDataURL(secret.otpauth_url, function(err, data) {
        res.render('user/otp', { data });
    })
}

module.exports.post = async(req, res) => {
    var verify = speakeasy.totp.verify({
        secret: asciii,
        encoding: 'base32',
        token: req.body.otp
    });
    if (verify == true) {
        //nếu mã otp đúng thì trả về...
        const tradingCode = req.tradingCode;
        const his = await History.findByTradingCode(tradingCode);
        // update history
        his.status = 1;
        his.save();
        // update so tien trong ngan hang



        //redirec

        res.redirec('user/transfer');

    } else {
        //nếu otp sai thì trả về gì đó...

        //huy giao dich
    }
}