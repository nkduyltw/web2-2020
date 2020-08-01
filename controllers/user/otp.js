const speakeasy = require('speakeasy');
const qrocde = require('qrcode');
module.exports.get = async(req, res) => {
    const curentUser = req.curentUser;

    var secret = speakeasy.generateSecret({
        name: curentUser.name
    })
    qrocde.toDataURL(secret.otpauth_url, function(err, data) {
        res.render('user/otp', { data });
    })

}