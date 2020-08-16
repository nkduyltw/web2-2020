const speakeasy = require('speakeasy');
const qrocde = require('qrcode');
const History = require('../../services/transactionHistory');
const Account = require('../../services/account');
const TKTK = require('../../services/TKTK');

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
    asciii= secret.base32 ;
}

module.exports.post = async(req, res) => {
    var verify = speakeasy.totp.verify({
        secret: asciii,
        encoding: 'base32',
        token: req.body.otp,
        //time: 1000*60,
    });
        const tradingCode = req.session.tradingCode;
        delete req.session.tradingCode;
        const his = await History.findByTradingCode(tradingCode);
    if (verify == true) {
        //nếu mã otp đúng thì trả về...
        if(his.type == 2){
            if(his.status == 0){
                // update history
                his.status = 1;
                const curentUser = req.curentUser;
                const user = await Account.findAcc(his.accountNumberReceive);
    
                // update so tien trong ngan hang
                if(his.currency == 1){
                    curentUser.blanceSpendAccountVND -= parseInt(his.transactionBalance);
                    user.blanceSpendAccountVND += parseInt(his.transactionBalance);
                }
    
                if(his.currency == 2){
                    curentUser.blanceSpendAccountDollars -= parseInt(his.transactionBalance);
                    user.blanceSpendAccountDollars = parseInt(user.blanceSpendAccountDollars)+parseInt(his.transactionBalance);
                }
    
                his.save();
                curentUser.save();
                user.save();
                
    
                //redirect
                const error = null ;
                req.session.error = error;
                delete req.session.tradingCode  ;
                const backURL = req.session.backURL ;
                delete req.session.backURL  ;
                res.redirect(backURL);
                
            }
            else {
                //giao dich da co trang thai hoan tat
                const error = 'Giao dịch đã có trạng thái. vui lòng kiểm tra lại.' ;
                req.session.error = error;

                delete req.session.tradingCode  ;
                const backURL = req.session.backURL ;
                delete req.session.backURL  ;
                //huy giao dich
                res.redirect(backURL);
            }
            
    
        }
        if(his.type == 3){
            if(his.status == 0){
                 // update history
                    his.status = 1;
                    const curentUser = req.curentUser;

                    const TKTKCode = req.session.tktkCode;
                    const tktk = await TKTK.findOne({where: {TKTKCode}});
                    tktk.status = 1;
                    // update so tien trong ngan hang
                    if(his.currency == 1){
                        curentUser.blanceSpendAccountVND -= parseInt(his.transactionBalance);
                    }
                    if(his.currency == 2){
                        curentUser.blanceSpendAccountDollars -= parseInt(his.transactionBalance);
                    }

                    tktk.save();
                    his.save();
                    curentUser.save();

                    //redirect
                    const error = null ;
                    req.session.error = error;
                    delete req.session.tradingCode  ;
                    const backURL = req.session.backURL ;
                    delete req.session.backURL  ;
                    res.redirect(backURL);
            }else {
                //giao dich da co trang thai hoan tat
                const error = 'Giao dịch đã có trạng thái. vui lòng kiểm tra lại.' ;
                req.session.error = error;

                delete req.session.tradingCode  ;
                const backURL = req.session.backURL ;
                delete req.session.backURL  ;
                //huy giao dich
                res.redirect(backURL);
            }
        }
        }
        else {
            //nếu otp sai thì trả về gì đó...
            his.status = 2;
            his.save();
            const error = 'Sai mã OTP. Giao dịch bị hủy bỏ.' ;
            req.session.error = error;
            //huy giao dich
            delete req.session.tradingCode  ;
            const backURL = req.session.backURL ;
            delete req.session.backURL  ;
            res.redirect(backURL);
        }
}