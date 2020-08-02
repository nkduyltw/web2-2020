const speakeasy = require('speakeasy');
const qrocde = require('qrcode');
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
    } else {
        //nếu otp sai thì trả về gì đó...
    }
}