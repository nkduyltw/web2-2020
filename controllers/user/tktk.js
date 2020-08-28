const TKTK = require('../../services/TKTK');
const History = require('../../services/transactionHistory');
const interest = require('../../services/interestRate');
const Email = require('../../services/email')
module.exports.get = async(req, res) => {
    const error = req.session.error;
    delete req.session.error;
    const tktk = await TKTK.search(req.curentUser.accountNumber);
    res.render('user/tktk', { error, tktk });
}
module.exports.doneTKTK = async(req, res) => {
    const error = req.session.error;
    delete req.session.error;
    const {TKTKCode} = req.params;
    const tktk = await TKTK.findOne({where:{TKTKCode}});
    var date = new Date();
    console.log(tktk)
    date.setMonth(tktk.createdAt.getMonth() + tktk.duration)
    var nd = new Date(date);
    const today = new Date();
    const user = await Account.findAcc(req.curentUser.accountNumber);
    if(today.getTime() >= nd.getTime()){
        const temp = await interest.interestCalculator( tktk.duration, tktk.money );
        const money =  parseInt(tktk.money)  + temp;
        if( tktk.currency == 1 ){
                    
            user.blanceSpendAccountVND = user.blanceSpendAccountVND + money ;
        }
        if( tktk.currency == 2 ){
            
            user.blanceSpendAccountDollars = user.blanceSpendAccountDollars + money ;
        }
        const his = await History.add4(user.accountNumber, money, tktk.currency, tktk.TKTKCode)
        tktk.done = true;
        tktk.save();
        user.save();
        const url = `${process.env.HOST_WEB}/detailhistory/${his.tradingCode}`;
        await Email.send(user.email,"Thay đổi số dư",`Chi tiết giao dịch: ${url}`);
    }
    else{
        const money =  parseInt(tktk.money);
        if( tktk.currency == 1 ){
                    
            user.blanceSpendAccountVND = user.blanceSpendAccountVND + money ;
        }
        if( tktk.currency == 2 ){
            
            user.blanceSpendAccountDollars = user.blanceSpendAccountDollars + money ;
        }
        const his = await History.add4(user.accountNumber, money, tktk.currency, tktk.TKTKCode)
        tktk.done = true;
        tktk.save();
        user.save();
        const url = `${process.env.HOST_WEB}/detailhistory/${his.tradingCode}`;
        await Email.send(user.email,"Thay đổi số dư",`Chi tiết giao dịch: ${url}`);
    }
    res.redirect('/tktk')
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