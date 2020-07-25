const Account = require('../../services/account');
const History = require('../../services/transactionHistory');


module.exports.get = async (req, res) => {
    const curentUser = req.curentUser;
    const histories = await History.searchAllHistory(curentUser.accountNumber);
    console.log(histories);
    res.render('user/history',{ histories });
}

