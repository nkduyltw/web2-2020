const TKTK = require('../../services/TKTK');

module.exports.get = (req, res) => {
    const tktk = TKTK.search( req.curentUser.accountNumber );
    res.render('user/tktk', { tktk });
}
module.exports.post = (req, res) => {
    var error = '';
    const {  currency, money, duration, note } = req.body ;
    const user = req.curentUser;
    
    if( currency == 1 ){
        if( user.blanceSpendAccountVND < money ){
            error = 'Số dư VND hiện tại là không đủ cho giao dịch !';
            res.render('user/tktk', { error });
        }
        else{
            await TKTK.addTKTK( user.accountNumber,  currency, money, duration, note);
        }
    }
    if( currency == 2 ){
        if( user.blanceSpendAccountDollars < money ){
            error = 'Số dư $ hiện tại là không đủ cho giao dịch !';
            res.render('user/tktk', { error });
        } 
        else{
            await TKTK.addTKTK( user.accountNumber,  currency, money, duration, note);
        }
    }
    res.redirect('/tktk');
}