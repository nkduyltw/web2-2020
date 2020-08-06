const History = require('../../services/transactionHistory');
const moment = require('moment');

module.exports.get = (req, res) => {
    const history = null;
    const accountNumber = ''; 
    res.render('admin/searchHistory',{history, moment,accountNumber});
}


module.exports.post = async (req, res) => {
    const {accountNumber} = req.body;
    const history = await History.searchAllHistory(accountNumber);
    res.render('admin/searchHistory',{history, moment,accountNumber});
}