// admin nap tien vao tai khoan

const email = require('../../services/email');
const Account = require('../../services/account');
const History = require('../../services/transactionHistory');

module.exports.get = (req, res) => {
    const errors = [];
    const accountNumber = null;
    res.render('admin/recharge',{ errors, accountNumber });
}
module.exports.post = async (req, res) => {
    const { accountNumber, amountOfMoney, type } = req.body;
    const user = await Account.findAcc(accountNumber);
    
    const errors = [];
    if(accountNumber.lenght = 0){
        const error = 'Chưa nhập số tài khoản';
        errors.push(error);
        res.render('admin/recharge',{ errors, accountNumber });
    }
    if(user && user.status == false){
        const error = 'Tài khoản chưa được xác nhận hoặc đã bị khóa';
        errors.push(error);
        res.render('admin/recharge',{ errors, accountNumber });
    }
    if(user == null){
        const error = 'Số tài khoản không tồn tại';
        errors.push(error);
        res.render('admin/recharge',{ errors, accountNumber });
    }
    else{
        if( type == 1 ){
            user.blanceSpendAccountVND += parseInt(amountOfMoney) ;
            user.save();
            //noi dung ad lam sao cho giong ngan hang that
            const content = 'Tài khoản được cộng '+ amountOfMoney + ' VNĐ từ ngân hàng';
            console.log(content);
            await History.add1(accountNumber, amountOfMoney, 1, content);
            email.send(user.email, `Thay đổi số dư tài khoản: ${user.accountNumber}`,content)
            res.redirect('/admin/recharge');
        }
        if( type == 2 ){
            user.blanceSpendAccountDollars += parseInt(amountOfMoney);
            user.save();
            //noi dung ad lam sao cho giong ngan hang that
            const content = 'Tài khoản được cộng '+ amountOfMoney + ' $ từ ngân hàng';
            await History.add1(accountNumber, amountOfMoney, 2, content);
            email.send(user.email, `Thay đổi số dư tài khoản: ${user.accountNumber}`,content)
            res.redirect('/admin/recharge');
        }
    }
    
    
}