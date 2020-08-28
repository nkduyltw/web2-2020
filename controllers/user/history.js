const History = require('../../services/transactionHistory');
const moment = require('moment');


module.exports.get = async(req, res) => {
    const curentUser = req.curentUser;

    const histories = await History.searchAllHistory(curentUser.accountNumber);

    res.render('user/history', { histories, moment });
}