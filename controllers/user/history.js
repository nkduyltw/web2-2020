const History = require('../../services/transactionHistory');
const moment = require('moment');

// lấy thông tin lịch sử giao dịch
module.exports.get = async (req, res) => {
    const curentUser = req.curentUser;
    const histories = await History.searchAllHistory(curentUser.accountNumber);
    console.log(histories);
    res.render('user/history',{ histories, moment});
}

