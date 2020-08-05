const Account = require('../../services/account');

module.exports.get = async(req, res) => {
    // const curentUser = req.curentUser;
    const error = "";
    res.render('user/changepassword', { error });
}
module.exports.post = async(req, res) => {
    const { oldpw, newpw, repw } = req.body;
    const curentUser = req.curentUser;
    if (Account.verifyPassword(oldpw, curentUser.password)) {
        if (newpw != repw) {
            const error = 'Mật khẩu và mật khẩu nhập lại không giống nhau';
            res.render('user/changepassword', { error });
        } else {
            curentUser.password = Account.hashPassword(newpw);
            curentUser.save();
            res.redirect('/changepassword');
        }
    } else {
        const error = 'Mật khẩu cũ không chính xác';
        res.render('user/changepassword', { error });
    }
}