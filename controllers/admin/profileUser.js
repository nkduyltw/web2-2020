const Accounts = require('../../services/account');

var user ;
module.exports.get =(req, res) => {
    user = null;
    res.render('admin/profileUser',{user});
}
module.exports.get2 = async(req, res) =>{
    const {accountNumber} = req.params;
    user = null;
    user = await Accounts.findAcc(accountNumber);
    res.render('admin/profileUser',{user});
}