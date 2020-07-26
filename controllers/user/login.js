const Account=require('../../services/account');
var errors = [] ;


module.exports.get = function(req, res) {
    res.render('user/login', { errors });
};
module.exports.getByEmail = async function(req, res) {
    const { accountNumber, token } = req.params;
    const user = await Account.findAcc(accountNumber);
    if(user && user.token == token){
        user.token = null;
        user.save();
    }
    res.redirect('/login');
}

module.exports.post = async function(req, res) {
    const accountNumber = req.body.username;
    const password = req.body.password;
    const Acc = await Account.findAcc(accountNumber);
    
    if(Acc == null){
        const error = 'Không tìm thấy số tài khoản';
        errors.push(error);
        res.render('user/login',{
            errors,
        });
        errors = [];
    }
    else{
        if(Acc.token){
            const error = 'Bạn cần xác nhận email';
            errors.push(error);
            res.render('user/login',{
                errors,
            });
            errors = [];
        }
        else{
            if(Acc.status == false){
                const error = 'Bạn cần chờ nhân viên ngân hàng xác thực';
            errors.push(error);
            res.render('user/login',{
                errors,
            });
            errors = [];
            }
            else{
               // console.log(Account.verifyPassword(password,Acc.password));
                if(Account.verifyPassword(password,Acc.password)){
                    delete req.session.accountNumber;
                    req.session.accountNumber = Acc.accountNumber;
                    res.redirect('/home');
                }
                else{
                    const error = 'Sai mật khẩu';
                    errors.push(error);
                    res.render('user/login',{
                        errors,
                    });
                    errors = [];
                }
            }
        }
    }
};