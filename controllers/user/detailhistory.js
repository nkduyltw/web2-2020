const History = require('../../services/transactionHistory');
const moment = require('moment');

module.exports.get = async(req, res) => {
    const history = null;
    res.render('user/detailhistory', { history, moment });
}
module.exports.getCode = async(req, res) => {
    const { tradingCode } = req.params;

    const history = await History.findByTradingCode(tradingCode);

    res.render('user/detailhistory', { history, moment });
}