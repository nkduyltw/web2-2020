const Account = require('../../services/account');
const cryptoRandomString= require('crypto-random-string');

module.exports.get = (req, res) => {
    const accountNumber = req.params;
    const error = '';
    res.render('user/changeInfo',{accountNumber, error});
}

module.exports.post = async (req ,res) => {
    const {accountNumber, email, name, address, phoneNumber, dateOfBirth} = req.body;
    if(accountNumber=='' || email == '' || name == '' || adress == '' || numberPhone == '' || dateOfBirth == ''){
        const error = 'Thiếu thông tin'
        res.render('admin/changeInfo',{accountNumber, error});
    }
    else{
        const user = await Account.findAcc(accountNumber);
        if(!user){
            const error = 'Không tìm thấy tài khoản vui lòng kiểm tra lại.'
            res.render('admin/changeInfo',{accountNumber, error});
        }
        else{
            const token = cryptoRandomString({length: 4, type: 'numeric'});

            user.email = email;
            user.name = name;
            user.address = address;
            user.phoneNumber = phoneNumber;
            user.dateOfBirth = dateOfBirth;
            user.token = token;
            user.save();
            res.redirec('admin/findingCustomers');
        }
    }
}