const Accounts = require('../../services/account');

var data = [];
module.exports.get = async (req,res) =>{
    data = await Accounts.findAll();
    console.log(data);
    res.render('admin/findingCustomers', { data });
}
module.exports.post = async (req,res) =>{
    const {accountNumber}  = req.pargram;
    data = [];
    data = await Accounts.findAcc(accountNumber);
    res.render('admin/findingCustomers', { data });
}