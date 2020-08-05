const TKTK = require('../../services/TKTK');
const History = require('../../services/transactionHistory');

module.exports.get = (req, res) => {
    const tktk = TKTK.search( req.curentUser.accountNumber );
    res.render('user/tktk', { tktk });
}
module.exports.post = async (req, res) => {
    var error = '';
    const {  currency, money, duration, note } = req.body ;
    const user = req.curentUser;
    
    if( currency == 1 ){
        if( user.blanceSpendAccountVND < money ){
            error = 'Số dư VND hiện tại là không đủ cho giao dịch !';
            res.render('user/tktk', { error });
        }
        else{
            await TKTK.addTKTK( user.accountNumber,  currency , money, duration, note);
            const his = await History.add3(user.accountNumber, money, currency);
        }
    }
    if( currency == 2 ){
        if( user.blanceSpendAccountDollars < money ){
            error = 'Số dư $ hiện tại là không đủ cho giao dịch !';
            res.render('user/tktk', { error });
        } 
        else{

            await TKTK.addTKTK( user.accountNumber,  currency , money, duration, note);
            const his = await History.add3(user.accountNumber, money, currency);
            req.session.tradingCode = his.tradingCode;
            req.session.backURL = '/tktk';
            res.redirect('/otp');
        }
    }
    res.redirect('/tktk');
}