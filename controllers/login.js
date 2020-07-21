const Account=require('../services/account');
var errors = [] ;


module.exports.get = function(req, res) {
    const values = req.body;
    res.render('login', { errors, values });
};

module.exports.post = async function(req, res) {
    const values = req.body;
    const accountNumber = req.body.username;
    const password = req.body.password;
    const passwordHash = Account.hashPassword(password);
    const Acc = await Account.findAcc(accountNumber);
    
    if(Acc == null){
        const error = 'Không tìm thấy số tài khoản';
        errors.push(error);
        res.render('login',{
            errors,
            values,
        });
        errors = [];
    }
    else{
        if(Account.verifyPassword(password,passwordHash)){
            res.redirect('/');
        }
        else{
            const error = 'Sai mật khẩu';
            errors.push(error);
            res.render('login',{
                errors,
                values,
            });
            errors = [];
        }
    }
};