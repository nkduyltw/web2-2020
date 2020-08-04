const speakeasy = require('speakeasy');
const qrocde = require('qrcode');
const History = require('../../services/transactionHistory');
const Account = require('../../services/account');

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
        const tradingCode = req.session.tradingCode;
        delete req.session.tradingCode;
        const his = await History.findByTradingCode(tradingCode);
        console.log(verify);
    if (verify == true) {
        //nếu mã otp đúng thì trả về...
        

        if(his.status == 0){
            // update history
            his.status = 1;
            const curentUser = req.curentUser;
            const user = await Account.findAcc(his.accountNumberReceive);


            // update so tien trong ngan hang
            if(his.currency == 1){
                curentUser.blanceSpendAccountVND -= his.transactionBalance;
                user.blanceSpendAccountVND += his.transactionBalance;
            }

            if(his.currency == 2){
                curentUser.blanceSpendAccountDollars -= his.transactionBalance;
                user.blanceSpendAccountDollars += his.transactionBalance;
            }

            his.save();
            curentUser.save();
            user.save();
            

            //redirect
            const error = null ;
            req.session.error = error;
            res.redirect('/transfer');
            
        }
        else{
            //giao dich da co trang thai hoan tat
            const error = 'Giao dịch đã có trạng thái. vui lòng kiểm tra lại.' ;
            req.session.error = error;
            //huy giao dich
            res.redirect('/transfer');
        }
        

    } 
    else {
        //nếu otp sai thì trả về gì đó...
        his.status = 2;
        his.save();
        const error = 'Sai mã OTP. Giao dịch bị hủy bỏ.' ;
        req.session.error = error;
        //huy giao dich
        res.redirect('/transfer');
    }
}