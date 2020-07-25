const Accounts = require('../../services/account');

var data = [];
module.exports.get = async (req,res) =>{
    data = await Accounts.findAll();
    console.log(data);
    const error = '';
    res.render('admin/findingCustomers', { error, data });
}
module.exports.post = async (req,res) =>{
    const {accountNumber}  = req.body;
    data = [];
    var error = '';
    if(accountNumber.lenght = 0){
        res.render('admin/findingCustomers', { data });
    }
    else{
        const user = await Accounts.findAcc(accountNumber);
        if(user){
            data.push(user);
            res.render('admin/findingCustomers', { error, data });
        }
        else{
            error = 'Không tồn tại'
            res.render('admin/findingCustomers', { error, data });
        }
    }
    
}