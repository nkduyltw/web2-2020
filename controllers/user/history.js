const History = require('../../services/transactionHistory');
const moment = require('moment');

// lấy thông tin lịch sử giao dịch
module.exports.get = async(req, res) => {
    // lấy user đang đăng nhập
    const curentUser = req.curentUser;
    
    const histories = await History.searchAllHistory(curentUser.accountNumber);

    res.render('user/history', { histories, moment });
}