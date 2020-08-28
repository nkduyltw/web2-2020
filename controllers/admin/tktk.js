const TKTK = require('../../services/TKTK');
const History = require('../../services/transactionHistory');
const interest = require('../../services/interestRate');
const Email = require('../../services/email')

module.exports.get = async(req, res) => {
    const error ='';
    const tktk = [];
    res.render('admin/tktk', { error, tktk });
}
module.exports.post = async(req, res) => {
    const accountNumber = req.body.accountNumber;
    const tktk = await TKTK.search(accountNumber);
    const error='';
    res.render('admin/tktk', { error, tktk });
}