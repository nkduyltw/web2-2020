const Account=require('../../services/account');



module.exports.get = function(req, res) {
    const errors = [] ;
    const email = false;
    res.render('user/login', { errors, email });
};
module.exports.getByEmail = async function(req, res) {
    var errors = [] ;
    var email = false;
    const { accountNumber, token } = req.params;
    const user = await Account.findAcc(accountNumber);
    if(!user){
        const error = 'Không tìm thấy tài khoản';
        errors.push(error);
        res.render('user/login',{
            errors,
            email
        });
    }
    if(user && user.token != token)
    {
        const error = 'Đã được kích hoạt!';
        errors.push(error);
        res.render('user/login',{
            errors,
            email
        });
    }
    if(user && user.token == token){
        user.token = null;
        user.save();
        email = true;
    }
    res.render('user/login', { errors, email });
}

module.exports.post = async function(req, res) {
    var errors = [] ;
    const email = false;
    const phoneNumber = req.body.username;
    const password = req.body.password;
    const Acc = await Account.findAccByPhoneNumber(phoneNumber);
    
    if(Acc == null){
        const error = 'Không tìm thấy tài khoản';
        errors.push(error);
        res.render('user/login',{
            errors,
            email
        });
        errors = [];
    }
    else{
        if(Acc.token){
            const error = 'Bạn cần xác nhận email';
            errors.push(error);
            res.render('user/login',{
                errors,
                email
            });
            errors = [];
        }
        else{
            if(Acc.status == false){
                const error = 'Bạn cần chờ nhân viên ngân hàng xác thực';
            errors.push(error);
            res.render('user/login',{
                errors,
                email
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
                        email
                    });
                    errors = [];
                }
            }
        }
    }
};