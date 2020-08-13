const TKTK = require('../../services/TKTK');
const History = require('../../services/transactionHistory');

module.exports.get = async(req, res) => {
    const error = req.session.error;
    delete req.session.error;
    const tktk = await TKTK.search(req.curentUser.accountNumber);
    res.render('user/tktk', { error, tktk });
}
module.exports.post = async(req, res) => {
    var error = '';
    const { currency, money, duration, note } = req.body;
    const user = req.curentUser;
    const tktk = await TKTK.search(req.curentUser.accountNumber);

    if (money == "" || duration == "") {
        error = 'Điền chưa đủ thông tin';
        res.render('user/tktk', { error, tktk });
    }
    if (money == 0 || duration == 0) {
        error = 'Thông tin không hợp lệ';
        res.render('user/tktk', { error, tktk });
    }
    if (error == '') {
        if (currency == 1) {
            if (user.blanceSpendAccountVND < money) {
                error = 'Số dư VND hiện tại là không đủ cho giao dịch !';
                res.render('user/tktk', { error, tktk });
            } else {
                //(accountNumber, currency, money, duration, note)
                const tktk = await TKTK.addTKTK(user.accountNumber, currency, money, duration, note);
                const his = await History.add3(user.accountNumber, money, currency);
                req.session.tradingCode = his.tradingCode;
                req.session.tktkCode = tktk.TKTKCode;
                req.session.backURL = '/tktk';
                res.redirect('/otp');
            }
        }
        if (currency == 2) {
            if (user.blanceSpendAccountDollars < money) {
                error = 'Số dư $ hiện tại là không đủ cho giao dịch !';
                res.render('user/tktk', { error });
            } else {
                const tktk = await TKTK.addTKTK(user.accountNumber, currency, money, duration, note);
                const his = await History.add3(user.accountNumber, money, currency);
                req.session.tradingCode = his.tradingCode;
                req.session.tktkCode = tktk.TKTKCode;
                req.session.backURL = '/tktk';
                res.redirect('/otp');
            }
        }
    }
}