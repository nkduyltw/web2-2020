const Account = require('../../services/account');
const History = require('../../services/transactionHistory');

module.exports.get = (req, res) => {
    const errors = [];
    const error = req.session.error ;
    delete req.session.error;
    errors.push(error);
    res.render('user/transfer', { errors })
}

module.exports.post = async(req, res) => {
    var errors = [];
    const curentUser = req.curentUser;
    var { accountNumber, amountOfMoney, content, type } = req.body;
    amountOfMoney = parseInt(amountOfMoney);
    if (curentUser.accountNumber.trim() == accountNumber.trim()) {
        const error = 'M điên à, Sao tự chuyển tiền cho mình thế!';
        errors.push(error);
        res.render('user/transfer', { errors });
    } else {
        // chuyen tien den nguoi khac cung ngan hang . don vi tien te : VND
        if (type == 1) {
            if (amountOfMoney > curentUser.blanceSpendAccountVND) {
                const error = 'Số dư không đủ';
                errors.push(error);
            }
            const user = await Account.findAcc(accountNumber);
            if (user == null || user.token != null || user.status == false) {
                const error = 'Số tài khoản hưởng thụ không hợp lệ';
                errors.push(error);
            }
            if (errors.length > 0) {
                res.render('user/transfer', { errors });
            } else {
                // curentUser.blanceSpendAccountVND = curentUser.blanceSpendAccountVND - amountOfMoney;
                // user.blanceSpendAccountVND = user.blanceSpendAccountVND + amountOfMoney;
                // curentUser.save();
                // user.save();
                const his = await History.add2(curentUser.accountNumber, user.accountNumber, amountOfMoney, 1, content);

                //dung thong tin bat dau chuyen 
                //await History.add3(user.accountNumber, amountOfMoney, 1, content);
                req.session.tradingCode = his.tradingCode;
                req.session.backURL = '/transfer';
                res.redirect('/otp');
            }
        }

        // chuyen tien den nguoi khac cung ngan hang . don vi tien te : dollar
        if (type == 2) {
            if (amountOfMoney > curentUser.blanceSpendAccountDollars) {
                const error = 'Số dư không đủ';
                errors.push(error);
            }
            const user = await Account.findAcc(accountNumber);
            if (!user || user.token != null || user.status == false) {
                const error = 'Số tài khoản hưởng thụ không hợp lệ';
                errors.push(error);
            }
            if (errors.length > 0) {
                res.render('user/transfer', { errors });
            } else {
                // curentUser.blanceSpendAccountDollars = curentUser.blanceSpendAccountDollars - amountOfMoney;
                // user.blanceSpendAccountDollars = user.blanceSpendAccountDollars + amountOfMoney;
                // curentUser.save();
                // user.save();
                const his = await History.add2(curentUser.accountNumber, user.accountNumber, amountOfMoney, 2, content);
                //await History.add3(user.accountNumber, amountOfMoney, 2, content);
                req.session.tradingCode = his.tradingCode;
                req.session.backURL = '/transfer';
                res.redirect('/otp');
            }
        }
    }
}